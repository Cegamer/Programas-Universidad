#Elabore un programa tal que dado como datos X nùmeros enteros, obtenga el numero de ceros que hay entre estos nùmeros. Por ejemplo, si se ingresa 6 datos: 9 0 4 8 0 1 El algoritmo arroja que hay 2 ceros
numeros = int(input("Cuantos números quiere ingresar?: "))
arr = []
ceros = 0
for i in range(numeros):
  i = int(input("Inserte un número: "))
  if(i == 0):
    ceros += 1
  arr.append(i)
print("Los numeros son: ", arr)
print(f"Hay {ceros} ceros")
