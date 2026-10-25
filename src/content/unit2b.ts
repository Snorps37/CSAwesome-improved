import type { Lesson } from './types';
import { md } from './md';

const j = String.raw;

// Unit 2 lessons 2.7-2.12, following the CSAwesome2 topic order. Original wording.
export const unit2b: Lesson[] = [
  {
    id: '2-7',
    title: 'While Loops',
    blocks: [
      { type: 'text', md: md`
A **loop** repeats a block of code. The **while loop** repeats as long as its condition is true:

§§§java
int count = 1;
while (count <= 3) {
    System.out.println("Round " + count);
    count++;
}
§§§

The loop works like this: check the condition; if true, run the body and check again; if false, skip to the code after the loop. Three things must be right:

1. **Initialize** the loop variable before the loop (§count = 1§).
2. A **condition** that is true while you want to keep going.
3. An **update** inside the body that eventually makes the condition false.

If the update is missing, you get an **infinite loop**: the program never stops (press Stop or wait for the timeout). If the condition is false from the start, the body runs **zero** times. An **off-by-one error** means the loop runs one time too many or too few, usually from using §<§ where you needed §<=§ (or the reverse).

Use a while loop when you do not know in advance how many repetitions you need, for example "keep halving until the number is small".
` },
      { type: 'quiz', id: 'u2-7-q-wh1', question: 'How many times does the body run?\n\n§§§java\nint i = 5;\nwhile (i < 5) {\n    i++;\n}\n§§§',
        choices: ['0', '1', '5', 'Forever'], answer: 0, explanation: 'The condition 5 < 5 is false immediately, so the body is skipped entirely.' },
      { type: 'quiz', id: 'u2-7-q-wh2', question: 'What is wrong with this loop?\n\n§§§java\nint n = 10;\nwhile (n > 0) {\n    System.out.println(n);\n}\n§§§',
        choices: ['The condition is never true', 'n is never changed, so it is an infinite loop', 'It prints in the wrong order', 'Nothing, it is correct'], answer: 1, explanation: 'Nothing in the body changes n, so n > 0 stays true forever.' },
      { type: 'quiz', id: 'u2-7-q-wh3', question: 'What is the final value of §x§?\n\n§§§java\nint x = 1;\nwhile (x < 50) {\n    x *= 3;\n}\n§§§',
        choices: ['27', '81', '50', '243'], answer: 1, explanation: 'x goes 1, 3, 9, 27, then 81. 81 is not less than 50 so the loop stops with x = 81.' },
      { type: 'predict', id: 'u2-7-p-wh', question: 'What does this program print? Trace n and total each time through the loop.',
        code: j`public class Main {
    public static void main(String[] args) {
        int n = 1;
        int total = 0;
        while (total < 20) {
            total += n;
            n += 2;
        }
        System.out.println(n + " " + total);
    }
}
`, answer: '11 25', explanation: 'total grows 1, 4, 9, 16, 25 as n takes 1, 3, 5, 7, 9. After the last pass n has been increased to 11 and total (25) is no longer below 20.' },
      { type: 'code', id: 'u2-7-wh-sum', prompt: 'Use a §while§ loop to add the whole numbers 1 through 10. Print §Sum: 55§.',
        expected: 'Sum: 55',
        starter: j`public class Main {
    public static void main(String[] args) {
        int i = 1;
        int sum = 0;
        // TODO: while loop
        System.out.println("Sum: " + sum);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int i = 1;
        int sum = 0;
        while (i <= 10) {
            sum += i;
            i++;
        }
        System.out.println("Sum: " + sum);
    }
}
`, hint: 'Loop while i <= 10; add i, then increment i.' },
      { type: 'code', id: 'u2-7-wh-digits', prompt: 'Count how many digits §n = 90210§ has by dividing by 10 until it reaches 0. Print §Digits: 5§.',
        expected: 'Digits: 5',
        starter: j`public class Main {
    public static void main(String[] args) {
        int n = 90210;
        int digits = 0;
        // TODO
        System.out.println("Digits: " + digits);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int n = 90210;
        int digits = 0;
        while (n > 0) {
            digits++;
            n /= 10;
        }
        System.out.println("Digits: " + digits);
    }
}
` },
      { type: 'code', id: 'u2-7-wh-fix', prompt: 'This loop should print the powers of two that are below 100: §1 2 4 8 16 32 64§. It has an off-by-one error and also forgets part of the update (so it would run forever). Fix it.',
        expected: '1 2 4 8 16 32 64',
        starter: j`public class Main {
    public static void main(String[] args) {
        int p = 1;
        while (p <= 100) {
            System.out.print(p + " ");
        }
        System.out.println();
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int p = 1;
        while (p < 100) {
            System.out.print(p + " ");
            p *= 2;
        }
        System.out.println();
    }
}
`, hint: 'Double p each time; and 128 is above 100, so how should the condition compare?' },
      { type: 'code', id: 'u2-7-wh-dot', dot: true, minDotMoves: 10,
        prompt: 'A while loop with an unknown number of steps: the dot spirals outward until the side length passes 90. Change the growth or turn angle to get a different spiral.',
        starter: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot();
        d.setColor("cyan");
        double len = 4;
        while (len < 90) {
            d.forward(len);
            d.turnRight(60);
            len += 3;
        }
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot();
        d.setColor("cyan");
        double len = 4;
        while (len < 90) {
            d.forward(len);
            d.turnRight(60);
            len += 3;
        }
    }
}
` },
    ],
  },
  {
    id: '2-8',
    title: 'For Loops',
    blocks: [
      { type: 'text', md: md`
When you know how many times to repeat, the **for loop** packs the three loop parts into one line:

§§§java
for (int i = 0; i < 5; i++) {
    System.out.println("i is " + i);
}
§§§

The header has three parts separated by semicolons:

1. **Initialization**: runs once at the start (§int i = 0§).
2. **Condition**: checked before every pass (§i < 5§).
3. **Update**: runs after every pass (§i++§).

That loop is exactly the same as this while loop:

§§§java
int i = 0;
while (i < 5) {
    System.out.println("i is " + i);
    i++;
}
§§§

Common patterns:

- Count 0 to n-1 (n times): §for (int i = 0; i < n; i++)§
- Count 1 to n: §for (int i = 1; i <= n; i++)§
- Count by twos: §for (int i = 0; i <= 10; i += 2)§
- Count down: §for (int i = 10; i > 0; i--)§

A variable declared in the header exists only inside the loop. After the loop, §i§ is out of scope.
` },
      { type: 'quiz', id: 'u2-8-q-for1', question: 'How many times does §for (int i = 3; i <= 9; i += 2)§ run its body?',
        choices: ['3', '4', '5', '7'], answer: 1, explanation: 'i takes the values 3, 5, 7, 9: four times.' },
      { type: 'quiz', id: 'u2-8-q-for2', question: 'What is the value of §sum§ after this loop?\n\n§§§java\nint sum = 0;\nfor (int i = 10; i > 0; i -= 3) sum += i;\n§§§',
        choices: ['22', '28', '55', '10'], answer: 0, explanation: 'i is 10, 7, 4, 1, so sum = 10 + 7 + 4 + 1 = 22.' },
      { type: 'quiz', id: 'u2-8-q-for3', question: 'Which loop prints the numbers 1 to 10?',
        choices: ['for (int i = 1; i < 10; i++)', 'for (int i = 0; i <= 10; i++)', 'for (int i = 1; i <= 10; i++)', 'for (int i = 10; i > 1; i--)'], answer: 2,
        explanation: 'Start at 1 and keep going while i <= 10. The first stops at 9, the second starts at 0, the last counts down.' },
      { type: 'predict', id: 'u2-8-p-for', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        for (int i = 2; i <= 20; i += 6) {
            System.out.print(i + ",");
        }
        System.out.println();
        for (int k = 3; k > 0; k--) {
            System.out.print(k + " ");
        }
        System.out.println("go");
    }
}
`, answer: '2,8,14,20,\n3 2 1 go', explanation: 'i takes 2, 8, 14, 20 and each is followed by a comma. The second loop counts down from 3.' },
      { type: 'code', id: 'u2-8-for-count', prompt: 'Use a §for§ loop to print the even numbers from 2 to 10 on one line, separated by spaces: §2 4 6 8 10§.',
        expected: '2 4 6 8 10',
        starter: j`public class Main {
    public static void main(String[] args) {
        // TODO
        System.out.println();
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        for (int i = 2; i <= 10; i += 2) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}
` },
      { type: 'code', id: 'u2-8-for-fix', prompt: 'A countdown should print §5 4 3 2 1 Liftoff!§ but this code has two mistakes in the loop header. Fix them.',
        expected: '5 4 3 2 1 Liftoff!',
        starter: j`public class Main {
    public static void main(String[] args) {
        for (int i = 5; i < 1; i++) {
            System.out.print(i + " ");
        }
        System.out.println("Liftoff!");
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        for (int i = 5; i >= 1; i--) {
            System.out.print(i + " ");
        }
        System.out.println("Liftoff!");
    }
}
`, hint: 'To count down you need i-- and a condition that is true while i is still at least 1.' },
      { type: 'code', id: 'u2-8-for-table', prompt: 'Print the first five multiples of 7 as §7 14 21 28 35§ (one line, space separated) with a for loop whose body is a single print.',
        expected: '7 14 21 28 35',
        starter: j`public class Main {
    public static void main(String[] args) {
        // TODO
        System.out.println();
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.print(7 * i + " ");
        }
        System.out.println();
    }
}
`, hint: 'Count i from 1 to 5 and print 7 * i.' },
      { type: 'code', id: 'u2-8-for-dot', dot: true, minDotMoves: 5,
        prompt: 'The number of sides drives the whole shape. Set §n§ to 3, 5, 8 or 12 and watch each regular polygon appear (exterior angle is 360 / n).',
        starter: j`public class Main {
    public static void main(String[] args) {
        int n = 7;
        Dot d = new Dot(-20, -45);
        d.setColor("violet");
        for (int i = 0; i < n; i++) {
            d.forward(40);
            d.turnRight(360.0 / n);
        }
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int n = 7;
        Dot d = new Dot(-20, -45);
        d.setColor("violet");
        for (int i = 0; i < n; i++) {
            d.forward(40);
            d.turnRight(360.0 / n);
        }
    }
}
` },
    ],
  },
  {
    id: '2-9',
    title: 'Implementing Selection and Iteration Algorithms',
    blocks: [
      { type: 'text', md: md`
Most standard loop algorithms follow a few patterns. Learn to recognize them.

**Accumulate (sum or product).** Start with the identity value (0 for sums, 1 for products), then update in the loop.

**Count.** Use a counter that goes up only when an §if§ condition is met.

**Average.** Sum and count, then divide, remembering integer division: §(double) sum / count§.

**Min / max.** Start with a value that any real item will beat: §Integer.MAX_VALUE§ for the minimum, §Integer.MIN_VALUE§ for the maximum (or the first item). Starting a minimum at 0 gives the wrong answer when all values are positive.

**Digit processing.** §n % 10§ gets the last digit and §n /= 10§ drops it.

**Divisibility and factors.** A number §d§ divides §n§ when §n % d == 0§. A number above 1 is prime if no divisor between 2 and n-1 divides it.

**Flag variable.** Use a boolean that starts true (or false) and is changed when you find a counterexample.

§§§java
boolean prime = n > 1;
for (int d = 2; d < n; d++) {
    if (n % d == 0) prime = false;
}
§§§
` },
      { type: 'quiz', id: 'u2-9-q-alg1', question: 'To find the **smallest** of several positive numbers by scanning them, what should §min§ be initialized to?',
        choices: ['0', '-1', 'Integer.MAX_VALUE', 'Integer.MIN_VALUE'], answer: 2, explanation: 'The starting value must be larger than any item so that the first real item replaces it. Starting at 0 would stay 0 forever.' },
      { type: 'quiz', id: 'u2-9-q-alg2', question: 'What does this code compute?\n\n§§§java\nint c = 0;\nfor (int i = 1; i <= 100; i++)\n    if (i % 5 == 0 && i % 2 == 0) c++;\n§§§',
        choices: ['How many numbers up to 100 are divisible by 10', 'The sum of multiples of 10', 'How many numbers up to 100 are divisible by 5 or 2', 'How many numbers up to 100 are odd'], answer: 0, explanation: 'Divisible by both 5 and 2 means divisible by 10. The count is 10.' },
      { type: 'quiz', id: 'u2-9-q-alg3', question: 'Which line correctly computes the average of §sum§ and §count§ (both ints) as a decimal?',
        choices: ['double avg = sum / count;', 'double avg = (double) (sum / count);', 'double avg = (double) sum / count;', 'int avg = sum / count;'], answer: 2, explanation: 'The cast must happen before the division. The first two do integer division first.' },
      { type: 'predict', id: 'u2-9-p-alg', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        int n = 3052;
        int sum = 0;
        int count = 0;
        while (n > 0) {
            int digit = n % 10;
            if (digit > 2) {
                count++;
            }
            sum += digit;
            n /= 10;
        }
        System.out.println(sum + " " + count);
    }
}
`, answer: '10 2', explanation: 'The digits are 2, 5, 0, 3 (last to first). Their sum is 10, and the digits above 2 are 5 and 3, so count is 2.' },
      { type: 'code', id: 'u2-9-alg-prime', prompt: 'Complete the flag-variable algorithm. The loop checks every number from 2 to n-1 as a possible divisor. For 21 it must print §21 is prime: false§ (then try 29 and 2 to be sure).',
        expected: '21 is prime: false',
        starter: j`public class Main {
    public static void main(String[] args) {
        int n = 21;
        boolean prime = n > 1;
        for (int d = 2; d < n; d++) {
            // TODO: if d divides n, it is not prime
        }
        System.out.println(n + " is prime: " + prime);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int n = 21;
        boolean prime = n > 1;
        for (int d = 2; d < n; d++) {
            if (n % d == 0) {
                prime = false;
            }
        }
        System.out.println(n + " is prime: " + prime);
    }
}
`, hint: 'if (n % d == 0) then set prime to false.' },
      { type: 'code', id: 'u2-9-alg-minmax', prompt: 'The loop generates the values (i * 7) % 11 + 5 for i from 0 to 9. Find the smallest and largest. This code has a bug in how the minimum starts, so it reports §min=0§. Fix it so it prints §min=5 max=15§.',
        expected: 'min=5 max=15',
        starter: j`public class Main {
    public static void main(String[] args) {
        int min = 0;
        int max = Integer.MIN_VALUE;
        for (int i = 0; i < 10; i++) {
            int v = (i * 7) % 11 + 5;
            if (v < min) min = v;
            if (v > max) max = v;
        }
        System.out.println("min=" + min + " max=" + max);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int min = Integer.MAX_VALUE;
        int max = Integer.MIN_VALUE;
        for (int i = 0; i < 10; i++) {
            int v = (i * 7) % 11 + 5;
            if (v < min) min = v;
            if (v > max) max = v;
        }
        System.out.println("min=" + min + " max=" + max);
    }
}
`, hint: 'No value is below 0, so min never changes. Start it at the largest possible int.' },
      { type: 'code', id: 'u2-9-alg-avg', prompt: 'Compute the average of the whole numbers from 1 to 10 as a decimal and print §Average: 5.5§.',
        expected: 'Average: 5.5',
        starter: j`public class Main {
    public static void main(String[] args) {
        int sum = 0;
        int count = 0;
        // TODO: loop from 1 to 10, accumulating sum and count
        // then print "Average: " + the decimal average
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int sum = 0;
        int count = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;
            count++;
        }
        double avg = (double) sum / count;
        System.out.println("Average: " + avg);
    }
}
` },
      { type: 'code', id: 'u2-9-alg-random', prompt: 'Simulate rolling two dice 5000 times and count how often the total is 7 (about one in six). The exact count changes every run, so this program reports whether the count is plausible. Fill in the die rolls (1 to 6). Expected: §plausible: true§.',
        expected: 'plausible: true',
        starter: j`public class Main {
    public static void main(String[] args) {
        int sevens = 0;
        for (int i = 0; i < 5000; i++) {
            int d1 = 0; // TODO: random die 1..6
            int d2 = 0; // TODO: random die 1..6
            if (d1 + d2 == 7) {
                sevens++;
            }
        }
        boolean plausible = sevens > 600 && sevens < 1100;
        System.out.println("plausible: " + plausible);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int sevens = 0;
        for (int i = 0; i < 5000; i++) {
            int d1 = (int) (Math.random() * 6) + 1;
            int d2 = (int) (Math.random() * 6) + 1;
            if (d1 + d2 == 7) {
                sevens++;
            }
        }
        boolean plausible = sevens > 600 && sevens < 1100;
        System.out.println("plausible: " + plausible);
    }
}
` },
    ],
  },
  {
    id: '2-10',
    title: 'Implementing String Algorithms',
    blocks: [
      { type: 'text', md: md`
