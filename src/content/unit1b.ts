import type { Lesson, QuizBlock, PredictBlock, TextBlock } from './types';
import { md } from './md';

const j = String.raw;

const t = (s: string): TextBlock => ({ type: 'text', md: s });
const q = (id: string, question: string, choices: string[], answer: number, explanation?: string): QuizBlock =>
  ({ type: 'quiz', id, question, choices, answer, explanation });
/** Predict block whose program is a Main class wrapping `body` (statements in main). `extra` adds members before main. */
const p = (id: string, question: string, body: string, answer: string, explanation?: string, extra = ''): PredictBlock => ({
  type: 'predict', id, question, answer, explanation,
  code: 'public class Main {\n' + (extra ? extra + '\n' : '') + '    public static void main(String[] args) {\n'
    + body.split('\n').map((l) => '        ' + l).join('\n') + '\n    }\n}\n',
});
const main = (body: string) => 'public class Main {\n    public static void main(String[] args) {\n'
  + body.split('\n').map((l) => '        ' + l).join('\n') + '\n    }\n}\n';

// Unit 1 topics 1.7 onward (CSAwesome2 order). Original wording; see the About page for attribution.

const l17: Lesson = {
  id: '1-7',
  title: 'APIs and Libraries',
  blocks: [
    t(md`
You do not have to build everything yourself. A **library** is a collection of ready-made classes, and its **API** (application programming interface) is the documentation that tells you what each class offers: the class names, their constructors, and their methods.

Java groups classes into **packages**. Classes in §java.lang§, such as §String§, §Math§ and §Integer§, are available automatically. Classes in other packages need an **import** statement at the top of the file:

§§§java
import java.util.Random;   // now the Random class can be used

public class Main {
    public static void main(String[] args) {
        Random gen = new Random();
        System.out.println(gen.nextInt(6));   // 0 to 5
    }
}
§§§

To use any class you need to know three things from its API: how to **create** it (constructors), what it can **do** (methods), and what each method needs and gives back (parameters and return type). The next lessons teach you to read exactly that.
`),
    q('q-lib', 'What is an **API**?', ['A program that compiles Java code', 'Documentation describing the classes, constructors and methods a library provides', 'A type of loop', 'A variable that holds a class'], 1,
      'An API tells you how to use the classes in a library without needing to see their source code.'),
    q('q-import', 'Which class can be used **without** an import statement?', ['java.util.Random', 'java.util.Scanner', 'String', 'java.util.ArrayList'], 2,
      'String lives in java.lang, which Java imports for you automatically.'),
    q('q-pkg', 'What is a **package**?', ['A group of related classes', 'A kind of method', 'A compiled program', 'A comment style'], 0),
    { type: 'code', id: 'use-random', prompt: 'Import §java.util.Random§, create a Random object, and print a random number from 0 to 9. Run it a few times.', completeOnRun: true,
      starter: j`// TODO: add the import line above the class
public class Main {
    public static void main(String[] args) {
        // TODO: create a Random object and print gen.nextInt(10)
    }
}
`,
      solution: j`import java.util.Random;

public class Main {
    public static void main(String[] args) {
        Random gen = new Random();
        System.out.println(gen.nextInt(10));
    }
}
`, hint: 'Random gen = new Random(); then gen.nextInt(10).' },
    q('q-missing', 'A program uses §Random§ without importing it. What happens?', ['It runs fine', 'A compile-time error: the compiler cannot find the class', 'It prints null', 'A random number is chosen anyway'], 1),
  ],
};

const l18: Lesson = {
  id: '1-8',
  title: 'Documentation with Comments and Preconditions',
  blocks: [
    t(md`
**Comments** are notes for humans. The compiler ignores them.

- §// text§ comments out the rest of one line.
- §/* text */§ can span several lines.
- §/** text */§ is a **documentation comment** that describes the class or method right after it. It often uses tags like §@param§ and §@return§.

§§§java
/**
 * Returns the area of a rectangle.
 * Precondition: width > 0 and height > 0
 * @param width the width
 * @param height the height
 * @return width times height
 */
§§§

A **precondition** is something that must be true *before* a method is called for it to work correctly. A **postcondition** is what is guaranteed to be true *after* it finishes. The caller is responsible for meeting the precondition. If it is broken, the method may behave unpredictably, and you cannot blame the method.

Good comments say *why* or *what*, not just repeat the code.
`),
    p('p-comment', 'What does this program print?', j`System.out.println("A");
// System.out.println("B");
/* System.out.println("C");
   System.out.println("D"); */
System.out.println("E");`, 'A E', 'B, C and D are all inside comments. Each println prints on its own line, so the output is A, then E.'),
    q('q-comment1', 'Which is a valid multi-line comment?', ['// line one // line two', '/* line one and line two */', '<!-- comment -->', '** comment **'], 1),
    q('q-pre', 'A method says "Precondition: n > 0". Who is responsible for making sure n > 0?', ['The compiler', 'The code that calls the method', 'The method, automatically', 'Nobody'], 1,
      'The caller must satisfy the precondition. The method is only guaranteed to work when it is true.'),
    q('q-post', 'What is a **postcondition**?', ['What must be true before a method runs', 'What is guaranteed to be true after a method finishes', 'A comment placed at the bottom of the file', 'A compile error'], 1),
    { type: 'code', id: 'fix-comments', prompt: 'The comments here are broken, so the program fails to compile or prints too much. Fix the comments so it prints exactly §Start§ then §End§.',
      expected: 'Start\nEnd',
      starter: j`public class Main {
    public static void main(String[] args) {
        System.out.println("Start");
        /* This debug line should be hidden
        System.out.println("debugging...");
        System.out.println("End");
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        System.out.println("Start");
        /* This debug line should be hidden
        System.out.println("debugging..."); */
        System.out.println("End");
    }
}
`, hint: 'The /* comment never closes. Close it after the debugging line.' },
    { type: 'code', id: 'doc-comment', prompt: 'Add a one-line §//§ comment above each of the two print statements saying what it does, then run.', completeOnRun: true,
      starter: j`public class Main {
    public static void main(String[] args) {
        System.out.println("Area of a 4 by 5 rectangle:");
        System.out.println(4 * 5);
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        // label for the output
        System.out.println("Area of a 4 by 5 rectangle:");
        // compute and print the area
        System.out.println(4 * 5);
    }
}
`, hint: 'Start each comment line with //.' },
    q('q-pre2', 'A method §double sqrtOf(double x)§ has the precondition §x >= 0§. Which call violates it?', ['sqrtOf(0)', 'sqrtOf(16.0)', 'sqrtOf(-4.0)', 'sqrtOf(2.5)'], 2),
  ],
};

