import type { Unit } from './types';
import { md } from './md';

const j = String.raw;

// Lessons follow the order of CSAwesome2 Unit 1 (topics 1.1-1.6, 1.11-1.13, 1.15).
// Text is original wording; see the About page for attribution.
export const unit1: Unit = {
  id: 1,
  title: 'Using Objects and Methods',
  blurb: 'Your first programs: printing, variables, arithmetic, casting, Math, objects and Strings.',
  lessons: [
    {
      id: '1-1',
      title: 'Algorithms and Your First Program',
      blocks: [
        { type: 'text', md: md`
An **algorithm** is a step-by-step process for solving a problem, like a recipe or driving directions. Steps happen in order, one at a time. That ordering is called **sequencing**.

In Java, every program lives inside a **class**. Execution starts at the **main method**:

§§§java
public class Main {
    public static void main(String[] args) {
        // your steps go here
    }
}
§§§

Curly braces §{ }§ mark where classes and methods begin and end, and every opening brace needs a closing one. The Java **compiler** translates your source into something the computer can run, and it reports errors it can find before the program starts.

To show text, use §System.out.println§, which prints a line, or §System.out.print§, which does not move to a new line afterwards. Text goes between double quotes and every statement ends in a semicolon.
` },
        { type: 'code', id: 'hello', prompt: 'Run this, then change it to print your own name.', completeOnRun: true,
          starter: j`public class Main {
    public static void main(String[] args) {
        System.out.println("Hi there!");
    }
}
` },
        { type: 'quiz', id: 'q-compiler', question: 'What does the Java **compiler** do?',
          choices: ['Runs the program line by line', 'Checks your code for errors and translates it so it can run', 'Saves your program to the cloud', 'Makes the code run faster'],
          answer: 1, explanation: 'The compiler translates source code and catches syntax errors before the program runs.' },
        { type: 'text', md: md`
### Fixing compile errors

A **syntax error** means the code breaks the rules of Java, like a missing semicolon or quote. The compiler will refuse to run it and tell you the line. Reading the message is a skill, so try it.
` },
        { type: 'code', id: 'fix-errors', prompt: 'This program has **two** errors. Fix them so it prints exactly the two lines "Hello, world!" and "Java is fun".',
          expected: 'Hello, world!\nJava is fun',
          starter: j`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!")
        System.out.println(Java is fun");
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
        System.out.println("Java is fun");
    }
}
`, hint: 'Look at the end of the first print line, and the quotes on the second.' },
        { type: 'text', md: md`
### Meet Dot

This app has a helper class called **Dot** that draws on a canvas, so you can see your steps run in order. A Dot starts in the middle facing up, with its pen down. Useful calls: §forward(n)§, §turnRight(deg)§, §turnLeft(deg)§, §setColor("cyan")§, §penUp()§ and §penDown()§. Colors can be names like §"violet"§ or hex like §"#ff8800"§.
` },
        { type: 'code', id: 'dot-square', dot: true, minDotMoves: 4,
          prompt: 'Run the starter, then finish the code so the dot draws a full square (four sides).',
          starter: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot();
        d.forward(60);
        d.turnRight(90);
        // finish the square here
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot();
        d.forward(60);
        d.turnRight(90);
        d.forward(60);
        d.turnRight(90);
        d.forward(60);
        d.turnRight(90);
        d.forward(60);
        d.turnRight(90);
    }
}
` },
      ],
    },
    {
      id: '1-2',
      title: 'Variables and Data Types',
      blocks: [
        { type: 'text', md: md`
A **variable** is a named memory location that holds a value which can change while the program runs, like a game score.

Every variable has a **type** that decides what it can hold. The primitive types on the AP exam are:

- §int§: whole numbers like 3, 0, -76
- §double§: decimal numbers like 6.3 or -0.9
- §boolean§: only §true§ or §false§

§String§ is not primitive. It is a class, a sequence of characters written in double quotes.

To use a variable you **declare** it (type and name) and usually **initialize** it:

§§§java
int score = 0;
double price = 4.99;
boolean passed = true;
String name = "Ada";
§§§

Names are case-sensitive and by convention start lowercase, with later words capitalized: §numStudents§. Use §final§ to make a constant that cannot change: §final double TAX = 0.07;§.
` },
        { type: 'quiz', id: 'q-avg', question: 'Which type should hold the **average grade** for a course?',
          choices: ['int', 'double', 'boolean', 'String'], answer: 1,
          explanation: 'An average can have a fractional part, so use double.' },
        { type: 'quiz', id: 'q-count', question: 'Which type should hold the **number of students** in a class?',
          choices: ['int', 'double', 'boolean', 'String'], answer: 0,
          explanation: 'A count is a whole number: int.' },
        { type: 'code', id: 'declare', prompt: 'Declare variables and print them. Replace the TODOs so the program prints exactly:\n\n§Ada§, §36§, §1.5§, §true§ on four separate lines, using variables of type String, int, double and boolean.',
          expected: 'Ada\n36\n1.5\ntrue',
          starter: j`public class Main {
    public static void main(String[] args) {
        // TODO: declare a String variable name holding "Ada"
        // TODO: declare int age = 36, double height = 1.5, boolean cool = true
        // TODO: print each variable on its own line
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        String name = "Ada";
        int age = 36;
        double height = 1.5;
        boolean cool = true;
        System.out.println(name);
        System.out.println(age);
        System.out.println(height);
        System.out.println(cool);
    }
}
` },
        { type: 'code', id: 'dot-vars', dot: true, minDotMoves: 3,
          prompt: 'Variables make code easy to tweak. Change §side§ and §color§ and watch the triangle change. (Turn 120 degrees to make equal sides.)',
          starter: j`public class Main {
    public static void main(String[] args) {
        int side = 70;
        String color = "violet";
        Dot d = new Dot(-35, -40);
        d.setColor(color);
        d.forward(side);
        d.turnRight(120);
        d.forward(side);
        d.turnRight(120);
        d.forward(side);
    }
}
` },
        { type: 'quiz', id: 'q-final', question: 'What does §final§ do in §final int MAX = 10;§?',
          choices: ['Makes MAX the last variable declared', 'Prevents MAX from being changed after it is set', 'Makes MAX a decimal', 'Nothing, it is a comment'],
          answer: 1 },
      ],
    },
    {
      id: '1-3',
      title: 'Expressions and Output',
      blocks: [
        { type: 'text', md: md`
An **expression** combines values, variables and **operators** into a single value. Java's arithmetic operators are §+ - * / %§.

- §/§ with two ints is **integer division**: the fractional part is cut off. §7 / 2§ is §3§, not §3.5§.
- §%§ is the **remainder**: §7 % 2§ is §1§. It is handy for checking even/odd and wrapping around.
- If either side is a §double§, the result is a double: §7 / 2.0§ is §3.5§.
- Precedence is like math class: §* / %§ before §+ -§, left to right, parentheses first.

Join text and values with §+§: §"Total: " + 5§ gives §"Total: 5"§. Escape sequences: §\n§ new line, §\"§ a quote, §\\§ a backslash.
` },
        { type: 'quiz', id: 'q-div', question: 'What does §System.out.println(11 / 4);§ print?',
          choices: ['2.75', '3', '2', '2.0'], answer: 2, explanation: 'Both operands are ints, so the fraction is dropped: 11 / 4 is 2.' },
        { type: 'quiz', id: 'q-mod', question: 'What is the value of §17 % 5§?',
          choices: ['3', '2', '12', '3.4'], answer: 1, explanation: '17 = 3 * 5 + 2, so the remainder is 2.' },
        { type: 'quiz', id: 'q-prec', question: 'What does §System.out.println(2 + 3 * 4 - 6 / 2);§ print?',
          choices: ['11', '17', '8', '14'], answer: 0, explanation: '3*4 = 12 and 6/2 = 3, so 2 + 12 - 3 = 11.' },
        { type: 'code', id: 'week', prompt: 'How many minutes are in a week? Compute it with variables for days, hours and minutes, and print §Minutes in a week: § followed by the number.',
          expected: 'Minutes in a week: 10080',
          starter: j`public class Main {
    public static void main(String[] args) {
        int days = 7;
        // TODO: more variables, then print "Minutes in a week: " + result
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int days = 7;
        int hours = 24;
        int minutes = 60;
        int total = days * hours * minutes;
        System.out.println("Minutes in a week: " + total);
    }
}
` },
        { type: 'code', id: 'clock', prompt: 'It is 100 minutes after the start of the day. Use §/§ and §%§ to print the clock as §1 hours and 40 minutes§.',
          expected: '1 hours and 40 minutes',
          starter: j`public class Main {
    public static void main(String[] args) {
        int total = 100;
        // TODO: hours = total / 60, minutes = total % 60
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int total = 100;
        int hours = total / 60;
        int minutes = total % 60;
        System.out.println(hours + " hours and " + minutes + " minutes");
    }
}
` },
        { type: 'code', id: 'dot-expr', dot: true, minDotMoves: 5,
          prompt: 'Expressions inside method calls work too. Change §n§ to draw a different star (a 5-point star needs a 144 degree turn).',
          starter: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot(-40, 30);
        d.setColor("cyan");
        int n = 5;
        for (int i = 0; i < n; i++) {
            d.forward(80);
            d.turnRight(720 / n);
        }
    }
}
` },
      ],
    },
    {
      id: '1-4',
      title: 'Assignment Statements',
      blocks: [
        { type: 'text', md: md`
An **assignment statement** stores the value of an expression into a variable with §=§. Read it as "gets": the right side is evaluated first, then stored on the left.

§§§java
int x = 3;
int y = x * 2;   // y is 6
x = x + y;       // x is now 9
§§§

§=§ is **not** a math equation. §x = x + 1;§ is perfectly fine and means "make x one bigger". Variables hold their value until reassigned, and assignment copies the value; it does not link the two variables.

To swap two variables you need a temporary third one, otherwise the first assignment destroys a value.
` },
        { type: 'quiz', id: 'q-assign', question: 'After §int a = 5; int b = a; a = 10;§ what are a and b?',
          choices: ['a = 10, b = 10', 'a = 10, b = 5', 'a = 5, b = 10', 'a = 5, b = 5'], answer: 1, explanation: 'b got a copy of 5 when it was assigned. Changing a later does not affect b.' },
        { type: 'quiz', id: 'q-trace', question: 'What is printed?\n\n§§§java\nint x = 2;\nint y = 3;\nx = x + y;\ny = x - y;\nSystem.out.println(x + " " + y);\n§§§',
          choices: ['2 3', '5 2', '5 3', '3 2'], answer: 1, explanation: 'x becomes 5, then y becomes 5 - 3 = 2.' },
        { type: 'code', id: 'swap', prompt: 'Swap the values of §first§ and §second§ using a temporary variable, then print them as §first=20 second=10§.',
          expected: 'first=20 second=10',
          starter: j`public class Main {
    public static void main(String[] args) {
        int first = 10;
        int second = 20;
        // TODO: swap them
        System.out.println("first=" + first + " second=" + second);
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int first = 10;
        int second = 20;
        int temp = first;
        first = second;
        second = temp;
        System.out.println("first=" + first + " second=" + second);
    }
}
` },
        { type: 'code', id: 'dot-xy', dot: true, minDotMoves: 4,
          prompt: 'Dots can jump to coordinates with §moveTo(x, y)§ (center is 0,0, y points up). Store coordinates in variables and reassign them to trace a zig-zag.',
          starter: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot(-90, 0);
        d.setColor("violet");
        int x = -90;
        int y = 40;
        x = x + 45;
        d.moveTo(x, y);
        y = -y;
        x = x + 45;
        d.moveTo(x, y);
        // keep going!
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot(-90, 0);
        d.setColor("violet");
        int x = -90;
        int y = 40;
        for (int i = 0; i < 4; i++) {
            x = x + 45;
            d.moveTo(x, y);
            y = -y;
        }
    }
}
` },
      ],
    },
    {
      id: '1-5',
      title: 'Casting and Range of Variables',
      blocks: [
        { type: 'text', md: md`
Java does **not** automatically throw away information. You can store an int in a double, but not the other way round without saying so.

A **cast** converts a value to another type using the type in parentheses:

§§§java
double d = 7 / 2;          // 3.0  (integer division happened first!)
double e = (double) 7 / 2; // 3.5  (cast happens before the division)
int n = (int) 3.99;        // 3    (casting to int truncates, never rounds)
§§§

To round a positive double to the nearest int: §(int) (x + 0.5)§. For negatives use §(int) (x - 0.5)§.

**Range:** an §int§ is stored in 32 bits so it ranges from §Integer.MIN_VALUE§ (-2147483648) to §Integer.MAX_VALUE§ (2147483647). Going past that **overflows** and wraps around to the other end. Doubles have a huge range but limited precision.
` },
        { type: 'quiz', id: 'q-cast1', question: 'What does §System.out.println((int) 5.9);§ print?',
          choices: ['6', '5', '5.9', '5.0'], answer: 1, explanation: 'Casting to int truncates toward zero. It does not round.' },
        { type: 'quiz', id: 'q-cast2', question: 'What does §System.out.println((double) (3 / 2));§ print?',
          choices: ['1.5', '1.0', '1', '2.0'], answer: 1, explanation: 'The parentheses make 3 / 2 happen first as integer division (1), then it is cast to 1.0.' },
        { type: 'code', id: 'avg', prompt: 'The average of §a§, §b§ and §c§ should be a decimal. Fix the program so it prints §Average: 3.6666666666666665§.',
          expected: 'Average: 3.6666666666666665',
          starter: j`public class Main {
    public static void main(String[] args) {
        int a = 3;
        int b = 4;
        int c = 4;
        double avg = (a + b + c) / 3;
        System.out.println("Average: " + avg);
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int a = 3;
        int b = 4;
        int c = 4;
        double avg = (double) (a + b + c) / 3;
        System.out.println("Average: " + avg);
    }
}
`, hint: 'Cast the sum (or divide by 3.0).' },
        { type: 'code', id: 'overflow', prompt: 'Run this and see what happens at the edge of the int range. Then try adding 2 instead of 1.',
          starter: j`public class Main {
    public static void main(String[] args) {
        int big = Integer.MAX_VALUE;
        System.out.println(big);
        System.out.println(big + 1);
    }
}
` },
        { type: 'code', id: 'round', prompt: 'Round §price§ to the nearest whole number using a cast, and print §Rounded: 8§.',
          expected: 'Rounded: 8',
          starter: j`public class Main {
    public static void main(String[] args) {
        double price = 7.6;
        // TODO
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        double price = 7.6;
        int rounded = (int) (price + 0.5);
        System.out.println("Rounded: " + rounded);
    }
}
` },
      ],
    },
    {
      id: '1-6',
      title: 'Compound Assignment Operators',
      blocks: [
        { type: 'text', md: md`
Updating a variable based on its old value is so common that Java has shortcuts:

| Shortcut | Same as |
|---|---|
| §x += 3§ | §x = x + 3§ |
| §x -= 3§ | §x = x - 3§ |
| §x *= 3§ | §x = x * 3§ |
| §x /= 3§ | §x = x / 3§ |
| §x %= 3§ | §x = x % 3§ |
| §x++§ | §x = x + 1§ |
| §x--§ | §x = x - 1§ |

On the AP exam §++§ and §--§ are used as standalone statements, never inside bigger expressions.
` },
        { type: 'quiz', id: 'q-comp', question: 'What is x after: §int x = 5; x += 3; x *= 2; x--;§',
          choices: ['15', '16', '14', '13'], answer: 0, explanation: '5 -> 8 -> 16 -> 15.' },
        { type: 'quiz', id: 'q-comp2', question: 'What is x after: §int x = 17; x %= 5; x++;§',
          choices: ['2', '3', '4', '18'], answer: 1, explanation: '17 % 5 is 2, then x++ makes 3.' },
        { type: 'code', id: 'score', prompt: 'A player starts with 0 points. Use compound operators: add 10, add 5, double the score, then subtract 3. Print §Score: 27§.',
          expected: 'Score: 27',
          starter: j`public class Main {
    public static void main(String[] args) {
        int score = 0;
        // TODO
        System.out.println("Score: " + score);
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int score = 0;
        score += 10;
        score += 5;
        score *= 2;
        score -= 3;
        System.out.println("Score: " + score);
    }
}
` },
        { type: 'code', id: 'dot-grow', dot: true, minDotMoves: 6,
          prompt: 'Draw a growing spiral. The compound operators update §len§ and §angle§ each step. Edit the numbers to change its shape.',
          starter: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot();
        d.setColor("cyan");
        double len = 3;
        for (int i = 0; i < 40; i++) {
            d.forward(len);
            d.turnRight(30);
            len += 1.5;
        }
    }
}
` },
      ],
    },
    {
      id: '1-7',
      title: 'The Math Class',
      blocks: [
        { type: 'text', md: md`
Java ships with a library of ready-made code. The **Math** class has **static methods** you call on the class name itself, with no object needed: §Math.sqrt(16)§.

| Method | Meaning |
|---|---|
| §Math.abs(x)§ | absolute value (int or double) |
| §Math.pow(a, b)§ | a to the power b, returns a double |
| §Math.sqrt(x)§ | square root, returns a double |
| §Math.random()§ | double in [0.0, 1.0) |

To get a random int in a range, scale, cast, and shift:

§§§java
int roll = (int) (Math.random() * 6) + 1;   // 1 to 6
§§§

The general form is §(int) (Math.random() * range) + min§ where range is how many values you want.
` },
        { type: 'quiz', id: 'q-math1', question: 'What does §Math.pow(2, 3)§ evaluate to?',
          choices: ['6', '8', '8.0', '9.0'], answer: 2, explanation: 'Math.pow returns a double, so the value is 8.0.' },
        { type: 'quiz', id: 'q-math2', question: 'Which expression gives a random int from **5 to 10 inclusive**?',
          choices: ['(int) (Math.random() * 10) + 5', '(int) (Math.random() * 6) + 5', '(int) (Math.random() * 5) + 6', '(int) (Math.random() * 11)'], answer: 1, explanation: 'There are 6 values (5,6,7,8,9,10), so range is 6 and the minimum is 5.' },
        { type: 'code', id: 'hyp', prompt: 'Use §Math.sqrt§ and §Math.pow§ to compute the hypotenuse of a right triangle with legs 3 and 4, and print §Hypotenuse: 5.0§.',
          expected: 'Hypotenuse: 5.0',
          starter: j`public class Main {
    public static void main(String[] args) {
        double a = 3;
        double b = 4;
        // TODO
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        double a = 3;
        double b = 4;
        double c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        System.out.println("Hypotenuse: " + c);
    }
}
` },
        { type: 'code', id: 'dot-random', dot: true, minDotMoves: 8,
          prompt: 'A random walk. Each run gives a different picture. Try changing the step range or number of steps.',
          starter: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot();
        d.setColor("violet");
        for (int i = 0; i < 25; i++) {
            int turn = (int) (Math.random() * 121) - 60; // -60 to 60
            d.turnRight(turn);
            d.forward(12);
        }
    }
}
` },
      ],
    },
    {
      id: '1-8',
      title: 'Objects and Constructors',
      blocks: [
        { type: 'text', md: md`
A **class** is a blueprint. An **object** is one thing built from it. You have already used one: §Dot d = new Dot();§.

- §Dot§ is the **class** (the type).
- §d§ is a **reference variable** that holds the address of a Dot object.
- §new Dot()§ calls a **constructor**, special code that creates and initializes the object.

Constructors can take **parameters**, so you can create objects in different starting states. The Dot class has several:

§§§java
Dot a = new Dot();                  // at the center
Dot b = new Dot(50, 20);            // at x=50, y=20
Dot c = new Dot("violet");          // violet, at center
Dot e = new Dot(-30, 40, "cyan");   // position and color
§§§

Once you have an object, you call its **instance methods** with the dot operator: §b.forward(10);§. Each object keeps its own state, so §a.forward(10)§ does not move §b§. A reference can also be §null§, meaning "no object", and calling a method on null crashes with a NullPointerException.
` },
        { type: 'quiz', id: 'q-new', question: 'What does the keyword §new§ do in §Dot d = new Dot(10, 20);§?',
          choices: ['Declares a new variable type', 'Calls the constructor to create a Dot object', 'Deletes the old Dot', 'Prints a Dot'], answer: 1 },
        { type: 'quiz', id: 'q-sig', question: 'Which line does **not** compile, given the constructors listed above?',
          choices: ['new Dot()', 'new Dot("cyan")', 'new Dot(10, 20)', 'new Dot(true)'], answer: 3, explanation: 'There is no Dot constructor that takes a boolean. The parameters must match a constructor signature.' },
        { type: 'code', id: 'two-dots', dot: true, minDotMoves: 2,
          prompt: 'Two objects, two independent states. Make §a§ and §b§ draw something different, and add a third Dot of your own.',
          starter: j`public class Main {
    public static void main(String[] args) {
        Dot a = new Dot(-50, 0, "cyan");
        Dot b = new Dot(50, 0, "violet");
        a.turnRight(90);
        a.forward(100);
        b.turnLeft(90);
        b.forward(100);
    }
}
`, hint: 'Each Dot keeps its own position, heading and color.' },
        { type: 'code', id: 'flower', dot: true, minDotMoves: 20,
          prompt: 'Create a flower: move a Dot forward and turn it 36 degrees ten times, drawing a small loop each time. Make at least 20 moves in all.',
          starter: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot("cyan");
        // TODO: repeat 10 times: draw a small square (forward 30 / turnRight 90 x4), then turnRight(36)
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot("cyan");
        for (int i = 0; i < 10; i++) {
            for (int k = 0; k < 4; k++) {
                d.forward(30);
                d.turnRight(90);
            }
            d.turnRight(36);
        }
    }
}
` },
      ],
    },
    {
      id: '1-9',
      title: 'Strings',
      blocks: [
        { type: 'text', md: md`
A **String** is an object holding a sequence of characters. Positions are numbered from **0**, so in §"Java"§ the §J§ is at index 0 and the last char is at index §length() - 1§.

| Method | Result for §s = "computer"§ |
|---|---|
| §s.length()§ | §8§ |
| §s.substring(3)§ | §"puter"§ (index 3 to the end) |
| §s.substring(0, 3)§ | §"com"§ (start inclusive, end **exclusive**) |
| §s.indexOf("p")§ | §3§ (or -1 if not found) |
| §s.charAt(1)§ | §'o'§ |
| §s.equals("computer")§ | §true§ |
| §s.compareTo(t)§ | negative, zero or positive by alphabetical order |

Always compare Strings with §equals§, never §==§ (which compares references). Strings are **immutable**: methods return a new String and leave the original unchanged.
` },
        { type: 'quiz', id: 'q-sub', question: 'What does §"programming".substring(3, 7)§ return?',
          choices: ['"gram"', '"gramm"', '"ogram"', '"rogr"'], answer: 0, explanation: 'Indexes 3,4,5,6 are g,r,a,m. The end index 7 is excluded.' },
        { type: 'quiz', id: 'q-idx', question: 'What does §"banana".indexOf("na")§ return?',
          choices: ['2', '3', '4', '-1'], answer: 0, explanation: 'The first "na" starts at index 2.' },
        { type: 'quiz', id: 'q-eq', question: 'Which is the correct way to test whether two Strings have the same characters?',
          choices: ['a == b', 'a.equals(b)', 'a = b', 'a.length() == b'], answer: 1 },
        { type: 'code', id: 'initials', prompt: 'Use §substring§ (or §charAt§) to print the initials §AL§ from the first and last names.',
          expected: 'AL',
          starter: j`public class Main {
    public static void main(String[] args) {
        String first = "Ada";
        String last = "Lovelace";
        // TODO: print the first letter of each name together
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        String first = "Ada";
        String last = "Lovelace";
        System.out.println(first.substring(0, 1) + last.substring(0, 1));
    }
}
` },
        { type: 'code', id: 'email', prompt: 'Given an email address, print only the part before the §@§ (use §indexOf§ and §substring§). Expected: §student§.',
          expected: 'student',
          starter: j`public class Main {
    public static void main(String[] args) {
        String email = "student@school.edu";
        // TODO
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        String email = "student@school.edu";
        int at = email.indexOf("@");
        System.out.println(email.substring(0, at));
    }
}
` },
        { type: 'code', id: 'dot-string', dot: true, minDotMoves: 4,
          prompt: 'Drive a Dot with a String of commands: §F§ forward, §R§ turn right, §L§ turn left. Each character is read with §charAt§. Edit §program§ to draw your own shape.',
          starter: j`public class Main {
    public static void main(String[] args) {
        String program = "FRFRFLFLFRF";
        Dot d = new Dot(-60, -40, "violet");
        for (int i = 0; i < program.length(); i++) {
            String step = program.substring(i, i + 1);
            if (step.equals("F")) d.forward(25);
            if (step.equals("R")) d.turnRight(90);
            if (step.equals("L")) d.turnLeft(90);
        }
    }
}
` },
      ],
    },
  ],
};
