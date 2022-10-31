package trianglesExample;
import java.util.Scanner;

public class TriangleExercices {

	public static Scanner input = new Scanner(System.in);
	
	public static void main(String[] args) {

	}
	
	public static void findAreaOfAnyTriangles(int triangleNum) {
		for(int i = 0; i <= triangleNum; i++) {
			
			System.out.print("Inserte Altura: ");
			float height = input.nextFloat();
			System.out.print("Inserte Ancho: ");
			float width = input.nextFloat();
			
			Triangle triang = new Triangle(height,width);
			triang.calculateArea();
			
			System.out.println("=============================");
		}
	}
	
}
