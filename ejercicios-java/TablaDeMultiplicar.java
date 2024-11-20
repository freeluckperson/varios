import java.util.Scanner;

public class TablaDeMultiplicar {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Intruduce un tabla entero");
        int tabla = scanner.nextInt();
        int producto;

        int i = 1;
        while (i <= 10) {
            producto = i * tabla;
            System.out.println(tabla + "x" + i + " = " + producto);
            i++;
        }

        scanner.close();
    }
}