// Diccionario con información de todos los métodos
const metodosInfo = {
    "Bisección": {
      titulo: "Método de Bisección",
      descripcion: "Divide repetidamente el intervalo a la mitad hasta encontrar la raíz.",
      algoritmo: `
        1. Elegir a y b tal que f(a)*f(b) < 0
        2. Calcular c = (a + b)/2
        3. Si f(c) ≈ 0, c es la raíz
        4. Si f(a)*f(c) < 0, nueva búsqueda en [a, c]
        5. Sino, nueva búsqueda en [c, b]
        6. Repetir hasta convergencia
      `,
      ventajas: [
        "Siempre converge si hay cambio de signo",
        "Fácil de implementar",
        "Muy estable"
      ],
      desventajas: [
        "Convergencia lenta (lineal)",
        "Requiere intervalo con cambio de signo"
      ]
    },
    "Regula Falsi": {
    titulo: "Método de Regula Falsi (Falsa Posición)",
    descripcion: "Versión mejorada de bisección que usa interpolación lineal para acelerar convergencia.",
    algoritmo: `
      1. Elegir a, b tal que f(a)*f(b) < 0
      2. Calcular c = a - f(a)*(b-a)/(f(b)-f(a))
      3. Si f(c) ≈ 0, c es la raíz
      4. Si f(a)*f(c) < 0, nueva búsqueda en [a, c]
      5. Sino, nueva búsqueda en [c, b]
      6. Repetir hasta convergencia
    `,
    ventajas: [
      "Converge más rápido que bisección",
      "Mantiene garantía de convergencia",
      "Uso eficiente de evaluaciones de función"
    ],
    desventajas: [
      "Puede estancarse en un extremo",
      "Requiere cambio de signo inicial",
      "Convergencia no siempre uniforme"
    ]
    },
    "Newton": {
    titulo: "Método de Newton-Raphson",
    descripcion: "Utiliza derivadas para encontrar rápidamente raíces mediante aproximaciones lineales.",
    algoritmo: `
      1. Elegir punto inicial x₀
      2. Calcular f(xₙ) y f'(xₙ)
      3. xₙ₊₁ = xₙ - f(xₙ)/f'(xₙ)
      4. Repetir hasta que |xₙ₊₁ - xₙ| < tolerancia
    `,
    ventajas: [
      "Convergencia cuadrática (rápida)",
      "Preciso cerca de la raíz",
      "Eficiente para funciones derivables"
    ],
    desventajas: [
      "Requiere calcular la derivada",
      "Puede divergir si el punto inicial es malo",
      "No funciona con derivadas cero"
    ]
    },
    "Secante": {
    titulo: "Método de la Secante",
    descripcion: "Versión sin derivadas del método de Newton, usa aproximación por diferencia.",
    algoritmo: `
      1. Elegir puntos iniciales x₀ y x₁
      2. Calcular f(xₙ) y f(xₙ₋₁)
      3. xₙ₊₁ = xₙ - f(xₙ)[(xₙ - xₙ₋₁)/(f(xₙ) - f(xₙ₋₁))]
      4. Repetir hasta convergencia
    `,
    ventajas: [
      "No requiere derivada",
      "Más rápido que bisección",
      "Buen compromiso velocidad-complejidad"
    ],
    desventajas: [
      "Convergencia no garantizada",
      "Puede ser inestable",
      "Selección inicial crítica"
    ]
    },
    "Gauss": {
      titulo: "Eliminación Gaussiana",
      descripcion: "Transforma el sistema en una matriz triangular superior mediante operaciones elementales.",
      algoritmo: `
        1. Formar matriz aumentada [A|B]
        2. Aplicar eliminación hacia adelante:
           a. Escalonar la matriz
           b. Hacer ceros debajo de los pivotes
        3. Resolver por sustitución regresiva
      `,
      ventajas: [
        "Directo (no iterativo)",
        "Eficiente para sistemas pequeños/medianos",
        "Base para otros métodos"
      ],
      desventajas: [
        "Inestable sin pivoteo",
        "Costoso para sistemas grandes (O(n³))"
      ]
    },
    "Gauss-Jordan": {
      titulo: "Método de Gauss-Jordan",
      descripcion: "Extensión de Gauss que produce una matriz identidad en lugar de triangular.",
      algoritmo: `
        1. Formar matriz aumentada [A|B]
        2. Aplicar eliminación completa:
           a. Escalonar la matriz
           b. Hacer ceros arriba y abajo de los pivotes
        3. Normalizar los pivotes a 1
        4. La solución aparece en la columna aumentada
      `,
      ventajas: [
        "Produce solución directamente",
        "Útil para calcular inversas de matrices",
        "Conceptualmente simple"
      ],
      desventajas: [
        "Más operaciones que Gauss estándar",
        "Mismo problema de estabilidad que Gauss"
      ]
    },
    "Gauss-Seidel": {
    titulo: "Método Gauss-Seidel",
    descripcion: "Método iterativo para sistemas lineales que usa valores actualizados inmediatamente.",
    algoritmo: `
      1. Descomponer A = L + D + U
      2. Elegir vector inicial x⁰
      3. Para cada iteración k:
         xᵢ⁽ᵏ⁺¹⁾ = (bᵢ - Σⱼ₌₁ⁱ⁻¹ aᵢⱼxⱼ⁽ᵏ⁺¹⁾ - Σⱼ₌ᵢ₊₁ⁿ aᵢⱼxⱼ⁽ᵏ⁾) / aᵢᵢ
      4. Repetir hasta ||x⁽ᵏ⁺¹⁾ - x⁽ᵏ⁾|| < tolerancia
    `,
    ventajas: [
      "Converge más rápido que Jacobi",
      "Uso eficiente de memoria",
      "Actualización inmediata de valores"
    ],
    desventajas: [
      "Orden de ecuaciones afecta convergencia",
      "No siempre converge",
      "Dependencia del orden"
    ]
    },
    "Jacobi": {
    titulo: "Método de Jacobi",
    descripcion: "Método iterativo para resolver sistemas lineales descomponiendo la matriz.",
    algoritmo: `
      1. Descomponer A = D + R
      2. Elegir vector inicial x⁰
      3. Para cada iteración k:
         x⁽ᵏ⁺¹⁾ = D⁻¹(b - Rx⁽ᵏ⁾)
      4. Repetir hasta convergencia
    `,
    ventajas: [
      "Fácil de paralelizar",
      "Simple de implementar",
      "Converge para matrices diagonalmente dominantes"
    ],
    desventajas: [
      "Convergencia lenta",
      "Requiere almacenar dos vectores de solución",
      "No siempre converge"
    ]
  }
};

