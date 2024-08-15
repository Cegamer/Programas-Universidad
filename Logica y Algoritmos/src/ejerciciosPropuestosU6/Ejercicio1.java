package ejerciciosPropuestosU6;

import java.util.Random;

public class Ejercicio1 {

	public static Random rnd = new Random();

	public static void main(String[] args) {

		fillAndLoadArray(10, 11);

	}

	public static int[] fillAndLoadArray(int dimension, int maxNum) {
		int[] array = new int[dimension];
		int max = maxNum;
		
		if (maxNum <= dimension) {
			System.out.println(
					"el numero aleatorio maximo no puede ser menor que la dimension del arreglo, definiendo valor predeterminado (dimension+1)");
			max = dimension + 1;
		}
		
		for (int i = 0; i < dimension; i++) {
			int num;
			boolean repeated = false;
			do {
				num = rnd.nextInt(max + 1);
				for (int j = 0; j < i; j++) { 
					if (num == array[j]) { repeated = true; j = i; }
					else repeated = false;
					}
			} while (repeated == true);
			array[i] = num;
		}
		for(int i = 0; i < dimension; i++)
			System.out.print(array[i] + "|");
		return array;
	}
}
