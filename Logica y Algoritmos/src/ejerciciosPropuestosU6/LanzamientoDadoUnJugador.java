// Este es un juego que representa los valores que un jugador ha obtenido en la lanzada de dados
// con un dado de 10 caras enumeradas del 0 al 9
// Se trata de:
// 1. Visualizar qué números ha lanzado el jugador y en qué orden
// 2. El jugador hace 10 lanzamientos del dado, si 3 son iguales (el mismo número) gana 2 veces la cifra
// del valor apostado, si aposto US$500 gana US$1000
// 3. En cuales lanzadas (o lanzamientos) fue que obtuvo el mismo número
// 4. Si no ha ganado, y sin embargo obtuvo un 7 en alguno de los lanzamientos, se le devuelve lo apostado
// SE TRATA DE: 
// Elaborar las subrutinas (procesos, subprocesos) que resuelven la situación
// Elaborar 3 situaciones más como condiciones del juego y las programan

package ejerciciosPropuestosU6;

import java.util.*;

public class LanzamientoDadoUnJugador {

	public static Scanner input = new Scanner(System.in);
	public static Random rnd = new Random();

	public static void main(String[] args) {
		int maxValue = 9;
		int minValue = 0;
		int launchs = 10;

		System.out.println("Inserte su apuesta");
		//int betValue = input.nextInt();

		throwDiceArray(launchs, minValue, maxValue);
	}

	public static int throwDice(int minValue, int maxValue) {
		int result = rnd.nextInt(maxValue + 1) + minValue;
		return result;
	}

	public static int[] throwDiceArray(int lanzamientos, int minValue, int maxValue) {
		int[] results = new int[lanzamientos];
		int[] indexs = new int[3];
		System.out.println("Numeros obtenidos");
		int winnerNum = 0;
		int timesAppear = 0;
		
		for (int i = 0; i < lanzamientos; i++) {
			results[i] = throwDice(minValue, maxValue);
			System.out.print(results[i] + "|");
			if (i > 0) {
				if (winnerNum == results[i - 1]) {
					timesAppear++;
					indexs[timesAppear - 1] = i;
				} else {
					winnerNum = results[i];
					timesAppear = 0;
				}
			} else
				winnerNum = results[i];
			if (timesAppear == 3)
				i = lanzamientos + 1;
		}
		if (timesAppear == 3)
			System.out.println("\nHa ganado con el número " + winnerNum + " Que apareció en tres lanzamientos seguidos");
		else
			calculateWinnerSeparateNums(results);
		return results;
	}

	public static void calculateWinnerSeparateNums(int[] results) {
		
		boolean win = false;
		boolean sevenAppear = false;
		for(int i = 0; i < results.length; i++) {
			int findNum = results[i];
			int timesAppear = 0;
			for(int k = 0; k < results.length; k++) {
				if(findNum == results[k]) 
					timesAppear++;
			}
			if(results[i] == 7)
				sevenAppear = true;
			if(timesAppear == 3) {
				System.out.println("\nHa ganado con el número " + findNum +" aparecio 3 veces no seguidas");
				i = results.length+1;
				win = true;
			}
		}
		if(win == false) {
			if(sevenAppear)
				System.out.println("\napareció un 7, se le devolvera lo apostado");
			else
				System.out.println("\nUsted Ha perdido");
		}
	}
}
