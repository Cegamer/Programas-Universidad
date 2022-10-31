#Elabore un programa que lea un numero entero por teclado y calcule su factorial

def NumFactorial(num):
  if(num == 1): 
    return 1
  else:
    return num*NumFactorial(num-1)

n = int(input("Escriba un numero entero: "))
result = NumFactorial(n)
print("El factorial de " + str(n) +" es "+ str(result))