function cerrarInfo() {
    const panel = document.getElementById('info-metodo');
    panel.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      panel.style.display = 'none';
      panel.style.animation = '';
    }, 300);
  }
  
  function seleccionarMetodo(metodo) {
    // Cambiar el método seleccionado en el formulario
    document.getElementById('metodo').value = metodo;
    
    // Mostrar información del método
    mostrarInfoMetodo(metodo);
    
    // Actualizar la interfaz según el método
    toggleElementosPorMetodo();
  }
  
  function mostrarInfoMetodo(metodo) {
    const info = metodosInfo[metodo];
    if (!info) return;
    
    const panel = document.getElementById('info-metodo');
    const titulo = document.getElementById('info-titulo');
    const contenido = document.getElementById('info-contenido');
    
    titulo.textContent = info.titulo;
    contenido.innerHTML = `
      <p><strong>Descripción:</strong> ${info.descripcion}</p>
      <div class="method-details">
        <div>
          <p><strong>Algoritmo:</strong></p>
          <pre>${info.algoritmo}</pre>
        </div>
        <div>
          <p><strong>Ventajas:</strong></p>
          <ul>${info.ventajas.map(v => `<li>${v}</li>`).join('')}</ul>
        </div>
        <div>
          <p><strong>Desventajas:</strong></p>
          <ul>${info.desventajas.map(d => `<li>${d}</li>`).join('')}</ul>
        </div>
      </div>
    `;
    
    panel.style.display = 'block';
  }
  
  // Cambia los onclick en el sidebar (solo para mostrar info)
  function configurarSidebar() {
    document.querySelectorAll('.sidebar nav a').forEach(boton => {
      const metodo = boton.querySelector('span').textContent.trim();
      boton.onclick = (e) => {
        e.preventDefault();
        mostrarInfoMetodo(metodo);
      };
    });
  }
  
  // Ejecutar al cargar la página
  document.addEventListener('DOMContentLoaded', configurarSidebar);

let chartInstanceError = null;
let chartInstanceRaiz = null;
let chartInstanceFX = null;

function configurarGraficosIniciales() {
    // Ocultar gráficos que no son relevantes al inicio
    document.getElementById('grafico-fx').closest('.card').style.display = 'none';
    document.getElementById('grafico-ecuaciones').style.display = 'none';
    toggleElementosPorMetodo();
}

// Llamar esta función cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
    configurarGraficosIniciales();
    // ... (otras inicializaciones que ya tengas)
});

// =====================
// Funciones para graficar sistemas de ecuaciones (2D/3D)
// =====================

function graficarSistemaEcuaciones(A, B, solucion = null) {
    const n = A.length;
    if (n === 2) {
        graficarSistema2D(A, B, solucion);
    } else if (n === 3) {
        graficarSistema3D(A, B, solucion);
    }
}

function graficarSistema2D(A, B, solucion) {
    // Limpiar gráfico existente
    Plotly.purge('grafico-ecuaciones');
    
    const ecuaciones = [];
    for (let i = 0; i < A.length; i++) {
        const a1 = A[i][0] || 0;
        const a2 = A[i][1] || 1; // Evitar división por cero
        const b = B[i];
        
        ecuaciones.push({
            x: [-10, 10],
            y: [(b - a1 * -10) / a2, (b - a1 * 10) / a2],
            type: 'line',
            name: `${a1.toFixed(2)}x + ${a2.toFixed(2)}y = ${b.toFixed(2)}`,
            line: { color: `hsl(${i * 90}, 70%, 50%)` }
        });
    }

    // Añadir punto de solución si existe y es válido
    if (solucion && Array.isArray(solucion) && solucion.length === 2 && 
        !isNaN(solucion[0]) && !isNaN(solucion[1])) {
        
        ecuaciones.push({
            x: [solucion[0]],
            y: [solucion[1]],
            mode: 'markers',
            marker: { 
                size: 12, 
                color: 'red', 
                symbol: 'star' 
            },
            name: 'Solución'
        });
    }

    Plotly.newPlot('grafico-ecuaciones', ecuaciones, {
        title: 'Sistema 2D',
        margin: { t: 40 },
        xaxis: { range: [-10, 10] },
        yaxis: { range: [-10, 10] }
    });
}

