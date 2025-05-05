import numpy as np

def gauss_seidel(A, b, x0=None, tolerancia=1e-4, max_iter=100):
    A = np.array(A, dtype=float)
    b = np.array(b, dtype=float)
    n = len(b)
    x = np.zeros(n) if x0 is None else np.array(x0, dtype=float)  # Inicialización con x0 o ceros
    iteraciones = [x.copy()]  # Guardamos la aproximación inicial

    # Verificar si la matriz es diagonalmente dominante
    diagonal = np.abs(np.diag(A))
    suma_filas = np.sum(np.abs(A), axis=1) - diagonal
    if not np.all(diagonal > suma_filas):
        print("Advertencia: La matriz no es diagonalmente dominante. La convergencia no está garantizada.")

    for k in range(max_iter):
        x_anterior = x.copy()
        for i in range(n):
            sum1 = np.dot(A[i, :i], x[:i])  # Suma de los elementos ya actualizados
            sum2 = np.dot(A[i, i+1:], x_anterior[i+1:])  # Suma de los elementos no actualizados
            x[i] = (b[i] - sum1 - sum2) / A[i, i]

        iteraciones.append({
            "iter": k,
            "x": x.tolist(),
            "error": np.linalg.norm(x - x_anterior)
        })  # Guardamos la iteración actual

        # Criterio de parada: norma de la diferencia entre iteraciones
        if np.linalg.norm(x - x_anterior) < tolerancia:
            print(f"Convergencia alcanzada en {k+1} iteraciones.")
            break
    else:
        print(f"Máximo de iteraciones ({max_iter}) alcanzado sin convergencia.")
    return x.tolist(), iteraciones

#Precaución, si al metodo no se le da una matriz con diagonal dominante, el metodo solo avisrá de esto
#y solo se encargará de hacer propio metodo mecanico de iterar. Dicho desarrollo, no llegará a nada

#Campo de prueba
#A = [[4,1,2],[-1,7,-1],[2,-3,5]]
#b = [10,3,4]

# Usando un vector inicial personalizado (ejemplo: [1, 1, 1])
#x0 = [1.0, 1.0, 1.0]
#tolerancia=0.001
#solucion, iteraciones = gauss_seidel(A, b, x0, tolerancia)
#print("Despues del desarrollo, la matriz principal quedó:",A,"\n")
#print("Solución final:", solucion)
#print("Iteraciones guardadas:", iteraciones[1])