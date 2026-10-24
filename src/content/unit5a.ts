import type { Lesson } from './types';
import { md } from './md';

const j = String.raw;

// Unit 5 lessons 5.1-5.4 (Inheritance). Original wording.
export const unit5a: Lesson[] = [
  {
    id: '5-1',
    title: 'Creating Superclasses and Subclasses',
    blocks: [
      { type: 'text', md: md`
Suppose you are writing a program about pets. Dogs and cats both have a name and both can eat, but only dogs fetch and only cats purr. Copying the shared code into two classes is wasteful, and fixing a bug would mean fixing it twice. **Inheritance** solves this: put the shared parts in one class and let other classes build on it.

- The general class is the **superclass** (also called parent or base class).
- A more specific class that builds on it is a **subclass** (child or derived class).
- A subclass uses the keyword §extends§ and automatically **inherits** the public methods of its superclass.

§§§java
class Pet {
    private String name;

    public Pet(String name) { this.name = name; }
    public String getName() { return name; }
    public void eat() { System.out.println(name + " is eating."); }
}

class Dog extends Pet {
    public Dog(String name) { super(name); }   // more on this in 5.2
    public void fetch() { System.out.println(getName() + " fetches the ball."); }
}
§§§

A §Dog§ object can call §fetch()§ (defined in §Dog§) and also §eat()§ and §getName()§ (inherited from §Pet§).

### The is-a relationship

Use inheritance only when the sentence "a subclass **is a** superclass" makes sense. A dog *is a* pet. A car *is a* vehicle. But a car is not an engine: a car *has an* engine, so that should be a field instead (a **has-a** relationship).

### What a subclass gets (and does not get)

- It inherits public methods. It can add its own new fields and methods.
- It does **not** get direct access to the superclass §private§ fields. A §Dog§ cannot write §name§ directly; it must call §getName()§. This protects the data inside the superclass.
- Constructors are **not** inherited. Each class writes its own (lesson 5.2).
- A Java class can extend only **one** superclass, but a subclass can itself be extended, building a **hierarchy**: §Animal§, then §Pet§, then §Dog§.

### Class hierarchies

Classes form a tree. Everything common goes near the top, specialties go lower down. A change to the superclass automatically shows up in every subclass, which is the main payoff: write once, reuse everywhere.

Lessons in this unit put several classes in one file. The §Main§ class comes first and the other classes follow it, with no §public§ in front of them.
` },
      { type: 'quiz', id: 'q-isa', question: 'Which pair is the best fit for inheritance (subclass extends superclass)?',
        choices: ['Engine extends Car', 'Car extends Engine', 'Truck extends Vehicle', 'Wheel extends Bicycle'], answer: 2,
        explanation: 'A truck is a vehicle, so §Truck extends Vehicle§ passes the is-a test. A car has an engine and a bicycle has wheels; those are has-a relationships.' },
      { type: 'quiz', id: 'q-private', question: 'The superclass §Pet§ declares §private String name;§. Inside §Dog extends Pet§, what is the right way to read the name?',
        choices: ['Write §name§ directly', 'Write §super.name§', 'Call the public method §getName()§', 'It cannot be read at all'], answer: 2,
        explanation: 'Private members belong only to their own class. A subclass reaches them through public (or protected) methods such as §getName()§.' },
      { type: 'quiz', id: 'q-extends', question: 'Which line correctly declares that §Cat§ is a subclass of §Pet§?',
        choices: ['class Cat inherits Pet', 'class Cat extends Pet', 'class Cat : Pet', 'class Pet extends Cat'], answer: 1,
        explanation: 'Java uses the keyword §extends§: the subclass comes first, the superclass second.' },
      { type: 'predict', id: 'p-inherit', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        Dog d = new Dog("Rex");
        d.eat();
        d.fetch();
    }
}

class Pet {
    private String name;
    public Pet(String name) { this.name = name; }
    public String getName() { return name; }
    public void eat() { System.out.println(name + " is eating."); }
}

class Dog extends Pet {
    public Dog(String name) { super(name); }
    public void fetch() { System.out.println(getName() + " fetches."); }
}
`, answer: 'Rex is eating. Rex fetches.', explanation: '§eat()§ is inherited from §Pet§; §fetch()§ is defined in §Dog§. Both use the name "Rex".' },
      { type: 'code', id: 'sub-bird', prompt: 'The §Pet§ class is finished. Write a §Bird§ subclass that extends §Pet§ and adds a §sing()§ method printing §<name> sings.§ using §getName()§. The constructor is provided.',
        expected: 'Tweety is eating.\nTweety sings.',
        starter: j`public class Main {
    public static void main(String[] args) {
        Bird b = new Bird("Tweety");
        b.eat();
        b.sing();
    }
}

class Pet {
    private String name;
    public Pet(String name) { this.name = name; }
    public String getName() { return name; }
    public void eat() { System.out.println(name + " is eating."); }
}

// TODO: make Bird extend Pet and add sing()
class Bird {
    public Bird(String name) { super(name); }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Bird b = new Bird("Tweety");
        b.eat();
        b.sing();
    }
}

class Pet {
    private String name;
    public Pet(String name) { this.name = name; }
    public String getName() { return name; }
    public void eat() { System.out.println(name + " is eating."); }
}

class Bird extends Pet {
    public Bird(String name) { super(name); }
    public void sing() { System.out.println(getName() + " sings."); }
}
`, hint: 'Add §extends Pet§ after the class name, then write §sing()§ inside the braces.' },
      { type: 'code', id: 'sub-shape', prompt: 'A §Rectangle§ class exists. Create §Square§ that extends §Rectangle§ and has a constructor taking one §side§ that passes it twice to the superclass constructor with §super(side, side)§. Run to see the area §25§.',
        expected: 'Area: 25',
        starter: j`public class Main {
    public static void main(String[] args) {
        Square s = new Square(5);
        System.out.println("Area: " + s.area());
    }
}

class Rectangle {
    private int width, height;
    public Rectangle(int w, int h) { width = w; height = h; }
    public int area() { return width * height; }
}

// TODO: write Square
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Square s = new Square(5);
        System.out.println("Area: " + s.area());
    }
}

