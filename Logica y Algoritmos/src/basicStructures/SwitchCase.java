package basicStructures;
import java.util.Random;
import java.util.Scanner;


public class SwitchCase {
	
	public static Random rnd = new Random();
	public static Scanner input = new Scanner(System.in);
	
	public static void main(String[] args) {

	}
	
	public static void example1() {
		
		System.out.println("Inserte el dia de la semana");
		int day = input.nextInt();
		
		switch (day) {
		case 1: 
			System.out.println("Es Lunes");
			break;
		case 2:
			System.out.println("Es Martes");
			break;
		case 3:
			System.out.println("Es Miercoles");
			break;
		case 4:			
			System.out.println("Es Jueves");
			break;
		case 5:			
			System.out.println("Es Viernes");
			break;
		case 6:			
			System.out.println("Es Sabado");
			break;
		case 7:			
			System.out.println("Es Domingo");
			break;
		default:
			System.out.println("No ha insertado un dia valido");
			break;
		}
	}
	
	public static void example2() {
		//1 Mago, 2 Guerrero, 3 Vampiro
		int enemy = rnd.nextInt(3) + 1;
		int life = 100;
		
		switch (enemy) {
		case 1:
			System.out.println("Fuiste atacado por un Mago");
			life -= 30;
			System.out.println("te quedan "+life+" de vida");
			break;
		case 2:
			System.out.println("Fuiste atacado por un Guerrero");
			life -= 50;
			System.out.println("te quedan "+life+" de vida");
			break;
		case 3:
			System.out.println("Fuiste atacado por un Vampiro");
			life -= 100;
			System.out.println("te quedan "+life+" de vida");
			break;
		}
		
		if(life == 0)
			System.out.println("Haz muerto");
	}
}