function graficarSistema3D(A, B, solucion = null) {
    // Limpiar gráfico existente
    Plotly.purge('grafico-ecuaciones');
    
    const ecuaciones = [];
    const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'];
    const range = [-10, 10];
    const step = 0.5;
    
    // Generar datos para cada ecuación
    for (let i = 0; i < A.length; i++) {
        const a1 = A[i][0] || 0;
        const a2 = A[i][1] || 0;
        const a3 = A[i][2] || 1; // Evitar división por cero
        const b = B[i];
        
        // Generar puntos para el plano
        const x = [], y = [], z = [];
        for (let xi = range[0]; xi <= range[1]; xi += step) {
            for (let yi = range[0]; yi <= range[1]; yi += step) {
                x.push(xi);
                y.push(yi);
                const zi = (b - a1 * xi - a2 * yi) / a3;
                z.push(zi);
            }
        }
        
        ecuaciones.push({
            x, y, z,
            type: 'mesh3d',
            name: `${a1.toFixed(2)}x + ${a2.toFixed(2)}y + ${a3.toFixed(2)}z = ${b.toFixed(2)}`,
            color: colors[i % colors.length],
            opacity: 0.8,
            flatshading: true
        });
    }
    
    // Añadir punto de solución si existe
    if (solucion && solucion.length === 3 && 
        !isNaN(solucion[0]) && !isNaN(solucion[1]) && !isNaN(solucion[2])) {
        
        ecuaciones.push({
            x: [solucion[0]],
            y: [solucion[1]],
            z: [solucion[2]],
            mode: 'markers',
            type: 'scatter3d',
            marker: {
                size: 10,
                color: 'red',
                symbol: 'diamond'
            },
            name: 'Solución'
        });
    }
    
    // Configuración del layout
    const layout = {
        title: 'Sistema 3D de Ecuaciones',
        margin: { t: 40, b: 0, l: 0, r: 0 },
        scene: {
            xaxis: { title: 'X', range: range },
            yaxis: { title: 'Y', range: range },
            zaxis: { title: 'Z', range: range },
            camera: {
                eye: { x: 1.5, y: 1.5, z: 0.8 }
            }
        },
        hovermode: 'closest'
    };
    
    // Configuración de opciones para mejor interactividad
    const config = {
        responsive: true,
        scrollZoom: true,
        displayModeBar: true
    };
    
    // Crear el gráfico
    Plotly.newPlot('grafico-ecuaciones', ecuaciones, layout, config);
}

