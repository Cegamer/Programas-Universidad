#programa que lea dos matrices de 3x3 y calcule su suma
import numpy as np
m1 = []
m2 = []

print("Numeros de M1")
for i in range(3):
  for j in range(3):
    m1.append(int(input("Inserte un numero")))

print("Numeros de M2")
for i in range(3):
  for j in range(3):
    m2.append(int(input("Inserte un numero")))
print(m1)
print(m2)

suma = np.array(m1)+np.array(m2)
print(suma)