Loops and Strings go together: a loop can visit every character, one index at a time.

§§§java
String s = "hello";
for (int i = 0; i < s.length(); i++) {
    System.out.println(s.substring(i, i + 1));   // or s.charAt(i)
}
§§§

Valid indexes run from §0§ to §s.length() - 1§. Using §i <= s.length()§ reads one past the end and crashes with a **StringIndexOutOfBoundsException**.

Typical algorithms:

- **Count or find**: compare each character. For single characters, use §s.charAt(i) == 'a'§ (single quotes for a char). For substrings, §s.substring(i, i + 1).equals("a")§.
- **Build a new String**: start with §""§ and add pieces with §+§ inside the loop. To reverse, add each character in front: §result = s.charAt(i) + result;§.
- **Search for a substring**: loop over each possible start position §i§ and test §s.substring(i, i + word.length()).equals(word)§, stopping before you run past the end.
- **Palindromes**: a String reads the same forwards and backwards. Compare the first and last characters, moving inward, or compare the String with its reverse using §equals§.

Remember that Strings are immutable. Building a result creates a new String each time; the original is unchanged.
` },
      { type: 'quiz', id: 'u2-10-q-s1', question: 'What happens when this loop runs on §String s = "abc";§?\n\n§§§java\nfor (int i = 0; i <= s.length(); i++)\n    System.out.print(s.charAt(i));\n§§§',
        choices: ['Prints abc', 'Prints abc and then crashes with StringIndexOutOfBoundsException', 'Does not compile', 'Prints abc followed by a space'], answer: 1, explanation: 'The last pass has i = 3, but the valid indexes are 0 to 2.' },
      { type: 'quiz', id: 'u2-10-q-s2', question: 'What does this code produce?\n\n§§§java\nString r = "";\nString w = "tab";\nfor (int i = 0; i < w.length(); i++)\n    r = w.charAt(i) + r;\n§§§',
        choices: ['"tab"', '"bat"', '"bta"', '"ttt"'], answer: 1, explanation: 'Each new character is placed in front: t, then at, then bat.' },
      { type: 'quiz', id: 'u2-10-q-s3', question: 'Which is the correct way to test whether the character at index §i§ of §s§ is a lowercase "e"?',
        choices: ['s.charAt(i) == "e"', 's.charAt(i) == \'e\'', 's.substring(i) == "e"', 's[i] == \'e\''], answer: 1, explanation: 'charAt returns a char, which is compared to a char literal in single quotes. Strings use double quotes, and Java has no s[i] syntax.' },
      { type: 'predict', id: 'u2-10-p-str', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        String s = "banana";
        String out = "";
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            String ch = s.substring(i, i + 1);
            if (ch.equals("a")) {
                count++;
            } else {
                out += ch;
            }
        }
        System.out.println(out + " " + count);
    }
}
`, answer: 'bnn 3', explanation: 'The a characters are counted (3). Every other letter is appended to out in order: b, n, n.' },
      { type: 'code', id: 'u2-10-str-count', prompt: 'Count the vowels (a, e, i, o, u) in the sentence. Print §Vowels: 9§.',
        expected: 'Vowels: 9',
        starter: j`public class Main {
    public static void main(String[] args) {
        String text = "programming is fun and useful";
        int count = 0;
        // TODO: loop over every character
        System.out.println("Vowels: " + count);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        String text = "programming is fun and useful";
        int count = 0;
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                count++;
            }
        }
        System.out.println("Vowels: " + count);
    }
}
`, hint: 'Combine five comparisons with ||.' },
      { type: 'code', id: 'u2-10-str-reverse', prompt: 'Build the reverse of §word§ in a new String and print it: for "stressed" print §desserts§.',
        expected: 'desserts',
        starter: j`public class Main {
    public static void main(String[] args) {
        String word = "stressed";
        String reversed = "";
        // TODO
        System.out.println(reversed);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        String word = "stressed";
        String reversed = "";
        for (int i = 0; i < word.length(); i++) {
            reversed = word.substring(i, i + 1) + reversed;
        }
        System.out.println(reversed);
    }
}
` },
      { type: 'code', id: 'u2-10-str-fix', prompt: 'This program should print §Found at 2§ for the first position of a "z" in the text, but it crashes with a StringIndexOutOfBoundsException. Fix the loop (and make sure it stops looking after it finds the first one).',
        expected: 'Found at 2',
        starter: j`public class Main {
    public static void main(String[] args) {
        String text = "lazyzebra";
        int pos = -1;
        for (int i = 0; i <= text.length(); i++) {
            if (text.substring(i, i + 1).equals("z") && pos == -1) {
                pos = i;
            }
        }
        System.out.println("Found at " + pos);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        String text = "lazyzebra";
        int pos = -1;
        for (int i = 0; i < text.length(); i++) {
            if (text.substring(i, i + 1).equals("z") && pos == -1) {
                pos = i;
            }
        }
        System.out.println("Found at " + pos);
    }
}
`, hint: 'The valid indexes of a String are 0 to length() - 1, so the condition should use < not <=.' },
      { type: 'code', id: 'u2-10-str-pal', prompt: 'Write a palindrome check: build the reverse of §word§ and compare it with §equals§. For "racecar" print §racecar: true§.',
        expected: 'racecar: true',
        starter: j`public class Main {
    public static void main(String[] args) {
        String word = "racecar";
        String rev = "";
        // TODO: build rev, then compare
        boolean pal = false;
        System.out.println(word + ": " + pal);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        String word = "racecar";
        String rev = "";
        for (int i = 0; i < word.length(); i++) {
            rev = word.charAt(i) + rev;
        }
        boolean pal = word.equals(rev);
        System.out.println(word + ": " + pal);
    }
}
` },
    ],
  },
  {
    id: '2-11',
    title: 'Nested Iteration',
    blocks: [
      { type: 'text', md: md`
A loop inside another loop is a **nested loop**. For every single pass of the **outer** loop, the **inner** loop runs from start to finish.

§§§java
for (int row = 1; row <= 3; row++) {
    for (int col = 1; col <= 4; col++) {
        System.out.print("* ");
    }
    System.out.println();    // end the row
}
§§§

That prints 3 rows of 4 stars. The body of the inner loop runs 3 x 4 = **12** times. In general the count is (outer iterations) x (inner iterations). If the inner loop's limit depends on the outer variable, add the counts instead:

§§§java
for (int row = 1; row <= 4; row++) {
    for (int col = 1; col <= row; col++) System.out.print("*");
    System.out.println();
}
// *
// **
// ***
// ****
§§§

Use different variable names for the two loops (§i§ and §j§, or §row§ and §col§). Reusing the same name in the inner loop is a compile error.

Nested loops also create tables, grids and repeated drawings. With Dot, an outer loop can turn between copies of a shape drawn by the inner loop.
` },
      { type: 'quiz', id: 'u2-11-q-n1', question: 'How many times does §System.out.print("x")§ run?\n\n§§§java\nfor (int i = 0; i < 5; i++)\n    for (int j = 0; j < 3; j++)\n        System.out.print("x");\n§§§',
        choices: ['3', '5', '8', '15'], answer: 3, explanation: '5 outer passes x 3 inner passes = 15.' },
      { type: 'quiz', id: 'u2-11-q-n2', question: 'How many times does the inner body run?\n\n§§§java\nfor (int i = 1; i <= 4; i++)\n    for (int j = 1; j <= i; j++)\n        count++;\n§§§',
        choices: ['4', '10', '16', '8'], answer: 1, explanation: 'The inner loop runs 1, 2, 3 and 4 times: 1 + 2 + 3 + 4 = 10.' },
      { type: 'quiz', id: 'u2-11-q-n3', question: 'What is wrong with this code?\n\n§§§java\nfor (int i = 0; i < 3; i++)\n    for (int i = 0; i < 3; i++)\n        System.out.print(i);\n§§§',
        choices: ['Nothing', 'It never ends', 'The variable i is declared twice, a compile-time error', 'It prints in reverse'], answer: 2, explanation: 'The inner i would redeclare a variable that is already in scope. Use a different name.' },
      { type: 'predict', id: 'u2-11-p-nest2', question: 'What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            for (int j = i; j <= 3; j++) {
                System.out.print(i * j + " ");
            }
            System.out.println();
        }
    }
}
`, answer: '1 2 3\n4 6\n9', explanation: 'Row 1: j = 1,2,3 gives 1 2 3. Row 2: j = 2,3 gives 4 6. Row 3: j = 3 gives 9.' },
      { type: 'code', id: 'u2-11-nest-tri', prompt: 'Print a right triangle of stars with 5 rows (1 star on the first row, 5 on the last). Expected:\n\n§*§\n§**§\n§***§\n§****§\n§*****§',
        expected: '*\n**\n***\n****\n*****',
        starter: j`public class Main {
    public static void main(String[] args) {
        // TODO: nested loops
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        for (int row = 1; row <= 5; row++) {
            for (int col = 1; col <= row; col++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}
`, hint: 'The inner loop should run as many times as the current row number.' },
      { type: 'code', id: 'u2-11-nest-table', prompt: 'Print a 4 by 4 multiplication table with numbers separated by spaces, one row per line, starting with §1 2 3 4§ and ending with §4 8 12 16§.',
        expected: '1 2 3 4\n2 4 6 8\n3 6 9 12\n4 8 12 16',
        starter: j`public class Main {
    public static void main(String[] args) {
        // TODO
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 4; i++) {
            for (int j = 1; j <= 4; j++) {
                System.out.print(i * j + " ");
            }
            System.out.println();
        }
    }
}
` },
      { type: 'code', id: 'u2-11-nest-fix', prompt: 'This should print a 3 row by 5 column grid of §#§ characters, but the inner loop reuses the outer variable and fails to compile. Also the rows are not ended with a new line. Fix both.',
        expected: '#####\n#####\n#####',
        starter: j`public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            for (int i = 0; i < 5; i++) {
                System.out.print("#");
            }
        }
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 5; j++) {
                System.out.print("#");
            }
            System.out.println();
        }
    }
}
` },
      { type: 'code', id: 'u2-11-nest-dot', dot: true, minDotMoves: 40,
        prompt: 'A rosette: the inner loop draws a square, the outer loop rotates and repeats it. Change the numbers of squares or sides to design your own pattern (36 total sides = 9 squares).',
        starter: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot(0, -10);
        d.setColor("violet");
        for (int petal = 0; petal < 12; petal++) {
            for (int side = 0; side < 4; side++) {
                d.forward(45);
                d.turnRight(90);
            }
            d.turnRight(30);
        }
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        Dot d = new Dot(0, -10);
        d.setColor("violet");
        for (int petal = 0; petal < 12; petal++) {
            for (int side = 0; side < 4; side++) {
                d.forward(45);
                d.turnRight(90);
            }
            d.turnRight(30);
        }
    }
}
` },
    ],
  },
  {
    id: '2-12',
    title: 'Informal Runtime Analysis of Loops',
    blocks: [
      { type: 'text', md: md`
Often you need to know what a loop does without running it, or how much work it does. Two skills help: **tracing** and **counting iterations**.

**Tracing.** Make a table with a column for each variable and a row for each pass through the loop, updating exactly as the code would:

| pass | i | sum |
|---|---|---|
| start | 1 | 0 |
| 1 | 2 | 1 |
| 2 | 3 | 3 |
| 3 | 4 | 6 |

**Counting iterations.**

- §for (int i = a; i < b; i++)§ runs §b - a§ times (if b is larger than a).
- §for (int i = a; i <= b; i++)§ runs §b - a + 1§ times.
- Stepping by §k§ divides that by §k§ (rounding up for the start values that fit).
- Multiplying or dividing the variable each pass (§i *= 2§, §i /= 2§) takes only about log base 2 of n passes: very few.
- Nested loops multiply: an outer loop of n and an inner loop of n gives n x n = n squared passes.

A **statement execution count** is how many times a line of code runs. It tells you how the running time grows as the input grows: a loop over n items does work proportional to n, while a nested loop does work proportional to n squared, which gets slow quickly. This informal reasoning is all the AP exam asks for.

Watch for loops that never run (the condition starts false) and loops that never stop (the update moves the wrong way).
` },
      { type: 'quiz', id: 'u2-12-q-an1', question: 'How many times does the body run?\n\n§§§java\nfor (int i = 5; i <= 20; i += 5)\n§§§',
        choices: ['3', '4', '5', '16'], answer: 1, explanation: 'i is 5, 10, 15, 20: four times.' },
      { type: 'quiz', id: 'u2-12-q-an2', question: 'About how many times does this loop run for n = 1000?\n\n§§§java\nfor (int i = 1; i < n; i *= 2)\n§§§',
        choices: ['10', '500', '1000', '2000'], answer: 0, explanation: 'i doubles each time: 1, 2, 4, ..., 512. That is 10 passes, because 2^10 is about 1000.' },
      { type: 'quiz', id: 'u2-12-q-an3', question: 'A loop over n items does 3 steps per item. A nested loop does n x n steps. If n grows from 10 to 100, how does the work change?',
        choices: ['Both grow 10 times', 'Single loop 10 times, nested loop 100 times', 'Single loop 100 times, nested loop 10 times', 'Neither changes'], answer: 1, explanation: 'Single loop work is proportional to n (10x). Nested loop work is proportional to n squared (100x).' },
      { type: 'predict', id: 'u2-12-p-trace', question: 'Trace the loop. What does this program print?',
        code: j`public class Main {
    public static void main(String[] args) {
        int x = 100;
        int steps = 0;
        while (x > 1) {
            if (x % 2 == 0) {
                x /= 2;
            } else {
                x -= 1;
            }
            steps++;
        }
        System.out.println(x + " " + steps);
    }
}
`, answer: '1 8', explanation: 'x: 100, 50, 25, 24, 12, 6, 3, 2, 1. That is 8 changes, ending at 1.' },
      { type: 'predict', id: 'u2-12-p-count', question: 'How many times does the counter increment? Print result:',
        code: j`public class Main {
    public static void main(String[] args) {
        int count = 0;
        for (int i = 0; i < 6; i++) {
            for (int j = i; j < 6; j += 2) {
                count++;
            }
        }
        System.out.println(count);
    }
}
`, answer: '12', explanation: 'Inner passes for i = 0..5 are 3, 3, 2, 2, 1, 1 (j = i, i+2, ... below 6): total 12.' },
      { type: 'code', id: 'u2-12-an-count', prompt: 'Change **one number** in the loop header so the body runs exactly **7** times. The program prints how many times it ran. Expected: §Ran 7 times§.',
        expected: 'Ran 7 times',
        starter: j`public class Main {
    public static void main(String[] args) {
        int runs = 0;
        for (int i = 0; i < 10; i += 2) {
            runs++;
        }
        System.out.println("Ran " + runs + " times");
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int runs = 0;
        for (int i = 0; i < 14; i += 2) {
            runs++;
        }
        System.out.println("Ran " + runs + " times");
    }
}
`, hint: 'i takes 0, 2, 4, ... Which limit allows exactly seven values?' },
      { type: 'code', id: 'u2-12-an-fix', prompt: 'This loop was meant to sum the numbers 10 down to 1 (55), but the counter moves the wrong way, so only a safety guard ends it and the sum is wrong. Fix the **update** (and remove the guards) so it prints §Sum: 55§.',
        expected: 'Sum: 55',
        starter: j`public class Main {
    public static void main(String[] args) {
        int sum = 0;
        int n = 10;
        while (n >= 1 && sum < 1000) {
            sum += n;
            n++;
            if (sum > 500) {
                break;
            }
        }
        System.out.println("Sum: " + sum);
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int sum = 0;
        int n = 10;
        while (n >= 1) {
            sum += n;
            n--;
        }
        System.out.println("Sum: " + sum);
    }
}
`, hint: 'The counter must move toward the end of the loop: count down with n--. Then the extra guard conditions are not needed.' },
      { type: 'code', id: 'u2-12-an-nested', prompt: 'Count the statement executions of a nested loop yourself in code: add a counter to the inner body and print it. For the loops below (outer 0 to 3, inner 0 to 4) print §Inner body ran 20 times§.',
        expected: 'Inner body ran 20 times',
        starter: j`public class Main {
    public static void main(String[] args) {
        int count = 0;
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 5; j++) {
                // TODO: count each pass
            }
        }
        System.out.println("Inner body ran " + count + " times");
    }
}
`,
        solution: j`public class Main {
    public static void main(String[] args) {
        int count = 0;
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 5; j++) {
                count++;
            }
        }
        System.out.println("Inner body ran " + count + " times");
    }
}
` },
    ],
  },
];
