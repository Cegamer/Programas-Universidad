from fractions import Fraction
matriz = [[3, 6, -6, 9], [2, -5, 4, 6], [-1, 16, -14, -3]]

#matriz = [[-1, 1, -1, -2], [3, 1, 1, 10], [4, 2, 3, 14]]

#matriz = [[1,  1, -1,  0], [4, -1,  5,  0], [6,  1,  3,  0]]

#Funcion para pedir el sistema de ecuaciones por consola
def pedirSistemaDeEcuaciones():
    dimension = int(input("Inserte la cantidad de filas: "))
    matrizGenerada = []
    for i in range(0, dimension): #bucle que define cada una de las filas
        print(f"fila {i+1} :")
        fila = []
        for j in range(0, dimension + 1): #bucle que añade las columnas de cada fila
            if (j < dimension):
                print(f"X{j}: ", end="")
            else:
                print("D: ", end="")
            x = input()
            if ("/" in x):
                num, den = x.split("/")
                x = float(num) / float(den)
            fila.append(float(x))
        matrizGenerada.append(fila) 
        print("\n\n")
    return matrizGenerada #Retorno de la función, una matriz de NxN dimensiones


#Funcion que muestra la matriz 
def mostrarMatriz(matrizP):
    print("")
    string = "{:^6}" #String para formatear la salida
    for i in range(0, len(matriz)):
        for j in range(0, len(matriz[0])): #Doble for que recorre la matriz y la muestra en consola
            if (j != len(matriz)):
                print(string.format(
                    str(Fraction(matriz[i][j]).limit_denominator())),
                      end="")
            else:
                print(
                    "|",
                    string.format(
                        str(Fraction(matriz[i][j]).limit_denominator())))
    print("\n")

#Función para intercambiar las filas indicadas
def intercambiarFilas(filaA, filaB):
    for i in range(0, len(matriz[0])):  #Doble for que recorre la matriz A
        for j in range(0, len(matriz[0])):
            if (i == filaA - 1):
                #Intercambia un indice de la filaA por el mismo indice de la filaB
                aux = matriz[i][j] 
                matriz[i][j] = matriz[filaB - 1][j]
                matriz[filaB - 1][j] = aux
    print(f"R{filaA} -> R{filaB}") #Mostramos en consola la operación realizada
    mostrarMatriz(matriz)  #Llamamos a la función Mostrar Matriz

#Funcion que multiplica la fila por una constante
def multiplicarPorConstante(fila, constante):
    if(constante == 1):
      return
    for j in range(0, len(matriz[0])):  #Recorremos las columnas
        matriz[fila][j] = matriz[fila][j] * constante #multiplicamos cada indice de la matriz por la constante
    print(f"R{fila+1} * {Fraction(constante).limit_denominator()}") #mostramos la operación realizada
    mostrarMatriz(matriz) #Mostramos cómo quedó la matriz

#FilaB + CFilaA (Constante Negativa para restar)
def sumarFilas(filaA, filaB, constante=1):
    if (constante == 0):
        return
    print(f"R{filaB} + ({Fraction(constante).limit_denominator()}R{filaA})") #Mostramos la operación a realizar
    filaA -= 1
    filaB -= 1
    for j in range(0, len(matriz[0])):
        matriz[filaB][j] += (constante * matriz[filaA][j]) #sumamos la filaB por la filaA*Constante
    mostrarMatriz(matriz)


#Función para verificar si se puede intercambiar filas para que los 1 queden donde van
def verificarUnosColumna(columna):
    columna -= 1  #Restamos 1 al valor de la columna para poder trabajar la matriz
    fila = columna
    for i in range(0, len(matriz)):  #Recorremos las filas de la matriz
        if (i == fila and matriz[fila][columna] == 1): #comprobamos si el pivote ya es 1
            i = len(matriz) + 1  #si el pivote ya es 1, salimos del bucle
        elif (i > fila):  #En caso de que el pivote no sea 1, recorremos las otras filas para verificar si alguna contiene un 1
            if (i != columna and matriz[i][columna] == 1): #Si otra fila tiene un 1, las intercambiamos
                intercambiarFilas(columna + 1, i + 1)
                break
            elif (matriz[i][columna] == -1): #Si otra fila tiene un -1, las intercambiamos
                intercambiarFilas(columna + 1, i + 1)
                break

    verificarCerosColumna(columna + 1)
    convertirPivoteAUno(fila+1)