const l19: Lesson = {
  id: '1-9',
  title: 'Method Signatures',
  blocks: [
    t(md`
A **method** is a named block of code that does one job. Its **signature** is the method name plus its parameter list (the types and order of its parameters). The method **header** also includes the return type:

§§§java
public static double pow(double base, double exponent)
//                 ^ return type  ^ name  ^ parameters
§§§

- The **return type** says what kind of value comes back. §void§ means nothing comes back.
- **Parameters** are the inputs. When you call the method, the values you pass are called **arguments**. They must match the parameter types in number, order and type.
- A method that returns a value can be used inside an expression: §int m = Math.max(3, 8);§. A §void§ method is just called as a statement.

**Overloading** means several methods share a name but have different parameter lists. Java picks the one whose parameters match the call. §Math.abs§ has versions for §int§ and §double§.
`),
    p('p-sig1', 'What does this print?', 'System.out.println(Math.max(3, 7.5));', '7.5', 'The call matches max(double, double), so the int 3 is widened to 3.0 and the larger value 7.5 is returned.'),
    p('p-sig2', 'What does this print?', 'System.out.println(Math.abs(-9) + Math.abs(-1.5));', '10.5', 'abs(-9) is the int 9, abs(-1.5) is the double 1.5. int + double gives the double 10.5.'),
    q('q-sig1', 'In §public static int add(int a, int b)§, what is the return type?', ['add', 'int', 'static', 'public'], 1),
    q('q-sig2', 'Which call matches §public static double average(int a, int b)§?', ['average(3)', 'average(3, 4)', 'average("3", "4")', 'average(3.5, 4.5)'], 1,
      'Two int arguments are needed. 3.5 is a double and cannot be passed to an int parameter without a cast.'),
    q('q-void', 'Which statement is valid when §printLine(String s)§ is a §void§ method?', ['int x = printLine("hi");', 'printLine("hi");', 'String y = printLine;', 'printLine();'], 1,
      'A void method returns nothing, so it cannot be assigned. It must be called with exactly its parameters.'),
    q('q-over', 'What is **method overloading**?', ['Calling a method too many times', 'Two or more methods with the same name but different parameter lists', 'A method that calls itself', 'A method with no return type'], 1),
    q('q-over2', 'Which pair of methods is a valid overload in the same class?', ['void go(int a) and int go(int b)', 'void go(int a) and void go(double a)', 'void go(int a) and void go(int a)', 'void go(int a) and void stop(int a)'], 1,
      'Overloads need different parameter lists. A different return type or parameter name alone is not enough.'),
    { type: 'code', id: 'sig-use', prompt: 'Use §Math.max§ and §Math.min§ to print the largest and smallest of 12, 7 and 30 on separate lines (30 then 7).',
      expected: '30\n7',
      starter: j`public class Main {
    public static void main(String[] args) {
        // max and min take two arguments; combine calls for three values
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        System.out.println(Math.max(12, Math.max(7, 30)));
        System.out.println(Math.min(12, Math.min(7, 30)));
    }
}
`, hint: 'Math.max(a, Math.max(b, c)) works.' },
  ],
};

const l110: Lesson = {
  id: '1-10',
  title: 'Calling Class Methods',
  blocks: [
    t(md`
Some methods belong to the **class itself** rather than to an object. They are marked §static§, and you call them with the class name and a dot:

§§§java
double r = Math.sqrt(49);                 // 7.0
int n = Integer.parseInt("42");           // 42
String s = String.valueOf(3.5);           // "3.5"
§§§

No object is needed, so there is no §new§. A class method that returns a value can be used in an expression, stored in a variable, or printed. If it returns §void§, calling it is a whole statement.

Useful class methods and constants you will see on the exam:

| Call | Result |
|---|---|
| §Integer.parseInt("12")§ | the int 12 |
| §Double.parseDouble("2.5")§ | the double 2.5 |
| §Integer.MAX_VALUE§ | the largest int, 2147483647 |
| §Integer.MIN_VALUE§ | the smallest int |
| §String.valueOf(7)§ | the String "7" |
`),
    p('p-cm1', 'What does this print?', 'System.out.println(Integer.parseInt("40") + 2);', '42', 'parseInt turns the String into the int 40, then 40 + 2 is 42.'),
    p('p-cm2', 'What does this print?', 'System.out.println(String.valueOf(4) + 4);', '44', 'valueOf(4) is the String "4". String + int concatenates to "44".'),
    p('p-cm3', 'What does this print?', 'System.out.println(Math.pow(2, 5));', '32.0', 'Math.pow returns a double.'),
    q('q-cm1', 'Why can you write §Math.sqrt(9)§ without first creating a Math object?', ['Math is a variable', 'sqrt is a static (class) method', 'Math is imported', 'sqrt returns void'], 1),
    q('q-cm2', 'Which line correctly stores 3.5 from the String §"3.5"§?', ['double d = Double.parseDouble("3.5");', 'double d = "3.5";', 'double d = new Double("3.5").parse;', 'int d = Double.parseDouble("3.5");'], 0,
      'An int cannot hold a double result without a cast, and a String cannot be assigned to a double directly.'),
    q('q-cm3', 'What is the type of §Math.sqrt(16)§?', ['int', 'double', 'String', 'void'], 1),
    { type: 'code', id: 'cm-use', prompt: 'The String §age§ holds digits. Convert it with a class method and print the age five years from now (§35§).',
      expected: '35',
      starter: j`public class Main {
    public static void main(String[] args) {
        String age = "30";
        // TODO: convert and print age + 5
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        String age = "30";
        System.out.println(Integer.parseInt(age) + 5);
    }
}
`, hint: 'Integer.parseInt(age) + 5' },
    { type: 'code', id: 'cm-big', prompt: 'Print §Integer.MAX_VALUE§ and then that value plus one. Notice what happens, and run it.', completeOnRun: true,
      starter: j`public class Main {
    public static void main(String[] args) {
        System.out.println(Integer.MAX_VALUE);
        // TODO: print Integer.MAX_VALUE + 1
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        System.out.println(Integer.MAX_VALUE);
        System.out.println(Integer.MAX_VALUE + 1);
    }
}
`, hint: 'The sum overflows and wraps around to a negative number.' },
  ],
};

const l113: Lesson = {
  id: '1-13',
  title: 'Constructors',
  blocks: [
    t(md`
A **constructor** runs when you write §new§. It sets up the new object's starting state. Its name is the class name, and a class may offer several constructors with different parameter lists (they are **overloaded**). Java chooses the one that matches your arguments by **number, order and type**.

§§§java
Dot a = new Dot();                 // no arguments
Dot b = new Dot(10, -5);           // x and y
Dot c = new Dot("orange");         // a color
Dot d = new Dot(10, -5, "orange"); // all three
§§§

The variable on the left does not hold the object itself. It holds a **reference** to it. Two things follow:

- **Aliasing**: §Dot e = d;§ copies the reference, so §e§ and §d§ refer to the *same* object. Changing one changes what the other sees.
- §null§ is a reference to nothing. Calling a method on §null§ throws a §NullPointerException§.

Strings are objects too. §String s = new String("hi");§ calls a String constructor, but you will almost always write a **literal**: §String s = "hi";§.
`),
    p('p-con1', 'What does this print?', j`Dot a = new Dot(3, 4);
System.out.println(a.getX() + " " + a.getY());`, '3.0 4.0', 'getX and getY return doubles, so they print with a decimal point.'),
    p('p-alias', 'What does this print?', j`Dot a = new Dot(1, 1);
Dot b = a;
b.moveTo(9, 2);
System.out.println(a.getX());`, '9.0', 'b is an alias of a: both references point to the same object, so moving b moved a.'),
    p('p-newstr', 'What does this print?', j`String a = new String("cat");
String b = new String("cat");
System.out.println(a == b);
System.out.println(a.equals(b));`, 'false true', '== compares references, and two separate objects were created. equals compares the characters.'),
    q('q-con1', 'Which call does **not** match any Dot constructor?', ['new Dot()', 'new Dot(2, 3)', 'new Dot("red")', 'new Dot("red", 2, 3)'], 3, 'The color must come last: new Dot(2, 3, "red").'),
    q('q-con2', 'What is a reference variable?', ['A variable that holds an object itself', 'A variable that holds the address of an object', 'A variable that never changes', 'A variable of type int'], 1),
    q('q-con3', 'After §Dot p = new Dot(); Dot r = p;§, how many Dot objects exist?', ['0', '1', '2', 'It depends'], 1, 'Only one new was executed, so there is only one object with two references.'),
    q('q-null', 'What happens at runtime? §Dot d = null; d.forward(10);§', ['The dot moves 10', 'A NullPointerException is thrown', 'A compile error', 'Nothing, silently'], 1),
    { type: 'code', id: 'con-make', dot: true, minDotMoves: 3, prompt: 'Create three Dots using three **different** constructors (one with a position, one with a color, one with both) and move each at least once.',
      starter: j`public class Main {
    public static void main(String[] args) {
        // TODO: make three Dots and move each of them
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        Dot a = new Dot(-60, 0);
        Dot b = new Dot("orange");
        Dot c = new Dot(60, 0, "cyan");
        a.forward(40);
        b.forward(40);
        c.forward(40);
    }
}
`, hint: 'new Dot(-60, 0), new Dot("orange"), new Dot(60, 0, "cyan").' },
    { type: 'code', id: 'con-alias', prompt: 'Make §b§ an alias of §a§ so that moving §b§ to (5, 5) makes §a§ print §5.0 5.0§.',
      expected: '5.0 5.0',
      starter: j`public class Main {
    public static void main(String[] args) {
        Dot a = new Dot(0, 0);
        Dot b = new Dot(1, 1);
        // TODO: make b refer to the same object as a
        b.moveTo(5, 5);
        System.out.println(a.getX() + " " + a.getY());
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        Dot a = new Dot(0, 0);
        Dot b = a;
        b.moveTo(5, 5);
        System.out.println(a.getX() + " " + a.getY());
    }
}
`, hint: 'Assign the reference: b = a;' },
  ],
};

