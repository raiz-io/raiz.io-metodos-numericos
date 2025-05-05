import sympy as sp
from flask import Flask, render_template, request, jsonify
from metodo_biseccion import biseccion
from metodo_Regula_Falsi import regula_falsi
from metodo_Newton_Raphson import newton
from metodo_Secante import secante
from metodo_Gauss import gauss
from metodo_Gauss_Jordan import gauss_jordan
from metodo_Gauss_Seidel import gauss_seidel
from metodo_Jacobi import jacobi
import json 
import numpy as np
import os
import math
import ast
import re
import logging
from functools import lru_cache
from datetime import datetime

app = Flask(__name__, static_folder="static", template_folder="templates")
historial = []  # Lista para almacenar el historial de cálculos

# Configuración avanzada de logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Función para limpiar inf, -inf y nan de cualquier estructura
def limpiar_inf_nan(obj):
    if isinstance(obj, dict):
        return {k: limpiar_inf_nan(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [limpiar_inf_nan(v) for v in obj]
    elif isinstance(obj, float):
        if math.isinf(obj) or math.isnan(obj):
            return None  # O puedes usar "Infinity" o "NaN" si prefieres
        else:
            return obj
    else:
        return obj

# Función para cargar el historial desde archivo
def cargar_historial():
    try:
        if os.path.exists("historial.json"):
            with open("historial.json", "r") as f:
                logger.info("Historial cargado correctamente desde archivo")
                return json.load(f)
        logger.info("No se encontró archivo historial.json, se creará uno nuevo")
        return []
    except (json.JSONDecodeError, IOError) as e:
        logger.error(f"Error al cargar historial: {str(e)}")
        return []

# Función para guardar el historial en archivo
def guardar_historial(historial):
    try:
        with open("historial.json", "w") as f:
            json.dump(historial, f, indent=2)
            logger.info("Historial guardado correctamente")
    except IOError as e:
        logger.error(f"Error al guardar historial: {str(e)}")

# Cargar historial al iniciar
historial = cargar_historial()

# Evaluación segura de funciones usando AST
def evaluar_funcion_segura(funcion_str, x):
    operaciones_permitidas = {
        'x': x,
        'cos': math.cos,
        'sin': math.sin,
        'tan': math.tan,
        'log': math.log,
        'sqrt': math.sqrt,
        'exp': math.exp,
        'abs': abs,
        'e': math.e,
        'pi': math.pi,
        '+': lambda a, b: a + b,
        '-': lambda a, b: a - b,
        '*': lambda a, b: a * b,
        '/': lambda a, b: a / b,
        '**': lambda a, b: a ** b,
        '^': lambda a, b: a ** b  # Para soportar el símbolo ^ como potencia
    }
    try:
        funcion_str = funcion_str.replace('^', '**')
        node = ast.parse(funcion_str, mode='eval')
        for n in ast.walk(node):
            if isinstance(n, (ast.Expression, ast.BinOp, ast.UnaryOp, ast.Constant, ast.Name)):
                continue
            elif isinstance(n, ast.Call) and isinstance(n.func, ast.Name) and n.func.id in operaciones_permitidas:
                continue
            elif isinstance(n, (ast.Add, ast.Sub, ast.Mult, ast.Div, ast.Pow)):
                continue
            elif isinstance(n, ast.Load):
                continue
            else:
                raise ValueError(f"Operación no permitida: {type(n).__name__}")
        code = compile(node, '<string>', 'eval')
        return eval(code, {'__builtins__': None}, operaciones_permitidas)
    except SyntaxError:
        raise ValueError("Sintaxis de función inválida. Use formato como 'x+2' o '3*x^2'")
    except Exception as e:
        raise ValueError(f"Error al evaluar la función: {str(e)}")

# Versión con caché para mejorar rendimiento
@lru_cache(maxsize=100)
def evaluar_funcion_cacheada(funcion_str, x):
    return evaluar_funcion_segura(funcion_str, x)

# Ruta principal
@app.route("/")
def index():
    logger.debug("Solicitud recibida para página principal")
    return render_template("index.html", historial=historial)

# Ruta para resolver ecuaciones
import re

def traducir_funciones_espanol(funcion_str):
    # Traduce funciones matemáticas del español al inglés
    funcion_str = re.sub(r'\bsen\b', 'sin', funcion_str)
    funcion_str = re.sub(r'\btg\b', 'tan', funcion_str)
    funcion_str = re.sub(r'\bln\b', 'log', funcion_str)
    return funcion_str

@app.route("/resolver", methods=["POST"])
def resolver():
    try:
        logger.info("Iniciando procesamiento de solicitud /resolver")
        datos = request.get_json()
        logger.info(f"Datos recibidos: {datos}") 

        # Validación básica de datos
        if not datos:
            logger.error("No se recibieron datos en la solicitud")
            return jsonify({"error": "No se recibieron datos"}), 400

        metodo_recibido = str(datos.get("metodo", ""))

        if metodo_recibido.lower() == "jacobi":
            required_fields = ["metodo", "Sistema_ecuaciones", "vector_valores_iniciales", "tolerancia"]

        elif metodo_recibido == "Gauss-Seidel":
            required_fields = ["metodo", "Sistema_ecuaciones", "vector_valores_iniciales", "tolerancia"]

        elif metodo_recibido == "Gauss":
            required_fields = ["metodo", "Sistema_ecuaciones"]

        elif metodo_recibido == "Gauss-Jordan":
            required_fields = ["metodo", "Sistema_ecuaciones"]

        elif metodo_recibido.lower() == "newton":
            required_fields = ["funcion", "metodo", "a", "tolerancia"]

        else:
            required_fields = ["funcion", "metodo", "a", "b", "tolerancia"]

        for field in required_fields:
            if field not in datos:
                logger.error(f"Campo requerido faltante: {field}")
                return jsonify({"error": f"Campo requerido faltante: {field}"}), 400

        # Validar tipos de datos y extraer variables según el método
        metodo = str(datos["metodo"])

        if metodo == "Jacobi":
            tolerancia = float(datos["tolerancia"])
            Sistema_ecuaciones = datos.get('Sistema_ecuaciones', None)
            vector_valores_iniciales = datos.get('vector_valores_iniciales', None)
            funcion_str = ""  # No se usa en Jacobi
            a = None
            b = None
        elif metodo == "Gauss-Seidel":
            tolerancia = float(datos["tolerancia"])
            Sistema_ecuaciones = datos.get('Sistema_ecuaciones', None)
            vector_valores_iniciales = datos.get('vector_valores_iniciales', None)
            funcion_str = ""  # No se usa en Gauss-Seidel
            a = None
            b = None
        elif metodo == "Gauss":
            Sistema_ecuaciones = datos.get('Sistema_ecuaciones', None)
            vector_valores_iniciales = None
            funcion_str = ""  # No se usa 
            a = None
            b = None

        elif metodo == "Gauss-Jordan":
            Sistema_ecuaciones = datos.get('Sistema_ecuaciones', None)
            vector_valores_iniciales = None
            funcion_str = ""  # No se usa 
            a = None
            b = None

        else:
            tolerancia = float(datos["tolerancia"])
            funcion_str = str(datos["funcion"]).strip()
            # --- Traducción español-inglés ---
            funcion_str = traducir_funciones_espanol(funcion_str)
            a = float(datos["a"])
            if metodo == "Newton":
                b = None
            else:
                b = float(datos["b"])
            Sistema_ecuaciones = None
            vector_valores_iniciales = None

        # Mapeo de nombres de métodos alternativos
        metodos_equivalentes = {
            "Regula Falsi": "Regla Falsa",
            "Regula_Falsi": "Regla Falsa",
            "regula_falsi": "Regla Falsa",
            "Falsa Posición": "Regla Falsa",
            "falsa_posicion": "Regla Falsa"
        }

        # Normalizar el nombre del método
        metodo = metodos_equivalentes.get(metodo, metodo)

        # Validar método
        metodos_validos = ["Bisección", "Regla Falsa", "Newton", "Secante","Gauss","Gauss-Jordan", "Gauss-Seidel", "Jacobi"]
        if metodo not in metodos_validos:
            logger.error(f"Método no válido: {metodo}")
            return jsonify({"error": "Método no válido"}), 400

        # Validar intervalo para métodos que lo requieren
        if metodo in ["Bisección", "Regla Falsa", "Secante"]:
            try:
                f_a = evaluar_funcion_cacheada(funcion_str, a)
                f_b = evaluar_funcion_cacheada(funcion_str, b)
                if metodo in ["Bisección", "Regla Falsa"] and f_a * f_b >= 0:
                    logger.error("La función no cambia de signo en el intervalo dado")
                    return jsonify({"error": "La función debe cambiar de signo en el intervalo [a, b]"}), 400
            except ValueError as e:
                logger.error(f"Error al evaluar función: {str(e)}")
                return jsonify({"error": str(e)}), 400

        # Preparar función lambda con manejo de errores
        def f(x):
            try:
                return evaluar_funcion_cacheada(funcion_str, x)
            except ValueError as e:
                raise ValueError(f"Error al evaluar f({x}): {str(e)}")

        # --- Funciones auxiliares para Jacobi ---
        def Matriz_A(Sistema_ecuaciones):
            ecuaciones = Sistema_ecuaciones.strip().split('\n')
            ecuaciones_preparadas = []
            for eq in ecuaciones:
                eq = re.sub(r'(?<![\*\w])(\d+)([a-zA-Z])', r'\1*\2', eq)  # 2x → 2*x
                ecuaciones_preparadas.append(eq)
            variables = sorted(set().union(*[sp.sympify(eq.split('=')[0]).free_symbols for eq in ecuaciones_preparadas]), key=lambda x: str(x))
            ecuaciones_sympy = [sp.Eq(sp.sympify(eq.split('=')[0]), sp.sympify(eq.split('=')[1])) for eq in ecuaciones_preparadas]
            A, _ = sp.linear_eq_to_matrix(ecuaciones_sympy, variables)
            return [[float(aij) for aij in fila] for fila in A.tolist()]

        def Vector_B(Sistema_ecuaciones):
            ecuaciones = Sistema_ecuaciones.strip().split('\n')
            B = []
            for eq in ecuaciones:
                eq = re.sub(r'(?<!\*)(\d+)([a-zA-Z])', r'\1*\2', eq.strip())
                partes = eq.split('=')
                if len(partes) != 2:
                    raise ValueError(f"Ecuación mal formada: {eq}")
                termino_independiente = sp.sympify(partes[1]).evalf()
                B.append(float(termino_independiente))
            return B

        def vector_x0(vector_valores_iniciales):
            elementos = vector_valores_iniciales.replace(" ", "").split(",") if "," in vector_valores_iniciales else vector_valores_iniciales.split()
            vector = []
            for elem in elementos:
                try:
                    num = float(elem)
                    vector.append(num)
                except ValueError:
                    raise ValueError(f"Elemento no numérico: '{elem}'")
            if not vector:
                raise ValueError("El texto no contiene números válidos.")
            return vector

        # Ejecutar el método seleccionado
        raiz = None
        iteraciones = []

        if metodo == "Bisección":
            logger.info("Ejecutando método de Bisección")
            resultado = biseccion(f, a, b, tolerancia)
            raiz = resultado["raiz"]
            iteraciones = resultado["iteraciones"]

        elif metodo == "Regla Falsa":
            logger.info("Ejecutando método de Regla Falsa")
            raiz, iteraciones = regula_falsi(f, a, b, tolerancia)

        elif metodo == "Newton":
            logger.info("Ejecutando método de Newton")
            raiz, iteraciones = newton(f, a, tolerancia, 100)

        elif metodo == "Secante":
            logger.info("Ejecutando método de Secante")
            raiz, iteraciones = secante(f, a, b, tolerancia)

        elif metodo == "Gauss":
            logger.info("Ejecutando método de Gauss")
            raiz = gauss(Matriz_A(Sistema_ecuaciones),Vector_B(Sistema_ecuaciones))

        elif metodo == "Gauss-Jordan":
            logger.info("Ejecutando método de Gauss-Jordan")
            raiz = gauss_jordan(Matriz_A(Sistema_ecuaciones),Vector_B(Sistema_ecuaciones))

        elif metodo == "Gauss-Seidel":
            logger.info("Ejecutando método de Gauss-Seidel")
            raiz,iteraciones = gauss_seidel(Matriz_A(Sistema_ecuaciones),Vector_B(Sistema_ecuaciones),vector_x0(vector_valores_iniciales),float(tolerancia))

        elif metodo == "Jacobi":
            logger.info("Ejecutando método de Jacobi")
            raiz, iteraciones = jacobi(
                A=Matriz_A(Sistema_ecuaciones),
                B=Vector_B(Sistema_ecuaciones),
                x0=vector_x0(vector_valores_iniciales),
                Tol=float(tolerancia)
            )


        # --- Conversión universal para serialización JSON ---
        if isinstance(raiz, np.ndarray):
            raiz = raiz.tolist()

        # ADAPTACIÓN PARA GRÁFICOS DEL FRONTEND
        def adaptar_iteraciones_para_graficos(iteraciones, metodo):
            nuevas_iteraciones = []
            for item in iteraciones:
                if not isinstance(item, dict):
                    nuevas_iteraciones.append(item)
                    continue
        
                nuevo = dict(item)
                # Asegurar que todos los métodos tengan 'error' y 'xp' (aproximación)
                if metodo in ["Newton", "Secante"]:
                    nuevo["error"] = item.get("dxi", 0)
                    nuevo["xp"] = item.get("xi", 0)
                elif metodo in ["Bisección", "Regla Falsa"]:
                    nuevo["error"] = item.get("dxp", 0)
                    nuevo["xp"] = item.get("xp", 0)
                nuevas_iteraciones.append(nuevo)
            return nuevas_iteraciones

        if isinstance(iteraciones, list):
            iteraciones = adaptar_iteraciones_para_graficos(iteraciones, metodo)
            iteraciones_serializadas = []
            for item in iteraciones:
                if isinstance(item, dict):
                    item_serializado = {k: (v.tolist() if isinstance(v, np.ndarray) else v) for k, v in item.items()}
                    iteraciones_serializadas.append(item_serializado)
                elif isinstance(item, tuple):
                    iteraciones_serializadas.append(tuple(
                        elem.tolist() if isinstance(elem, np.ndarray) else elem
                        for elem in item
                    ))
                elif isinstance(item, np.ndarray):
                    iteraciones_serializadas.append(item.tolist())
                else:
                    iteraciones_serializadas.append(item)
            iteraciones = iteraciones_serializadas

        # Limpiar valores no válidos para JSON
        raiz = limpiar_inf_nan(raiz)
        iteraciones = limpiar_inf_nan(iteraciones)


        # Limpiar valores no válidos para JSON
        raiz = limpiar_inf_nan(raiz)
        iteraciones = limpiar_inf_nan(iteraciones)

        # Registrar en historial
        entrada_historial = {
            "funcion": funcion_str if 'funcion_str' in locals() else "",
            "metodo": metodo,
            "parametros": {
                "a": a if 'a' in locals() else None,
                "b": b if 'b' in locals() else None,
                "tolerancia": tolerancia if 'tolerancia' in locals() else None
            },
            "resultado": raiz,
            "iteraciones": iteraciones,
            "timestamp": datetime.now().isoformat()
        }

        historial.insert(0, entrada_historial)

        # Limitar historial a 50 entradas para no sobrecargar
        if len(historial) > 50:
            historial.pop()

        guardar_historial(historial)

        logger.info(f"Cálculo completado con éxito. Raíz encontrada: {raiz}")
        return jsonify({
            "raiz": raiz,
            "iteraciones": iteraciones,
            "metodo": metodo,
            "funcion": funcion_str if 'funcion_str' in locals() else ""
        })

    except (ValueError, TypeError, KeyError) as e:
        logger.error(f"Error en tipos de datos: {str(e)}")
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        logger.exception("Error inesperado al procesar la solicitud")
        return jsonify({"error": "Error interno del servidor"}), 500

# Ruta para obtener historial
@app.route("/historial", methods=["GET"])
def obtener_historial():
    logger.debug("Solicitud recibida para obtener historial")
    try:
        historial_simplificado = [
            {
                "funcion": item.get("funcion", ""),
                "metodo": item.get("metodo", ""),
                "resultado": item.get("resultado", ""),
                "timestamp": item.get("timestamp", "")
            }
            for item in historial
        ]
        return jsonify(historial_simplificado)
    except Exception as e:
        logger.error(f"Error al obtener historial: {str(e)}")
        return jsonify({"error": "Error al cargar historial"}), 500

# Ruta para documentación de la API
@app.route("/api/docs", methods=["GET"])
def api_docs():
    docs = {
        "endpoints": {
            "/resolver": {
                "method": "POST",
                "description": "Resuelve una ecuación usando métodos numéricos",
                "parameters": {
                    "funcion": "string (ej: 'x**2 - 4')",
                    "metodo": "string (Bisección|Regla Falsa|Newton|Secante|Gauss-Seidel|Jacobi)",
                    "a": "number",
                    "b": "number",
                    "tolerancia": "number (opcional, default: 1e-4)"
                },
                "example_request": {
                    "funcion": "cos(4*x - 2) + exp(1 - x)",
                    "metodo": "Bisección",
                    "a": 0.8,
                    "b": 1.2,
                    "tolerancia": 0.0001
                }
            },
            "/historial": {
                "method": "GET",
                "description": "Obtiene el historial de cálculos realizados"
            }
        }
    }
    return jsonify(docs)

if __name__ == "__main__":
    logger.info("Iniciando aplicación Flask")
    app.run(debug=True, host='0.0.0.0', port=5000)
