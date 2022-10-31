package basicStructures;
import java.util.Scanner;
import java.util.Random;
public class Arrays2D {
	public static Scanner input = new Scanner(System.in);
	public static Random rnd = new Random();
	
	public static void main(String[] args) {
        int[][] array = new int[4][4];
        fillArray(array);
        showArray(array);
        int[][] inverse = generateInverseArray(array);
        showArray(inverse);
	}
	
	public static void showArray(int[][] array) {
        for(int i = 0; i < array.length;i++){
            for(int j = 0; j < array[0].length;j++) {
                System.out.print(array[i][j]+" ");
            }
            System.out.println("");
        }
        System.out.println("========================");
	}
	
	public static void fillArray(int[][] array){
        for(int i = 0; i < array.length;i++)
            for(int j = 0; j < array[0].length;j++)
                array[i][j] = rnd.nextInt(10);    
    }	
	
	public static int[][] generateInverseArray(int[][] array) {
		int[][] inverseMatrix = new int[array.length][array[0].length];
		int rowInverse = 0;
		int collumnInverse = 0;
		
		for(int i = array.length-1; i >=0 ;i--){
            for(int j = array[0].length-1; j >=0;j--){
            	inverseMatrix[rowInverse][collumnInverse] = array[i][j];
            	collumnInverse++;
            }
            collumnInverse = 0;
            rowInverse++;
        }
		return inverseMatrix;
	}
}