const l114: Lesson = {
  id: '1-14',
  title: 'Calling Instance Methods',
  blocks: [
    t(md`
An **instance method** belongs to an object. You call it with the object's name, a dot, and the method name: §object.method(arguments)§. The method works on that particular object's data.

§§§java
String s = "Hello";
int n = s.length();            // 5
String u = s.toUpperCase();    // "HELLO"
§§§

Two kinds to watch for:

- **Non-void** methods return a value you can store or print (§length()§, §getX()§).
- **void** methods do something but return nothing (§forward(10)§, §moveTo(1, 2)§).

Also remember:

- The arguments must match the signature, and the object must not be §null§.
- A method call can be used where a value is expected, and the dot can be chained: §s.toUpperCase().substring(1, 3)§ calls §substring§ on the String that §toUpperCase§ returned.
- String methods never change the original String (it is **immutable**). Save the result if you want to keep it.
`),
    p('p-im1', 'What does this print?', j`String s = "Hello";
s.toUpperCase();
System.out.println(s);`, 'Hello', 'The result of toUpperCase() was thrown away. Strings are immutable, so s is unchanged.'),
    p('p-im2', 'What does this print?', 'System.out.println("Hello".toUpperCase().substring(1, 3));', 'EL', 'toUpperCase gives "HELLO", then substring(1, 3) takes indices 1 and 2: E and L.'),
    p('p-im3', 'What does this print?', j`Dot d = new Dot(2, 3);
d.moveTo(d.getY(), d.getX());
System.out.println(d.getX() + ", " + d.getY());`, '3.0, 2.0', 'The arguments are evaluated first: getY() is 3.0 and getX() is 2.0, so the dot moves to (3.0, 2.0).'),
    q('q-im1', 'Which call is an instance method call?', ['Math.sqrt(4)', 'Integer.parseInt("4")', '"four".length()', 'Math.PI'], 2),
    q('q-im2', 'Given §String w = "banana";§, what does §w.indexOf("n")§ return?', ['1', '2', '3', '-1'], 1, 'b is 0, a is 1, n is 2.'),
    q('q-im3', 'Which statement stores the length of §name§?', ['int len = name.length;', 'int len = name.length();', 'int len = length(name);', 'int len = name(length);'], 1),
    q('q-im4', 'Why does §name.substring(2)§ on its own line (no assignment) do nothing useful?', ['substring is void', 'It returns a new String that is never stored or printed', 'Strings cannot use substring', 'It causes an exception'], 1),
    { type: 'code', id: 'im-shout', prompt: 'Print the String §word§ in upper case, followed by its length, like §JAVA 4§.',
      expected: 'JAVA 4',
      starter: j`public class Main {
    public static void main(String[] args) {
        String word = "java";
        // TODO: print upper case word, a space, then its length
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        String word = "java";
        System.out.println(word.toUpperCase() + " " + word.length());
    }
}
`, hint: 'Use + to join pieces, with " " between them.' },
    { type: 'code', id: 'im-dot', dot: true, minDotMoves: 3, prompt: 'Use instance methods on one Dot to draw a triangle: forward, turn, repeated.',
      starter: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot("violet");
        // TODO: three sides, turning right 120 degrees after each
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot("violet");
        d.forward(60);
        d.turnRight(120);
        d.forward(60);
        d.turnRight(120);
        d.forward(60);
        d.turnRight(120);
    }
}
`, hint: 'forward(60) then turnRight(120), three times.' },
  ],
};

const l116: Lesson = {
  id: '1-16',
  title: 'Unit Summary 1a (1.1 - 1.6)',
  blocks: [
    t(md`
### What you should know

**1.1 Algorithms and programs.** An algorithm is a sequence of steps. Java code lives in a class, starts in §main§, and is checked by the **compiler**. Know the three error kinds: **syntax/compile** errors (rules broken), **run-time** errors (the program crashes, such as dividing by zero), and **logic** errors (it runs but gives the wrong answer).

**1.2 Variables and types.** A variable has a type, a name and a value. Primitive types: §int§, §double§, §boolean§. §String§ is a class. Declare with a type (§int count = 0;§). Use §final§ for constants.

**1.3 Expressions and output.** §+ - * / %§ with integer division truncating (§7 / 2§ is §3§) and §%§ giving the remainder. Operators follow precedence (§* / %§ before §+ -§). §print§ stays on the line, §println§ ends it. String + anything concatenates.

**1.4 Assignment and input.** §=§ stores the right side's value in the variable on the left. The right side is evaluated first. Variables must be declared and given a value before use.

**1.5 Casting and ranges.** §(double)§ and §(int)§ change the type of a value. §(int)§ truncates toward zero. §int§ holds about plus or minus 2.1 billion and **overflows** (wraps) beyond that. Round with §(int)(x + 0.5)§ for positives and §(int)(x - 0.5)§ for negatives.

**1.6 Compound assignment.** §+= -= *= /= %=§ and §++ --§ are shortcuts: §x += 3§ means §x = x + 3§.
`),
    q('s-q1', 'Which is a **logic error**?', ['Forgetting a semicolon', 'Dividing by zero with ints at run time', 'Computing an average as §a + b / 2§ when you meant §(a + b) / 2§', 'Misspelling §System§'], 2,
      'The program compiles and runs but computes the wrong value, which is the definition of a logic error.'),
    q('s-q2', 'What is the value of §10 % 4 + 10 / 4§?', ['2', '4', '4.5', '5'], 1, '10 % 4 is 2, 10 / 4 is 2 (integer division). Total 4.'),
    q('s-q3', 'What does §(int) 7.9§ produce?', ['8', '7', '7.9', 'A compile error'], 1),
    q('s-q4', 'After §int x = 4; x *= 3; x -= 5;§ what is x?', ['7', '12', '-1', '17'], 0),
    p('s-p1', 'What does this print?', j`int a = 5;
double b = a / 2;
System.out.println(b);`, '2.0', 'a / 2 is integer division, giving 2. Only then is it stored as the double 2.0.'),
  ],
};

const l117: Lesson = {
  id: '1-17',
  title: 'Toggle Code Practice 1a',
  blocks: [
    t(md`
Each program below has something wrong. Read it, predict the problem, then fix it and run. Match the expected output exactly. These are the kinds of bugs you will chase in real programs.
`),
    { type: 'code', id: 'tg-1', prompt: '**Fix the syntax.** It should print §Total: 12§.', expected: 'Total: 12',
      starter: j`public class Main {
    public static void main(String[] args) {
        int a = 5
        int b = 7;
        System.out.println("Total: " + (a + b);
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        int a = 5;
        int b = 7;
        System.out.println("Total: " + (a + b));
    }
}
`, hint: 'Check the end of the declaration line and the parentheses on the print.' },
    { type: 'code', id: 'tg-2', prompt: '**Fix the types.** It should print §3.5§ (the average of 3 and 4).', expected: '3.5',
      starter: j`public class Main {
    public static void main(String[] args) {
        int x = 3;
        int y = 4;
        int avg = (x + y) / 2;
        System.out.println(avg);
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        int x = 3;
        int y = 4;
        double avg = (x + y) / 2.0;
        System.out.println(avg);
    }
}
`, hint: 'Use a double variable, and divide by 2.0.' },
    { type: 'code', id: 'tg-3', prompt: '**Fix the order.** The lines are mixed up. Reorder them so it prints §15§.', expected: '15',
      starter: j`public class Main {
    public static void main(String[] args) {
        System.out.println(total);
        total += 5;
        int total = 10;
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        int total = 10;
        total += 5;
        System.out.println(total);
    }
}
`, hint: 'Declare first, change second, print last.' },
    { type: 'code', id: 'tg-4', prompt: '**Fix the logic.** The percent should print §75§ (3 of 4).', expected: '75',
      starter: j`public class Main {
    public static void main(String[] args) {
        int correct = 3;
        int total = 4;
        int percent = correct / total * 100;
        System.out.println(percent);
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        int correct = 3;
        int total = 4;
        int percent = correct * 100 / total;
        System.out.println(percent);
    }
}
`, hint: '3 / 4 is 0 in integer division. Multiply first.' },
    { type: 'code', id: 'tg-5', prompt: '**Fix the overflow.** It should print §3000000000§.', expected: '3000000000',
      starter: j`public class Main {
    public static void main(String[] args) {
        int big = 1500000000;
        int doubled = big * 2;
        System.out.println(doubled);
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        long big = 1500000000L;
        long doubled = big * 2;
        System.out.println(doubled);
    }
}
`, hint: 'An int cannot hold 3 billion. Try the long type.' },
  ],
};

const l118: Lesson = {
  id: '1-18',
  title: 'Coding Practice 1a',
  blocks: [
    t(md`Write each program from scratch (a starter is given). Check your output against the expected text.`),
    { type: 'code', id: 'cp-1', prompt: 'Print a three-line banner exactly:\n\n§*****§\n§JAVA§\n§*****§', expected: '*****\nJAVA\n*****',
      starter: j`public class Main {
    public static void main(String[] args) {
        // TODO
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        System.out.println("*****");
        System.out.println("JAVA");
        System.out.println("*****");
    }
}
`, hint: 'Three println calls.' },
    { type: 'code', id: 'cp-2', prompt: 'A rectangle is 8 by 5. Store the sides in variables and print §Area: 40§ and §Perimeter: 26§.', expected: 'Area: 40\nPerimeter: 26',
      starter: j`public class Main {
    public static void main(String[] args) {
        int width = 8;
        int height = 5;
        // TODO
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        int width = 8;
        int height = 5;
        System.out.println("Area: " + (width * height));
        System.out.println("Perimeter: " + (2 * width + 2 * height));
    }
}
`, hint: 'Parenthesize the arithmetic inside the string concatenation.' },
    { type: 'code', id: 'cp-3', prompt: 'Convert §200§ minutes into hours and minutes. Print §3 hours 20 minutes§ using §/§ and §%§.', expected: '3 hours 20 minutes',
      starter: j`public class Main {
    public static void main(String[] args) {
        int totalMinutes = 200;
        // TODO
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        int totalMinutes = 200;
        System.out.println(totalMinutes / 60 + " hours " + totalMinutes % 60 + " minutes");
    }
}
`, hint: '200 / 60 is the hours, 200 % 60 the leftover.' },
    { type: 'code', id: 'cp-4', prompt: 'Convert 212 degrees Fahrenheit to Celsius with §(f - 32) * 5 / 9§. Cast the result so the whole number §100§ prints (no decimal).', expected: '100',
      starter: j`public class Main {
    public static void main(String[] args) {
        double f = 212.0;
        // TODO
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        double f = 212.0;
        double c = (f - 32) * 5 / 9;
        System.out.println((int) c);
    }
}
`, hint: 'Compute the double first, then print (int) c.' },
    { type: 'code', id: 'cp-5', prompt: 'A score starts at 100. Subtract 15 with a compound operator, double it, then add 1 using §++§. Print §171§.', expected: '171',
      starter: j`public class Main {
    public static void main(String[] args) {
        int score = 100;
        // TODO: three operations, then print
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        int score = 100;
        score -= 15;
        score *= 2;
        score++;
        System.out.println(score);
    }
}
`, hint: 'score -= 15; score *= 2; score++;' },
  ],
};

const l119: Lesson = {
  id: '1-19',
  title: 'Multiple Choice Exercises 1a',
  blocks: [
    t(md`AP-style multiple choice for topics 1.1 to 1.6. Trace carefully and read each explanation, especially when you miss one.`),
    q('m1-1', 'What is printed? §System.out.println(7 / 2 + 7 % 2);§', ['3', '4', '4.5', '3.5'], 1, '7 / 2 is 3 and 7 % 2 is 1. Total 4.'),
    q('m1-2', 'What is the value of §(double) 9 / 2§?', ['4', '4.0', '4.5', '5.0'], 2, 'The cast applies to 9 first, giving 9.0, and 9.0 / 2 is 4.5.'),
    q('m1-3', 'What is the value of §(double) (9 / 2)§?', ['4.0', '4.5', '4', '5.0'], 0, 'The integer division 9 / 2 gives 4 inside the parentheses, then the cast makes it 4.0.'),
    q('m1-4', 'What does §(int) (3.8 + 0.5)§ evaluate to?', ['3', '4', '4.3', '3.8'], 1, '4.3 truncated to 4. This is how to round a positive number.'),
    q('m1-5', 'Which line declares a constant?', ['int MAX = 10;', 'final int MAX = 10;', 'const int MAX = 10;', 'static MAX = 10;'], 1),
    q('m1-6', 'After §int n = 8; n /= 3; n += 4;§ what is n?', ['6', '6.67', '4', '7'], 0, '8 / 3 is 2 (integer division) and 2 + 4 is 6.'),
    q('m1-7', 'What is printed? §System.out.println("" + 1 + 2);§', ['3', '12', '1 2', 'Compile error'], 1, 'String concatenation goes left to right: "" + 1 is "1", then "1" + 2 is "12".'),
    q('m1-8', 'What is printed? §System.out.println(1 + 2 + "");§', ['3', '12', '1 2', '3.0'], 0, '1 + 2 happens first as ints (3), then it is joined with the empty String.'),
    q('m1-9', 'Which causes a **run-time** error?', ['int x = "five";', 'int y = 10 / 0;', 'System.out.printn("hi");', 'int z = 5'], 1, 'The other lines do not compile. Dividing an int by zero compiles but throws an ArithmeticException.'),
    q('m1-10', 'What is the value of §Integer.MAX_VALUE + 1§?', ['2147483648', 'A compile error', 'A negative number (overflow)', '0'], 2),
    q('m1-11', 'Which of these is **not** a primitive type?', ['int', 'double', 'boolean', 'String'], 3),
    p('m1-12', 'What does this print?', j`int x = 3;
x = x + x * 2;
x %= 4;
System.out.println(x);`, '1', 'x becomes 3 + 3 * 2 = 9, then 9 % 4 leaves 1.'),
  ],
};

const l120: Lesson = {
  id: '1-20',
  title: 'Unit Summary 1b (1.7 - 1.15)',
  blocks: [
    t(md`
### What you should know

**1.7 APIs and libraries.** An API documents a library's classes. Classes outside §java.lang§ need §import§.

**1.8 Comments.** §//§, §/* */§ and §/** */§. A **precondition** must hold before a call (the caller's duty); a **postcondition** holds after.

**1.9 Signatures.** Name + parameter list; the header adds the return type. Arguments must match in number, order and type. **Overloaded** methods share a name but differ in parameters.

**1.10 Class methods.** §static§ methods are called as §ClassName.method()§, no object needed (§Math.sqrt§, §Integer.parseInt§).

**1.11 Math.** §abs§, §pow§, §sqrt§ (return double for pow/sqrt), §random()§ gives a double in [0, 1). A random int from a to b: §(int)(Math.random() * (b - a + 1)) + a§.

**1.12 to 1.14 Objects.** A class is a blueprint; §new§ plus a constructor makes an object. A variable holds a **reference**. Assigning one reference to another makes an **alias**. §null§ means no object, and calling a method on it throws an exception. Instance methods are called with §object.method()§; void methods do something, non-void return a value.

**1.15 Strings.** Immutable objects. Index from 0. §length()§, §substring(a, b)§ (end exclusive), §indexOf§, §charAt§, §equals§, §compareTo§. Use §equals§, not §==§.
`),
    q('s2-q1', 'Which expression gives a random integer from 5 to 14 inclusive?', ['(int)(Math.random() * 10) + 5', '(int)(Math.random() * 14) + 5', '(int)(Math.random() * 10)', '(int)(Math.random() * 15)'], 0, 'There are 10 values, so multiply by 10 and shift by the minimum, 5.'),
    q('s2-q2', 'What does §"computer".substring(2, 5)§ return?', ['"mpu"', '"mput"', '"omp"', '"put"'], 0, 'Indexes 2, 3, 4: m, p, u.'),
    q('s2-q3', 'Which statement about §String s2 = s1;§ is true?', ['s2 is a copy of the object', 's1 and s2 are aliases of the same object', 'It does not compile', 's2 becomes null'], 1),
    p('s2-p1', 'What does this print?', j`String s = "Java";
System.out.println(s.length() + s.substring(1));`, '4ava', 'length() is the int 4; 4 + "ava" concatenates to "4ava".'),
    q('s2-q4', 'Which call is legal?', ['Math m = new Math(); m.abs(-1);', 'Math.abs(-1)', 'abs(-1)', 'Math.abs()'], 1),
  ],
};

const l121: Lesson = {
  id: '1-21',
  title: 'Toggle Code Practice 1b',
  blocks: [
    t(md`Spot the bug, fix it, and match the expected output. Topics: Strings, Math, objects and imports.`),
    { type: 'code', id: 'tb-1', prompt: '**Fix the comparison.** Two separate String objects with the same characters should be reported equal: print §true§.', expected: 'true',
      starter: j`public class Main {
    public static void main(String[] args) {
        String a = new String("hi");
        String b = new String("hi");
        System.out.println(a == b);
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        String a = new String("hi");
        String b = new String("hi");
        System.out.println(a.equals(b));
    }
}
`, hint: 'Use equals for Strings.' },
    { type: 'code', id: 'tb-2', prompt: '**Fix the indexes.** Print §put§ from §"computer"§.', expected: 'put',
      starter: j`public class Main {
    public static void main(String[] args) {
        String s = "computer";
        System.out.println(s.substring(2, 5));
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        String s = "computer";
        System.out.println(s.substring(3, 6));
    }
}
`, hint: 'p is at index 3. The end index is exclusive.' },
    { type: 'code', id: 'tb-3', prompt: '**Fix the type.** It should print §7.0§.', expected: '7.0',
      starter: j`public class Main {
    public static void main(String[] args) {
        int r = Math.sqrt(49);
        System.out.println(r);
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        double r = Math.sqrt(49);
        System.out.println(r);
    }
}
`, hint: 'sqrt returns a double.' },
    { type: 'code', id: 'tb-4', prompt: '**Fix the call.** It should print §3§.', expected: '3',
      starter: j`public class Main {
    public static void main(String[] args) {
        String s = "abc";
        System.out.println(String.length(s));
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        String s = "abc";
        System.out.println(s.length());
    }
}
`, hint: 'length is an instance method.' },
    { type: 'code', id: 'tb-5', prompt: '**Fix the import.** It should print §ok§.', expected: 'ok',
      starter: j`public class Main {
    public static void main(String[] args) {
        Random gen = new Random();
        System.out.println("ok");
    }
}
`,
      solution: j`import java.util.Random;

public class Main {
    public static void main(String[] args) {
        Random gen = new Random();
        System.out.println("ok");
    }
}
`, hint: 'Add import java.util.Random; at the top.' },
  ],
};

const l122: Lesson = {
  id: '1-22',
  title: 'Coding Practice 1b',
  blocks: [
    t(md`Write each program yourself. Starters are minimal; use the earlier lessons if you get stuck.`),
    { type: 'code', id: 'cb-1', prompt: 'A right triangle has legs 6 and 8. Print the hypotenuse with §Math.sqrt§ and §Math.pow§ (§10.0§).', expected: '10.0',
      starter: j`public class Main {
    public static void main(String[] args) {
        int a = 6;
        int b = 8;
        // TODO
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        int a = 6;
        int b = 8;
        System.out.println(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
    }
}
`, hint: 'sqrt(pow(a,2) + pow(b,2))' },
    { type: 'code', id: 'cb-2', prompt: 'For §"Programming"§, print the first three letters, then on the next line the last four letters (§Pro§ and §ming§).', expected: 'Pro\nming',
      starter: j`public class Main {
    public static void main(String[] args) {
        String word = "Programming";
        // TODO
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        String word = "Programming";
        System.out.println(word.substring(0, 3));
        System.out.println(word.substring(word.length() - 4));
    }
}
`, hint: 'Use length() - 4 as the start of the second substring.' },
    { type: 'code', id: 'cb-3', prompt: 'Simulate rolling a six-sided die: print a random int from 1 to 6. Run it several times.', completeOnRun: true,
      starter: j`public class Main {
    public static void main(String[] args) {
        // TODO
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        System.out.println((int) (Math.random() * 6) + 1);
    }
}
`, hint: '(int)(Math.random() * 6) + 1' },
    { type: 'code', id: 'cb-4', dot: true, minDotMoves: 6, prompt: 'Make two Dot objects with different constructors and have each draw something (at least 6 moves total).',
      starter: j`public class Main {
    public static void main(String[] args) {
        // TODO
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        Dot a = new Dot(-40, 0, "cyan");
        Dot b = new Dot("orange");
        for (int i = 0; i < 3; i++) {
            a.forward(30);
            a.turnRight(120);
            b.forward(20);
            b.turnRight(90);
        }
    }
}
`, hint: 'Alternate forward and turnRight on each Dot.' },
    { type: 'code', id: 'cb-5', prompt: 'Print only the domain of the email (§school.org§) using §indexOf§ and §substring§.', expected: 'school.org',
      starter: j`public class Main {
    public static void main(String[] args) {
        String email = "sam@school.org";
        // TODO
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        String email = "sam@school.org";
        System.out.println(email.substring(email.indexOf("@") + 1));
    }
}
`, hint: 'Start one position after the @.' },
    { type: 'code', id: 'cb-6', prompt: 'A cube has side 3. Print its volume using §Math.pow§ (§27.0§).', expected: '27.0',
      starter: j`public class Main {
    public static void main(String[] args) {
        double side = 3;
        // TODO
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        double side = 3;
        System.out.println(Math.pow(side, 3));
    }
}
`, hint: 'Math.pow(side, 3)' },
  ],
};

const l123: Lesson = {
  id: '1-23',
  title: 'Multiple Choice Exercises 1b',
  blocks: [
    t(md`AP-style multiple choice for topics 1.7 to 1.15.`),
    q('m2-1', 'What is the value of §Math.abs(-3.5) + Math.pow(2, 3)§?', ['11.5', '8.5', '11', '-4.5'], 0, 'abs gives 3.5, pow gives 8.0. Sum 11.5.'),
    q('m2-2', 'Which expression yields a random int from 1 to 6, inclusive?', ['(int)(Math.random() * 6)', '(int)(Math.random() * 6) + 1', '(int)(Math.random() * 7)', 'Math.random() * 6 + 1'], 1, 'The last choice is a double. The first yields 0 to 5.'),
    q('m2-3', 'What does §"Hello".substring(1, 3)§ return?', ['"He"', '"el"', '"ell"', '"Hel"'], 1),
    q('m2-4', 'What does §"Hello".indexOf("l")§ return?', ['2', '3', '4', '-1'], 0),
    q('m2-5', 'What does §"apple".compareTo("banana")§ return?', ['A positive number', 'Zero', 'A negative number', 'true'], 2, 'a comes before b, so apple is "less than" banana.'),
    q('m2-6', 'What happens when §"abc".charAt(3)§ runs?', ['It returns an empty char', 'It returns null', 'An exception is thrown (index out of bounds)', 'It returns c'], 2, 'Valid indices are 0 to 2.'),
    q('m2-7', 'What is the type of §Math.pow(2, 3)§?', ['int', 'double', 'long', 'String'], 1),
    q('m2-8', 'Given §String s = "AP";§, what does §s.length() * 2§ evaluate to?', ['2', '4', '"APAP"', 'Compile error'], 1),
    q('m2-9', 'What is the best description of §Dot d;§ with no assignment (as a field or variable that has not been set to an object)?', ['d refers to a default Dot at the origin', 'd holds no object, so using it would be an error', 'd is an int', 'd is a constructor'], 1),
    q('m2-10', 'Which statement about §static§ methods is true?', ['They must be called on an object', 'They are called using the class name', 'They cannot return values', 'They are always void'], 1),
    q('m2-11', 'What does §"Java".substring("Java".length() - 1)§ return?', ['"J"', '"a"', '"Java"', 'An error'], 1),
    p('m2-12', 'What does this print?', j`String s = "abcdef";
String t = s.substring(2, 4) + s.charAt(0);
System.out.println(t);`, 'cda', 'substring(2,4) is "cd", then charAt(0) is a, giving cda.'),
  ],
};

const l124: Lesson = {
  id: '1-24',
  title: 'Practice Test for Objects (1.12 - 1.14)',
  blocks: [
    t(md`A mixed set on objects, constructors and instance methods. Treat it like a timed quiz: answer without running anything first.`),
    p('t-1', 'What does this print?', j`String a = "Hi";
String b = a;
a = a + "!";
System.out.println(b);`, 'Hi', 'Strings are immutable. a = a + "!" makes a refer to a new String; b still refers to "Hi".'),
    p('t-2', 'What does this print?', j`Dot d = new Dot(1, 2);
d.moveTo(d.getX() + 1, d.getY() + 1);
System.out.println(d.getX());`, '2.0', 'The dot moves to (2.0, 3.0).'),
    p('t-3', 'What does this print?', j`String s = "racecar";
System.out.println(s.substring(s.length() - 3) + s.indexOf("c"));`, 'car2', 'The last three characters are "car", and the first c is at index 2.'),
    p('t-4', 'What does this print?', j`String t = null;
System.out.println(t == null);`, 'true', 'null is a valid value for a reference; comparing it with == is safe.'),
    p('t-5', 'What does this print?', 'System.out.println("abc".compareTo("abd") < 0);', 'true', 'c comes before d, so compareTo is negative.'),
    p('t-6', 'What does this print?', j`Dot a = new Dot(0, 0);
Dot b = new Dot(0, 0);
System.out.println(a == b);`, 'false', 'Two different objects have different references.'),
    q('t-7', 'Which creates a Dot at position (4, 5)?', ['Dot d = Dot(4, 5);', 'Dot d = new Dot(4, 5);', 'new Dot d(4, 5);', 'Dot d = new(4, 5);'], 1),
    q('t-8', 'What is the term for the variable that stores an object\'s address?', ['A literal', 'A reference', 'A constant', 'A package'], 1),
    q('t-9', 'What causes a §NullPointerException§?', ['Calling a method on a variable whose value is null', 'Dividing by zero', 'Using the wrong import', 'Assigning an int to a double'], 0),
    q('t-10', 'Which statement is true of constructors?', ['They are called with the dot operator on an existing object', 'They have the same name as the class and are called with new', 'They always return an int', 'A class can have only one'], 1),
    q('t-11', 'Which line gives a compile error?', ['String s = "x";', 'String s = new String("x");', 'int n = "x".length();', 'int n = "x".length;'], 3, 'length is a method, so it needs parentheses.'),
    q('t-12', 'After §String w = "Mississippi";§, what is §w.indexOf("ss")§?', ['2', '3', '5', '-1'], 0),
  ],
};

const l125: Lesson = {
  id: '1-25',
  title: 'Java Swing GUIs (Optional)',
  blocks: [
    t(md`
This lesson is **optional** and not on the AP exam. So far your programs print text. Real apps have windows, buttons and text fields. Java's **Swing** library (package §javax.swing§) builds those.

§§§java
import javax.swing.JFrame;
import javax.swing.JButton;

public class Main {
    public static void main(String[] args) {
        JFrame window = new JFrame("My App");     // an object!
        JButton button = new JButton("Click me"); // another object
        window.add(button);
        window.setSize(300, 200);
        window.setVisible(true);                  // shows the window
    }
}
§§§

Notice everything from this unit at work:

- Classes come from a **library** and need **imports** (1.7).
- Each component is an **object** made with **new** and a **constructor** (1.12, 1.13).
- You configure it by calling **instance methods** like §setSize§ and §setVisible§ (1.14).

This app runs programs without a screen, so the code above can only be run on your own computer with a JDK. Try it in an editor there. Meanwhile, here is a quick check of the ideas.
`),
    q('sw-1', 'In §JButton b = new JButton("OK");§, what is "OK"?', ['The class name', 'An argument passed to the constructor', 'A method name', 'A package'], 1),
    q('sw-2', 'What does §window.setVisible(true);§ do?', ['Calls an instance method on the window object', 'Creates a JFrame', 'Imports a class', 'Declares a constant'], 0),
    q('sw-3', 'Why does the example start with §import javax.swing.JFrame;§?', ['JFrame is not in java.lang, so it must be imported', 'All classes need an import', 'To declare the main method', 'To make the window visible'], 0),
  ],
};

const l126: Lesson = {
  id: '1-26',
  title: 'Unit 1 FRQ Practice',
  blocks: [
    t(md`
AP free-response questions ask you to **write a method** that meets a description. Read the header and comments, use the parameters, and return the right type. Each task below gives you a method to complete and a §main§ that tests it. Match the expected output.
`),
    { type: 'code', id: 'frq-1', prompt: '**Average.** Complete §average§ so it returns the exact average of three ints as a double.', expected: '90.0\n2.0',
      starter: j`public class Main {
    /** Returns the average of a, b and c as a double. */
    public static double average(int a, int b, int c) {
        // TODO
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(average(80, 90, 100));
        System.out.println(average(1, 2, 3));
    }
}
`,
      solution: j`public class Main {
    /** Returns the average of a, b and c as a double. */
    public static double average(int a, int b, int c) {
        return (a + b + c) / 3.0;
    }

    public static void main(String[] args) {
        System.out.println(average(80, 90, 100));
        System.out.println(average(1, 2, 3));
    }
}
`, hint: 'Divide by 3.0 to avoid integer division.' },
    { type: 'code', id: 'frq-2', prompt: '**Username.** Complete §makeUsername§: the first letter of the first name in lower case followed by the whole last name in lower case.', expected: 'alovelace\ngmurray',
      starter: j`public class Main {
    /** Precondition: both names have at least one character. */
    public static String makeUsername(String first, String last) {
        // TODO
        return "";
    }

    public static void main(String[] args) {
        System.out.println(makeUsername("Ada", "Lovelace"));
        System.out.println(makeUsername("Grace", "Murray"));
    }
}
`,
      solution: j`public class Main {
    /** Precondition: both names have at least one character. */
    public static String makeUsername(String first, String last) {
        return first.substring(0, 1).toLowerCase() + last.toLowerCase();
    }

    public static void main(String[] args) {
        System.out.println(makeUsername("Ada", "Lovelace"));
        System.out.println(makeUsername("Grace", "Murray"));
    }
}
`, hint: 'substring(0, 1), toLowerCase(), and +.' },
    { type: 'code', id: 'frq-3', prompt: '**Digit sum.** Complete §digitSum§ for a positive three-digit number using §/§ and §%§ only.', expected: '14\n6',
      starter: j`public class Main {
    /** Precondition: 100 <= n <= 999. Returns the sum of the digits. */
    public static int digitSum(int n) {
        // TODO
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(digitSum(482));
        System.out.println(digitSum(123));
    }
}
`,
      solution: j`public class Main {
    /** Precondition: 100 <= n <= 999. Returns the sum of the digits. */
    public static int digitSum(int n) {
        return n / 100 + n / 10 % 10 + n % 10;
    }

    public static void main(String[] args) {
        System.out.println(digitSum(482));
        System.out.println(digitSum(123));
    }
}
`, hint: 'Hundreds: n / 100. Tens: n / 10 % 10. Ones: n % 10.' },
    { type: 'code', id: 'frq-4', dot: true, minDotMoves: 8, prompt: '**Draw.** Complete §twoSquares§ so it draws a square of the given side with each of the two Dots.',
      starter: j`public class Main {
    public static void twoSquares(Dot a, Dot b, double side) {
        // TODO: each dot draws a square with 4 sides
    }

    public static void main(String[] args) {
        twoSquares(new Dot(-60, 0, "cyan"), new Dot(20, 0, "orange"), 40);
    }
}
`,
      solution: j`public class Main {
    public static void twoSquares(Dot a, Dot b, double side) {
        for (int i = 0; i < 4; i++) {
            a.forward(side);
            a.turnRight(90);
            b.forward(side);
            b.turnRight(90);
        }
    }

    public static void main(String[] args) {
        twoSquares(new Dot(-60, 0, "cyan"), new Dot(20, 0, "orange"), 40);
    }
}
`, hint: 'Four times: forward(side), turnRight(90), for each dot.' },
  ],
};

const l127: Lesson = {
  id: '1-27',
  title: 'Unit 1A Projects',
  blocks: [
    t(md`Three small projects using only what you learned in 1.1 to 1.6: variables, arithmetic, casting and compound assignment.`),
    { type: 'code', id: 'pa-1', prompt: '**Tip calculator.** The bill is 4000 cents and the tip is 15%. Do the math in whole cents. Print §Tip: $6.00§ and §Total: $46.00§. (Hint: split cents into dollars and a two-digit remainder with §/§ and §%§.)',
      expected: 'Tip: $6.00\nTotal: $46.00',
      starter: j`public class Main {
    public static void main(String[] args) {
        int bill = 4000;
        int tip = bill * 15 / 100;
        int total = bill + tip;
        // TODO: print both in dollars.cents format
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        int bill = 4000;
        int tip = bill * 15 / 100;
        int total = bill + tip;
        System.out.println("Tip: $" + tip / 100 + "." + tip % 100 / 10 + tip % 10);
        System.out.println("Total: $" + total / 100 + "." + total % 100 / 10 + total % 10);
    }
}
`, hint: 'dollars = cents / 100, then "." then (cents % 100) / 10 and cents % 10.' },
    { type: 'code', id: 'pa-2', prompt: '**Clock.** Turn §3725§ seconds into §1:02:05§ (hours, minutes, seconds, with two digits each for minutes and seconds).', expected: '1:02:05',
      starter: j`public class Main {
    public static void main(String[] args) {
        int total = 3725;
        // TODO
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        int total = 3725;
        int h = total / 3600;
        int rest = total % 3600;
        int m = rest / 60;
        int s = rest % 60;
        System.out.println(h + ":" + m / 10 + m % 10 + ":" + s / 10 + s % 10);
    }
}
`, hint: 'hours = total / 3600; leftover = total % 3600; and so on.' },
    { type: 'code', id: 'pa-3', dot: true, minDotMoves: 8, prompt: '**Dot art.** Use variables and compound operators (§side += 10§) to draw a growing spiral of at least 8 moves.',
      starter: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot("violet");
        int side = 10;
        // TODO: forward(side), turn, side += 10, repeat
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot("violet");
        int side = 10;
        for (int i = 0; i < 8; i++) {
            d.forward(side);
            d.turnRight(90);
            side += 10;
        }
    }
}
`, hint: 'forward(side); turnRight(90); side += 10; eight times.' },
  ],
};

