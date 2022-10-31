package basicExercices;

import java.util.Scanner;
import java.util.Random;

public class FactorialNumber {

	public static Scanner input = new Scanner(System.in);
	public static Random rnd = new Random();

	public static void main(String[] args) {

		randomNumFactorial((rnd.nextInt(5)+1));
	}

	public static void randomNumFactorial(int repeater) {
		System.out.println("Sacar el factorial de " + repeater + " Numeros aleatorios");
		int maxFactorial = 0;
		while (repeater > 0) {
			int num = rnd.nextInt(5) + 1;
			
			if(num > maxFactorial)
					maxFactorial = num;
			
			System.out.println("Su numero es " + num);
			System.out.println(recursiveFactorial(num));
			repeater--;
		}
		System.out.println("El factorial mas grande es el de "+ maxFactorial + " que es igual a " + recursiveFactorial(maxFactorial));
	}

	public static void askFactorial() {
		while (true) {
			System.out.print("Escriba el numero que desea pasar a factorial: ");
			int num = input.nextInt();
			System.out.println("\n" + recursiveFactorial(num) + "\n");

			System.out.println("Desea repetir el programa? \n[0] NO \n[1]SI");
			if (input.nextInt() == 0)
				break;
		}
	}

	public static int recursiveFactorial(int num) {
		if (num == 1)
			return 1;
		else if (num == 0)
			return 0;
		else
			return num * recursiveFactorial(num - 1);
	}
}
