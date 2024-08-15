package PseintEjercicios;

public class Suma1A5DoWhile {

	public static void main(String[] args) {
		int n = 1;
		int t = 0;
		do {
			t += n;
			n++;
		}while (n <= 5);
		System.out.println("El valor de 1+2+3...+5 es: "+t);
	}
}