const l128: Lesson = {
  id: '1-28',
  title: 'Unit 1B Projects',
  blocks: [
    t(md`Projects using libraries, Math, objects and Strings (1.7 to 1.15).`),
    { type: 'code', id: 'pb-1', prompt: '**Username maker.** From §"Grace"§, §"Hopper"§ and year §"1906"§ build §ghopper06§: first initial lower case, last name lower case, last two digits of the year.', expected: 'ghopper06',
      starter: j`public class Main {
    public static void main(String[] args) {
        String first = "Grace";
        String last = "Hopper";
        String year = "1906";
        // TODO
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        String first = "Grace";
        String last = "Hopper";
        String year = "1906";
        System.out.println(first.substring(0, 1).toLowerCase() + last.toLowerCase() + year.substring(2));
    }
}
`, hint: 'substring(2) takes from index 2 to the end.' },
    { type: 'code', id: 'pb-2', prompt: '**Distance.** Find the distance between (1, 2) and (4, 6) with the distance formula and print §5.0§.', expected: '5.0',
      starter: j`public class Main {
    public static void main(String[] args) {
        double x1 = 1, y1 = 2, x2 = 4, y2 = 6;
        // TODO
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        double x1 = 1, y1 = 2, x2 = 4, y2 = 6;
        System.out.println(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
    }
}
`, hint: 'sqrt of (dx squared + dy squared).' },
    { type: 'code', id: 'pb-3', prompt: '**Two dice.** Roll two six-sided dice and print the individual rolls and their sum on separate lines.', completeOnRun: true,
      starter: j`public class Main {
    public static void main(String[] args) {
        // TODO
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        int d1 = (int) (Math.random() * 6) + 1;
        int d2 = (int) (Math.random() * 6) + 1;
        System.out.println("Die 1: " + d1);
        System.out.println("Die 2: " + d2);
        System.out.println("Sum: " + (d1 + d2));
    }
}
`, hint: 'Two random ints, then add them.' },
    { type: 'code', id: 'pb-4', dot: true, minDotMoves: 12, prompt: '**Dot trio.** Create three Dot objects with different colors and starting positions and have each draw a shape (at least 12 moves in all).',
      starter: j`public class Main {
    public static void main(String[] args) {
        // TODO
    }
}
`,
      solution: j`public class Main {
    public static void main(String[] args) {
        Dot a = new Dot(-80, 0, "cyan");
        Dot b = new Dot(0, 0, "orange");
        Dot c = new Dot(80, 0, "violet");
        for (int i = 0; i < 4; i++) {
            a.forward(30);
            a.turnRight(90);
            b.forward(30);
            b.turnRight(90);
            c.forward(30);
            c.turnRight(90);
        }
    }
}
`, hint: 'Each loop pass moves each dot twice.' },
  ],
};

