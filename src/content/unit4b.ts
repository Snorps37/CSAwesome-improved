import type { Lesson } from './types';
import { md } from './md';
import { w } from './u4util';

const j = String.raw;

// Core collection concepts; lesson IDs follow the complete Unit 4 sequence.
export const unit4b: Lesson[] = [
  {
    id: '4-10',
    title: 'Implementing ArrayList Algorithms',
    blocks: [
      { type: 'text', md: md`
The array patterns from 4.5 carry over to ArrayList. Only the syntax changes: §size()§, §get(i)§, §set(i, x)§.

**Sum, average, max, count**

§§§java
int sum = 0;
for (int v : list) sum += v;          // unboxing happens automatically

int max = list.get(0);
for (int i = 1; i < list.size(); i++) {
    if (list.get(i) > max) max = list.get(i);
}
§§§

**Filter into a new list.** Instead of removing from the original, copy only the items you want. This avoids all the removal traps.

§§§java
ArrayList<Integer> evens = new ArrayList<Integer>();
for (int v : list) {
    if (v % 2 == 0) evens.add(v);
}
§§§

**Swap two items** uses §set§ and a temporary:

§§§java
int t = list.get(i);
list.set(i, list.get(j));
list.set(j, t);
§§§

**Reverse** swaps item i with item §size() - 1 - i§ for the first half.

**Insert in order** into an already sorted list: find the first position whose value is not smaller, then §add(index, value)§.

§§§java
int i = 0;
while (i < list.size() && list.get(i) < value) i++;
list.add(i, value);
§§§

**Remove adjacent duplicates** goes backward and removes item i when it equals item i - 1.

**Comparing objects.** Items in a list of Strings or wrappers must be compared with §equals§ (or §compareTo§), not §==§.

**Array or ArrayList?** Use an array when the size is known and fixed, or when you hold primitives or a table. Use an ArrayList when items are added and removed over time. A common step is converting: build a list while you do not know the final size.
` },
      { type: 'quiz', id: 'q-aa-1', question: 'You want only the words longer than 5 letters from a list, and the original list must be kept. What is a clean approach?',
        choices: ['Remove the short words from the original inside an enhanced for loop', 'Loop and add each long word to a new ArrayList', 'Use set() to replace short words with null', 'Sort the list'], answer: 1, explanation: 'Building a new list leaves the original untouched and avoids the pitfalls of removing during a traversal.' },
      { type: 'quiz', id: 'q-aa-2', question: 'Which line swaps items i and j in an ArrayList<Integer> after §int t = list.get(i);§?',
        choices: ['list.add(i, list.get(j)); list.add(j, t);', 'list.set(i, list.get(j)); list.set(j, t);', 'list.get(i) = list.get(j); list.get(j) = t;', 'list.remove(i); list.remove(j);'], answer: 1, explanation: 'set replaces an item at an index. get cannot be assigned to, and add would insert instead of replacing.' },
      { type: 'quiz', id: 'q-aa-3', question: 'When inserting into a sorted ascending list, what does the loop condition §list.get(i) < value§ find?',
        choices: ['The last item', 'The first position where the item is not smaller than value', 'The largest item', 'The number of duplicates'], answer: 1, explanation: 'The loop advances over items smaller than value and stops at the right insertion point.' },
      { type: 'predict', id: 'p-aa-1', question: 'What does this program print?',
        code: w(j`ArrayList<Integer> all = new ArrayList<Integer>();
for (int n = 1; n <= 10; n++) {
    all.add(n);
}
ArrayList<Integer> evens = new ArrayList<Integer>();
for (int v : all) {
    if (v % 2 == 0) {
        evens.add(v);
    }
}
System.out.println(evens + " " + all.size());`),
        answer: '[2, 4, 6, 8, 10] 10', explanation: 'evens collects 2 to 10. The original still has all 10 items.' },
      { type: 'predict', id: 'p-aa-2', question: 'What does this program print?',
        code: w(j`ArrayList<String> a = new ArrayList<String>();
a.add("a");
a.add("b");
a.add("c");
a.add("d");
for (int i = 0; i < a.size() / 2; i++) {
    String t = a.get(i);
    a.set(i, a.get(a.size() - 1 - i));
    a.set(a.size() - 1 - i, t);
}
System.out.println(a);`),
        answer: '[d, c, b, a]', explanation: 'Swap items 0 and 3, then 1 and 2.' },
      { type: 'predict', id: 'p-aa-3', question: 'What does this program print?',
        code: w(j`ArrayList<Integer> list = new ArrayList<Integer>();
list.add(2);
list.add(5);
list.add(9);
int value = 6;
int i = 0;
while (i < list.size() && list.get(i) < value) {
    i++;
}
list.add(i, value);
System.out.println(list);`),
        answer: '[2, 5, 6, 9]', explanation: 'i stops at 2 (the item 9 is not smaller than 6), so 6 is inserted before 9.' },
      { type: 'code', id: 'aa2-avg', prompt: 'Compute the **average** of the list as a double and print §Average: 4.5§.',
        expected: 'Average: 4.5',
        starter: w(j`ArrayList<Integer> a = new ArrayList<Integer>();
a.add(3);
a.add(8);
a.add(2);
a.add(5);
// TODO
`),
        solution: w(j`ArrayList<Integer> a = new ArrayList<Integer>();
a.add(3);
a.add(8);
a.add(2);
a.add(5);
int sum = 0;
for (int v : a) {
    sum += v;
}
System.out.println("Average: " + (double) sum / a.size());`),
        hint: 'Sum with an enhanced for, then divide by size() after casting to double.' },
      { type: 'code', id: 'aa2-filter', prompt: 'Build a **new list** containing only the words that start with §"b"§ and print it. Expected: §[bat, bee, bus]§.',
        expected: '[bat, bee, bus]',
        starter: w(j`ArrayList<String> words = new ArrayList<String>();
words.add("bat");
words.add("cow");
words.add("bee");
words.add("ant");
words.add("bus");
ArrayList<String> result = new ArrayList<String>();
// TODO
System.out.println(result);`),
        solution: w(j`ArrayList<String> words = new ArrayList<String>();
words.add("bat");
words.add("cow");
words.add("bee");
words.add("ant");
words.add("bus");
ArrayList<String> result = new ArrayList<String>();
for (String s : words) {
    if (s.substring(0, 1).equals("b")) {
        result.add(s);
    }
}
System.out.println(result);`),
        hint: 's.substring(0, 1).equals("b") checks the first letter.' },
      { type: 'code', id: 'aa2-dups', prompt: 'Remove **adjacent duplicates** (loop backward and compare each item with the one before it). Expected: §[1, 2, 3, 1]§.',
        expected: '[1, 2, 3, 1]',
        starter: w(j`ArrayList<Integer> a = new ArrayList<Integer>();
int[] data = {1, 1, 2, 2, 2, 3, 1};
for (int d : data) {
    a.add(d);
}
// TODO
System.out.println(a);`),
        solution: w(j`ArrayList<Integer> a = new ArrayList<Integer>();
int[] data = {1, 1, 2, 2, 2, 3, 1};
for (int d : data) {
    a.add(d);
}
for (int i = a.size() - 1; i >= 1; i--) {
    if (a.get(i).equals(a.get(i - 1))) {
        a.remove(i);
    }
}
System.out.println(a);`),
        hint: 'Use equals for Integer objects, and remove(i) with an int index.' },
    ],
  },
  {
    id: '4-14',
    title: 'Searching Algorithms',
    blocks: [
      { type: 'text', md: md`
**Searching** means finding a target value in a collection, or discovering it is not there. The standard answer is to return the **index** where it was found, or **-1** when it is absent.

**Linear (sequential) search.** Check the elements one by one from the start. It works on any collection, sorted or not.

§§§java
public static int linearSearch(int[] a, int target) {
    for (int i = 0; i < a.length; i++) {
        if (a[i] == target) {
            return i;          // found: stop immediately
        }
    }
    return -1;                 // looked everywhere
}
§§§

For Strings use §equals§: §if (words[i].equals(target))§. The same loop works for an ArrayList with §size()§ and §get(i)§.

In the worst case it checks every element: n comparisons for n elements.

**Binary search.** If the data is **sorted**, you can repeatedly throw away half of it. Compare the target with the **middle** item:

- equal: found it
- target is smaller: continue in the left half
- target is larger: continue in the right half

§§§java
public static int binarySearch(int[] a, int target) {
    int low = 0;
    int high = a.length - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (a[mid] == target) {
            return mid;
        } else if (a[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}
§§§

Each step halves the range, so 1,000 items need at most about 10 comparisons and 1,000,000 items only about 20. Binary search is **much faster, but only works on sorted data**. Run on unsorted data it can miss values that are present.

**Which is better?** If you search once in unsorted data, linear is simplest. If you search many times, sorting first and then using binary search pays off.
` },
      { type: 'quiz', id: 'q-se1', question: 'What must be true before you use binary search?',
        choices: ['The data holds only positive numbers', 'The data is sorted', 'The data has an even length', 'The data is in an ArrayList'], answer: 1, explanation: 'Binary search decides which half to discard by comparing with the middle, which only works if the values are in order.' },
      { type: 'quiz', id: 'q-se2', question: 'About how many comparisons does binary search need, at most, for 1,000 sorted items?',
        choices: ['1', 'about 10', 'about 500', '1,000'], answer: 1, explanation: 'Each comparison halves the range: 1000, 500, 250, ... reaches 1 in about 10 steps.' },
      { type: 'quiz', id: 'q-se3', question: 'What does a typical search method return when the target is absent?',
        choices: ['0', 'true', '-1', 'null for int'], answer: 2, explanation: '-1 can never be a valid index, so it clearly means "not found". 0 would be confused with the first element.' },
      { type: 'quiz', id: 'q-se4', question: 'A linear search returns as soon as it finds the target. In the worst case, how many elements does it examine in an array of n elements?',
        choices: ['1', 'log n', 'n', 'n squared'], answer: 2, explanation: 'If the target is last or missing, every element is checked.' },
      { type: 'predict', id: 'p-se1', question: 'What does this program print?',
        code: w(j`int[] a = {4, 7, 1, 7};
System.out.println(find(a, 7) + " " + find(a, 5));`,
          j`static int find(int[] a, int target) {
    for (int i = 0; i < a.length; i++) {
        if (a[i] == target) {
            return i;
        }
    }
    return -1;
}`),
        answer: '1 -1', explanation: 'The first 7 is at index 1 (the search stops there). 5 is not present.' },
      { type: 'predict', id: 'p-se2', question: 'The program counts the loop passes of a binary search. What does it print (index, then passes)?',
        code: w(j`int[] a = {2, 4, 6, 8, 10, 12, 14};
int target = 12;
int low = 0;
int high = a.length - 1;
int passes = 0;
int found = -1;
while (low <= high) {
    passes++;
    int mid = (low + high) / 2;
    if (a[mid] == target) {
        found = mid;
        break;
    } else if (a[mid] < target) {
        low = mid + 1;
    } else {
        high = mid - 1;
    }
}
System.out.println(found + " " + passes);`),
        answer: '5 2', explanation: 'Pass 1: mid = 3 (value 8) is too small, so low = 4. Pass 2: mid = 5 holds 12. Found at index 5 after 2 passes.' },
      { type: 'predict', id: 'p-se3', question: 'Same loop, but the target is missing. What does it print (result, then passes)?',
        code: w(j`int[] a = {1, 3, 7, 9};
int target = 5;
int low = 0;
int high = a.length - 1;
int passes = 0;
int found = -1;
while (low <= high) {
    passes++;
    int mid = (low + high) / 2;
    if (a[mid] == target) {
        found = mid;
        break;
    } else if (a[mid] < target) {
        low = mid + 1;
    } else {
        high = mid - 1;
    }
}
System.out.println(found + " " + passes);`),
        answer: '-1 2', explanation: 'Pass 1: mid = 1 (3) is smaller, low = 2. Pass 2: mid = 2 (7) is bigger, high = 1. Now low > high, so the loop ends with -1.' },
      { type: 'code', id: 'se-linear', prompt: 'Complete §indexOf§ so it returns the index of the first matching String, or -1. The program should print §2 -1§.',
        expected: '2 -1',
        starter: w(j`String[] names = {"Ana", "Ben", "Cy", "Di"};
System.out.println(indexOf(names, "Cy") + " " + indexOf(names, "Zed"));`,
          j`static int indexOf(String[] arr, String target) {
    // TODO
    return -1;
}`),
        solution: w(j`String[] names = {"Ana", "Ben", "Cy", "Di"};
System.out.println(indexOf(names, "Cy") + " " + indexOf(names, "Zed"));`,
          j`static int indexOf(String[] arr, String target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i].equals(target)) {
            return i;
        }
    }
    return -1;
}`),
        hint: 'Compare Strings with equals, and return i the moment you find a match.' },
      { type: 'code', id: 'se-binary', prompt: 'Finish the binary search so it prints §3 -1§.',
        expected: '3 -1',
        starter: w(j`int[] a = {5, 10, 15, 20, 25, 30};
System.out.println(binarySearch(a, 20) + " " + binarySearch(a, 12));`,
          j`static int binarySearch(int[] a, int target) {
    int low = 0;
    int high = a.length - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        // TODO: compare a[mid] with target and move low or high
    }
    return -1;
}`),
        solution: w(j`int[] a = {5, 10, 15, 20, 25, 30};
System.out.println(binarySearch(a, 20) + " " + binarySearch(a, 12));`,
          j`static int binarySearch(int[] a, int target) {
    int low = 0;
    int high = a.length - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (a[mid] == target) {
            return mid;
        } else if (a[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}`),
        hint: 'Equal: return mid. Too small: low = mid + 1. Too big: high = mid - 1.' },
      { type: 'code', id: 'se-list', prompt: 'Write a linear search over an §ArrayList<Integer>§ that counts how many times 3 appears (instead of stopping at the first). Print §Count: 3§.',
        expected: 'Count: 3',
        starter: w(j`ArrayList<Integer> a = new ArrayList<Integer>();
int[] data = {3, 1, 3, 4, 3, 9};
for (int d : data) {
    a.add(d);
}
int count = 0;
// TODO
System.out.println("Count: " + count);`),
        solution: w(j`ArrayList<Integer> a = new ArrayList<Integer>();
int[] data = {3, 1, 3, 4, 3, 9};
for (int d : data) {
    a.add(d);
}
int count = 0;
for (int i = 0; i < a.size(); i++) {
    if (a.get(i) == 3) {
        count++;
    }
}
System.out.println("Count: " + count);`),
        hint: 'Do not return early; keep looping and increment count on each match.' },
    ],
  },
  {
    id: '4-15',
    title: 'Sorting Algorithms',
    blocks: [
      { type: 'text', md: md`
**Sorting** puts elements in order. Sorted data is easier to read, to search (binary search!), and to check for duplicates. This lesson covers two simple algorithms; merge sort is in 4.17.

**Selection sort.** For each position i from the start: find the **smallest** value in the part you have not placed yet (positions i to the end), then **swap** it into position i. After pass i, the first i + 1 elements are final.

§§§java
for (int i = 0; i < a.length - 1; i++) {
    int minIndex = i;
    for (int j = i + 1; j < a.length; j++) {
        if (a[j] < a[minIndex]) minIndex = j;
    }
    int t = a[i];
    a[i] = a[minIndex];
    a[minIndex] = t;
}
§§§

It makes about n squared comparisons whatever the order, but at most n - 1 swaps.

**Insertion sort.** Treat the left part as already sorted. Take the next element, **slide larger elements one place right** to make room, and drop it into its gap.

§§§java
for (int i = 1; i < a.length; i++) {
    int value = a[i];
    int j = i - 1;
    while (j >= 0 && a[j] > value) {
        a[j + 1] = a[j];
        j--;
    }
    a[j + 1] = value;
}
§§§

If the data is nearly sorted, insertion sort does very little work. In the worst case (reverse order) it is about n squared.

Both are **in place**: they sort the array itself without a second array.

**Sorting Strings** uses §compareTo§: §a[j].compareTo(a[minIndex]) < 0§ means a[j] comes first alphabetically. Never use < or > on Strings.

When tracing a sort on the exam, write the array after each pass. Selection sort's passes put the smallest items in front first; insertion sort's passes keep a sorted prefix that keeps growing.
` },
      { type: 'quiz', id: 'q-so1', question: 'After the **first pass** of selection sort on {5, 3, 8, 1}, what is the array?',
        choices: ['{3, 5, 8, 1}', '{1, 3, 8, 5}', '{1, 5, 3, 8}', '{3, 5, 1, 8}'], answer: 1, explanation: 'The smallest value, 1, is swapped with the element at index 0: {1, 3, 8, 5}.' },
      { type: 'quiz', id: 'q-so2', question: 'After the **first pass** of insertion sort (i = 1) on {5, 3, 8, 1}, what is the array?',
        choices: ['{3, 5, 8, 1}', '{1, 3, 5, 8}', '{5, 3, 8, 1}', '{3, 5, 1, 8}'], answer: 0, explanation: 'The value 3 is inserted into the sorted prefix {5}, giving {3, 5}. The rest is untouched.' },
      { type: 'quiz', id: 'q-so3', question: 'For which input does insertion sort do the **least** work?',
        choices: ['Reverse order', 'Random order', 'Already sorted', 'All values different'], answer: 2, explanation: 'In sorted data the while loop never has to move anything, so each element needs one comparison.' },
      { type: 'quiz', id: 'q-so4', question: 'How do you compare two Strings alphabetically?',
        choices: ['s1 < s2', 's1.compareTo(s2)', 's1 == s2', 's1.equals(s2)'], answer: 1, explanation: 'compareTo returns a negative number, zero or a positive number. equals only says same or different.' },
      { type: 'predict', id: 'p-so1', question: 'This runs only the first two passes of selection sort. What does it print?',
        code: w(j`int[] a = {5, 3, 8, 1, 9, 2};
for (int i = 0; i < 2; i++) {
    int minIndex = i;
    for (int j = i + 1; j < a.length; j++) {
        if (a[j] < a[minIndex]) {
            minIndex = j;
        }
    }
    int t = a[i];
    a[i] = a[minIndex];
    a[minIndex] = t;
}
for (int v : a) {
    System.out.print(v + " ");
}
System.out.println();`),
        answer: '1 2 8 5 9 3', explanation: 'Pass 0 swaps 1 into front: 1 3 8 5 9 2. Pass 1 swaps the smallest remaining (2) with position 1: 1 2 8 5 9 3.' },
      { type: 'predict', id: 'p-so2', question: 'This runs insertion sort for i = 1, 2 and 3 only. What does it print?',
        code: w(j`int[] a = {5, 3, 8, 1, 9, 2};
for (int i = 1; i <= 3; i++) {
    int value = a[i];
    int j = i - 1;
    while (j >= 0 && a[j] > value) {
        a[j + 1] = a[j];
        j--;
    }
    a[j + 1] = value;
}
for (int v : a) {
    System.out.print(v + " ");
}
System.out.println();`),
        answer: '1 3 5 8 9 2', explanation: 'After i=1: 3 5 8 1 9 2. After i=2: unchanged. After i=3, the 1 slides to the front: 1 3 5 8 9 2.' },
      { type: 'predict', id: 'p-so3', question: 'Selection sort counts real swaps (only when the minimum is not already in place). What does this print: the array, then the swap count?',
        code: w(j`int[] a = {3, 1, 2};
int swaps = 0;
for (int i = 0; i < a.length - 1; i++) {
    int minIndex = i;
    for (int j = i + 1; j < a.length; j++) {
        if (a[j] < a[minIndex]) {
            minIndex = j;
        }
    }
    if (minIndex != i) {
        int t = a[i];
        a[i] = a[minIndex];
        a[minIndex] = t;
        swaps++;
    }
}
for (int v : a) {
    System.out.print(v + " ");
}
System.out.println(swaps);`),
        answer: '1 2 3 2', explanation: '{3,1,2}: swap 3 and 1 -> {1,3,2}; swap 3 and 2 -> {1,2,3}. Two swaps.' },
      { type: 'code', id: 'so-selection', prompt: 'Complete **selection sort**. Expected output: §1 2 4 7 9§.',
        expected: '1 2 4 7 9',
        starter: w(j`int[] a = {7, 2, 9, 1, 4};
for (int i = 0; i < a.length - 1; i++) {
    int minIndex = i;
    // TODO: find the index of the smallest value from i to the end
    // TODO: swap a[i] and a[minIndex]
}
for (int v : a) {
    System.out.print(v + " ");
}
System.out.println();`),
        solution: w(j`int[] a = {7, 2, 9, 1, 4};
for (int i = 0; i < a.length - 1; i++) {
    int minIndex = i;
    for (int j = i + 1; j < a.length; j++) {
        if (a[j] < a[minIndex]) {
            minIndex = j;
        }
    }
    int t = a[i];
    a[i] = a[minIndex];
    a[minIndex] = t;
}
for (int v : a) {
    System.out.print(v + " ");
}
System.out.println();`),
        hint: 'An inner loop from i + 1 updates minIndex; then do the three-line swap.' },
      { type: 'code', id: 'so-insertion', prompt: 'Complete **insertion sort** on Strings using §compareTo§. Expected: §ant bee cat dog§.',
        expected: 'ant bee cat dog',
        starter: w(j`String[] a = {"dog", "ant", "cat", "bee"};
for (int i = 1; i < a.length; i++) {
    String value = a[i];
    int j = i - 1;
    // TODO: shift larger Strings right while a[j].compareTo(value) > 0
    a[j + 1] = value;
}
for (String s : a) {
    System.out.print(s + " ");
}
System.out.println();`),
        solution: w(j`String[] a = {"dog", "ant", "cat", "bee"};
for (int i = 1; i < a.length; i++) {
    String value = a[i];
    int j = i - 1;
    while (j >= 0 && a[j].compareTo(value) > 0) {
        a[j + 1] = a[j];
        j--;
    }
    a[j + 1] = value;
}
for (String s : a) {
    System.out.print(s + " ");
}
System.out.println();`),
        hint: 'while (j >= 0 && a[j].compareTo(value) > 0) { a[j + 1] = a[j]; j--; }' },
    ],
  },
  {
    id: '4-16',
    title: 'Recursion',
    blocks: [
      { type: 'text', md: md`
A **recursive method** is a method that **calls itself**. It solves a problem by reducing it to a smaller copy of the same problem.

Every correct recursive method has two parts:

1. **Base case**: an input simple enough to answer directly, with no further recursive call.
2. **Recursive case**: calls the method on a **smaller** input that moves toward the base case.

§§§java
public static int factorial(int n) {
    if (n <= 1) {
        return 1;                    // base case
    }
    return n * factorial(n - 1);     // recursive case
}
§§§

Tracing §factorial(4)§:

§§§text
factorial(4) = 4 * factorial(3)
             = 4 * (3 * factorial(2))
             = 4 * (3 * (2 * factorial(1)))
             = 4 * (3 * (2 * 1)) = 24
§§§

Each call gets its **own** copy of the parameters and local variables, kept on the **call stack**. The calls pile up until the base case answers, then results come back down in reverse order. If there is no base case, or the argument never gets closer to it, the stack fills and Java throws a §StackOverflowError§.

**Where the print goes matters.** Code **before** the recursive call runs on the way down, code **after** it runs on the way back:

§§§java
static void show(int n) {
    if (n == 0) return;
    System.out.print(n + " ");   // before
    show(n - 1);
    System.out.print(n + " ");   // after
}
// show(3) prints: 3 2 1 1 2 3
§§§

**Recursion on Strings** works with substring: the first character plus the answer for the rest.

§§§java
static String reverse(String s) {
    if (s.length() <= 1) return s;
    return reverse(s.substring(1)) + s.charAt(0);
}
§§§

Anything recursion does can be done with a loop (iteration). Recursion is often shorter and clearer for naturally nested problems, but uses more memory for the stack. The AP exam asks you to **trace** recursive methods and to **write** simple ones.
` },
      { type: 'quiz', id: 'q-re1', question: 'What is the base case of a recursive method?',
        choices: ['The first line of the method', 'An input handled directly, without another recursive call', 'The call that causes an error', 'The largest input'], answer: 1, explanation: 'The base case stops the chain of calls and returns an answer straight away.' },
      { type: 'quiz', id: 'q-re2', question: 'What happens with §static int f(int n) { return f(n - 1) + 1; }§ (no base case)?',
        choices: ['Returns 0', 'Returns n', 'StackOverflowError at run time', 'Compile error'], answer: 2, explanation: 'The calls never stop, so the call stack runs out of space.' },
      { type: 'quiz', id: 'q-re3', question: 'What is §factorial(5)§ using the method above?',
        choices: ['15', '24', '120', '720'], answer: 2, explanation: '5 * 4 * 3 * 2 * 1 = 120.' },
      { type: 'quiz', id: 'q-re4', question: 'Which statement about recursion versus loops is true?',
        choices: ['Recursion can solve things loops cannot', 'Any recursive method can be rewritten with a loop', 'Recursive methods never need a base case', 'Loops cannot use methods'], answer: 1, explanation: 'Recursion and iteration are equally powerful; they differ in style and memory use.' },
      { type: 'predict', id: 'p-re1', question: 'What does this program print?',
        code: w(j`System.out.println(mystery(4821));`,
          j`static int mystery(int n) {
    if (n <= 0) {
        return 0;
    }
    return n % 10 + mystery(n / 10);
}`),
        answer: '15', explanation: '1 + 2 + 8 + 4 = 15: each call adds the last digit and recurses on the rest.' },
      { type: 'predict', id: 'p-re2', question: 'What does this program print?',
        code: w(j`show(3);
System.out.println();`,
          j`static void show(int n) {
    if (n == 0) {
        return;
    }
    System.out.print(n + " ");
    show(n - 1);
    System.out.print(n + " ");
}`),
        answer: '3 2 1 1 2 3', explanation: 'The first print happens going down (3, 2, 1). After the base case the second prints happen coming back (1, 2, 3).' },
      { type: 'predict', id: 'p-re3', question: 'What does this program print?',
        code: w(j`System.out.println(fib(6));`,
          j`static int fib(int n) {
    if (n <= 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}`),
        answer: '8', explanation: 'The sequence is 0, 1, 1, 2, 3, 5, 8, so fib(6) = 8.' },
      { type: 'code', id: 're-sum', prompt: 'Write a recursive §sumTo(n)§ that returns 1 + 2 + ... + n. Expected: §55§.',
        expected: '55',
        starter: w(j`System.out.println(sumTo(10));`,
          j`static int sumTo(int n) {
    // TODO: base case and recursive case
    return 0;
}`),
        solution: w(j`System.out.println(sumTo(10));`,
          j`static int sumTo(int n) {
    if (n <= 0) {
        return 0;
    }
    return n + sumTo(n - 1);
}`),
        hint: 'Base case: n is 0 (return 0). Otherwise return n plus sumTo(n - 1).' },
      { type: 'code', id: 're-power', prompt: 'Write a recursive §power(base, exp)§ (exp is 0 or more). Expected: §1024 1§.',
        expected: '1024 1',
        starter: w(j`System.out.println(power(2, 10) + " " + power(7, 0));`,
          j`static int power(int base, int exp) {
    // TODO
    return 0;
}`),
        solution: w(j`System.out.println(power(2, 10) + " " + power(7, 0));`,
          j`static int power(int base, int exp) {
    if (exp == 0) {
        return 1;
    }
    return base * power(base, exp - 1);
}`),
        hint: 'Anything to the power 0 is 1; otherwise base times power(base, exp - 1).' },
      { type: 'code', id: 're-reverse', prompt: 'Write a recursive §reverse(s)§ using §substring§. Expected: §olleh§.',
        expected: 'olleh',
        starter: w(j`System.out.println(reverse("hello"));`,
          j`static String reverse(String s) {
    // TODO
    return s;
}`),
        solution: w(j`System.out.println(reverse("hello"));`,
          j`static String reverse(String s) {
    if (s.length() <= 1) {
        return s;
    }
    return reverse(s.substring(1)) + s.charAt(0);
}`),
        hint: 'reverse of the rest, followed by the first character.' },
    ],
  },
  {
    id: '4-17',
    title: 'Recursive Searching and Sorting',
    blocks: [
      { type: 'text', md: md`
Searching and sorting have elegant recursive versions.

**Recursive binary search.** The range to search is described by two extra parameters, §low§ and §high§. The base cases are "range empty" (not found) and "middle matches".

§§§java
static int search(int[] a, int low, int high, int target) {
    if (low > high) {
        return -1;                                   // base case: empty range
    }
    int mid = (low + high) / 2;
    if (a[mid] == target) {
        return mid;                                  // base case: found
    } else if (a[mid] < target) {
        return search(a, mid + 1, high, target);     // right half
    } else {
        return search(a, low, mid - 1, target);      // left half
    }
}
// first call: search(a, 0, a.length - 1, target)
§§§

This does the same work as the loop version, using the call stack in place of the variables §low§ and §high§.

**Merge sort.** A **divide and conquer** algorithm:

1. If the array has fewer than 2 elements it is sorted (base case).
2. Split it into a left half and a right half.
3. Recursively sort each half.
4. **Merge** the two sorted halves into one sorted array.

Merging is the clever part. Keep a pointer into each half; repeatedly copy the smaller front item into the result:

§§§java
static void merge(int[] left, int[] right, int[] out) {
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) out[k++] = left[i++];
        else out[k++] = right[j++];
    }
    while (i < left.length)  out[k++] = left[i++];
    while (j < right.length) out[k++] = right[j++];
}
§§§

Merge sort is far faster than selection or insertion sort for large data: about n times log n steps instead of n squared. For a million items that is the difference between roughly 20 million steps and a trillion. The price is extra memory for the temporary halves.

**Summary of the three sorts**

| Algorithm | Idea | Typical speed |
|---|---|---|
| Selection | repeatedly pick the smallest remaining | n squared |
| Insertion | insert each item into a sorted prefix | n squared (fast if nearly sorted) |
| Merge | split, sort halves, merge | n log n |
` },
      { type: 'quiz', id: 'q-rs1', question: 'In recursive binary search, what does the call §search(a, mid + 1, high, target)§ mean?',
        choices: ['Search the left half', 'Search the right half, excluding mid', 'Start over', 'Report not found'], answer: 1, explanation: 'mid was too small, so the target can only be in positions mid + 1 through high.' },
      { type: 'quiz', id: 'q-rs2', question: 'What is the base case of merge sort?',
        choices: ['The array has exactly 10 elements', 'The array has fewer than 2 elements', 'The array is already merged', 'The two halves are equal'], answer: 1, explanation: 'An array of 0 or 1 elements is trivially sorted, so no more splitting is needed.' },
      { type: 'quiz', id: 'q-rs3', question: 'Merging {1, 4, 9} and {2, 3, 10} produces...',
        choices: ['{1, 4, 9, 2, 3, 10}', '{1, 2, 3, 4, 9, 10}', '{1, 2, 4, 3, 9, 10}', '{10, 9, 4, 3, 2, 1}'], answer: 1, explanation: 'Each step takes the smaller of the two front items: 1, 2, 3, 4, 9, 10.' },
      { type: 'quiz', id: 'q-rs4', question: 'Why is merge sort preferred over selection sort for very large arrays?',
        choices: ['It uses no extra memory', 'It does roughly n log n work instead of n squared', 'It only works on sorted data', 'It has no recursion'], answer: 1, explanation: 'Halving the problem repeatedly gives far fewer steps for large n.' },
      { type: 'predict', id: 'p-rs1', question: 'The counter tracks how many calls the recursive search makes. What does the program print (index, then calls)?',
        code: w(j`int[] a = {2, 4, 6, 8, 10, 12, 14, 16};
System.out.println(search(a, 0, a.length - 1, 4) + " " + calls);`,
          j`static int calls = 0;

static int search(int[] a, int low, int high, int target) {
    calls++;
    if (low > high) {
        return -1;
    }
    int mid = (low + high) / 2;
    if (a[mid] == target) {
        return mid;
    } else if (a[mid] < target) {
        return search(a, mid + 1, high, target);
    } else {
        return search(a, low, mid - 1, target);
    }
}`),
        answer: '1 2', explanation: 'Call 1: mid = 3 (value 8) is too big, so search 0..2. Call 2: mid = 1 holds 4. Found at index 1 after 2 calls.' },
      { type: 'predict', id: 'p-rs2', question: 'What does this program print?',
        code: w(j`int[] left = {1, 4, 9};
int[] right = {2, 3, 10};
int[] out = new int[6];
int i = 0, j = 0, k = 0;
while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
        out[k++] = left[i++];
    } else {
        out[k++] = right[j++];
    }
}
while (i < left.length) {
    out[k++] = left[i++];
}
while (j < right.length) {
    out[k++] = right[j++];
}
for (int v : out) {
    System.out.print(v + " ");
}
System.out.println();`),
        answer: '1 2 3 4 9 10', explanation: 'The standard merge: always copy the smaller front item. When one side is empty, copy what is left of the other.' },
      { type: 'predict', id: 'p-rs3', question: 'A recursive linear search for the first even number. What does this print?',
        code: w(j`int[] a = {7, 9, 4, 6};
System.out.println(firstEven(a, 0));`,
          j`static int firstEven(int[] a, int i) {
    if (i >= a.length) {
        return -1;
    }
    if (a[i] % 2 == 0) {
        return i;
    }
    return firstEven(a, i + 1);
}`),
        answer: '2', explanation: 'Positions 0 and 1 are odd, position 2 holds 4, so the answer is 2.' },
      { type: 'code', id: 'rs-search', prompt: 'Complete the recursive binary search. Expected: §4 -1§.',
        expected: '4 -1',
        starter: w(j`int[] a = {3, 6, 9, 12, 15, 18, 21};
System.out.println(search(a, 0, a.length - 1, 15) + " " + search(a, 0, a.length - 1, 10));`,
          j`static int search(int[] a, int low, int high, int target) {
    if (low > high) {
        return -1;
    }
    int mid = (low + high) / 2;
    // TODO: found / search right half / search left half
    return -1;
}`),
        solution: w(j`int[] a = {3, 6, 9, 12, 15, 18, 21};
System.out.println(search(a, 0, a.length - 1, 15) + " " + search(a, 0, a.length - 1, 10));`,
          j`static int search(int[] a, int low, int high, int target) {
    if (low > high) {
        return -1;
    }
    int mid = (low + high) / 2;
    if (a[mid] == target) {
        return mid;
    } else if (a[mid] < target) {
        return search(a, mid + 1, high, target);
    } else {
        return search(a, low, mid - 1, target);
    }
}`),
        hint: 'Mirror the loop version: three outcomes, two of them recursive calls with a narrower range.' },
      { type: 'code', id: 'rs-merge', prompt: 'The §mergeSort§ method is written for you. Complete the §merge§ helper (take the smaller front item each time). Expected: §1 2 3 5 8 9§.',
        expected: '1 2 3 5 8 9',
        starter: w(j`int[] a = {8, 3, 9, 1, 5, 2};
mergeSort(a);
for (int v : a) {
    System.out.print(v + " ");
}
System.out.println();`,
          j`static void mergeSort(int[] a) {
    if (a.length < 2) {
        return;
    }
    int mid = a.length / 2;
    int[] left = new int[mid];
    int[] right = new int[a.length - mid];
    for (int i = 0; i < left.length; i++) {
        left[i] = a[i];
    }
    for (int i = 0; i < right.length; i++) {
        right[i] = a[mid + i];
    }
    mergeSort(left);
    mergeSort(right);
    merge(left, right, a);
}

static void merge(int[] left, int[] right, int[] out) {
    int i = 0, j = 0, k = 0;
    // TODO: merge left and right into out
}`),
        solution: w(j`int[] a = {8, 3, 9, 1, 5, 2};
mergeSort(a);
for (int v : a) {
    System.out.print(v + " ");
}
System.out.println();`,
          j`static void mergeSort(int[] a) {
    if (a.length < 2) {
        return;
    }
    int mid = a.length / 2;
    int[] left = new int[mid];
    int[] right = new int[a.length - mid];
    for (int i = 0; i < left.length; i++) {
        left[i] = a[i];
    }
    for (int i = 0; i < right.length; i++) {
        right[i] = a[mid + i];
    }
    mergeSort(left);
    mergeSort(right);
    merge(left, right, a);
}

static void merge(int[] left, int[] right, int[] out) {
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            out[k++] = left[i++];
        } else {
            out[k++] = right[j++];
        }
    }
    while (i < left.length) {
        out[k++] = left[i++];
    }
    while (j < right.length) {
        out[k++] = right[j++];
    }
}`),
        hint: 'One loop while both halves have items, then two loops to copy any leftovers.' },
    ],
  },
  {
    id: '4-11',
    title: '2D Array Creation and Access',
    blocks: [
      { type: 'text', md: md`
A **2D array** stores a table: rows and columns. In Java it is an **array of arrays**: the outer array holds one array per row.

§§§java
int[][] grid = new int[3][4];     // 3 rows, 4 columns, all 0
String[][] seats = new String[2][5];   // all null
int[][] m = {
    {1, 2, 3},
    {4, 5, 6}
};                                  // 2 rows, 3 columns
§§§

An element needs **two indexes**, row first then column:

§§§java
m[1][2]          // row 1, column 2 -> 6
m[0][0] = 100;   // change the top-left element
§§§

| Expression | Meaning |
|---|---|
| §m.length§ | number of **rows** |
| §m[0].length§ | number of **columns** (length of row 0) |
| §m[r]§ | the whole row r, a 1D array |
| §m[r][c]§ | one element |

The valid row indexes are 0 to §m.length - 1§ and the valid column indexes 0 to §m[0].length - 1§. Going outside throws an §ArrayIndexOutOfBoundsException§.

Defaults are the same as for 1D arrays: 0, 0.0, false or null.

Because a row is itself an array, §int[] r = m[0];§ is a **reference to that row**, not a copy; changing §r[1]§ changes §m[0][1]§.

Think of the picture below for §m§:

§§§text
          col 0  col 1  col 2
row 0  [    1      2      3  ]
row 1  [    4      5      6  ]
§§§

Mixing up row and column is the most common 2D mistake. Say "row, column" every time, and when drawing, label the rows down the side and the columns across the top.
` },
      { type: 'quiz', id: 'q-2d1', question: 'For §int[][] a = new int[4][7];§ what is §a[0].length§?',
        choices: ['4', '7', '28', '0'], answer: 1, explanation: 'There are 4 rows (a.length) each holding 7 columns (a[0].length).' },
      { type: 'quiz', id: 'q-2d2', question: 'In §a[r][c]§, what does the first index select?',
        choices: ['The column', 'The row', 'The value', 'The array type'], answer: 1, explanation: 'Row first, column second.' },
      { type: 'quiz', id: 'q-2d3', question: 'What is the value of §m[1][0]§ for §int[][] m = {{9, 8}, {7, 6}, {5, 4}};§?',
        choices: ['9', '8', '7', '5'], answer: 2, explanation: 'Row 1 is {7, 6}; its element 0 is 7.' },
      { type: 'quiz', id: 'q-2d4', question: 'How many elements does §new String[3][5]§ have, and what are they initially?',
        choices: ['8, all ""', '15, all null', '15, all ""', '8, all null'], answer: 1, explanation: '3 rows of 5 gives 15 elements. Object arrays start as null.' },
      { type: 'predict', id: 'p-2d1', question: 'What does this program print?',
        code: w(j`int[][] m = {{1, 2, 3}, {4, 5, 6}};
System.out.println(m.length + " " + m[0].length + " " + m[1][2]);`),
        answer: '2 3 6', explanation: '2 rows, 3 columns, and row 1 column 2 is 6.' },
      { type: 'predict', id: 'p-2d2', question: 'What does this program print?',
        code: w(j`int[][] g = new int[2][3];
g[1][2] = 5;
g[0][0] = g[1][2] + 1;
System.out.println(g[0][0] + " " + g[1][1] + " " + g[1][2]);`),
        answer: '6 0 5', explanation: 'g[0][0] becomes 6; g[1][1] was never set so it is 0.' },
      { type: 'predict', id: 'p-2d3', question: 'What does this program print?',
        code: w(j`int[][] m = {{1, 2}, {3, 4}};
int[] r = m[0];
r[1] = 50;
System.out.println(m[0][1] + " " + m[1][1]);`),
        answer: '50 4', explanation: 'r refers to the same array as row 0, so changing r[1] changes m[0][1].' },
      { type: 'code', id: '2d-make', prompt: 'Create a 2D int array named §t§ with rows {1, 2, 3} and {4, 5, 6}. The program prints the number of rows, columns and the bottom-right value: §2 3 6§.',
        expected: '2 3 6',
        starter: w(j`// TODO: create t
System.out.println(t.length + " " + t[0].length + " " + t[t.length - 1][t[0].length - 1]);`),
        solution: w(j`int[][] t = {{1, 2, 3}, {4, 5, 6}};
System.out.println(t.length + " " + t[0].length + " " + t[t.length - 1][t[0].length - 1]);`),
        hint: 'int[][] t = {{1, 2, 3}, {4, 5, 6}};' },
      { type: 'code', id: '2d-fix', prompt: 'The code mixes up row and column and crashes (the table has 2 rows and 4 columns). Fix the indexes so it prints §8§, the last element of the last row.',
        expected: '8',
        starter: w(j`int[][] a = {{1, 2, 3, 4}, {5, 6, 7, 8}};
System.out.println(a[3][1]);`),
        solution: w(j`int[][] a = {{1, 2, 3, 4}, {5, 6, 7, 8}};
System.out.println(a[1][3]);`),
        hint: 'Row first: the last row is index 1, the last column is index 3.' },
      { type: 'code', id: '2d-seats', prompt: 'Build a seating chart: a §String[][]§ with 2 rows and 3 columns. Set seat [0][1] to §"Ana"§ and [1][2] to §"Ben"§ and print both. Expected: §Ana Ben null§ (the third value is an empty seat, [0][0]).',
        expected: 'Ana Ben null',
        starter: w(j`String[][] seats = new String[2][3];
// TODO: assign two seats
System.out.println(seats[0][1] + " " + seats[1][2] + " " + seats[0][0]);`),
        solution: w(j`String[][] seats = new String[2][3];
seats[0][1] = "Ana";
seats[1][2] = "Ben";
System.out.println(seats[0][1] + " " + seats[1][2] + " " + seats[0][0]);`),
        hint: 'seats[row][col] = "name";' },
    ],
  },
  {
    id: '4-12',
    title: '2D Array Traversals: Nested Loops',
    blocks: [
      { type: 'text', md: md`
To visit every element of a 2D array, use **nested loops**: one for the rows, one for the columns.

**Row-major order** (row by row, left to right) is the usual choice:

§§§java
for (int r = 0; r < m.length; r++) {
    for (int c = 0; c < m[r].length; c++) {
        System.out.print(m[r][c] + " ");
    }
    System.out.println();          // new line after each row
}
§§§

**Column-major order** (down each column) swaps the loops. Here the outer variable is the column and the limit uses the row count:

§§§java
for (int c = 0; c < m[0].length; c++) {
    for (int r = 0; r < m.length; r++) {
        System.out.print(m[r][c] + " ");
    }
}
§§§

**Enhanced for loops** work too. The outer one gives each row (a 1D array), the inner one each value:

§§§java
for (int[] row : m) {
    for (int v : row) {
        total += v;
    }
}
§§§

As with 1D arrays, assigning to the loop variable does not change the table. To modify elements use the indexed form.

**Common patterns**

- **Total of one row:** a single loop over c with r fixed.
- **Total of one column:** a single loop over r with c fixed.
- **Main diagonal** of a square table: elements §m[i][i]§, one loop.
- **Searching:** nested loops; return as soon as a match is found.
- **Neighbors:** look at §m[r-1][c]§, §m[r+1][c]§, §m[r][c-1]§, §m[r][c+1]§, but **check bounds first** so you do not step off the edge.

§§§java
static boolean inBounds(int[][] m, int r, int c) {
    return r >= 0 && r < m.length && c >= 0 && c < m[0].length;
}
§§§

**Passing a table to a method.** The parameter is an §int[][]§. It is a reference, so changes made inside the method affect the caller's table.

Counting passes: a traversal of an R by C table runs the inner body R times C times.
` },
      { type: 'quiz', id: 'q-2t1', question: 'Which loop header pair visits a table row by row, always staying in bounds?',
        choices: ['for (r = 0; r < m[0].length; ...) for (c = 0; c < m.length; ...)', 'for (r = 0; r < m.length; ...) for (c = 0; c < m[r].length; ...)', 'for (r = 0; r <= m.length; ...) for (c = 0; c <= m[0].length; ...)', 'for (r = 1; r < m.length; ...) for (c = 1; c < m[r].length; ...)'], answer: 1, explanation: 'Rows come from m.length and the columns of row r from m[r].length.' },
      { type: 'quiz', id: 'q-2t2', question: 'What type is the loop variable §row§ in §for (___ row : m)§ when §m§ is an §int[][]§?',
        choices: ['int', 'int[]', 'int[][]', 'Integer'], answer: 1, explanation: 'Each element of a 2D array is a row, which is a 1D array of ints.' },
      { type: 'quiz', id: 'q-2t3', question: 'How many times does the inner body run for a table with 4 rows and 6 columns traversed completely?',
        choices: ['10', '24', '6', '4'], answer: 1, explanation: '4 x 6 = 24.' },
      { type: 'quiz', id: 'q-2t4', question: 'Why must you check bounds before reading §m[r - 1][c]§?',
        choices: ['It is slower otherwise', 'On the top row r - 1 is -1 and would throw an exception', 'Java checks nothing', 'It would change the table'], answer: 1, explanation: 'Elements on the edge have no neighbor on one side. Reading beyond throws ArrayIndexOutOfBoundsException.' },
      { type: 'predict', id: 'p-2t1', question: 'What does this program print (row-major)?',
        code: w(j`int[][] m = {{1, 2, 3}, {4, 5, 6}};
for (int r = 0; r < m.length; r++) {
    for (int c = 0; c < m[r].length; c++) {
        System.out.print(m[r][c] + " ");
    }
}
System.out.println();`),
        answer: '1 2 3 4 5 6', explanation: 'Each row is printed left to right, one after the other.' },
      { type: 'predict', id: 'p-2t2', question: 'The loops are swapped (column-major). What does this program print?',
        code: w(j`int[][] m = {{1, 2, 3}, {4, 5, 6}};
for (int c = 0; c < m[0].length; c++) {
    for (int r = 0; r < m.length; r++) {
        System.out.print(m[r][c] + " ");
    }
}
System.out.println();`),
        answer: '1 4 2 5 3 6', explanation: 'Down column 0 (1, 4), then column 1 (2, 5), then column 2 (3, 6).' },
      { type: 'predict', id: 'p-2t3', question: 'What does this program print?',
        code: w(j`int[][] m = {{1, 2}, {3, 4}, {5, 6}};
for (int[] row : m) {
    int sum = 0;
    for (int v : row) {
        sum += v;
    }
    System.out.print(sum + " ");
}
System.out.println();`),
        answer: '3 7 11', explanation: 'Row sums: 1+2, 3+4, 5+6.' },
      { type: 'predict', id: 'p-2t4', question: 'What does this program print?',
        code: w(j`int[][] m = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
int d = 0;
for (int i = 0; i < m.length; i++) {
    d += m[i][i];
}
System.out.println(d);`),
        answer: '15', explanation: 'The diagonal is 1, 5 and 9.' },
      { type: 'code', id: '2t-total', prompt: 'Use nested **enhanced for loops** to total every element and print §Total: 45§.',
        expected: 'Total: 45',
        starter: w(j`int[][] m = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
int total = 0;
// TODO
System.out.println("Total: " + total);`),
        solution: w(j`int[][] m = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
int total = 0;
for (int[] row : m) {
    for (int v : row) {
        total += v;
    }
}
System.out.println("Total: " + total);`),
        hint: 'for (int[] row : m) { for (int v : row) { ... } }' },
      { type: 'code', id: '2t-cols', prompt: 'Print the **sum of each column** on one line. Expected: §12 15 18§.',
        expected: '12 15 18',
        starter: w(j`int[][] m = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
// TODO: for each column c, add up m[r][c] over all rows
System.out.println();`),
        solution: w(j`int[][] m = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
for (int c = 0; c < m[0].length; c++) {
    int sum = 0;
    for (int r = 0; r < m.length; r++) {
        sum += m[r][c];
    }
    System.out.print(sum + " ");
}
System.out.println();`),
        hint: 'Outer loop over columns, inner over rows, reset sum for each column.' },
      { type: 'code', id: '2t-find', prompt: 'Find the **largest** value and where it is. Print §Max 42 at row 1, col 2§.',
        expected: 'Max 42 at row 1, col 2',
        starter: w(j`int[][] m = {{5, 17, 8}, {23, 4, 42}, {9, 30, 11}};
int max = m[0][0];
int maxR = 0;
int maxC = 0;
// TODO
System.out.println("Max " + max + " at row " + maxR + ", col " + maxC);`),
        solution: w(j`int[][] m = {{5, 17, 8}, {23, 4, 42}, {9, 30, 11}};
int max = m[0][0];
int maxR = 0;
int maxC = 0;
for (int r = 0; r < m.length; r++) {
    for (int c = 0; c < m[r].length; c++) {
        if (m[r][c] > max) {
            max = m[r][c];
            maxR = r;
            maxC = c;
        }
    }
}
System.out.println("Max " + max + " at row " + maxR + ", col " + maxC);`),
        hint: 'Update max, maxR and maxC together when you find something bigger.' },
      { type: 'code', id: '2t-fill', prompt: 'Fill a new 4 by 4 table so that each element equals its row times its column, then print the last row. Expected: §0 3 6 9§.',
        expected: '0 3 6 9',
        starter: w(j`int[][] t = new int[4][4];
// TODO: fill with r * c
for (int c = 0; c < 4; c++) {
    System.out.print(t[3][c] + " ");
}
System.out.println();`),
        solution: w(j`int[][] t = new int[4][4];
for (int r = 0; r < t.length; r++) {
    for (int c = 0; c < t[r].length; c++) {
        t[r][c] = r * c;
    }
}
for (int c = 0; c < 4; c++) {
    System.out.print(t[3][c] + " ");
}
System.out.println();`),
        hint: 'Nested indexed loops, t[r][c] = r * c;' },
    ],
  },
];
