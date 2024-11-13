import java.util.ArrayList;

public class Bucles {
    public static void main(String[] args) {
        String[] srt = { "Banana", "Mango", "Piña", "Patilla" };
        ArrayList<Integer> arr1 = new ArrayList<>();
        ArrayList<String> arr2 = new ArrayList<>();
        /* ------------------------------------------------------------------ */
        /* BUCLE WHILE */
        int i = 10;
        while (i >= 0) {
            arr1.add(i);
            i--;
        }
        /* ------------------------------------------------------------------ */
        /* BUCLE DO WHILE */

        int j = 0;
        do {
            arr2.add(srt[j]);
            j++;
        } while (j <= srt.length - 1);
        /* ------------------------------------------------------------------ */
        /* BUCLE FOR EACH */

        for (String fruta : srt) {
            String mango = "mango";
            if (fruta.equalsIgnoreCase(mango)) {

                System.out.println("FOREACH " + fruta);
            }
        }

        System.out.println("BUCLE WHILE " + arr1);
        System.out.println("BUCLE DO_WHILE " + arr2);
    }
}
