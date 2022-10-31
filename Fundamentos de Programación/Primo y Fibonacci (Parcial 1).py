#Elabore un algoritmo que lea dos números enteros y se sumen; si el resultado de la suma es par, calcule el numero de términos de la serie de Fibonacci. Si es impar, evalúe si es primo o no

def EvaluarPrimo(numero):
  divisiones = 0
  actual = 2

  while(actual < numero and divisiones == 0):
    if(numero%actual == 0):
        divisiones += 1
        print("El numero No es Primo")
    actual += 1
  
  if(divisiones == 0):
    print("El numero ",numero ," es Primo")
    
def Fibonacci(ant,act,fin):
  print(ant)
  aux = act
  act = act+ant
  ant = aux
  fin -= 1
  if(fin!=0):
    Fibonacci(ant,act,fin)

x = int(input("Inserte un número: "))
y = int(input("Inserte otro número número: "))

sum = x+y
print("La suma es ",sum)
if(sum%2==0):
  #Fibonaci
  print("Se muestran ",sum," numeros de Fibonacci")
  Fibonacci(0,1,sum)
else:
  #Evalúa si el número es primo o no  
  EvaluarPrimo(sum)
