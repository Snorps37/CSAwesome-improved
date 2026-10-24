import type { Lesson } from './types';
import { md } from './md';

const j = String.raw;

// Unit 3 lessons 3.1-3.5. Original wording.
export const unit3a: Lesson[] = [
  {
    id: '3-1',
    title: 'Abstraction and Program Design',
    blocks: [
      { type: 'text', md: md`
Until now you have mostly **used** classes that someone else wrote (§String§, §Math§, §Scanner§). In this unit you become the author. Before writing any class, you need to decide *what* classes a program needs. That is **program design**.

**Abstraction** means hiding details that do not matter right now and keeping only what does. When you drive a car you use the steering wheel and pedals. You do not think about fuel injection. The wheel and pedals are the *interface*; the engine is a hidden detail.

In Java a class is an abstraction. A §Student§ class might hold a name and a grade level, and offer actions such as "advance to the next grade". Code that uses §Student§ does not need to know how the name is stored.

Two helpful ideas:

- **Procedural abstraction**: a method gives a name to a block of steps. You call §Math.sqrt(25)§ without knowing how the square root is computed. You only need to know *what* it does (its specification), not *how*.
- **Data abstraction**: a class groups related data and behavior into one named idea.

**Choosing classes.** Look at the description of a program and underline the nouns. Each important noun is a candidate class (§Book§, §Library§, §Member§). Verbs suggest methods (§checkOut§, §returnBook§). The facts a noun remembers are its **attributes** (instance variables).

| Noun | Attributes (data) | Behaviors (methods) |
|---|---|---|
| Book | title, author, checked out? | checkOut, giveBack |
| Pet | name, hunger level | feed, play |

A class with the same kind of data and behavior can be used to create many **objects**. §Book§ is the blueprint; one particular book on your shelf is an object.

**Program requirements and specifications.** A *requirement* says what a program must do. A *specification* is a precise description of what a method does (inputs, result, side effects). Good design starts by writing them down; code comes second.

Here is the idea in running code. A class hides how it keeps its data, and the program only uses its methods:

§§§java
class Counter {
    private int count;
    public void click() { count++; }
    public int getCount() { return count; }
}
§§§
` },
      { type: 'quiz', id: 'q-abs', question: 'Which statement best describes **abstraction**?',
        choices: ['Writing code with no comments', 'Hiding unneeded details and exposing only what a user of the code needs', 'Making every variable public', 'Copying code to many places'], answer: 1,
        explanation: 'Abstraction keeps the essential idea and hides the rest, so you can use something without knowing how it works inside.' },
      { type: 'quiz', id: 'q-nouns', question: 'A program tracks songs in a playlist. Which is the best candidate for a **class**?',
        choices: ['play', 'Song', 'skipToNext', '3'], answer: 1, explanation: 'Important nouns become classes. Verbs like play and skipToNext are likely methods.' },
      { type: 'quiz', id: 'q-spec', question: 'You call §Math.pow(2, 3)§ without knowing how it is implemented. This is an example of...',
        choices: ['Procedural abstraction', 'A syntax error', 'Inheritance', 'Overloading'], answer: 0, explanation: 'You rely on what the method does (its specification), not how it does it.' },
      { type: 'predict', id: 'p-counter', question: 'This program uses a small class. What does it print?',
        code: j`class Counter {
    private int count;
    public void click() { count++; }
    public int getCount() { return count; }
}

public class Main {
    public static void main(String[] args) {
        Counter a = new Counter();
        Counter b = new Counter();
        a.click();
        a.click();
        b.click();
        System.out.println(a.getCount() + " " + b.getCount());
    }
}
`, answer: '2 1', explanation: 'Each object has its own count. a was clicked twice and b once.' },
      { type: 'code', id: 'abs-use', prompt: 'The §Greeter§ class is finished and hides how the greeting is built. You only use it: create a §Greeter§ for "Ada" and print the result of §greet()§. Expected: §Hello, Ada!§.',
        expected: 'Hello, Ada!',
        starter: j`class Greeter {
    private String name;
    public Greeter(String n) { name = n; }
    public String greet() { return "Hello, " + name + "!"; }
}

public class Main {
    public static void main(String[] args) {
        // TODO: create a Greeter for "Ada" and print its greeting
    }
}
`,
        solution: j`class Greeter {
    private String name;
    public Greeter(String n) { name = n; }
    public String greet() { return "Hello, " + name + "!"; }
}

public class Main {
    public static void main(String[] args) {
        Greeter g = new Greeter("Ada");
        System.out.println(g.greet());
    }
}
`, hint: 'Greeter g = new Greeter("Ada"); then call g.greet().' },
      { type: 'text', md: md`
**Design practice.** Pick a small real-world thing and fill in the table yourself: a *Rectangle* has a width and a height (attributes) and can report its area (a behavior). Next lesson looks at how design choices affect people and programs.
` },
      { type: 'code', id: 'abs-design', prompt: 'A §Rectangle§ class was designed with attributes §width§ and §height§ and a §getArea()§ method. Fill in the method body, then run. Expected: §Area: 12§.',
        expected: 'Area: 12',
        starter: j`class Rectangle {
    private int width;
    private int height;
    public Rectangle(int w, int h) { width = w; height = h; }
    public int getArea() {
        // TODO
        return 0;
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle r = new Rectangle(3, 4);
        System.out.println("Area: " + r.getArea());
    }
}
`,
        solution: j`class Rectangle {
    private int width;
    private int height;
    public Rectangle(int w, int h) { width = w; height = h; }
    public int getArea() {
        return width * height;
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle r = new Rectangle(3, 4);
        System.out.println("Area: " + r.getArea());
    }
}
`, hint: 'Area is width times height.' },
    ],
  },
  {
    id: '3-2',
    title: 'Impact of Program Design',
    blocks: [
      { type: 'text', md: md`
A program is more than code that runs. The way it is designed affects the people who use it, the people who maintain it, and society.

**System reliability.** A *reliable* system works correctly under expected conditions and fails safely under unexpected ones. Reliability comes from careful design, thorough **testing** with many kinds of input (typical values, boundary values such as 0 or the largest allowed number, and invalid values), and honest handling of mistakes. A program that crashes on an empty name is not reliable.

**Legal and ethical impact.** Programs may collect data, make decisions about people, or use someone else's work. Programmers must think about:

- **Privacy**: collecting only what is needed and protecting it.
- **Bias**: a design that works well for some users and poorly for others (for example, a form that does not accept names with apostrophes).
- **Intellectual property**: respecting licenses and giving credit. Open-source code can often be reused under its license's terms.
- **Accessibility**: can people with different abilities use the program?

**Side effects of design.** A well-designed class has a small, clear interface. If other code reaches into your data directly, then changing how the data is stored breaks everything that depended on it. Hiding data (**encapsulation**, next lessons) makes programs easier to change and less likely to be misused.

**Documentation and comments.** A good *precondition* states what must be true before a method is called (for example "§amount§ is positive"). A *postcondition* states what is true afterward. Comments record these so other programmers (and future you) can trust the method.

§§§java
/** Returns the average of the two scores.
 *  Precondition: count > 0
 *  Postcondition: the returned value is total divided by count */
public double average(int total, int count) {
    return (double) total / count;
}
§§§

If someone calls this with §count§ equal to 0 the precondition is broken, and the caller, not the method, is at fault.
` },
      { type: 'quiz', id: 'q-pre', question: 'A **precondition** is...',
        choices: ['What must be true before a method is called', 'What is true after a method finishes', 'A compile-time error', 'A kind of loop'], answer: 0,
        explanation: 'Preconditions describe what the caller must guarantee; postconditions describe what the method guarantees in return.' },
      { type: 'quiz', id: 'q-bias', question: 'A sign-up form rejects any last name that contains a space or hyphen. This is mainly a problem of...',
        choices: ['Run-time speed', 'Design that does not work well for all users', 'Memory usage', 'Using too many classes'], answer: 1,
        explanation: 'Design assumptions can exclude real users. Testing with varied, realistic input helps catch this.' },
      { type: 'quiz', id: 'q-test', question: 'Which set of test inputs for a method that accepts ages 0 to 120 is **best**?',
        choices: ['25, 26, 27', '0, 25, 120', '25, 25, 25', '-1, -2, -3'], answer: 1,
        explanation: 'Boundary values (0 and 120) plus a typical value test the range far better than three similar numbers.' },
      { type: 'predict', id: 'p-avg', question: 'What does this program print?',
        code: j`public class Main {
    /** Precondition: count > 0 */
    public static double average(int total, int count) {
        return (double) total / count;
    }

    public static void main(String[] args) {
        System.out.println(average(7, 2));
        System.out.println(7 / 2);
    }
}
`, answer: '3.5 3', explanation: 'The cast makes the first division a double (3.5). The second is integer division (3).' },
      { type: 'code', id: 'imp-safe', prompt: 'Make this method safer: if §count§ is 0 (the precondition is broken), return 0.0 instead of crashing or producing NaN. The program should print §0.0§ then §2.5§.',
        expected: '0.0\n2.5',
        starter: j`public class Main {
    public static double average(int total, int count) {
        // TODO: guard against count == 0
        return (double) total / count;
    }

    public static void main(String[] args) {
        System.out.println(average(5, 0));
        System.out.println(average(5, 2));
    }
}
`,
        solution: j`public class Main {
    public static double average(int total, int count) {
        if (count == 0) {
            return 0.0;
        }
        return (double) total / count;
    }

    public static void main(String[] args) {
        System.out.println(average(5, 0));
        System.out.println(average(5, 2));
    }
}
`, hint: 'Add an if statement at the top that returns 0.0 when count is 0.' },
      { type: 'code', id: 'imp-test', prompt: 'Write a tiny test harness. The method §isTeen(age)§ is done. In §main§ print §isTeen§ for the ages 12, 13, 19 and 20 (one per line) to check the boundaries. Expected output: §false true true false§ on separate lines.',
        expected: 'false\ntrue\ntrue\nfalse',
        starter: j`public class Main {
    public static boolean isTeen(int age) {
        return age >= 13 && age <= 19;
    }

    public static void main(String[] args) {
        // TODO: print isTeen for 12, 13, 19, 20
    }
}
`,
        solution: j`public class Main {
    public static boolean isTeen(int age) {
        return age >= 13 && age <= 19;
    }

    public static void main(String[] args) {
        System.out.println(isTeen(12));
        System.out.println(isTeen(13));
        System.out.println(isTeen(19));
        System.out.println(isTeen(20));
    }
}
`, hint: 'Four println calls, each passing one age to isTeen.' },
    ],
  },
  {
    id: '3-3',
    title: 'Anatomy of a Class',
    blocks: [
      { type: 'text', md: md`
A **class** is a blueprint for objects. It has three main kinds of members:

1. **Instance variables** (fields): the data each object remembers.
2. **Constructors**: special code that sets up a new object.
3. **Methods**: the behaviors an object can perform.

§§§java
public class Dog {
    // instance variables
    private String name;
    private int age;

    // constructor
    public Dog(String dogName, int dogAge) {
        name = dogName;
        age = dogAge;
    }

    // method
    public String describe() {
        return name + " is " + age;
    }
}
§§§

**Access modifiers.** §public§ means code anywhere may use it. §private§ means only code inside the same class may use it. The AP convention is: **instance variables are private; constructors and the methods you want others to call are public**. This protects the data. That idea is called **encapsulation**.

**Each object has its own copies** of the instance variables. Two §Dog§ objects each hold their own §name§ and §age§.

**Using the class.** A class with the name §Dog§ is just a type. You make an object with §new§ and call methods with the dot operator:

§§§java
Dog d = new Dog("Rex", 4);
System.out.println(d.describe());   // Rex is 4
§§§

Trying §d.name§ from outside the class is a compile error because §name§ is private.

**Files and classes.** Only one class in a file may be §public§, and a public class must have the same name as the file. In this app's editor, a helper class goes in the *same* file as §Main§ without the word §public§ (as the examples here do). Each class describes one idea; keep §main§ in a separate class from the one you are designing.

**Instance variable defaults.** If a constructor does not set a field, Java gives it a default: §0§ for §int§, §0.0§ for §double§, §false§ for §boolean§ and §null§ for any object type such as §String§.
` },
      { type: 'quiz', id: 'q-priv', question: 'Why are instance variables normally declared §private§?',
        choices: ['So the program runs faster', 'So only the class\'s own methods can change the data directly', 'Because Java requires it', 'So they cannot be used at all'], answer: 1,
        explanation: 'Encapsulation: outside code must go through public methods, so the class stays in control of its own data.' },
      { type: 'quiz', id: 'q-parts', question: 'In §private int age;§ inside a class, what is it?',
        choices: ['A constructor', 'A method', 'An instance variable', 'A local variable'], answer: 2, explanation: 'A variable declared in the class but outside any method or constructor is an instance variable.' },
      { type: 'quiz', id: 'q-def', question: 'What is the default value of an uninitialized §String§ instance variable?',
        choices: ['""', 'null', '0', 'false'], answer: 1, explanation: 'Object references default to null; the empty string is a real object and is not the default.' },
      { type: 'predict', id: 'p-dog', question: 'What does this program print?',
        code: j`class Dog {
    private String name;
    private int age;

    public Dog(String dogName, int dogAge) {
        name = dogName;
        age = dogAge;
    }

    public String describe() {
        return name + " is " + age;
    }
}

public class Main {
    public static void main(String[] args) {
        Dog a = new Dog("Rex", 4);
        Dog b = new Dog("Bo", 9);
        System.out.println(a.describe());
        System.out.println(b.describe());
    }
}
`, answer: 'Rex is 4 Bo is 9', explanation: 'Each Dog keeps its own name and age.' },
      { type: 'predict', id: 'p-defaults', question: 'The constructor sets nothing. What does this print?',
        code: j`class Box {
    private int size;
    private double weight;
    private boolean full;
    private String label;

    public String show() {
        return size + " " + weight + " " + full + " " + label;
    }
}

public class Main {
    public static void main(String[] args) {
        Box b = new Box();
        System.out.println(b.show());
    }
}
`, answer: '0 0.0 false null', explanation: 'With no constructor written, Java supplies one that leaves every field at its default value.' },
      { type: 'code', id: 'anat-book', prompt: 'Finish the §Book§ class: add private fields §title§ (String) and §pages§ (int), a constructor that sets both, and a method §info()§ that returns the title, a space, then the pages like §Dune 412§. Main is done.',
        expected: 'Dune 412',
        starter: j`class Book {
    // TODO: fields, constructor, info()
}

public class Main {
    public static void main(String[] args) {
        Book b = new Book("Dune", 412);
        System.out.println(b.info());
    }
}
`,
        solution: j`class Book {
    private String title;
    private int pages;

    public Book(String t, int p) {
        title = t;
        pages = p;
    }

    public String info() {
        return title + " " + pages;
    }
}

public class Main {
    public static void main(String[] args) {
        Book b = new Book("Dune", 412);
        System.out.println(b.info());
    }
}
`, hint: 'Constructor parameters (String, int) in that order; info() returns title + " " + pages.' },
      { type: 'code', id: 'anat-two', prompt: 'Create a second §Book§-like object. Using the finished §Pet§ class, make two pets (Milo is 3, Zoe is 5) and print the **sum of their ages** with the label §Total age: 8§.',
        expected: 'Total age: 8',
        starter: j`class Pet {
    private String name;
    private int age;
    public Pet(String n, int a) { name = n; age = a; }
    public int getAge() { return age; }
}

public class Main {
    public static void main(String[] args) {
        // TODO
    }
}
`,
        solution: j`class Pet {
    private String name;
    private int age;
    public Pet(String n, int a) { name = n; age = a; }
    public int getAge() { return age; }
}

public class Main {
    public static void main(String[] args) {
        Pet p1 = new Pet("Milo", 3);
        Pet p2 = new Pet("Zoe", 5);
        System.out.println("Total age: " + (p1.getAge() + p2.getAge()));
    }
}
`, hint: 'Parenthesize the sum so it is added before being joined to the text.' },
    ],
  },
  {
    id: '3-4',
    title: 'Constructors',
    blocks: [
      { type: 'text', md: md`
A **constructor** runs when you create an object with §new§. Its job is to give the instance variables their starting values.

Rules for constructors:

- The name is **exactly the class name**.
- It has **no return type** (not even §void§).
- It is normally §public§.
- Its parameters supply the starting data.

§§§java
public class Player {
    private String name;
    private int score;

    public Player(String playerName) {      // one parameter
        name = playerName;
        score = 0;
    }

    public Player(String playerName, int startScore) {   // another constructor
        name = playerName;
        score = startScore;
    }
}
§§§

A class can have **several constructors** as long as their parameter lists differ in number or types. This is **overloading**. Java picks the one that matches the arguments in the §new§ call:

§§§java
Player a = new Player("Kai");        // score 0
Player b = new Player("Mei", 50);    // score 50
§§§

**Default constructor.** If you write *no* constructor, Java supplies one with no parameters that leaves fields at their defaults. The moment you write any constructor, Java no longer supplies that one, so §new Player()§ would fail unless you also write a no-argument constructor.

**Parameters vs. instance variables.** A parameter is a *local* variable that exists only while the constructor runs. Use it to copy data into the fields. If a parameter has the same name as a field, the parameter hides the field. Lesson 3.9 shows how §this§ solves that.

**Reference parameters.** When a constructor receives an object (such as a §String§ or another object), it receives a copy of the *reference*. Both names then point at the same object.

A good constructor leaves the object in a valid state, so no method ever sees a half-built object.
` },
      { type: 'quiz', id: 'q-ctor', question: 'Which is a valid constructor for class §Car§?',
        choices: ['public void Car() { }', 'public Car() { }', 'public car() { }', 'public int Car() { return 0; }'], answer: 1,
        explanation: 'A constructor has the exact class name (case-sensitive) and no return type. Adding void makes it an ordinary method.' },
      { type: 'quiz', id: 'q-over', question: 'A class has constructors §Player(String)§ and §Player(String, int)§. What is it called when a class has several constructors like this?',
        choices: ['Inheritance', 'Overloading', 'Encapsulation', 'Overriding'], answer: 1, explanation: 'Same name, different parameter lists: overloading.' },
      { type: 'quiz', id: 'q-nodef', question: 'A class only declares §public Player(String n)§. What happens with §new Player()§?',
        choices: ['It works and name is null', 'It is a compile-time error', 'It prints null', 'It works and name is ""'], answer: 1,
        explanation: 'Once you write any constructor, Java no longer supplies the no-argument one.' },
      { type: 'predict', id: 'p-ctor', question: 'What does this program print?',
        code: j`class Player {
    private String name;
    private int score;

    public Player(String n) {
        name = n;
        score = 10;
    }

    public Player(String n, int s) {
        name = n;
        score = s;
    }

    public String toString() {
        return name + ":" + score;
    }
}

public class Main {
    public static void main(String[] args) {
        Player a = new Player("Kai");
        Player b = new Player("Mei", 50);
        System.out.println(a);
        System.out.println(b);
    }
}
`, answer: 'Kai:10 Mei:50', explanation: 'The one-argument call uses the first constructor (score 10); the two-argument call uses the second.' },
      { type: 'predict', id: 'p-alias', question: 'Two variables refer to the same object. What is printed?',
        code: j`class Cell {
    private int value;
    public Cell(int v) { value = v; }
    public void bump() { value++; }
    public int get() { return value; }
}

public class Main {
    public static void main(String[] args) {
        Cell a = new Cell(5);
        Cell b = a;
        b.bump();
        b.bump();
        System.out.println(a.get());
    }
}
`, answer: '7', explanation: 'b = a copies the reference, not the object. Both change the same Cell, so a.get() is 7.' },
      { type: 'code', id: 'ctor-write', prompt: 'Write **two** constructors for §Rectangle§: one taking width and height, and a one-argument constructor that makes a square. Main should print §12 and 25§ on one line (the areas).',
        expected: '12 25',
        starter: j`class Rectangle {
    private int width;
    private int height;

    // TODO: constructor (int w, int h)
    // TODO: constructor (int side) -> a square

    public int area() { return width * height; }
}

public class Main {
    public static void main(String[] args) {
        Rectangle r = new Rectangle(3, 4);
        Rectangle s = new Rectangle(5);
        System.out.println(r.area() + " " + s.area());
    }
}
`,
        solution: j`class Rectangle {
    private int width;
    private int height;

    public Rectangle(int w, int h) {
        width = w;
        height = h;
    }

    public Rectangle(int side) {
        width = side;
        height = side;
    }

    public int area() { return width * height; }
}

public class Main {
    public static void main(String[] args) {
        Rectangle r = new Rectangle(3, 4);
        Rectangle s = new Rectangle(5);
        System.out.println(r.area() + " " + s.area());
    }
}
`, hint: 'The square constructor sets both fields from its single parameter.' },
      { type: 'code', id: 'ctor-fix', prompt: 'This constructor has a bug: it declares a **new local variable** instead of setting the field, so the field stays 0. Fix it so the program prints §Level 3§.',
        expected: 'Level 3',
        starter: j`class Game {
    private int level;

    public Game(int start) {
        int level = start;
    }

    public String show() { return "Level " + level; }
}

public class Main {
    public static void main(String[] args) {
        Game g = new Game(3);
        System.out.println(g.show());
    }
}
`,
        solution: j`class Game {
    private int level;

    public Game(int start) {
        level = start;
    }

    public String show() { return "Level " + level; }
}

public class Main {
    public static void main(String[] args) {
        Game g = new Game(3);
        System.out.println(g.show());
    }
}
`, hint: 'Remove the word int in front of level inside the constructor.' },
    ],
  },
  {
    id: '3-5',
    title: 'Methods: Pass by Value',
    blocks: [
      { type: 'text', md: md`
A **method** is a named block of code that performs a task. Its **header** shows:

§§§java
public int add(int a, int b)
//  ^access ^return type ^name ^parameters
§§§

- A **void** method does something but returns nothing.
- A method with a return type must end with a §return§ of a matching value. The §return§ ends the method immediately.
- **Parameters** are the variables in the header. **Arguments** are the values you pass in the call. Arguments are matched to parameters by *position*, and their types must be compatible.

**Pass by value.** Java gives the method a *copy* of each argument.

- For **primitive** types (§int§, §double§, §boolean§), the copy is the value. Changing the parameter inside the method does *not* change the caller's variable.
- For **object** types, the copy is of the **reference**. The method can use it to change the *object's* contents (if the class offers a way), but reassigning the parameter to a different object does not change the caller's variable.

§§§java
public static void reset(int n) { n = 0; }          // caller's int unchanged

public static void rename(Pet p) {
    p.setName("Max");     // changes the shared object: caller sees it
    p = new Pet("Zed");   // only changes the local copy of the reference
}
§§§

**Strings** are immutable, so a method can never change the caller's String; it can only return a new one.

**Methods can call other methods** in the same class, and they can be **overloaded**: same name, different parameter lists (return type alone is not enough to tell them apart).

**Tracing calls.** When a method is called, execution jumps into it, runs until a §return§ or the end, then comes back to where the call was. A returned value replaces the call in the expression.
` },
      { type: 'quiz', id: 'q-pbv', question: 'After this code, what is §x§?\n\n§§§java\nint x = 5;\ndbl(x);   // void dbl(int n) { n = n * 2; }\n§§§',
        choices: ['5', '10', '0', 'Compile error'], answer: 0, explanation: 'Primitives are passed by value. The method doubled its own copy.' },
      { type: 'quiz', id: 'q-ret', question: 'Which method header must contain a §return§ statement that gives back a value?',
        choices: ['public void print()', 'public int size()', 'public Main()', 'public static void main(String[] a)'], answer: 1, explanation: 'Any non-void method has to return a value of its declared type. void methods and constructors do not.' },
      { type: 'quiz', id: 'q-ovl', question: 'Which pair is a valid overload of the same class?',
        choices: ['int f(int a) and double f(int a)', 'int f(int a) and int f(double a)', 'int f(int a) and int f(int b)', 'void f() and void f()'], answer: 1, explanation: 'Overloads need different parameter lists (types or count). Return type or parameter names alone do not count.' },
      { type: 'predict', id: 'p-prim', question: 'What does this program print?',
        code: j`public class Main {
    public static void change(int n) {
        n = n + 100;
        System.out.println("in: " + n);
    }

    public static void main(String[] args) {
        int v = 7;
        change(v);
        System.out.println("out: " + v);
    }
}
`, answer: 'in: 107 out: 7', explanation: 'n is a copy of v. v stays 7.' },
      { type: 'predict', id: 'p-ref', question: 'What does this program print?',
        code: j`class Tag {
    private String text;
    public Tag(String t) { text = t; }
    public void setText(String t) { text = t; }
    public String getText() { return text; }
}

public class Main {
    public static void edit(Tag t) {
        t.setText("edited");
        t = new Tag("new");
        t.setText("lost");
    }

    public static void main(String[] args) {
        Tag a = new Tag("orig");
        edit(a);
        System.out.println(a.getText());
    }
}
`, answer: 'edited', explanation: 'setText changed the shared object. Then t was pointed at a brand-new Tag, which only affected the local copy of the reference.' },
      { type: 'predict', id: 'p-str', question: 'Strings cannot be changed in place. What is printed?',
        code: j`public class Main {
    public static String shout(String s) {
        s = s.toUpperCase();
        return s + "!";
    }

    public static void main(String[] args) {
        String w = "hey";
        String r = shout(w);
        System.out.println(w + " " + r);
    }
}
`, answer: 'hey HEY!', explanation: 'The method works on its own reference; w still refers to "hey". The new string is returned.' },
      { type: 'code', id: 'pbv-method', prompt: 'Write the method §max3§ that returns the largest of three ints. Expected output: §9§.',
        expected: '9',
        starter: j`public class Main {
    // TODO: public static int max3(int a, int b, int c)

    public static void main(String[] args) {
        System.out.println(max3(4, 9, 2));
    }
}
`,
        solution: j`public class Main {
    public static int max3(int a, int b, int c) {
        int m = a;
        if (b > m) {
            m = b;
        }
        if (c > m) {
            m = c;
        }
        return m;
    }

    public static void main(String[] args) {
        System.out.println(max3(4, 9, 2));
    }
}
`, hint: 'Keep a running maximum, or use Math.max(a, Math.max(b, c)).' },
      { type: 'code', id: 'pbv-obj', prompt: 'A method receives a §Counter§ and should add 3 to it using §add()§. Because objects share a reference, the caller sees the change. Complete §addThree§. Expected: §Count: 3§.',
        expected: 'Count: 3',
        starter: j`class Counter {
    private int n;
    public void add(int k) { n += k; }
    public int get() { return n; }
}

public class Main {
    public static void addThree(Counter c) {
        // TODO
    }

    public static void main(String[] args) {
        Counter c = new Counter();
        addThree(c);
        System.out.println("Count: " + c.get());
    }
}
`,
        solution: j`class Counter {
    private int n;
    public void add(int k) { n += k; }
    public int get() { return n; }
}

public class Main {
    public static void addThree(Counter c) {
        c.add(3);
    }

    public static void main(String[] args) {
        Counter c = new Counter();
        addThree(c);
        System.out.println("Count: " + c.get());
    }
}
`, hint: 'Call c.add(3).' },
      { type: 'code', id: 'pbv-overload', prompt: 'Add an **overloaded** version of §area§ that takes one §double§ radius and returns the area of a circle using §3.0 * r * r§ (a rough pi of 3). Expected: §12 and 12.0§ on one line.',
        expected: '12 and 12.0',
        starter: j`public class Main {
    public static int area(int w, int h) {
        return w * h;
    }

    // TODO: overload area(double r)

    public static void main(String[] args) {
        System.out.println(area(3, 4) + " and " + area(2.0));
    }
}
`,
        solution: j`public class Main {
    public static int area(int w, int h) {
        return w * h;
    }

    public static double area(double r) {
        return 3.0 * r * r;
    }

    public static void main(String[] args) {
        System.out.println(area(3, 4) + " and " + area(2.0));
    }
}
`, hint: 'public static double area(double r) { return 3.0 * r * r; }' },
    ],
  },
];
