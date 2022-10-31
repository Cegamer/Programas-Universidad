#Elabore un algoritmo que lea un numero y diga si es primo o no
number = int(input("Inserte un número: "))
divisions = 0
actual = 2

while(actual < number and divisions == 0):
  if(number%actual == 0):
      divisions += 1
      print("No Primo")
  actual += 1
  
if(divisions == 0):
  print("Primo")
