import type { Lesson, Unit } from './types';
import { md } from './md';
import { unit1b } from './unit1b';

const j = String.raw;

// Lessons 1.1-1.6 live here; 1.7 onward are in unit1b.ts.
// Text is original wording; see the About page for attribution.
export const unit1: Unit = {
  id: 1,
  title: 'Using Objects and Methods',
  blurb: 'Your first programs: printing, variables, arithmetic, casting, Math, objects and Strings.',
  lessons: ([
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
        { type: 'text', md: md`
### print vs println, and escape sequences

§System.out.println§ prints and then moves to a new line. §System.out.print§ prints and stays on the same line, so the next output continues right after it.

§§§java
System.out.print("Hello, ");
System.out.print("world");
System.out.println("!");   // output: Hello, world!
§§§

Some characters cannot be typed directly inside a string, so Java uses **escape sequences** that start with a backslash:

| Sequence | Meaning |
|---|---|
| §\n§ | new line |
| §\"§ | a double quote character |
| §\\§ | one backslash |
| §\t§ | a tab |

§System.out.println("a\nb");§ prints §a§ and §b§ on two lines.
` },
        { type: 'predict', id: 'p-print', question: 'What does this program print? Mind the difference between §print§ and §println§.',
          code: j`public class Main {
    public static void main(String[] args) {
        System.out.print("A");
        System.out.println("B");
        System.out.print("C\nD");
        System.out.println("E");
    }
}
`, answer: 'AB\nC\nDE', explanation: 'A and B share a line. C, a newline from the escape sequence, then D and E share the next line.' },
        { type: 'code', id: 'escapes', prompt: 'Use escape sequences so the program prints exactly these two lines (including the quotes and backslashes):\n\n§"Hello," she said.§\n§Path: C:\\Users\\Ada§\n\nUse a single §println§ call with §\\n§ for the first part if you like.',
          expected: '"Hello," she said.\nPath: C:\\Users\\Ada',
          starter: j`public class Main {
    public static void main(String[] args) {
        // TODO: print the two lines using \" and \\ escapes
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        System.out.println("\"Hello,\" she said.");
        System.out.println("Path: C:\\Users\\Ada");
    }
}
`, hint: 'Inside a string, write \\" for a quote and \\\\ for a single backslash.' },
        { type: 'text', md: md`
### Three kinds of errors

- **Syntax (compile-time) errors** break Java's grammar: a missing semicolon, an unclosed string, a misspelled keyword. The compiler stops and points at the line. The program never runs.
- **Runtime errors (exceptions)** happen while the program runs, such as dividing an int by zero. The program starts, then crashes with a message like §ArithmeticException§.
- **Logic errors** are the sneakiest. The program compiles and runs without complaint, but gives the wrong answer because the steps are wrong. Only testing and tracing will find them.
` },
        { type: 'quiz', id: 'q-err1', question: 'A program prints the **average** of 10 and 20 as 25 because it computes §10 + 20 / 2§. What kind of error is this?',
          choices: ['Syntax error', 'Runtime error', 'Logic error', 'It is not an error'], answer: 2,
          explanation: 'It compiles and runs, but the logic is wrong (it needs parentheses). That is a logic error. Nothing crashed, so it was not a runtime error.' },
        { type: 'quiz', id: 'q-err2', question: 'Which statement causes a **runtime** error (it compiles fine, then crashes)?',
          choices: ['§System.out.println("Hi")§ (no semicolon)', '§int x = 10 / 0;§', '§Sytem.out.println("Hi");§', '§System.out.println("Hi);§'], answer: 1,
          explanation: 'Dividing an int by zero throws an ArithmeticException while running. The other three are compile-time errors: missing semicolon, a misspelled class name, and an unclosed string.' },
        { type: 'code', id: 'fix-runtime', prompt: 'This program compiles but **crashes** when run. Fix it so it prints §Average: 5§. (Hint: count the items correctly.)',
          expected: 'Average: 5',
          starter: j`public class Main {
    public static void main(String[] args) {
        int total = 10;
        int count = 0;
        System.out.println("Average: " + total / count);
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int total = 10;
        int count = 2;
        System.out.println("Average: " + total / count);
    }
}
`, hint: 'Dividing by zero is the crash. What should count be if the total is 10 and the average is 5?' },
        { type: 'code', id: 'fix-logic', prompt: 'This program compiles and runs but has a **logic error**. A 6 by 4 rectangle should have an area of 24 and a perimeter of 20. Fix it so it prints §Area: 24§ then §Perimeter: 20§.',
          expected: 'Area: 24\nPerimeter: 20',
          starter: j`public class Main {
    public static void main(String[] args) {
        int w = 6;
        int h = 4;
        System.out.println("Area: " + (w + h));
        System.out.println("Perimeter: " + w + h * 2);
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int w = 6;
        int h = 4;
        System.out.println("Area: " + (w * h));
        System.out.println("Perimeter: " + (2 * (w + h)));
    }
}
`, hint: 'Area is w times h. For the perimeter, add w and h first, then double it, and use parentheses so the text does not glue numbers together.' },
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
        { type: 'text', md: md`
### Naming rules and declaring vs initializing

Variable names (identifiers) may contain letters, digits, §_§ and §$§, **cannot start with a digit**, cannot contain spaces, and cannot be a Java keyword like §class§ or §int§. Names are case-sensitive: §score§ and §Score§ are different variables. Pick meaningful names (§numStudents§, not §n§).

**Declaring** creates the variable: §int count;§. **Initializing** gives it its first value: §count = 0;§. You can do both at once. A local variable must be given a value before you read it, or the program will not compile.

By convention, constants declared with §final§ are written in ALL_CAPS with underscores: §final int SECONDS_PER_MINUTE = 60;§. Trying to change one later is a compile-time error.
` },
        { type: 'quiz', id: 'q-name', question: 'Which of these is a **legal** Java variable name?',
          choices: ['2ndPlace', 'my score', 'total_points', 'class'], answer: 2,
          explanation: 'Names cannot start with a digit (2ndPlace), contain spaces (my score), or be a keyword (class). total_points is legal.' },
        { type: 'quiz', id: 'q-decl', question: 'Which line of code **declares** a variable but does not initialize it?',
          choices: ['int n = 5;', 'int n;', 'n = 5;', 'final int n = 5;'], answer: 1,
          explanation: 'int n; creates n with no value yet. n = 5; only assigns to an existing variable.' },
        { type: 'quiz', id: 'q-type', question: 'Which declaration will **not compile**?',
          choices: ['double d = 5;', 'int i = 5.5;', 'String s = "5";', 'boolean b = false;'], answer: 1,
          explanation: 'A decimal value cannot be stored in an int without a cast (you would lose information). An int can be stored in a double, so double d = 5; is fine and holds 5.0.' },
        { type: 'predict', id: 'p-vars', question: 'What does this program print?',
          code: j`public class Main {
    public static void main(String[] args) {
        int apples = 3;
        double price = 0.5;
        String fruit = "apples";
        boolean cheap = true;
        System.out.println(apples + " " + fruit + " at " + price + " is cheap: " + cheap);
    }
}
`, answer: '3 apples at 0.5 is cheap: true', explanation: 'Each variable is converted to text and joined with +.' },
        { type: 'code', id: 'fix-types', prompt: 'Three of the declarations below have the wrong type for their value, so the program will not compile. Fix the **types** (do not change the values) so it prints §Zed 17 1.75 true§ on one line.',
          expected: 'Zed 17 1.75 true',
          starter: j`public class Main {
    public static void main(String[] args) {
        int name = "Zed";
        int height = 1.75;
        boolean age = 17;
        boolean ready = true;
        System.out.println(name + " " + age + " " + height + " " + ready);
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        String name = "Zed";
        double height = 1.75;
        int age = 17;
        boolean ready = true;
        System.out.println(name + " " + age + " " + height + " " + ready);
    }
}
`, hint: 'name is text, height has a decimal point, and age is a whole number.' },
        { type: 'code', id: 'constants', prompt: 'Use a **constant** to avoid magic numbers. Declare §final int SECONDS_PER_MINUTE = 60;§ and §final int MINUTES_PER_HOUR = 60;§, then print how many seconds are in 3 hours as §Seconds: 10800§.',
          expected: 'Seconds: 10800',
          starter: j`public class Main {
    public static void main(String[] args) {
        int hours = 3;
        // TODO: declare the two constants and compute the seconds
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int hours = 3;
        final int SECONDS_PER_MINUTE = 60;
        final int MINUTES_PER_HOUR = 60;
        int seconds = hours * MINUTES_PER_HOUR * SECONDS_PER_MINUTE;
        System.out.println("Seconds: " + seconds);
    }
}
` },
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
        { type: 'text', md: md`
### Pitfalls to watch for

**Integer division happens before you convert.** In §double half = 1 / 2;§ the division is between two ints, so it yields §0§, which is then stored as §0.0§. Make one operand a double (§1 / 2.0§) to get §0.5§.

**Remainder with negatives.** §%§ takes the sign of the left operand: §-7 % 3§ is §-1§. On the AP exam the left side is almost always non-negative. Useful patterns:

- §n % 2 == 0§ means n is even; §n % 10§ is the last digit; §n / 10§ drops the last digit.
- §x % 5§ is always between 0 and 4 (for non-negative x), handy for wrapping around.

**Dividing by zero.** §5 / 0§ with ints crashes with an ArithmeticException. With doubles, §5.0 / 0§ gives §Infinity§ instead of crashing.

**Strings and +.** Evaluation goes left to right. §1 + 2 + "x"§ is §"3x"§, but §"x" + 1 + 2§ is §"x12"§. Use parentheses to force the math first: §"x" + (1 + 2)§ is §"x3"§.
` },
        { type: 'predict', id: 'p-concat', question: 'What does this print? Remember that §+§ is evaluated left to right.',
          code: j`public class Main {
    public static void main(String[] args) {
        System.out.println(1 + 2 + "x" + 1 + 2);
        System.out.println("y" + (1 + 2));
    }
}
`, answer: '3x12\ny3', explanation: '1 + 2 is 3 (still numbers), then "3x", then 1 and 2 are glued on as text. The second line adds inside parentheses first.' },
        { type: 'predict', id: 'p-mixed', question: 'What does this print?',
          code: j`public class Main {
    public static void main(String[] args) {
        System.out.println(7 / 2 + 7 % 2 + 7 / 2.0);
    }
}
`, answer: '7.5', explanation: '7 / 2 is 3, 7 % 2 is 1, and 7 / 2.0 is 3.5, so 3 + 1 + 3.5 = 7.5.' },
        { type: 'quiz', id: 'q-neg', question: 'What does §System.out.println(-7 % 3);§ print?',
          choices: ['1', '-1', '2', '-2'], answer: 1, explanation: 'The result takes the sign of the left operand: -7 = -2 * 3 + (-1), so the remainder is -1.' },
        { type: 'quiz', id: 'q-zero', question: 'What does §System.out.println(5.0 / 0);§ do?',
          choices: ['Crashes with ArithmeticException', 'Prints 0.0', 'Prints Infinity', 'Does not compile'], answer: 2, explanation: 'Only integer division by zero throws. Floating point division by zero gives Infinity.' },
        { type: 'code', id: 'fix-pct', prompt: '3 out of 4 questions were correct, so the program should print §Percent: 75§. It prints 0 instead because of integer division. Fix it **without** using doubles (reorder the arithmetic).',
          expected: 'Percent: 75',
          starter: j`public class Main {
    public static void main(String[] args) {
        int correct = 3;
        int total = 4;
        int pct = correct / total * 100;
        System.out.println("Percent: " + pct);
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int correct = 3;
        int total = 4;
        int pct = correct * 100 / total;
        System.out.println("Percent: " + pct);
    }
}
`, hint: 'Multiply by 100 first, so the division no longer throws away everything.' },
        { type: 'code', id: 'digits', prompt: 'Use §/§ and §%§ to split §n§ into its last digit and the rest. For §n = 4721§ print §Rest: 472§ then §Last digit: 1§.',
          expected: 'Rest: 472\nLast digit: 1',
          starter: j`public class Main {
    public static void main(String[] args) {
        int n = 4721;
        // TODO
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int n = 4721;
        System.out.println("Rest: " + n / 10);
        System.out.println("Last digit: " + n % 10);
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
        { type: 'text', md: md`
### Declaring vs assigning, and common slips

- The **left side** of §=§ must be a variable: §score = 5;§ works but §5 = score;§ does not compile.
- You can declare a variable only once in a scope. Later changes are plain assignments (no type): §int x = 1; x = 2;§
- A local variable that was never given a value cannot be read. §int total; System.out.println(total);§ is a compile error.
- The type of the value must fit the variable: §int n = 2.5;§ is a compile error ("lossy conversion"), but §double d = 2;§ is fine.

When tracing code, keep a small table of every variable and update it after each line. That is exactly what the computer does.
` },
        { type: 'predict', id: 'p-trace4', question: 'Trace the variables. What does this program print?',
          code: j`public class Main {
    public static void main(String[] args) {
        int a = 4;
        int b = a * 2;
        a = b - a;
        b = a + b;
        a = a * b;
        System.out.println(a + " " + b);
    }
}
`, answer: '48 12', explanation: 'a=4,b=8 -> a=8-4=4 -> b=4+8=12 -> a=4*12=48.' },
        { type: 'quiz', id: 'q-legal', question: 'Which assignment is **not** legal Java (assuming §int x§ and §double y§ are already declared and initialized)?',
          choices: ['y = x;', 'x = y;', 'x = x + 1;', 'y = y * 2;'], answer: 1,
          explanation: 'Storing a double into an int would lose the fractional part, so the compiler rejects x = y; without a cast. y = x; widens safely.' },
        { type: 'code', id: 'fix-assign', prompt: 'This program has two assignment mistakes. Fix them so it prints §Score: 15§.',
          expected: 'Score: 15',
          starter: j`public class Main {
    public static void main(String[] args) {
        int score;
        10 = score;
        score = score + 5;
        System.out.println("Score: " + score);
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int score;
        score = 10;
        score = score + 5;
        System.out.println("Score: " + score);
    }
}
`, hint: 'The variable goes on the left of the = sign.' },
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
        { type: 'text', md: md`
### More casting rules

- **Widening** (int to double) happens automatically: §double d = 5;§ stores §5.0§.
- **Narrowing** (double to int) needs an explicit cast, and it **truncates toward zero**: §(int) 3.99§ is §3§ and §(int) -3.99§ is §-3§.
- In a mixed expression, the int is promoted to double before the operator runs: §1 + 2.5§ is §3.5§.
- A cast applies only to the value right after it. §(double) 1 / 2§ is §0.5§ but §(double) (1 / 2)§ is §0.0§.

### Limits of int and double

- §int§ overflow wraps around silently. §Integer.MAX_VALUE + 1§ equals §Integer.MIN_VALUE§. Multiplication can overflow too: §100000 * 100000§ does not give 10 billion.
- §double§ stores about 15 to 16 significant digits, and many decimals (like 0.1) cannot be stored exactly in binary. So §0.1 + 0.2§ prints §0.30000000000000004§. For this reason, you should never test doubles for exact equality; compare whether they are very close instead.
` },
        { type: 'predict', id: 'p-cast5', question: 'What does this program print?',
          code: j`public class Main {
    public static void main(String[] args) {
        System.out.println((int) -3.7);
        System.out.println((int) (3.7 + 0.5));
        System.out.println((double) 1 / 2);
        System.out.println((double) (1 / 2));
        System.out.println(1 + 2.5);
    }
}
`, answer: '-3\n4\n0.5\n0.0\n3.5', explanation: 'Casting to int truncates toward zero. The cast binds tighter than /, so (double) 1 / 2 is 1.0 / 2. With the parentheses, 1 / 2 is integer division first.' },
        { type: 'predict', id: 'p-prec5', question: 'What does this program print? (Think about the limits of the types.)',
          code: j`public class Main {
    public static void main(String[] args) {
        System.out.println(0.1 + 0.2);
        System.out.println(Integer.MAX_VALUE + 1 == Integer.MIN_VALUE);
        System.out.println(100000 * 100000);
    }
}
`, answer: '0.30000000000000004\ntrue\n1410065408', explanation: 'Doubles cannot store 0.1 exactly. The int overflow wraps around. 10 billion does not fit in 32 bits; the low 32 bits are 1410065408.' },
        { type: 'quiz', id: 'q-cast3', question: 'What is printed by §int x = (int) 7.9 + (int) 2.9; System.out.println(x);§?',
          choices: ['10', '9', '11', '10.8'], answer: 1, explanation: 'Each cast truncates first: 7 + 2 = 9.' },
        { type: 'quiz', id: 'q-over', question: 'What does §System.out.println(Integer.MAX_VALUE + 1);§ print?',
          choices: ['2147483648', 'A compile error', 'A very large positive number', '-2147483648'], answer: 3, explanation: 'The int overflows and wraps around to Integer.MIN_VALUE, which is -2147483648.' },
        { type: 'code', id: 'fix-pct5', prompt: 'A student got 4 out of 5 correct. This should print §Percent: 80.0§ but prints §Percent: 0.0§. Fix it using a **cast** in the right place.',
          expected: 'Percent: 80.0',
          starter: j`public class Main {
    public static void main(String[] args) {
        int correct = 4;
        int total = 5;
        double pct = (double) (correct / total) * 100;
        System.out.println("Percent: " + pct);
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int correct = 4;
        int total = 5;
        double pct = (double) correct / total * 100;
        System.out.println("Percent: " + pct);
    }
}
`, hint: 'The cast must apply to correct (or total), not to the already-divided result.' },
        { type: 'code', id: 'round-neg', prompt: 'Round both numbers to the nearest int with casts (positive: add 0.5, negative: subtract 0.5). Print §3 -3§ on one line.',
          expected: '3 -3',
          starter: j`public class Main {
    public static void main(String[] args) {
        double a = 2.6;
        double b = -2.6;
        // TODO
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        double a = 2.6;
        double b = -2.6;
        int ra = (int) (a + 0.5);
        int rb = (int) (b - 0.5);
        System.out.println(ra + " " + rb);
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
        { type: 'text', md: md`
### ++ and -- in detail

§x++§ and §x--§ add or subtract exactly one. Written as their own statement they mean the same as §x += 1§ and §x -= 1§. Loops use them constantly.

Two surprises:

- **Compound operators include an implicit cast.** §int x = 10; x *= 1.5;§ works and leaves §x§ equal to §15§. And §x += 0.9;§ on §int x = 10§ stays §10§, because 10.9 is truncated back to an int. Plain §x = x + 0.9;§ would not even compile.
- **Typos can compile.** §x =+ 1;§ is valid Java meaning "assign positive 1", not "add one". Write §+=§, with the operator first.
` },
        { type: 'predict', id: 'p-comp6', question: 'Trace the variable. What does this program print?',
          code: j`public class Main {
    public static void main(String[] args) {
        int x = 10;
        x *= 1.5;
        x += 0.9;
        x /= 4;
        x++;
        x %= 3;
        System.out.println(x);
    }
}
`, answer: '1', explanation: '10 -> 15 -> 15 (15.9 truncated) -> 3 (15 / 4) -> 4 -> 4 % 3 = 1.' },
        { type: 'quiz', id: 'q-comp3', question: 'After §double d = 10; d /= 4;§ what is d?',
          choices: ['2', '2.0', '2.5', '3.0'], answer: 2, explanation: 'd is a double, so the division is floating point: 10.0 / 4 = 2.5.' },
        { type: 'quiz', id: 'q-comp4', question: 'Which statement is **equivalent** to §count = count - 1;§?',
          choices: ['count =- 1;', 'count--;', 'count -= -1;', '--count--;'], answer: 1, explanation: 'count-- subtracts one. count =- 1 assigns negative one, and count -= -1 would add one.' },
        { type: 'code', id: 'fix-comp', prompt: 'A video game player starts with 3 lives. They gain 2, then lose 1, then the bonus doubles their lives. This should print §Lives: 8§ but there are two operator mistakes. Fix them.',
          expected: 'Lives: 8',
          starter: j`public class Main {
    public static void main(String[] args) {
        int lives = 3;
        lives =+ 2;
        lives--;
        lives =* 2;
        System.out.println("Lives: " + lives);
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int lives = 3;
        lives += 2;
        lives--;
        lives *= 2;
        System.out.println("Lives: " + lives);
    }
}
`, hint: 'The operator comes before the equals sign: += and *=.' },
        { type: 'code', id: 'steps', prompt: 'Start with §n = 100§. Use **only** compound operators and §++§ / §--§ (no plain §n = n ...§) to apply: divide by 7, add 10, then increment, then take the remainder when divided by 10. Print §n§ (it should be 5).',
          expected: '5',
          starter: j`public class Main {
    public static void main(String[] args) {
        int n = 100;
        // TODO
        System.out.println(n);
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int n = 100;
        n /= 7;
        n += 10;
        n++;
        n %= 10;
        System.out.println(n);
    }
}
`, hint: '100 / 7 is 14, then 24, then 25, then 25 % 10 is 5.' },
      ],
    },
  ] as Lesson[]).concat(unit1b),
};
