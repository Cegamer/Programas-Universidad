package informe2corte;
import java.util.Arrays;
import java.util.Random;
import java.util.Scanner;
public class program {

	public static Random rnd = new Random();
	public static Scanner input = new Scanner(System.in);

	public static void main(String[] args) {

		Worker[] workerArray = generateWorkers(4);
		BusinessData businessData = new BusinessData(workerArray);

		System.out.println("El vendedor que mas muñecos vendió fue " 
				+ businessData.getBestTotalSeller().getWorkerName() + " Con " 
				+ businessData.getBestTotalSeller().getTotalSells() + " ventas.");

		System.out.println("El vendedor que vendió mas muñecos del chapulin colorado fue "
				+ businessData.getBestChapSeller().getWorkerName() + " Con "
				+ businessData.getBestChapSeller().getChapSells() + " Chapulines vendidos");

		System.out.println("La cantidad total de muñecos que se vendió fue " 
				+ businessData.getTotalSells() + "\n"
				+ businessData.getRewardWorkers());

		System.out.println("El muñeco que más se vendió fue " 
						+ businessData.getMostSelledToyWorker().getMostSelledToyName()
						+ " Vendidos por " + businessData.getMostSelledToyWorker().getWorkerName() + " Con "
						+ businessData.getMostSelledToyWorker().getMostSelledToyNum() + " Muñecos vendidos");

		for (int i = 0; i < workerArray.length; i++) {
			
			System.out.println(workerArray[i].compareBudgetWithSells());
			System.out.println("El promedio de ventas de " 
					+ workerArray[i].getWorkerName() + " Fue de "
					+ workerArray[i].getPromSells() + " Muñecos Vendidos\n");
		}

		System.out.println("");
		System.out.println("========================================================");
		System.out.println("");

		System.out.println("\nDesea ver la información completa?\n[0] No\n[1] Si");
		int showFullData = input.nextInt();
		if (showFullData == 1) {
			System.out.println(businessData.toString());
		}
	}

	public static Worker[] generateWorkers(int workerNum) {

		Worker[] workerArray = new Worker[workerNum];

		for (int i = 0; i < workerArray.length; i++) {

			Worker worker = new Worker("Trabajador " + (i + 1));
			worker.setToySells(rnd.nextInt(200), rnd.nextInt(200), rnd.nextInt(200), rnd.nextInt(200));
			worker.setBudget(rnd.nextInt(150), rnd.nextInt(150), rnd.nextInt(150), rnd.nextInt(150));
			workerArray[i] = worker;

		}
		return workerArray;
	}

	public static class BusinessData {
		
		private Worker[] workerArray;
		private Worker bestTotalSeller;
		private Worker bestChapSeller;
		private int totalSells;
		private String rewardWorkers = "No se les pagará a los trabajadores una prima equivalente a 2 salarios mensuales";
		private Worker mostSelledToyWorker;
		
		public BusinessData(Worker[] workerArray) {
			this.workerArray = workerArray;
			calculateData();
		}

		public void calculateData() {
			
			Worker bestTotSeller = workerArray[0];
			Worker bestChapuSeller = workerArray[0];
			Worker mostSelledToyWorkr = workerArray[0];

			int auxMostSelled = workerArray[0].getMostSelledToyNum();
			int auxTotalSells = workerArray[0].getTotalSells();
			int auxBestChapu = workerArray[0].getChapSells();
			
			for (int i = 0; i < workerArray.length; i++) {
				this.totalSells += workerArray[i].getTotalSells();
					
				if (auxMostSelled < workerArray[i].getMostSelledToyNum()) {
					auxMostSelled = workerArray[i].getMostSelledToyNum();
					mostSelledToyWorkr = workerArray[i];
				}
					
				if (auxTotalSells < workerArray[i].getTotalSells()) {
					auxTotalSells = workerArray[i].getTotalSells();
					bestTotSeller = workerArray[i];
				}
					
				if (auxBestChapu < workerArray[i].getChapSells()) {
					auxBestChapu = workerArray[i].getChapSells();
					bestChapuSeller = workerArray[i];
				}
			}

			if (totalSells > 400)
				rewardWorkers = "Se les pagará a los trabajadores una prima equivalente a 2 salarios mensuales";

			this.mostSelledToyWorker = mostSelledToyWorkr;
			this.bestTotalSeller = bestTotSeller;
			this.bestChapSeller = bestChapuSeller;
		}
		
		public String toString() {
			
			return "BusinessData: \n\t" 
					+ "WorkerArray: \n\t" + Arrays.toString(workerArray) 
					+ "\n\tbestTotalSeller = " + bestTotalSeller.getWorkerName()
					+ "\n\tbestChapSeller = " + bestChapSeller.getWorkerName() 
					+ "\n\ttotalSells = " + totalSells 
					+ "\n\trewardWorkers = " + rewardWorkers 
					+ "\n\tmostSelledToyWorker = " + mostSelledToyWorker.getWorkerName()
					+ "\n\tmostSelledToy = " + mostSelledToyWorker.getMostSelledToyName()
					+ "\n\tmostSelledToyID = "+ mostSelledToyWorker.getMostSelledToyID();
		}
		
