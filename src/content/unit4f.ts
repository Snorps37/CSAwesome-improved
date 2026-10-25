import type { Lesson } from './types';

// Original explanations and executable practice; no external classroom assets required.
export const unit4f: Lesson[] = [
  {
    "id": "4-46",
    "title": "Unit 4C - 2D Arrays Summary",
    "blocks": [
      {
        "type": "text",
        "md": "A two-dimensional array is an array of row references. For a rectangular grid, use grid.length for rows and grid[0].length for columns, assuming a row exists. An individual cell uses grid[row][column]. Java also allows ragged rows; a general row-major traversal uses each row's own length.\n\nThe loop order determines visit order. Row-major traversal completes one row at a time, and column-major traversal completes one column. A table-wide accumulator initializes before both loops. A row accumulator initializes inside the row loop. A transformation that returns a new grid must allocate each row and copy or compute every required cell.\n\nFor transpose, output[c][r] = input[r][c]; the dimensions exchange. For a horizontal mirror, pair column c with width-1-c, processing only half of each row if copying one side over the other. For local-neighbor algorithms, check bounds before accessing coordinates and exclude the center when the contract requires it.\n\nState shape assumptions explicitly. Empty grids need special treatment before reading grid[0]. Rectangular algorithms do not automatically work on ragged tables. If each output depends on original neighbor values, keep the source and destination separate."
      },
      {
        "type": "quiz",
        "id": "4-46-review1",
        "question": "For int[][] a=new int[3][5], which expression gives the number of columns?",
        "choices": [
          "a.length",
          "a[0].length",
          "a.length()",
          "a[5].length"
        ],
        "answer": 1,
        "explanation": "Each row has five elements."
      },
      {
        "type": "quiz",
        "id": "4-46-review2",
        "question": "Which element is at the last row and first column of a nonempty table?",
        "choices": [
          "a[0][a.length-1]",
          "a[a.length-1][0]",
          "a[a.length][1]",
          "a[1][a.length]"
        ],
        "answer": 1,
        "explanation": "The row coordinate varies first; the last row is length minus one."
      },
      {
        "type": "quiz",
        "id": "4-46-review3",
        "question": "How many times does the body execute? for(int r=0;r<2;r++) for(int c=0;c<4;c++) count++;",
        "choices": [
          "2",
          "4",
          "6",
          "8"
        ],
        "answer": 3,
        "explanation": "Each of two rows contributes four iterations."
      },
      {
        "type": "code",
        "id": "4-46-column",
        "prompt": "Return column totals for a rectangular table with at least one row. The table may have zero columns.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int[] columnTotals(int[][] a) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(Arrays.toString(columnTotals(new int[][]{{2,5},{3,-1}})));System.out.println(Arrays.toString(columnTotals(new int[][]{{}})));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int[] columnTotals(int[][] a) {\nint[] totals=new int[a[0].length];for(int r=0;r<a.length;r++)for(int c=0;c<a[r].length;c++)totals[c]+=a[r][c];return totals;\n}\npublic static void main(String[] args) {\nSystem.out.println(Arrays.toString(columnTotals(new int[][]{{2,5},{3,-1}})));System.out.println(Arrays.toString(columnTotals(new int[][]{{}})));\n}\n}\n",
        "expected": "[5, 4]\n[]"
      }
    ]
  },
  {
    "id": "4-47",
    "title": "Unit 4C - Toggle Code Practice 4c 2D Arrays (4.11-4.13)",
    "blocks": [
      {
        "type": "text",
        "md": "Arrange each set of operations into an algorithm with the correct loop nesting. Identify which dimension each variable controls and where state must reset."
      },
      {
        "type": "code",
        "id": "4-47-total-order",
        "prompt": "Order: initialize sum; outer rows; inner values; add value; return sum. Support ragged rows.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int total(int[][] a) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(total(new int[][]{{1,2},{3},{}}));System.out.println(total(new int[][]{}));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int total(int[][] a) {\nint sum=0;for(int[] row:a)for(int v:row)sum+=v;return sum;\n}\npublic static void main(String[] args) {\nSystem.out.println(total(new int[][]{{1,2},{3},{}}));System.out.println(total(new int[][]{}));\n}\n}\n",
        "expected": "6\n0"
      },
      {
        "type": "code",
        "id": "4-47-identity-order",
        "prompt": "Order: allocate n by n array; loop i; assign a[i][i]=1; return. Off-diagonal default values stay zero.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int[][] identity(int n) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nfor(int[] row:identity(3))System.out.println(Arrays.toString(row));System.out.println(identity(0).length);\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int[][] identity(int n) {\nint[][] a=new int[n][n];for(int i=0;i<n;i++)a[i][i]=1;return a;\n}\npublic static void main(String[] args) {\nfor(int[] row:identity(3))System.out.println(Arrays.toString(row));System.out.println(identity(0).length);\n}\n}\n",
        "expected": "[1, 0, 0]\n[0, 1, 0]\n[0, 0, 1]\n0"
      },
      {
        "type": "code",
        "id": "4-47-find-order",
        "prompt": "Order: loop rows; loop columns; test target; return coordinate pair; return {-1,-1} after both loops. Find the first row-major occurrence.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int[] find(int[][] a,int target) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(Arrays.toString(find(new int[][]{{2,7},{7,3}},7)));System.out.println(Arrays.toString(find(new int[][]{{}},7)));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int[] find(int[][] a,int target) {\nfor(int r=0;r<a.length;r++)for(int c=0;c<a[r].length;c++)if(a[r][c]==target)return new int[]{r,c};return new int[]{-1,-1};\n}\npublic static void main(String[] args) {\nSystem.out.println(Arrays.toString(find(new int[][]{{2,7},{7,3}},7)));System.out.println(Arrays.toString(find(new int[][]{{}},7)));\n}\n}\n",
        "expected": "[0, 1]\n[-1, -1]"
      }
    ]
  },
  {
    "id": "4-48",
    "title": "Unit 4C - Code Practice with 2D Arrays",
    "blocks": [
      {
        "type": "text",
        "md": "Complete these traversals and transformations. Separate the input shape from the output shape, and explain whether the source is mutated."
      },
      {
        "type": "code",
        "id": "4-48-cp-even2d",
        "prompt": "**Count evens in a table.** Expected: §Evens: 4§.",
        "expected": "Evens: 4",
        "starter": "public class Main {\n    public static void main(String[] args) {\n        int[][] m = {{2, 7, 4}, {9, 6, 1}, {3, 8, 5}};\n        int count = 0;\n        // TODO\n        System.out.println(\"Evens: \" + count);\n    }\n}\n",
        "solution": "public class Main {\n    public static void main(String[] args) {\n        int[][] m = {{2, 7, 4}, {9, 6, 1}, {3, 8, 5}};\n        int count = 0;\n        for (int[] row : m) {\n            for (int v : row) {\n                if (v % 2 == 0) {\n                    count++;\n                }\n            }\n        }\n        System.out.println(\"Evens: \" + count);\n    }\n}\n",
        "hint": "Nested enhanced for loops; test v % 2 == 0."
      },
      {
        "type": "code",
        "id": "4-48-cp-transpose",
        "prompt": "**Transpose.** Build a 3 by 2 table whose rows are the columns of the 2 by 3 table, then print each row. Expected three lines: §1 4§, §2 5§, §3 6§.",
        "expected": "1 4\n2 5\n3 6",
        "starter": "public class Main {\n    public static void main(String[] args) {\n        int[][] m = {{1, 2, 3}, {4, 5, 6}};\n        int[][] t = new int[3][2];\n        // TODO: fill t so that t[c][r] = m[r][c]\n        for (int r = 0; r < t.length; r++) {\n            for (int c = 0; c < t[r].length; c++) {\n                System.out.print(t[r][c] + (c < t[r].length - 1 ? \" \" : \"\"));\n            }\n            System.out.println();\n        }\n    }\n}\n",
        "solution": "public class Main {\n    public static void main(String[] args) {\n        int[][] m = {{1, 2, 3}, {4, 5, 6}};\n        int[][] t = new int[3][2];\n        for (int r = 0; r < m.length; r++) {\n            for (int c = 0; c < m[r].length; c++) {\n                t[c][r] = m[r][c];\n            }\n        }\n        for (int r = 0; r < t.length; r++) {\n            for (int c = 0; c < t[r].length; c++) {\n                System.out.print(t[r][c] + (c < t[r].length - 1 ? \" \" : \"\"));\n            }\n            System.out.println();\n        }\n    }\n}\n",
        "hint": "Loop over m and write each value to t at swapped indexes."
      },
      {
        "type": "code",
        "id": "4-48-row-min",
        "prompt": "Return one minimum per nonempty row. The outer array may be empty.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int[] rowMins(int[][] a) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(Arrays.toString(rowMins(new int[][]{{4,-2},{8},{-7,-1}})));System.out.println(Arrays.toString(rowMins(new int[][]{})));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int[] rowMins(int[][] a) {\nint[] mins=new int[a.length];for(int r=0;r<a.length;r++){int min=a[r][0];for(int v:a[r])if(v<min)min=v;mins[r]=min;}return mins;\n}\npublic static void main(String[] args) {\nSystem.out.println(Arrays.toString(rowMins(new int[][]{{4,-2},{8},{-7,-1}})));System.out.println(Arrays.toString(rowMins(new int[][]{})));\n}\n}\n",
        "expected": "[-2, 8, -7]\n[]"
      }
    ]
  },
  {
    "id": "4-49",
    "title": "Unit 4C - More Code Practice with 2D Arrays",
    "blocks": [
      {
        "type": "text",
        "md": "These algorithms combine coordinate mapping with a condition. Check a one-cell table and the boundaries before assuming an interior-cell example is sufficient."
      },
      {
        "type": "code",
        "id": "4-49-border",
        "prompt": "Sum the border of a rectangular nonempty table with nonempty rows. Count each cell once, including for a one-row or one-column table.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int border(int[][] a) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(border(new int[][]{{1,2,3},{4,5,6},{7,8,9}}));System.out.println(border(new int[][]{{2,3}}));System.out.println(border(new int[][]{{4}}));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int border(int[][] a) {\nint sum=0;for(int r=0;r<a.length;r++)for(int c=0;c<a[r].length;c++)if(r==0||r==a.length-1||c==0||c==a[r].length-1)sum+=a[r][c];return sum;\n}\npublic static void main(String[] args) {\nSystem.out.println(border(new int[][]{{1,2,3},{4,5,6},{7,8,9}}));System.out.println(border(new int[][]{{2,3}}));System.out.println(border(new int[][]{{4}}));\n}\n}\n",
        "expected": "40\n5\n4"
      },
      {
        "type": "code",
        "id": "4-49-rotate",
        "prompt": "Return a new table rotated clockwise by 90 degrees. Input is rectangular and nonempty. Map input[r][c] to output[c][rows-1-r].",
        "starter": "import java.util.*;\npublic class Main {\nstatic int[][] rotate(int[][] a) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nfor(int[] row:rotate(new int[][]{{1,2,3},{4,5,6}}))System.out.println(Arrays.toString(row));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int[][] rotate(int[][] a) {\nint[][] b=new int[a[0].length][a.length];for(int r=0;r<a.length;r++)for(int c=0;c<a[r].length;c++)b[c][a.length-1-r]=a[r][c];return b;\n}\npublic static void main(String[] args) {\nfor(int[] row:rotate(new int[][]{{1,2,3},{4,5,6}}))System.out.println(Arrays.toString(row));\n}\n}\n",
        "expected": "[4, 1]\n[5, 2]\n[6, 3]"
      },
      {
        "type": "code",
        "id": "4-49-saddle",
        "prompt": "Count cells that are minimum in their row and maximum in their column. Equality is allowed. Input is rectangular with at least one cell.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int saddles(int[][] a) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(saddles(new int[][]{{3,4},{1,2}}));System.out.println(saddles(new int[][]{{5,5}}));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int saddles(int[][] a) {\nint count=0;for(int r=0;r<a.length;r++)for(int c=0;c<a[r].length;c++){boolean valid=true;for(int v:a[r])if(v<a[r][c])valid=false;for(int rr=0;rr<a.length;rr++)if(a[rr][c]>a[r][c])valid=false;if(valid)count++;}return count;\n}\npublic static void main(String[] args) {\nSystem.out.println(saddles(new int[][]{{3,4},{1,2}}));System.out.println(saddles(new int[][]{{5,5}}));\n}\n}\n",
        "expected": "1\n2"
      }
    ]
  },
  {
    "id": "4-50",
    "title": "Unit 4C - 2D Arrays Multiple-Choice Exercises",
    "blocks": [
      {
        "type": "text",
        "md": "Trace the row and column indexes independently. A valid row index does not imply a valid column index. Use the declared shape rather than a visual guess."
      },
      {
        "type": "quiz",
        "id": "4-50-mc1",
        "question": "For int[][] a=new int[3][5], which expression gives the number of columns?",
        "choices": [
          "a.length",
          "a[0].length",
          "a.length()",
          "a[5].length"
        ],
        "answer": 1,
        "explanation": "Each row has five elements."
      },
      {
        "type": "quiz",
        "id": "4-50-mc2",
        "question": "Which element is at the last row and first column of a nonempty table?",
        "choices": [
          "a[0][a.length-1]",
          "a[a.length-1][0]",
          "a[a.length][1]",
          "a[1][a.length]"
        ],
        "answer": 1,
        "explanation": "The row coordinate varies first; the last row is length minus one."
      },
      {
        "type": "quiz",
        "id": "4-50-mc3",
        "question": "How many times does the body execute? for(int r=0;r<2;r++) for(int c=0;c<4;c++) count++;",
        "choices": [
          "2",
          "4",
          "6",
          "8"
        ],
        "answer": 3,
        "explanation": "Each of two rows contributes four iterations."
      },
      {
        "type": "quiz",
        "id": "4-50-mc4",
        "question": "For int[][] a={{2,4},{6,8}}, what is a[1][0]+a[0][1]?",
        "choices": [
          "6",
          "8",
          "10",
          "12"
        ],
        "answer": 2,
        "explanation": "The two terms are 6 and 4."
      },
      {
        "type": "quiz",
        "id": "4-50-mc5",
        "question": "A row-total array has one entry per row. Where should sum be reset?",
        "choices": [
          "Before both loops only",
          "At the start of each row",
          "After every element",
          "Only when a value is negative"
        ],
        "answer": 1,
        "explanation": "Each row needs its own total."
      },
      {
        "type": "quiz",
        "id": "4-50-mc6",
        "question": "Which traversal is column-major for a rectangular table?",
        "choices": [
          "Outer rows, inner columns",
          "Outer columns, inner rows",
          "One enhanced loop only",
          "Visit the diagonal only"
        ],
        "answer": 1,
        "explanation": "Finish a column before moving to the next column."
      },
      {
        "type": "quiz",
        "id": "4-50-mc7",
        "question": "Why is c < a[r].length preferable to c < a[0].length for a ragged table?",
        "choices": [
          "It supports each row having its own length",
          "It sorts rows",
          "It prevents all null references",
          "It reverses columns"
        ],
        "answer": 0,
        "explanation": "Rows are independent arrays and may have different lengths."
      },
      {
        "type": "quiz",
        "id": "4-50-mc8",
        "question": "Which condition identifies main-diagonal positions in a square table?",
        "choices": [
          "r+c==0",
          "r==c",
          "r<c",
          "r==a.length"
        ],
        "answer": 1,
        "explanation": "The main diagonal uses equal coordinates."
      },
      {
        "type": "quiz",
        "id": "4-50-mc9",
        "question": "A 2 by 3 table is transposed. What are the result dimensions?",
        "choices": [
          "2 by 3",
          "3 by 2",
          "6 by 1",
          "3 by 3"
        ],
        "answer": 1,
        "explanation": "Transpose exchanges row and column coordinates."
      },
      {
        "type": "quiz",
        "id": "4-50-mc10",
        "question": "Which strategy prevents a neighbor transformation from reusing changed values?",
        "choices": [
          "Use the same grid and move faster",
          "Read the original and write a separate result grid",
          "Skip bounds checks",
          "Update the center first"
        ],
        "answer": 1,
        "explanation": "Separate source and destination provide consistent input values."
      }
    ]
  },
  {
    "id": "4-51",
    "title": "Unit 4C - Free Response Question (FRQ) 4 - Two-dimensional Arrays",
    "blocks": [
      {
        "type": "text",
        "md": "A DataGrid stores a nonempty rectangular int table. Part (a): isIncreasingCol(c) returns true if every value in column c is strictly greater than the value above it. A one-row column is increasing. Part (b): removeCol(c) returns a new table omitting column c without changing the original. The column index is valid; removing the only column produces rows of length zero. Do not flatten the table or change row order.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-51-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic class DataGrid {int[][] data;DataGrid(int[][] a){data=a;}boolean isIncreasingCol(int c){throw new UnsupportedOperationException();}int[][] removeCol(int c){throw new UnsupportedOperationException();}}\npublic static void main(String[] args) {\nDataGrid d=new DataGrid(new int[][]{{1,8,3},{2,7,6}});System.out.println(d.isIncreasingCol(0)+\" \"+d.isIncreasingCol(1));for(int[] row:d.removeCol(1))System.out.println(Arrays.toString(row));System.out.println(Arrays.deepToString(d.data));System.out.println(new DataGrid(new int[][]{{4}}).removeCol(0)[0].length);\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic class DataGrid {int[][] data;DataGrid(int[][] a){data=a;}boolean isIncreasingCol(int c){for(int r=1;r<data.length;r++)if(data[r][c]<=data[r-1][c])return false;return true;}int[][] removeCol(int c){int[][] b=new int[data.length][data[0].length-1];for(int r=0;r<data.length;r++){int next=0;for(int k=0;k<data[r].length;k++)if(k!=c)b[r][next++]=data[r][k];}return b;}}\npublic static void main(String[] args) {\nDataGrid d=new DataGrid(new int[][]{{1,8,3},{2,7,6}});System.out.println(d.isIncreasingCol(0)+\" \"+d.isIncreasingCol(1));for(int[] row:d.removeCol(1))System.out.println(Arrays.toString(row));System.out.println(Arrays.deepToString(d.data));System.out.println(new DataGrid(new int[][]{{4}}).removeCol(0)[0].length);\n}\n}\n",
        "expected": "true false\n[1, 3]\n[2, 6]\n[[1, 8, 3], [2, 7, 6]]\n0"
      }
    ]
  },
  {
    "id": "4-52",
    "title": "Unit 4C - Free Response - Gray Image A",
    "blocks": [
      {
        "type": "text",
        "md": "A GrayImage stores a rectangular grid of intensities from 0 (black) to 255 (white). Part (a): countWhitePixels counts cells exactly equal to WHITE. Values close to white do not count. Part (b): averageBrightness returns the arithmetic mean as a double. For this part the grid has at least one cell; countWhitePixels should also support an empty outer array. Neither method changes the image.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-52-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic class GrayImage {static final int WHITE=255;int[][] pixels;GrayImage(int[][] p){pixels=p;}int countWhitePixels(){throw new UnsupportedOperationException();}double averageBrightness(){throw new UnsupportedOperationException();}}\npublic static void main(String[] args) {\nGrayImage g=new GrayImage(new int[][]{{255,254},{0,255}});System.out.println(g.countWhitePixels());System.out.println(g.averageBrightness());System.out.println(new GrayImage(new int[][]{}).countWhitePixels());\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic class GrayImage {static final int WHITE=255;int[][] pixels;GrayImage(int[][] p){pixels=p;}int countWhitePixels(){int n=0;for(int[] row:pixels)for(int v:row)if(v==WHITE)n++;return n;}double averageBrightness(){int total=0,count=0;for(int[] row:pixels)for(int v:row){total+=v;count++;}return (double)total/count;}}\npublic static void main(String[] args) {\nGrayImage g=new GrayImage(new int[][]{{255,254},{0,255}});System.out.println(g.countWhitePixels());System.out.println(g.averageBrightness());System.out.println(new GrayImage(new int[][]{}).countWhitePixels());\n}\n}\n",
        "expected": "2\n191.0\n0"
      }
    ]
  },
  {
    "id": "4-53",
    "title": "Unit 4C - Free Response - Gray Image B",
    "blocks": [
      {
        "type": "text",
        "md": "Process a GrayImage in place. Part (a): for every cell whose down-and-right neighbor at offset (2,2) exists, replace the cell by max(0, originalCell-neighbor). Cells without that neighbor remain unchanged. Part (b): explain why row-major traversal from top to bottom preserves the neighbor values needed for this directional operation. The method must work on a grid smaller than 3 by 3, leaving it unchanged. Intensities remain in 0..255.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-53-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic class GrayImage {static final int WHITE=255;int[][] pixels;GrayImage(int[][] p){pixels=p;}void processImage(){throw new UnsupportedOperationException();}}\npublic static void main(String[] args) {\nGrayImage g=new GrayImage(new int[][]{{100,40,90},{80,70,60},{10,20,120}});g.processImage();System.out.println(Arrays.deepToString(g.pixels));GrayImage small=new GrayImage(new int[][]{{4,8}});small.processImage();System.out.println(Arrays.deepToString(small.pixels));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic class GrayImage {static final int WHITE=255;int[][] pixels;GrayImage(int[][] p){pixels=p;}void processImage(){for(int r=0;r<pixels.length-2;r++)for(int c=0;c<pixels[r].length-2;c++)pixels[r][c]=Math.max(0,pixels[r][c]-pixels[r+2][c+2]);}}\npublic static void main(String[] args) {\nGrayImage g=new GrayImage(new int[][]{{100,40,90},{80,70,60},{10,20,120}});g.processImage();System.out.println(Arrays.deepToString(g.pixels));GrayImage small=new GrayImage(new int[][]{{4,8}});small.processImage();System.out.println(Arrays.deepToString(small.pixels));\n}\n}\n",
        "expected": "[[0, 40, 90], [80, 70, 60], [10, 20, 120]]\n[[4, 8]]"
      }
    ]
  },
  {
    "id": "4-54",
    "title": "Unit 4C - Free Response - Route Cipher A and B",
    "blocks": [
      {
        "type": "text",
        "md": "A RouteCipher has positive row and column counts and a char grid. Part (a): fillBlock(message,start) fills the grid in row-major order using characters beginning at start; if the message ends, fill remaining cells with 'X'. Part (b): encryptMessage(message) repeatedly fills blocks and reads each block in column-major order, concatenating the results. An empty message produces an empty result. Preserve spaces as ordinary characters. Do not add an extra block when the message length is an exact multiple of block capacity.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-54-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic class RouteCipher {char[][] grid;RouteCipher(int r,int c){grid=new char[r][c];}void fillBlock(String message,int start){throw new UnsupportedOperationException();}String encryptMessage(String message){throw new UnsupportedOperationException();}}\npublic static void main(String[] args) {\nRouteCipher c=new RouteCipher(2,3);c.fillBlock(\"AB\",0);System.out.println(Arrays.deepToString(c.grid));System.out.println(c.encryptMessage(\"ABCDEFG\"));System.out.println(c.encryptMessage(\"ABCDEF\"));System.out.println(\"[\"+c.encryptMessage(\"\")+\"]\");\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic class RouteCipher {char[][] grid;RouteCipher(int r,int c){grid=new char[r][c];}void fillBlock(String message,int start){int k=start;for(int r=0;r<grid.length;r++)for(int c=0;c<grid[r].length;c++)grid[r][c]=k<message.length()?message.charAt(k++):'X';}String encryptMessage(String message){String out=\"\";int capacity=grid.length*grid[0].length;for(int start=0;start<message.length();start+=capacity){fillBlock(message,start);for(int c=0;c<grid[0].length;c++)for(int r=0;r<grid.length;r++)out+=grid[r][c];}return out;}}\npublic static void main(String[] args) {\nRouteCipher c=new RouteCipher(2,3);c.fillBlock(\"AB\",0);System.out.println(Arrays.deepToString(c.grid));System.out.println(c.encryptMessage(\"ABCDEFG\"));System.out.println(c.encryptMessage(\"ABCDEF\"));System.out.println(\"[\"+c.encryptMessage(\"\")+\"]\");\n}\n}\n",
        "expected": "[[A, B, X], [X, X, X]]\nADBECFGXXXXX\nADBECF\n[]"
      }
    ]
  },
  {
    "id": "4-55",
    "title": "Unit 4D - Recursion Summary",
    "blocks": [
      {
        "type": "text",
        "md": "A recursive method solves a problem using smaller instances of the same problem. Its contract must define the valid input range, its base case must handle the smallest input directly, and every recursive path must make progress toward a base case. A recursive call is an ordinary method call with a separate stack frame.\n\nTrace calls in two stages. Work before the recursive call occurs while the call chain expands. Work after it occurs as calls return. A return expression waits for the recursive result before performing its remaining arithmetic. Print order and returned value are different questions; record them separately.\n\nRecursive searching passes an interval instead of copying a subarray. With inclusive bounds, low > high means no candidates remain, while low == high still represents one element. Recursive sorting divides until each piece is trivially sorted, then combines sorted results. Merge sort requires a correct merge step as well as a correct split.\n\nFor debugging, trace the smallest valid input, one step above it, and an absent search target. State a decreasing measure such as n, remaining string length, or interval size. Recursion that branches into overlapping subproblems may repeat work; recursion alone does not guarantee efficiency."
      },
      {
        "type": "quiz",
        "id": "4-55-review1",
        "question": "What two properties make a recursive method terminate for its valid inputs?",
        "choices": [
          "A loop and an array",
          "A reachable base case and progress toward it",
          "Two recursive calls",
          "A void return type"
        ],
        "answer": 1,
        "explanation": "Every call chain must reach a case that makes no further recursive call."
      },
      {
        "type": "quiz",
        "id": "4-55-review2",
        "question": "What is f(3) for f(0)=1 and f(n)=2*f(n-1)?",
        "choices": [
          "3",
          "6",
          "8",
          "9"
        ],
        "answer": 2,
        "explanation": "The returned values are 1,2,4,8."
      },
      {
        "type": "quiz",
        "id": "4-55-review3",
        "question": "Where is each unfinished recursive invocation kept?",
        "choices": [
          "In the output console",
          "In a call-stack frame",
          "In a new source file",
          "In the import list"
        ],
        "answer": 1,
        "explanation": "Each call has its own parameters, locals, and return point."
      },
      {
        "type": "code",
        "id": "4-55-power",
        "prompt": "Compute base raised to nonnegative exponent recursively. Treat exponent zero as one.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int power(int base,int exponent) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(power(3,4));System.out.println(power(8,0));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int power(int base,int exponent) {\nif(exponent==0)return 1;return base*power(base,exponent-1);\n}\npublic static void main(String[] args) {\nSystem.out.println(power(3,4));System.out.println(power(8,0));\n}\n}\n",
        "expected": "81\n1"
      },
      {
        "type": "predict",
        "id": "4-55-unwind",
        "question": "Trace the program and enter its exact console output.",
        "code": "import java.util.*;\npublic class Main {\nstatic void trace(int n){if(n==0)return;trace(n-1);System.out.println(n);}\npublic static void main(String[] args) {\ntrace(3);\n}\n}\n",
        "answer": "1\n2\n3",
        "explanation": "The print executes after the recursive call returns."
      }
    ]
  },
  {
    "id": "4-56",
    "title": "Unit 4D - Recursion Mixed Up Code Practice",
    "blocks": [
      {
        "type": "text",
        "md": "Reorder the ideas in each prompt into a terminating recursive method. Write the base case first and identify the measure that decreases. No loops are needed."
      },
      {
        "type": "code",
        "id": "4-56-factorial",
        "prompt": "Order: return n*factorial(n-1); test n==0; return 1. Precondition 0 <= n <= 12.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int factorial(int n) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(factorial(5));System.out.println(factorial(0));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int factorial(int n) {\nif(n==0)return 1;return n*factorial(n-1);\n}\npublic static void main(String[] args) {\nSystem.out.println(factorial(5));System.out.println(factorial(0));\n}\n}\n",
        "expected": "120\n1"
      },
      {
        "type": "code",
        "id": "4-56-sumdigits",
        "prompt": "Order: n%10 + digitSum(n/10); base n<10; return n. n is nonnegative.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int digitSum(int n) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(digitSum(4062));System.out.println(digitSum(0));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int digitSum(int n) {\nif(n<10)return n;return n%10+digitSum(n/10);\n}\npublic static void main(String[] args) {\nSystem.out.println(digitSum(4062));System.out.println(digitSum(0));\n}\n}\n",
        "expected": "12\n0"
      },
      {
        "type": "code",
        "id": "4-56-reverse",
        "prompt": "Order: reverse substring(1); append substring(0,1); base empty String.",
        "starter": "import java.util.*;\npublic class Main {\nstatic String reverse(String s) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(reverse(\"array\"));System.out.println(\"[\"+reverse(\"\")+\"]\");\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic String reverse(String s) {\nif(s.length()==0)return \"\";return reverse(s.substring(1))+s.substring(0,1);\n}\npublic static void main(String[] args) {\nSystem.out.println(reverse(\"array\"));System.out.println(\"[\"+reverse(\"\")+\"]\");\n}\n}\n",
        "expected": "yarra\n[]"
      }
    ]
  },
  {
    "id": "4-57",
    "title": "Unit 4D - Recursion More Mixed Up Code Practice",
    "blocks": [
      {
        "type": "text",
        "md": "Reconstruct recursive methods that pass indexes or bounds. Keep the same array reference and reduce the unresolved range on every call. Check the base case before indexing."
      },
      {
        "type": "code",
        "id": "4-57-contains",
        "prompt": "Order: if index==length return false; if current matches return true; recurse index+1. Begin with index zero.",
        "starter": "import java.util.*;\npublic class Main {\nstatic boolean contains(int[] a,int target,int index) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(contains(new int[]{3,6,8},6,0));System.out.println(contains(new int[]{},6,0));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic boolean contains(int[] a,int target,int index) {\nif(index==a.length)return false;if(a[index]==target)return true;return contains(a,target,index+1);\n}\npublic static void main(String[] args) {\nSystem.out.println(contains(new int[]{3,6,8},6,0));System.out.println(contains(new int[]{},6,0));\n}\n}\n",
        "expected": "true\nfalse"
      },
      {
        "type": "code",
        "id": "4-57-palindrome",
        "prompt": "Order: low>=high return true; compare ends; return false if unequal; recurse inward. Start at 0 and length-1.",
        "starter": "import java.util.*;\npublic class Main {\nstatic boolean palindrome(String s,int low,int high) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(palindrome(\"level\",0,4));System.out.println(palindrome(\"array\",0,4));System.out.println(palindrome(\"\",0,-1));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic boolean palindrome(String s,int low,int high) {\nif(low>=high)return true;if(s.charAt(low)!=s.charAt(high))return false;return palindrome(s,low+1,high-1);\n}\npublic static void main(String[] args) {\nSystem.out.println(palindrome(\"level\",0,4));System.out.println(palindrome(\"array\",0,4));System.out.println(palindrome(\"\",0,-1));\n}\n}\n",
        "expected": "true\nfalse\ntrue"
      },
      {
        "type": "code",
        "id": "4-57-binary",
        "prompt": "Order: empty interval return -1; calculate midpoint; equality return mid; recurse left or right excluding midpoint. Input is sorted ascending.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int binary(int[] a,int target,int low,int high) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nint[] a={1,4,7,9,12};System.out.println(binary(a,9,0,a.length-1));System.out.println(binary(a,6,0,a.length-1));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int binary(int[] a,int target,int low,int high) {\nif(low>high)return -1;int mid=low+(high-low)/2;if(a[mid]==target)return mid;if(target<a[mid])return binary(a,target,low,mid-1);return binary(a,target,mid+1,high);\n}\npublic static void main(String[] args) {\nint[] a={1,4,7,9,12};System.out.println(binary(a,9,0,a.length-1));System.out.println(binary(a,6,0,a.length-1));\n}\n}\n",
        "expected": "3\n-1"
      }
    ]
  },
  {
    "id": "4-58",
    "title": "Unit 4D - Code Practice for Recursion",
    "blocks": [
      {
        "type": "text",
        "md": "Implement each contract recursively. Distinguish an accumulator that is returned from output that is printed. Trace the return values on paper before running the checks."
      },
      {
        "type": "code",
        "id": "4-58-cp-digits",
        "prompt": "**Two recursions.** Write §digitCount(n)§ (how many digits) and §gcd(a, b)§ (Euclid: gcd(a, 0) is a, otherwise gcd(b, a % b)). Expected: §5 6§.",
        "expected": "5 6",
        "starter": "public class Main {\n    static int digitCount(int n) {\n        // TODO\n        return 0;\n    }\n\n    static int gcd(int a, int b) {\n        // TODO\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(digitCount(12345) + \" \" + gcd(48, 18));\n    }\n}\n",
        "solution": "public class Main {\n    static int digitCount(int n) {\n        if (n < 10) {\n            return 1;\n        }\n        return 1 + digitCount(n / 10);\n    }\n\n    static int gcd(int a, int b) {\n        if (b == 0) {\n            return a;\n        }\n        return gcd(b, a % b);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(digitCount(12345) + \" \" + gcd(48, 18));\n    }\n}\n",
        "hint": "digitCount: a one-digit number has 1 digit; otherwise 1 plus the count for n / 10."
      },
      {
        "type": "code",
        "id": "4-58-count-target",
        "prompt": "Count target in a from index through the end. index begins at zero; the empty suffix contributes zero.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int count(int[] a,int target,int index) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(count(new int[]{2,1,2,2},2,0));System.out.println(count(new int[]{},2,0));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int count(int[] a,int target,int index) {\nif(index==a.length)return 0;return (a[index]==target?1:0)+count(a,target,index+1);\n}\npublic static void main(String[] args) {\nSystem.out.println(count(new int[]{2,1,2,2},2,0));System.out.println(count(new int[]{},2,0));\n}\n}\n",
        "expected": "3\n0"
      },
      {
        "type": "code",
        "id": "4-58-paths",
        "prompt": "A traveler moves only right or down in a rows by cols grid. Count routes from top-left to bottom-right recursively; both dimensions are positive. Restrict test sizes to avoid overflow and excessive repeated work.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int paths(int rows,int cols) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(paths(3,3));System.out.println(paths(1,5));System.out.println(paths(2,4));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int paths(int rows,int cols) {\nif(rows==1||cols==1)return 1;return paths(rows-1,cols)+paths(rows,cols-1);\n}\npublic static void main(String[] args) {\nSystem.out.println(paths(3,3));System.out.println(paths(1,5));System.out.println(paths(2,4));\n}\n}\n",
        "expected": "6\n1\n4"
      }
    ]
  },
  {
    "id": "4-59",
    "title": "Unit 4D - Recursion Exercises",
    "blocks": [
      {
        "type": "text",
        "md": "Diagnose contracts and then implement three recursive algorithms. For each, describe the base case, the decreasing quantity, and when work happens relative to recursive calls. Compare complexity rather than assuming all recursive methods behave alike."
      },
      {
        "type": "code",
        "id": "4-59-remove-letter",
        "prompt": "Return a String omitting every occurrence of the one-character target. Use recursion and preserve remaining order.",
        "starter": "import java.util.*;\npublic class Main {\nstatic String remove(String s,char target) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(remove(\"banana\",'a'));System.out.println(\"[\"+remove(\"aaa\",'a')+\"]\");\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic String remove(String s,char target) {\nif(s.length()==0)return \"\";String rest=remove(s.substring(1),target);return s.charAt(0)==target?rest:s.substring(0,1)+rest;\n}\npublic static void main(String[] args) {\nSystem.out.println(remove(\"banana\",'a'));System.out.println(\"[\"+remove(\"aaa\",'a')+\"]\");\n}\n}\n",
        "expected": "bnn\n[]"
      },
      {
        "type": "code",
        "id": "4-59-minrange",
        "prompt": "Return the minimum over inclusive valid bounds low..high without modifying the array. Divide the range into two nonempty halves until one element remains.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int min(int[] a,int low,int high) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(min(new int[]{4,-7,3,-2},0,3));System.out.println(min(new int[]{9},0,0));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int min(int[] a,int low,int high) {\nif(low==high)return a[low];int mid=low+(high-low)/2;return Math.min(min(a,low,mid),min(a,mid+1,high));\n}\npublic static void main(String[] args) {\nSystem.out.println(min(new int[]{4,-7,3,-2},0,3));System.out.println(min(new int[]{9},0,0));\n}\n}\n",
        "expected": "-7\n9"
      },
      {
        "type": "code",
        "id": "4-59-digits-binary",
        "prompt": "Return the binary representation of nonnegative n, including \"0\" for zero. Recursively represent n/2 before appending n%2.",
        "starter": "import java.util.*;\npublic class Main {\nstatic String binaryString(int n) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nSystem.out.println(binaryString(13));System.out.println(binaryString(0));System.out.println(binaryString(8));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic String binaryString(int n) {\nif(n<2)return \"\"+n;return binaryString(n/2)+(n%2);\n}\npublic static void main(String[] args) {\nSystem.out.println(binaryString(13));System.out.println(binaryString(0));System.out.println(binaryString(8));\n}\n}\n",
        "expected": "1101\n0\n1000"
      },
      {
        "type": "quiz",
        "id": "4-59-reason1",
        "question": "What does return n+sum(n-1) need when n starts nonnegative?",
        "choices": [
          "A base case at n==0",
          "A larger n each call",
          "A random return value",
          "An array parameter"
        ],
        "answer": 0,
        "explanation": "Decreasing nonnegative n reaches zero."
      },
      {
        "type": "quiz",
        "id": "4-59-reason2",
        "question": "A print occurs after a recursive call on n-1. In what order do values 1..n print?",
        "choices": [
          "Descending",
          "Ascending",
          "Random",
          "Nothing"
        ],
        "answer": 1,
        "explanation": "The smallest unfinished call resumes first."
      },
      {
        "type": "quiz",
        "id": "4-59-reason3",
        "question": "Which recursive binary-search interval is empty when bounds are inclusive?",
        "choices": [
          "low==high",
          "low>high",
          "low==0",
          "high==a.length-1"
        ],
        "answer": 1,
        "explanation": "One element remains when low equals high; none remain when they cross."
      },
      {
        "type": "quiz",
        "id": "4-59-reason4",
        "question": "Why can a recursive merge sort use a temporary array?",
        "choices": [
          "To keep sorted halves available while merging",
          "To avoid all comparisons",
          "To remove the base case",
          "To change the input type"
        ],
        "answer": 0,
        "explanation": "Writing into the destination must not destroy unread source values."
      },
      {
        "type": "quiz",
        "id": "4-59-reason5",
        "question": "What is the time complexity of a simple recursion with one call on n-1 and constant local work?",
        "choices": [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n squared)"
        ],
        "answer": 2,
        "explanation": "There is one constant-work frame per decrement."
      }
    ]
  }
];
