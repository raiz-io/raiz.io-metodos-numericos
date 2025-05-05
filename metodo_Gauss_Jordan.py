def gauss_jordan(A,b):
    matriz= [fila.copy() for fila in A]
    for i in range(len(b)):
        matriz[i].append(b[i])
    n = len(matriz)
    for i in range(n):
        pivote = matriz[i][i]
        if pivote == 0:
            for k in range(i + 1, n):
                if matriz[k][i] != 0:
                    matriz[i], matriz[k] = matriz[k], matriz[i]
                    pivote = matriz[i][i]
                    break
        matriz[i] = [x / pivote for x in matriz[i]]
        for j in range(n):
            if j != i:
                factor = matriz[j][i]
                matriz[j] = [a - factor * b for a, b in zip(matriz[j], matriz[i])]
    vecsol=[]
    for i in range(len(matriz)):
        vecsol.append(matriz[i][len(matriz)])
    return vecsol

#Campo de prueba
#Ma=[[2,-3,5],[-1,7,-1],[4,1,2]]
#Vi=[4,3,10]
#res=gauss_jordan(Ma,Vi)
#print("La matriz prinpal es:",Ma,"\n")
#print("El vector con los valores independientes es:",Vi,"\n")
#print(res)