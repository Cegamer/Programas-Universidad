import random

def llenarMatriz(filas,columnas):
  print("Matriz")
  matriz = []
  for i in range(0,filas):
    vect = []
    for j in range(0,columnas):
      vect.append(random.randint(0,9))
    print(vect)
    matriz.append(vect)
  return matriz
  
def puedeMultiplicar(matrizA,matrizB):
  if(len(matrizA[0]) != len(matrizB)):
    print("Las matrices no se puede multiplicar")
    return False
  return True
  
def multiplicarMatrices(matrizA,matrizB):
  resultado = []
  fil = len(matrizA)
  col = len(matrizA[0])
  col2 = len(matrizB[0])
  if(puedeMultiplicar(matrizA,matrizB)):
    for k in range(fil):
      resultado.append([0]*col2)
    for i in range (fil):
      for j in range (col):
        for k in range (col2):
          resultado[i][k]= resultado[i][k]+(matrizA[i][j]*matrizB[j][k])
    print("Resultado:")
    return resultado
  return ""

A = llenarMatriz(2,2)
B = llenarMatriz(2,3)
print(multiplicarMatrices(A,B))
      
