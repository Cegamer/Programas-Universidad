package basicStructures;
import java.util.Random;
import java.util.Scanner;


public class variables {
	
	public static Random rnd = new Random();
	public static Scanner input = new Scanner(System.in);
	
	public static void main(String[] args) {

	}
	public static void variableExample1() {
		//NOTA: Aclarar identificadores validos y no validos
		int entero = 12;
		float puntoFlotante = 12.0f;
		double doblePresicion = 12.0;
		boolean booleano = false;
		String texto = "Hola Mundo";
		char caracter = 'C';
		
		System.out.println(entero);
		System.out.println(puntoFlotante);
		System.out.println(doblePresicion);
		System.out.println(booleano);
		System.out.println(texto);
		System.out.println(caracter);
	}
	
	public static void variableExample2() {
		int a = 10;
		int b = 5;
		
		int c = a + b;
		System.out.println(c);
	}
	
	public static void variableExample3() {
		int num1 = rnd.nextInt(100);
		int num2 = rnd.nextInt(100);
		
		int a = num1 + num2;
		int b = num1 - num2;
		int c = num1 * num2;
		int d = num1 / num2;
		int e = num1 % num2;
		
		System.out.println(a);
		System.out.println(b);
		System.out.println(c);
		System.out.println(d);
		System.out.println(e);
	}
	
	public static void variableExample4() {
		String text1 = "Hola";
		String text2 = "Mundo";
		int num = 32;
		
		System.out.println(text1 + text2);
		System.out.println(text1 + num);
	}
}