// --- Gráficas de ejemplo estáticas ---
function graficarEjemploFX() {
    const ctx = document.getElementById('grafico-fx').getContext('2d');
    if (window.chartInstanceFX) window.chartInstanceFX.destroy();

    const N = 200;
    const xs = [];
    const ys = [];
    for (let i = 0; i <= N; i++) {
        const x = -2 * Math.PI + (4 * Math.PI) * i / N;
        xs.push(x);
        ys.push(Math.sin(x) + 0.3 * Math.cos(2 * x));
    }
    window.chartInstanceFX = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xs,
            datasets: [{
                label: 'Ejemplo: f(x) = sin(x) + 0.3 cos(2x)',
                data: ys,
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false,
                pointRadius: 0,
                tension: 0.2
            }]
        },
        options: {
            animation: false,
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'x' } },
                y: { title: { display: true, text: 'f(x)' } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function graficarEjemploError() {
    const ctx = document.getElementById('grafico-error').getContext('2d');
    if (window.chartInstanceError) window.chartInstanceError.destroy();

    const N = 30;
    const labels = [];
    const errores = [];
    for (let i = 0; i < N; i++) {
        labels.push(i + 1);
        errores.push(Math.exp(-0.2 * i) * (1 + 0.2 * Math.sin(i)));
    }
    window.chartInstanceError = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Ejemplo: Error',
                data: errores,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.2
            }]
        },
        options: {
            animation: false,
            responsive: true,
            scales: {
                y: {
                    type: 'logarithmic',
                    title: { display: true, text: 'Error' }
                },
                x: {
                    title: { display: true, text: 'Iteración' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function graficarEjemploRaiz() {
    const ctx = document.getElementById('grafico-raiz').getContext('2d');
    if (window.chartInstanceRaiz) window.chartInstanceRaiz.destroy();

    const N = 30;
    const labels = [];
    const aprox = [];
    for (let i = 0; i < N; i++) {
        labels.push(i + 1);
        aprox.push(1.5 + 0.5 * Math.exp(-0.18 * i) * Math.cos(i));
    }
    window.chartInstanceRaiz = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Ejemplo: Aproximación de raíz',
                data: aprox,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
                tension: 0.2
            }]
        },
        options: {
            animation: false,
            responsive: true,
            scales: {
                y: { title: { display: true, text: 'Aproximación' } },
                x: { title: { display: true, text: 'Iteración' } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}


// Detener animaciones de ejemplo cuando se muestran resultados reales
function detenerAnimacionesEjemplo() {
    if (window.fxAnimFrame) cancelAnimationFrame(window.fxAnimFrame);
    if (window.errorAnimFrame) cancelAnimationFrame(window.errorAnimFrame);
    if (window.raizAnimFrame) cancelAnimationFrame(window.raizAnimFrame);
}

// =====================
// Utilidades de función
// =====================

// Traducción y preparación de funciones para JS
function prepararFuncionParaEval(f) {
    // Manejar la constante e (2.71828...) correctamente
    f = f.replace(/(^|[^a-zA-Z_])e($|[^a-zA-Z_])/g, '$1Math.E$2');

    // Manejar e** como Math.exp
    f = f.replace(/e\*\*([^\s]+)/g, 'Math.exp($1)');

    // Reemplazar ^ por ** para potencias
    f = f.replace(/\^/g, '**');

    // Reemplazar funciones matemáticas por Math.*
    f = f.replace(/\b(sin|cos|tan|log|exp|sqrt|abs)\b/g, 'Math.$1');

    // Insertar multiplicaciones implícitas
    f = f.replace(/(\d)([a-zA-Z\(])/g, '$1*$2')
         .replace(/([a-zA-Z\)])(\d)/g, '$1*$2')
         //.replace(/([a-zA-Z])\(/g, '$1*(')
         .replace(/\)([a-zA-Z])/g, ')*$1');

    return f;
}

function traducirFuncionesEspanol(funcion) {
    return funcion
        .replace(/\bsen\b/g, 'sin')
        .replace(/\btg\b/g, 'tan')
        .replace(/\bln\b/g, 'log');
}

function safeEvalFunction(fx) {
    // Preparar la función para evaluación
    const preparedFx = prepararFuncionParaEval(fx);
    
    return function(x) {
        try {
            // Reemplazar x por el valor numérico
            const expr = preparedFx.replace(/x/g, `(${x})`);
            
            // Evaluar de forma segura usando Function
            return (new Function('return ' + expr))();
        } catch (e) {
            console.warn(`Error al evaluar f(${x}): ${e}`);
            return NaN;
        }
    };
}


// =====================
// Mostrar/ocultar campos según el método seleccionado
// =====================
function toggleElementosPorMetodo() {
    const metodo = document.getElementById('metodo').value;
    const esJacobi = (metodo === 'Jacobi');
    const esNewton = (metodo === 'Newton');
    const esGauss = (metodo === 'Gauss');
    const esGaussJordan = (metodo === 'Gauss-Jordan');
    const esGaussSeidel = (metodo === 'Gauss-Seidel');
    const esMetodoMatricial = esGauss || esGaussJordan || esGaussSeidel || esJacobi;
    const esMetodoDirecto = esGauss || esGaussJordan;

    // Mostrar/ocultar campos de entrada
    document.getElementById('grupo-tol').style.display = esMetodoDirecto ? 'none' : 'block';
    document.getElementById('tolerancia').style.display = esMetodoDirecto ? 'none' : 'block';
    document.getElementById('jacobi-sistema').style.display = esMetodoMatricial ? 'block' : 'none';
    document.getElementById('jacobi-vector').style.display = (esGaussSeidel || esJacobi) ? 'block' : 'none';
    document.getElementById('grupo-funcion').style.display = esMetodoMatricial ? 'none' : 'block';
    document.getElementById('grupo-a').style.display = esMetodoMatricial ? 'none' : 'block';
    document.getElementById('grupo-b').style.display = (esMetodoMatricial || esNewton) ? 'none' : 'block';

    // Mostrar/ocultar gráficos según el método
    if (esMetodoMatricial) {
        document.getElementById('grafico-fx').closest('.card').style.display = 'none';
        document.getElementById('grafico-ecuaciones').closest('.card').style.display = 'block';
    } else {
        document.getElementById('grafico-fx').closest('.card').style.display = 'block';
        document.getElementById('grafico-ecuaciones').closest('.card').style.display = 'none';
    }

    // Ocultar gráficos de error y aproximación para métodos directos
    document.getElementById('grafico-error').closest('.card').style.display = esMetodoDirecto ? 'none' : 'block';
    document.getElementById('grafico-raiz').closest('.card').style.display = esMetodoDirecto ? 'none' : 'block';
}
document.addEventListener('DOMContentLoaded', toggleElementosPorMetodo);
document.getElementById('metodo').addEventListener('change', toggleElementosPorMetodo);

// =====================
// Validación robusta para Jacobi y otros métodos
// =====================
function validarEntrada(datos) {
    if (datos.metodo === 'Jacobi' || datos.metodo === 'Gauss-Seidel') {
        if (!datos.Sistema_ecuaciones || !datos.Sistema_ecuaciones.trim()) {
            throw new Error("El metodo requiere un sistema de ecuaciones");
        }
        if (!datos.vector_valores_iniciales || !datos.vector_valores_iniciales.trim()) {
            throw new Error("El metodo requiere un vector inicial");
        }
        if (isNaN(datos.tolerancia) || datos.tolerancia <= 0) {
            throw new Error("La tolerancia debe ser un número positivo");
        }
    }
    else if (datos.metodo === 'Gauss' || datos.metodo === 'Gauss-Jordan') {
        if (!datos.Sistema_ecuaciones || !datos.Sistema_ecuaciones.trim()) {
            throw new Error("El metodo requiere un sistema de ecuaciones");
        }
    }
    else if (datos.metodo === 'Newton') {
        if (!datos.funcion || !datos.funcion.trim()) {
            throw new Error("La función no puede estar vacía");
        }
        if (isNaN(datos.a)) {
            throw new Error("El valor a debe ser un número");
        }
        if (isNaN(datos.tolerancia) || datos.tolerancia <= 0) {
            throw new Error("La tolerancia debe ser un número positivo");
        }
    } 
    else {
        if (!datos.funcion || !datos.funcion.trim()) {
            throw new Error("La función no puede estar vacía");
        }
        if (isNaN(datos.a) || isNaN(datos.b)) {
            throw new Error("Los valores a y b deben ser números");
        }
        if (isNaN(datos.tolerancia) || datos.tolerancia <= 0) {
            throw new Error("La tolerancia debe ser un número positivo");
        }
    }

    // Validaciones específicas por método
    switch(datos.metodo) {
        case "Newton":
            if (datos.a === 0) {
                throw new Error("Para el método de Newton, 'a' no puede ser cero");
            }
            break;
        case "Secante":
            if (datos.a === datos.b) {
                throw new Error("Para el método de Secante, 'a' y 'b' deben ser diferentes");
            }
            break;
    }
}

// =====================
// Obtener datos del formulario
// =====================
function obtenerDatosFormulario() {
    const metodo = document.getElementById('metodo').value;
    if (metodo === 'Jacobi' || metodo === 'Gauss-Seidel') {
        return {
            metodo,
            Sistema_ecuaciones: document.getElementById('sistemaJacobi').value,
            vector_valores_iniciales: document.getElementById('vectorEntrada').value,
            tolerancia: parseFloat(document.getElementById('tolerancia').value)
        };
    }
    else if (metodo === 'Gauss-Jordan' || metodo === 'Gauss') {
        return {
            metodo,
            Sistema_ecuaciones: document.getElementById('sistemaJacobi').value
        };
    }
    else {
        return {
            metodo,
            funcion: document.getElementById('funcion').value,
            a: parseFloat(document.getElementById('a').value),
            b: parseFloat(document.getElementById('b').value),
            tolerancia: parseFloat(document.getElementById('tolerancia').value)
        };
    }
}

// =====================
// Enviar datos al backend
// =====================
async function enviarDatosAlServidor(datos) {
    const response = await fetch('/resolver', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(datos)
    });

    let responseBody;
    const contentType = response.headers.get("content-type");

    if (!response.ok) {
        try {
            if (contentType && contentType.includes("application/json")) {
                responseBody = await response.json();
                throw new Error(responseBody.error || "Error en el servidor");
            } else {
                responseBody = await response.text();
                throw new Error("Error inesperado del servidor: " + responseBody);
            }
        } catch (e) {
            throw new Error("Error inesperado del servidor.");
        }
    }

    return await response.json();
}

// =====================
// Graficar f(x), aproximaciones y raíz encontrada
// =====================
function graficarFuncionFX(funcionStr, a, b, aproximaciones = [], raiz = null) {
    const ctx = document.getElementById('grafico-fx').getContext('2d');

    // Destruir gráfico anterior si existe
    if (window.chartInstanceFX) {
        window.chartInstanceFX.destroy();
    }

    // Crear función evaluable segura
    const f = safeEvalFunction(funcionStr);

    // Determinar rango de graficación (más inteligente)
    let inicio = Math.min(a, b);
    let fin = Math.max(a, b);
    const rangoOriginal = fin - inicio;
    
    // Ajustar el rango si tenemos una raíz
    if (raiz !== null && !isNaN(raiz)) {
        inicio = Math.min(inicio, raiz - rangoOriginal/2);
        fin = Math.max(fin, raiz + rangoOriginal/2);
    }
    
    // Rango mínimo por defecto
    if (fin - inicio < 0.5) {
        const centro = (inicio + fin) / 2;
        inicio = centro - 2.5;
        fin = centro + 2.5;
    }

    // Generar puntos para el gráfico (formato {x, y})
    const N = 300; // Más puntos para curva más suave
    const puntosFuncion = [];
    const puntosRaiz = [];
    
    for (let i = 0; i <= N; i++) {
        const x = inicio + (fin - inicio) * i / N;
        const y = f(x);
        if (isFinite(y)) {
            puntosFuncion.push({x, y});
        }
    }

    // Punto para la raíz si existe
    if (raiz !== null && !isNaN(raiz)) {
        const yRaiz = f(raiz);
        puntosRaiz.push({
            x: raiz,
            y: isFinite(yRaiz) ? yRaiz : 0
        });
    }

    // Configurar el gráfico con estilo profesional
    window.chartInstanceFX = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Función f(x)',
                    data: puntosFuncion,
                    borderColor: '#3a86ff', // Azul moderno
                    backgroundColor: 'rgba(58, 134, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    pointRadius: 0,
                    tension: 0.2, // Curva más suave
                    borderCapStyle: 'round',
                    borderJoinStyle: 'round'
                },
                {
                    label: 'Raíz encontrada',
                    data: puntosRaiz,
                    backgroundColor: '#ff006e', // Rosa vibrante
                    borderColor: '#ff006e',
                    pointRadius: 8,
                    pointHoverRadius: 10,
                    pointStyle: 'circle',
                    type: 'scatter'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                duration: 1000 // Animación suave
            },
            layout: {
                padding: {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Eje x',
                        font: {
                            family: 'Arial',
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#333'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        lineWidth: 1
                    },
                    ticks: {
                        font: {
                            family: 'Arial',
                            size: 12
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'f(x)',
                        font: {
                            family: 'Arial',
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#333'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        lineWidth: 1
                    },
                    ticks: {
                        font: {
                            family: 'Arial',
                            size: 12
                        },
                        callback: function(value) {
                            if (value >= 1000 || value <= -1000) {
                                return value.toExponential(2);
                            }
                            return value;
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Arial',
                            size: 12,
                            weight: 'bold'
                        },
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        family: 'Arial',
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: 'Arial',
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            if (context.datasetIndex === 1) {
                                return `Raíz: ${context.parsed.x.toFixed(6)}`;
                            }
                            return `f(${context.parsed.x.toFixed(2)}) = ${context.parsed.y.toFixed(6)}`;
                        }
                    }
                }
            }
        }
    });
}