const lMath: Lesson = 
{
      id: '1-11',
      title: 'Using the Math Class',
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
        { type: 'text', md: md`
### APIs, libraries and the documentation

An **API** (application programming interface) describes what a class or library lets you do: the names, parameters and return values of its methods. A **library** is a collection of such classes. You do not need to know *how* §Math.sqrt§ works inside, only what it takes and returns. The documentation (the **Javadoc**) lists every method.

Classes in §java.lang§ (like §Math§, §String§ and §System§) are available automatically. Classes in other packages need an §import§ line at the top of the file, for example §import java.util.ArrayList;§.

### More Math patterns

- §Math.abs(-5)§ is §5§ (an int stays an int; a double stays a double).
- §Math.pow§ and §Math.sqrt§ always return **doubles**. Cast with §(int)§ if you need a whole number: §(int) Math.pow(2, 10)§ is §1024§.
- §Math.random()§ returns a double with §0.0 <= x < 1.0§. It can be 0.0 but never exactly 1.0.

To pick a random integer from §min§ to §max§ **inclusive**: §(int) (Math.random() * (max - min + 1)) + min§. Watch the parentheses: the cast must apply to the whole product, otherwise §(int) Math.random()§ is always §0§.
` },
        { type: 'predict', id: 'p-math7', question: 'What does this program print?',
          code: j`public class Main {
    public static void main(String[] args) {
        System.out.println(Math.abs(-4) + " " + Math.pow(2, 3) + " " + Math.sqrt(9));
        System.out.println((int) Math.pow(2, 10));
        System.out.println(Math.abs(-2.5));
    }
}
`, answer: '4 8.0 3.0\n1024\n2.5', explanation: 'abs of an int is an int (4). pow and sqrt give doubles (8.0 and 3.0). The cast turns 1024.0 into 1024.' },
        { type: 'quiz', id: 'q-static', question: 'Why can you write §Math.sqrt(25)§ without first writing §new Math()§?',
          choices: ['Math is a keyword', 'sqrt is a static method, so it belongs to the class itself', 'Math objects are created automatically', 'sqrt is a constructor'], answer: 1,
          explanation: 'Static methods are called on the class name. No object is needed.' },
        { type: 'quiz', id: 'q-rand', question: 'What are the possible values of §(int) (Math.random() * 10)§?',
          choices: ['1 to 10', '0 to 10', '0 to 9', '0.0 to 9.9'], answer: 2, explanation: 'Math.random() is in [0, 1), so times 10 is in [0, 10), and truncating gives 0 through 9.' },
        { type: 'quiz', id: 'q-rand2', question: 'Which expression gives a random integer from **10 to 20 inclusive**?',
          choices: ['(int) (Math.random() * 20) + 10', '(int) (Math.random() * 10) + 11', '(int) (Math.random() * 11) + 10', '(int) (Math.random() * 21) + 10'], answer: 2,
          explanation: 'There are 20 - 10 + 1 = 11 values, so range 11 and minimum 10.' },
        { type: 'code', id: 'rand-range', prompt: 'Random numbers cannot be compared to exact output, so this program rolls many times and reports the smallest and largest values seen. Replace the TODO with an expression that gives a random int from **10 to 20 inclusive**. When correct it prints §min=10 max=20§. (The loop just repeats the roll 5000 times; you will learn it in Unit 2.)',
          expected: 'min=10 max=20',
          starter: j`public class Main {
    public static void main(String[] args) {
        int min = 100;
        int max = 0;
        for (int i = 0; i < 5000; i++) {
            int r = 0; // TODO: random int from 10 to 20 inclusive
            if (r < min) min = r;
            if (r > max) max = r;
        }
        System.out.println("min=" + min + " max=" + max);
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int min = 100;
        int max = 0;
        for (int i = 0; i < 5000; i++) {
            int r = (int) (Math.random() * 11) + 10;
            if (r < min) min = r;
            if (r > max) max = r;
        }
        System.out.println("min=" + min + " max=" + max);
    }
}
`, hint: 'range = 20 - 10 + 1 = 11, minimum = 10.' },
        { type: 'code', id: 'fix-dice', prompt: 'This dice roller should produce 1 to 6, but it has a logic bug (it always rolls the same number). Fix it so the program prints §min=1 max=6§.',
          expected: 'min=1 max=6',
          starter: j`public class Main {
    public static void main(String[] args) {
        int min = 100;
        int max = 0;
        for (int i = 0; i < 2000; i++) {
            int roll = (int) Math.random() * 6 + 1;
            if (roll < min) min = roll;
            if (roll > max) max = roll;
        }
        System.out.println("min=" + min + " max=" + max);
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int min = 100;
        int max = 0;
        for (int i = 0; i < 2000; i++) {
            int roll = (int) (Math.random() * 6) + 1;
            if (roll < min) min = roll;
            if (roll > max) max = roll;
        }
        System.out.println("min=" + min + " max=" + max);
    }
}
`, hint: 'The cast (int) only applies to Math.random() as written. Wrap the whole product in parentheses.' },
        { type: 'code', id: 'dist', prompt: 'Use §Math.sqrt§, §Math.pow§ and §Math.abs§: find the distance between the points (1, 2) and (4, -2) and print §Distance: 5.0§.',
          expected: 'Distance: 5.0',
          starter: j`public class Main {
    public static void main(String[] args) {
        int x1 = 1, y1 = 2;
        int x2 = 4, y2 = -2;
        // TODO: sqrt((x2-x1)^2 + (y2-y1)^2)
    }
}
`,
          solution: j`public class Main {
    public static void main(String[] args) {
        int x1 = 1, y1 = 2;
        int x2 = 4, y2 = -2;
        double d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        System.out.println("Distance: " + d);
    }
}
` },
      ],
    };

const lObj: Lesson = 
{
      id: '1-12',
      title: 'Objects - Instances of Classes',
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
    };

const lStr: Lesson = 
{
      id: '1-15',
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
    };

export const unit1b: Lesson[] = [
  l17, l18, l19, l110, lMath, lObj, l113, l114, lStr, l116, l117, l118, l119,
  l120, l121, l122, l123, l124, l125, l126, l127, l128,
];
