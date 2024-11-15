class Carro {
    String modelo;
    int año;

    Carro(String modelo, int año) {
        this.modelo = modelo;
        this.año = año;
    };

    public void mostrarCarro() {
        System.out.println("Modelo " + modelo + " Año " + año);
    };

}

class Marca extends Carro {
    String marca;

    Marca(String modelo, int año, String marca) {
        super(modelo, año);
        this.marca = marca;
    }

    @Override
    public void mostrarCarro() {
        System.out.println("Modelo " + modelo + " Año " + año + " marca" + marca);
    }

}

class Herencia {
    public static void main(String[] args) {
        Marca carro1 = new Marca("Machito", 2000, " Toyota");
        carro1.mostrarCarro();
        Carro carro2 = new Carro("Hembrita", 2015);
        carro2.mostrarCarro();
    }
}