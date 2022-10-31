#Elabore un programa en python que lea un año y calcule si es biciesto o no

year = int(input("Inserte un año: "))
biciesto = False
if(year%4 == 0):
  if(year %100 == 0):
    if(year %400 == 0):
      biciesto = True
  else:
    biciesto = True
    
if(biciesto):
  print("El año es biciesto")
else:
  print("El año no es biciesto")