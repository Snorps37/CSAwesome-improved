import type { Lesson } from './types';

// Original explanations and executable practice; no external classroom assets required.
export const unit4c: Lesson[] = [
  {
    "id": "4-0",
    "title": "Introduction",
    "blocks": [
      {
        "type": "text",
        "md": "Data collections let a program reason about many related values with one algorithm. This unit connects representation, traversal, and correctness: first decide what each element represents, then decide how an index reaches it, and finally prove that every required element is processed exactly once.\n\nAn array has a fixed length and may contain primitives or object references. An ArrayList contains object references and changes size. A two-dimensional array organizes rows, each of which is itself an array. Searching asks where a value occurs; sorting establishes an order that can support faster searching. Recursion describes a solution using smaller instances of the same problem.\n\nFor every exercise, identify the input contract (including whether an empty collection is allowed), the result, and any permitted mutation. Trace a small example, implement the loop, and test a boundary example. A successful sample alone does not establish correctness. In particular, test first and last positions, repeated values, negative values, and collections with no matching element.\n\nThe first seventeen sections introduce techniques. Later sections revisit them through focused reviews, free-response work, console-based picture labs, and projects. Reference solutions are for comparison after an independent attempt; explain the loop invariant before treating a solution as understood."
      },
      {
        "type": "quiz",
        "id": "4-0-representation",
        "question": "A sensor records exactly 24 readings per day. Which representation naturally supports indexed readings?",
        "choices": [
          "24 unrelated variable names",
          "An int[] of length 24",
          "One boolean",
          "A method with no data"
        ],
        "answer": 1,
        "explanation": "A fixed collection supports indexed access and traversal."
      },
      {
        "type": "quiz",
        "id": "4-0-contract",
        "question": "A maximum method reads a[0]. Which precondition is necessary?",
        "choices": [
          "The array is sorted",
          "Every value is positive",
          "The array is nonempty",
          "The length is even"
        ],
        "answer": 2,
        "explanation": "An empty array has no element at index zero."
      },
      {
        "type": "quiz",
        "id": "4-0-testing",
        "question": "Which test best exposes an incorrect maximum initialized to zero?",
        "choices": [
          "{1, 2, 3}",
          "{-9, -4, -7}",
          "{0, 1}",
          "{9}"
        ],
        "answer": 1,
        "explanation": "All-negative input reveals that zero may not belong to the data."
      },
      {
        "type": "code",
        "id": "4-0-baseline",
        "prompt": "Implement total. It must accept an empty array and leave its input unchanged. The checks include negative values.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int total(int[] values) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(total(new int[]{4,-2,7}));\nSystem.out.println(total(new int[]{}));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int total(int[] values) {\nint sum=0; for(int value:values) sum+=value; return sum;\n}\npublic static void main(String[] args) {\nSystem.out.println(total(new int[]{4,-2,7}));\nSystem.out.println(total(new int[]{}));\n}\n}\n",
        "expected": "9\n0"
      }
    ]
  },
  {
    "id": "4-1",
    "title": "Ethical and Social Issues Around Data Collection",
    "blocks": [
      {
        "type": "text",
        "md": "A data collection is also a set of decisions about people: whose experiences are recorded, what is omitted, and who can use the result. Consent should describe a specific purpose, retention period, and intended audience. Collecting a field because it might become useful increases exposure without establishing a present benefit. Data minimization means retaining only what the task requires.\n\nRemoving names does not necessarily make a data set anonymous. A combination such as location, age, and an unusual event can identify a person when joined with another source. Aggregation can reduce detail, but a very small group can still expose an individual. Access controls, limited retention, and a review of derived outputs complement one another; no single step is a guarantee.\n\nA sample can also be biased. A survey delivered only through a particular device omits people without that device. Missing values and duplicate records can distort a summary before the algorithm even starts. Describe the population, collection process, and limitations along with an average or prediction. A mathematically correct program can still support an unfair conclusion if the input is unrepresentative.\n\nIn the exercise, report only groups meeting a minimum size. This is a small programming rule for a disclosure policy, not proof of anonymity. The caller must still review what the groups mean and whether combining reports reveals more information."
      },
      {
        "type": "quiz",
        "id": "4-1-minimal",
        "question": "A tutoring program needs counts by grade. Which collection best follows data minimization?",
        "choices": [
          "Names, home addresses, and grades",
          "Grade values without unrelated identifying fields",
          "Every browser history entry",
          "Passwords and grades"
        ],
        "answer": 1,
        "explanation": "The purpose needs grade-level counts, not unrelated personal information."
      },
      {
        "type": "quiz",
        "id": "4-1-join",
        "question": "A file removes names but keeps exact birth date and location. What remains possible?",
        "choices": [
          "Re-identification by combining sources",
          "Automatic removal of all bias",
          "Guaranteed anonymity",
          "A compile error"
        ],
        "answer": 0,
        "explanation": "Several indirect identifiers can become identifying together."
      },
      {
        "type": "quiz",
        "id": "4-1-sample",
        "question": "An online survey excludes students without reliable internet. What is the main concern?",
        "choices": [
          "The sample may not represent all students",
          "An array cannot store answers",
          "Sorting fixes the omission",
          "More decimal places fix bias"
        ],
        "answer": 0,
        "explanation": "A larger count of the same selective sample does not repair missing groups."
      },
      {
        "type": "code",
        "id": "4-1-release",
        "prompt": "Return the total number of records in groups with size at least minimum. Do not include suppressed groups. Test the exact threshold and an empty input.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int released(int[] groupSizes,int minimum) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(released(new int[]{2,5,7,1},5));\nSystem.out.println(released(new int[]{},5));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int released(int[] groupSizes,int minimum) {\nint total=0; for(int n:groupSizes) if(n>=minimum) total+=n; return total;\n}\npublic static void main(String[] args) {\nSystem.out.println(released(new int[]{2,5,7,1},5));\nSystem.out.println(released(new int[]{},5));\n}\n}\n",
        "expected": "12\n0"
      }
    ]
  },
  {
    "id": "4-13",
    "title": "Implementing 2D Array Algorithms",
    "blocks": [
      {
        "type": "text",
        "md": "A two-dimensional algorithm combines a traversal with state. Decide whether the state belongs to the whole table, one row, one column, or one cell. A table total initializes once before both loops. A row total resets at the beginning of each row. A column total resets at the beginning of each column and varies the row index inside.\n\nFor rectangular arrays, row count is grid.length and column count is grid[0].length, provided at least one row exists. Java also permits rows of different lengths. A row-major traversal can support these by using grid[r].length. A column algorithm should either require rectangular input or state how missing cells are treated.\n\nTo find a maximum, initialize from a real cell under a nonempty-input precondition. To search, return immediately when a cell matches, or store coordinates and stop both loops deliberately. Breaking only the inner loop leaves the outer traversal running. For a count or sum, every cell must contribute exactly once.\n\nNeighbor algorithms are different: for each location, inspect offsets while checking both coordinates before accessing an element. Decide whether diagonal neighbors count and whether the center is excluded. For transformations based on original neighbor values, write to a separate result array; mutating the source while traversing can make later answers depend on earlier writes."
      },
      {
        "type": "quiz",
        "id": "4-13-scope",
        "question": "Where should rowTotal be initialized to zero?",
        "choices": [
          "Before the outer loop only",
          "Inside the row loop before the column loop",
          "Inside the column loop",
          "After all loops"
        ],
        "answer": 1,
        "explanation": "Each row needs a fresh accumulator."
      },
      {
        "type": "quiz",
        "id": "4-13-bounds",
        "question": "For a rectangular grid, which condition protects grid[r][c]?",
        "choices": [
          "r <= grid.length",
          "r >= 0 && r < grid.length && c >= 0 && c < grid[r].length",
          "c < grid.length only",
          "r != c"
        ],
        "answer": 1,
        "explanation": "Both coordinates must lie in their own dimensions."
      },
      {
        "type": "quiz",
        "id": "4-13-snapshot",
        "question": "Why use a new table for a neighbor-based blur?",
        "choices": [
          "To keep all neighbor reads based on the original picture",
          "To remove nested loops",
          "To make every row longer",
          "To avoid arithmetic"
        ],
        "answer": 0,
        "explanation": "In-place updates could contaminate subsequent calculations."
      },
      {
        "type": "code",
        "id": "4-13-rows",
        "prompt": "Return the largest row sum. Input has at least one row; a row may be empty. Include an all-negative test.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int bestRow(int[][] grid) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(bestRow(new int[][]{{-3,-2},{-9},{}}));\nSystem.out.println(bestRow(new int[][]{{-8},{-4,-1}}));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int bestRow(int[][] grid) {\nint best=Integer.MIN_VALUE; for(int[] row:grid){int sum=0;for(int v:row)sum+=v; if(sum>best)best=sum;} return best;\n}\npublic static void main(String[] args) {\nSystem.out.println(bestRow(new int[][]{{-3,-2},{-9},{}}));\nSystem.out.println(bestRow(new int[][]{{-8},{-4,-1}}));\n}\n}\n",
        "expected": "0\n-5"
      },
      {
        "type": "code",
        "id": "4-13-neighbors",
        "prompt": "Count orthogonal neighbors equal to 1 around (r,c); exclude the center. The rectangular table is nonempty and the center is valid.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int neighbors(int[][] a,int r,int c) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nint[][] a={{1,1,0},{1,0,1}};\nSystem.out.println(neighbors(a,0,0));\nSystem.out.println(neighbors(a,1,1));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int neighbors(int[][] a,int r,int c) {\nint count=0;int[] dr={-1,1,0,0};int[] dc={0,0,-1,1};for(int k=0;k<4;k++){int nr=r+dr[k],nc=c+dc[k];if(nr>=0&&nr<a.length&&nc>=0&&nc<a[nr].length&&a[nr][nc]==1)count++;}return count;\n}\npublic static void main(String[] args) {\nint[][] a={{1,1,0},{1,0,1}};\nSystem.out.println(neighbors(a,0,0));\nSystem.out.println(neighbors(a,1,1));\n}\n}\n",
        "expected": "2\n3"
      }
    ]
  }
];