// =====================
// Submit handler principal
// =====================
document.getElementById('form-metodo').addEventListener('submit', async function(e) {
    e.preventDefault();
    try {
        const datos = obtenerDatosFormulario();
        validarEntrada(datos);

        let resultado = await enviarDatosAlServidor(datos);
        console.log("Resultado recibido:", JSON.stringify(resultado, null, 2));

        detenerAnimacionesEjemplo();
        
        // Identificar tipos de métodos
        const esMetodoMatricial = ["Gauss", "Gauss-Jordan", "Gauss-Seidel", "Jacobi"].includes(resultado.metodo);
        const esMetodoDirecto = ["Gauss", "Gauss-Jordan"].includes(resultado.metodo);
        const esMetodoIterativoMatricial = ["Gauss-Seidel", "Jacobi"].includes(resultado.metodo);
        
        // Ocultar/mostrar gráficos según el método
        if (esMetodoMatricial) {
            // Ocultar gráfico de función completamente
            document.getElementById('grafico-fx').closest('.card').style.display = 'none';
            
            // Mostrar gráfico de sistema de ecuaciones
            document.getElementById('grafico-ecuaciones').style.display = 'block';
            
            // Convertir el sistema de ecuaciones a matrices A y B
            const sistema = datos.Sistema_ecuaciones.trim().split('\n');
            const A = [];
            const B = [];
            
            for (const eq of sistema) {
                const partes = eq.split('=');
                const coefs = partes[0].trim().split(/\s*[+-]\s*/).filter(x => x);
                const fila = coefs.map(c => parseFloat(c.replace(/[^0-9.-]/g, '')));
                A.push(fila);
                B.push(parseFloat(partes[1].trim()));
            }
            
            let solucionGrafico = Array.isArray(resultado.raiz) ? 
                                resultado.raiz : 
                                [resultado.raiz.x, resultado.raiz.y];

            graficarSistemaEcuaciones(A, B, resultado.raiz);
        } else {
            // Métodos tradicionales (mostrar gráfico de función)
            document.getElementById('grafico-fx').closest('.card').style.display = 'block';
            document.getElementById('grafico-ecuaciones').style.display = 'none';
            
            let aproximaciones = [];
            if (resultado.iteraciones && resultado.iteraciones.length > 0) {
                if ("xp" in resultado.iteraciones[0]) {
                    aproximaciones = resultado.iteraciones.map(fila => fila.xp);
                } else if ("xi" in resultado.iteraciones[0]) {
                    aproximaciones = resultado.iteraciones.map(fila => fila.xi);
                }
            }

            let funcionLimpia = resultado.funcion || datos.funcion;
            let raiz = resultado.raiz;

            if (funcionLimpia && !isNaN(datos.a) && !isNaN(datos.b)) {
                graficarFuncionFX(funcionLimpia, datos.a, datos.b, aproximaciones, raiz);
            } else if (funcionLimpia && !isNaN(datos.a)) {
                graficarFuncionFX(funcionLimpia, datos.a - 2, datos.a + 2, aproximaciones, raiz);
            }
        }

        // Manejo de gráficos de error y aproximación
        if (esMetodoDirecto) {
            // Ocultar completamente para métodos directos (Gauss y Gauss-Jordan)
            document.getElementById('grafico-error').closest('.card').style.display = 'none';
            document.getElementById('grafico-raiz').closest('.card').style.display = 'none';
            
            // Limpiar los gráficos
            const ctxError = document.getElementById('grafico-error').getContext('2d');
            const ctxRaiz = document.getElementById('grafico-raiz').getContext('2d');
            ctxError.clearRect(0, 0, ctxError.canvas.width, ctxError.canvas.height);
            ctxRaiz.clearRect(0, 0, ctxRaiz.canvas.width, ctxRaiz.canvas.height);
        } else if (esMetodoIterativoMatricial) {
            // Mostrar solo gráfico de error para métodos iterativos matriciales (Gauss-Seidel, Jacobi)
            document.getElementById('grafico-error').closest('.card').style.display = 'block';
            document.getElementById('grafico-raiz').closest('.card').style.display = 'none';
            
            // Limpiar gráfico de aproximación
            const ctxRaiz = document.getElementById('grafico-raiz').getContext('2d');
            ctxRaiz.clearRect(0, 0, ctxRaiz.canvas.width, ctxRaiz.canvas.height);
        } else {
            // Mostrar ambos para métodos tradicionales
            document.getElementById('grafico-error').closest('.card').style.display = 'block';
            document.getElementById('grafico-raiz').closest('.card').style.display = 'block';
        }

        // Mostrar resultados numéricos
        document.getElementById('resultado').textContent = resultado.raiz !== undefined ? resultado.raiz : '---';
        document.getElementById('iteraciones-count').textContent = resultado.iteraciones ? resultado.iteraciones.length : '0';
        
        // Mostrar error final si aplica
        if (resultado.iteraciones && resultado.iteraciones.length > 0 && !esMetodoDirecto) {
            let lastError = 0;
            const iter = resultado.iteraciones;
            if ("dxi" in iter[iter.length-1]) lastError = iter[iter.length-1].dxi;
            else if ("dxp" in iter[iter.length-1]) lastError = iter[iter.length-1].dxp;
            else lastError = iter[iter.length-1].error;
            
            document.getElementById("error-final").textContent = 
                (typeof lastError === "number" && isFinite(lastError))
                ? lastError.toExponential(4)
                : "-";
        } else {
            document.getElementById("error-final").textContent = '0.0000';
        }

        // Mostrar iteraciones si existen
        if (resultado.iteraciones) {
            mostrarIteracionesGenerico(resultado.iteraciones);
            
            // Graficar error solo para métodos no directos
            if (!esMetodoDirecto) {
                graficarIteracionesGenerico(resultado.iteraciones);
            }

            // Graficar raíz solo para métodos de una variable
            if (["Newton", "Bisección", "Regla Falsa", "Secante"].includes(resultado.metodo)) {
                graficarRaizAproximada(resultado.iteraciones);
            } else if (window.chartInstanceRaiz) {
                window.chartInstanceRaiz.destroy();
                const ctx = document.getElementById('grafico-raiz').getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
        }

        // Agregar al historial
        agregarAlHistorial(datos, resultado.raiz);

    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message
        });
        console.error(err);
    }
});

