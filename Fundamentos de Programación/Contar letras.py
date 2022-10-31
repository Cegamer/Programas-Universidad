#Elabore un programa en python que lea una palabra y calcule cuantas letras tiene

word = input("Inserte una palabra: ")
letras = 0
for i in word:
  if(i != " "):
    letras += 1
    print(i,"-->",letras)
print("La palabra tiene ",letras, " letras")