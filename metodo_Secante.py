def secante(f, a, b, tol, max_iter=100):
    iteraciones = []
    xi_1 = a
    xi = b
    for i in range(max_iter):
        fxi_1 = f(xi_1)
        fxi = f(xi)
        if xi - xi_1 == 0 or fxi - fxi_1 == 0:
            break  # Evitar división por cero
        mi = (fxi - fxi_1) / (xi - xi_1)
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
        xi_1, xi = xi, xi1
    return xi1, iteraciones