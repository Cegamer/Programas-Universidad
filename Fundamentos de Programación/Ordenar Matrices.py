#Elabore un algoritmo que lea una matriz de 3x3 y la ordene ascendentemente
def insertarMatriz(dimension):
  matriz = []
  for i in range(dimension):
    vect = []
    for j in range(dimension):
      vect.append(int(input("Inserte un número ")))
    matriz.append(vect)
  return matriz
  
def mostrarMatriz(matriz):
  string = "{:^6}"
  for i in range(len(matriz)):
    for j in range(len(matriz[0])):
      print(string.format(matriz[i][j]) ,end="")
    print("")
    
def ordenarMatriz(matriz):
  ordered = False
  while not ordered:
    changes = 0
    for i in range(len(matriz)):
      for j in range(len(matriz)):
        if(j == len(matriz)-1 and i != len(matriz)-1):
          if(matriz[i][j] > matriz[i+1][0]):
            aux = matriz[i][j]
            matriz[i][j] = matriz[i+1][0]
            matriz[i+1][0] = aux
            changes +=1
        
        elif (j != len(matriz)-1 and matriz[i][j] > matriz[i][j+1]):
          aux = matriz[i][j]
          matriz[i][j] = matriz[i][j+1]
          matriz[i][j+1] = aux
          changes += 1
    if changes == 0:
        ordered = True
  return matriz

matriz = insertarMatriz(3)
print("\nMatriz Original")
mostrarMatriz(matriz)
print("\nMatriz Ordenada")
mostrarMatriz(ordenarMatriz(matriz))