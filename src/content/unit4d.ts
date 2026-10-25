import type { Lesson } from './types';

// Original explanations and executable practice; no external classroom assets required.
export const unit4d: Lesson[] = [
  {
    "id": "4-18",
    "title": "Unit 4A - Arrays Summary",
    "blocks": [
      {
        "type": "text",
        "md": "Use the array contract as a checklist: one element type, fixed length, indexes from zero through length minus one, and reference assignment that creates aliases. A new primitive array has default values; an object array begins with null references. Array length is a field, while String length is a method.\n\nChoose a loop by its job. An enhanced for loop reads every value without an index. An indexed loop can replace elements, compare neighbors, or traverse backward. For each accumulator, state its invariant: before iteration i, sum is the total of elements at indexes less than i. A maximum starts with an actual element; a count starts with zero. Empty inputs need explicit contracts for averages, maxima, and search results.\n\nText data must be parsed and validated before it becomes numeric data. Explain how missing tokens and unexpected formats are handled. Ethical collection also requires considering whether a field is necessary and whether a report could expose a small group.\n\nFor debugging, trace length-one and empty arrays, no matches, duplicate values, and all-negative values. For transformations, distinguish modifying the caller's array from returning an independent array. A temporary variable is needed when a later assignment still needs the old value."
      },
      {
        "type": "quiz",
        "id": "4-18-review1",
        "question": "For int[] a = {8,3,5}, what is a.length and the last legal index?",
        "choices": [
          "3 and 3",
          "2 and 2",
          "3 and 2",
          "2 and 3"
        ],
        "answer": 2,
        "explanation": "Length counts elements; the last index is one less."
      },
      {
        "type": "quiz",
        "id": "4-18-review2",
        "question": "What is printed? int[] a = new int[3]; System.out.println(a[1]);",
        "choices": [
          "null",
          "0",
          "1",
          "A compile error"
        ],
        "answer": 1,
        "explanation": "Every element of a new int array starts at zero."
      },
      {
        "type": "quiz",
        "id": "4-18-review3",
        "question": "What does this loop compute? int count=0; for(int v:a) if(v<0) count++;",
        "choices": [
          "The sum of negatives",
          "The number of negatives",
          "The index of the minimum",
          "The length of a"
        ],
        "answer": 1,
        "explanation": "The counter increases once for each matching element."
      },
      {
        "type": "code",
        "id": "4-18-copy",
        "prompt": "Return an independent copy in reverse order. Verify that changing the result leaves the source unchanged.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int[] reversed(int[] a) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nint[] a={3,8,2};int[] b=reversed(a);b[0]=99;\nSystem.out.println(Arrays.toString(a));\nSystem.out.println(Arrays.toString(reversed(new int[]{})));\nSystem.out.println(Arrays.toString(reversed(a)));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int[] reversed(int[] a) {\nint[] b=new int[a.length];for(int i=0;i<a.length;i++)b[a.length-1-i]=a[i];return b;\n}\npublic static void main(String[] args) {\nint[] a={3,8,2};int[] b=reversed(a);b[0]=99;\nSystem.out.println(Arrays.toString(a));\nSystem.out.println(Arrays.toString(reversed(new int[]{})));\nSystem.out.println(Arrays.toString(reversed(a)));\n}\n}\n",
        "expected": "[3, 8, 2]\n[]\n[2, 8, 3]"
      }
    ]
  },
  {
    "id": "4-19",
    "title": "Unit 4A - Toggle Code Practice 4a Arrays (4.1-4.6)",
    "blocks": [
      {
        "type": "text",
        "md": "The fragments in each prompt are deliberately out of order. Reconstruct a valid algorithm in the editor, then explain why initialization precedes traversal and why the final return belongs after the loop. Test the empty-input contract as well as a normal case."
      },
      {
        "type": "code",
        "id": "4-19-sum-order",
        "prompt": "Reorder the algorithm into initialization, traversal, update, and return. Candidate lines: return sum; / sum += a[i]; / int sum=0; / for(int i=0;i<a.length;i++). Implement a working method.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int sum(int[] a) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(sum(new int[]{2,5,-1}));System.out.println(sum(new int[]{}));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int sum(int[] a) {\nint sum=0;for(int i=0;i<a.length;i++)sum+=a[i];return sum;\n}\npublic static void main(String[] args) {\nSystem.out.println(sum(new int[]{2,5,-1}));System.out.println(sum(new int[]{}));\n}\n}\n",
        "expected": "6\n0"
      },
      {
        "type": "code",
        "id": "4-19-search-order",
        "prompt": "Arrange these ideas to find the first match: return -1 after loop; test a[i]==target; return i; traverse from index zero.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int first(int[] a,int target) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(first(new int[]{7,2,7},7));System.out.println(first(new int[]{},7));System.out.println(first(new int[]{2},7));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int first(int[] a,int target) {\nfor(int i=0;i<a.length;i++)if(a[i]==target)return i;return -1;\n}\npublic static void main(String[] args) {\nSystem.out.println(first(new int[]{7,2,7},7));System.out.println(first(new int[]{},7));System.out.println(first(new int[]{2},7));\n}\n}\n",
        "expected": "0\n-1\n-1"
      },
      {
        "type": "code",
        "id": "4-19-swap-order",
        "prompt": "Arrange the three assignments needed to swap the endpoints. Return without mutation for arrays shorter than two elements.",
        "starter": "import java.util.*;\npublic class Main {\nstatic void swapEnds(int[] a) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nint[] a={1,2,3};swapEnds(a);System.out.println(Arrays.toString(a));int[] b={4};swapEnds(b);System.out.println(Arrays.toString(b));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic void swapEnds(int[] a) {\nif(a.length<2)return;int temp=a[0];a[0]=a[a.length-1];a[a.length-1]=temp;\n}\npublic static void main(String[] args) {\nint[] a={1,2,3};swapEnds(a);System.out.println(Arrays.toString(a));int[] b={4};swapEnds(b);System.out.println(Arrays.toString(b));\n}\n}\n",
        "expected": "[3, 2, 1]\n[4]"
      }
    ]
  },
  {
    "id": "4-20",
    "title": "Unit 4A - Arrays Code Practice",
    "blocks": [
      {
        "type": "text",
        "md": "Implement three reusable array methods. Keep traversal bounds explicit and avoid sorting when a single scan answers the question. Write down what each local variable means before entering the loop."
      },
      {
        "type": "code",
        "id": "4-20-cp-pos",
        "prompt": "**Count positives.** Print how many elements are greater than 0. Expected: §Positives: 4§.",
        "expected": "Positives: 4",
        "starter": "public class Main {\n    public static void main(String[] args) {\n        int[] a = {5, -2, 0, 8, -9, 3, 1};\n        int count = 0;\n        // TODO\n        System.out.println(\"Positives: \" + count);\n    }\n}\n",
        "solution": "public class Main {\n    public static void main(String[] args) {\n        int[] a = {5, -2, 0, 8, -9, 3, 1};\n        int count = 0;\n        for (int v : a) {\n            if (v > 0) {\n                count++;\n            }\n        }\n        System.out.println(\"Positives: \" + count);\n    }\n}\n",
        "hint": "Zero is not positive."
      },
      {
        "type": "code",
        "id": "4-20-cp-second",
        "prompt": "**Second largest distinct value.** With {5, 9, 2, 9, 7} the answer is 7, not 9. One pass, no sorting. Expected: §Second: 7§.",
        "expected": "Second: 7",
        "starter": "public class Main {\n    public static void main(String[] args) {\n        int[] a = {5, 9, 2, 9, 7};\n        int max = Integer.MIN_VALUE;\n        int second = Integer.MIN_VALUE;\n        // TODO: update max and second for each value\n        System.out.println(\"Second: \" + second);\n    }\n}\n",
        "solution": "public class Main {\n    public static void main(String[] args) {\n        int[] a = {5, 9, 2, 9, 7};\n        int max = Integer.MIN_VALUE;\n        int second = Integer.MIN_VALUE;\n        for (int v : a) {\n            if (v > max) {\n                second = max;\n                max = v;\n            } else if (v > second && v < max) {\n                second = v;\n            }\n        }\n        System.out.println(\"Second: \" + second);\n    }\n}\n",
        "hint": "A new maximum pushes the old maximum down to second. Otherwise a value strictly between second and max becomes second."
      },
      {
        "type": "code",
        "id": "4-20-cp-sorted",
        "prompt": "**isSorted.** Return true if the array is in non-decreasing order. Expected: §true false§.",
        "expected": "true false",
        "starter": "public class Main {\n    static boolean isSorted(int[] a) {\n        // TODO\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isSorted(new int[] {1, 2, 2, 5}) + \" \" + isSorted(new int[] {3, 4, 1}));\n    }\n}\n",
        "solution": "public class Main {\n    static boolean isSorted(int[] a) {\n        for (int i = 0; i < a.length - 1; i++) {\n            if (a[i] > a[i + 1]) {\n                return false;\n            }\n        }\n        return true;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isSorted(new int[] {1, 2, 2, 5}) + \" \" + isSorted(new int[] {3, 4, 1}));\n    }\n}\n",
        "hint": "Compare neighbors; stop at length - 2. Return false at the first out-of-order pair."
      },
      {
        "type": "code",
        "id": "4-20-cp-palin",
        "prompt": "**Palindrome array.** True if it reads the same forward and backward (compare from both ends). Expected: §true false§.",
        "expected": "true false",
        "starter": "public class Main {\n    static boolean isPalindrome(int[] a) {\n        // TODO\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isPalindrome(new int[] {1, 2, 3, 2, 1}) + \" \" + isPalindrome(new int[] {1, 2, 3, 4}));\n    }\n}\n",
        "solution": "public class Main {\n    static boolean isPalindrome(int[] a) {\n        for (int i = 0; i < a.length / 2; i++) {\n            if (a[i] != a[a.length - 1 - i]) {\n                return false;\n            }\n        }\n        return true;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isPalindrome(new int[] {1, 2, 3, 2, 1}) + \" \" + isPalindrome(new int[] {1, 2, 3, 4}));\n    }\n}\n",
        "hint": "Compare a[i] with a[a.length - 1 - i] for the first half only."
      }
    ]
  },
  {
    "id": "4-21",
    "title": "Unit 4A - More Code Practice with Arrays",
    "blocks": [
      {
        "type": "text",
        "md": "These transformations require careful decisions about mutation and preservation. Trace overwritten values before coding. The merge exercise returns a new array, while rotation intentionally modifies its input."
      },
      {
        "type": "code",
        "id": "4-21-shift",
        "prompt": "Rotate right by one in place. Empty input stays empty; preserve the last value before moving elements backward.",
        "starter": "import java.util.*;\npublic class Main {\nstatic void rotate(int[] a) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nint[] a={1,2,3,4};rotate(a);System.out.println(Arrays.toString(a));int[] e={};rotate(e);System.out.println(Arrays.toString(e));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic void rotate(int[] a) {\nif(a.length==0)return;int last=a[a.length-1];for(int i=a.length-1;i>0;i--)a[i]=a[i-1];a[0]=last;\n}\npublic static void main(String[] args) {\nint[] a={1,2,3,4};rotate(a);System.out.println(Arrays.toString(a));int[] e={};rotate(e);System.out.println(Arrays.toString(e));\n}\n}\n",
        "expected": "[4, 1, 2, 3]\n[]"
      },
      {
        "type": "code",
        "id": "4-21-runs",
        "prompt": "Return the length of the longest consecutive increasing run. Equal neighbors end a run; empty input returns zero.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int longest(int[] a) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(longest(new int[]{1,3,3,4,8,2}));System.out.println(longest(new int[]{}));System.out.println(longest(new int[]{5}));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int longest(int[] a) {\nif(a.length==0)return 0;int best=1,run=1;for(int i=1;i<a.length;i++){if(a[i]>a[i-1])run++;else run=1;if(run>best)best=run;}return best;\n}\npublic static void main(String[] args) {\nSystem.out.println(longest(new int[]{1,3,3,4,8,2}));System.out.println(longest(new int[]{}));System.out.println(longest(new int[]{5}));\n}\n}\n",
        "expected": "3\n0\n1"
      },
      {
        "type": "code",
        "id": "4-21-merge",
        "prompt": "Merge two nondecreasing arrays into a new nondecreasing array without changing either input. Preserve duplicates.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int[] merge(int[] a,int[] b) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(Arrays.toString(merge(new int[]{1,4,4},new int[]{2,4,7})));System.out.println(Arrays.toString(merge(new int[]{},new int[]{3})));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int[] merge(int[] a,int[] b) {\nint[] out=new int[a.length+b.length];int i=0,j=0,k=0;while(i<a.length&&j<b.length){if(a[i]<=b[j])out[k++]=a[i++];else out[k++]=b[j++];}while(i<a.length)out[k++]=a[i++];while(j<b.length)out[k++]=b[j++];return out;\n}\npublic static void main(String[] args) {\nSystem.out.println(Arrays.toString(merge(new int[]{1,4,4},new int[]{2,4,7})));System.out.println(Arrays.toString(merge(new int[]{},new int[]{3})));\n}\n}\n",
        "expected": "[1, 2, 4, 4, 4, 7]\n[3]"
      }
    ]
  },
  {
    "id": "4-22",
    "title": "Unit 4A - Arrays Multiple-Choice Exercises",
    "blocks": [
      {
        "type": "text",
        "md": "Choose the best answer. Trace indexes and values separately; identify whether each statement reads an element, changes an element, or changes only a local variable."
      },
      {
        "type": "quiz",
        "id": "4-22-mc1",
        "question": "For int[] a = {8,3,5}, what is a.length and the last legal index?",
        "choices": [
          "3 and 3",
          "2 and 2",
          "3 and 2",
          "2 and 3"
        ],
        "answer": 2,
        "explanation": "Length counts elements; the last index is one less."
      },
      {
        "type": "quiz",
        "id": "4-22-mc2",
        "question": "What is printed? int[] a = new int[3]; System.out.println(a[1]);",
        "choices": [
          "null",
          "0",
          "1",
          "A compile error"
        ],
        "answer": 1,
        "explanation": "Every element of a new int array starts at zero."
      },
      {
        "type": "quiz",
        "id": "4-22-mc3",
        "question": "What does this loop compute? int count=0; for(int v:a) if(v<0) count++;",
        "choices": [
          "The sum of negatives",
          "The number of negatives",
          "The index of the minimum",
          "The length of a"
        ],
        "answer": 1,
        "explanation": "The counter increases once for each matching element."
      },
      {
        "type": "quiz",
        "id": "4-22-mc4",
        "question": "Which condition correctly traverses all valid indexes from i=0?",
        "choices": [
          "i <= a.length",
          "i < a.length",
          "i < a.length-1",
          "i > a.length"
        ],
        "answer": 1,
        "explanation": "The upper bound must exclude length itself."
      },
      {
        "type": "quiz",
        "id": "4-22-mc5",
        "question": "After int[] a={2,4}; int[] b=a; b[0]=9;, what is a[0]?",
        "choices": [
          "2",
          "4",
          "9",
          "null"
        ],
        "answer": 2,
        "explanation": "Both variables reference the same array."
      },
      {
        "type": "quiz",
        "id": "4-22-mc6",
        "question": "Which loop doubles every element of an int array a?",
        "choices": [
          "for(int v:a) v*=2;",
          "for(int i=0;i<a.length;i++) a[i]*=2;",
          "for(int i=1;i<a.length;i++) a[i]*=2;",
          "for(int v:a) a=v;"
        ],
        "answer": 1,
        "explanation": "Indexed assignment writes back to the actual elements."
      },
      {
        "type": "quiz",
        "id": "4-22-mc7",
        "question": "Why initialize a maximum to a[0] rather than 0 for a nonempty array?",
        "choices": [
          "It avoids a loop",
          "It supports arrays containing only negative values",
          "It sorts the array",
          "It makes null valid"
        ],
        "answer": 1,
        "explanation": "The initial candidate must come from the data."
      },
      {
        "type": "quiz",
        "id": "4-22-mc8",
        "question": "A sorted nonempty array may contain duplicates. Which condition detects a decrease between neighbors?",
        "choices": [
          "a[i] == a[i+1]",
          "a[i] > a[i+1]",
          "a[i] < a[i+1]",
          "a[i] != a[i+1]"
        ],
        "answer": 1,
        "explanation": "Nondecreasing order allows equality."
      },
      {
        "type": "quiz",
        "id": "4-22-mc9",
        "question": "A method creates a new int[a.length] and copies each value. Which statement is true?",
        "choices": [
          "The arrays are necessarily aliases",
          "Changing the copy does not change the original primitive elements",
          "Both lengths can later change",
          "Copying sorts the values"
        ],
        "answer": 1,
        "explanation": "A separately allocated primitive array has independent elements."
      },
      {
        "type": "quiz",
        "id": "4-22-mc10",
        "question": "Which expression computes a decimal mean when sum and count are ints and count > 0?",
        "choices": [
          "sum/count",
          "(double)(sum/count)",
          "(double)sum/count",
          "sum%count"
        ],
        "answer": 2,
        "explanation": "Convert before division to prevent integer truncation."
      }
    ]
  },
  {
    "id": "4-23",
    "title": "Unit 4A - Practice Exam for Arrays",
    "blocks": [
      {
        "type": "text",
        "md": "Suggested time: 35 minutes for 16 multiple-choice questions and two output traces. Work without running the code on the first pass. Review each explanation and classify errors as bounds, aliasing, arithmetic, or contract errors."
      },
      {
        "type": "quiz",
        "id": "4-23-exam1",
        "question": "Given int[] a={6,1,4,2}; int n=0; for(int i=0;i<a.length;i++) if(a[i]>i)n++; what is n?",
        "choices": [
          "1",
          "2",
          "3",
          "4"
        ],
        "answer": 1,
        "explanation": "Only index0 (6>0) and index2 (4>2) qualify."
      },
      {
        "type": "quiz",
        "id": "4-23-exam2",
        "question": "What is the final array? int[] a={1,2,3,4}; for(int i=0;i<a.length-1;i++) a[i+1]=a[i];",
        "choices": [
          "{1,1,1,1}",
          "{1,1,2,3}",
          "{2,3,4,4}",
          "{4,3,2,1}"
        ],
        "answer": 0,
        "explanation": "Each next assignment reads the value already overwritten by the previous iteration."
      },
      {
        "type": "quiz",
        "id": "4-23-exam3",
        "question": "A method receives int[] a, executes a=new int[]{9,9}, and returns void. The caller supplied {1,2}. What does the caller still see?",
        "choices": [
          "{9,9}",
          "{1,2}",
          "null",
          "A compile error"
        ],
        "answer": 1,
        "explanation": "Reassigning the local parameter does not reassign the caller variable."
      },
      {
        "type": "quiz",
        "id": "4-23-exam4",
        "question": "A method scans indexes from length-1 down to0 and returns immediately on a match. Which occurrence does it return?",
        "choices": [
          "First occurrence",
          "Last occurrence",
          "Middle occurrence",
          "Every occurrence"
        ],
        "answer": 1,
        "explanation": "Reverse traversal encounters the highest matching index first."
      },
      {
        "type": "quiz",
        "id": "4-23-exam5",
        "question": "For int[] a={4,7,9,10,12}, what is computed by a[a.length/2-1]?",
        "choices": [
          "4",
          "7",
          "9",
          "10"
        ],
        "answer": 1,
        "explanation": "Integer division gives2; subtracting1 selects index1."
      },
      {
        "type": "quiz",
        "id": "4-23-exam6",
        "question": "A new String[4] contains no assigned references. Which expression can throw NullPointerException?",
        "choices": [
          "a.length",
          "a[0]==null",
          "a[0].length()",
          "a[3]= \"x\""
        ],
        "answer": 2,
        "explanation": "Invoking a method through the default null reference fails."
      },
      {
        "type": "quiz",
        "id": "4-23-exam7",
        "question": "Which change makes a product accumulator work for {2,3,4}? int product=0; for(int v:a) product*=v;",
        "choices": [
          "Initialize product to1",
          "Use product--",
          "Start at index1",
          "Cast product to double afterward"
        ],
        "answer": 0,
        "explanation": "One is the multiplicative identity; zero would keep every product zero."
      },
      {
        "type": "quiz",
        "id": "4-23-exam8",
        "question": "A count-range method must accept low<=high. Which data exposes use of strict rather than inclusive endpoint comparisons for [2,5]?",
        "choices": [
          "{3,4}",
          "{2,5}",
          "{0,9}",
          "{}"
        ],
        "answer": 1,
        "explanation": "Only values equal to the boundaries distinguish inclusive from strict comparisons."
      },
      {
        "type": "quiz",
        "id": "4-23-exam9",
        "question": "What is printed? int[] a={1,2}; int[] b=a.clone(); b[1]=7; System.out.println(a[1]+b[1]);",
        "choices": [
          "4",
          "7",
          "9",
          "14"
        ],
        "answer": 2,
        "explanation": "The clone has independent primitive elements;2+7=9."
      },
      {
        "type": "quiz",
        "id": "4-23-exam10",
        "question": "A loop checks adjacent pairs a[i] and a[i+1]. Which input tests that the final pair is actually checked?",
        "choices": [
          "{1,2,3}",
          "{3,2,1}",
          "{1,2,0}",
          "{}"
        ],
        "answer": 2,
        "explanation": "The only decrease is in the final pair, so omitting it changes the result."
      },
      {
        "type": "quiz",
        "id": "4-23-exam11",
        "question": "Given int[] a={2,4,6,8}; int s=0; for(int i=1;i<a.length;i+=2)s+=a[i];, what is s?",
        "choices": [
          "6",
          "10",
          "12",
          "20"
        ],
        "answer": 2,
        "explanation": "Indexes 1 and 3 contribute 4 and 8."
      },
      {
        "type": "quiz",
        "id": "4-23-exam12",
        "question": "A method returns the first index whose value exceeds 10, or -1. On {4,11,20}, what must it return?",
        "choices": [
          "0",
          "1",
          "2",
          "-1"
        ],
        "answer": 1,
        "explanation": "The first qualifying position is index 1."
      },
      {
        "type": "quiz",
        "id": "4-23-exam13",
        "question": "What is printed? int[] a={1,2,3}; for(int v:a)v=0; System.out.println(a[2]);",
        "choices": [
          "0",
          "1",
          "2",
          "3"
        ],
        "answer": 3,
        "explanation": "Assigning to the primitive loop variable does not assign to the array."
      },
      {
        "type": "quiz",
        "id": "4-23-exam14",
        "question": "A loop shifts elements left with a[i]=a[i+1]. What is the largest legal i?",
        "choices": [
          "a.length",
          "a.length-1",
          "a.length-2",
          "1"
        ],
        "answer": 2,
        "explanation": "The source i+1 must stay below length."
      },
      {
        "type": "quiz",
        "id": "4-23-exam15",
        "question": "To count values in the inclusive range 50 through 80, which test is correct?",
        "choices": [
          "v>=50 || v<=80",
          "v>50 && v<80",
          "v>=50 && v<=80",
          "v==50 && v==80"
        ],
        "answer": 2,
        "explanation": "Both bounds are inclusive and both must hold."
      },
      {
        "type": "quiz",
        "id": "4-23-exam16",
        "question": "Which scanner pattern prevents reading an integer when the next token is not an integer?",
        "choices": [
          "while(scanner.hasNextInt()) { int x=scanner.nextInt(); }",
          "while(true) scanner.nextInt();",
          "scanner.nextLine() + 1",
          "new int[scanner]"
        ],
        "answer": 0,
        "explanation": "hasNextInt checks whether the next token can be parsed before consuming it."
      },
      {
        "type": "predict",
        "id": "4-23-trace1",
        "question": "Trace the program and enter its exact console output.",
        "code": "import java.util.*;\npublic class Main {\n\npublic static void main(String[] args) {\nint[] a={2,4,6};for(int i=1;i<a.length;i++)a[i]+=a[i-1];System.out.println(Arrays.toString(a));\n}\n}\n",
        "answer": "[2, 6, 12]",
        "explanation": "Updates are cumulative because later iterations read values changed earlier."
      },
      {
        "type": "predict",
        "id": "4-23-trace2",
        "question": "Trace the program and enter its exact console output.",
        "code": "import java.util.*;\npublic class Main {\n\npublic static void main(String[] args) {\nint[] a={3,1,3,2};int count=0;for(int i=0;i<a.length-1;i++)if(a[i]>a[i+1])count++;System.out.println(count);\n}\n}\n",
        "answer": "2",
        "explanation": "Pairs (3,1) and (3,2) are decreases."
      }
    ]
  },
  {
    "id": "4-24",
    "title": "Unit 4A - Free Response - Horse Barn A",
    "blocks": [
      {
        "type": "text",
        "md": "A barn stores one Horse reference per stall in a fixed array; null represents an empty stall. Horse names are non-null and unique. Part (a): implement findHorse(name), returning the index of the horse with that name or -1. Compare name contents and skip empty stalls. Part (b): implement occupied(), counting occupied stalls without changing the array. A zero-stall barn is valid.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-24-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic class Horse { private String name; Horse(String n){name=n;} public String toString(){return name;} }\nstatic class HorseBarn { private Horse[] spaces; HorseBarn(Horse[] s){spaces=s;}\nint findHorse(String name){throw new UnsupportedOperationException();}\nint occupied(){throw new UnsupportedOperationException();}\n}\npublic static void main(String[] args) {\nHorseBarn b=new HorseBarn(new Horse[]{null,new Horse(\"Aster\"),null,new Horse(\"Birch\")});System.out.println(b.findHorse(\"Birch\"));System.out.println(b.findHorse(\"Missing\"));System.out.println(b.occupied());System.out.println(new HorseBarn(new Horse[]{}).occupied());\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic class Horse { private String name; Horse(String n){name=n;} public String toString(){return name;} }\nstatic class HorseBarn { private Horse[] spaces; HorseBarn(Horse[] s){spaces=s;}\nint findHorse(String name){for(int i=0;i<spaces.length;i++)if(spaces[i]!=null&&spaces[i].name.equals(name))return i;return -1;}\nint occupied(){int n=0;for(Horse h:spaces)if(h!=null)n++;return n;}\n}\npublic static void main(String[] args) {\nHorseBarn b=new HorseBarn(new Horse[]{null,new Horse(\"Aster\"),null,new Horse(\"Birch\")});System.out.println(b.findHorse(\"Birch\"));System.out.println(b.findHorse(\"Missing\"));System.out.println(b.occupied());System.out.println(new HorseBarn(new Horse[]{}).occupied());\n}\n}\n",
        "expected": "3\n-1\n2\n0"
      }
    ]
  },
  {
    "id": "4-25",
    "title": "Unit 4A - Free Response - Horse Barn B",
    "blocks": [
      {
        "type": "text",
        "md": "A HorseBarn uses null for an empty stall. Part (a): consolidate the occupied stalls toward index zero while preserving horse order and retaining the same array length. Every position after the last horse must be null. Part (b): provide a snapshot string using Arrays.toString so the checks can inspect the final arrangement. Do not allocate another Horse array; use a write index and then clear the remaining positions.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-25-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic class Horse { private String name; Horse(String n){name=n;} public String toString(){return name;} }\nstatic class HorseBarn { private Horse[] spaces; HorseBarn(Horse[] s){spaces=s;}\nvoid consolidate(){throw new UnsupportedOperationException();}\nString snapshot(){return Arrays.toString(spaces);}\n}\npublic static void main(String[] args) {\nHorseBarn b=new HorseBarn(new Horse[]{null,new Horse(\"Ash\"),null,new Horse(\"Elm\"),null});b.consolidate();System.out.println(b.snapshot());b.consolidate();System.out.println(b.snapshot());HorseBarn e=new HorseBarn(new Horse[]{null,null});e.consolidate();System.out.println(e.snapshot());\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic class Horse { private String name; Horse(String n){name=n;} public String toString(){return name;} }\nstatic class HorseBarn { private Horse[] spaces; HorseBarn(Horse[] s){spaces=s;}\nvoid consolidate(){int next=0;for(int i=0;i<spaces.length;i++)if(spaces[i]!=null)spaces[next++]=spaces[i];while(next<spaces.length)spaces[next++]=null;}\nString snapshot(){return Arrays.toString(spaces);}\n}\npublic static void main(String[] args) {\nHorseBarn b=new HorseBarn(new Horse[]{null,new Horse(\"Ash\"),null,new Horse(\"Elm\"),null});b.consolidate();System.out.println(b.snapshot());b.consolidate();System.out.println(b.snapshot());HorseBarn e=new HorseBarn(new Horse[]{null,null});e.consolidate();System.out.println(e.snapshot());\n}\n}\n",
        "expected": "[Ash, Elm, null, null, null]\n[Ash, Elm, null, null, null]\n[null, null]"
      }
    ]
  },
  {
    "id": "4-26",
    "title": "Unit 4A - Free Response - Self Divisor B",
    "blocks": [
      {
        "type": "text",
        "md": "A positive integer is a self divisor if none of its decimal digits is zero and every digit divides the original integer evenly. Part (a): implement isSelfDivisor(n) for positive n. Part (b): firstSelfDivisors(start,count) returns an array containing the first count self divisors greater than or equal to positive start, in increasing order. count may be zero. Use the helper and do not count rejected candidates. Assume the requested results fit in int.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-26-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic boolean isSelfDivisor(int n){throw new UnsupportedOperationException();}\nstatic int[] firstSelfDivisors(int start,int count){throw new UnsupportedOperationException();}\npublic static void main(String[] args) {\nSystem.out.println(isSelfDivisor(128)+\" \"+isSelfDivisor(102));System.out.println(Arrays.toString(firstSelfDivisors(20,4)));System.out.println(Arrays.toString(firstSelfDivisors(7,0)));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic boolean isSelfDivisor(int n){int v=n;while(v>0){int d=v%10;if(d==0||n%d!=0)return false;v/=10;}return true;}\nstatic int[] firstSelfDivisors(int start,int count){int[] a=new int[count];int k=0;while(k<count){if(isSelfDivisor(start))a[k++]=start;start++;}return a;}\npublic static void main(String[] args) {\nSystem.out.println(isSelfDivisor(128)+\" \"+isSelfDivisor(102));System.out.println(Arrays.toString(firstSelfDivisors(20,4)));System.out.println(Arrays.toString(firstSelfDivisors(7,0)));\n}\n}\n",
        "expected": "true false\n[22, 24, 33, 36]\n[]"
      }
    ]
  },
  {
    "id": "4-27",
    "title": "Unit 4A - Free Response - Sound A",
    "blocks": [
      {
        "type": "text",
        "md": "A Sound stores signed integer samples. Part (a): limitAmplitude(limit) clamps each sample to the inclusive interval [-limit,limit] and returns how many samples changed. limit is nonnegative. Part (b): explain why a sample already equal to either endpoint is not counted as a change. Implement the method in place without replacing the array.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-27-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic class Sound {private int[] samples;Sound(int[] s){samples=s;}int limitAmplitude(int limit){throw new UnsupportedOperationException();} String snapshot(){return Arrays.toString(samples);}}\npublic static void main(String[] args) {\nSound s=new Sound(new int[]{-9,-5,0,5,8});System.out.println(s.limitAmplitude(5));System.out.println(s.snapshot());System.out.println(s.limitAmplitude(5));Sound e=new Sound(new int[]{});System.out.println(e.limitAmplitude(0));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic class Sound {private int[] samples;Sound(int[] s){samples=s;}int limitAmplitude(int limit){int changed=0;for(int i=0;i<samples.length;i++){if(samples[i]>limit){samples[i]=limit;changed++;}else if(samples[i]<-limit){samples[i]=-limit;changed++;}}return changed;} String snapshot(){return Arrays.toString(samples);}}\npublic static void main(String[] args) {\nSound s=new Sound(new int[]{-9,-5,0,5,8});System.out.println(s.limitAmplitude(5));System.out.println(s.snapshot());System.out.println(s.limitAmplitude(5));Sound e=new Sound(new int[]{});System.out.println(e.limitAmplitude(0));\n}\n}\n",
        "expected": "2\n[-5, -5, 0, 5, 5]\n0\n0"
      }
    ]
  },
  {
    "id": "4-28",
    "title": "Unit 4A - Free Response - Sound B",
    "blocks": [
      {
        "type": "text",
        "md": "A Sound may begin with zero-valued samples representing leading silence. Part (a): trimSilenceFromBeginning removes only the longest zero prefix by replacing the samples field with an appropriately sized array. Part (b): retain zero values after the first nonzero sample. An all-zero or empty recording becomes an empty array. Preserve the order of all retained samples and return the number removed.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-28-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic class Sound {private int[] samples;Sound(int[] s){samples=s;}int trimSilenceFromBeginning(){throw new UnsupportedOperationException();} String snapshot(){return Arrays.toString(samples);}}\npublic static void main(String[] args) {\nSound s=new Sound(new int[]{0,0,4,0,-2});System.out.println(s.trimSilenceFromBeginning());System.out.println(s.snapshot());Sound z=new Sound(new int[]{0,0});System.out.println(z.trimSilenceFromBeginning());System.out.println(z.snapshot());Sound e=new Sound(new int[]{});System.out.println(e.trimSilenceFromBeginning());\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic class Sound {private int[] samples;Sound(int[] s){samples=s;}int trimSilenceFromBeginning(){int first=0;while(first<samples.length&&samples[first]==0)first++;int[] kept=new int[samples.length-first];for(int i=0;i<kept.length;i++)kept[i]=samples[first+i];samples=kept;return first;} String snapshot(){return Arrays.toString(samples);}}\npublic static void main(String[] args) {\nSound s=new Sound(new int[]{0,0,4,0,-2});System.out.println(s.trimSilenceFromBeginning());System.out.println(s.snapshot());Sound z=new Sound(new int[]{0,0});System.out.println(z.trimSilenceFromBeginning());System.out.println(z.snapshot());Sound e=new Sound(new int[]{});System.out.println(e.trimSilenceFromBeginning());\n}\n}\n",
        "expected": "2\n[4, 0, -2]\n2\n[]\n0"
      }
    ]
  },
  {
    "id": "4-29",
    "title": "Unit 4A - Free Response - Number Cube A",
    "blocks": [
      {
        "type": "text",
        "md": "A NumberCube reports integer faces from 1 through 6. To make testing reproducible, this exercise uses a scripted cube that cycles through a supplied nonempty face array. Part (a): complete getCubeTosses(cube,numTosses), returning exactly numTosses rolls in order. Part (b): countFace(tosses,face) counts a specified face without modifying the tosses. numTosses may be zero. The roll implementation is supplied; do not replace it with fixed output.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-29-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic class NumberCube {int[] script;int next;NumberCube(int[] s){script=s;}int roll(){return script[next++%script.length];}}\nstatic int[] getCubeTosses(NumberCube cube,int n){throw new UnsupportedOperationException();}\nstatic int countFace(int[] a,int face){throw new UnsupportedOperationException();}\npublic static void main(String[] args) {\nNumberCube cube=new NumberCube(new int[]{2,6,2});int[] a=getCubeTosses(cube,5);System.out.println(Arrays.toString(a));System.out.println(countFace(a,2));System.out.println(Arrays.toString(getCubeTosses(cube,0)));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic class NumberCube {int[] script;int next;NumberCube(int[] s){script=s;}int roll(){return script[next++%script.length];}}\nstatic int[] getCubeTosses(NumberCube cube,int n){int[] a=new int[n];for(int i=0;i<n;i++)a[i]=cube.roll();return a;}\nstatic int countFace(int[] a,int face){int count=0;for(int v:a)if(v==face)count++;return count;}\npublic static void main(String[] args) {\nNumberCube cube=new NumberCube(new int[]{2,6,2});int[] a=getCubeTosses(cube,5);System.out.println(Arrays.toString(a));System.out.println(countFace(a,2));System.out.println(Arrays.toString(getCubeTosses(cube,0)));\n}\n}\n",
        "expected": "[2, 6, 2, 2, 6]\n3\n[]"
      }
    ]
  },
  {
    "id": "4-30",
    "title": "Unit 4A - Free Response - Number Cube B",
    "blocks": [
      {
        "type": "text",
        "md": "A run is a maximal consecutive sequence of equal cube values. Part (a): longestRun(tosses) returns the starting index of the longest run of length at least two, or -1 if no such run exists. Break ties in favor of the earliest run. Part (b): runLength(tosses,start) returns the length of the equal-valued run beginning at a valid index start. Ensure a run ending at the last element is considered; empty input is allowed for longestRun.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-30-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int longestRun(int[] a){throw new UnsupportedOperationException();}\nstatic int runLength(int[] a,int start){throw new UnsupportedOperationException();}\npublic static void main(String[] args) {\nSystem.out.println(longestRun(new int[]{1,2,2,3,3}));System.out.println(longestRun(new int[]{1,2,3,3,3}));System.out.println(longestRun(new int[]{6}));System.out.println(longestRun(new int[]{}));System.out.println(runLength(new int[]{2,2,2},0));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int runLength(int[] a,int start){int end=start+1;while(end<a.length&&a[end]==a[start])end++;return end-start;}\nstatic int longestRun(int[] a){int best=-1,length=1;for(int i=0;i<a.length;){int n=runLength(a,i);if(n>length){length=n;best=i;}i+=n;}return best;}\npublic static void main(String[] args) {\nSystem.out.println(longestRun(new int[]{1,2,2,3,3}));System.out.println(longestRun(new int[]{1,2,3,3,3}));System.out.println(longestRun(new int[]{6}));System.out.println(longestRun(new int[]{}));System.out.println(runLength(new int[]{2,2,2},0));\n}\n}\n",
        "expected": "1\n2\n-1\n-1\n3"
      }
    ]
  }
];
