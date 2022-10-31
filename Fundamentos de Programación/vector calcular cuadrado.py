#elabore un programa que lea un vector de 5 elementos y si el elemento es par calcule su cuadrado, sino calcule el cubo
import random
vectorSinOperar = []
vector = []
limiteVector = 5

while(len(vector) < limiteVector):
  x = random.randint(2,3)
  #x = int(input("Inserte un número "))
  vectorSinOperar.append(x)
  if(x %2 != 0):
    x = x**3
  else:
    x = x**2
  vector.append(x)
  
print("Vector sin operar ",vectorSinOperar)
print("Vector resultante ",vector)