		public Worker getMostSelledToyWorker() {
			return mostSelledToyWorker;
		}
		public String getRewardWorkers() {
			return rewardWorkers;
		}
		public int getTotalSells() {
			return totalSells;
		}
		public Worker getBestTotalSeller() {
			return bestTotalSeller;
		}
		public Worker getBestChapSeller() {
			return bestChapSeller;
		}
	}

	public static class Worker {

		private int totalSells;
		private int[] toySells = new int[4]; // <---- Funciona pero hay un problema de generalización
		private int[] employeeBudget = new int [4];
		private int promSells;
		private String workerName;
		private int mostSelledToyID;
		private int mostSelledToyNum;
		private String mostSelledToyName;

		public Worker(String workerName) {
			this.workerName = workerName;
		}

		private void calculateTotalSells() {

			int aux = toySells[0];
			this.mostSelledToyID = 0;
			this.mostSelledToyNum = toySells[this.mostSelledToyID];

			for (int i = 0; i < toySells.length; i++) {
				this.totalSells += toySells[i];
				if (aux < toySells[i]) {
					this.mostSelledToyID = i;
					this.mostSelledToyNum = toySells[mostSelledToyID];
					aux = toySells[i];
				}
			}
			this.mostSelledToyName = toyNameFromID(mostSelledToyID);
		}
		
		private String toyNameFromID(int id) {
			switch (id) {
				case 0:
					return "Superman";
				case 1:
					return "Chapulin";
				case 2:
					return "Spiderman";
				case 3:
					return "Batman";
				default:
					return "invalid toyID";
			}
		}
		
		public String compareBudgetWithSells() {
			String str = "El empleado " + this.workerName + ": \n\t";

			for (int i = 0; i < toySells.length; i++) {
				if (toySells[i] >= employeeBudget[i])
					str += toyNameFromID(i) + " = Cumplió";
				else
					str += toyNameFromID(i) + " = No Cumplió";
				if (i != toySells.length - 1)
					str += "\n\t";
			}
			return str;
		}
		public void setBudget(int supermanSells, int chapSells, int spiderSells, int batmanSells) {
			
			this.employeeBudget[0] = supermanSells;
			this.employeeBudget[1] = chapSells;
			this.employeeBudget[2] = spiderSells;
			this.employeeBudget[3] = batmanSells;
			
		}
		public void setToySells(int supermanSells, int chapSells, int spiderSells, int batmanSells) {
			
			this.toySells[0] = supermanSells;
			this.toySells[1] = chapSells;
			this.toySells[2] = spiderSells;
			this.toySells[3] = batmanSells;
			calculateTotalSells();
			calculatePromSells();
		
		}
		
		private void calculatePromSells() {
			promSells = totalSells / toySells.length;
		}
		
		public String toString() {
			return (workerName + ":\n\t\t"
					
					+ String.format("%11s%5s%5s","MUNECO |"," VEND |"," PRES") +"\n\t\t"
					+ String.format("%11s%5s%5s","Superman |"," "+toySells[0]," |   "+employeeBudget[0]) +"\n\t\t"
					+ String.format("%11s%5s%5s","Chapulin |"," "+toySells[1]," |   "+employeeBudget[1]) +"\n\t\t"
					+ String.format("%11s%5s%5s","Spiderman |"," "+toySells[2]," |   "+employeeBudget[2]) +"\n\t\t"
					+ String.format("%11s%5s%5s","Batman |", " "+toySells[3]," |   "+employeeBudget[3]) +"\n\n\t"

					+ "	Ventas totales: " + totalSells + "\n\t"
					+ "	Promedio de ventas: " + promSells + "\n\t"
					+ "	El muñeco mas vendido fue: "+ mostSelledToyName+"\n\t"
					+ "	Id del muñeco mas vendido "+ mostSelledToyID + "\n\t"
					+ "	Ventas del muñeco mas vendido: "+ mostSelledToyNum+ "\n\t"
					);
		}
		
		public String getMostSelledToyName() {
			return mostSelledToyName;
		}
		public int getMostSelledToyNum() {
			return mostSelledToyNum;
		}
		public String getWorkerName() {
			return workerName;
		}
		public int getMostSelledToyID() {
			return mostSelledToyID;
		}
		public int getPromSells() {
			return promSells;
		}
		public int getTotalSells() {
			return totalSells;
		}
		public int getSupermanSells() {
			return toySells[0];
		}
		public int getChapSells() {
			return toySells[1];
		}
		public int getspiderSells() {
			return toySells[2];
		}
		public int getBatmanSells() {
			return toySells[3];
		}
	}
}