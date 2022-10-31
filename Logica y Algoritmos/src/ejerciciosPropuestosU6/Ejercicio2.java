package ejerciciosPropuestosU6;
/*Dado un arreglo de números enteros, seleccionar (y mostrar)
 *  las posiciones del arreglo que
 *  sumen el número específico que se indica como dato objetivo.
 *  Ejemplo:
 *  Si el arreglo está compuesto por los números {3, 4, 5, 6}, 
 *  y el dato objetivo es 8, el valor de
 *  retorno es [0, 2]*/

import java.util.List;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

public class Ejercicio2 {

	static Random rnd = new Random();
	static Scanner input = new Scanner(System.in);

	public static void main(String[] args) {
		int maxRandNum = 10;
		int dimension = 10;

		int numToFind = askForNum(dimension, maxRandNum);
		int[] arr = generateRandomArray(dimension, maxRandNum);
		findPositions(numToFind, arr);
	}

	public static int[] generateRandomArray(int dimension, int maxRandNum) {
		int[] array = new int[dimension];
		System.out.println("Su arreglo es: ");

		for (int i = 0; i < dimension; i++) {
			array[i] = rnd.nextInt(maxRandNum);
			System.out.print(array[i] + "|");
		}
		System.out.println("");
		return array;
	}

	public static int askForNum(int dimension, int maxRandNum) {
		System.out.println("Inserte el numero a buscar");
		int num = input.nextInt();
		if (num >= (maxRandNum - 1) * dimension)
			System.out.println("El numero es muy grande y no hay numeros posibles en el arreglo que lo sumen");
		return num;
	}

	public static List<Integer> findPositions(int num, int[] array) {
		List<Integer> posArray = new ArrayList<Integer>();
		int findSum = num;
		for (int i = 0; i < array.length; i++) {
			findSum -= array[i];
			for (int j = 0; j < array.length; j++) {
				if (i != j && (findSum - array[j] == 0)) {
					posArray.add(i);
					posArray.add(j);
					i = array.length;
				}
			}
			findSum = num;
		}
		System.out.println(posArray.toString());
		return posArray;
	}
}