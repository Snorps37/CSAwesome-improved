import type { Lesson } from './types';
import { md } from './md';

const j = String.raw;

// Unit 5 wrap-up: summary, practice, multiple choice, practice test, FRQ, projects. Original wording.
export const unit5c: Lesson[] = [
  {
    id: '5-8',
    title: 'Unit Summary',
    blocks: [
      { type: 'text', md: md`
## Inheritance at a glance

| Idea | Key points |
|---|---|
| **Subclass / superclass** | §class Dog extends Pet§. Use inheritance for is-a relationships. One superclass only. |
| **What is inherited** | Public methods. Not constructors. Private fields exist in the object but are reachable only through the superclass's public methods. |
| **Constructors** | First statement is §super(...)§; if omitted, Java adds §super();§. Superclass constructor runs first. |
| **Overriding** | Same name, parameters and return type as the superclass method; chosen at run time. §@Override§ catches mistakes. |
| **super.method()** | Calls the superclass version from within an override. |
| **Declared vs. actual type** | §Pet p = new Dog();§ is legal. The compiler checks the declared type; run time uses the actual type. |
| **Polymorphism** | The same call runs different code depending on the object (dynamic binding). |
| **Object class** | Top of every hierarchy. Override §toString()§ and §equals(Object)§. |

## Common mistakes

- Forgetting that a subclass constructor needs a matching §super(...)§ when the superclass has no no-argument constructor.
- Trying to read a superclass private field directly in the subclass.
- Calling a subclass-only method through a superclass-typed variable without a cast.
- Writing §equals(Dog other)§ instead of §equals(Object other)§, which overloads rather than overrides.
- Calling §describe()§ instead of §super.describe()§ inside the override, which causes infinite recursion.

## Tracing checklist

1. What is the **declared type** of the variable? (Compile-time check.)
2. What is the **actual type** of the object? (Run-time choice.)
3. Does the actual class override the method? If not, climb up the hierarchy.
4. Constructors: list them from the top of the hierarchy down.
` },
      { type: 'quiz', id: 'q-sum1', question: 'Which statement about constructors in an inheritance hierarchy is correct?',
        choices: ['Subclasses inherit all superclass constructors', 'The superclass constructor runs before the subclass constructor body', 'A subclass constructor can never call the superclass constructor', 'The subclass constructor runs first'], answer: 1,
        explanation: 'Constructors are not inherited, and the superclass constructor always finishes first.' },
      { type: 'quiz', id: 'q-sum2', question: 'Which concept explains why §a.sound()§ can print different text for different elements of an §Animal[]§?',
        choices: ['Overloading', 'Encapsulation', 'Polymorphism', 'Casting'], answer: 2,
        explanation: 'Polymorphism: the version of an overridden method is chosen by the actual object.' },
    ],
  },
  {
    id: '5-9',
    title: 'Toggle / Coding Practice',
    blocks: [
      { type: 'text', md: md`
Practice putting the pieces together. Each exercise gives you a small hierarchy and asks you to finish or repair it. Use the hint button if you get stuck.
` },
      { type: 'code', id: 'cp-vehicle', prompt: 'Write §Truck extends Vehicle§. Its constructor takes §name§ and §load§ (passing the name to the superclass). Override §info()§ so it returns §super.info()§ followed by §, load: § and the load. Expected: §Hauler, load: 12§.',
        expected: 'Hauler, load: 12',
        starter: j`public class Main {
    public static void main(String[] args) {
        Vehicle v = new Truck("Hauler", 12);
        System.out.println(v.info());
    }
}

class Vehicle {
    private String name;
    public Vehicle(String name) { this.name = name; }
    public String info() { return name; }
}

// TODO: Truck
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Vehicle v = new Truck("Hauler", 12);
        System.out.println(v.info());
    }
}

class Vehicle {
    private String name;
    public Vehicle(String name) { this.name = name; }
    public String info() { return name; }
}

class Truck extends Vehicle {
    private int load;
    public Truck(String name, int load) {
        super(name);
        this.load = load;
    }
    @Override
    public String info() { return super.info() + ", load: " + load; }
}
`, hint: 'Constructor first (super then field), then the override.' },
      { type: 'code', id: 'cp-fix', prompt: 'This program has three bugs: a missing §extends§, a missing §super§ call, and an override with the wrong return type. Fix them so it prints §Buddy says Woof§.',
        expected: 'Buddy says Woof',
        starter: j`public class Main {
    public static void main(String[] args) {
        Animal a = new Dog("Buddy");
        System.out.println(a.getName() + " says " + a.sound());
    }
}

class Animal {
    private String name;
    public Animal(String name) { this.name = name; }
    public String getName() { return name; }
    public String sound() { return "..."; }
}

class Dog {
    public Dog(String name) { }
    public void sound() { System.out.println("Woof"); }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Animal a = new Dog("Buddy");
        System.out.println(a.getName() + " says " + a.sound());
    }
}

class Animal {
    private String name;
    public Animal(String name) { this.name = name; }
    public String getName() { return name; }
    public String sound() { return "..."; }
}

class Dog extends Animal {
    public Dog(String name) { super(name); }
    @Override
    public String sound() { return "Woof"; }
}
`, hint: 'Dog extends Animal; call super(name); sound() must return a String.' },
      { type: 'code', id: 'cp-poly', prompt: 'Complete §Main§: loop over the §Staff§ array and print each person\'s §title()§ and §pay()§ on one line like §Teacher 3000§. Do not use casts or §instanceof§.',
        expected: 'Staff 2000\nTeacher 3000\nPrincipal 5000',
        starter: j`public class Main {
    public static void main(String[] args) {
        Staff[] team = { new Staff(), new Teacher(), new Principal() };
        // TODO: loop and print
    }
}

class Staff {
    public String title() { return "Staff"; }
    public int pay() { return 2000; }
}

class Teacher extends Staff {
    @Override
    public String title() { return "Teacher"; }
    @Override
    public int pay() { return super.pay() + 1000; }
}

class Principal extends Teacher {
    @Override
    public String title() { return "Principal"; }
    @Override
    public int pay() { return super.pay() + 2000; }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Staff[] team = { new Staff(), new Teacher(), new Principal() };
        for (Staff s : team) {
            System.out.println(s.title() + " " + s.pay());
        }
    }
}

class Staff {
    public String title() { return "Staff"; }
    public int pay() { return 2000; }
}

class Teacher extends Staff {
    @Override
    public String title() { return "Teacher"; }
    @Override
    public int pay() { return super.pay() + 1000; }
}

class Principal extends Teacher {
    @Override
    public String title() { return "Principal"; }
    @Override
    public int pay() { return super.pay() + 2000; }
}
`, hint: 'for (Staff s : team) { System.out.println(s.title() + " " + s.pay()); }' },
      { type: 'code', id: 'cp-dot', dot: true, minDotMoves: 6,
        prompt: 'A polymorphic drawing: each §Poly§ draws itself with a different number of sides. Run it, then add your own subclass (for example a hexagon with 6 sides) and add it to the array.',
        starter: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot(-60, -30);
        Poly[] shapes = { new Poly(3, "orange"), new Poly(4, "cyan") };
        for (Poly p : shapes) {
            p.draw(d);
            d.penUp();
            d.forward(70);
            d.penDown();
        }
    }
}

class Poly {
    private int sides;
    private String color;
    public Poly(int sides, String color) { this.sides = sides; this.color = color; }
    public void draw(Dot d) {
        d.setColor(color);
        for (int i = 0; i < sides; i++) {
            d.forward(35);
            d.turnRight(360.0 / sides);
        }
    }
}
` },
    ],
  },
  {
    id: '5-10',
    title: 'Multiple Choice',
    blocks: [
      { type: 'text', md: md`Ten questions in the style of the AP exam. Work each one out on paper before choosing.` },
      { type: 'quiz', id: 'mc1', question: 'Given §class Vehicle { public String go() { return "move"; } }§ and §class Boat extends Vehicle { public String go() { return "sail"; } }§, what does §Vehicle v = new Boat(); System.out.println(v.go());§ print?',
        choices: ['move', 'sail', 'move sail', 'Compile error'], answer: 1, explanation: 'Dynamic binding runs the actual object\'s method, so Boat\'s version prints §sail§.' },
      { type: 'quiz', id: 'mc2', question: 'Class §P§ has only the constructor §P(int n)§. Which constructor for §class Q extends P§ compiles?',
        choices: ['public Q() { }', 'public Q() { super(); }', 'public Q() { super(5); }', 'public Q() { this.n = 5; }'], answer: 2, explanation: 'P has no no-argument constructor, so the first two fail. §n§ may be private and is not Q\'s own field. §super(5)§ is correct.' },
      { type: 'quiz', id: 'mc3', question: 'Which relationship should be modeled with inheritance?',
        choices: ['A Library has Books', 'A Student has an Address', 'A Teacher is a Person', 'A Car has Wheels'], answer: 2, explanation: 'Is-a relationships use inheritance; has-a relationships use fields.' },
      { type: 'quiz', id: 'mc4', question: 'In which case is a method an **override** rather than an overload?',
        choices: ['Subclass declares §void f(int x)§; superclass has §void f(int x)§', 'Subclass declares §void f(double x)§; superclass has §void f(int x)§', 'Same class declares §void f(int x)§ and §void f(String s)§', 'Subclass declares §void g(int x)§; superclass has §void f(int x)§'], answer: 0, explanation: 'An override repeats the full signature in a subclass.' },
      { type: 'quiz', id: 'mc5', question: '§Pet p = new Cat();§ and §Cat§ has a method §purr()§ that §Pet§ lacks. Which statement compiles and runs correctly?',
        choices: ['p.purr();', '((Cat) p).purr();', '((Dog) p).purr();', 'Cat c = p;'], answer: 1, explanation: 'The cast tells the compiler to treat the reference as a Cat, which is the real type. The other options fail to compile or throw an exception.' },
      { type: 'quiz', id: 'mc6', question: 'Which statement is true about the §Object§ class?',
        choices: ['Only classes that write §extends Object§ inherit from it', 'Every class inherits from it, directly or indirectly', 'It cannot be overridden', 'It contains no methods'], answer: 1, explanation: 'All classes descend from Object, so every object has toString() and equals().' },
      { type: 'quiz', id: 'mc7', question: 'A subclass method contains the call §super.display();§. What does it do?',
        choices: ['Calls display() in the same subclass', 'Calls display() as written in the superclass', 'Creates a new superclass object', 'Always results in an infinite loop'], answer: 1, explanation: '§super.§ selects the superclass version of the method.' },
      { type: 'quiz', id: 'mc8', question: 'What is the output of §System.out.println(new Fido());§ if §Fido§ does not override §toString()§ but inherits from §Object§?',
        choices: ['Fido', 'An empty line', 'Text such as Fido@1b6d3586 (class name and hash code)', 'Compile error'], answer: 2, explanation: 'Object\'s default toString() gives the class name, an @ sign, and a hash code.' },
      { type: 'quiz', id: 'mc9', question: 'Which declaration is **not** allowed, given §class Dog extends Animal§?',
        choices: ['Animal a = new Dog();', 'Animal b = new Animal();', 'Dog c = new Dog();', 'Dog d = new Animal();'], answer: 3, explanation: 'An Animal is not necessarily a Dog; the compiler rejects it.' },
      { type: 'quiz', id: 'mc10', question: 'A subclass declares its own private field §count§ and the superclass also has a private field §count§. How many §count§ values exist inside one subclass object?',
        choices: ['One, shared', 'Two, one from each class', 'None, it is a compile error', 'Zero until super() runs'], answer: 1, explanation: 'Private fields are not overridden: the object holds the superclass\'s copy and the subclass\'s own copy separately.' },
    ],
  },
  {
    id: '5-11',
    title: 'Practice Test',
    blocks: [
      { type: 'text', md: md`A mixed set: trace the programs, then type exactly what they print. Take your time and avoid running them until you have an answer.` },
      { type: 'quiz', id: 'pt1', question: 'Which keyword is used to create a subclass?',
        choices: ['implements', 'extends', 'inherits', 'super'], answer: 1, explanation: '§class Child extends Parent§.' },
      { type: 'quiz', id: 'pt2', question: 'What is wrong with this class?\n\n§class B extends A { private int y; public B(int y) { this.y = y; super(); } }§',
        choices: ['Nothing is wrong', 'super() must be the first statement', 'y cannot be private', 'B cannot extend A'], answer: 1, explanation: 'The call to the superclass constructor has to come first.' },
      { type: 'quiz', id: 'pt3', question: 'A class hierarchy: §Animal§, §Dog extends Animal§, §Puppy extends Dog§. Which assignment is legal?',
        choices: ['Puppy p = new Dog();', 'Dog d = new Puppy();', 'Puppy p = new Animal();', 'Dog d = new Animal();'], answer: 1, explanation: 'A Puppy is a Dog. The reverse assignments would need a cast and would not be safe.' },
      { type: 'quiz', id: 'pt4', question: 'Why does Java use the object\'s actual class (not the variable type) to decide which overridden method runs?',
        choices: ['It is faster', 'This lets one piece of code work with many subclasses', 'Variables have no type', 'It prevents all errors'], answer: 1, explanation: 'That behavior is polymorphism, and it allows general code that works for any subclass.' },
      { type: 'quiz', id: 'pt5', question: 'Which method header correctly overrides §toString()§?',
        choices: ['public String toString(String s)', 'public void toString()', 'public String toString()', 'private String toString()'], answer: 2, explanation: 'Same name, no parameters, return type String, and public access.' },
      { type: 'quiz', id: 'pt6', question: 'The §==§ operator on two object references tests...',
        choices: ['Whether they have equal contents', 'Whether they refer to the same object', 'Whether their classes match', 'Whether toString() matches'], answer: 1, explanation: 'Use §equals§ for content; §==§ compares references.' },
      { type: 'predict', id: 'pt7', question: 'What is printed?',
        code: j`public class Main {
    public static void main(String[] args) {
        Base b = new Derived();
        b.print();
    }
}

class Base {
    public void print() { System.out.println("Base " + value()); }
    public int value() { return 1; }
}

class Derived extends Base {
    @Override
    public int value() { return 2; }
}
`, answer: 'Base 2', explanation: '§print()§ is inherited from Base, but the call to §value()§ on this object uses Derived\'s override.' },
      { type: 'predict', id: 'pt8', question: 'What is printed?',
        code: j`public class Main {
    public static void main(String[] args) {
        Child c = new Child(7);
        System.out.println(c.total());
    }
}

class Parent {
    private int a;
    public Parent(int a) { this.a = a; }
    public int total() { return a; }
}

class Child extends Parent {
    private int b;
    public Child(int b) {
        super(b * 2);
        this.b = b;
    }
    @Override
    public int total() { return super.total() + b; }
}
`, answer: '21', explanation: 'a is 14 (7 * 2), b is 7, so total is 14 + 7 = 21.' },
      { type: 'predict', id: 'pt9', question: 'What is printed?',
        code: j`public class Main {
    public static void main(String[] args) {
        Item[] items = { new Item("pen"), new Special("ink") };
        String out = "";
        for (Item i : items) {
            out += i.label() + ";";
        }
        System.out.println(out);
    }
}

class Item {
    private String name;
    public Item(String name) { this.name = name; }
    public String label() { return name; }
}

class Special extends Item {
    public Special(String name) { super(name.toUpperCase()); }
    @Override
    public String label() { return "*" + super.label(); }
}
`, answer: 'pen;*INK;', explanation: 'The first item prints its plain name. The Special passes "INK" up and adds a star.' },
      { type: 'predict', id: 'pt10', question: 'What is printed?',
        code: j`public class Main {
    public static void main(String[] args) {
        Object o = new Tag("hi");
        System.out.println(o);
        Tag t = new Tag("hi");
        System.out.println(t.equals(o));
        System.out.println(t == o);
    }
}

class Tag {
    private String text;
    public Tag(String text) { this.text = text; }
    @Override
    public String toString() { return "<" + text + ">"; }
    @Override
    public boolean equals(Object other) {
        Tag x = (Tag) other;
        return text.equals(x.text);
    }
}
`, answer: '<hi>\ntrue\nfalse', explanation: 'The Object variable still uses Tag\'s toString. The two Tag objects have equal text, but they are separate objects.' },
    ],
  },
  {
    id: '5-12',
    title: 'FRQ Practice',
    blocks: [
      { type: 'text', md: md`
The AP free-response section includes a **class design** question: given a description, write a whole class (often a subclass). Typical expectations:

- The correct §extends§ header and constructor with a §super(...)§ call.
- Instance variables declared §private§.
- Overridden methods with the exact signature of the superclass method.
- Use of §super.method()§ where the description says "in addition to" what the parent does.

The two tasks below follow that style. Write the code, run it, and compare the output.
` },
      { type: 'code', id: 'frq-account', prompt: 'A §BankAccount§ has a balance and a §withdraw(int amount)§ that subtracts only if enough money is available. Write §SavingsAccount extends BankAccount§: it has a private §fee§ (set in its constructor), and it overrides §withdraw§ so that each withdrawal that succeeds also deducts the fee (a withdrawal of 20 with fee 1 removes 21). Use §super.withdraw§. Expected balance after the two withdrawals: §58§ (100 - 21 - 21; the third attempt of 500 is refused).',
        expected: 'Balance: 58',
        starter: j`public class Main {
    public static void main(String[] args) {
        SavingsAccount s = new SavingsAccount(100, 1);
        s.withdraw(20);
        s.withdraw(20);
        s.withdraw(500);
        System.out.println("Balance: " + s.getBalance());
    }
}

class BankAccount {
    private int balance;
    public BankAccount(int balance) { this.balance = balance; }
    public int getBalance() { return balance; }
    public boolean withdraw(int amount) {
        if (amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }
}

// TODO: SavingsAccount
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        SavingsAccount s = new SavingsAccount(100, 1);
        s.withdraw(20);
        s.withdraw(20);
        s.withdraw(500);
        System.out.println("Balance: " + s.getBalance());
    }
}

class BankAccount {
    private int balance;
    public BankAccount(int balance) { this.balance = balance; }
    public int getBalance() { return balance; }
    public boolean withdraw(int amount) {
        if (amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }
}

class SavingsAccount extends BankAccount {
    private int fee;
    public SavingsAccount(int balance, int fee) {
        super(balance);
        this.fee = fee;
    }
    @Override
    public boolean withdraw(int amount) {
        if (super.withdraw(amount)) {
            super.withdraw(fee);
            return true;
        }
        return false;
    }
}
`, hint: 'Call super.withdraw(amount) in an if; when it returns true, also call super.withdraw(fee).' },
      { type: 'code', id: 'frq-media', prompt: 'A §MediaItem§ has a title and a §describe()§ that returns the title. Write §Song§ (with an artist) and §Movie§ (with a length in minutes) as subclasses. §Song.describe()§ returns §title - artist§; §Movie.describe()§ returns §title (N min)§. Expected output: three lines as shown in the test.',
        expected: 'Poster\nBlue - Ana\nTrip (95 min)',
        starter: j`public class Main {
    public static void main(String[] args) {
        MediaItem[] lib = { new MediaItem("Poster"), new Song("Blue", "Ana"), new Movie("Trip", 95) };
        for (MediaItem m : lib) {
            System.out.println(m.describe());
        }
    }
}

class MediaItem {
    private String title;
    public MediaItem(String title) { this.title = title; }
    public String getTitle() { return title; }
    public String describe() { return title; }
}

// TODO: Song and Movie
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        MediaItem[] lib = { new MediaItem("Poster"), new Song("Blue", "Ana"), new Movie("Trip", 95) };
        for (MediaItem m : lib) {
            System.out.println(m.describe());
        }
    }
}