class Rectangle {
    private int width, height;
    public Rectangle(int w, int h) { width = w; height = h; }
    public int area() { return width * height; }
}

class Square extends Rectangle {
    public Square(int side) { super(side, side); }
}
`, hint: '§class Square extends Rectangle { public Square(int side) { super(side, side); } }§' },
    ],
  },
  {
    id: '5-2',
    title: 'Writing Constructors for Subclasses',
    blocks: [
      { type: 'text', md: md`
Constructors are **not inherited**, but a subclass object still contains everything its superclass defines. So when you build a §Dog§, Java must first build the §Pet§ part. The subclass constructor does this by calling the superclass constructor with the keyword §super§.

§§§java
class Pet {
    private String name;
    public Pet(String name) { this.name = name; }
}

class Dog extends Pet {
    private String breed;

    public Dog(String name, String breed) {
        super(name);        // build the Pet part first
        this.breed = breed; // then set up the Dog part
    }
}
§§§

### Rules

1. The call §super(...)§ must be the **first statement** in the constructor.
2. Pass arguments that match one of the superclass constructors.
3. If you write **no** §super(...)§ call, Java silently inserts §super();§ (a no-argument call) as the first line.
4. If the superclass has no no-argument constructor, that hidden call fails to compile. You must write an explicit §super(...)§ with arguments.

### Order of events

§§§java
class A {
    public A() { System.out.println("A"); }
}
class B extends A {
    public B() { System.out.println("B"); }   // hidden super(); runs first
}
§§§

§new B()§ prints §A§ then §B§: the superclass constructor always finishes before the subclass constructor body runs. With three levels (§C extends B extends A§) you would see A, B, C.

### Subclass fields

