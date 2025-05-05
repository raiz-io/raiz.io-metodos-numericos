def MatrizAEcuaciones(matriz, variables=None):
    if not matriz:
        return []
    n_columnas = len(matriz[0])
    if variables is None:
        variables = [f'x{i+1}' for i in range(n_columnas - 1)]
    ecuaciones = []
    for fila in matriz:
        partes = []
        for coef, var in zip(fila[:-1], variables):
            if coef == 0:
                continue
            elif coef == 1:
                partes.append(f"{var}")
            elif coef == -1:
                partes.append(f"-{var}")
            else:
                partes.append(f"{coef:.2f}*{var}")
        lhs = " + ".join(partes).replace("+ -", "- ")
        rhs = f"{fila[-1]:.2f}"
        if not lhs:
            lhs = "0"
        ecuaciones.append(f"{lhs} = {rhs}")
    return ecuaciones

def gauss(A,b):
    matriz= [fila.copy() for fila in A]
    for i in range(len(b)):
        matriz[i].append(b[i])
    n = len(matriz)
    print(matriz)
    for i in range(n):
        pivote = matriz[i][i]
        if pivote == 0:
            raise ValueError("Pivote cero encontrado, se necesita pivotear filas.")
        matriz[i] = [x / pivote for x in matriz[i]]
        for j in range(i + 1, n):
            factor = matriz[j][i]
            matriz[j] = [a - factor * b for a, b in zip(matriz[j], matriz[i])]
    matriz=MatrizAEcuaciones(matriz)
    return matriz

#Aclaración, el metodo gauss(), devuelve una matríz a medio resolver. 
# Por eso hago uso de otra función, para que al resultado lo exprese como un sistema de ecuaciones.


#Campo de prueba
#Ma=[[2,-3,5],[-1,7,-1],[4,1,2]]
#Vi=[4,3,10]
#res=gauss(Ma,Vi)
#print("Luego del desarrollo:")
#print("Matriz principal:\n",Ma)
#print("Vector de terminos independiente:\n",Vi)
#print(res)