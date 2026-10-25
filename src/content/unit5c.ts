import { unit5d, mixedPractice, summaryCode } from './unit5d';
import type { Lesson } from './types';
import { md } from './md';

const j = String.raw;

// Unit 5 wrap-up: summary, practice, multiple choice, practice test, FRQ, projects. Original wording.
const existing: Lesson[] = [
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
      { type: 'code', id: 'frq-account', prompt: 'A §BankAccount§ has a balance and a §withdraw(int amount)§ that subtracts only if enough money is available. Write §SavingsAccount extends BankAccount§: it has a private §fee§ (set in its constructor), and it overrides §withdraw§ so that each withdrawal that succeeds also deducts the fee (a withdrawal of 20 with fee 1 removes 21). Refuse the entire transaction if amount plus fee exceeds the balance; assume nonnegative fees and withdrawal amounts. Use §super.withdraw§. Expected balance after the two withdrawals: §58§ (100 - 21 - 21; the third attempt of 500 is refused). The final two lines confirm that a balance of 20 cannot cover a withdrawal of 20 plus fee 1: print false and leave 20.',
        expected: 'Balance: 58\nfalse\n20',
        starter: j`public class Main {
    public static void main(String[] args) {
        SavingsAccount s = new SavingsAccount(100, 1);
        s.withdraw(20);
        s.withdraw(20);
        s.withdraw(500);
        System.out.println("Balance: " + s.getBalance());
        SavingsAccount low = new SavingsAccount(20, 1);
        System.out.println(low.withdraw(20));
        System.out.println(low.getBalance());
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
        SavingsAccount low = new SavingsAccount(20, 1);
        System.out.println(low.withdraw(20));
        System.out.println(low.getBalance());
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
        return amount >= 0 && amount <= getBalance() - fee
            && super.withdraw(amount + fee);
    }
}
`, hint: 'Check that the balance covers amount plus fee, then make one superclass withdrawal for the combined amount.' },
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

];

const moved = (source: Lesson, id: string, title: string): Lesson => ({
  ...source, id, title, blocks: source.blocks.map(b => b.type === 'text' ? b : {...b, id: `${id}-${b.id}`})
});
const summary = moved(existing[0], '5-8', 'Inheritance Summary');
summary.blocks.push(summaryCode);
const frq = moved(existing[3], '5-9', 'Free Response Questions');
frq.blocks.unshift({type:'text', md: '### Class design, parts A and B\n\nPart A: implement a stateful account subclass, preserving the superclass withdrawal contract. Part B: implement two media subclasses and process a heterogeneous collection. For each part, supply private fields, a constructor that initializes inherited state, and the required override. Read the driver as a test specification; do not replace its calls with literal output. Explain why the driver can use a superclass reference.'});
for (const b of frq.blocks) if (b.type === 'code') {
  if (b.id.endsWith('frq-account')) b.starter = b.starter.replace('// TODO: SavingsAccount', 'class SavingsAccount extends BankAccount {\n    // Part A: declare fee, implement constructor and boolean withdraw(int amount).\n}');
  if (b.id.endsWith('frq-media')) b.starter = b.starter.replace('// TODO: Song and Movie', 'class Song extends MediaItem {\n    // Part B: artist, constructor, describe().\n}\nclass Movie extends MediaItem {\n    // Part B: minutes, constructor, describe().\n}');
}
const practice = moved(existing[1], '5-11', 'Code Practice with Object Oriented Concepts');
practice.blocks = practice.blocks.filter(b => b.type !== 'code' || b.id.indexOf('cp-dot') < 0);
export const unit5c: Lesson[] = [summary, frq, mixedPractice, practice,
  moved(existing[2], '5-12', 'Inheritance Multiple-Choice Exercises'), ...unit5d];
