#desarrolle un algoritmo que dados dos arreglos a y b con igual cantidad de numeros, Genere un nuevo arreglo a partir de las siguientes condiciones:
#si a y b son pares: c es la suma de a y b
#si a y b son impares: c es a-b
#de lo contrario, c es a por b


a = [0,1,2,3,4]
b = [9,8,7,6,5]
c = [0,0,0,0,0]

for i in range(0,len(a)):
  if(a[i]%2 == 0 and b[i]%2 == 0):
    c[i] = a[i] + b[i]
  elif(a[i]%2 != 0 and b[i]%2 != 0):
    c[i] = a[i] - b[i]
  else:
    c[i] = a[i] * b[i]
print(c)