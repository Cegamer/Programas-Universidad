package basicStructures;

import java.util.Random;
import java.util.Scanner;

public class Arrays1D {
	public static Random rnd = new Random();
	public static Scanner input = new Scanner(System.in);

	public static void main(String[] args) {
		example3();
		
	}
	public static void example1() {
		int[] array = new int[10];

		for (int i = 0; i <= 100; i++) {
			array[i] = i;
			System.out.println(array[i]);
		}
	}
	
	public static void example2() {
		String[] names = new String[5];
		
		for(int i = 0; i < names.length;i++) {
			System.out.print("Escriba un Nombre: ");
			names[i] = input.next();
		}
		for (int i = 0; i <= 100; i++) 
			System.out.println(names[i]);
	}
	public static void example3() {//Palindrome
		int[] array = new int[5];
		
		for(int i = 0; i < array.length; i++) {
			array[i] = rnd.nextInt(10);
			System.out.print(array[i]+"|");
		}
		
		int aux = array.length-1;
		for(int i = 0; i < array.length; i++) {
			
			if(array[i] != array[aux]) { 
				aux = array.length + 1;
				i = array.length +1;
			}
			aux --;
		}
		if(array.length > aux)
			System.out.println("\nArreglo es palindromo");
		else
			System.out.println("\nArreglo NO es palindromo");

	}
}
