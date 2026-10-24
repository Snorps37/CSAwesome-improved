import type { Lesson } from './types';
import { md } from './md';
import { w } from './u4util';

const j = String.raw;

// Unit 4 wrap-up: summary, coding practice, multiple choice, practice test, FRQs, projects. Original wording.
export const unit4c: Lesson[] = [
  {
    id: '4-16',
    title: 'Unit 4 Summary',
    blocks: [
      { type: 'text', md: md`
You have now worked with every major data collection in AP CS A. Use this page as a checklist and a quick reference.

## Arrays

- Fixed length, one element type, indexes **0 to length - 1**.
- §new int[5]§ gives zeros; object arrays start as §null§. Initializer list: §{1, 2, 3}§.
- Length is §a.length§ (no parentheses). Out-of-range index throws §ArrayIndexOutOfBoundsException§.
- Array variables hold references: §b = a§ shares one array.
- Traverse with an indexed loop (read and write) or an enhanced for loop (read only).

## ArrayList

- §import java.util.ArrayList;§ and a class type: §ArrayList<Integer>§.
- §size()§, §get(i)§, §set(i, x)§, §add(x)§, §add(i, x)§, §remove(i)§.
- Never add or remove inside an enhanced for loop. When removing in an indexed loop, go backward or only advance when nothing was removed.
- Wrapper classes (§Integer§, §Double§) with autoboxing and unboxing make numbers usable in lists. §Integer.parseInt§, §Double.parseDouble§, §Integer.MAX_VALUE§, §Integer.MIN_VALUE§.

## Algorithms

| Task | Core idea |
|---|---|
| sum, average, count | accumulator variable, one loop |
| max, min | start from the first element |
| any / all | boolean flag |
| swap, reverse | temporary variable; first half with last half |
| filter | copy matches into a new list |
| linear search | check each element, return index or -1 |
| binary search | sorted data only; halve the range each time |
| selection sort | place the smallest remaining item at position i |
| insertion sort | slide larger items right, insert into the sorted prefix |
| merge sort | split, sort halves recursively, merge |

## Recursion

A recursive method needs a **base case** and a recursive call on a **smaller** problem. Trace the stack: work before the call happens going down, work after it happens coming back.

## 2D arrays

- Array of rows: §m.length§ rows, §m[0].length§ columns, element §m[row][col]§.
- Nested loops: outer rows and inner columns for row-major; swap them for column-major.
- Enhanced form: §for (int[] row : m) for (int v : row)§.
- Check bounds before looking at neighbors.

## Text input

A §Scanner§ reads tokens or lines from a file or a String with §hasNext§/§next§, §hasNextInt§/§nextInt§ and §hasNextLine§/§nextLine§. Reading a file requires dealing with §IOException§.

## Common mistakes to avoid

1. Using §<=§ instead of §<§ with §length§ or §size()§.
2. Writing §length()§ for an array or §length§ for a String.
3. Starting a max with 0 when the data can be negative.
4. Comparing Strings or wrapper objects with §==§.
5. Removing from a list inside an enhanced for loop, or skipping items after a forward remove.
6. Binary searching data that is not sorted.
7. Forgetting the base case, or recursing on a problem that does not shrink.
8. Mixing up row and column indexes.
` },
      { type: 'quiz', id: 'q-sum1', question: 'Which of these can store primitive int values directly?',
        choices: ['ArrayList<int>', 'int[]', 'ArrayList<Integer> only as objects, so no', 'Both ArrayList<int> and int[]'], answer: 1, explanation: 'Arrays can hold primitives. ArrayList holds objects, so ints are boxed into Integer.' },
      { type: 'quiz', id: 'q-sum2', question: 'Which statement about enhanced for loops is true?',
        choices: ['They can change the elements of an int array', 'They are the best choice when you only need to read every value in order', 'They can run backward', 'They can safely remove from an ArrayList'], answer: 1, explanation: 'Enhanced for loops are simple and safe for reading, but they hide the index, cannot change primitive elements and cannot change a list size.' },
      { type: 'quiz', id: 'q-sum3', question: 'Which of these is a requirement for binary search?',
        choices: ['The target is the first element', 'The data is sorted', 'The array has no negative numbers', 'The method is recursive'], answer: 1, explanation: 'Without ordering, comparing with the middle tells you nothing about which half holds the target.' },
      { type: 'predict', id: 'p-sum1', question: 'A quick check of the main ideas. What does this program print?',
        code: w(j`int[] a = {3, 1, 2};
ArrayList<Integer> list = new ArrayList<Integer>();
for (int v : a) {
    list.add(v * 2);
}
list.remove(0);
list.add(1, 9);
int[][] m = {{list.get(0), list.get(1)}, {list.get(2), 0}};
System.out.println(list + " " + m[1][0] + " " + m[0].length);`),
        answer: '[2, 9, 4] 4 2', explanation: 'list is [6,2,4]. remove(0) gives [2,4]. add(1,9) gives [2,9,4]. m is {{2,9},{4,0}}, so m[1][0] is 4 and each row has 2 columns.' },
    ],
  },
  {
    id: '4-17',
    title: 'Coding Practice',
    blocks: [
      { type: 'text', md: md`
Mixed practice with arrays, ArrayLists, searching, recursion and 2D arrays. Each exercise has a reference solution you can reveal after you try. Aim to trace the expected output on paper first.
` },
      { type: 'code', id: 'cp-pos', prompt: '**Count positives.** Print how many elements are greater than 0. Expected: §Positives: 4§.',
        expected: 'Positives: 4',
        starter: w(j`int[] a = {5, -2, 0, 8, -9, 3, 1};
int count = 0;
// TODO
System.out.println("Positives: " + count);`),
        solution: w(j`int[] a = {5, -2, 0, 8, -9, 3, 1};
int count = 0;
for (int v : a) {
    if (v > 0) {
        count++;
    }
}
System.out.println("Positives: " + count);`),
        hint: 'Zero is not positive.' },
      { type: 'code', id: 'cp-second', prompt: '**Second largest distinct value.** With {5, 9, 2, 9, 7} the answer is 7, not 9. One pass, no sorting. Expected: §Second: 7§.',
        expected: 'Second: 7',
        starter: w(j`int[] a = {5, 9, 2, 9, 7};
int max = Integer.MIN_VALUE;
int second = Integer.MIN_VALUE;
// TODO: update max and second for each value
System.out.println("Second: " + second);`),
        solution: w(j`int[] a = {5, 9, 2, 9, 7};
int max = Integer.MIN_VALUE;
int second = Integer.MIN_VALUE;
for (int v : a) {
    if (v > max) {
        second = max;
        max = v;
    } else if (v > second && v < max) {
        second = v;
    }
}
System.out.println("Second: " + second);`),
        hint: 'A new maximum pushes the old maximum down to second. Otherwise a value strictly between second and max becomes second.' },
      { type: 'code', id: 'cp-sorted', prompt: '**isSorted.** Return true if the array is in non-decreasing order. Expected: §true false§.',
        expected: 'true false',
        starter: w(j`System.out.println(isSorted(new int[] {1, 2, 2, 5}) + " " + isSorted(new int[] {3, 4, 1}));`,
          j`static boolean isSorted(int[] a) {
    // TODO
    return false;
}`),
        solution: w(j`System.out.println(isSorted(new int[] {1, 2, 2, 5}) + " " + isSorted(new int[] {3, 4, 1}));`,
          j`static boolean isSorted(int[] a) {
    for (int i = 0; i < a.length - 1; i++) {
        if (a[i] > a[i + 1]) {
            return false;
        }
    }
    return true;
}`),
        hint: 'Compare neighbors; stop at length - 2. Return false at the first out-of-order pair.' },
      { type: 'code', id: 'cp-palin', prompt: '**Palindrome array.** True if it reads the same forward and backward (compare from both ends). Expected: §true false§.',
        expected: 'true false',
        starter: w(j`System.out.println(isPalindrome(new int[] {1, 2, 3, 2, 1}) + " " + isPalindrome(new int[] {1, 2, 3, 4}));`,
          j`static boolean isPalindrome(int[] a) {
    // TODO
    return false;
}`),
        solution: w(j`System.out.println(isPalindrome(new int[] {1, 2, 3, 2, 1}) + " " + isPalindrome(new int[] {1, 2, 3, 4}));`,
          j`static boolean isPalindrome(int[] a) {
    for (int i = 0; i < a.length / 2; i++) {
        if (a[i] != a[a.length - 1 - i]) {
            return false;
        }
    }
    return true;
}`),
        hint: 'Compare a[i] with a[a.length - 1 - i] for the first half only.' },
      { type: 'code', id: 'cp-short', prompt: '**Remove short words.** Remove every word with 3 or fewer letters from the list. Expected: §[planet, castle, river]§.',
        expected: '[planet, castle, river]',
        starter: w(j`ArrayList<String> words = new ArrayList<String>();
String[] data = {"planet", "sun", "castle", "of", "river", "a"};
for (String s : data) {
    words.add(s);
}
// TODO
System.out.println(words);`),
        solution: w(j`ArrayList<String> words = new ArrayList<String>();
String[] data = {"planet", "sun", "castle", "of", "river", "a"};
for (String s : data) {
    words.add(s);
}
for (int i = words.size() - 1; i >= 0; i--) {
    if (words.get(i).length() <= 3) {
        words.remove(i);
    }
}
System.out.println(words);`),
        hint: 'Loop backward so removal does not skip any word.' },
      { type: 'code', id: 'cp-running', prompt: '**Running totals.** Build a new list where each item is the sum of all items up to that position. Expected: §[1, 3, 6, 10]§.',
        expected: '[1, 3, 6, 10]',
        starter: w(j`ArrayList<Integer> nums = new ArrayList<Integer>();
nums.add(1);
nums.add(2);
nums.add(3);
nums.add(4);
ArrayList<Integer> totals = new ArrayList<Integer>();
// TODO
System.out.println(totals);`),
        solution: w(j`ArrayList<Integer> nums = new ArrayList<Integer>();
nums.add(1);
nums.add(2);
nums.add(3);
nums.add(4);
ArrayList<Integer> totals = new ArrayList<Integer>();
int running = 0;
for (int v : nums) {
    running += v;
    totals.add(running);
}
System.out.println(totals);`),
        hint: 'Keep a running sum and add it to totals after every item.' },
      { type: 'code', id: 'cp-digits', prompt: '**Two recursions.** Write §digitCount(n)§ (how many digits) and §gcd(a, b)§ (Euclid: gcd(a, 0) is a, otherwise gcd(b, a % b)). Expected: §5 6§.',
        expected: '5 6',
        starter: w(j`System.out.println(digitCount(12345) + " " + gcd(48, 18));`,
          j`static int digitCount(int n) {
    // TODO
    return 0;
}

static int gcd(int a, int b) {
    // TODO
    return 0;
}`),
        solution: w(j`System.out.println(digitCount(12345) + " " + gcd(48, 18));`,
          j`static int digitCount(int n) {
    if (n < 10) {
        return 1;
    }
    return 1 + digitCount(n / 10);
}

static int gcd(int a, int b) {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
}`),
        hint: 'digitCount: a one-digit number has 1 digit; otherwise 1 plus the count for n / 10.' },
      { type: 'code', id: 'cp-even2d', prompt: '**Count evens in a table.** Expected: §Evens: 4§.',
        expected: 'Evens: 4',
        starter: w(j`int[][] m = {{2, 7, 4}, {9, 6, 1}, {3, 8, 5}};
int count = 0;
// TODO
System.out.println("Evens: " + count);`),
        solution: w(j`int[][] m = {{2, 7, 4}, {9, 6, 1}, {3, 8, 5}};
int count = 0;
for (int[] row : m) {
    for (int v : row) {
        if (v % 2 == 0) {
            count++;
        }
    }
}
System.out.println("Evens: " + count);`),
        hint: 'Nested enhanced for loops; test v % 2 == 0.' },
      { type: 'code', id: 'cp-transpose', prompt: '**Transpose.** Build a 3 by 2 table whose rows are the columns of the 2 by 3 table, then print each row. Expected three lines: §1 4§, §2 5§, §3 6§.',
        expected: '1 4\n2 5\n3 6',
        starter: w(j`int[][] m = {{1, 2, 3}, {4, 5, 6}};
int[][] t = new int[3][2];
// TODO: fill t so that t[c][r] = m[r][c]
for (int r = 0; r < t.length; r++) {
    for (int c = 0; c < t[r].length; c++) {
        System.out.print(t[r][c] + (c < t[r].length - 1 ? " " : ""));
    }
    System.out.println();
}`),
        solution: w(j`int[][] m = {{1, 2, 3}, {4, 5, 6}};
int[][] t = new int[3][2];
for (int r = 0; r < m.length; r++) {
    for (int c = 0; c < m[r].length; c++) {
        t[c][r] = m[r][c];
    }
}
for (int r = 0; r < t.length; r++) {
    for (int c = 0; c < t[r].length; c++) {
        System.out.print(t[r][c] + (c < t[r].length - 1 ? " " : ""));
    }
    System.out.println();
}`),
        hint: 'Loop over m and write each value to t at swapped indexes.' },
    ],
  },
  {
    id: '4-18',
    title: 'Multiple Choice Practice',
    blocks: [
      { type: 'text', md: md`
Ten exam-style multiple choice questions. Work each one on paper before answering and read the explanation even when you are right.
` },
      { type: 'quiz', id: 'mc1', question: 'What is the value of §a[a.length / 2]§?\n\n§§§java\nint[] a = {2, 4, 6, 8};\n§§§',
        choices: ['2', '4', '6', '8'], answer: 2, explanation: 'a.length is 4, so the index is 4 / 2 = 2, and a[2] is 6.' },
      { type: 'quiz', id: 'mc2', question: 'Which statement creates an array that can hold 5 boolean values?',
        choices: ['boolean b = new boolean[5];', 'boolean[] b = new boolean[5];', 'boolean[5] b;', 'boolean[] b = new boolean(5);'], answer: 1, explanation: 'The type needs [] on the left and new boolean[5] on the right.' },
      { type: 'quiz', id: 'mc3', question: 'What does the code print?\n\n§§§java\nArrayList<Integer> list = new ArrayList<Integer>();\nlist.add(1); list.add(2); list.add(3); list.add(4);\nlist.remove(1);\nlist.add(0, 9);\nSystem.out.println(list);\n§§§',
        choices: ['[9, 1, 3, 4]', '[9, 2, 3, 4]', '[1, 9, 3, 4]', '[9, 1, 2, 4]'], answer: 0, explanation: 'remove(1) removes the item at index 1 (the value 2): [1, 3, 4]. add(0, 9) inserts at the front: [9, 1, 3, 4].' },
      { type: 'quiz', id: 'mc4', question: 'What happens at run time?\n\n§§§java\nArrayList<String> names = new ArrayList<String>();\nnames.add("A"); names.add("B");\nfor (String s : names) {\n    names.add(s);\n}\n§§§',
        choices: ['names becomes [A, B, A, B]', 'An infinite loop', 'A ConcurrentModificationException', 'A compile error'], answer: 2, explanation: 'Adding to the list while an enhanced for loop is traversing it is not allowed and throws at run time.' },
      { type: 'quiz', id: 'mc5', question: 'A sorted array has 64 elements. At most how many elements does binary search need to examine?',
        choices: ['6', '7', '32', '64'], answer: 1, explanation: '64 halves to 32, 16, 8, 4, 2, 1 (six halvings), and the last remaining element still needs examining: 7 in total.' },
      { type: 'quiz', id: 'mc6', question: 'What is the array after **two passes** of selection sort on {4, 2, 7, 1}?',
        choices: ['{1, 2, 7, 4}', '{1, 2, 4, 7}', '{2, 4, 7, 1}', '{1, 4, 7, 2}'], answer: 0, explanation: 'Pass 1 swaps 1 into position 0: {1, 2, 7, 4}. Pass 2: the smallest from index 1 on is already 2, so nothing changes.' },
      { type: 'quiz', id: 'mc7', question: 'What does §f(4)§ return?\n\n§§§java\npublic static int f(int n) {\n    if (n == 0) return 1;\n    return 2 * f(n - 1);\n}\n§§§',
        choices: ['8', '16', '4', '32'], answer: 1, explanation: 'f(0)=1, f(1)=2, f(2)=4, f(3)=8, f(4)=16. The method computes 2 to the power n.' },
      { type: 'quiz', id: 'mc8', question: 'How many times does the body run?\n\n§§§java\nfor (int r = 0; r < 3; r++)\n    for (int c = 0; c <= r; c++)\n        count++;\n§§§',
        choices: ['3', '6', '9', '12'], answer: 1, explanation: 'The inner loop runs 1, 2 and 3 times: 1 + 2 + 3 = 6.' },
      { type: 'quiz', id: 'mc9', question: 'What happens?\n\n§§§java\nInteger x = null;\nint y = x;\n§§§',
        choices: ['y becomes 0', 'y becomes -1', 'A NullPointerException at run time', 'A compile error'], answer: 2, explanation: 'Unboxing a null Integer fails with a NullPointerException.' },
      { type: 'quiz', id: 'mc10', question: 'Which is the **best** use of an ArrayList rather than an array?',
        choices: ['Storing exactly 12 month names', 'Holding customers waiting in a line, who join and leave over time', 'A fixed 8 by 8 board', 'Storing 5 primitive doubles'], answer: 1, explanation: 'A list that changes size over time is exactly what ArrayList is for.' },
      { type: 'quiz', id: 'mc11', question: 'Which expression refers to the **last** element of §int[][] m = new int[3][5];§?',
        choices: ['m[3][5]', 'm[2][4]', 'm[3][4]', 'm[2][5]'], answer: 1, explanation: 'Last valid indexes are rows - 1 = 2 and columns - 1 = 4.' },
    ],
  },
  {
    id: '4-19',
    title: 'Practice Test',
    blocks: [
      { type: 'text', md: md`
A longer mixed test. Try it without running any code first: trace each program by hand, then check yourself.
` },
      { type: 'quiz', id: 'pt1', question: 'What is the sum of the array after this loop?\n\n§§§java\nint[] a = new int[4];\nfor (int i = 0; i < a.length; i++) a[i] = i * i;\n§§§',
        choices: ['6', '14', '16', '30'], answer: 1, explanation: 'The elements are 0, 1, 4 and 9, which total 14.' },
      { type: 'predict', id: 'pt2', question: 'One pass of a bubble-style swap loop. What does this print?',
        code: w(j`int[] a = {4, 3, 2, 1};
for (int i = 0; i < a.length - 1; i++) {
    if (a[i] > a[i + 1]) {
        int t = a[i];
        a[i] = a[i + 1];
        a[i + 1] = t;
    }
}
for (int v : a) {
    System.out.print(v + " ");
}
System.out.println();`),
        answer: '3 2 1 4', explanation: 'The 4 is swapped past every smaller neighbor and ends at the back.' },
      { type: 'predict', id: 'pt3', question: 'What does this program print?',
        code: w(j`System.out.println(f(987));`,
          j`static int f(int n) {
    if (n < 10) {
        return n;
    }
    return f(n / 10) + n % 10;
}`),
        answer: '24', explanation: 'The method adds the digits: 9 + 8 + 7.' },
      { type: 'predict', id: 'pt4', question: 'What does this program print?',
        code: w(j`int[][] m = new int[3][3];
for (int r = 0; r < 3; r++) {
    for (int c = 0; c < 3; c++) {
        m[r][c] = r + c;
    }
}
System.out.println(m[2][1] + m[1][2]);`),
        answer: '6', explanation: 'Both elements equal 3, and int addition gives 6 (not "33").' },
      { type: 'predict', id: 'pt5', question: 'What does this program print?',
        code: w(j`String[] words = {"pear", "apple", "zoo", "fig"};
int best = 0;
for (int i = 1; i < words.length; i++) {
    if (words[i].compareTo(words[best]) > 0) {
        best = i;
    }
}
System.out.println(words[best] + " " + best);`),
        answer: 'zoo 2', explanation: 'The loop tracks the alphabetically last word; "zoo" comes after the others.' },
      { type: 'predict', id: 'pt6', question: 'What does this program print?',
        code: w(j`System.out.println(wrap("abc"));`,
          j`static String wrap(String s) {
    if (s.length() == 0) {
        return "";
    }
    return s.charAt(0) + wrap(s.substring(1)) + s.charAt(0);
}`),
        answer: 'abccba', explanation: 'wrap("abc") = a + wrap("bc") + a, wrap("bc") = b + wrap("c") + b, wrap("c") = c + "" + c = cc. Together: abccba.' },
      { type: 'predict', id: 'pt7', question: 'What does this program print?',
        code: w(j`ArrayList<Integer> list = new ArrayList<Integer>();
list.add(1);
list.add(2);
list.add(3);
for (int i = 0; i < list.size(); i++) {
    list.set(i, list.get(i) * list.get(i));
}
System.out.println(list);`),
        answer: '[1, 4, 9]', explanation: 'Each item is replaced by its square. set does not change the size.' },
      { type: 'quiz', id: 'pt8', question: 'Which array can the standard binary search correctly search for any target?',
        choices: ['{3, 1, 2}', '{1, 2, 2, 5}', '{5, 4, 3}', '{2, 9, 4}'], answer: 1, explanation: 'Only {1, 2, 2, 5} is in ascending order. The standard algorithm assumes ascending data.' },
      { type: 'quiz', id: 'pt9', question: 'What is wrong with this method?\n\n§§§java\npublic static int g(int n) {\n    return n + g(n - 1);\n}\n§§§',
        choices: ['It uses addition', 'It has no base case, so it never stops', 'The parameter is an int', 'Nothing is wrong'], answer: 1, explanation: 'Without a base case the calls continue until a StackOverflowError.' },
      { type: 'quiz', id: 'pt10', question: 'Which statement about §int[][] t = new int[4][6];§ is true?',
        choices: ['t.length is 6', 't[0].length is 4', 't has 24 elements', 't[4][0] is valid'], answer: 2, explanation: '4 rows of 6 elements gives 24. t.length is 4, t[0].length is 6, and row index 4 is out of range.' },
      { type: 'quiz', id: 'pt11', question: 'What is §Integer.parseInt("007") + 1§?',
        choices: ['8', '"0071"', '7', 'A NumberFormatException'], answer: 0, explanation: '"007" is valid text for the int 7, so the sum is 8.' },
      { type: 'quiz', id: 'pt12', question: 'Which loop correctly removes every element equal to 0 from an ArrayList<Integer> named §list§?',
        choices: [
          'for (int x : list) { if (x == 0) list.remove(x); }',
          'for (int i = 0; i < list.size(); i++) { if (list.get(i) == 0) list.remove(i); }',
          'for (int i = list.size() - 1; i >= 0; i--) { if (list.get(i) == 0) list.remove(i); }',
          'for (int i = 0; i <= list.size(); i++) { if (list.get(i) == 0) list.remove(i); }'], answer: 2, explanation: 'Going backward avoids skipping items. The enhanced for throws, the forward loop skips neighbors, and <= runs past the end.' },
    ],
  },
  {
    id: '4-20',
    title: 'Free Response Practice',
    blocks: [
      { type: 'text', md: md`
These are written like AP free-response questions. In the real exam you write the code by hand; here you can run it. Each problem gives you a tester in §main§ and the expected output. Write only what is missing, using the methods and data given. Do not change the tester.

**Tips**

- Re-read the method headers: the return type and parameters are fixed.
- Use only methods the question allows.
- A partially correct solution earns partial credit, so write something for every part.
- Do not forget §return§ statements on all paths.

## Question 1: arrays

A class has two static methods that work on an array of ints.

(a) §countAbove(data, limit)§ returns how many elements of §data§ are **greater than** §limit§.

(b) §rotateLeft(data)§ returns a **new** array of the same length in which every element has moved one position toward the front, and the original first element is now last. The parameter array must not be changed. For {1, 2, 3, 4} it returns {2, 3, 4, 1}.
` },
      { type: 'code', id: 'frq1', prompt: 'Complete both methods. Expected output: §3§, §2 3 4 1§ and §1 2 3 4§ (the original is unchanged) on separate lines.',
        expected: '3\n2 3 4 1\n1 2 3 4',
        starter: w(j`int[] d = {1, 2, 3, 4};
System.out.println(countAbove(new int[] {5, 12, 9, 20, 7}, 8));
int[] r = rotateLeft(d);
System.out.println(r[0] + " " + r[1] + " " + r[2] + " " + r[3]);
System.out.println(d[0] + " " + d[1] + " " + d[2] + " " + d[3]);`,
          j`static int countAbove(int[] data, int limit) {
    // TODO
    return 0;
}

static int[] rotateLeft(int[] data) {
    // TODO
    return data;
}`),
        solution: w(j`int[] d = {1, 2, 3, 4};
System.out.println(countAbove(new int[] {5, 12, 9, 20, 7}, 8));
int[] r = rotateLeft(d);
System.out.println(r[0] + " " + r[1] + " " + r[2] + " " + r[3]);
System.out.println(d[0] + " " + d[1] + " " + d[2] + " " + d[3]);`,
          j`static int countAbove(int[] data, int limit) {
    int count = 0;
    for (int v : data) {
        if (v > limit) {
            count++;
        }
    }
    return count;
}

static int[] rotateLeft(int[] data) {
    int[] result = new int[data.length];
    for (int i = 0; i < data.length - 1; i++) {
        result[i] = data[i + 1];
    }
    result[data.length - 1] = data[0];
    return result;
}`),
        hint: 'rotateLeft: result[i] = data[i + 1] for all but the last position; the last gets data[0].' },
      { type: 'text', md: md`
## Question 2: ArrayList

(a) §removeShort(words, minLen)§ removes from the list every String whose length is **less than** §minLen§. The remaining words stay in their original order.

(b) §longest(words)§ returns the longest String in a non-empty list. If two are equally long, return the one that appears **first**.
` },
      { type: 'code', id: 'frq2', prompt: 'Complete both methods. Expected output: §[planet, castle, river]§, then §castle§, then §planet§ on separate lines.',
        expected: '[planet, castle, river]\ncastle\nplanet',
        starter: w(j`ArrayList<String> w = new ArrayList<String>();
w.add("planet");
w.add("sun");
w.add("castle");
w.add("of");
w.add("river");
removeShort(w, 4);
System.out.println(w);
ArrayList<String> x = new ArrayList<String>();
x.add("ox");
x.add("castle");
x.add("island");
System.out.println(longest(x));
System.out.println(longest(w));`,
          j`static void removeShort(ArrayList<String> words, int minLen) {
    // TODO
}

static String longest(ArrayList<String> words) {
    // TODO
    return "";
}`),
        solution: w(j`ArrayList<String> w = new ArrayList<String>();
w.add("planet");
w.add("sun");
w.add("castle");
w.add("of");
w.add("river");
removeShort(w, 4);
System.out.println(w);
ArrayList<String> x = new ArrayList<String>();
x.add("ox");
x.add("castle");
x.add("island");
System.out.println(longest(x));
System.out.println(longest(w));`,
          j`static void removeShort(ArrayList<String> words, int minLen) {
    for (int i = words.size() - 1; i >= 0; i--) {
        if (words.get(i).length() < minLen) {
            words.remove(i);
        }
    }
}

static String longest(ArrayList<String> words) {
    String best = words.get(0);
    for (int i = 1; i < words.size(); i++) {
        if (words.get(i).length() > best.length()) {
            best = words.get(i);
        }
    }
    return best;
}`),
        hint: 'removeShort: loop backward. longest: use > (not >=) so ties keep the first one.' },
      { type: 'text', md: md`
## Question 3: 2D array

A table of ints holds the number of items sold: each row is a store, each column a day.

(a) §rowSum(m, r)§ returns the total of all elements in row §r§.

(b) §allRowsEqual(m)§ returns true if **every row has the same sum**, otherwise false. Use §rowSum§ in your answer.
` },
      { type: 'code', id: 'frq3', prompt: 'Complete both methods. Expected output: §9§, §true§ and §false§ on separate lines.',
        expected: '9\ntrue\nfalse',
        starter: w(j`int[][] a = {{2, 3, 4}, {1, 1, 7}, {9, 0, 0}};
int[][] b = {{2, 3}, {1, 6}};
System.out.println(rowSum(a, 0));
System.out.println(allRowsEqual(a));
System.out.println(allRowsEqual(b));`,
          j`static int rowSum(int[][] m, int r) {
    // TODO
    return 0;
}

static boolean allRowsEqual(int[][] m) {
    // TODO
    return false;
}`),
        solution: w(j`int[][] a = {{2, 3, 4}, {1, 1, 7}, {9, 0, 0}};
int[][] b = {{2, 3}, {1, 6}};
System.out.println(rowSum(a, 0));
System.out.println(allRowsEqual(a));
System.out.println(allRowsEqual(b));`,
          j`static int rowSum(int[][] m, int r) {
    int sum = 0;
    for (int c = 0; c < m[r].length; c++) {
        sum += m[r][c];
    }
    return sum;
}

static boolean allRowsEqual(int[][] m) {
    int first = rowSum(m, 0);
    for (int r = 1; r < m.length; r++) {
        if (rowSum(m, r) != first) {
            return false;
        }
    }
    return true;
}`),
        hint: 'Compare every row sum with the sum of row 0; return false on the first difference.' },
      { type: 'text', md: md`
## Question 4: writing a class

Write the class §Playlist§ that keeps song titles in an ArrayList. It needs:

- a constructor with no parameters that creates an empty playlist
- §boolean addSong(String title)§: adds the title at the end and returns true, unless the playlist already holds that title (compare with §equals§), in which case nothing is added and it returns false
- §int countStartingWith(String letter)§: how many titles begin with the given one-letter String
- §String getLongest()§: the longest title (first one if tied), or §"none"§ if the playlist is empty
- §int size()§

This one is a complete class, as in the exam. The tester is already in §Main§.
` },
      { type: 'code', id: 'frq4', prompt: 'Write the §Playlist§ class. Expected four lines: §true false 2§, §2§, §Moonlight Drive§, §none§.',
        expected: 'true false 2\n2\nMoonlight Drive\nnone',
        starter: j`import java.util.ArrayList;

class Playlist {
    // TODO: fields, constructor and the four methods
}

public class Main {
    public static void main(String[] args) {
        Playlist p = new Playlist();
        boolean a = p.addSong("Moonlight Drive");
        boolean b = p.addSong("Moonlight Drive");
        p.addSong("Mountain Song");
        System.out.println(a + " " + b + " " + p.size());
        System.out.println(p.countStartingWith("M"));
        System.out.println(p.getLongest());
        System.out.println(new Playlist().getLongest());
    }
}
`,
        solution: j`import java.util.ArrayList;

class Playlist {
    private ArrayList<String> songs;

    public Playlist() {
        songs = new ArrayList<String>();
    }

    public boolean addSong(String title) {
        for (String s : songs) {
            if (s.equals(title)) {
                return false;
            }
        }
        songs.add(title);
        return true;
    }

    public int countStartingWith(String letter) {
        int count = 0;
        for (String s : songs) {
            if (s.substring(0, 1).equals(letter)) {
                count++;
            }
        }
        return count;
    }

    public String getLongest() {
        if (songs.size() == 0) {
            return "none";
        }
        String best = songs.get(0);
        for (int i = 1; i < songs.size(); i++) {
            if (songs.get(i).length() > best.length()) {
                best = songs.get(i);
            }
        }
        return best;
    }

    public int size() {
        return songs.size();
    }
}

public class Main {
    public static void main(String[] args) {
        Playlist p = new Playlist();
        boolean a = p.addSong("Moonlight Drive");
        boolean b = p.addSong("Moonlight Drive");
        p.addSong("Mountain Song");
        System.out.println(a + " " + b + " " + p.size());
        System.out.println(p.countStartingWith("M"));
        System.out.println(p.getLongest());
        System.out.println(new Playlist().getLongest());
    }
}
`,
        hint: 'Use a private ArrayList<String> field created in the constructor. Check for duplicates with a loop and equals before adding.' },
    ],
  },
  {
    id: '4-21',
    title: 'Projects',
    blocks: [
      { type: 'text', md: md`
Three larger projects that combine everything in this unit. Each starts from a skeleton; finish the TODOs, then extend it with your own ideas (new statistics, different data, a better output format).
` },
      { type: 'text', md: md`
## Project 1: Grade book

Store six test scores in an array and report the highest, lowest and average, how many scores are above average, and the scores in sorted order (use selection sort or insertion sort, not a library).
` },
      { type: 'code', id: 'proj-grades', prompt: 'Finish the grade book. Expected five lines: §Highest: 99§, §Lowest: 64§, §Average: 81.5§, §Above average: 3§, §Sorted: 64 71 78 85 92 99§.',
        expected: 'Highest: 99\nLowest: 64\nAverage: 81.5\nAbove average: 3\nSorted: 64 71 78 85 92 99',
        starter: w(j`int[] scores = {78, 92, 85, 64, 99, 71};

int highest = scores[0];
int lowest = scores[0];
int sum = 0;
// TODO: one loop to find highest, lowest and sum

double average = (double) sum / scores.length;

int above = 0;
// TODO: count scores greater than average

// TODO: sort scores in place

System.out.println("Highest: " + highest);
System.out.println("Lowest: " + lowest);
System.out.println("Average: " + average);
System.out.println("Above average: " + above);
String line = "Sorted:";
for (int s : scores) {
    line += " " + s;
}
System.out.println(line);`),
        solution: w(j`int[] scores = {78, 92, 85, 64, 99, 71};

int highest = scores[0];
int lowest = scores[0];
int sum = 0;
for (int s : scores) {
    if (s > highest) {
        highest = s;
    }
    if (s < lowest) {
        lowest = s;
    }
    sum += s;
}

double average = (double) sum / scores.length;

int above = 0;
for (int s : scores) {
    if (s > average) {
        above++;
    }
}

for (int i = 1; i < scores.length; i++) {
    int value = scores[i];
    int k = i - 1;
    while (k >= 0 && scores[k] > value) {
        scores[k + 1] = scores[k];
        k--;
    }
    scores[k + 1] = value;
}

System.out.println("Highest: " + highest);
System.out.println("Lowest: " + lowest);
System.out.println("Average: " + average);
System.out.println("Above average: " + above);
String line = "Sorted:";
for (int s : scores) {
    line += " " + s;
}
System.out.println(line);`),
        hint: 'Three separate passes are fine. The median is a good extension once the data is sorted.' },
      { type: 'text', md: md`
## Project 2: Inventory commands

A shop's inventory is an ArrayList of item names. A String of commands (one per line, such as §add apple§ or §find fig§) is read with a §Scanner§. Support three commands: §add§, §remove§ and §find§. §find§ prints the position or "not found". Search with your own loop.
` },
      { type: 'code', id: 'proj-inventory', prompt: 'Finish the command loop. Expected: §fig found at 1§, §plum not found§, then §Items: [apple, fig, kiwi]§.',
        expected: 'fig found at 1\nplum not found\nItems: [apple, fig, kiwi]',
        starter: w(j`String commands = "add apple\nadd pear\nadd fig\nremove pear\nadd kiwi\nfind fig\nfind plum";
Scanner sc = new Scanner(commands);
ArrayList<String> items = new ArrayList<String>();
while (sc.hasNext()) {
    String cmd = sc.next();
    String item = sc.next();
    int index = -1;
    for (int i = 0; i < items.size(); i++) {
        if (items.get(i).equals(item)) {
            index = i;
        }
    }
    // TODO: handle "add", "remove" and "find" using cmd, item and index
}
System.out.println("Items: " + items);`),
        solution: w(j`String commands = "add apple\nadd pear\nadd fig\nremove pear\nadd kiwi\nfind fig\nfind plum";
Scanner sc = new Scanner(commands);
ArrayList<String> items = new ArrayList<String>();
while (sc.hasNext()) {
    String cmd = sc.next();
    String item = sc.next();
    int index = -1;
    for (int i = 0; i < items.size(); i++) {
        if (items.get(i).equals(item)) {
            index = i;
        }
    }
    if (cmd.equals("add")) {
        items.add(item);
    } else if (cmd.equals("remove")) {
        if (index >= 0) {
            items.remove(index);
        }
    } else if (cmd.equals("find")) {
        if (index >= 0) {
            System.out.println(item + " found at " + index);
        } else {
            System.out.println(item + " not found");
        }
    }
}
System.out.println("Items: " + items);`),
        hint: 'Compare cmd with equals. Remove only when index is not -1.' },
      { type: 'text', md: md`
## Project 3: Minesweeper counts

A 2D array marks mines with 1 and empty squares with 0. Print a board where each mine shows §*§ and each empty square shows the number of mines in the (up to eight) touching squares. Write a helper that checks bounds so the edges never crash.
` },
      { type: 'code', id: 'proj-mines', prompt: 'Complete §countMines§. Expected three lines: §1 * 2 1§, §2 2 2 *§, §* 1 1 1§.',
        expected: '1 * 2 1\n2 2 2 *\n* 1 1 1',
        starter: w(j`int[][] mines = {
    {0, 1, 0, 0},
    {0, 0, 0, 1},
    {1, 0, 0, 0}
};
for (int r = 0; r < mines.length; r++) {
    String line = "";
    for (int c = 0; c < mines[r].length; c++) {
        if (c > 0) {
            line += " ";
        }
        if (mines[r][c] == 1) {
            line += "*";
        } else {
            line += countMines(mines, r, c);
        }
    }
    System.out.println(line);
}`,
          j`static int countMines(int[][] m, int row, int col) {
    int count = 0;
    // TODO: loop over the 3 by 3 block around (row, col), skip positions outside the table
    return count;
}`),
        solution: w(j`int[][] mines = {
    {0, 1, 0, 0},
    {0, 0, 0, 1},
    {1, 0, 0, 0}
};
for (int r = 0; r < mines.length; r++) {
    String line = "";
    for (int c = 0; c < mines[r].length; c++) {
        if (c > 0) {
            line += " ";
        }
        if (mines[r][c] == 1) {
            line += "*";
        } else {
            line += countMines(mines, r, c);
        }
    }
    System.out.println(line);
}`,
          j`static int countMines(int[][] m, int row, int col) {
    int count = 0;
    for (int r = row - 1; r <= row + 1; r++) {
        for (int c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < m.length && c >= 0 && c < m[0].length) {
                count += m[r][c];
            }
        }
    }
    return count;
}`),
        hint: 'Loop r from row - 1 to row + 1 and c from col - 1 to col + 1. The centre square is not a mine, so counting it adds 0.' },
    ],
  },
];
