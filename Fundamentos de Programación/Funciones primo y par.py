#Elabore programa que lea un numero y determine si el numero es mayor que 100 evalue si es primo, sino evalue si es par o impar
num = int(input("inserte un numero "))


def primo(number):
    #Elabore un algoritmo que lea un numero y diga si es primo o no
    divisions = 0
    actual = 2
    while (actual < number and divisions == 0):
        if (number % actual == 0):
            divisions += 1
            print("No Primo")
        actual += 1
    if (divisions == 0):
        print("Primo")


def par(number):
    if (number % 2 == 0):
        print("Par")
    else:
        print("Impar")


if (num > 100):
    primo(num)
else:
    par(num)
