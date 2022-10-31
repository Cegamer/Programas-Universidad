#Elabore un algoritmo que lea dos vectores de 4 elementos y los sume
vector1 = []
vector2 = []

limiteVector = 4

def llenarVector(vector):
  while(len(vector) < limiteVector):
    x = int(input("\tInserte un número "))
    vector.append(x)

def sumarDosVectores(vector1,vector2):
  resultado = []
  for i in range(0,len(vector1)):
    resultado.append(vector1[i] + vector2[i])
  return resultado

print("Vectores de ",limiteVector, " números")
print("Valores del primer vector ")
llenarVector(vector1)
print("Valores del segundo vector vector ")
llenarVector(vector2)

print("\nLos dos vectores son")
print(vector1)
print(vector2)
print("")

print("Suma de los dos vectores")
print(sumarDosVectores(vector1,vector2))
