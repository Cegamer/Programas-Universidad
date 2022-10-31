#Elabore un programa que lea un vector de 6 elementos y cacule la suma de los elementos negativos y la suma de los elementos impares
vector1 = []
limiteVector = 6

def llenarVector(vector):
  while(len(vector) < limiteVector):
    x = int(input("\tInserte un número "))
    vector.append(x)

def sumarNegativos(vector):
  resultado = 0
  for i in range(0,len(vector)):
    if(vector[i] < 0):
      resultado += vector[i]
  return resultado

    
def sumarImpares(vector):
  resultado = 0
  for i in range(0,len(vector)):
    if(vector[i]%2 != 0):
      resultado += vector[i]
  return resultado

print("Llene un vector de ",limiteVector," Elementos")
llenarVector(vector1)
print("Suma de negativos = ", sumarNegativos(vector1))
print("Suma de impares = ", sumarImpares(vector1))
