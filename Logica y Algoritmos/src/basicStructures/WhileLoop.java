package basicStructures;

import java.util.Scanner;
import java.util.Random;

public class WhileLoop {

	public static Scanner input = new Scanner(System.in);
	public static Random rnd = new Random();

	public static void main(String[] args) {

	}
	
	public static void example1() {
		int num = 0;
		while (num < 100) {
			System.out.println(num);
			num += 5;
		}
	}

	public static void example2() {
		int num = 100; //cambiar a 100 para demostrar
		do {
			System.out.println(num);
			num += 5;
		}while(num < 100);
	}

	public static void example3() {
		int num = 0;
		while (num < 100) {
			if (num != 2 && num != 3 && num != 5 && num != 7) {
				if (num % 2 != 0 && num % 3 != 0 && num % 5 != 0 && num % 7 != 0)
					System.out.print(num + " ");
			} else
				System.out.print(num + " ");
			num++;
		}
	}

	public static void example4() {
		int life = 100;
		while (life > 0) {
			// 1 Mago, 2 Guerrero, 3 Vampiro
			int enemy = rnd.nextInt(3) + 1;

			switch (enemy) {
			case 1:
				System.out.println("Fuiste atacado por un Mago");
				life -= 30;
				System.out.println("te quedan " + life + " de vida");
				break;
			case 2:
				System.out.println("Fuiste atacado por un Guerrero");
				life -= 50;
				System.out.println("te quedan " + life + " de vida");
				break;
			case 3:
				System.out.println("Fuiste atacado por un Vampiro");
				life -= 100;
				System.out.println("te quedan " + life + " de vida");
				break;
			}
		}
		System.out.println("Haz muerto");
	}
}
