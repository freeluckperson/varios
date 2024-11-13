import java.util.Scanner;

public class CalculoFactorial {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ingrese un entero positivo");
        int numberInt = scanner.nextInt();
        int result = 1;

        /*
         * for (int i = 1; i <= numberInt; i++) {
         * result *= i;
         * }
         */

        int i = 1;
        while (i <= numberInt) {

            result *= i;
            i++;
        }

        System.out.println(numberInt + "!" + " = " + result);

        scanner.close();
    }
}