// =====================
// Historial de cálculos
// =====================
function agregarAlHistorial(datos, raiz) {
    const lista = document.getElementById('lista-historial');
    const li = document.createElement('li');
    li.textContent = `Método: ${datos.metodo} | Resultado: ${raiz}`;
    lista.insertBefore(li, lista.firstChild);
}

// =====================
// Exportar gráfica (placeholder)
function exportarGrafica(id) {
    try {
        // Para gráficos de Plotly (sistema de ecuaciones)
        if (id === 'grafico-ecuaciones') {
            Plotly.downloadImage(id, {
                format: 'png',
                filename: 'sistema-ecuaciones',
                width: 800,
                height: 600
            });
            return;
        }

        // Para gráficos de Chart.js
        const canvas = document.getElementById(id);
        
        // Verificar si el canvas existe
        if (!canvas) {
            throw new Error(`No se encontró el elemento con ID: ${id}`);
        }

        // Crear un canvas temporal para mejor calidad
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        // Configurar tamaño
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        
        // Fondo blanco
        tempCtx.fillStyle = 'white';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        
        // Dibujar el gráfico
        tempCtx.drawImage(canvas, 0, 0);

        // Crear enlace de descarga
        const link = document.createElement('a');
        link.download = `grafico-${id.split('-')[1]}.png`; // Ej: grafico-fx.png
        link.href = tempCanvas.toDataURL('image/png');
        
        // Descargar
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.error('Error al exportar:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error al exportar',
            text: 'No se pudo generar la imagen del gráfico. Asegúrate de haber generado un gráfico primero.'
        });
    }
}

