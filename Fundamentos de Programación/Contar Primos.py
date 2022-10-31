#cuales y cuantos son los numeros primos comprendidos entre 1 y 1000
num=1
for i in range (1, 1000):
  number = i
  divisions = 0
  actual = 2

  while(actual < number and divisions == 0):
    if(number%actual == 0):
        divisions += 1
    actual += 1
  
  if(divisions == 0):
    print(i," Es Primo")
  