class MediaItem {
    private String title;
    public MediaItem(String title) { this.title = title; }
    public String getTitle() { return title; }
    public String describe() { return title; }
}

class Song extends MediaItem {
    private String artist;
    public Song(String title, String artist) {
        super(title);
        this.artist = artist;
    }
    @Override
    public String describe() { return getTitle() + " - " + artist; }
}

class Movie extends MediaItem {
    private int minutes;
    public Movie(String title, int minutes) {
        super(title);
        this.minutes = minutes;
    }
    @Override
    public String describe() { return getTitle() + " (" + minutes + " min)"; }
}
`, hint: 'Use getTitle() since title is private in MediaItem.' },
    ],
  },
  {
    id: '5-13',
    title: 'Projects',
    blocks: [
      { type: 'text', md: md`
Open-ended projects. Run them, then extend them with your own ideas.

1. **Zoo.** Add two new animals and give them unique behavior. Add a method to the base class that uses an overridden method (so your new animals inherit it for free).
2. **Dot shapes.** Make a base class for shapes that draw with the Dot, and subclasses for different polygons, a star, and a spiral.
` },
      { type: 'code', id: 'proj-zoo', completeOnRun: true,
        prompt: 'A zoo simulation. Add at least two new animal subclasses (for example §Cow§ and §Snake§), put them in the array, and see the polymorphic loop handle them.',
        starter: j`public class Main {
    public static void main(String[] args) {
        Animal[] zoo = { new Dog("Rex"), new Cat("Tom") };
        for (Animal a : zoo) {
            a.introduce();
        }
    }
}