Subclass constructors initialize only the **new** fields they add. The inherited private fields are set by the superclass constructor. A subclass can also offer several constructors, and each of them must call some §super(...)§ (explicitly or implicitly).
` },
      { type: 'quiz', id: 'q-first', question: 'Where must a call to §super(...)§ appear in a constructor?',
        choices: ['Anywhere in the body', 'As the last statement', 'As the first statement', 'Outside the constructor'], answer: 2,
        explanation: 'The superclass part of the object must be built before anything else, so §super(...)§ must be the first statement.' },
      { type: 'quiz', id: 'q-nodefault', question: 'Class §Base§ has only the constructor §Base(int x)§. Class §Kid extends Base§ has the constructor §public Kid() { }§ with no explicit §super§ call. What happens?',
        choices: ['Compiles; x is 0', 'Compile error: Java inserts §super();§ but Base has no such constructor', 'Runtime error only when Kid is used', 'Compiles; Base is skipped'], answer: 1,
        explanation: 'Without an explicit call, Java adds §super();§. §Base§ has no no-argument constructor, so the code does not compile. Fix it with §super(0);§ or similar.' },
      { type: 'predict', id: 'p-order', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        new C();
    }
}

class A {
    public A() { System.out.println("A"); }
}

class B extends A {
    public B() { System.out.println("B"); }
}

class C extends B {
    public C() { System.out.println("C"); }
}
`, answer: 'A B C', explanation: 'Each constructor first runs its superclass constructor (hidden §super();§), so the output goes from the top of the hierarchy down: A, B, C.' },
      { type: 'predict', id: 'p-super-args', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        Car c = new Car("Civic", 4);
        System.out.println(c.getModel() + " " + c.getWheels());
    }
}

class Vehicle {
    private String model;
    public Vehicle(String model) {
        this.model = model;
    }
    public String getModel() { return model; }
}

class Car extends Vehicle {
    private int wheels;
    public Car(String model, int wheels) {
        super(model);
        this.wheels = wheels;
    }
    public int getWheels() { return wheels; }
}
`, answer: 'Civic 4', explanation: '§super(model)§ stores "Civic" in the Vehicle part, then Car stores the wheels.' },
      { type: 'code', id: 'ctor-employee', prompt: 'Finish the §Manager§ constructor: call the §Employee§ constructor with §name§ and §salary§, then store the §bonus§. The program should print §Ana earns 5500§.',
        expected: 'Ana earns 5500',
        starter: j`public class Main {
    public static void main(String[] args) {
        Manager m = new Manager("Ana", 5000, 500);
        System.out.println(m.getName() + " earns " + m.totalPay());
    }
}

class Employee {
    private String name;
    private int salary;
    public Employee(String name, int salary) {
        this.name = name;
        this.salary = salary;
    }
    public String getName() { return name; }
    public int getSalary() { return salary; }
}

class Manager extends Employee {
    private int bonus;
    public Manager(String name, int salary, int bonus) {
        // TODO
    }
    public int totalPay() { return getSalary() + bonus; }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Manager m = new Manager("Ana", 5000, 500);
        System.out.println(m.getName() + " earns " + m.totalPay());
    }
}

class Employee {
    private String name;
    private int salary;
    public Employee(String name, int salary) {
        this.name = name;
        this.salary = salary;
    }
    public String getName() { return name; }
    public int getSalary() { return salary; }
}

class Manager extends Employee {
    private int bonus;
    public Manager(String name, int salary, int bonus) {
        super(name, salary);
        this.bonus = bonus;
    }
    public int totalPay() { return getSalary() + bonus; }
}
`, hint: '§super(name, salary);§ first, then §this.bonus = bonus;§' },
      { type: 'code', id: 'ctor-default', prompt: 'The §Student§ constructor takes only a name, but §Person§ needs a name and an age. Make §Student§ pass §16§ as the age using §super§. Expected output: §Mia is 16§.',
        expected: 'Mia is 16',
        starter: j`public class Main {
    public static void main(String[] args) {
        Student s = new Student("Mia");
        System.out.println(s.getName() + " is " + s.getAge());
    }
}

