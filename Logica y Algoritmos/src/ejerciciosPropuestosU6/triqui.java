package ejerciciosPropuestosU6;

import java.util.Scanner;

public class triqui {

	public static Scanner input = new Scanner(System.in);

	public static void main(String[] args) {

		System.out.println("Como jugar:\nSegun su turno, el jugador debera escribir en consola\n"
				+ "las coordenadas donde desea jugar");

		char[][] tablero = { { ' ', '0', '|', '1', '|', '2' }, { '0', ' ', '|', ' ', '|', ' ' },
				{ ' ', '-', '|', '-', '|', '-' }, { '1', ' ', '|', ' ', '|', ' ' }, { ' ', '-', '|', '-', '|', '-' },
				{ '2', ' ', '|', ' ', '|', ' ' } };
		renderTablero(tablero);
		loop(tablero);
	}

	public static void loop(char[][] tablero) {
		Boolean playing = true;
		int player = 1;
		int movimiento = 0;
		char[][] simple = new char[3][3];
		while (playing) {
			int xCord;
			int yCord;
			System.out.println("Turno del Jugador " + player);

			while (true) {
				System.out.print("Coordenada X: ");
				xCord = input.nextInt();
				System.out.print("Coordenada Y: ");
				yCord = input.nextInt();
				System.out.println("");

				int fixedX = fixCoords(xCord);
				int fixedY = fixCoords(yCord);
				
				if (tablero[fixedY][fixedX] == ' ') {
					if (player == 1) {
						simple[yCord][xCord] = 'X';
						tablero[fixedY][fixedX] = 'X';
					} else {
						simple[yCord][xCord] = 'O';
						tablero[fixedY][fixedX] = 'O';
					}
					break;
				} else
					System.out.println("Celda ya ocupada");
			}

			renderTablero(tablero);
			
			if (player == 1)
				player = 2;
			else
				player = 1;

			if(checkWin(simple))
				playing = false;
			if (movimiento >= 8) {
				System.out.println("Empate");
				playing = false;
			}
		}
	}

	public static Boolean checkWin(char[][] simple) {
		for(int i = 0; i < 8; i++) {
			String linea = "";
			switch(i) {
			case 0:
				linea = "" + simple[0][0] + simple[0][1] + simple[0][2];
				break;
			case 1:
				linea = ""+simple[1][0] + simple[1][1] + simple[1][2];
				break;
			case 2:
				linea = ""+simple[2][0] + simple[2][1] + simple[2][2];
				break;
			case 3:
				linea = ""+simple[0][0] + simple[1][0] + simple[2][0];
				break;
			case 4:
				linea = ""+simple[0][1] + simple[1][1] + simple[2][1];
				break;
			case 5:
				linea = ""+simple[0][2] + simple[1][2] + simple[2][2];
				break;
			case 6:
				linea = ""+simple[0][0] + simple[1][1] + simple[2][2];
				break;
			case 7:
				linea = ""+simple[2][0] + simple[1][1] + simple[0][2];
				break;
			}
			
			if(linea.equals("XXX")) {
				System.out.println("Gano jugador 1");
				return true;
			}
			if(linea.equals("OOO")) {
				System.out.println("Gano Jugador 2");
				return true;
			}
		}
		return false;
	}

	public static int fixCoords(int Cord) {
		switch (Cord) {
		case 0:
			Cord = 1;
			break;
		case 1:
			Cord = 3;
			break;
		case 2:
			Cord = 5;
			break;
		}
		return Cord;
	}

	public static void renderTablero(char[][] tablero) {
		for (int i = 0; i < tablero[0].length; i++) {
			for (int j = 0; j < tablero.length; j++)
				System.out.print(tablero[i][j] + " ");
			System.out.println("");
		}
	}
}
