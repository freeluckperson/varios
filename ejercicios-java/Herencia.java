class Persona {
    String nombre;
    int edad;

    Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    void mostrarInfo() {
        System.out.println("Nombre: " + nombre + ", Edad: " + edad);
    }
}

class Estudiante extends Persona {
    String grado;

    Estudiante(String nombre, int edad, String grado) {
        super(nombre, edad); // Llamada al constructor de la clase padre (Persona)
        this.grado = grado;
    }

    @Override
    void mostrarInfo() {
        System.out.println("Nombre: " + nombre + ", Edad: " + edad + ", Grado: " + grado);
    }
}

public class Herencia {
    public static void main(String[] args) {
        // Creamos un arreglo de objetos de tipo Estudiante
        Estudiante[] estudiantes = {
                new Estudiante("Carlos", 20, "Matemáticas"),
                new Estudiante("Ana", 22, "Física"),
                new Estudiante("Luis", 19, "Biología")
        };

        // Usamos un bucle for-each para recorrer e imprimir la información de cada
        // estudiante
        for (Estudiante estudiante : estudiantes) {
            estudiante.mostrarInfo();
        }
    }
}
