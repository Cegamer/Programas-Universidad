nombre = input("Inserte el nombre del alumno ")
cantNot = int(input("Inserte la cantidad de notas que va a ingresar "))
notas = []
prom = 0
for i in range(cantNot):
  nota = int(input(f"Inserte la nota #{i+1}: "))
  notas.append(nota)
  prom += nota
prom = prom/cantNot

print(f"Notas de {nombre}:")

for i in range(len(notas)):
  print(notas[i],end="")
  if(i < len(notas)-1):
    print(" | ",end="")
print(f"\nPromedio = {prom}")
