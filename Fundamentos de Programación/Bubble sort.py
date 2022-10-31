#Elabore un algoritmo que lea un arreglo de cinco elementos y lo ordene de forma ascendente
numbers = [0,0,0,0,0]

for i in range(0,5):
  num = int(input("Inserte un número: "))
  numbers[i] = num

ordered = False
while not ordered:
    changes = 0
    for i in range(len(numbers)-1):
          if numbers[i] > numbers[i+1]:
              aux = numbers[i]
              numbers[i] = numbers[i+1]
              numbers[i+1] = aux
              changes += 1
    if changes == 0:
        ordered = True
print(numbers)