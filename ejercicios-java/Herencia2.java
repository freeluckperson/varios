class Person {
    String nombre;
    int experiencia;

    Person(String nombre, int experiencia) {
        this.nombre = nombre;
        this.experiencia = experiencia;
    }

    void mostrarInfo() {
        System.out.println("Nombre: " + nombre + "Experiencia " + experiencia);
    }
}

class Programador extends Person {
    String seniority;

    Programador(String nombre, int experiencia, String seniority) {
        super(nombre, experiencia);
        this.seniority = seniority;
    }

    @Override
    void mostrarInfo() {
        System.out.println("Nombre: " + nombre + " Experiencia " + experiencia + " años " + " seniority " + seniority);
    }
}

public class Herencia2 {
    public static void main(String[] args) {
        Programador programador1 = new Programador("Erick Segura", 2, "Junior");
        programador1.mostrarInfo();
    }
}
