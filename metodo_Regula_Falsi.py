def regula_falsi(f, a, b, tol, max_iter=100):
    iteraciones = []
    xp_anterior = None
    for i in range(1, max_iter+1):
        fa = f(a)
        fb = f(b)
        xp = b - fb * (b - a) / (fb - fa)
        fxp = f(xp)
        dxp = abs(xp - xp_anterior) if xp_anterior is not None else 0
        iteraciones.append({
            "i": i,
            "a": a,
            "b": b,
            "xp": xp,
            "fxp": fxp,
            "dxp": dxp
        })
        if abs(fxp) < tol or (xp_anterior is not None and dxp < tol):
            break
        if fa * fxp < 0:
            b = xp
        else:
            a = xp
        xp_anterior = xp
    return xp, iteraciones