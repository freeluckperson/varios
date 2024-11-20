import java.util.Scanner;

class Promedio {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the size of the array");
        int tamaño = scanner.nextInt();

        int[] numeros = new int[tamaño];
        int suma = 0;

        System.out.println("Enter the elements of the array");
        for (int i = 0; i < tamaño; i++) {
            numeros[i] = scanner.nextInt();
            suma += numeros[i];
        }

        double promedio = (double) suma / tamaño;
        System.out.println("THE AVERAGE IS => " + promedio);

        scanner.close();
    }
}