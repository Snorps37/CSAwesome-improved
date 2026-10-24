import type { Lesson } from './types';
import { md } from './md';

const j = String.raw;

// Unit 3 lessons 3.6-3.10. Original wording.
export const unit3b: Lesson[] = [
  {
    id: '3-6',
    title: 'Methods: Accessors, Mutators, Getters and Setters',
    blocks: [
      { type: 'text', md: md`
Since instance variables are private, other classes need controlled ways to read and change them.

- An **accessor** (getter) returns the value of an instance variable. It does not change the object.
- A **mutator** (setter) changes an instance variable. Usually it is a §void§ method that takes the new value.

§§§java
public class Student {
    private String name;
    private int grade;

    public Student(String n, int g) { name = n; grade = g; }

    public String getName() { return name; }        // accessor
    public int getGrade() { return grade; }         // accessor

    public void setGrade(int g) { grade = g; }      // mutator
    public void promote() { grade++; }              // mutator, no parameter
}
§§§

Naming convention: §getX§ and §setX§. For a §boolean§ accessor, §isX§ is common (§isEmpty()§).

**Why not just make the field public?** A setter can check the new value before accepting it:

§§§java
public void setGrade(int g) {
    if (g >= 9 && g <= 12) {
        grade = g;
    }
}
§§§

Now no code anywhere can put a student in grade 40. Because the class controls every change, its objects stay valid.

**§toString§.** A method named §toString§ that returns a §String§ is called automatically by §println§ and string concatenation. It lets an object describe itself:

§§§java
public String toString() { return name + " (grade " + grade + ")"; }
§§§

**Methods that return objects or compute things.** Not every method is a getter or setter. A method can compute a value from several fields (§getArea()§), compare objects (§isOlderThan(Student other)§), or return a new object. Inside the class, a method can read the private fields of another object of the **same class**.

An accessor that returns an *object* reference (not a primitive or immutable String) hands out access to the real object. Keep that in mind in later units.
` },
      { type: 'quiz', id: 'q-acc', question: 'Which method is a **mutator**?',
        choices: ['public int getAge() { return age; }', 'public void birthday() { age++; }', 'public String toString() { return "x"; }', 'public boolean isAdult() { return age >= 18; }'], answer: 1,
        explanation: 'birthday changes the object\'s state. The others only read it.' },
      { type: 'quiz', id: 'q-why', question: 'What is the main benefit of a setter with validation over a public field?',
        choices: ['It runs faster', 'The class can reject invalid values', 'It needs fewer lines', 'It avoids constructors'], answer: 1, explanation: 'The setter is a gatekeeper: it can refuse bad data.' },
      { type: 'quiz', id: 'q-tostr', question: 'When is §toString()§ called automatically?',
        choices: ['When the object is passed to println', 'When the program starts', 'When the object is created', 'Never; you must always call it'], answer: 0, explanation: 'println(obj) and "text" + obj call obj.toString() for you.' },
      { type: 'predict', id: 'p-student', question: 'What does this program print?',
        code: j`class Student {
    private String name;
    private int grade;

    public Student(String n, int g) { name = n; grade = g; }

    public void setGrade(int g) {
        if (g >= 9 && g <= 12) {
            grade = g;
        }
    }

    public void promote() { setGrade(grade + 1); }

    public String toString() { return name + " (grade " + grade + ")"; }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Ana", 11);
        s.promote();
        System.out.println(s);
        s.promote();
        System.out.println(s);
        s.setGrade(40);
        System.out.println(s);
    }
}
`, answer: 'Ana (grade 12) Ana (grade 12) Ana (grade 12)', explanation: 'The first promote makes grade 12. The second tries 13 and the setter rejects it. 40 is rejected too.' },
      { type: 'predict', id: 'p-cmp', question: 'What does this program print?',
        code: j`class Person {
    private int age;
    public Person(int a) { age = a; }
    public boolean isOlderThan(Person other) {
        return age > other.age;
    }
}

public class Main {
    public static void main(String[] args) {
        Person x = new Person(30);
        Person y = new Person(25);
        System.out.println(x.isOlderThan(y));
        System.out.println(y.isOlderThan(x));
    }
}
`, answer: 'true false', explanation: 'Inside Person, a method may read another Person\'s private age.' },
      { type: 'code', id: 'acc-account', prompt: 'Complete the §Account§ class. §deposit(amount)§ adds to the balance only if the amount is positive. §getBalance()§ returns the balance. Expected: §Balance: 150§.',
        expected: 'Balance: 150',
        starter: j`class Account {
    private int balance;

    public Account(int start) { balance = start; }

    // TODO: deposit(int amount) - ignore amounts that are not positive
    // TODO: getBalance()
}

public class Main {
    public static void main(String[] args) {
        Account a = new Account(100);
        a.deposit(50);
        a.deposit(-20);
        System.out.println("Balance: " + a.getBalance());
    }
}
`,
        solution: j`class Account {
    private int balance;

    public Account(int start) { balance = start; }

    public void deposit(int amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public int getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        Account a = new Account(100);
        a.deposit(50);
        a.deposit(-20);
        System.out.println("Balance: " + a.getBalance());
    }
}
`, hint: 'deposit is void with an if guarding balance += amount.' },
      { type: 'code', id: 'acc-tostring', prompt: 'Add a §toString()§ method to §Point§ so that printing a point shows §(3, -2)§.',
        expected: '(3, -2)',
        starter: j`class Point {
    private int x;
    private int y;
    public Point(int x0, int y0) { x = x0; y = y0; }
    // TODO: toString
}

public class Main {
    public static void main(String[] args) {
        Point p = new Point(3, -2);
        System.out.println(p);
    }
}
`,
        solution: j`class Point {
    private int x;
    private int y;
    public Point(int x0, int y0) { x = x0; y = y0; }
    public String toString() {
        return "(" + x + ", " + y + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        Point p = new Point(3, -2);
        System.out.println(p);
    }
}
`, hint: 'return "(" + x + ", " + y + ")";' },
      { type: 'code', id: 'acc-bulb', prompt: 'Write a boolean-style accessor and a mutator for a §Light§: §isOn()§ returns the state and §toggle()§ flips it. The program should print §false true false§ on one line.',
        expected: 'false true false',
        starter: j`class Light {
    private boolean on;
    // TODO: isOn() and toggle()
}

public class Main {
    public static void main(String[] args) {
        Light l = new Light();
        String out = "" + l.isOn();
        l.toggle();
        out += " " + l.isOn();
        l.toggle();
        out += " " + l.isOn();
        System.out.println(out);
    }
}
`,
        solution: j`class Light {
    private boolean on;
    public boolean isOn() { return on; }
    public void toggle() { on = !on; }
}

public class Main {
    public static void main(String[] args) {
        Light l = new Light();
        String out = "" + l.isOn();
        l.toggle();
        out += " " + l.isOn();
        l.toggle();
        out += " " + l.isOn();
        System.out.println(out);
    }
}
`, hint: 'toggle sets on to the opposite: on = !on;' },
    ],
  },
  {
    id: '3-7',
    title: 'Static Variables and Methods',
    blocks: [
      { type: 'text', md: md`
Most variables and methods belong to **objects**: each object has its own copy. A member declared §static§ belongs to the **class itself**. There is exactly one copy, shared by all objects.

§§§java
public class Ticket {
    private static int issued = 0;     // one shared counter
    private int number;                // each ticket has its own

    public Ticket() {
        issued++;
        number = issued;
    }

    public int getNumber() { return number; }
    public static int getIssued() { return issued; }
}
§§§

Use **static variables** for data about the whole class, such as a count of objects created or a constant.

**Static methods** are called with the class name: §Ticket.getIssued()§ and §Math.sqrt(9)§. You do not need an object. Rules:

- A static method **cannot** use instance variables or call instance methods directly, because there is no particular object. It has no §this§.
- A non-static (instance) method **can** use static variables and call static methods.

**Constants.** A variable that never changes is declared §public static final§ and named in ALL_CAPS: §public static final int MAX_PLAYERS = 4;§. The value cannot be reassigned after it is set.

**When to make a method static?** If it does not depend on any one object's data (a utility such as §isLeapYear(int year)§), static is a good fit. §main§ is static, because it runs before any object exists.

**Calling:** from outside, use §ClassName.method()§ for static members and §object.method()§ for instance members. Inside the same class, the class name can be left off.
` },
      { type: 'quiz', id: 'q-stat', question: 'What does §static§ mean for a variable?',
        choices: ['It cannot be changed', 'There is one copy shared by the whole class', 'It is private', 'It belongs only to the first object'], answer: 1, explanation: 'Static means class-level. "Cannot be changed" is final.' },
      { type: 'quiz', id: 'q-statcall', question: 'Inside a static method, which is a compile-time error?',
        choices: ['Calling Math.abs(-3)', 'Using a static variable', 'Reading an instance variable directly', 'Declaring a local variable'], answer: 2, explanation: 'A static method has no object, so instance variables are not available.' },
      { type: 'quiz', id: 'q-const', question: 'Which line declares a proper constant?',
        choices: ['static int max = 5;', 'public static final int MAX = 5;', 'final MAX = 5;', 'public int MAX = 5;'], answer: 1, explanation: 'static + final (and conventionally ALL_CAPS) gives one shared, unchangeable value.' },
      { type: 'predict', id: 'p-ticket', question: 'What does this program print?',
        code: j`class Ticket {
    private static int issued = 0;
    private int number;

    public Ticket() {
        issued++;
        number = issued;
    }

    public int getNumber() { return number; }
    public static int getIssued() { return issued; }
}

public class Main {
    public static void main(String[] args) {
        Ticket a = new Ticket();
        Ticket b = new Ticket();
        Ticket c = new Ticket();
        System.out.println(a.getNumber() + " " + c.getNumber());
        System.out.println(Ticket.getIssued());
    }
}
`, answer: '1 3 3', explanation: 'Each ticket copies the shared counter at creation: 1, 2, 3. After three tickets issued is 3.' },
      { type: 'predict', id: 'p-shared', question: 'What does this program print?',
        code: j`class Dial {
    static int clicks = 0;
    int mine = 0;
    void press() { clicks++; mine++; }
}

public class Main {
    public static void main(String[] args) {
        Dial x = new Dial();
        Dial y = new Dial();
        x.press();
        x.press();
        y.press();
        System.out.println(x.mine + " " + y.mine + " " + Dial.clicks);
    }
}
`, answer: '2 1 3', explanation: 'mine is per object (2 and 1). clicks is shared, so all three presses add up.' },
      { type: 'code', id: 'stat-count', prompt: 'Add a **static** counter to §Robot§ that counts how many robots exist, plus a static method §getCount()§. Expected: §Robots: 3§.',
        expected: 'Robots: 3',
        starter: j`class Robot {
    // TODO: static count, increase it in the constructor, static getCount()
    private String name;

    public Robot(String n) {
        name = n;
    }
}

public class Main {
    public static void main(String[] args) {
        new Robot("A");
        new Robot("B");
        new Robot("C");
        System.out.println("Robots: " + Robot.getCount());
    }
}
`,
        solution: j`class Robot {
    private static int count = 0;
    private String name;

    public Robot(String n) {
        name = n;
        count++;
    }

    public static int getCount() {
        return count;
    }
}

public class Main {
    public static void main(String[] args) {
        new Robot("A");
        new Robot("B");
        new Robot("C");
        System.out.println("Robots: " + Robot.getCount());
    }
}
`, hint: 'private static int count = 0; then count++ in the constructor.' },
      { type: 'code', id: 'stat-util', prompt: 'Write the static utility §isLeap(int year)§: a year is a leap year if divisible by 4 and not by 100, unless divisible by 400. Expected: §true false true false§ on one line.',
        expected: 'true false true false',
        starter: j`public class Main {
    // TODO: public static boolean isLeap(int year)

    public static void main(String[] args) {
        System.out.println(isLeap(2024) + " " + isLeap(1900) + " " + isLeap(2000) + " " + isLeap(2023));
    }
}
`,
        solution: j`public class Main {
    public static boolean isLeap(int year) {
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }

    public static void main(String[] args) {
        System.out.println(isLeap(2024) + " " + isLeap(1900) + " " + isLeap(2000) + " " + isLeap(2023));
    }
}
`, hint: '(year % 4 == 0 && year % 100 != 0) || year % 400 == 0' },
      { type: 'code', id: 'stat-const', prompt: 'Use a constant. Declare §public static final double TAX = 0.5;§ in the class (a high tax to keep the math easy) and compute the total for a price of 20. Expected: §Total: 30.0§.',
        expected: 'Total: 30.0',
        starter: j`public class Main {
    // TODO: constant TAX

    public static double total(double price) {
        return price + price * TAX;
    }

    public static void main(String[] args) {
        System.out.println("Total: " + total(20));
    }
}
`,
        solution: j`public class Main {
    public static final double TAX = 0.5;

    public static double total(double price) {
        return price + price * TAX;
    }

    public static void main(String[] args) {
        System.out.println("Total: " + total(20));
    }
}
`, hint: 'public static final double TAX = 0.5;' },
    ],
  },
  {
    id: '3-8',
    title: 'Scope and Access',
    blocks: [
      { type: 'text', md: md`
**Scope** is the part of a program where a variable can be used.

- A **local variable** is declared inside a method, constructor or block (between § { § and § } §). It exists only from its declaration to the end of that block. This includes **parameters** and loop variables.
- An **instance variable** is declared in the class, outside every method. It is usable in all the instance methods and constructors of the class, for as long as the object lives.
- A **static variable** lives as long as the program runs.

§§§java
public class Demo {
    private int total = 0;            // instance: whole class

    public void addUpTo(int n) {      // n is a parameter: local
        for (int i = 1; i <= n; i++) {   // i: only in the loop
            total += i;
        }
        // i is not visible here
    }
}
§§§

**Shadowing.** If a local variable or parameter has the same name as an instance variable, the local one hides the instance one inside that method. Writing §int total = 5;§ inside a method creates a *new* local variable and leaves the field untouched. This is a very common bug.

**Two locals with the same name** cannot both be in scope at once in the same method, but two separate blocks (like two loops) may each declare their own §i§.

**Access control.**

| Modifier | Visible to |
|---|---|
| §public§ | any class |
| §private§ | only the declaring class |

The AP exam uses only these two. Private applies to the *class*, not the object: a method in §Person§ may touch the private fields of another §Person§.

**Lifetime.** Local variables are created when the block runs and vanish when it ends. Values do not carry over to the next call. If you need to remember something between calls, store it in an instance variable.
` },
      { type: 'quiz', id: 'q-scope', question: 'Where is the variable §k§ visible?\n\n§§§java\npublic void run() {\n    for (int k = 0; k < 3; k++) {\n        System.out.print(k);\n    }\n}\n§§§',
        choices: ['The whole class', 'Only inside the for loop', 'Anywhere in the method', 'Only after the loop'], answer: 1, explanation: 'A variable declared in the for header is local to the loop.' },
      { type: 'quiz', id: 'q-shadow', question: 'The constructor says §int size = s;§ and the class has a field §size§. What happens to the field?',
        choices: ['It gets the value s', 'It is unchanged: a new local variable hides it', 'Compile error', 'It becomes static'], answer: 1, explanation: 'Declaring the type creates a new local variable that shadows the field.' },
      { type: 'quiz', id: 'q-priv2', question: 'Class §A§ has §private int v;§. Which code can read §v§?',
        choices: ['Any method in class A', 'Any method in the same file', 'Main only', 'Any class that imports A'], answer: 0, explanation: 'private means visible only inside the class that declares it.' },
      { type: 'predict', id: 'p-shadow', question: 'What does this program print?',
        code: j`class Box {
    private int size = 1;

    public void grow(int size) {
        size = size + 10;
    }

    public int getSize() { return size; }
}

public class Main {
    public static void main(String[] args) {
        Box b = new Box();
        b.grow(5);
        System.out.println(b.getSize());
    }
}
`, answer: '1', explanation: 'Inside grow, size is the parameter. The field is never touched.' },
      { type: 'predict', id: 'p-life', question: 'What does this program print?',
        code: j`class Tally {
    private int kept = 0;

    public void step() {
        int fresh = 0;
        fresh++;
        kept++;
        System.out.print(fresh + ":" + kept + " ");
    }
}

public class Main {
    public static void main(String[] args) {
        Tally t = new Tally();
        t.step();
        t.step();
        t.step();
        System.out.println();
    }
}
`, answer: '1:1 1:2 1:3', explanation: 'The local fresh starts over each call; the instance variable kept remembers.' },
      { type: 'code', id: 'scope-fix', prompt: 'The §Timer§ constructor accidentally creates a local variable and §tick()§ shadows the field with its parameter. Fix both so the program prints §3§.',
        expected: '3',
        starter: j`class Timer {
    private int ticks;

    public Timer(int start) {
        int ticks = start;
    }

    public void tick(int amount) {
        int ticks = ticks + amount;
    }

    public int getTicks() { return ticks; }
}

public class Main {
    public static void main(String[] args) {
        Timer t = new Timer(1);
        t.tick(2);
        System.out.println(t.getTicks());
    }
}
`,
        solution: j`class Timer {
    private int ticks;

    public Timer(int start) {
        ticks = start;
    }

    public void tick(int amount) {
        ticks = ticks + amount;
    }

    public int getTicks() { return ticks; }
}

public class Main {
    public static void main(String[] args) {
        Timer t = new Timer(1);
        t.tick(2);
        System.out.println(t.getTicks());
    }
}
`, hint: 'Remove "int" in front of ticks in both places.' },
      { type: 'code', id: 'scope-loop', prompt: 'The variable §total§ is declared inside the loop, so it cannot be used after it. Move it so the program prints §Sum: 15§.',
        expected: 'Sum: 15',
        starter: j`public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            int total = 0;
            total += i;
        }
        System.out.println("Sum: " + total);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int total = 0;
        for (int i = 1; i <= 5; i++) {
            total += i;
        }
        System.out.println("Sum: " + total);
    }
}
`, hint: 'Declare int total = 0; before the loop.' },
    ],
  },
  {
    id: '3-9',
    title: 'this Keyword',
    blocks: [
      { type: 'text', md: md`
Inside an instance method or constructor, the keyword **§this§** is a reference to the **current object**: the one the method was called on.

**Use 1: separate a field from a parameter with the same name.**

§§§java
public class Pet {
    private String name;

    public Pet(String name) {
        this.name = name;   // field = parameter
    }
}
§§§

§this.name§ is the field; plain §name§ is the parameter that hides it. Many programmers like to give parameters the same names as the fields because the names read well, and §this§ makes it unambiguous. This also fixes the shadowing bug from lesson 3.8.

**Use 2: pass the current object to another method or constructor.**

§§§java
public void join(Team t) {
    t.add(this);       // "add me"
}
§§§

**Use 3: compare the current object with another one.**

§§§java
public boolean sameAge(Pet other) {
    return this.age == other.age;
}
§§§

**Calling an instance method on yourself.** Inside the class, §feed()§ means the same as §this.feed()§. The §this§ is implied.

**Static methods have no §this§.** Using it inside a static method is a compile-time error.

**Chaining.** A method can §return this;§, which lets calls be chained: §counter.add(2).add(3)§. This is optional but a nice design.

Picture it: when you write §a.setAge(5)§ then inside §setAge§, §this§ refers to §a§. When you write §b.setAge(7)§, §this§ refers to §b§.
` },
      { type: 'quiz', id: 'q-this', question: 'What does §this§ refer to inside an instance method?',
        choices: ['The class itself', 'The object the method was called on', 'The previous object created', 'The main method'], answer: 1, explanation: 'this is the current object, which differs from call to call.' },
      { type: 'quiz', id: 'q-this2', question: 'In §public Pet(String name) { this.name = name; }§ what is the right-hand §name§?',
        choices: ['The field', 'The parameter', 'A static variable', 'Both'], answer: 1, explanation: 'The unqualified name finds the parameter first. this.name is the field.' },
      { type: 'quiz', id: 'q-this3', question: 'Which is a compile-time error?',
        choices: ['Using this in a constructor', 'Using this in an instance method', 'Using this in a static method', 'Returning this'], answer: 2, explanation: 'Static methods run without an object, so there is no current object.' },
      { type: 'predict', id: 'p-this', question: 'What does this program print?',
        code: j`class Pet {
    private String name;
    private int age;

    public Pet(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public boolean sameAge(Pet other) {
        return this.age == other.age;
    }

    public String getName() { return name; }
}

public class Main {
    public static void main(String[] args) {
        Pet a = new Pet("Rex", 3);
        Pet b = new Pet("Bo", 3);
        Pet c = new Pet("Cy", 5);
        System.out.println(a.sameAge(b) + " " + a.sameAge(c));
    }
}
`, answer: 'true false', explanation: 'this is the pet the method was called on (a) and other is the argument.' },
      { type: 'predict', id: 'p-chain', question: 'The methods return this. What is printed?',
        code: j`class Counter {
    private int n = 0;

    public Counter add(int k) {
        n += k;
        return this;
    }

    public int get() { return n; }
}

public class Main {
    public static void main(String[] args) {
        Counter c = new Counter();
        c.add(2).add(3).add(4);
        System.out.println(c.get());
    }
}
`, answer: '9', explanation: 'Each add returns the same object, so the calls chain: 2 + 3 + 4.' },
      { type: 'code', id: 'this-ctor', prompt: 'Rewrite the constructor so its parameters have the **same names** as the fields and use §this§ to set them. Expected: §Mia is 12§.',
        expected: 'Mia is 12',
        starter: j`class Kid {
    private String name;
    private int age;

    public Kid(String n, int a) {
        name = n;
        age = a;
    }

    public String toString() { return name + " is " + age; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new Kid("Mia", 12));
    }
}
`,
        solution: j`class Kid {
    private String name;
    private int age;

    public Kid(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String toString() { return name + " is " + age; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new Kid("Mia", 12));
    }
}
`, hint: 'Rename the parameters to name and age; assign with this.name = name;' },
      { type: 'code', id: 'this-bigger', prompt: 'Write §larger(Box other)§ that returns the **Box** with the bigger volume (return §this§ if they tie). Expected: §Big§.',
        expected: 'Big',
        starter: j`class Box {
    private String label;
    private int volume;

    public Box(String label, int volume) {
        this.label = label;
        this.volume = volume;
    }

    public String getLabel() { return label; }

    // TODO: public Box larger(Box other)
}

public class Main {
    public static void main(String[] args) {
        Box a = new Box("Small", 10);
        Box b = new Box("Big", 40);
        System.out.println(a.larger(b).getLabel());
    }
}
`,
        solution: j`class Box {
    private String label;
    private int volume;

    public Box(String label, int volume) {
        this.label = label;
        this.volume = volume;
    }

    public String getLabel() { return label; }

    public Box larger(Box other) {
        if (other.volume > this.volume) {
            return other;
        }
        return this;
    }
}

public class Main {
    public static void main(String[] args) {
        Box a = new Box("Small", 10);
        Box b = new Box("Big", 40);
        System.out.println(a.larger(b).getLabel());
    }
}
`, hint: 'Compare other.volume with this.volume and return one of the two objects.' },
    ],
  },
  {
    id: '3-10',
    title: 'Ethical and Social Implications of Computing',
    blocks: [
      { type: 'text', md: md`
Software shapes how people learn, shop, travel and vote. Writing programs comes with responsibilities. This topic is about thinking beyond whether the code compiles.

**Benefits and harms.** A single program can help some people and hurt others. A navigation app saves time but may send heavy traffic through a quiet neighborhood. Ask: *who benefits, who might be harmed, and who was not consulted?*

**Privacy and data.** Apps often collect location, contacts or habits. Responsible design collects the minimum necessary, stores it safely, and tells people clearly what is happening. Data that seems harmless alone can identify a person when combined with other data.

**Bias.** Programs learn from or are tested on data written by people. If the data under-represents a group, the program may work poorly for them. A speech tool tested only on one accent will misunderstand others. Diverse testing and diverse teams reduce this.

**The digital divide.** Not everyone has fast internet or a modern device. A service that assumes everyone does leaves people out.

**Intellectual property and licensing.** Code, images and music have owners. Using work without permission can be illegal and unfair. Licenses (such as open-source licenses and Creative Commons) say how work may be reused. Always credit the sources you build on. Copying a classmate's solution as your own is also a breach of academic honesty.

**Security.** Programs that handle passwords or payments must guard them. Never put real secrets in source code that others can see.

**Unintended uses.** A tool built for one purpose may be used for another. Good engineers think about misuse in advance.

**Making it concrete in code.** Class design is where many of these choices happen. A §private§ field protects personal data from careless access. A setter that validates input prevents bad data. A §toString§ that prints a full password would be a design mistake. Even small choices matter.

There is rarely one right answer. On the AP exam you may be asked to identify a legal, ethical, or privacy concern in a scenario; your job is to name the concern and explain who is affected.
` },
      { type: 'quiz', id: 'q-eth1', question: 'A fitness app records users\' exact location every minute and sells it without telling them. The main concern is...',
        choices: ['Run-time efficiency', 'Privacy', 'The digital divide', 'Syntax'], answer: 1, explanation: 'Collecting and sharing personal location data without consent is a privacy issue.' },
      { type: 'quiz', id: 'q-eth2', question: 'A face-recognition tool was trained mostly on photos of one group and works poorly for others. This is an example of...',
        choices: ['Bias in data and testing', 'A compile-time error', 'Open-source licensing', 'Encapsulation'], answer: 0, explanation: 'Unrepresentative training and testing data can make a system unfair.' },
      { type: 'quiz', id: 'q-eth3', question: 'You want to use a program someone posted online with an open-source license in your project. What should you do?',
        choices: ['Remove the author\'s name', 'Follow the license terms and credit the author', 'Assume it is free for any use', 'Sell it as your own'], answer: 1, explanation: 'Licenses define permitted use; crediting sources is part of acting ethically.' },
      { type: 'quiz', id: 'q-eth4', question: 'Which design choice best protects user privacy in a class that stores a user\'s email?',
        choices: ['Making the field public so it is easy to read', 'A private field with no unnecessary getters', 'Printing it in toString for debugging', 'Storing it in a static variable'], answer: 1, explanation: 'Limiting access to personal data reduces accidental exposure.' },
      { type: 'predict', id: 'p-eth', question: 'This class protects a secret with encapsulation. What does the program print?',
        code: j`class Vault {
    private String secret;
    private int attempts = 0;

    public Vault(String secret) { this.secret = secret; }

    public boolean unlock(String guess) {
        attempts++;
        if (attempts > 2) {
            return false;
        }
        return secret.equals(guess);
    }
}

public class Main {
    public static void main(String[] args) {
        Vault v = new Vault("blue");
        System.out.println(v.unlock("red"));
        System.out.println(v.unlock("blue"));
        System.out.println(v.unlock("blue"));
    }
}
`, answer: 'false true false', explanation: 'The third attempt is refused because the vault limits tries, even though the guess is right.' },
      { type: 'code', id: 'eth-mask', prompt: 'Protect privacy in output. Write §mask(String card)§ that returns "****" followed by the last 4 characters. Expected: §****5678§.',
        expected: '****5678',
        starter: j`public class Main {
    // TODO: public static String mask(String card)

    public static void main(String[] args) {
        System.out.println(mask("1234567812345678"));
    }
}
`,
        solution: j`public class Main {
    public static String mask(String card) {
        return "****" + card.substring(card.length() - 4);
    }

    public static void main(String[] args) {
        System.out.println(mask("1234567812345678"));
    }
}
`, hint: 'card.substring(card.length() - 4) gives the last four characters.' },
      { type: 'code', id: 'eth-reflect', prompt: 'Reflection. In a program, print one sentence (any wording) naming a privacy, bias, or intellectual-property concern for an app of your choice. It only needs to run.',
        completeOnRun: true,
        starter: j`public class Main {
    public static void main(String[] args) {
        System.out.println("A concern I would check for in an app: ...");
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        System.out.println("A concern I would check for in an app: privacy of stored location data.");
    }
}
` },
    ],
  },
];
