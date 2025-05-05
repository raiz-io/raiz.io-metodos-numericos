import numpy as np

def jacobi(A, B, x0, Tol, n=500):
    """
    Método de Jacobi para resolver sistemas de ecuaciones lineales Ax = B.
    Devuelve la solución y una lista de iteraciones con los valores de x y el error en cada paso.
    """
    D = np.diag(np.diag(A))
    LU = A - D
    x = np.array(x0, dtype=float)
    iteraciones = []

    for i in range(n):
        D_inv = np.linalg.inv(D)
        xtemp = x.copy()
        x = np.dot(D_inv, np.dot(-LU, x)) + np.dot(D_inv, B)
        error = np.linalg.norm(x - xtemp)
        iteraciones.append({
            "iter": i,
            "x": x.tolist(),
            "error": error
        })
        if error < Tol:
            break

    return x.tolist(), iteraciones

#Campo de prueba
#A = [[4,1,2],[-1,7,-1],[2,-3,5]]
#b = [10,3,4]
#x0 = [1.0, 1.0, 1.0]
#Tol=0.001
#solucion, iteraciones = jacobi(A, b, x0,Tol)
#print("Solución final:", solucion)
#print("Iteraciones guardadas:", iteraciones)