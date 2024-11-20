class Fruit1 {
    String fruit1;

    Fruit1(String fruit1) {
        this.fruit1 = fruit1;
    }

    public void descriptionfruit1() {
        System.out.println("This is a " + fruit1);
    }
}

class Fruit2 extends Fruit1 {
    String fruit2;

    Fruit2(String fruit2, String fruit1) {
        super(fruit1);
        this.fruit2 = fruit2;
    }

    public void descriptionfruit2() {
        System.out.println("This is a " + fruit2);
    }

    @Override
    public void descriptionfruit1() {
        System.out.println("This is a " + fruit2 + " and " + fruit1);
    }

}

class Herencia {
    public static void main(String[] args) {
        Fruit2 cocktail = new Fruit2("piña", "coco");
        cocktail.descriptionfruit1();
        cocktail.descriptionfruit2();
    }
}