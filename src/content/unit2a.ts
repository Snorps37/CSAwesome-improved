import type { Lesson } from './types';
import { md } from './md';

const j = String.raw;

// Unit 2 lessons 2.1-2.6, following the CSAwesome2 topic order. Original wording.
export const unit2a: Lesson[] = [
  {
    id: '2-1',
    title: 'Algorithms with Selection and Repetition',
    blocks: [
      { type: 'text', md: md`
So far every program ran its steps once, top to bottom. That is **sequencing**. Real algorithms need two more building blocks:

- **Selection**: choose between paths depending on a condition. "If it is raining, take an umbrella."
- **Repetition** (iteration): do something over and over. "Keep stirring until the sauce thickens."

Every algorithm you will write in AP CS A is built from sequencing, selection and repetition. Before coding, people often sketch an algorithm in **pseudocode** (plain-language steps) or a **flowchart** (boxes and arrows, with diamonds for decisions).

§§§text
set count to 0
for each number from 1 to 10
    if the number is a multiple of 3
        add 1 to count
print count
§§§

In Java that becomes a loop with an §if§ inside it. Do not worry about the exact syntax yet. Lessons 2.3 to 2.8 teach every piece. For now, read the code and see the shape of the idea:

§§§java
int count = 0;
for (int n = 1; n <= 10; n++) {
    if (n % 3 == 0) {
        count++;
    }
}
System.out.println(count);   // 3  (3, 6 and 9)
§§§

The same algorithm can be written in different ways. A good algorithm gives the right answer for **every** valid input, not just the one you tried.
` },
      { type: 'quiz', id: 'q-sel', question: 'Which of these is an example of **selection**?',
        choices: ['Printing the numbers 1 to 100', 'Printing "Pass" only if the score is at least 60', 'Adding 5 to a variable twice', 'Running the same program on two computers'], answer: 1,
        explanation: 'Selection means choosing whether (or which) steps to run based on a condition. Printing 1 to 100 is repetition; adding twice is sequencing.' },
      { type: 'quiz', id: 'q-rep', question: 'A program keeps asking for a password until it is correct. Which building block does the "keeps asking" part use?',
        choices: ['Sequencing only', 'Selection', 'Repetition', 'Compilation'], answer: 2, explanation: 'Doing something again and again until a condition changes is repetition (a loop).' },
      { type: 'quiz', id: 'q-pseudo', question: 'Pseudocode is...',
        choices: ['Java code with all the semicolons removed', 'A plain-language outline of the steps of an algorithm', 'Code the compiler cannot read', 'A kind of syntax error'], answer: 1,
        explanation: 'Pseudocode is not tied to any language. It lets you design the steps first and translate them to Java afterwards.' },
      { type: 'predict', id: 'p-algo', question: 'This program implements the pseudocode above, but with different numbers. What does it print?',
        code: j`public class Main {
    public static void main(String[] args) {
        int count = 0;
        for (int n = 1; n <= 20; n++) {
            if (n % 4 == 0) {
                count++;
            }
        }
        System.out.println(count);
    }
}
`, answer: '5', explanation: 'The multiples of 4 from 1 to 20 are 4, 8, 12, 16 and 20: five of them.' },
      { type: 'code', id: 'algo-count', prompt: 'Turn the pseudocode into working code: count how many numbers from 1 to 50 are multiples of 7 and print §Multiples of 7: 7§. Only the condition is missing.',
        expected: 'Multiples of 7: 7',
        starter: j`public class Main {
    public static void main(String[] args) {
        int count = 0;
        for (int n = 1; n <= 50; n++) {
            if (/* TODO: n is a multiple of 7 */) {
                count++;
            }
        }
        System.out.println("Multiples of 7: " + count);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int count = 0;
        for (int n = 1; n <= 50; n++) {
            if (n % 7 == 0) {
                count++;
            }
        }
        System.out.println("Multiples of 7: " + count);
    }
}
`, hint: 'A number is a multiple of 7 when the remainder after dividing by 7 is 0.' },
      { type: 'code', id: 'algo-fix', prompt: 'The pseudocode says "print the numbers 1 through 5 on one line". The code has a logic error and prints the wrong numbers. Fix it so it prints §1 2 3 4 5§.',
        expected: '1 2 3 4 5',
        starter: j`public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}
`, hint: 'Where does the counter start, and where should it stop?' },
      { type: 'code', id: 'algo-dot', dot: true, minDotMoves: 6,
        prompt: 'Selection and repetition together: the loop draws six sides, and the §if§ colors the even-numbered sides differently. Run it, then change the number of sides and the colors.',
        starter: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot(-20, -40);
        int sides = 6;
        for (int i = 0; i < sides; i++) {
            if (i % 2 == 0) {
                d.setColor("cyan");
            } else {
                d.setColor("violet");
            }
            d.forward(50);
            d.turnRight(360.0 / sides);
        }
    }
}
` },
    ],
  },
  {
    id: '2-2',
    title: 'Boolean Expressions',
    blocks: [
      { type: 'text', md: md`
A **boolean** value is either §true§ or §false§. Selection and loops are driven by **boolean expressions**: expressions that evaluate to one of those two values.

The **relational operators** compare two numbers and produce a boolean:

| Operator | Meaning | Example |
|---|---|---|
| §==§ | equal to | §3 == 3§ is §true§ |
| §!=§ | not equal to | §3 != 4§ is §true§ |
| §<§ | less than | §2 < 2§ is §false§ |
| §>§ | greater than | §5 > 2§ is §true§ |
| §<=§ | less than or equal | §2 <= 2§ is §true§ |
| §>=§ | greater than or equal | §1 >= 2§ is §false§ |

§§§java
int age = 16;
boolean canDrive = age >= 16;      // true
boolean isEven = (age % 2 == 0);   // true
System.out.println(canDrive);
§§§

**Two classic traps.** §=§ is assignment and §==§ is comparison. Writing §if (x = 5)§ will not compile. And §==§ on Strings (or any objects) compares whether they are the *same object*, not whether they hold the same text. Use §s.equals(t)§ for Strings.

Because doubles are not exact, avoid §==§ on them; compare §Math.abs(a - b) < 0.0001§ instead.
` },
      { type: 'quiz', id: 'q-rel', question: 'What is the value of §(10 % 3 == 1)§?',
        choices: ['true', 'false', '1', 'It does not compile'], answer: 0, explanation: '10 % 3 is 1, and 1 == 1 is true.' },
      { type: 'quiz', id: 'q-eq', question: 'Which expression tests whether §x§ is an **odd** number (for positive x)?',
        choices: ['x / 2 == 1', 'x % 2 == 1', 'x % 2 = 1', 'x == 2'], answer: 1, explanation: 'Odd numbers leave remainder 1 when divided by 2. x % 2 = 1 uses assignment, so it does not compile.' },
      { type: 'quiz', id: 'q-str', question: 'Why is §if (name == "Ada")§ a bad way to compare Strings?',
        choices: ['It does not compile', '== checks whether both are the same object, not whether the text is equal', '== only works on numbers less than 100', 'It is fine; == and equals are identical'], answer: 1,
        explanation: 'For objects, == compares references. Use name.equals("Ada") to compare the characters.' },
      { type: 'predict', id: 'p-bool', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        int a = 7;
        int b = 3;
        System.out.println(a > b);
        System.out.println(a % b == 0);
        System.out.println(a / b == 2);
        System.out.println(a != b + 4);
        boolean same = (a - 4 == b);
        System.out.println(same);
    }
}
`, answer: 'true\nfalse\ntrue\nfalse\ntrue', explanation: '7 > 3 is true. 7 % 3 is 1, not 0. 7 / 3 is 2 (integer division). b + 4 is 7, so a != 7 is false. 7 - 4 equals 3.' },
      { type: 'code', id: 'bool-print', prompt: 'Given §age = 15§ and §temp = 30.5§, store each answer in a boolean variable and print them on separate lines: is the age at least 16, is the temperature above 30, and is the age odd? Expected: §false§, §true§, §true§.',
        expected: 'false\ntrue\ntrue',
        starter: j`public class Main {
    public static void main(String[] args) {
        int age = 15;
        double temp = 30.5;
        // TODO: three boolean variables, printed one per line
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int age = 15;
        double temp = 30.5;
        boolean canDrive = age >= 16;
        boolean hot = temp > 30;
        boolean odd = age % 2 == 1;
        System.out.println(canDrive);
        System.out.println(hot);
        System.out.println(odd);
    }
}
` },
      { type: 'code', id: 'bool-fix', prompt: 'This program does not compile because of mix-ups between §=§ and §==§. Fix it so it prints §true§ and then §false§.',
        expected: 'true\nfalse',
        starter: j`public class Main {
    public static void main(String[] args) {
        int score = 90;
        boolean perfect = (score = 100);
        boolean passing = (score == 60);
        System.out.println(score >= 60);
        System.out.println(perfect);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int score = 90;
        boolean perfect = (score == 100);
        boolean passing = (score >= 60);
        System.out.println(passing);
        System.out.println(perfect);
    }
}
`, hint: 'Inside a boolean expression you want a comparison (==, >=), not an assignment. Then print passing first.' },
      { type: 'code', id: 'bool-str', prompt: 'Compare two Strings correctly. §a§ and §b§ hold the same letters but were built separately. Print §equal: true§ using §equals§.',
        expected: 'equal: true',
        starter: j`public class Main {
    public static void main(String[] args) {
        String a = "java";
        String b = new String("java");
        // == would say false here! Print "equal: " followed by the right comparison.
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        String a = "java";
        String b = new String("java");
        System.out.println("equal: " + a.equals(b));
    }
}
` },
    ],
  },
  {
    id: '2-3',
    title: 'if Statements and Control Flow',
    blocks: [
      { type: 'text', md: md`
An **if statement** runs a block of code only when its boolean condition is true.

§§§java
if (temp > 30) {
    System.out.println("Stay hydrated!");
}
§§§

**Two-way selection** adds an §else§ that runs when the condition is false, so exactly one of the two blocks runs:

§§§java
if (score >= 60) {
    System.out.println("Pass");
} else {
    System.out.println("Fail");
}
§§§

**Multi-way selection** chains conditions with §else if§. Java checks them from top to bottom and runs only the **first** block whose condition is true:

§§§java
if (score >= 90)      grade = "A";
else if (score >= 80) grade = "B";
else if (score >= 70) grade = "C";
else                  grade = "F";
§§§

Because only the first match runs, the order of the tests matters. Always use braces §{ }§ even for one statement, and never put a semicolon right after the condition: §if (x > 5);§ ends the if with an empty statement and the following block **always** runs.
` },
      { type: 'quiz', id: 'q-if1', question: 'What is printed?\n\n§§§java\nint x = 8;\nif (x > 5) System.out.println("A");\nif (x > 7) System.out.println("B");\nelse System.out.println("C");\n§§§',
        choices: ['A', 'A then B', 'A then C', 'B'], answer: 1, explanation: 'The two statements are separate. x > 5 is true so A prints. x > 7 is true so B prints (and the else is skipped).' },
      { type: 'quiz', id: 'q-if2', question: 'With §int n = 85;§ what does this chain assign?\n\n§§§java\nif (n >= 70) grade = "C";\nelse if (n >= 80) grade = "B";\nelse if (n >= 90) grade = "A";\n§§§',
        choices: ['"A"', '"B"', '"C"', 'Nothing'], answer: 2, explanation: 'The first true test wins: 85 >= 70 matches before the better grades are even checked. The tests are in the wrong order.' },
      { type: 'quiz', id: 'q-if3', question: 'What does §if (x > 10); { System.out.println("big"); }§ do when x is 3?',
        choices: ['Prints nothing', 'Prints big', 'Compile error', 'Prints big only if x is above 10'], answer: 1,
        explanation: 'The semicolon is an empty body for the if. The braces after it are just an ordinary block that always runs.' },
      { type: 'predict', id: 'p-if', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        int n = 12;
        if (n % 2 == 0) {
            System.out.println("even");
        } else {
            System.out.println("odd");
        }
        if (n > 10) {
            System.out.println("big");
        }
        if (n > 20) {
            System.out.println("huge");
        } else if (n > 5) {
            System.out.println("medium");
        } else {
            System.out.println("small");
        }
    }
}
`, answer: 'even\nbig\nmedium', explanation: 'n is even; n > 10 is true; for the last chain 12 > 20 fails, then 12 > 5 matches, so only "medium" prints.' },
      { type: 'code', id: 'if-grade', prompt: 'Write an if / else if / else chain that converts §score§ into a letter: 90 or above is §A§, 80 to 89 is §B§, 70 to 79 is §C§, anything lower is §F§. For §score = 83§ print §Grade: B§. Try other scores to test every branch.',
        expected: 'Grade: B',
        starter: j`public class Main {
    public static void main(String[] args) {
        int score = 83;
        String grade = "";
        // TODO: set grade with an if / else if / else chain
        System.out.println("Grade: " + grade);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int score = 83;
        String grade = "";
        if (score >= 90) {
            grade = "A";
        } else if (score >= 80) {
            grade = "B";
        } else if (score >= 70) {
            grade = "C";
        } else {
            grade = "F";
        }
        System.out.println("Grade: " + grade);
    }
}
`, hint: 'Start with the highest cutoff so the first match is the right one.' },
      { type: 'code', id: 'if-fix', prompt: 'This program should print §Positive§ for 5, but it prints §Positive§ **and** §Not positive§. Find the two bugs (one is a stray character, one changes which branch runs) and fix them so it prints only §Positive§.',
        expected: 'Positive',
        starter: j`public class Main {
    public static void main(String[] args) {
        int x = 5;
        if (x > 0);
        {
            System.out.println("Positive");
        }
        if (x > 0) {
            System.out.println("Not positive");
        }
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int x = 5;
        if (x > 0) {
            System.out.println("Positive");
        } else {
            System.out.println("Not positive");
        }
    }
}
`, hint: 'Remove the semicolon after the condition, then make the second block an else.' },
      { type: 'code', id: 'if-dot', dot: true, minDotMoves: 8,
        prompt: 'Selection steers the dot: it bounces off the sides of the canvas. Run it, then try different step sizes or turn angles.',
        starter: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot(-60, 0);
        d.setColor("cyan");
        d.setHeading(90);
        for (int i = 0; i < 14; i++) {
            if (d.getX() > 50) {
                d.setHeading(270);
                d.setColor("violet");
            } else if (d.getX() < -50) {
                d.setHeading(90);
                d.setColor("cyan");
            }
            d.forward(25);
            d.turnRight(8);
        }
    }
}
` },
    ],
  },
  {
    id: '2-4',
    title: 'Nested if Statements',
    blocks: [
      { type: 'text', md: md`
An §if§ statement can contain other §if§ statements. This is **nested selection**: the inner decision is only reached when the outer condition is true.

§§§java
if (age >= 16) {
    if (hasLicense) {
        System.out.println("You may drive.");
    } else {
        System.out.println("Get a license first.");
    }
} else {
    System.out.println("Too young.");
}
§§§

Nesting is useful when the second question only makes sense after the first is answered. A chain of §else if§ is usually simpler when you are just testing one value against several ranges.

**Dangling else.** An §else§ always belongs to the **nearest** unmatched §if§, no matter how the code is indented. Braces make your intention explicit:

§§§java
if (a > 0)
    if (b > 0) System.out.println("both");
    else System.out.println("?");   // belongs to the inner if (b > 0)!
§§§

To trace nested code, follow one path at a time and write down which conditions were true.
` },
      { type: 'quiz', id: 'q-dang', question: 'With §int a = 0, b = 5;§ what does this print?\n\n§§§java\nif (a > 0)\n    if (b > 0) System.out.println("X");\n    else System.out.println("Y");\n§§§',
        choices: ['X', 'Y', 'Nothing', 'XY'], answer: 2, explanation: 'The else pairs with the inner if. Since a > 0 is false, the whole inner statement (including its else) is skipped.' },
      { type: 'quiz', id: 'q-nest', question: 'How many different messages can this code print?\n\n§§§java\nif (x > 0) {\n    if (x > 100) System.out.println("A");\n    else System.out.println("B");\n} else {\n    System.out.println("C");\n}\n§§§',
        choices: ['1', '2', '3', '4'], answer: 2, explanation: 'There are three possible paths: x > 100 (A), x between 1 and 100 (B), and x <= 0 (C).' },
      { type: 'quiz', id: 'q-nest2', question: 'When is "B" printed?\n\n§§§java\nif (p) {\n    if (q) System.out.println("A");\n    else System.out.println("B");\n}\n§§§',
        choices: ['When p is false', 'When p is true and q is false', 'When q is false', 'When p and q are both true'], answer: 1, explanation: 'B is in the else of the inner if, which is only reached when p is true.' },
      { type: 'predict', id: 'p-nest', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        int temp = 18;
        boolean raining = true;
        if (temp < 20) {
            if (raining) {
                System.out.println("coat and umbrella");
            } else {
                System.out.println("coat");
            }
        } else {
            if (raining) {
                System.out.println("umbrella");
            } else {
                System.out.println("shorts");
            }
        }
        System.out.println("done");
    }
}
`, answer: 'coat and umbrella\ndone', explanation: 'temp < 20 is true and raining is true, so the first inner message prints. "done" is outside all the ifs.' },
      { type: 'code', id: 'nest-ticket', prompt: 'A theater charges based on age and whether it is a matinee. Children (under 13) pay 6 at a matinee and 8 otherwise. Everyone else pays 10 at a matinee and 14 otherwise. With §age = 10§ and §matinee = false§ print §Price: 8§. Use nested §if§ statements.',
        expected: 'Price: 8',
        starter: j`public class Main {
    public static void main(String[] args) {
        int age = 10;
        boolean matinee = false;
        int price = 0;
        // TODO
        System.out.println("Price: " + price);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int age = 10;
        boolean matinee = false;
        int price = 0;
        if (age < 13) {
            if (matinee) {
                price = 6;
            } else {
                price = 8;
            }
        } else {
            if (matinee) {
                price = 10;
            } else {
                price = 14;
            }
        }
        System.out.println("Price: " + price);
    }
}
`, hint: 'Decide the age group in the outer if, then use an inner if / else for matinee.' },
      { type: 'code', id: 'nest-fix', prompt: 'The indentation lies! This code was meant to print §Not an adult§ for age 15 whether or not the person has a ticket, but the §else§ is attached to the wrong §if§, so it prints nothing. Add braces so the else belongs to the **outer** if.',
        expected: 'Not an adult',
        starter: j`public class Main {
    public static void main(String[] args) {
        int age = 15;
        boolean ticket = true;
        if (age >= 18)
            if (ticket) System.out.println("Welcome");
        else System.out.println("Not an adult");
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int age = 15;
        boolean ticket = true;
        if (age >= 18) {
            if (ticket) System.out.println("Welcome");
        } else {
            System.out.println("Not an adult");
        }
    }
}
`, hint: 'Wrap the inner if in braces right after the outer condition.' },
      { type: 'code', id: 'nest-sign', prompt: 'Classify §n§ with nested ifs: if it is positive, say whether it is §positive even§ or §positive odd§; if it is not positive, say §zero or negative§. For §n = 7§ print §positive odd§.',
        expected: 'positive odd',
        starter: j`public class Main {
    public static void main(String[] args) {
        int n = 7;
        // TODO
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int n = 7;
        if (n > 0) {
            if (n % 2 == 0) {
                System.out.println("positive even");
            } else {
                System.out.println("positive odd");
            }
        } else {
            System.out.println("zero or negative");
        }
    }
}
` },
    ],
  },
  {
    id: '2-5',
    title: 'Compound Boolean Expressions',
    blocks: [
      { type: 'text', md: md`
**Logical operators** combine boolean values:

- §!§ (not) flips a value: §!true§ is §false§.
- §&&§ (and) is true only when **both** sides are true.
- §||§ (or) is true when **at least one** side is true.

§§§java
boolean teen = age >= 13 && age <= 19;
boolean weekend = day.equals("Sat") || day.equals("Sun");
boolean notBig = !(size > 10);
§§§

Each side of §&&§ and §||§ must be a full boolean expression. §age >= 13 && <= 19§ does not compile.

**Precedence** (highest first): §!§, then §&&§, then §||§. Relational operators and arithmetic bind tighter than all three. When in doubt, add parentheses.

**Short-circuit evaluation.** Java stops as soon as the answer is known: in §A && B§, if A is false, B is never evaluated; in §A || B§, if A is true, B is skipped. This lets you guard against errors:

§§§java
if (count != 0 && total / count > 10) { ... }   // never divides by zero
§§§
` },
      { type: 'quiz', id: 'q-and', question: 'What is §true || false && false§?',
        choices: ['true', 'false', 'It does not compile', 'It depends on the computer'], answer: 0, explanation: '&& is evaluated before ||, so it is true || (false && false), which is true || false, which is true.' },
      { type: 'quiz', id: 'q-range', question: 'Which expression is true when §x§ is between 1 and 10 **inclusive**?',
        choices: ['1 <= x <= 10', 'x >= 1 || x <= 10', 'x >= 1 && x <= 10', 'x > 1 && x < 10'], answer: 2,
        explanation: 'Chained comparisons are not allowed in Java. With ||, every number would qualify. The last choice leaves out 1 and 10.' },
      { type: 'quiz', id: 'q-short', question: 'With §int d = 0;§ which condition is safe from a divide-by-zero crash?',
        choices: ['10 / d > 2 && d != 0', 'd != 0 && 10 / d > 2', '10 / d > 2 || d == 0', 'None of them'], answer: 1,
        explanation: 'In d != 0 && ..., the left side is false so the division is never evaluated. In the other orders the division is evaluated first.' },
      { type: 'predict', id: 'p-logic', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        int x = 5;
        int y = 12;
        System.out.println(x > 3 && y < 10);
        System.out.println(x > 3 || y < 10);
        System.out.println(!(x > 3) || y == 12);
        System.out.println(x < 0 || x > 3 && y % 2 == 0);
        System.out.println(!(x == 5 && y == 12));
    }
}
`, answer: 'false\ntrue\ntrue\ntrue\nfalse', explanation: 'Line 1: true && false. Line 2: true || false. Line 3: false || true. Line 4: false || (true && true). Line 5: !(true).' },
      { type: 'code', id: 'comp-leap', prompt: 'A year is a leap year if it is divisible by 4, except century years, which must also be divisible by 400 (so 1900 is not, but 2000 is). The loop visits every year from 1896 to 2004 and counts the leap years. Write the condition. Expected: §Leap years: 27§.',
        expected: 'Leap years: 27',
        starter: j`public class Main {
    public static void main(String[] args) {
        int count = 0;
        for (int y = 1896; y <= 2004; y++) {
            boolean leap = false; // TODO: use y % 4, y % 100 and y % 400
            if (leap) {
                count++;
            }
        }
        System.out.println("Leap years: " + count);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int count = 0;
        for (int y = 1896; y <= 2004; y++) {
            boolean leap = (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
            if (leap) {
                count++;
            }
        }
        System.out.println("Leap years: " + count);
    }
}
`, hint: '(divisible by 4 and not by 100) or divisible by 400.' },
      { type: 'code', id: 'comp-fix', prompt: 'This program crashes with a divide-by-zero because of the order of the tests. Fix it with **short-circuit** logic so it prints §No average§ when there are no items. (Do not change the values.)',
        expected: 'No average',
        starter: j`public class Main {
    public static void main(String[] args) {
        int total = 40;
        int count = 0;
        if (total / count > 5 && count > 0) {
            System.out.println("High average");
        } else {
            System.out.println("No average");
        }
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int total = 40;
        int count = 0;
        if (count > 0 && total / count > 5) {
            System.out.println("High average");
        } else {
            System.out.println("No average");
        }
    }
}
`, hint: 'Put the guard (count > 0) on the left side of &&.' },
      { type: 'code', id: 'comp-range', prompt: 'Print §teen§ for ages 13 to 19 inclusive, §child§ for under 13, §adult§ for 20 and over. The starter has a bug: the teen test is not valid Java. Fix it. With §age = 16§ it should print §teen§.',
        expected: 'teen',
        starter: j`public class Main {
    public static void main(String[] args) {
        int age = 16;
        if (age >= 13 && <= 19) {
            System.out.println("teen");
        } else if (age < 13) {
            System.out.println("child");
        } else {
            System.out.println("adult");
        }
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int age = 16;
        if (age >= 13 && age <= 19) {
            System.out.println("teen");
        } else if (age < 13) {
            System.out.println("child");
        } else {
            System.out.println("adult");
        }
    }
}
` },
    ],
  },
  {
    id: '2-6',
    title: 'Comparing Boolean Expressions',
    blocks: [
      { type: 'text', md: md`
Two boolean expressions are **equivalent** if they give the same result for every possible input. A **truth table** lists every combination of inputs so you can check.

| A | B | A && B | A \|\| B |
|---|---|---|---|
| true | true | true | true |
| true | false | false | true |
| false | true | false | true |
| false | false | false | false |

**De Morgan's laws** tell you how to push a ! through a compound expression. Flip each comparison and swap §&&§ with §||§:

- §!(A && B)§ is equivalent to §!A || !B§
- §!(A || B)§ is equivalent to §!A && !B§

To negate a relational operator: §<§ becomes §>=§, §<=§ becomes §>§, §==§ becomes §!=§, and vice versa.

§§§java
!(x > 5 && y <= 3)   is the same as   x <= 5 || y > 3
§§§

Simplifying a condition makes code easier to read. §if (isDone == true)§ is the same as §if (isDone)§ and §if (isDone == false)§ is §if (!isDone)§.

Two different if / else if chains can also be equivalent. A common test question asks whether a set of separate §if§ statements behaves like one chain. They differ when more than one condition can be true.
` },
      { type: 'quiz', id: 'q-dm1', question: 'Which expression is equivalent to §!(x > 5 && y <= 3)§?',
        choices: ['x <= 5 && y > 3', 'x <= 5 || y > 3', 'x > 5 || y <= 3', 'x < 5 || y < 3'], answer: 1, explanation: 'Negate each part (> becomes <=, <= becomes >) and change && to ||.' },
      { type: 'quiz', id: 'q-dm2', question: 'Which expression is equivalent to §!(a || b)§?',
        choices: ['!a || !b', '!a && !b', 'a && b', '!a || b'], answer: 1, explanation: 'De Morgan: !(A || B) is !A && !B.' },
      { type: 'quiz', id: 'q-dm3', question: 'For which values is §(x < 3 || x > 7)§ false?',
        choices: ['x from 3 to 7 inclusive', 'x from 4 to 6', 'x greater than 7', 'It is never false'], answer: 0, explanation: 'It is false when both parts are false: x >= 3 and x <= 7.' },
      { type: 'predict', id: 'p-dm', question: 'What does this program print? (Check each pair for equivalence.)',
        code: j`public class Main {
    public static void main(String[] args) {
        int a = 4;
        int b = 9;
        System.out.println(!(a > 3 && b < 5));
        System.out.println(a <= 3 || b >= 5);
        System.out.println(!(a == 4 || b == 9));
        System.out.println(a != 4 && b != 9);
    }
}
`, answer: 'true\ntrue\nfalse\nfalse', explanation: 'Each pair is a De Morgan equivalent, so lines 1 and 2 match (both true) and lines 3 and 4 match (both false).' },
      { type: 'code', id: 'dm-verify', prompt: 'Let the computer check De Morgan\'s law. The loops try all four combinations of §a§ and §b§. Replace §TODO§ so §rewritten§ is the De Morgan equivalent of §original§, written with no leading §!§. Expected output: §equivalent: true§.',
        expected: 'equivalent: true',
        starter: j`public class Main {
    public static void main(String[] args) {
        boolean same = true;
        for (int i = 0; i < 2; i++) {
            for (int k = 0; k < 2; k++) {
                boolean a = (i == 1);
                boolean b = (k == 1);
                boolean original = !(a && b);
                boolean rewritten = false; // TODO: use !a and !b with && or ||
                if (original != rewritten) {
                    same = false;
                }
            }
        }
        System.out.println("equivalent: " + same);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        boolean same = true;
        for (int i = 0; i < 2; i++) {
            for (int k = 0; k < 2; k++) {
                boolean a = (i == 1);
                boolean b = (k == 1);
                boolean original = !(a && b);
                boolean rewritten = !a || !b;
                if (original != rewritten) {
                    same = false;
                }
            }
        }
        System.out.println("equivalent: " + same);
    }
}
`, hint: '!(a && b) becomes !a || !b.' },
      { type: 'code', id: 'dm-fix', prompt: 'A student tried to simplify §!(x > 2 && x < 8)§ for the program below, but the "simplified" version is wrong and the output is not §outside§ for x = 9. Fix the simplified condition.',
        expected: 'outside',
        starter: j`public class Main {
    public static void main(String[] args) {
        int x = 9;
        // original: if (!(x > 2 && x < 8))
        if (x <= 2 && x >= 8) {
            System.out.println("outside");
        } else {
            System.out.println("inside");
        }
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int x = 9;
        // original: if (!(x > 2 && x < 8))
        if (x <= 2 || x >= 8) {
            System.out.println("outside");
        } else {
            System.out.println("inside");
        }
    }
}
`, hint: 'You flipped the comparisons correctly but forgot to swap && for ||.' },
      { type: 'code', id: 'dm-simplify', prompt: 'The original test is §!(x > 3 && x < 8)§. Rewrite it using De Morgan\'s law with **no leading §!§** (replace the §false§ below) so that the program counts the numbers from 1 to 10 outside the range 4 to 7. Expected: §Outside: 6§.',
        expected: 'Outside: 6',
        starter: j`public class Main {
    public static void main(String[] args) {
        int count = 0;
        for (int x = 1; x <= 10; x++) {
            if (false) { // TODO: equivalent of !(x > 3 && x < 8)
                count++;
            }
        }
        System.out.println("Outside: " + count);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int count = 0;
        for (int x = 1; x <= 10; x++) {
            if (x <= 3 || x >= 8) {
                count++;
            }
        }
        System.out.println("Outside: " + count);
    }
}
`, hint: 'Flip each comparison (> becomes <=, < becomes >=) and swap && for ||.' },
    ],
  },
];
