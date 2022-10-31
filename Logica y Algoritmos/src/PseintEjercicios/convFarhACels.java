package PseintEjercicios;

public class convFarhACels {

	public static void main(String[] args) {
		float farenheit = 0;
		System.out.println("°F a °C");
		
		while (farenheit < 51) {
			float cent = (5.0f / 9.0f) * (farenheit - 32);
			System.out.println(farenheit + " " + String.format("%.02f", cent));
			if(cent > 0) {
				System.out.println("Aqui se empezo a calentar la pieza");
				farenheit = 46;
			}	
			farenheit += 5;
		}
		System.out.println("He finalizado...");
	}
}
