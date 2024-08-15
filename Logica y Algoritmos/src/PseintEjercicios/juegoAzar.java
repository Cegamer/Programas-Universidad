package PseintEjercicios;

import java.util.*;

public class juegoAzar {

	public static Random rnd = new Random();
	public static Scanner input = new Scanner(System.in);

	public static void main(String[] args) {
		int x;
		int n;
		int valorApuesta;
		int numeJuego;
		boolean Ganador;
		int caraSuge;

		caraSuge = rnd.nextInt(6);

		switch (caraSuge) {
		case 0:
			System.out.println("Pseudónimo sugerido: Iron man (Espero que tengas suerte de HIERRO)");
			break;
		case 1:
			System.out.println("Pseudónimo sugerido: Batman (Espero que hayas venido con ROBIN)");
			break;
		case 2:
			System.out.println("Pseudónimo sugerido: Flash (Espero que seas VELOZ !!)");
			break;
		case 3:
			System.out.println("Pseudónimo sugerido: Capitán América (Espero que tengas ESCUDO !!)");
			break;
		case 4:
			System.out.println("Pseudónimo sugerido: El profesor super O (Espero que tengas CARROMOJARRA");
			break;
		case 5:
			System.out.println("Pseudónimo sugerido: El chapulin colorado (Espero que tengas CHIPOTE CHILLÓN)");
			break;
		default:
			System.out.println("Juega con el pseudónimo que quieras... ");
			break;
		}

		System.out.print("Nombre del jugador (utiliza un pseudónimo): ");
		String pseudonimo = input.nextLine();
		System.out.println("Bienvenido " + pseudonimo + ". Con cual numero vas a jugar?");
		numeJuego = input.nextInt();
		mtd_NumerOport();
		int numerOport = input.nextInt();
		System.out.print("Cuanto vas a apostar? ");
		valorApuesta = input.nextInt();
		if (numeJuego < 0 || numeJuego > 5)
			System.out.println("El número con el que juegas no es válido, debe estar entre 0 y 5");
		else {
			if (valorApuesta < 300)
				mtd_ValorMinimoA();
			else {
				if (valorApuesta > 1000)
					mtd_TendraMucha();
				else {
					Ganador = false;
					n = numerOport;
					while(n > 0) {
						System.out.println("Lanzando el dado...");
						x = rnd.nextInt(6);
						System.out.println("El numero lanzado es: "+x);
						if(x==numeJuego) {
							System.out.println("GANASTE "+pseudonimo+" !! FELICITACIONES !!");
							mtd_Ganaste(valorApuesta);
							Ganador = true;
							n = 1;
						}
						n--;
					}
					if(!Ganador)
						System.out.println("No ganaste... no te desanimes, sigue intentando...");
					else
						System.out.println("Ganaste... regresa para seguir jugando...");
				}
			}
		}

	}

	public static void mtd_NumerOport() {
		System.out.println("Con cuantas oportunidades quieres jugar");
	}

	public static void mtd_ValorMinimoA() {
		System.out.println("El valor a apostar debe ser minimo US$300");
	}

	public static void mtd_TendraMucha() {
		System.out.println("No... pues tendrá mucha, valor máximo de apuesta US$1000");
	}

	public static void mtd_Ganaste(int valorApuest) {
		System.out.println("Genial !! GANASTE US$" + (2 * valorApuest));
	}

}
