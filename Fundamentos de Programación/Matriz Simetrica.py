#PERMITA DETERMINAR SI UNA MATRIZ ES SIMETRICA

matriz = [[1,2,3],
          [2,1,2],
          [3,2,1]]

matriz = [[1,2,3],
          [1,2,3],
          [1,2,3]] 
  
simetrica = True
for i in range(len(matriz)):
  for j in range(len(matriz)):
    if(matriz[i][j] != matriz[j][i] and i != j):
      simetrica = False
      i = len(matriz) + 1
      
if(simetrica):
  print("La matriz es simetrica")
else:
  print("La matriz no es simetrica")
     