import type { Lesson } from './types';
import { md } from './md';

const j = String.raw;

// Unit 5 lessons 5.5-5.7 (Inheritance). Original wording.
export const unit5b: Lesson[] = [
  {
    id: '5-5',
    title: 'Inheritance Hierarchies',
    blocks: [
      { type: 'text', md: md`
Because a dog *is a* pet, Java lets you store a §Dog§ object in a variable of type §Pet§:

§§§java
Pet p = new Dog("Rex");     // allowed: a Dog is a Pet
§§§

The variable type (**declared type**, here §Pet§) and the type of the object it points to (**actual type**, here §Dog§) can differ, as long as the declared type is the same class or a **superclass** of the actual type. The other direction is not allowed without more work:

§§§java
Dog d = new Pet("Rex");     // compile error: not every Pet is a Dog
§§§

### Two questions, two moments

When you write §p.something()§ two different checks happen:

1. **At compile time**, the compiler looks only at the **declared type**. The method must exist in §Pet§ (the declared class) or its superclasses. If §fetch()§ exists only in §Dog§, then §p.fetch()§ does **not compile**, even though the object really is a dog.
2. **At run time**, Java looks at the **actual object** and runs its version of the method (more in 5.6).

§§§java
Pet p = new Dog("Rex");
p.eat();       // fine: Pet has eat()
p.fetch();     // compile error: Pet has no fetch()
§§§

### Casting

If you know the actual type, a **cast** tells the compiler to treat the reference as the subclass:

§§§java
Dog d = (Dog) p;   // OK at run time only if p really refers to a Dog
d.fetch();
§§§

If the object is not really a §Dog§, the cast compiles but fails at run time with a §ClassCastException§.

### Why do this?

You can write code for the general type and let it work with any subclass. A method with the parameter §Pet§ accepts a §Dog§, a §Cat§, or any future subclass:

§§§java
public static void feed(Pet p) { p.eat(); }
§§§

An array or ArrayList of a superclass type can hold a mixture of subclass objects: §Pet[] pets = { new Dog("Rex"), new Cat("Tom") };§.
` },
      { type: 'quiz', id: 'q-ref-ok', question: 'Class §Cat extends Pet§ and §Dog extends Pet§. Which line does **not** compile?',
        choices: ['Pet a = new Cat("Tom");', 'Pet b = new Dog("Rex");', 'Dog c = new Pet("Max");', 'Pet d = new Pet("Zed");'], answer: 2,
        explanation: 'A subclass reference can hold only subclass objects. A plain §Pet§ is not necessarily a §Dog§, so the assignment is rejected at compile time.' },
      { type: 'quiz', id: 'q-ref-method', question: '§Pet p = new Dog("Rex");§ and §fetch()§ is declared only in §Dog§. What happens with §p.fetch();§?',
        choices: ['It runs Dog\'s fetch', 'Compile-time error', 'Run-time error', 'It runs but prints nothing'], answer: 1,
        explanation: 'The compiler checks the declared type §Pet§, which has no §fetch()§. Cast first: §((Dog) p).fetch();§.' },
      { type: 'quiz', id: 'q-cast', question: '§Pet p = new Cat("Tom"); Dog d = (Dog) p;§ What happens?',
        choices: ['Compiles and runs fine', 'Compile error', 'Compiles, then throws ClassCastException at run time', 'Dog d becomes null'], answer: 2,
        explanation: 'A cast between related classes compiles, but at run time the object is a §Cat§, not a §Dog§, so Java throws a ClassCastException.' },
      { type: 'predict', id: 'p-ref', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        Pet[] pets = { new Dog("Rex"), new Cat("Tom"), new Dog("Ace") };
        int dogs = 0;
        for (Pet p : pets) {
            if (p instanceof Dog) {
                dogs++;
            }
        }
        System.out.println(dogs + " of " + pets.length);
    }
}

class Pet {
    private String name;
    public Pet(String name) { this.name = name; }
}

class Dog extends Pet {
    public Dog(String name) { super(name); }
}

class Cat extends Pet {
    public Cat(String name) { super(name); }
}
`, answer: '2 of 3', explanation: '§instanceof§ tests the actual type. Two of the three objects are dogs. (§instanceof§ is a handy extra; AP exams focus on the other ideas in this lesson.)' },
      { type: 'code', id: 'ref-cast', prompt: 'The variable §p§ is declared as §Pet§ but holds a §Dog§. Make the program call §fetch()§ by casting. Expected: §Rex eats§ then §Rex fetches§.',
        expected: 'Rex eats\nRex fetches',
        starter: j`public class Main {
    public static void main(String[] args) {
        Pet p = new Dog("Rex");
        p.eat();
        // TODO: call fetch() on the same object
    }
}

class Pet {
    private String name;
    public Pet(String name) { this.name = name; }
    public String getName() { return name; }
    public void eat() { System.out.println(name + " eats"); }
}

class Dog extends Pet {
    public Dog(String name) { super(name); }
    public void fetch() { System.out.println(getName() + " fetches"); }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Pet p = new Dog("Rex");
        p.eat();
        ((Dog) p).fetch();
    }
}

class Pet {
    private String name;
    public Pet(String name) { this.name = name; }
    public String getName() { return name; }
    public void eat() { System.out.println(name + " eats"); }
}

class Dog extends Pet {
    public Dog(String name) { super(name); }
    public void fetch() { System.out.println(getName() + " fetches"); }
}
`, hint: 'Wrap the cast in extra parentheses: §((Dog) p).fetch();§' },
      { type: 'code', id: 'ref-param', prompt: 'Write the static method §feedAll(Pet[] pets)§ that calls §eat()§ on every element. The array mixes dogs and cats.',
        expected: 'Rex eats\nTom eats',
        starter: j`public class Main {
    // TODO: static void feedAll(Pet[] pets)

    public static void main(String[] args) {
        Pet[] pets = { new Dog("Rex"), new Cat("Tom") };
        feedAll(pets);
    }
}

class Pet {
    private String name;
    public Pet(String name) { this.name = name; }
    public void eat() { System.out.println(name + " eats"); }
}

class Dog extends Pet {
    public Dog(String name) { super(name); }
}

class Cat extends Pet {
    public Cat(String name) { super(name); }
}
`,
        solution: j`public class Main {
    public static void feedAll(Pet[] pets) {
        for (Pet p : pets) {
            p.eat();
        }
    }

    public static void main(String[] args) {
        Pet[] pets = { new Dog("Rex"), new Cat("Tom") };
        feedAll(pets);
    }
}

class Pet {
    private String name;
    public Pet(String name) { this.name = name; }
    public void eat() { System.out.println(name + " eats"); }
}

class Dog extends Pet {
    public Dog(String name) { super(name); }
}

class Cat extends Pet {
    public Cat(String name) { super(name); }
}
`, hint: 'A for-each loop over the array works.' },
    ],
  },
  {
    id: '5-6',
    title: 'Polymorphism',
    blocks: [
      { type: 'text', md: md`
**Polymorphism** means "many forms". In Java it means the same method call can behave differently depending on the **actual object** it is called on.

§§§java
class Animal {
    public String sound() { return "..."; }
}
class Dog extends Animal {
    @Override public String sound() { return "Woof"; }
}
class Cat extends Animal {
    @Override public String sound() { return "Meow"; }
}
§§§

§§§java
Animal[] zoo = { new Dog(), new Cat(), new Animal() };
for (Animal a : zoo) {
    System.out.println(a.sound());
}
§§§

The loop has one line of code, §a.sound()§, yet it prints §Woof§, §Meow§, and §...§. Java decides **at run time** which version to run by looking at the object, not the variable type. This is called **dynamic binding** (or late binding, run-time method resolution).

### The two-step rule

For a call §ref.method()§:

1. **Compile time**: the *declared type* of §ref§ must have a method with that name and parameters. If not, compile error.
2. **Run time**: Java starts at the *actual class* of the object. If that class has the method, it runs; otherwise it looks upward through the superclasses.

### Why it is powerful

You can add a new subclass (say §Cow§) without changing the loop at all. The code that uses the superclass type keeps working, a design goal called being **open to extension**.

### Overloading is different

Which *overloaded* method runs (same name, different parameters) is decided by the argument types at compile time. Overridden methods are decided by the object at run time.

### Tracing tip

For each call, ask: "What is the actual class of the object? Does it override this method? If not, which ancestor does?" Write the answers down line by line, just like tracing a loop.
` },
      { type: 'quiz', id: 'q-poly-def', question: 'Polymorphism lets the same method call...',
        choices: ['Always run the superclass code', 'Run different code depending on the actual object type', 'Change a variable\'s declared type at run time', 'Skip compile-time checks'], answer: 1,
        explanation: 'The method that runs is chosen by the actual object at run time (dynamic binding).' },
      { type: 'quiz', id: 'q-poly-when', question: 'When does Java decide which overridden version of a method to run?',
        choices: ['While compiling, from the declared type', 'At run time, from the actual object', 'When the class is written', 'Never; the programmer chooses'], answer: 1,
        explanation: 'Overridden methods use dynamic binding: the actual object decides.' },
      { type: 'quiz', id: 'q-poly-trace', question: '§Animal a = new Dog();§ where §Dog§ overrides §sound()§ but not §eat()§. §a.eat();§ runs...',
        choices: ['Dog\'s eat', 'Animal\'s eat (inherited by Dog)', 'Nothing; compile error', 'Nothing; run-time error'], answer: 1,
        explanation: 'Java looks in §Dog§ first, finds no §eat()§, and uses the inherited version from §Animal§.' },
      { type: 'predict', id: 'p-poly', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        Animal[] zoo = { new Dog(), new Cat(), new Animal() };
        for (Animal a : zoo) {
            System.out.println(a.sound());
        }
    }
}

class Animal {
    public String sound() { return "..."; }
}

class Dog extends Animal {
    @Override
    public String sound() { return "Woof"; }
}

class Cat extends Animal {
    @Override
    public String sound() { return "Meow"; }
}
`, answer: 'Woof\nMeow\n...', explanation: 'Each element\'s own version of §sound()§ runs, even though every variable is typed §Animal§.' },
      { type: 'predict', id: 'p-poly-super', question: 'What does this program print? Trace carefully.',
        code: j`public class Main {
    public static void main(String[] args) {
        A x = new B();
        x.show();
        x.hello();
    }
}

class A {
    public void show() { System.out.println("A.show"); hello(); }
    public void hello() { System.out.println("A.hello"); }
}

class B extends A {
    @Override
    public void hello() { System.out.println("B.hello"); }
}
`, answer: 'A.show\nB.hello\nB.hello', explanation: '§show()§ is not overridden, so A\'s version runs. Inside it, §hello()§ is called on the same object, which is a §B§, so B\'s §hello§ runs. The last line also runs B\'s §hello§.' },
      { type: 'code', id: 'poly-shapes', prompt: 'Add a §Triangle§ subclass of §Shape§ that overrides §name()§ to return §triangle§ and §area()§ to return §base * height / 2§ (fields set in the constructor). The loop in §main§ should not change. Expected: §rectangle 12§, §triangle 10§.',
        expected: 'rectangle 12\ntriangle 10',
        starter: j`public class Main {
    public static void main(String[] args) {
        Shape[] shapes = { new Rect(3, 4), new Triangle(4, 5) };
        for (Shape s : shapes) {
            System.out.println(s.name() + " " + s.area());
        }
    }
}

class Shape {
    public String name() { return "shape"; }
    public int area() { return 0; }
}

class Rect extends Shape {
    private int w, h;
    public Rect(int w, int h) { this.w = w; this.h = h; }
    @Override
    public String name() { return "rectangle"; }
    @Override
    public int area() { return w * h; }
}

// TODO: Triangle
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Shape[] shapes = { new Rect(3, 4), new Triangle(4, 5) };
        for (Shape s : shapes) {
            System.out.println(s.name() + " " + s.area());
        }
    }
}

class Shape {
    public String name() { return "shape"; }
    public int area() { return 0; }
}

class Rect extends Shape {
    private int w, h;
    public Rect(int w, int h) { this.w = w; this.h = h; }
    @Override
    public String name() { return "rectangle"; }
    @Override
    public int area() { return w * h; }
}

class Triangle extends Shape {
    private int base, height;
    public Triangle(int base, int height) { this.base = base; this.height = height; }
    @Override
    public String name() { return "triangle"; }
    @Override
    public int area() { return base * height / 2; }
}
`, hint: 'Copy the Rect class and change the names and the formula.' },
      { type: 'code', id: 'poly-sum', prompt: 'Each §Item§ has a §cost()§. Write §total(Item[] items)§ that adds up the costs polymorphically. Expected: §Total: 37§ (10 + 12 + 15).',
        expected: 'Total: 37',
        starter: j`public class Main {
    // TODO: static int total(Item[] items)

    public static void main(String[] args) {
        Item[] cart = { new Item(10), new Gift(10), new Sale(30) };
        System.out.println("Total: " + total(cart));
    }
}

class Item {
    private int price;
    public Item(int price) { this.price = price; }
    public int cost() { return price; }
}

class Gift extends Item {
    public Gift(int price) { super(price); }
    @Override
    public int cost() { return super.cost() + 2; }
}

class Sale extends Item {
    public Sale(int price) { super(price); }
    @Override
    public int cost() { return super.cost() / 2; }
}
`,
        solution: j`public class Main {
    public static int total(Item[] items) {
        int sum = 0;
        for (Item it : items) {
            sum += it.cost();
        }
        return sum;
    }

    public static void main(String[] args) {
        Item[] cart = { new Item(10), new Gift(10), new Sale(30) };
        System.out.println("Total: " + total(cart));
    }
}

class Item {
    private int price;
    public Item(int price) { this.price = price; }
    public int cost() { return price; }
}

class Gift extends Item {
    public Gift(int price) { super(price); }
    @Override
    public int cost() { return super.cost() + 2; }
}

class Sale extends Item {
    public Sale(int price) { super(price); }
    @Override
    public int cost() { return super.cost() / 2; }
}
`, hint: 'sum += it.cost() inside a for-each loop.' },
    ],
  },
  {
    id: '5-7',
    title: 'Object Superclass',
    blocks: [
      { type: 'text', md: md`
Every class in Java extends a class called **Object**, either directly (when you write no §extends§) or indirectly. §Object§ sits at the top of every hierarchy, so all objects inherit its methods. Two matter for AP CS A.

### toString()

§toString()§ returns a String describing the object. It is called automatically when you print an object or concatenate it with a string.

The inherited version is not helpful. It prints the class name and a hash code like §Dog@1b6d3586§. You should **override** it:

§§§java
class Dog {
    private String name;
    private int age;
    public Dog(String name, int age) { this.name = name; this.age = age; }

    @Override
    public String toString() {
        return name + " (" + age + ")";
    }
}
§§§

§§§java
Dog d = new Dog("Rex", 3);
System.out.println(d);            // Rex (3)
System.out.println("Pet: " + d);  // Pet: Rex (3)
§§§

### equals(Object other)

The §==§ operator on objects asks "are these the **same object** in memory?". The method §equals§ is meant to ask "do they have the **same contents**?". The inherited version of §equals§ behaves just like §==§, so classes override it. The parameter type must be §Object§:

§§§java
@Override
public boolean equals(Object other) {
    Dog d = (Dog) other;            // cast to read Dog fields
    return name.equals(d.name) && age == d.age;
}
§§§

Notice that §d.name§ is allowed even though it is private: code inside the §Dog§ class may access private fields of **any** §Dog§ object, not only §this§.

(Real-world code also checks §other instanceof Dog§ and null before casting. Strings already override §equals§ properly, which is why you compare strings with §.equals§.)

### Everything is an Object

Since every class is a subclass of §Object§, a variable of type §Object§ can refer to anything:

§§§java
Object o = new Dog("Rex", 3);
System.out.println(o.toString());   // uses Dog's override: Rex (3)
§§§

That is polymorphism again: the compiler only needs §Object§ to have §toString()§, and at run time Dog's version runs.

### Subclass toString with super

A subclass often builds on its parent text: §return super.toString() + " goes " + sound;§.
` },
      { type: 'quiz', id: 'q-obj-top', question: 'A class declared as §class Box { }§ with no §extends§ clause...',
        choices: ['Has no superclass', 'Automatically extends Object', 'Cannot have methods', 'Cannot be instantiated'], answer: 1,
        explanation: 'Every class without an explicit superclass extends §Object§.' },
      { type: 'quiz', id: 'q-equals-sig', question: 'Which header correctly overrides §equals§ in class §Dog§?',
        choices: ['public boolean equals(Dog other)', 'public boolean equals(Object other)', 'public int equals(Object other)', 'public boolean equal(Object other)'], answer: 1,
        explanation: 'To override, the signature must match §Object\'s§: the parameter type is §Object§. A §Dog§ parameter would only overload.' },
      { type: 'quiz', id: 'q-eqeq', question: '§Dog a = new Dog("Rex", 3); Dog b = new Dog("Rex", 3);§ and §Dog§ does **not** override §equals§. What is the value of §a.equals(b)§?',
        choices: ['true', 'false', 'Compile error', 'null'], answer: 1,
        explanation: 'Object\'s default §equals§ compares references, and these are two different objects, so the result is §false§.' },
      { type: 'predict', id: 'p-tostring', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        Dog d = new Dog("Rex", 3);
        System.out.println(d);
        System.out.println("Pet: " + d);
    }
}

class Dog {
    private String name;
    private int age;
    public Dog(String name, int age) { this.name = name; this.age = age; }

    @Override
    public String toString() { return name + " (" + age + ")"; }
}
`, answer: 'Rex (3)\nPet: Rex (3)', explanation: 'Printing or concatenating an object calls its §toString()§ automatically.' },
      { type: 'predict', id: 'p-equals', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        Dog a = new Dog("Rex", 3);
        Dog b = new Dog("Rex", 3);
        Dog c = a;
        System.out.println(a == b);
        System.out.println(a.equals(b));
        System.out.println(a == c);
    }
}

class Dog {
    private String name;
    private int age;
    public Dog(String name, int age) { this.name = name; this.age = age; }

    @Override
    public boolean equals(Object other) {
        Dog d = (Dog) other;
        return name.equals(d.name) && age == d.age;
    }
}
`, answer: 'false\ntrue\ntrue', explanation: '§a§ and §b§ are separate objects (§==§ is false) with equal contents (§equals§ is true). §c§ is another name for §a§.' },
      { type: 'code', id: 'obj-tostring', prompt: 'Override §toString()§ in §Book§ so that printing a book shows §Title by Author§. Expected: §Dune by Herbert§.',
        expected: 'Dune by Herbert',
        starter: j`public class Main {
    public static void main(String[] args) {
        Book b = new Book("Dune", "Herbert");
        System.out.println(b);
    }
}

class Book {
    private String title, author;
    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }
    // TODO: toString
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Book b = new Book("Dune", "Herbert");
        System.out.println(b);
    }
}

class Book {
    private String title, author;
    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }
    @Override
    public String toString() { return title + " by " + author; }
}
`, hint: 'public String toString() { return title + " by " + author; }' },
      { type: 'code', id: 'obj-equals', prompt: 'Override §equals(Object other)§ in §Point§ so two points are equal when both §x§ and §y§ match. Expected: §true§ then §false§.',
        expected: 'true\nfalse',
        starter: j`public class Main {
    public static void main(String[] args) {
        Point p = new Point(1, 2);
        System.out.println(p.equals(new Point(1, 2)));
        System.out.println(p.equals(new Point(2, 1)));
    }
}

class Point {
    private int x, y;
    public Point(int x, int y) { this.x = x; this.y = y; }
    // TODO: equals
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Point p = new Point(1, 2);
        System.out.println(p.equals(new Point(1, 2)));
        System.out.println(p.equals(new Point(2, 1)));
    }
}

class Point {
    private int x, y;
    public Point(int x, int y) { this.x = x; this.y = y; }
    @Override
    public boolean equals(Object other) {
        Point p = (Point) other;
        return x == p.x && y == p.y;
    }
}
`, hint: 'Cast other to Point first, then compare the fields with ==.' },
      { type: 'code', id: 'obj-super-tostring', prompt: '§Dog§ extends §Pet§. Override §toString()§ in §Dog§ so it returns §super.toString()§ plus §, breed: § and the breed. Expected: §Rex, breed: Lab§.',
        expected: 'Rex, breed: Lab',
        starter: j`public class Main {
    public static void main(String[] args) {
        System.out.println(new Dog("Rex", "Lab"));
    }
}

class Pet {
    private String name;
    public Pet(String name) { this.name = name; }
    @Override
    public String toString() { return name; }
}

class Dog extends Pet {
    private String breed;
    public Dog(String name, String breed) {
        super(name);
        this.breed = breed;
    }
    // TODO
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        System.out.println(new Dog("Rex", "Lab"));
    }
}

class Pet {
    private String name;
    public Pet(String name) { this.name = name; }
    @Override
    public String toString() { return name; }
}

class Dog extends Pet {
    private String breed;
    public Dog(String name, String breed) {
        super(name);
        this.breed = breed;
    }
    @Override
    public String toString() { return super.toString() + ", breed: " + breed; }
}
`, hint: 'return super.toString() + ", breed: " + breed;' },
    ],
  },
];
