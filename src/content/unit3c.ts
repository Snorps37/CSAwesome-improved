import type { Lesson } from './types';
import { md } from './md';

const j = String.raw;

// Unit 3 wrap-up: summary, coding practice, multiple choice, practice test, FRQ, projects. Original wording.
export const unit3c: Lesson[] = [
  {
    id: '3-11',
    title: 'Unit 3 Summary',
    blocks: [
      { type: 'text', md: md`
**Designing classes**

- Abstraction hides details and exposes a simple interface. Pick classes from the nouns in a problem and methods from the verbs.
- Preconditions say what a caller must guarantee; postconditions say what the method guarantees. Test with typical, boundary and invalid values.
- Think about privacy, bias, licensing and who is affected by your design.

**Parts of a class**

- **Instance variables** are private; each object has its own copy. Defaults: 0, 0.0, false, null.
- **Constructors** share the class name, have no return type, and set up the object. They can be overloaded. If you write none, Java supplies a no-argument one.
- **Methods** are public when others should call them. Non-void methods must return a matching value.

**Passing data**

- Java passes copies. Primitives: the value is copied. Objects: the reference is copied, so a method can change the shared object but cannot make the caller's variable refer to a different one.

**Accessors, mutators, toString**

- Getters return state; setters change it (and can validate). §toString§ lets §println§ show an object.

**static**

- One copy per class. Static methods have no §this§ and cannot touch instance members directly. Constants are §public static final§.

**Scope**

- Locals live in their block; instance variables live with the object. A local with the same name as a field *shadows* it. Use §this.field§ to reach the field.

**this**

- A reference to the current object. It disambiguates names, can be passed along, and can be returned for chaining.

| Concept | Keyword / form |
|---|---|
| Create an object | §new ClassName(args)§ |
| Constructor header | §public ClassName(params)§ |
| Shared by class | §static§ |
| Cannot be reassigned | §final§ |
| Current object | §this§ |
` },
      { type: 'quiz', id: 'q-sum1', question: 'Which statement about constructors is **false**?',
        choices: ['They have the same name as the class', 'They may be overloaded', 'They must declare a return type of void', 'They run when new is used'], answer: 2, explanation: 'Constructors have no return type at all.' },
      { type: 'quiz', id: 'q-sum2', question: 'An instance method can use a static variable, but a static method cannot directly use an instance variable. Why?',
        choices: ['Static variables are public', 'A static method has no current object', 'Instance variables are final', 'It is only a style rule'], answer: 1, explanation: 'Static methods are called on the class, so there is no object whose fields could be read.' },
      { type: 'predict', id: 'p-sum', question: 'Pull the unit together. What does this program print?',
        code: j`class Item {
    private static int made = 0;
    private String name;
    private int qty;

    public Item(String name, int qty) {
        this.name = name;
        this.qty = qty;
        made++;
    }

    public void use(int n) {
        if (n > 0 && n <= qty) {
            qty -= n;
        }
    }

    public String toString() { return name + "x" + qty; }
    public static int getMade() { return made; }
}

public class Main {
    public static void main(String[] args) {
        Item a = new Item("pen", 5);
        Item b = new Item("cap", 2);
        a.use(3);
        b.use(9);
        System.out.println(a + " " + b + " " + Item.getMade());
    }
}
`, answer: 'penx2 capx2 2', explanation: 'a uses 3 of 5 (2 left). b tries 9 of 2, which the guard rejects. Two items were made.' },
    ],
  },
  {
    id: '3-12',
    title: 'Coding Practice',
    blocks: [
      { type: 'text', md: md`
Time to write whole classes. Each exercise below gives you part of a program. Take the same approach each time: decide the **fields**, write the **constructor**, then the **methods**, and finally run the test code in §main§.
` },
      { type: 'code', id: 'cp-student', prompt: 'Write a complete §Student§ class with private §name§ and §gpa§ (double), a constructor, getters §getName()§ and §getGpa()§, and §isHonors()§ that is true when gpa is at least 3.5. Expected: §Lee honors: true§ then §Sam honors: false§.',
        expected: 'Lee honors: true\nSam honors: false',
        starter: j`// TODO: write class Student

public class Main {
    public static void main(String[] args) {
        Student a = new Student("Lee", 3.8);
        Student b = new Student("Sam", 3.1);
        System.out.println(a.getName() + " honors: " + a.isHonors());
        System.out.println(b.getName() + " honors: " + b.isHonors());
    }
}
`,
        solution: j`class Student {
    private String name;
    private double gpa;

    public Student(String name, double gpa) {
        this.name = name;
        this.gpa = gpa;
    }

    public String getName() { return name; }
    public double getGpa() { return gpa; }
    public boolean isHonors() { return gpa >= 3.5; }
}

public class Main {
    public static void main(String[] args) {
        Student a = new Student("Lee", 3.8);
        Student b = new Student("Sam", 3.1);
        System.out.println(a.getName() + " honors: " + a.isHonors());
        System.out.println(b.getName() + " honors: " + b.isHonors());
    }
}
`, hint: 'Remember: private fields, public constructor and methods.' },
      { type: 'code', id: 'cp-counter', prompt: 'Write §ClickCounter§ with a private count, §click()§, §reset()§ and §getCount()§. The test clicks 3 times, resets, and clicks once. Expected: §3§ then §1§.',
        expected: '3\n1',
        starter: j`// TODO: write class ClickCounter

public class Main {
    public static void main(String[] args) {
        ClickCounter c = new ClickCounter();
        c.click();
        c.click();
        c.click();
        System.out.println(c.getCount());
        c.reset();
        c.click();
        System.out.println(c.getCount());
    }
}
`,
        solution: j`class ClickCounter {
    private int count;
    public void click() { count++; }
    public void reset() { count = 0; }
    public int getCount() { return count; }
}

public class Main {
    public static void main(String[] args) {
        ClickCounter c = new ClickCounter();
        c.click();
        c.click();
        c.click();
        System.out.println(c.getCount());
        c.reset();
        c.click();
        System.out.println(c.getCount());
    }
}
`, hint: 'No constructor is needed; fields default to 0.' },
      { type: 'code', id: 'cp-temp', prompt: 'Write §Thermometer§ that stores degrees Celsius (double). Provide a constructor, §getCelsius()§ and §getFahrenheit()§ (c * 9 / 5 + 32). Expected: §100.0 C = 212.0 F§.',
        expected: '100.0 C = 212.0 F',
        starter: j`// TODO: write class Thermometer

public class Main {
    public static void main(String[] args) {
        Thermometer t = new Thermometer(100.0);
        System.out.println(t.getCelsius() + " C = " + t.getFahrenheit() + " F");
    }
}
`,
        solution: j`class Thermometer {
    private double celsius;
    public Thermometer(double celsius) { this.celsius = celsius; }
    public double getCelsius() { return celsius; }
    public double getFahrenheit() { return celsius * 9 / 5 + 32; }
}

public class Main {
    public static void main(String[] args) {
        Thermometer t = new Thermometer(100.0);
        System.out.println(t.getCelsius() + " C = " + t.getFahrenheit() + " F");
    }
}
`, hint: 'celsius * 9 / 5 + 32 with a double stays a double.' },
      { type: 'code', id: 'cp-id', prompt: 'Write §Member§ whose constructor assigns each member a unique id from a **static** counter starting at 1. Add §getId()§. Expected: §1 2 3§.',
        expected: '1 2 3',
        starter: j`// TODO: write class Member

public class Main {
    public static void main(String[] args) {
        Member a = new Member();
        Member b = new Member();
        Member c = new Member();
        System.out.println(a.getId() + " " + b.getId() + " " + c.getId());
    }
}
`,
        solution: j`class Member {
    private static int next = 1;
    private int id;

    public Member() {
        id = next;
        next++;
    }

    public int getId() { return id; }
}

public class Main {
    public static void main(String[] args) {
        Member a = new Member();
        Member b = new Member();
        Member c = new Member();
        System.out.println(a.getId() + " " + b.getId() + " " + c.getId());
    }
}
`, hint: 'private static int next = 1; id = next++ works too.' },
    ],
  },
  {
    id: '3-13',
    title: 'Multiple Choice Practice',
    blocks: [
      { type: 'text', md: md`Ten questions in the style of the AP exam. Think each one through before choosing.` },
      { type: 'quiz', id: 'mc1', question: 'Which best describes the purpose of a constructor?',
        choices: ['To compute values for the user', 'To initialize the instance variables of a new object', 'To delete an object', 'To define a constant'], answer: 1, explanation: 'Constructors set the initial state of a new object.' },
      { type: 'quiz', id: 'mc2', question: 'Given\n\n§§§java\npublic class A {\n    private int x;\n    public A(int x) { x = x; }\n    public int getX() { return x; }\n}\n§§§\n\nwhat does §new A(5).getX()§ return?',
        choices: ['5', '0', 'null', 'Compile error'], answer: 1, explanation: 'x = x assigns the parameter to itself. The field keeps its default 0. (this.x = x would fix it.)' },
      { type: 'quiz', id: 'mc3', question: 'Which declaration makes a variable shared by every object of a class and impossible to change?',
        choices: ['private int v;', 'static int v;', 'public static final int V = 3;', 'final int V;'], answer: 2, explanation: 'static gives one shared copy; final prevents reassignment.' },
      { type: 'quiz', id: 'mc4', question: 'A class has §private int n;§. Which is a legal call from §main§ in another class, with §A a = new A();§?',
        choices: ['a.n = 3;', 'a.setN(3); (a public method)', 'A.n = 3;', 'n = 3;'], answer: 1, explanation: 'Private fields can only be changed through public methods of the class.' },
      { type: 'quiz', id: 'mc5', question: 'What is printed?\n\n§§§java\nint a = 4;\nint b = twice(a);\nSystem.out.println(a + " " + b);\n// public static int twice(int n) { n = n * 2; return n; }\n§§§',
        choices: ['4 4', '8 8', '4 8', '8 4'], answer: 2, explanation: 'a is copied into n. a stays 4; the method returns 8.' },
      { type: 'quiz', id: 'mc6', question: 'Which pair of method headers can both appear in one class?',
        choices: ['void go(int a) and int go(int a)', 'void go(int a) and void go(double a)', 'void go(int a) and void go(int b)', 'int go() and int go()'], answer: 1, explanation: 'Overloads must differ in parameter types or count.' },
      { type: 'quiz', id: 'mc7', question: 'In a static method, which is NOT allowed?',
        choices: ['Calling another static method', 'Declaring a local variable', 'Using this', 'Creating a new object'], answer: 2, explanation: 'There is no current object in a static method.' },
      { type: 'quiz', id: 'mc8', question: 'Which is the best reason to write a setter rather than make a field public?',
        choices: ['The setter can enforce rules about valid values', 'Setters are faster', 'Public fields cannot be read', 'It saves memory'], answer: 0, explanation: 'Encapsulation lets the class control and validate every change.' },
      { type: 'quiz', id: 'mc9', question: 'What does §Counter c = new Counter(); Counter d = c; d.inc();§ do (§inc§ increments an instance variable)?',
        choices: ['Increments only d\'s copy', 'Increments the one shared object, so c sees it too', 'Creates a third Counter', 'Compile error'], answer: 1, explanation: 'd = c copies the reference. Both variables refer to the same object.' },
      { type: 'quiz', id: 'mc10', question: 'Which variable is out of scope at the §println§?\n\n§§§java\npublic void f(int p) {\n    int q = 1;\n    for (int r = 0; r < p; r++) {\n        q += r;\n    }\n    System.out.println(q);\n}\n§§§',
        choices: ['p', 'q', 'r', 'none: all are in scope'], answer: 2, explanation: 'r exists only inside the loop.' },
    ],
  },
  {
    id: '3-14',
    title: 'Practice Test',
    blocks: [
      { type: 'text', md: md`A mixed set: read code, trace it, and predict results. Work without running the code first.` },
      { type: 'quiz', id: 'pt1', question: 'Which line correctly creates an object of a class §Lamp§ whose only constructor is §public Lamp(boolean on)§?',
        choices: ['Lamp l = new Lamp();', 'Lamp l = new Lamp(true);', 'Lamp l = Lamp(true);', 'new l = Lamp(true);'], answer: 1, explanation: 'new, the class name, and arguments matching the constructor parameters.' },
      { type: 'quiz', id: 'pt2', question: 'A method is declared §public double avg(int a, int b)§. Which call is valid?',
        choices: ['int r = avg(1, 2);', 'double r = avg(1, 2);', 'double r = avg(1.5, 2);', 'double r = avg(1);'], answer: 1, explanation: 'int arguments match; assigning the double result to a double is fine. A double result cannot go in an int without a cast.' },
      { type: 'quiz', id: 'pt3', question: 'Which statement about §private§ is true?',
        choices: ['Private methods can be called from any class', 'Private members are accessible inside the declaring class, including on other objects of that class', 'Private variables cannot be changed', 'Private applies only to static members'], answer: 1, explanation: 'Access is by class, not by object.' },
      { type: 'quiz', id: 'pt4', question: 'A class with no written constructor is used with §new Thing()§. What happens?',
        choices: ['Compile error', 'Works: Java supplies a default constructor', 'Run-time error', 'Fields become null'], answer: 1, explanation: 'The default no-argument constructor exists only if you write no constructors.' },
      { type: 'predict', id: 'pt5', question: 'What does this program print?',
        code: j`class Acc {
    private int total;
    public Acc(int start) { total = start; }
    public void add(int n) { total += n; }
    public int get() { return total; }
}

public class Main {
    public static void bump(Acc a, int n) {
        a.add(n);
        n = 0;
    }

    public static void main(String[] args) {
        Acc x = new Acc(10);
        int k = 5;
        bump(x, k);
        bump(x, k);
        System.out.println(x.get() + " " + k);
    }
}
`, answer: '20 5', explanation: 'The object changes by 5 twice (10 + 5 + 5). The int k is only copied, so it stays 5.' },
      { type: 'predict', id: 'pt6', question: 'What does this program print?',
        code: j`class Seq {
    private static int calls = 0;
    private int val;

    public Seq(int val) { this.val = val; }

    public int next() {
        calls++;
        val += calls;
        return val;
    }
}

public class Main {
    public static void main(String[] args) {
        Seq a = new Seq(0);
        Seq b = new Seq(100);
        System.out.print(a.next() + " ");
        System.out.print(b.next() + " ");
        System.out.println(a.next());
    }
}
`, answer: '1 102 4', explanation: 'calls is shared: a.next adds 1 (val 1); b.next adds 2 (102); a.next adds 3 (val 4).' },
      { type: 'predict', id: 'pt7', question: 'What does this program print?',
        code: j`class Word {
    private String text;
    public Word(String text) { this.text = text; }
    public Word twice() { return new Word(text + text); }
    public String toString() { return "[" + text + "]"; }
}

public class Main {
    public static void main(String[] args) {
        Word w = new Word("ha");
        Word v = w.twice().twice();
        System.out.println(w + " " + v);
    }
}
`, answer: '[ha] [hahahaha]', explanation: 'twice builds a new Word and leaves the original alone.' },
      { type: 'predict', id: 'pt8', question: 'What does this program print?',
        code: j`public class Main {
    public static int f(int n) {
        if (n > 5) {
            return n - 5;
        }
        return n + 5;
    }

    public static void main(String[] args) {
        int v = 4;
        v = f(v);
        v = f(v);
        System.out.println(v);
    }
}
`, answer: '4', explanation: 'f(4) = 9, then f(9) = 4.' },
      { type: 'predict', id: 'pt9', question: 'What does this program print?',
        code: j`class Cup {
    private int ml;
    public Cup(int ml) { this.ml = ml; }
    public void pourInto(Cup other) {
        other.ml += ml;
        ml = 0;
    }
    public int getMl() { return ml; }
}

public class Main {
    public static void main(String[] args) {
        Cup a = new Cup(200);
        Cup b = new Cup(50);
        a.pourInto(b);
        b.pourInto(a);
        System.out.println(a.getMl() + " " + b.getMl());
    }
}
`, answer: '250 0', explanation: 'After the first pour: a = 0, b = 250. The second pour moves it all back.' },
      { type: 'predict', id: 'pt10', question: 'What does this program print?',
        code: j`class Gauge {
    private int level = 5;

    public void set(int level) {
        if (level >= 0 && level <= 10) {
            this.level = level;
        }
    }

    public int get() { return level; }
}

public class Main {
    public static void main(String[] args) {
        Gauge g = new Gauge();
        g.set(8);
        g.set(-3);
        g.set(11);
        System.out.println(g.get());
    }
}
`, answer: '8', explanation: 'Only the first call passes validation.' },
      { type: 'code', id: 'pt-code', prompt: 'Finally, write code. Complete §isInRange§ (inclusive) so the test prints §true false§.',
        expected: 'true false',
        starter: j`class Range {
    private int lo;
    private int hi;
    public Range(int lo, int hi) { this.lo = lo; this.hi = hi; }
    // TODO: public boolean isInRange(int v)
}

public class Main {
    public static void main(String[] args) {
        Range r = new Range(1, 10);
        System.out.println(r.isInRange(10) + " " + r.isInRange(11));
    }
}
`,
        solution: j`class Range {
    private int lo;
    private int hi;
    public Range(int lo, int hi) { this.lo = lo; this.hi = hi; }
    public boolean isInRange(int v) { return v >= lo && v <= hi; }
}

public class Main {
    public static void main(String[] args) {
        Range r = new Range(1, 10);
        System.out.println(r.isInRange(10) + " " + r.isInRange(11));
    }
}
`, hint: 'Both ends are included: use >= and <=.' },
    ],
  },
  {
    id: '3-15',
    title: 'FRQ Practice: Writing a Class',
    blocks: [
      { type: 'text', md: md`
AP free-response question 2 asks you to **write a complete class** from a description. A reliable method:

1. Read the description and list the **data** the object must remember. These become private instance variables.
2. Write the **constructor** to match the described parameters.
3. Write each **method** exactly as specified: name, parameters, return type.
4. Check each method against the examples. Watch for edge cases (empty, zero, limits).

**Problem.** A *Thermostat* keeps a target temperature (int) and an on/off state. The constructor takes the starting target and begins turned off. §raise()§ and §lower()§ change the target by 1 degree, but the target must stay between 50 and 90 inclusive (ignore changes outside that). §turnOn()§ and §turnOff()§ set the state. §isOn()§ and §getTarget()§ report. §describe()§ returns §"ON at 72"§ or §"OFF"§.

Try it in two parts. First write the class, then write a §main§ that exercises it with the edge cases.
` },
      { type: 'code', id: 'frq-thermo', prompt: 'Write the complete §Thermostat§ class from the description. The test code in §main§ is provided. Expected output: §OFF§, §ON at 72§, §ON at 90§, §OFF§ each on its own line.',
        expected: 'OFF\nON at 72\nON at 90\nOFF',
        starter: j`// TODO: class Thermostat

public class Main {
    public static void main(String[] args) {
        Thermostat t = new Thermostat(70);
        System.out.println(t.describe());
        t.turnOn();
        t.raise();
        t.raise();
        System.out.println(t.describe());
        for (int i = 0; i < 40; i++) {
            t.raise();
        }
        System.out.println(t.describe());
        t.turnOff();
        System.out.println(t.describe());
    }
}
`,
        solution: j`class Thermostat {
    private int target;
    private boolean on;

    public Thermostat(int target) {
        this.target = target;
        on = false;
    }

    public void raise() {
        if (target < 90) {
            target++;
        }
    }

    public void lower() {
        if (target > 50) {
            target--;
        }
    }

    public void turnOn() { on = true; }
    public void turnOff() { on = false; }
    public boolean isOn() { return on; }
    public int getTarget() { return target; }

    public String describe() {
        if (on) {
            return "ON at " + target;
        }
        return "OFF";
    }
}

public class Main {
    public static void main(String[] args) {
        Thermostat t = new Thermostat(70);
        System.out.println(t.describe());
        t.turnOn();
        t.raise();
        t.raise();
        System.out.println(t.describe());
        for (int i = 0; i < 40; i++) {
            t.raise();
        }
        System.out.println(t.describe());
        t.turnOff();
        System.out.println(t.describe());
    }
}
`, hint: 'Guard raise with target < 90 and lower with target > 50.' },
      { type: 'code', id: 'frq-main', prompt: 'Now write your own §main§. Using the finished §Playlist§ class, create a playlist, add songs "A", "B", "C" with §addSong§, and print §size()§ then §summary()§. Expected: §3§ then §A | B | C§.',
        expected: '3\nA | B | C',
        starter: j`class Playlist {
    private String songs = "";
    private int count = 0;

    public void addSong(String title) {
        if (count > 0) {
            songs += " | ";
        }
        songs += title;
        count++;
    }

    public int size() { return count; }
    public String summary() { return songs; }
}

public class Main {
    public static void main(String[] args) {
        // TODO
    }
}
`,
        solution: j`class Playlist {
    private String songs = "";
    private int count = 0;

    public void addSong(String title) {
        if (count > 0) {
            songs += " | ";
        }
        songs += title;
        count++;
    }

    public int size() { return count; }
    public String summary() { return songs; }
}

public class Main {
    public static void main(String[] args) {
        Playlist p = new Playlist();
        p.addSong("A");
        p.addSong("B");
        p.addSong("C");
        System.out.println(p.size());
        System.out.println(p.summary());
    }
}
`, hint: 'Create with new Playlist(), call addSong three times, then print.' },
      { type: 'code', id: 'frq-score', prompt: 'One more. Write §ScoreKeeper§: constructor takes no arguments; §record(int score)§ stores the count, total and highest score; §getAverage()§ returns the average as a double (0.0 if none); §getHighest()§ returns the highest. Expected: §Avg: 7.0 High: 10§.',
        expected: 'Avg: 7.0 High: 10',
        starter: j`// TODO: class ScoreKeeper

public class Main {
    public static void main(String[] args) {
        ScoreKeeper s = new ScoreKeeper();
        s.record(4);
        s.record(10);
        s.record(7);
        System.out.println("Avg: " + s.getAverage() + " High: " + s.getHighest());
    }
}
`,
        solution: j`class ScoreKeeper {
    private int count;
    private int total;
    private int highest;

    public void record(int score) {
        if (count == 0 || score > highest) {
            highest = score;
        }
        count++;
        total += score;
    }

    public double getAverage() {
        if (count == 0) {
            return 0.0;
        }
        return (double) total / count;
    }

    public int getHighest() { return highest; }
}

public class Main {
    public static void main(String[] args) {
        ScoreKeeper s = new ScoreKeeper();
        s.record(4);
        s.record(10);
        s.record(7);
        System.out.println("Avg: " + s.getAverage() + " High: " + s.getHighest());
    }
}
`, hint: 'Cast total to double before dividing.' },
    ],
  },
  {
    id: '3-16',
    title: 'Unit 3 Projects',
    blocks: [
      { type: 'text', md: md`
Choose one (or more) of these to build with your own classes. Each is open-ended: the exercise only checks that it runs. Plan first: list the classes, their fields and methods, then code.

- **Virtual Pet.** A §Pet§ with hunger, energy and mood. Methods §feed()§, §play()§, §sleep()§ change the numbers (keep them in range), and §toString()§ shows the state.
- **Library.** A §Book§ class (title, author, checked out?) and a §Library§ that keeps a count of books and offers §checkOut§ and §giveBack§.
- **Bank.** An §Account§ with deposit, withdraw (refuse overdrafts) and a static counter that gives each account a number.
- **Your own idea.** Anything with at least two classes that use each other.

Requirements: private fields, at least one overloaded constructor, one validated setter, a §toString§, one static member, and a §main§ that exercises everything. Include a comment with the privacy or ethical consideration your design addresses.
` },
      { type: 'code', id: 'proj-pet', prompt: 'Starter project: a Virtual Pet. Extend it with a §sleep()§ method (energy +3, hunger +1) and show the result. Run to see the pet.',
        completeOnRun: true,
        starter: j`class Pet {
    private String name;
    private int hunger;
    private int energy;

    public Pet(String name) {
        this.name = name;
        hunger = 5;
        energy = 5;
    }

    public void feed() {
        if (hunger > 0) {
            hunger--;
        }
    }

    public void play() {
        energy--;
        hunger++;
    }

    // TODO: sleep()

    public String toString() {
        return name + " hunger=" + hunger + " energy=" + energy;
    }
}

public class Main {
    public static void main(String[] args) {
        Pet p = new Pet("Pixel");
        p.feed();
        p.play();
        System.out.println(p);
    }
}
`,
        solution: j`class Pet {
    private String name;
    private int hunger;
    private int energy;

    public Pet(String name) {
        this.name = name;
        hunger = 5;
        energy = 5;
    }

    public void feed() {
        if (hunger > 0) {
            hunger--;
        }
    }

    public void play() {
        energy--;
        hunger++;
    }

    public void sleep() {
        energy += 3;
        hunger++;
    }

    public String toString() {
        return name + " hunger=" + hunger + " energy=" + energy;
    }
}

public class Main {
    public static void main(String[] args) {
        Pet p = new Pet("Pixel");
        p.feed();
        p.play();
        p.sleep();
        System.out.println(p);
    }
}
` },
      { type: 'code', id: 'proj-free', prompt: 'Your own project: write at least two classes and a main. It just needs to run without errors.',
        completeOnRun: true,
        starter: j`public class Main {
    public static void main(String[] args) {
        // Design your classes above Main and use them here
        System.out.println("My project");
    }
}
`,
        solution: j`class Note {
    private String text;
    public Note(String text) { this.text = text; }
    public String toString() { return "Note: " + text; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new Note("My project"));
    }
}
` },
    ],
  },
];