#Funcion que verifica si hay ceros donde no debería en la columna e intercambia filas de ser necesario
def verificarCerosColumna(columna):
    columna -= 1
    fila = columna
    intercambiarConFila = 0
    if (fila > len(matriz) or columna > len(matriz[0])): #Sale de la función si se intenta usar valores no válidos de fila o columna
        return
    if (matriz[fila][columna] == 0):  #Verifica si hay un 0 en el pivote que necesitamos, si llega a haberlo recorre las filas para ver con cual puede cambiar
        for i in range(fila + 1, len(matriz)):
            if (matriz[i][columna] != 0):
                intercambiarConFila = i + 1
                i = len(matriz) + 1
    if (intercambiarConFila != 0):
        intercambiarFilas(fila + 1, intercambiarConFila)


#Funcion para convertir el pivote a Uno 
def convertirPivoteAUno(filaPivote):
    filaPivote -= 1
    columnaPivote = filaPivote
    if (matriz[filaPivote][columnaPivote] != 0): #Si el numero pivote es diferente de 0, define la constante a multiplicar por el pivote para que sea 1
        constante = 1 / matriz[filaPivote][columnaPivote]
        multiplicarPorConstante(filaPivote, constante) #Multiplica el pivote por la constante y lo convierte en 1
        convertirRestantesACero(columnaPivote + 1) #Convierte las otras filas a 0
#Función para convertir la columna del pivote a 0 
def convertirFilaACero(fila, columnaPivote):
    fila -= 1
    columnaPivote -= 1
    Constante = matriz[fila][columnaPivote] * -1  #Define la constante por la que se debe sumar para que de 0
    sumarFilas(columnaPivote + 1, fila + 1, Constante) #Sumamos las filas, multiplicadas por la constante para que de 0

#Función que recorre las filas para convertir a 0 los números que sean necesarios
def convertirRestantesACero(columnaPivote):
    columnaPivote -= 1
    for i in range(0, len(matriz)):
        if (i != columnaPivote):
            convertirFilaACero(i + 1, columnaPivote + 1)

#Función para validar si la matriz tiene solución, tiene infinitas soluciones o no tiene solución
def validarSolucion():
    ultimaFila = len(matriz) - 1
    ultimaColumna = len(matriz[0]) - 2
    if (matriz[ultimaFila][ultimaColumna] == 0):
        if (matriz[ultimaFila][ultimaColumna + 1] == 0):
            print("El sistema tiene infinitas soluciones")
            parametrizar()
        else:
            print("El sistema no tiene solución")
    else:
        mostrarSolucion()
#Función que muestra la solución de la matriz
def mostrarSolucion():
    for i in range(0, len(matriz)):
        for j in range(0, len(matriz[0])):
            if (i == j):
                print(
                    f"X{i} = {Fraction(matriz[i][len(matriz[0])-1]).limit_denominator()}"
                )
#Función que parametriza los resultados en caso de que la matriz tenga infinitas soluciones
def parametrizar():
    for i in range(0, len(matriz) - 1):
        for j in range(0, len(matriz[0])):
            if (matriz[i][j] == 1):
                print(f"+ X{j+1} ", end="")
            elif (j == len(matriz[0]) - 1):
                print(f"= {Fraction(matriz[i][j]).limit_denominator()} ",
                      end="")
            elif (matriz[i][j] != 0):
                if (matriz[i][j] > 0):
                    print(
                        f"+ {Fraction(matriz[i][j]).limit_denominator()}X{j+1} ",
                        end="")
                else:
                    print(
                        f" {Fraction(matriz[i][j]).limit_denominator()}X{j+1} ",
                        end="")
        print("")
    print("X3 = t")

#Función que comprueba si una matriz es homogenea  
def verificarMatrizHomogenea(matriz):
  homogenea = True
  for i in range(0,len(matriz)): #Recorremos la ultima columna de la matriz 
    if(matriz[i][len(matriz[0])-1] != 0): #Comprobamos si el numero es diferente de 0
      homogenea = False      #Si el número es diferente de 0, la matriz no es homogenea
      return homogenea       #Sale de la función
  print("La matriz es homogenea") #Si para este punto no salió de la función, quiere decir que la matriz es homogenea
  return homogenea
  
def resolverMatriz():
    print("Matriz Original")
    mostrarMatriz(matriz)
    if(not verificarMatrizHomogenea(matriz)):
      for i in range(1, len(matriz) + 1):
          verificarUnosColumna(i)
      validarSolucion()

matriz = pedirSistemaDeEcuaciones()
resolverMatriz()
