package basicStructures;
import java.util.Random;
import java.util.Scanner;

public class Conditionals {
	
	public static Random rnd = new Random();
	public static Scanner input = new Scanner(System.in);
	
	public static void main(String[] args) {

	}
	public static void booleanExample() {
		
		int num1 = rnd.nextInt(50);
		int num2 = rnd.nextInt(50);
		
		System.out.println("numero 1: "+ num1);
		System.out.println("numero 2: "+ num2);
		System.out.println(num1 + "  > " + num2 + ": " + (num1 > num2));
	}
	
	public static void conditionalExample1() {
		
		int num1 = rnd.nextInt(50);
		int num2 = rnd.nextInt(50);
		int num3= 0;
		
		System.out.println("numero 1: "+ num1);
		System.out.println("numero 2: "+ num2);
	
		if(num1 > num2)		num3 = num1 + num2;
		if (num1 < num2)	num3 = num1 - num2;
		if (num1 == num2) 	num3 = num1 * num2;		
		
		System.out.println(num3);
	}
	
	public static Boolean conditionalExaple2(int num1, int num2) {
		if(num1 > num2) return true;
		else return false;
	}
	
	public static void conditionalExample3() {
		int num = rnd.nextInt();
		System.out.println("El numero es: " + num);
		
		if(num % 2 == 0) System.out.println("Cegamer");
		if(num % 3 == 0) System.out.println("Suscribete");
		if (num % 2 == 0 && num % 3 == 0) System.out.println("Suscribete a Cegamer");
	}
	
	public static void conditionalExample4() {
		
		System.out.println("Ingrese su Nombre de Usuario");
		String username = input.nextLine();
		
		System.out.println("Ingrese su Contraseña");
		String password = input.nextLine();
		
		if(username.equals("cegamer") && password.equals("suscribete"))
			System.out.println("Inicio de sesión exitoso");
		
		else if(!username.equals("cegamer") && !password.equals("suscribete"))
			System.out.println("Usuario y Contraseña invalidos");
		
		else if(!username.equals("cegamer"))
			System.out.println("Usuario invalido");
		
		else if(!password.equals("suscribete"))
			System.out.println("Contraseña invalida");
	}
}
