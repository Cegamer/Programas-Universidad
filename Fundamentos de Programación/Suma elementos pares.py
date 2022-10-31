#elabore un programa que lea un vector de 6 elementos y calcule la suma de los elementos pares
array = []
sum = 0

for i in range(0,6):
  num = int(input("Inserte un numero: "))
  array.append(num)
  if(num%2 == 0):  sum += num
    
print("\nEl Vector es: ", array)
print("\nLa suma de numeros pares es: ",sum)