class Animal {
    private String name;
    public Animal(String name) { this.name = name; }
    public String getName() { return name; }
    public String sound() { return "..."; }
    public void introduce() {
        System.out.println(name + " the " + getClass().getSimpleName() + " says " + sound());
    }
}

class Dog extends Animal {
    public Dog(String name) { super(name); }
    @Override
    public String sound() { return "Woof"; }
}

class Cat extends Animal {
    public Cat(String name) { super(name); }
    @Override
    public String sound() { return "Meow"; }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Animal[] zoo = { new Dog("Rex"), new Cat("Tom"), new Cow("Bessie") };
        for (Animal a : zoo) {
            a.introduce();
        }
    }
}

class Animal {
    private String name;
    public Animal(String name) { this.name = name; }
    public String getName() { return name; }
    public String sound() { return "..."; }
    public void introduce() {
        System.out.println(name + " the " + getClass().getSimpleName() + " says " + sound());
    }
}

class Dog extends Animal {
    public Dog(String name) { super(name); }
    @Override
    public String sound() { return "Woof"; }
}

class Cat extends Animal {
    public Cat(String name) { super(name); }
    @Override
    public String sound() { return "Meow"; }
}

class Cow extends Animal {
    public Cow(String name) { super(name); }
    @Override
    public String sound() { return "Moo"; }
}
` },
      { type: 'code', id: 'proj-dot', dot: true, completeOnRun: true,
        prompt: 'A family of Dot shapes. Add a §Star§ subclass (turn 144 degrees, 5 points) or a §Spiral§, and add it to the array.',
        starter: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot(-50, -50);
        Figure[] figs = { new Figure(3, 40, "orange"), new Figure(5, 30, "cyan") };
        for (Figure f : figs) {
            f.draw(d);
            d.penUp();
            d.forward(60);
            d.penDown();
        }
    }
}

class Figure {
    private int sides;
    private int length;
    private String color;
    public Figure(int sides, int length, String color) {
        this.sides = sides;
        this.length = length;
        this.color = color;
    }
    public void draw(Dot d) {
        d.setColor(color);
        for (int i = 0; i < sides; i++) {
            d.forward(length);
            d.turnRight(360.0 / sides);
        }
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot(-50, -50);
        Figure[] figs = { new Figure(3, 40, "orange"), new Figure(5, 30, "cyan"), new Star() };
        for (Figure f : figs) {
            f.draw(d);
            d.penUp();
            d.forward(60);
            d.penDown();
        }
    }
}

class Figure {
    private int sides;
    private int length;
    private String color;
    public Figure(int sides, int length, String color) {
        this.sides = sides;
        this.length = length;
        this.color = color;
    }
    public void draw(Dot d) {
        d.setColor(color);
        for (int i = 0; i < sides; i++) {
            d.forward(length);
            d.turnRight(360.0 / sides);
        }
    }
}

class Star extends Figure {
    public Star() { super(5, 40, "violet"); }
    @Override
    public void draw(Dot d) {
        d.setColor("violet");
        for (int i = 0; i < 5; i++) {
            d.forward(40);
            d.turnRight(144);
        }
    }
}
` },
    ],
  },
];