// =====================
// Mostrar iteraciones universal para todos los métodos
// =====================
function mostrarIteracionesGenerico(iteraciones) {
    console.log("Graficando error:", iteraciones);
    const seccion = document.getElementById("seccion-iteraciones");
    const tabla = document.getElementById("tabla-iteraciones");
    const tbody = tabla.getElementsByTagName('tbody')[0];

    tbody.innerHTML = ""; // Limpiar tabla

    if (iteraciones && iteraciones.length > 0) {
        seccion.style.display = "block";
        document.getElementById("iteraciones-count").textContent = iteraciones.length;

        // Detectar el tipo de método por los campos presentes
        const esMetodoAB = (
            "a" in iteraciones[0] &&
            "b" in iteraciones[0] &&
            "xp" in iteraciones[0] &&
            "fxp" in iteraciones[0] &&
            "dxp" in iteraciones[0]
        );
        const esSecanteONewton = (
            "xi" in iteraciones[0] &&
            "fxi" in iteraciones[0] &&
            "mi" in iteraciones[0] &&
            "dxi" in iteraciones[0] &&
            "xi1" in iteraciones[0]
        );

        // Cambiar encabezados dinámicamente
        const thead = tabla.getElementsByTagName('thead')[0];
        if (esSecanteONewton) {
            thead.innerHTML = `
                <tr>
                    <th>i</th>
                    <th>x[i]</th>
                    <th>f(x[i])</th>
                    <th>m[i]</th>
                    <th>dx[i]</th>
                    <th>x[i+1]</th>
                </tr>
            `;
        } else if (esMetodoAB) {
            thead.innerHTML = `
                <tr>
                    <th>i</th>
                    <th>a</th>
                    <th>b</th>
                    <th>xp</th>
                    <th>f(xp)</th>
                    <th>dxp</th>
                </tr>
            `;
        } else {
            thead.innerHTML = `
                <tr>
                    <th>Iteración</th>
                    <th>x</th>
                    <th>Error</th>
                </tr>
            `;
        }

        // Mostrar el último error como error final (manejo seguro)
        let lastError = 0;
        if (esSecanteONewton) {
            lastError = iteraciones[iteraciones.length-1].dxi;
        } else if (esMetodoAB) {
            lastError = iteraciones[iteraciones.length-1].dxp;
        } else {
            lastError = iteraciones[iteraciones.length-1].error;
        }
        document.getElementById("error-final").textContent =
            (typeof lastError === "number" && isFinite(lastError))
                ? lastError.toExponential(4)
                : "-";

        iteraciones.forEach((fila, index) => {
            const tr = document.createElement("tr");

            if (esSecanteONewton) {
                // i, x[i], f(x[i]), m[i], dx[i], x[i+1]
                tr.innerHTML = `
                    <td>${fila.i !== undefined ? fila.i : index + 1}</td>
                    <td>${(typeof fila.xi === "number" && isFinite(fila.xi)) ? fila.xi.toFixed(6) : '-'}</td>
                    <td>${(typeof fila.fxi === "number" && isFinite(fila.fxi)) ? fila.fxi.toExponential(4) : '-'}</td>
                    <td>${(typeof fila.mi === "number" && isFinite(fila.mi)) ? fila.mi.toExponential(4) : '-'}</td>
                    <td>${(typeof fila.dxi === "number" && isFinite(fila.dxi)) ? fila.dxi.toExponential(4) : '-'}</td>
                    <td>${(typeof fila.xi1 === "number" && isFinite(fila.xi1)) ? fila.xi1.toFixed(6) : '-'}</td>
                `;
            } else if (esMetodoAB) {
                // i, a, b, xp, f(xp), dxp
                tr.innerHTML = `
                    <td>${fila.i !== undefined ? fila.i : index + 1}</td>
                    <td>${(typeof fila.a === "number" && isFinite(fila.a)) ? fila.a.toFixed(6) : '-'}</td>
                    <td>${(typeof fila.b === "number" && isFinite(fila.b)) ? fila.b.toFixed(6) : '-'}</td>
                    <td>${(typeof fila.xp === "number" && isFinite(fila.xp)) ? fila.xp.toFixed(6) : '-'}</td>
                    <td>${(typeof fila.fxp === "number" && isFinite(fila.fxp)) ? fila.fxp.toExponential(4) : '-'}</td>
                    <td>${(typeof fila.dxp === "number" && isFinite(fila.dxp)) ? fila.dxp.toExponential(4) : '-'}</td>
                `;
            } else {
                // iter, x, error
                tr.innerHTML = `
                    <td>${fila.iter !== undefined ? fila.iter + 1 : index + 1}</td>
                    <td>${
                        Array.isArray(fila.x)
                            ? fila.x.map(v => (typeof v === "number" && isFinite(v)) ? v.toFixed(6) : "-").join(", ")
                            : (typeof fila.x === "number" && isFinite(fila.x)
                                ? fila.x.toFixed(6)
                                : (fila.x !== undefined ? fila.x : "-"))
                    }</td>
                    <td>${
                        (typeof fila.error === "number" && isFinite(fila.error))
                            ? fila.error.toExponential(4)
                            : "-"
                    }</td>
                `;
            }

            tbody.appendChild(tr);
        });
    } else {
        seccion.style.display = "none";
    }
}

