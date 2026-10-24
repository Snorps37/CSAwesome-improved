import type { Lesson } from './types';
import { md } from './md';
import { w } from './u4util';

const j = String.raw;

// Unit 4 lessons 4.1-4.8 (data sets, arrays, text input, wrappers, ArrayList). Original wording.
export const unit4a: Lesson[] = [
  {
    id: '4-1',
    title: 'Data Sets',
    blocks: [
      { type: 'text', md: md`
Programs rarely deal with just one value. A weather app holds a year of temperatures, a game holds a list of high scores, a school system holds thousands of grades. A group of related values is a **data set**, and a program that stores many values needs a way to keep them together instead of creating thousands of separate variables.

Compare these two approaches for three quiz scores:

§§§java
int score1 = 88;
int score2 = 92;
int score3 = 75;
int total = score1 + score2 + score3;   // must be edited by hand for every new score
§§§

That cannot scale to a thousand scores. A **data collection** is an object that holds many values under one name and lets a loop visit them. In AP CS A you use two of them:

| Collection | Size | Holds | Typical use |
|---|---|---|---|
| **array** | fixed when created | primitives or objects | a known number of items; tables (2D) |
| **ArrayList** | grows and shrinks | objects only | a list that changes while the program runs |

Once data is in a collection you can **process** it with algorithms: find the largest value, compute an average, count items that match a rule, search for a value, put items in order. Those algorithms are the heart of this unit.

**Choosing a representation.** Think about what you need to ask of the data. Parallel collections (one holds names, another holds ages at the same positions) are simple but easy to get out of step. Later, in object-oriented design, a single collection of objects that each hold a name and an age is usually better.

**Data and privacy.** Real data sets often describe real people. Programs that collect or combine data can reveal more than intended, so think about what you store, who can see it, and whether it could be misused.

Here is a first look at what a collection makes possible. Do not worry about the syntax yet; lesson 4.2 explains it.

§§§java
int[] scores = {88, 92, 75};
int total = 0;
for (int s : scores) {
    total += s;
}
System.out.println(total);   // 255
§§§
` },
      { type: 'quiz', id: 'q-ds1', question: 'Why is a collection better than separate variables for a thousand test scores?',
        choices: ['It makes each score larger', 'One name holds all the values and a loop can process them', 'Separate variables cannot hold ints', 'It removes the need for a compiler'], answer: 1,
        explanation: 'A collection groups related values and lets one loop process any number of them, instead of writing code for each variable.' },
      { type: 'quiz', id: 'q-ds2', question: 'You are storing the names of players who join and leave a game while it runs. Which fits best?',
        choices: ['An array, because its size can change at any time', 'An ArrayList, because it can grow and shrink', 'A single int variable', 'A String constant'], answer: 1,
        explanation: 'An ArrayList resizes as items are added or removed. An array has a fixed length once created.' },
      { type: 'quiz', id: 'q-ds3', question: 'Which statement about parallel collections (one of names, one of ages) is true?',
        choices: ['They automatically stay in sync', 'The same index in each refers to the same person, but you must keep them in step yourself', 'They can only hold Strings', 'They are required by the AP exam'], answer: 1,
        explanation: 'Nothing links the two collections except your own discipline. Removing from one and forgetting the other breaks the pairing.' },
      { type: 'predict', id: 'p-ds1', question: 'Two parallel arrays hold names and ages. What does the program print?',
        code: w(j`String[] names = {"Ana", "Ben", "Cy"};
int[] ages = {15, 16, 14};
int oldest = 0;
for (int i = 1; i < ages.length; i++) {
    if (ages[i] > ages[oldest]) {
        oldest = i;
    }
}
System.out.println(names[oldest] + " " + ages[oldest]);`),
        answer: 'Ben 16', explanation: 'The loop keeps the position of the largest age. Position 1 holds 16, so it prints names[1] and ages[1].' },
      { type: 'code', id: 'ds-total', prompt: 'Run this. Then add a line that prints the **average** as a double (total divided by the number of scores). Expected output: §Total: 255§ then §Average: 85.0§.',
        expected: 'Total: 255\nAverage: 85.0',
        starter: w(j`int[] scores = {88, 92, 75};
int total = 0;
for (int s : scores) {
    total += s;
}
System.out.println("Total: " + total);
// TODO: print the average`),
        solution: w(j`int[] scores = {88, 92, 75};
int total = 0;
for (int s : scores) {
    total += s;
}
System.out.println("Total: " + total);
System.out.println("Average: " + (double) total / scores.length);`),
        hint: 'scores.length is the number of items. Cast to double before dividing so you do not get integer division.' },
    ],
  },
  {
    id: '4-2',
    title: 'Array Creation and Access',
    blocks: [
      { type: 'text', md: md`
An **array** is an object that stores a fixed number of values of **one type**. Each value is an **element**, and each element has an **index** (position) that starts at **0**.

§§§java
int[] scores = new int[5];            // five ints, all start as 0
String[] words = new String[3];       // three Strings, all start as null
double[] prices = {1.50, 2.25, 9.99}; // initializer list: size 3, values set
§§§

| Element type | Default value in a new array |
|---|---|
| §int§ | §0§ |
| §double§ | §0.0§ |
| §boolean§ | §false§ |
| any object (§String§ ...) | §null§ |

**Access and change** an element with square brackets. **Length** is a field, not a method, so there are **no parentheses**: §scores.length§.

§§§java
scores[0] = 90;                 // first element
scores[scores.length - 1] = 75; // last element (index 4)
int x = scores[0] + 10;         // read an element
§§§

The valid indexes of an array of length n are **0 through n - 1**. Using any other index throws an §ArrayIndexOutOfBoundsException§ while the program runs.

**Arrays are objects.** The variable holds a **reference** to the array. Copying the variable copies the reference, so both names refer to the **same** array:

§§§java
int[] a = {4, 8, 15};
int[] b = a;     // not a copy of the data!
b[0] = 99;
System.out.println(a[0]);   // 99
§§§

The length is fixed. To "grow" an array you must create a new, larger one and copy the values over.
` },
      { type: 'quiz', id: 'q-ac1', question: 'For §int[] a = new int[6];§ which index is the **last** valid one?',
        choices: ['5', '6', '7', '0'], answer: 0, explanation: 'Indexes run from 0 to length - 1, so 0 through 5.' },
      { type: 'quiz', id: 'q-ac2', question: 'What is the default value of every element in §new boolean[3]§?',
        choices: ['true', 'false', 'null', '0'], answer: 1, explanation: 'booleans default to false, ints to 0, doubles to 0.0, and object references to null.' },
      { type: 'quiz', id: 'q-ac3', question: 'Which expression gives the number of elements in an array named §data§?',
        choices: ['data.length()', 'data.size()', 'data.length', 'length(data)'], answer: 2, explanation: 'For arrays, length is a field with no parentheses. size() belongs to ArrayList and length() to String.' },
      { type: 'quiz', id: 'q-ac4', question: 'What happens when this code runs?\n\n§§§java\nint[] a = new int[3];\na[3] = 10;\n§§§',
        choices: ['It compiles and sets the last element', 'A compile error', 'An ArrayIndexOutOfBoundsException at run time', 'The array grows to length 4'], answer: 2, explanation: 'The compiler cannot know the index is bad. At run time, index 3 is outside 0..2, so the exception is thrown.' },
      { type: 'predict', id: 'p-ac1', question: 'What does this program print?',
        code: w(j`int[] a = new int[3];
a[1] = 7;
a[2] = a[1] * 2;
System.out.println(a[0] + " " + a[1] + " " + a[2]);`),
        answer: '0 7 14', explanation: 'a[0] was never assigned so it is 0. a[1] is 7 and a[2] is 7 * 2 = 14.' },
      { type: 'predict', id: 'p-ac2', question: 'What does this program print?',
        code: w(j`String[] s = new String[2];
s[0] = "hi";
System.out.println(s[0] + " " + s[1]);`),
        answer: 'hi null', explanation: 'An unassigned element of a String array is null, and string concatenation prints it as the word null.' },
      { type: 'predict', id: 'p-ac3', question: 'What does this program print?',
        code: w(j`int[] a = {4, 8, 15};
int[] b = a;
b[0] = 99;
System.out.println(a[0] + " " + b[0]);`),
        answer: '99 99', explanation: 'b = a copies the reference, not the array. Both variables refer to one array, so the change shows through either name.' },
      { type: 'code', id: 'ac-make', prompt: 'Create an int array holding **10, 20, 30, 40, 50** called §nums§. The program prints the first element, the last element and the length. Expected: §10 50 5§.',
        expected: '10 50 5',
        starter: w(j`// TODO: create the array nums
System.out.println(nums[0] + " " + nums[nums.length - 1] + " " + nums.length);`),
        solution: w(j`int[] nums = {10, 20, 30, 40, 50};
System.out.println(nums[0] + " " + nums[nums.length - 1] + " " + nums.length);`),
        hint: 'Use an initializer list: int[] nums = {10, 20, ...};' },
      { type: 'code', id: 'ac-fill', prompt: 'Make a §double[]§ of length 3 called §d§ with **no initializer list**, then assign §d[0]§ = 1.5 and §d[2]§ = 4.5 and leave the middle value as it starts. Expected: §1.5 0.0 4.5§.',
        expected: '1.5 0.0 4.5',
        starter: w(j`// TODO: create d with new, then set d[0] and d[2]
System.out.println(d[0] + " " + d[1] + " " + d[2]);`),
        solution: w(j`double[] d = new double[3];
d[0] = 1.5;
d[2] = 4.5;
System.out.println(d[0] + " " + d[1] + " " + d[2]);`),
        hint: 'new double[3] starts with 0.0 everywhere.' },
      { type: 'code', id: 'ac-oob', prompt: 'This program crashes with an out-of-bounds error when it tries to print the last element. Fix the **index** so it prints §last: 9§.',
        expected: 'last: 9',
        starter: w(j`int[] a = {3, 6, 9};
System.out.println("last: " + a[a.length]);`),
        solution: w(j`int[] a = {3, 6, 9};
System.out.println("last: " + a[a.length - 1]);`),
        hint: 'The last valid index is length - 1.' },
    ],
  },
  {
    id: '4-3',
    title: 'Array Traversals',
    blocks: [
      { type: 'text', md: md`
**Traversing** an array means visiting its elements, usually with a loop. There are two styles.

**1. Indexed for loop.** Use it when you need the position, want to change elements, or want only part of the array.

§§§java
int[] a = {5, 8, 2, 9};
for (int i = 0; i < a.length; i++) {
    System.out.println("a[" + i + "] = " + a[i]);
}
§§§

Note the condition: §i < a.length§ (not §<=§). With §<=§ the last pass uses index §a.length§ and throws an exception.

**2. Enhanced for loop** ("for each"). It hands you each value in turn, without an index.

§§§java
for (int value : a) {
    System.out.println(value);
}
§§§

The loop variable is a **copy** of each element. Assigning to it does **not** change the array for primitives:

§§§java
for (int v : a) {
    v = v * 2;     // changes only the copy
}
§§§

For an array of **objects** the copy is a reference to the same object, so calling a method that changes that object does affect it, but assigning a new object to the loop variable still does not change the array.

**Other patterns** all use an indexed loop:

- backward: §for (int i = a.length - 1; i >= 0; i--)§
- every other element: §i += 2§
- part of the array: change the start or limit
- comparing neighbors: stop one early with §i < a.length - 1§ so §a[i + 1]§ stays valid

An enhanced for loop cannot go backward, skip, or change elements, but it cannot go out of bounds either, so use it whenever you only need to read every value in order.
` },
      { type: 'quiz', id: 'q-at1', question: 'Which loop header correctly visits every element of §int[] a§ with an index?',
        choices: ['for (int i = 1; i <= a.length; i++)', 'for (int i = 0; i < a.length; i++)', 'for (int i = 0; i <= a.length; i++)', 'for (int i = 0; i < a.length - 1; i++)'], answer: 1, explanation: 'Start at 0 and stop before length. The other headers either skip the first, run past the end, or skip the last.' },
      { type: 'quiz', id: 'q-at2', question: 'After this code, what is §a[0]§?\n\n§§§java\nint[] a = {1, 2, 3};\nfor (int v : a) { v = 0; }\n§§§',
        choices: ['0', '1', '3', 'The code does not compile'], answer: 1, explanation: 'v is a copy of each element. Setting it to 0 never touches the array, so a[0] is still 1.' },
      { type: 'quiz', id: 'q-at3', question: 'You want to compare each element with the one after it. What must the loop condition be?',
        choices: ['i < a.length', 'i <= a.length', 'i < a.length - 1', 'i > 0'], answer: 2, explanation: 'On the last pass i + 1 must still be a valid index, so i has to stop at length - 2, which is what i < length - 1 does.' },
      { type: 'predict', id: 'p-at1', question: 'What does this program print?',
        code: w(j`int[] n = {3, 1, 4, 1, 5};
for (int i = n.length - 1; i >= 0; i -= 2) {
    System.out.print(n[i] + " ");
}
System.out.println();`),
        answer: '5 4 3', explanation: 'i is 4, then 2, then 0, then -2 which ends the loop. Elements: 5, 4, 3.' },
      { type: 'predict', id: 'p-at2', question: 'What does this program print?',
        code: w(j`int[] a = {1, 2};
for (int v : a) {
    v = v * 10;
}
for (int i = 0; i < a.length; i++) {
    a[i] = a[i] + 1;
}
System.out.println(a[0] + " " + a[1]);`),
        answer: '2 3', explanation: 'The first loop changes only copies. The second changes the real elements: 1 becomes 2 and 2 becomes 3.' },
      { type: 'predict', id: 'p-at3', question: 'What does this program print?',
        code: w(j`String[] words = {"cat", "horse", "ox", "zebra"};
int count = 0;
for (String s : words) {
    if (s.length() > 2) {
        count++;
    }
}
System.out.println(count);`),
        answer: '3', explanation: 'cat (3), horse (5) and zebra (5) are longer than 2. ox is not.' },
      { type: 'code', id: 'at-sum', prompt: 'Use an **enhanced for loop** to add up the elements and print §Sum: 26§.',
        expected: 'Sum: 26',
        starter: w(j`int[] a = {4, 9, 1, 12};
int sum = 0;
// TODO: add every element to sum
System.out.println("Sum: " + sum);`),
        solution: w(j`int[] a = {4, 9, 1, 12};
int sum = 0;
for (int v : a) {
    sum += v;
}
System.out.println("Sum: " + sum);`),
        hint: 'for (int v : a) { sum += v; }' },
      { type: 'code', id: 'at-double', prompt: 'Double **every element in place** (an enhanced for loop cannot do this). Then print the array with a second loop. Expected: §2 4 6 8§.',
        expected: '2 4 6 8',
        starter: w(j`int[] a = {1, 2, 3, 4};
// TODO: double each element
for (int v : a) {
    System.out.print(v + " ");
}
System.out.println();`),
        solution: w(j`int[] a = {1, 2, 3, 4};
for (int i = 0; i < a.length; i++) {
    a[i] = a[i] * 2;
}
for (int v : a) {
    System.out.print(v + " ");
}
System.out.println();`),
        hint: 'Use an indexed loop and assign to a[i].' },
      { type: 'code', id: 'at-back', prompt: 'Print the words **backward**, one per line: §cherry§, §banana§, §apple§.',
        expected: 'cherry\nbanana\napple',
        starter: w(j`String[] fruit = {"apple", "banana", "cherry"};
// TODO: print from the last element to the first`),
        solution: w(j`String[] fruit = {"apple", "banana", "cherry"};
for (int i = fruit.length - 1; i >= 0; i--) {
    System.out.println(fruit[i]);
}`),
        hint: 'Start i at fruit.length - 1 and count down while i >= 0.' },
    ],
  },
  {
    id: '4-4',
    title: 'Array Algorithms',
    blocks: [
      { type: 'text', md: md`
Most array problems reuse a handful of patterns. Learn the shape of each one and you can build the rest.

**Sum and average**

§§§java
int sum = 0;
for (int v : a) sum += v;
double avg = (double) sum / a.length;
§§§

**Largest (or smallest).** Start with the first element, then compare with the rest. Never start with 0: if every value is negative, 0 would be wrongly "largest".

§§§java
int max = a[0];
for (int i = 1; i < a.length; i++) {
    if (a[i] > max) max = a[i];
}
§§§

**Count items that match a rule**

§§§java
int evens = 0;
for (int v : a) if (v % 2 == 0) evens++;
§§§

**Does any / do all match?** Use a flag. For "any", stop being false once found; for "all", become false as soon as one fails.

§§§java
boolean allPositive = true;
for (int v : a) if (v <= 0) allPositive = false;
§§§

**Swap two elements** needs a temporary variable:

§§§java
int temp = a[i];
a[i] = a[j];
a[j] = temp;
§§§

**Reverse in place** swaps from both ends toward the middle: swap §a[i]§ with §a[a.length - 1 - i]§ for i less than half the length.

**Shift or rotate.** To move everything one place left and wrap the first to the end, save §a[0]§, copy each element from its right neighbor, then put the saved value last.

**Copy.** §int[] b = a;§ does not copy. Create a new array of the same length and copy each element in a loop.

**Strings in an array** use the same patterns, but compare with §equals§ and §compareTo§, never §==§.
` },
      { type: 'quiz', id: 'q-aa1', question: 'Why should "largest value" start with §max = a[0]§ rather than §max = 0§?',
        choices: ['0 is not a valid int', 'If all values are negative, the answer 0 would be wrong', 'a[0] is always the largest', 'The loop would not run otherwise'], answer: 1, explanation: 'Starting from a real element guarantees the result is a value actually in the array.' },
      { type: 'quiz', id: 'q-aa2', question: 'Which code correctly swaps §a[0]§ and §a[1]§?',
        choices: ['a[0] = a[1]; a[1] = a[0];', 'int t = a[0]; a[0] = a[1]; a[1] = t;', 'a[0] = a[1];', 'int t = a[0]; a[1] = a[0]; a[0] = t;'], answer: 1, explanation: 'Save one value in a temporary variable first. The first and last options lose the original a[0].' },
      { type: 'quiz', id: 'q-aa3', question: 'To reverse an array in place, how many swaps are needed for length 7?',
        choices: ['7', '6', '4', '3'], answer: 3, explanation: 'Each swap fixes two elements. With 7 elements the middle one stays put, so 3 swaps.' },
      { type: 'predict', id: 'p-aa1', question: 'What does this program print?',
        code: w(j`int[] a = {1, 2, 3, 4};
for (int i = 0; i < a.length / 2; i++) {
    int t = a[i];
    a[i] = a[a.length - 1 - i];
    a[a.length - 1 - i] = t;
}
for (int v : a) {
    System.out.print(v + " ");
}
System.out.println();`),
        answer: '4 3 2 1', explanation: 'Swap a[0] with a[3], then a[1] with a[2]. The array is reversed.' },
      { type: 'predict', id: 'p-aa2', question: 'What does this program print?',
        code: w(j`int[] a = {1, 2, 3, 4, 5};
int first = a[0];
for (int i = 0; i < a.length - 1; i++) {
    a[i] = a[i + 1];
}
a[a.length - 1] = first;
for (int v : a) {
    System.out.print(v + " ");
}
System.out.println();`),
        answer: '2 3 4 5 1', explanation: 'Every element moves one place left and the saved first value goes at the end.' },
      { type: 'predict', id: 'p-aa3', question: 'What does this program print?',
        code: w(j`int[] a = {-8, -3, -20};
int max = 0;
for (int v : a) {
    if (v > max) {
        max = v;
    }
}
System.out.println(max);`),
        answer: '0', explanation: 'This is the bug the lesson warned about: max starts at 0, nothing is bigger, so 0 is reported even though 0 is not in the array.' },
      { type: 'code', id: 'aa-max', prompt: 'Finish the loop to find the **smallest** value. Expected: §Min: -4§.',
        expected: 'Min: -4',
        starter: w(j`int[] a = {7, 3, -4, 12, 0};
int min = a[0];
// TODO: loop and update min
System.out.println("Min: " + min);`),
        solution: w(j`int[] a = {7, 3, -4, 12, 0};
int min = a[0];
for (int i = 1; i < a.length; i++) {
    if (a[i] < min) {
        min = a[i];
    }
}
System.out.println("Min: " + min);`),
        hint: 'Same shape as finding the max, with the comparison reversed.' },
      { type: 'code', id: 'aa-count', prompt: 'Count how many words have **exactly 4 letters** and print §Four-letter words: 3§.',
        expected: 'Four-letter words: 3',
        starter: w(j`String[] words = {"tree", "sky", "moon", "star", "planet"};
int count = 0;
// TODO
System.out.println("Four-letter words: " + count);`),
        solution: w(j`String[] words = {"tree", "sky", "moon", "star", "planet"};
int count = 0;
for (String s : words) {
    if (s.length() == 4) {
        count++;
    }
}
System.out.println("Four-letter words: " + count);`),
        hint: 'Use s.length() for Strings.' },
      { type: 'code', id: 'aa-copy', prompt: 'Make a **real copy** of §a§ called §b§ (new array, copy elements in a loop), then change §b[0]§. The original must stay unchanged. Expected: §1 99§.',
        expected: '1 99',
        starter: w(j`int[] a = {1, 2, 3};
int[] b = a;   // TODO: this does not copy
b[0] = 99;
System.out.println(a[0] + " " + b[0]);`),
        solution: w(j`int[] a = {1, 2, 3};
int[] b = new int[a.length];
for (int i = 0; i < a.length; i++) {
    b[i] = a[i];
}
b[0] = 99;
System.out.println(a[0] + " " + b[0]);`),
        hint: 'new int[a.length], then b[i] = a[i] inside a loop.' },
      { type: 'code', id: 'aa-allany', prompt: 'Write the flag logic: print §true§ if **every** score is at least 60, otherwise §false§. With the data given the answer is §false§.',
        expected: 'false',
        starter: w(j`int[] scores = {72, 85, 59, 90};
boolean allPass = true;
// TODO
System.out.println(allPass);`),
        solution: w(j`int[] scores = {72, 85, 59, 90};
boolean allPass = true;
for (int s : scores) {
    if (s < 60) {
        allPass = false;
    }
}
System.out.println(allPass);`),
        hint: 'Start true; set it to false when you find one that fails.' },
    ],
  },
  {
    id: '4-5',
    title: 'Using Text Files',
    blocks: [
      { type: 'text', md: md`
Real data usually lives in a **file**, not in your source code. A program can read a text file line by line or word by word, and store what it finds in an array or ArrayList for processing.

Java's §Scanner§ class does the reading. It works the same on any **source** of text. The source can be the keyboard, a file, or a plain String. The methods are:

| Method | What it does |
|---|---|
| §hasNext()§ | is there another token (word/number)? |
| §hasNextInt()§ | is the next token an int? |
| §hasNextLine()§ | is there another line? |
| §next()§ | returns the next token as a String |
| §nextInt()§, §nextDouble()§ | returns the next token as a number |
| §nextLine()§ | returns the rest of the current line |

A **token** is a chunk of text separated by whitespace. The standard pattern is to loop while there is more input.

**Reading a file.** Opening a file can fail (it may not exist), so Java forces you to deal with that. The code below is the usual shape. It needs a real file on disk, so it is shown for reading only and is not run in this app:

§§§java
import java.io.File;
import java.io.IOException;
import java.util.Scanner;

public static void main(String[] args) throws IOException {
    Scanner in = new Scanner(new File("scores.txt"));
    int total = 0;
    while (in.hasNextInt()) {
        total += in.nextInt();
    }
    in.close();
    System.out.println(total);
}
§§§

The §throws IOException§ part says "this method might fail while reading; the caller must be ready for that." You can also build a Scanner from a **String**, which needs no file, so you can practice the exact same loop below. The code you write to process the tokens is identical.

A few cautions:

- Calling §next§ or §nextInt§ when nothing is left throws an exception, so test with §hasNext...§ first.
- §nextInt()§ throws an exception if the next token is not a number.
- After §nextInt()§ the rest of that line, including the line break, is still waiting. A following §nextLine()§ returns that leftover (often empty) text.
- Always **close** a file Scanner when finished.
` },
      { type: 'quiz', id: 'q-tf1', question: 'What does §hasNextInt()§ tell you?',
        choices: ['The file has at least one line', 'The next token can be read as an int', 'The Scanner is closed', 'The file exists'], answer: 1, explanation: 'It looks ahead without consuming anything and answers whether nextInt() would succeed.' },
      { type: 'quiz', id: 'q-tf2', question: 'Why does the file-reading code need §throws IOException§?',
        choices: ['Scanner cannot read ints without it', 'Opening or reading a file can fail, and Java requires you to acknowledge it', 'It makes the program run faster', 'Because main must always throw'], answer: 1, explanation: 'IOException is a checked exception: the compiler requires you to either handle it or declare it.' },
      { type: 'quiz', id: 'q-tf3', question: 'A Scanner holds the text §"7 apples"§. What does §sc.nextInt()§ followed by §sc.next()§ return (in that order)?',
        choices: ['"7" then "apples"', '7 then "apples"', '7 then 7', 'An exception on nextInt'], answer: 1, explanation: 'nextInt returns the int 7, and next returns the following token as the String "apples".' },
      { type: 'predict', id: 'p-tf1', question: 'This Scanner reads from a String instead of a file. What does the program print?',
        code: w(j`Scanner sc = new Scanner("5 10 15\nhello world");
int sum = 0;
while (sc.hasNextInt()) {
    sum += sc.nextInt();
}
String word = sc.next();
System.out.println(sum + " " + word);`),
        answer: '30 hello', explanation: 'The loop reads 5, 10 and 15 and stops at "hello", which is not an int. The next token is hello.' },
      { type: 'predict', id: 'p-tf2', question: 'What does this program print?',
        code: w(j`Scanner sc = new Scanner("red 3\nblue 5\ngreen 2");
int total = 0;
String last = "";
while (sc.hasNext()) {
    last = sc.next();
    total += sc.nextInt();
}
System.out.println(last + " " + total);`),
        answer: 'green 10', explanation: 'Each pass reads a color and a number. The last color is green and 3 + 5 + 2 = 10.' },
      { type: 'code', id: 'tf-scores', prompt: 'The text below stands in for a file of scores, one per line. Read every int, store them in an array of the right size, and print §Count: 4§ then §Max: 95§. (Count first, then fill.)',
        expected: 'Count: 4\nMax: 95',
        starter: w(j`String data = "88\n95\n70\n91";
Scanner counter = new Scanner(data);
int n = 0;
while (counter.hasNextInt()) {
    counter.nextInt();
    n++;
}
int[] scores = new int[n];
// TODO: make a second Scanner on data and fill scores
int max = scores[0];
for (int s : scores) {
    if (s > max) {
        max = s;
    }
}
System.out.println("Count: " + n);
System.out.println("Max: " + max);`),
        solution: w(j`String data = "88\n95\n70\n91";
Scanner counter = new Scanner(data);
int n = 0;
while (counter.hasNextInt()) {
    counter.nextInt();
    n++;
}
int[] scores = new int[n];
Scanner reader = new Scanner(data);
for (int i = 0; i < n; i++) {
    scores[i] = reader.nextInt();
}
int max = scores[0];
for (int s : scores) {
    if (s > max) {
        max = s;
    }
}
System.out.println("Count: " + n);
System.out.println("Max: " + max);`),
        hint: 'A Scanner is used up as it reads, so create a fresh one: new Scanner(data).' },
      { type: 'code', id: 'tf-lines', prompt: 'Read the text **line by line** with §hasNextLine()§ and §nextLine()§, printing each line with its number. Expected: §1: alpha§, §2: beta§, §3: gamma§ on separate lines.',
        expected: '1: alpha\n2: beta\n3: gamma',
        starter: w(j`Scanner sc = new Scanner("alpha\nbeta\ngamma");
int num = 1;
// TODO: loop over the lines`),
        solution: w(j`Scanner sc = new Scanner("alpha\nbeta\ngamma");
int num = 1;
while (sc.hasNextLine()) {
    String line = sc.nextLine();
    System.out.println(num + ": " + line);
    num++;
}`),
        hint: 'while (sc.hasNextLine()) { String line = sc.nextLine(); ... }' },
    ],
  },
  {
    id: '4-6',
    title: 'Wrapper Classes',
    blocks: [
      { type: 'text', md: md`
Collections like §ArrayList§ can hold only **objects**, not primitives. Java supplies a **wrapper class** for each primitive so a number can be treated as an object:

| Primitive | Wrapper |
|---|---|
| §int§ | §Integer§ |
| §double§ | §Double§ |
| §boolean§ | §Boolean§ |
| §char§ | §Character§ |

**Autoboxing** is the automatic conversion from a primitive to its wrapper. **Unboxing** goes the other way. Java does both for you in assignments, method calls and arithmetic:

§§§java
Integer a = 7;          // autoboxing: int 7 becomes an Integer object
int b = a + 3;          // unboxing: a is converted for the addition
Double d = 2.5;
double twice = d * 2;   // 5.0
§§§

The two wrapper classes you need for the AP exam are **Integer** and **Double**. They also bring useful tools:

| Member | Meaning |
|---|---|
| §Integer.MAX_VALUE§, §Integer.MIN_VALUE§ | largest and smallest int (2147483647 and -2147483648) |
| §Integer.parseInt(String s)§ | converts text such as "42" to the int 42 |
| §Double.parseDouble(String s)§ | converts "3.5" to the double 3.5 |
| §x.intValue()§, §y.doubleValue()§ | explicit unboxing |
| §Integer.valueOf(int)§ | explicitly boxing |

Parsing text that is not a valid number (for example §Integer.parseInt("abc")§) throws a §NumberFormatException§.

**Careful with objects.** A wrapper variable can be §null§, and unboxing a §null§ crashes. Compare wrapper objects with **§equals§**, not §==§, because §==§ compares references, not values.

§§§java
Integer x = 1000;
Integer y = 1000;
System.out.println(x.equals(y));   // true  (use this)
§§§

A very handy trick: §Integer.MIN_VALUE§ makes a safe starting "largest so far" and §Integer.MAX_VALUE§ a safe "smallest so far" when you search a collection of ints.
` },
      { type: 'quiz', id: 'q-wr1', question: 'Why does an ArrayList need wrapper classes?',
        choices: ['Primitives are too slow', 'ArrayList can only store objects, not primitive values', 'Wrappers are required for loops', 'It cannot hold Strings otherwise'], answer: 1, explanation: 'ArrayList<Integer> stores Integer objects. Autoboxing converts the int values automatically.' },
      { type: 'quiz', id: 'q-wr2', question: 'What is §Integer.parseInt("120") + 5§?',
        choices: ['125', '1205', '"1205"', 'A compile error'], answer: 0, explanation: 'parseInt returns the int 120, so this is ordinary integer addition: 125.' },
      { type: 'quiz', id: 'q-wr3', question: 'What does §Integer.parseInt("12.5")§ do?',
        choices: ['Returns 12', 'Returns 13', 'Throws a NumberFormatException', 'Returns 12.5'], answer: 2, explanation: '"12.5" is not a valid int, so parseInt throws. Use Double.parseDouble for decimal text.' },
      { type: 'quiz', id: 'q-wr4', question: 'Which is the safest way to test whether two Integer objects hold the same value?',
        choices: ['a == b', 'a.equals(b)', 'a = b', 'a.compare(b)'], answer: 1, explanation: '== compares references for objects. equals compares the values.' },
      { type: 'predict', id: 'p-wr1', question: 'What does this program print?',
        code: w(j`Integer a = 7;
int b = a + 3;
Double d = 2.5;
System.out.println(b + " " + d * 2);`),
        answer: '10 5.0', explanation: 'a unboxes to 7 so b is 10. d unboxes to 2.5 and doubling gives 5.0.' },
      { type: 'predict', id: 'p-wr2', question: 'What does this program print?',
        code: w(j`String[] parts = {"4", "11", "25"};
int total = 0;
for (String p : parts) {
    total += Integer.parseInt(p);
}
System.out.println(total + " " + (Integer.MAX_VALUE > total));`),
        answer: '40 true', explanation: '4 + 11 + 25 = 40, and MAX_VALUE is far larger.' },
      { type: 'code', id: 'wr-parse', prompt: 'Convert the text values to numbers and print their sum as a double: §Total: 7.75§.',
        expected: 'Total: 7.75',
        starter: w(j`String a = "2.5";
String b = "5.25";
// TODO: parse both and print the sum
`),
        solution: w(j`String a = "2.5";
String b = "5.25";
double total = Double.parseDouble(a) + Double.parseDouble(b);
System.out.println("Total: " + total);`),
        hint: 'Double.parseDouble(a) turns text into a double.' },
      { type: 'code', id: 'wr-min', prompt: 'Use §Integer.MAX_VALUE§ as the starting "smallest so far" to find the smallest element. Expected: §Smallest: 3§.',
        expected: 'Smallest: 3',
        starter: w(j`int[] a = {9, 14, 3, 27};
int smallest = 0;   // TODO: choose a safe starting value
for (int v : a) {
    if (v < smallest) {
        smallest = v;
    }
}
System.out.println("Smallest: " + smallest);`),
        solution: w(j`int[] a = {9, 14, 3, 27};
int smallest = Integer.MAX_VALUE;
for (int v : a) {
    if (v < smallest) {
        smallest = v;
    }
}
System.out.println("Smallest: " + smallest);`),
        hint: 'Everything is smaller than Integer.MAX_VALUE, so the first element replaces it.' },
    ],
  },
  {
    id: '4-7',
    title: 'ArrayList Methods',
    blocks: [
      { type: 'text', md: md`
An **ArrayList** is a list object that **resizes itself**. You add and remove items without worrying about a fixed length. It must be imported, and you name the type of the items in angle brackets (a **generic type**). The type must be a class, so use wrappers for numbers.

§§§java
import java.util.ArrayList;

ArrayList<String> names = new ArrayList<String>();
ArrayList<Integer> nums = new ArrayList<Integer>();
§§§

The AP exam uses these methods:

| Method | What it does |
|---|---|
| §int size()§ | number of items |
| §boolean add(E obj)§ | appends to the end (returns true) |
| §void add(int index, E obj)§ | inserts at index, shifting later items right |
| §E get(int index)§ | returns the item at index |
| §E set(int index, E obj)§ | replaces the item, returns the old one |
| §E remove(int index)§ | removes the item at index, shifting later items left, returns it |

Indexes work like arrays: first item at **0**, last at **size() - 1**. Using any other index throws an §IndexOutOfBoundsException§.

**Compare the syntax:**

| Task | Array | ArrayList |
|---|---|---|
| length | §a.length§ | §list.size()§ |
| read | §a[i]§ | §list.get(i)§ |
| write | §a[i] = x§ | §list.set(i, x)§ |

**A common trap.** For §ArrayList<Integer>§, the call §list.remove(1)§ removes the item at **index** 1. To remove the **value** 20, box it explicitly: §list.remove(Integer.valueOf(20))§.

Printing a list shows the items in brackets: §[10, 20, 30]§.

Because ArrayList stores references, §list.get(i)§ on a list of Strings gives a String you can use like any other, for example §list.get(0).length()§. An ArrayList can be empty: §size()§ is 0 and §get(0)§ would throw.
` },
      { type: 'quiz', id: 'q-al1', question: 'Which declaration is correct for a list of whole numbers?',
        choices: ['ArrayList<int> a = new ArrayList<int>();', 'ArrayList<Integer> a = new ArrayList<Integer>();', 'ArrayList a = new int[10];', 'int ArrayList a = new ArrayList();'], answer: 1, explanation: 'Generic types must be classes, so use Integer rather than int.' },
      { type: 'quiz', id: 'q-al2', question: 'Given §ArrayList<String> list§ holding [A, B, C], what does §list.add(1, "X")§ produce?',
        choices: ['[X, B, C]', '[A, X, B, C]', '[A, B, X, C]', '[A, X, C]'], answer: 1, explanation: 'add(index, obj) inserts at that index and shifts the later items to the right. Nothing is replaced.' },
      { type: 'quiz', id: 'q-al3', question: 'What does §list.remove(0)§ return for [Q, R, S]?',
        choices: ['Nothing (void)', 'true', '"Q"', '0'], answer: 2, explanation: 'remove(int) returns the removed item. The list becomes [R, S].' },
      { type: 'quiz', id: 'q-al4', question: 'Which expression is the number of items in §ArrayList<String> names§?',
        choices: ['names.length', 'names.length()', 'names.size()', 'names.count()'], answer: 2, explanation: 'ArrayList uses size().' },
      { type: 'predict', id: 'p-al1', question: 'What does this program print?',
        code: w(j`ArrayList<String> list = new ArrayList<String>();
list.add("a");
list.add("b");
list.add("c");
list.add(1, "X");
list.remove(0);
list.set(2, "Z");
System.out.println(list);`),
        answer: '[X, b, Z]', explanation: '[a,b,c] then add(1,X): [a,X,b,c]. remove(0): [X,b,c]. set(2,Z): [X,b,Z].' },
      { type: 'predict', id: 'p-al2', question: 'What does this program print?',
        code: w(j`ArrayList<Integer> nums = new ArrayList<Integer>();
nums.add(10);
nums.add(20);
nums.add(30);
nums.remove(Integer.valueOf(20));
nums.remove(0);
System.out.println(nums + " " + nums.size());`),
        answer: '[30] 1', explanation: 'Removing the value 20 leaves [10, 30]. remove(0) removes the item at index 0, leaving [30].' },
      { type: 'code', id: 'al-build', prompt: 'Build an ArrayList of Strings: add §"red"§, §"green"§, §"blue"§, then insert §"yellow"§ at the **front**, then print the list and its size. Expected: §[yellow, red, green, blue] 4§.',
        expected: '[yellow, red, green, blue] 4',
        starter: w(j`ArrayList<String> colors = new ArrayList<String>();
// TODO
System.out.println(colors + " " + colors.size());`),
        solution: w(j`ArrayList<String> colors = new ArrayList<String>();
colors.add("red");
colors.add("green");
colors.add("blue");
colors.add(0, "yellow");
System.out.println(colors + " " + colors.size());`),
        hint: 'add(0, "yellow") inserts at index 0.' },
      { type: 'code', id: 'al-edit', prompt: 'Starting from [5, 10, 15, 20]: change the item at index 1 to 99, remove the **last** item, and print the list. Expected: §[5, 99, 15]§.',
        expected: '[5, 99, 15]',
        starter: w(j`ArrayList<Integer> a = new ArrayList<Integer>();
a.add(5);
a.add(10);
a.add(15);
a.add(20);
// TODO: set and remove
System.out.println(a);`),
        solution: w(j`ArrayList<Integer> a = new ArrayList<Integer>();
a.add(5);
a.add(10);
a.add(15);
a.add(20);
a.set(1, 99);
a.remove(a.size() - 1);
System.out.println(a);`),
        hint: 'The last index is a.size() - 1.' },
    ],
  },
  {
    id: '4-8',
    title: 'ArrayList Traversals',
    blocks: [
      { type: 'text', md: md`
Traversing an ArrayList uses the same two styles as an array:

§§§java
for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}

for (String s : list) {
    System.out.println(s);
}
§§§

The list version of the enhanced for loop has the same rule: the loop variable is a **copy of the reference**, so assigning to it does not change the list. To replace an item use §list.set(i, newValue)§ in an indexed loop.

**Changing the size while traversing.** This is the big danger.

1. **Do not add or remove items inside an enhanced for loop.** Java throws a §ConcurrentModificationException§.
2. **In an indexed forward loop**, removing item i shifts everything left, so the next item moves into position i and the §i++§ **skips** it.

Two safe ways to remove inside an indexed loop:

§§§java
// A) go backward: shifting only affects positions you already visited
for (int i = list.size() - 1; i >= 0; i--) {
    if (shouldRemove(list.get(i))) list.remove(i);
}

// B) go forward, but only move on when you did NOT remove
int i = 0;
while (i < list.size()) {
    if (shouldRemove(list.get(i))) list.remove(i);
    else i++;
}
§§§

Notice that the loop condition calls §list.size()§ each time, so it adapts as the list shrinks.

**Adding while traversing** forward can cause an infinite loop or skipped items too, so build a **new** list when in doubt.
` },
      { type: 'quiz', id: 'q-lt1', question: 'What happens if you call §list.remove(...)§ inside an enhanced for loop over the same list?',
        choices: ['It works normally', 'Java usually throws a ConcurrentModificationException', 'The compiler refuses to compile it', 'The loop restarts'], answer: 1, explanation: 'Structurally changing the list while an enhanced for loop iterates it is not allowed; it fails at run time.' },
      { type: 'quiz', id: 'q-lt2', question: 'Why does a forward indexed loop that removes items sometimes skip elements?',
        choices: ['get() is slow', 'Removing shifts later items left, so the next item slides into the index the loop just left', 'size() changes type', 'The loop variable becomes null'], answer: 1, explanation: 'After remove(i), the item that was at i + 1 is now at i, but i++ moves past it.' },
      { type: 'quiz', id: 'q-lt3', question: 'Which technique is safe for removing items while looping with an index?',
        choices: ['Looping from the end toward 0', 'Looping with an enhanced for', 'Adding to the list instead', 'Calling size() once before the loop and reusing it'], answer: 0, explanation: 'Going backward means the shifting only moves items you have already examined.' },
      { type: 'predict', id: 'p-lt1', question: 'The loop below tries to remove all even numbers going forward. What does it print?',
        code: w(j`ArrayList<Integer> list = new ArrayList<Integer>();
list.add(2);
list.add(4);
list.add(6);
list.add(7);
for (int i = 0; i < list.size(); i++) {
    if (list.get(i) % 2 == 0) {
        list.remove(i);
    }
}
System.out.println(list);`),
        answer: '[4, 7]', explanation: 'i=0 removes 2, so [4,6,7]. i=1 sees 6 and removes it: [4,7]. i=2 ends the loop. The 4 was skipped and stays, which is the bug.' },
      { type: 'predict', id: 'p-lt2', question: 'This version goes backward. What does it print?',
        code: w(j`ArrayList<Integer> list = new ArrayList<Integer>();
for (int n = 1; n <= 6; n++) {
    list.add(n);
}
for (int i = list.size() - 1; i >= 0; i--) {
    if (list.get(i) % 3 == 0) {
        list.remove(i);
    }
}
System.out.println(list);`),
        answer: '[1, 2, 4, 5]', explanation: 'The multiples of 3 (6 first, then 3) are removed without disturbing the items still to be checked.' },
      { type: 'code', id: 'lt-remove', prompt: 'Fix the traversal so that **all** negative numbers are removed, even when they are next to each other. Expected: §[4, 9, 2]§.',
        expected: '[4, 9, 2]',
        starter: w(j`ArrayList<Integer> a = new ArrayList<Integer>();
a.add(4);
a.add(-1);
a.add(-7);
a.add(9);
a.add(-3);
a.add(2);
for (int i = 0; i < a.size(); i++) {
    if (a.get(i) < 0) {
        a.remove(i);
    }
}
System.out.println(a);`),
        solution: w(j`ArrayList<Integer> a = new ArrayList<Integer>();
a.add(4);
a.add(-1);
a.add(-7);
a.add(9);
a.add(-3);
a.add(2);
for (int i = a.size() - 1; i >= 0; i--) {
    if (a.get(i) < 0) {
        a.remove(i);
    }
}
System.out.println(a);`),
        hint: 'Loop from size() - 1 down to 0, or only do i++ when nothing was removed.' },
      { type: 'code', id: 'lt-upper', prompt: 'Use §set§ in an indexed loop to change every string to **upper case** (an enhanced for loop cannot do this). Expected: §[CAT, DOG, EMU]§.',
        expected: '[CAT, DOG, EMU]',
        starter: w(j`ArrayList<String> a = new ArrayList<String>();
a.add("cat");
a.add("dog");
a.add("emu");
// TODO
System.out.println(a);`),
        solution: w(j`ArrayList<String> a = new ArrayList<String>();
a.add("cat");
a.add("dog");
a.add("emu");
for (int i = 0; i < a.size(); i++) {
    a.set(i, a.get(i).toUpperCase());
}
System.out.println(a);`),
        hint: 'a.set(i, a.get(i).toUpperCase());' },
    ],
  },
];