class Person {
    private String name;
    private int age;
    public Person(String name, int age) { this.name = name; this.age = age; }
    public String getName() { return name; }
    public int getAge() { return age; }
}

class Student extends Person {
    public Student(String name) {
        // TODO
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Student s = new Student("Mia");
        System.out.println(s.getName() + " is " + s.getAge());
    }
}

class Person {
    private String name;
    private int age;
    public Person(String name, int age) { this.name = name; this.age = age; }
    public String getName() { return name; }
    public int getAge() { return age; }
}

class Student extends Person {
    public Student(String name) {
        super(name, 16);
    }
}
`, hint: 'A subclass constructor may take fewer parameters than the superclass one and fill in the rest itself.' },
    ],
  },
  {
    id: '5-3',
    title: 'Overriding Methods',
    blocks: [
      { type: 'text', md: md`
A subclass inherits methods, but sometimes the inherited behavior is not quite right. A §Dog§ should not "make a sound" the same way a generic §Animal§ does. A subclass can supply its own version of an inherited method. This is called **overriding**.

§§§java
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
§§§

### Rules for overriding

- The method must have the **same name, same parameter list, and same return type** (the **signature**) as the superclass method.
- The access cannot be more restrictive (a §public§ method cannot become §private§).
- The annotation §@Override§ is optional but recommended: it asks the compiler to check that you really are overriding. If you misspell the name or change a parameter, you get a compile error instead of a silent bug.

### Overriding vs. overloading

These sound alike but are different.

| | Overriding | Overloading |
|---|---|---|
| Where | subclass redefines a superclass method | same class (or hierarchy) has methods with the same name |
| Signature | identical | **different** parameter list |
| Chosen | by the real object type, at run time | by the argument types, at compile time |

### Which version runs?

When you call a method on an object, Java runs the version belonging to the object's **actual class**. If the class overrides the method, you get the new behavior; otherwise the inherited one.

§§§java
Dog d = new Dog();
System.out.println(d.sound());   // Woof  (Dog's version)
§§§

