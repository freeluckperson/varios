
class Persona {
    String name;

    Persona(String name) {
        this.name = name;
    }

    public void presentarme() {
        System.out.println("Mi nombre es " + name);
    }
}

class Programador extends Persona {
    String rol;

    Programador(String rol, String name) {
        super(name);
        this.rol = rol;
    }

    @Override
    public void presentarme() {
        System.out.println("Mi nombre es " + name + " y soy programador " + rol);
    }

}

class Herencia {
    public static void main(String[] args) {
        Programador programador1 = new Programador("Full stack", "Erick");
        programador1.presentarme();

    }
}
