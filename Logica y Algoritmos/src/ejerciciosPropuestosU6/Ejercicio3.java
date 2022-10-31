package ejerciciosPropuestosU6;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;
import java.util.Scanner;

import java.util.List;
public class Ejercicio3 {
	
	static Random rnd = new Random();	
	public static void main(String[] args) {
		int[] arr =generateRandomArray(10,10);
		showArr(arr);
		Arrays.sort(arr);
		showArr(arr);
		showArr(removeRepeated(arr));
	}
	public static int[] generateRandomArray(int dimension, int maxRandNum) {
		int[] array = new int[dimension];
		for (int i = 0; i < dimension; i++) 
			array[i] = rnd.nextInt(maxRandNum);
		return array;
	}
	public static void showArr(int[] arr) {
		for(int i = 0; i < arr.length; i++)
			System.out.print(arr[i] + "|");
		System.out.println("");
	}
	public static int[] removeRepeated(int[] array) {
		ArrayList<Integer> removed = new ArrayList<Integer>();
		for(int i = 0; i < array.length; i++) 
			if(!removed.contains(array[i]))
				removed.add(array[i]);
		int[] newArray = removed.stream().mapToInt(Integer::intValue).toArray();	
        return newArray;
	}
}