A §Fish§ class that does not override §sound()§ would still print §...§ because it inherits the Animal version.
` },
      { type: 'quiz', id: 'q-override-sig', question: 'Which method in §Dog§ correctly overrides §public String sound()§ from §Animal§?',
        choices: ['public String sound(int times)', 'public void sound()', 'public String sound()', 'public String Sound()'], answer: 2,
        explanation: 'An override needs the same name, parameters and return type. §sound(int)§ is an overload, §void§ changes the return type, and §Sound()§ is a different name.' },
      { type: 'quiz', id: 'q-override-ann', question: 'What is the benefit of writing §@Override§ above a method?',
        choices: ['It makes the method run faster', 'The compiler reports an error if the method does not actually override something', 'It lets the method access private fields', 'It is required for the code to compile'], answer: 1,
        explanation: '§@Override§ is a safety check. A typo in the name or parameters becomes a compile error rather than a mysterious new method.' },
      { type: 'quiz', id: 'q-overload', question: 'Class §Calc§ has §int add(int a, int b)§ and also §double add(double a, double b)§. This is an example of...',
        choices: ['Overriding', 'Overloading', 'Inheritance', 'Encapsulation'], answer: 1,
        explanation: 'Same name, different parameter types in the same class: that is overloading.' },
      { type: 'predict', id: 'p-override', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        Animal a = new Animal();
        Dog d = new Dog();
        Fish f = new Fish();
        System.out.println(a.sound());
        System.out.println(d.sound());
        System.out.println(f.sound());
    }
}

class Animal {
    public String sound() { return "..."; }
}

class Dog extends Animal {
    @Override
    public String sound() { return "Woof"; }
}

class Fish extends Animal {
}
`, answer: '... Woof ...', explanation: '§Fish§ does not override §sound()§, so it uses the inherited version, which returns "...".' },
      { type: 'code', id: 'ov-cat', prompt: 'Override §describe()§ in §Cat§ so it returns §A cat that purrs§. Then run: the first line is the generic text and the second is the cat text.',
        expected: 'An animal\nA cat that purrs',
        starter: j`public class Main {
    public static void main(String[] args) {
        Animal a = new Animal();
        Cat c = new Cat();
        System.out.println(a.describe());
        System.out.println(c.describe());
    }
}

class Animal {
    public String describe() { return "An animal"; }
}

class Cat extends Animal {
    // TODO: override describe()
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Animal a = new Animal();
        Cat c = new Cat();
        System.out.println(a.describe());
        System.out.println(c.describe());
    }
}

class Animal {
    public String describe() { return "An animal"; }
}

class Cat extends Animal {
    @Override
    public String describe() { return "A cat that purrs"; }
}
`, hint: 'Copy the method header exactly and change the returned text.' },
      { type: 'code', id: 'ov-area', prompt: 'Shapes calculate area differently. Override §area()§ in §Circle§ to return §3 * r * r§ (use whole-number math with the field §r§) and in §Square§ to return §s * s§. Expected: §27§ then §16§.',
        expected: '27\n16',
        starter: j`public class Main {
    public static void main(String[] args) {
        Circle c = new Circle(3);
        Square s = new Square(4);
        System.out.println(c.area());
        System.out.println(s.area());
    }
}

class Shape {
    public int area() { return 0; }
}

class Circle extends Shape {
    private int r;
    public Circle(int r) { this.r = r; }
    // TODO
}

class Square extends Shape {
    private int s;
    public Square(int s) { this.s = s; }
    // TODO
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Circle c = new Circle(3);
        Square s = new Square(4);
        System.out.println(c.area());
        System.out.println(s.area());
    }
}

class Shape {
    public int area() { return 0; }
}

class Circle extends Shape {
    private int r;
    public Circle(int r) { this.r = r; }
    @Override
    public int area() { return 3 * r * r; }
}

class Square extends Shape {
    private int s;
    public Square(int s) { this.s = s; }
    @Override
    public int area() { return s * s; }
}
`, hint: 'Both overrides are public int area() with a one-line body.' },
    ],
  },
  {
    id: '5-4',
    title: 'super Keyword',
    blocks: [
      { type: 'text', md: md`
You have already used §super(...)§ to call a superclass **constructor**. The keyword §super§ has a second job: it lets a subclass call the superclass **version of a method** that it has overridden.

Often you do not want to throw away the old behavior, only add to it:

§§§java
class Pet {
    private String name;
    public Pet(String name) { this.name = name; }
    public String getName() { return name; }

    public String describe() {
        return "Pet named " + name;
    }
}

class Dog extends Pet {
    public Dog(String name) { super(name); }

    @Override
    public String describe() {
        return super.describe() + ", a dog";
    }
}
§§§

§new Dog("Rex").describe()§ returns §Pet named Rex, a dog§. Inside §Dog§, the expression §super.describe()§ means "run the version of §describe§ that §Pet§ wrote".

### Why not just call describe()?

Inside §Dog.describe()§, writing plain §describe()§ calls *itself* again, forever: infinite recursion and a §StackOverflowError§. Using §super.§ jumps to the parent method instead.

### Two uses of super

| Syntax | Meaning |
|---|---|
| §super(args);§ | call a superclass constructor; first line of a constructor only |
| §super.method(args)§ | call the superclass version of a method; anywhere in a method |

Reusing the superclass method keeps your code from repeating itself, and if the parent changes, the child automatically follows.

### A longer chain

Each level can add one piece: §Dog§ calls §super.describe()§, which is §Pet§'s version. If §Pet§ itself extended §Animal§ and also used §super.describe()§, the text would be built from the top down.
` },
      { type: 'quiz', id: 'q-super-meth', question: 'Inside an overriding method in a subclass, how do you run the superclass version of the same method §show()§?',
        choices: ['show()', 'this.show()', 'super.show()', 'super(show)'], answer: 2,
        explanation: '§super.show()§ calls the parent version. Plain §show()§ or §this.show()§ would call the overriding method itself, causing infinite recursion.' },
      { type: 'quiz', id: 'q-super-first', question: 'Which statement about §super.method()§ is true?',
        choices: ['It must be the first line of the method', 'It can appear anywhere inside a subclass method', 'It can only be used in constructors', 'It creates a new superclass object'], answer: 1,
        explanation: 'Only the constructor call §super(...)§ must come first. §super.method()§ can appear anywhere, even more than once.' },
      { type: 'predict', id: 'p-super', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        Dog d = new Dog("Rex");
        System.out.println(d.describe());
    }
}

class Pet {
    private String name;
    public Pet(String name) { this.name = name; }
    public String describe() { return "Pet named " + name; }
}

class Dog extends Pet {
    public Dog(String name) { super(name); }
    @Override
    public String describe() { return super.describe() + ", a dog"; }
}
`, answer: 'Pet named Rex, a dog', explanation: '§super.describe()§ gives "Pet named Rex", and then Dog appends ", a dog".' },
      { type: 'predict', id: 'p-super-chain', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        Puppy p = new Puppy();
        System.out.println(p.trait());
    }
}

class Animal {
    public String trait() { return "alive"; }
}

class Dog extends Animal {
    @Override
    public String trait() { return super.trait() + " loyal"; }
}

class Puppy extends Dog {
    @Override
    public String trait() { return super.trait() + " playful"; }
}
`, answer: 'alive loyal playful', explanation: 'Puppy calls Dog, which calls Animal. The text is built from the top: alive, then loyal, then playful.' },
      { type: 'code', id: 'super-bonus', prompt: '§Employee.pay()§ returns the salary. Override §pay()§ in §Manager§ so it returns the superclass pay plus the bonus, using §super.pay()§. Expected: §4500§.',
        expected: '4500',
        starter: j`public class Main {
    public static void main(String[] args) {
        Manager m = new Manager(4000, 500);
        System.out.println(m.pay());
    }
}

class Employee {
    private int salary;
    public Employee(int salary) { this.salary = salary; }
    public int pay() { return salary; }
}

class Manager extends Employee {
    private int bonus;
    public Manager(int salary, int bonus) {
        super(salary);
        this.bonus = bonus;
    }
    // TODO: override pay() using super.pay()
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Manager m = new Manager(4000, 500);
        System.out.println(m.pay());
    }
}

class Employee {
    private int salary;
    public Employee(int salary) { this.salary = salary; }
    public int pay() { return salary; }
}

class Manager extends Employee {
    private int bonus;
    public Manager(int salary, int bonus) {
        super(salary);
        this.bonus = bonus;
    }
    @Override
    public int pay() { return super.pay() + bonus; }
}
`, hint: '§return super.pay() + bonus;§' },
      { type: 'code', id: 'super-greet', prompt: 'Make §Teacher.greet()§ return the §Person§ greeting followed by §, I teach math§. Use §super.greet()§. Expected: §Hello, I am Lee, I teach math§.',
        expected: 'Hello, I am Lee, I teach math',
        starter: j`public class Main {
    public static void main(String[] args) {
        Teacher t = new Teacher("Lee");
        System.out.println(t.greet());
    }
}

class Person {
    private String name;
    public Person(String name) { this.name = name; }
    public String greet() { return "Hello, I am " + name; }
}

class Teacher extends Person {
    public Teacher(String name) { super(name); }
    // TODO
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Teacher t = new Teacher("Lee");
        System.out.println(t.greet());
    }
}

class Person {
    private String name;
    public Person(String name) { this.name = name; }
    public String greet() { return "Hello, I am " + name; }
}

class Teacher extends Person {
    public Teacher(String name) { super(name); }
    @Override
    public String greet() { return super.greet() + ", I teach math"; }
}
`, hint: 'The private name stays hidden, so reuse the parent method instead.' },
    ],
  },
];
