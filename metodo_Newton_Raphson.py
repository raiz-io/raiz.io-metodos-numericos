def newton(f, x0, tol, max_iter=100):
    iteraciones = []
    xi = x0
    for i in range(max_iter):
        fxi = f(xi)
        h = 1e-6
        mi = (f(xi + h) - f(xi - h)) / (2 * h)
        if mi == 0:
            raise ValueError("La derivada es cero. No se puede continuar.")
        xi1 = xi - fxi / mi
        dxi = abs(xi1 - xi)
        iteraciones.append({
            "i": i,
            "xi": xi,
            "fxi": fxi,
            "mi": mi,
            "dxi": dxi,
            "xi1": xi1
        })
        if abs(fxi) < tol or dxi < tol:
            break
        xi = xi1
    return xi1, iteraciones