// =====================
// Gráfica universal para error vs iteración
// =====================
function graficarIteracionesGenerico(iteraciones) {
    const ctx = document.getElementById('grafico-error').getContext('2d');
    const labels = iteraciones.map((_, i) => i + 1);
    
    // Extraer errores (compatible con todos los métodos)
    const errores = iteraciones.map(fila => {
        if (fila.error !== undefined) return fila.error;
        if (fila.dxi !== undefined) return fila.dxi;
        if (fila.dxp !== undefined) return fila.dxp;
        return 0; // Valor por defecto si no hay error
    });

    if (window.chartInstanceError) {
        window.chartInstanceError.destroy();
    }

    window.chartInstanceError = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Error',
                data: errores,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    type: 'logarithmic',
                    title: { display: true, text: 'Error (escala logarítmica)' }
                },
                x: {
                    title: { display: true, text: 'Iteración' }
                }
            }
        }
    });
}

// =====================
// Gráfica para la raíz aproximada en cada iteración (solo para métodos de una variable)
// =====================
function graficarRaizAproximada(iteraciones) {
    const ctx = document.getElementById('grafico-raiz').getContext('2d');
    const labels = iteraciones.map((_, i) => i + 1);

    // Extraer aproximaciones (soporta Newton/Secante con 'xi' y otros métodos con 'xp')
    const aproximaciones = iteraciones.map(fila => {
        if (fila.xi !== undefined) return fila.xi;  // Para Newton/Secante
        if (fila.xp !== undefined) return fila.xp;  // Para Bisección/Regla Falsa
        return fila.x || 0;  // Valor por defecto
    });

    if (window.chartInstanceRaiz) {
        window.chartInstanceRaiz.destroy();
    }

    window.chartInstanceRaiz = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Aproximación de la raíz',
                data: aproximaciones,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    title: { display: true, text: 'Valor de la aproximación' }
                },
                x: {
                    title: { display: true, text: 'Iteración' }
                }
            }
        }
    });
}

function exportTableToPNG() {
    const tabla = document.getElementById('tabla-iteraciones');
    const wasDark = document.documentElement.classList.contains('dark-mode');
    if (wasDark) document.documentElement.classList.remove('dark-mode');
    html2canvas(tabla).then(function(canvas) {
      const link = document.createElement('a');
      link.download = 'tabla_iteraciones.png';
      link.href = canvas.toDataURL();
      link.click();
      if (wasDark) document.documentElement.classList.add('dark-mode');
    });
  }
  
// =====================
// Limpiar historial
function clearHistory() {
    if(confirm("¿Estás seguro de querer limpiar el historial?")) {
        document.getElementById("lista-historial").innerHTML = "";
    }
}
