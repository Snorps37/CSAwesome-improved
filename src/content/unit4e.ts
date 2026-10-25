import type { Lesson } from './types';

// Original explanations and executable practice; no external classroom assets required.
export const unit4e: Lesson[] = [
  {
    "id": "4-31",
    "title": "Unit 4B - ArrayList Summary",
    "blocks": [
      {
        "type": "text",
        "md": "ArrayList is a resizable collection of object references. Use a wrapper such as Integer for numeric elements. Autoboxing turns a primitive into its wrapper; unboxing retrieves the primitive for arithmetic. Null cannot be unboxed. Prefer content comparisons with equals for Strings and wrappers.\n\nDistinguish replacement from insertion: set(i,value) replaces and returns the previous item; add(i,value) shifts items right and increases size; remove(i) shifts later items left and returns the removed item. The legal insertion range includes size(), while get, set, and remove by index require an index below size().\n\nFor removal, traverse backward or increment a forward index only when no removal occurs. Structural changes during an enhanced for loop are unsafe. For a filter that preserves input, append matches to a separate result. For ordered insertion, find a position using comparisons before changing the list.\n\nChoose an ArrayList when membership changes; choose an array for a fixed primitive table. Both use references, so assigning a collection variable does not create an independent copy. A new list copied from another contains the same element references unless each element is separately copied."
      },
      {
        "type": "quiz",
        "id": "4-31-review1",
        "question": "Which declaration compiles?",
        "choices": [
          "ArrayList<int> a=new ArrayList<int>();",
          "ArrayList<Integer> a=new ArrayList<Integer>();",
          "ArrayList a = new int[3];",
          "int a = new ArrayList<Integer>();"
        ],
        "answer": 1,
        "explanation": "Generic type arguments must be reference types."
      },
      {
        "type": "quiz",
        "id": "4-31-review2",
        "question": "After adding 4, 7, 9 then calling list.set(1,2), what is the list?",
        "choices": [
          "[4, 2, 9]",
          "[4, 2, 7, 9]",
          "[2, 7, 9]",
          "[4, 7]"
        ],
        "answer": 0,
        "explanation": "set replaces an element without changing the size."
      },
      {
        "type": "quiz",
        "id": "4-31-review3",
        "question": "After adding \"A\", \"B\", \"C\", what does list.remove(1) return?",
        "choices": [
          "1",
          "\"A\"",
          "\"B\"",
          "true"
        ],
        "answer": 2,
        "explanation": "Removing by index returns the removed element."
      },
      {
        "type": "code",
        "id": "4-31-dedupe",
        "prompt": "Remove adjacent duplicates from a sorted list in place. Preserve one copy of each value.",
        "starter": "import java.util.*;\npublic class Main {\nstatic void dedupe(ArrayList<Integer> a) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nArrayList<Integer> a=new ArrayList<>(Arrays.asList(1,1,2,2,2,5));dedupe(a);System.out.println(a);ArrayList<Integer> e=new ArrayList<>();dedupe(e);System.out.println(e);\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic void dedupe(ArrayList<Integer> a) {\nfor(int i=a.size()-1;i>0;i--)if(a.get(i).equals(a.get(i-1)))a.remove(i);\n}\npublic static void main(String[] args) {\nArrayList<Integer> a=new ArrayList<>(Arrays.asList(1,1,2,2,2,5));dedupe(a);System.out.println(a);ArrayList<Integer> e=new ArrayList<>();dedupe(e);System.out.println(e);\n}\n}\n",
        "expected": "[1, 2, 5]\n[]"
      }
    ]
  },
  {
    "id": "4-32",
    "title": "Unit 4B - Toggle Code Practice 4b ArrayList (4.7-4.10)",
    "blocks": [
      {
        "type": "text",
        "md": "Reconstruct each algorithm from its unordered operations. Think about which indexes shift after each operation and whether the loop sees a fixed or changing size. Implement rather than hard-code the sample output."
      },
      {
        "type": "code",
        "id": "4-32-remove-order",
        "prompt": "Order the operations: test get(i)<0; remove(i); loop i from size()-1 down to zero.",
        "starter": "import java.util.*;\npublic class Main {\nstatic void removeNegative(ArrayList<Integer> a) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nArrayList<Integer> a=new ArrayList<>(Arrays.asList(-2,-3,4,-1));removeNegative(a);System.out.println(a);\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic void removeNegative(ArrayList<Integer> a) {\nfor(int i=a.size()-1;i>=0;i--)if(a.get(i)<0)a.remove(i);\n}\npublic static void main(String[] args) {\nArrayList<Integer> a=new ArrayList<>(Arrays.asList(-2,-3,4,-1));removeNegative(a);System.out.println(a);\n}\n}\n",
        "expected": "[4]"
      },
      {
        "type": "code",
        "id": "4-32-insert-order",
        "prompt": "Order the operations: initialize i=0; advance while existing value <= target; add at i. Insert after existing equal values in sorted input.",
        "starter": "import java.util.*;\npublic class Main {\nstatic void insert(ArrayList<Integer> a,int target) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nArrayList<Integer> a=new ArrayList<>(Arrays.asList(1,3,3,7));insert(a,3);System.out.println(a);ArrayList<Integer> e=new ArrayList<>();insert(e,2);System.out.println(e);\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic void insert(ArrayList<Integer> a,int target) {\nint i=0;while(i<a.size()&&a.get(i)<=target)i++;a.add(i,target);\n}\npublic static void main(String[] args) {\nArrayList<Integer> a=new ArrayList<>(Arrays.asList(1,3,3,7));insert(a,3);System.out.println(a);ArrayList<Integer> e=new ArrayList<>();insert(e,2);System.out.println(e);\n}\n}\n",
        "expected": "[1, 3, 3, 3, 7]\n[2]"
      },
      {
        "type": "code",
        "id": "4-32-filter-order",
        "prompt": "Order: allocate result; loop over source; test String length; add matches; return result. Retain words with length at least min.",
        "starter": "import java.util.*;\npublic class Main {\nstatic ArrayList<String> filter(ArrayList<String> source,int min) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nArrayList<String> a=new ArrayList<>(Arrays.asList(\"a\",\"map\",\"table\"));System.out.println(filter(a,3));System.out.println(a);\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic ArrayList<String> filter(ArrayList<String> source,int min) {\nArrayList<String> result=new ArrayList<>();for(String s:source)if(s.length()>=min)result.add(s);return result;\n}\npublic static void main(String[] args) {\nArrayList<String> a=new ArrayList<>(Arrays.asList(\"a\",\"map\",\"table\"));System.out.println(filter(a,3));System.out.println(a);\n}\n}\n",
        "expected": "[map, table]\n[a, map, table]"
      }
    ]
  },
  {
    "id": "4-33",
    "title": "Unit 4B - Code Practice with ArrayLists",
    "blocks": [
      {
        "type": "text",
        "md": "Implement independent list-processing methods. Preserve the original where requested and test repeated values, empty lists, and multiple consecutive matches."
      },
      {
        "type": "code",
        "id": "4-33-cp-short",
        "prompt": "**Remove short words.** Remove every word with 3 or fewer letters from the list. Expected: §[planet, castle, river]§.",
        "expected": "[planet, castle, river]",
        "starter": "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> words = new ArrayList<String>();\n        String[] data = {\"planet\", \"sun\", \"castle\", \"of\", \"river\", \"a\"};\n        for (String s : data) {\n            words.add(s);\n        }\n        // TODO\n        System.out.println(words);\n    }\n}\n",
        "solution": "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> words = new ArrayList<String>();\n        String[] data = {\"planet\", \"sun\", \"castle\", \"of\", \"river\", \"a\"};\n        for (String s : data) {\n            words.add(s);\n        }\n        for (int i = words.size() - 1; i >= 0; i--) {\n            if (words.get(i).length() <= 3) {\n                words.remove(i);\n            }\n        }\n        System.out.println(words);\n    }\n}\n",
        "hint": "Loop backward so removal does not skip any word."
      },
      {
        "type": "code",
        "id": "4-33-cp-running",
        "prompt": "**Running totals.** Build a new list where each item is the sum of all items up to that position. Expected: §[1, 3, 6, 10]§.",
        "expected": "[1, 3, 6, 10]",
        "starter": "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> nums = new ArrayList<Integer>();\n        nums.add(1);\n        nums.add(2);\n        nums.add(3);\n        nums.add(4);\n        ArrayList<Integer> totals = new ArrayList<Integer>();\n        // TODO\n        System.out.println(totals);\n    }\n}\n",
        "solution": "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> nums = new ArrayList<Integer>();\n        nums.add(1);\n        nums.add(2);\n        nums.add(3);\n        nums.add(4);\n        ArrayList<Integer> totals = new ArrayList<Integer>();\n        int running = 0;\n        for (int v : nums) {\n            running += v;\n            totals.add(running);\n        }\n        System.out.println(totals);\n    }\n}\n",
        "hint": "Keep a running sum and add it to totals after every item."
      },
      {
        "type": "code",
        "id": "4-33-interleave",
        "prompt": "Return a new list alternating items from a and b, beginning with a. Append leftover items from the longer list.",
        "starter": "import java.util.*;\npublic class Main {\nstatic ArrayList<String> interleave(ArrayList<String> a,ArrayList<String> b) {\n// TODO: implement the specified algorithm\nthrow new UnsupportedOperationException(\"Implement this method\");\n}\npublic static void main(String[] args) {\nArrayList<String> a=new ArrayList<>(Arrays.asList(\"A\",\"B\",\"C\"));ArrayList<String> b=new ArrayList<>(Arrays.asList(\"x\"));System.out.println(interleave(a,b));System.out.println(interleave(new ArrayList<>(),b));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic ArrayList<String> interleave(ArrayList<String> a,ArrayList<String> b) {\nArrayList<String> result=new ArrayList<>();for(int i=0;i<a.size()||i<b.size();i++){if(i<a.size())result.add(a.get(i));if(i<b.size())result.add(b.get(i));}return result;\n}\npublic static void main(String[] args) {\nArrayList<String> a=new ArrayList<>(Arrays.asList(\"A\",\"B\",\"C\"));ArrayList<String> b=new ArrayList<>(Arrays.asList(\"x\"));System.out.println(interleave(a,b));System.out.println(interleave(new ArrayList<>(),b));\n}\n}\n",
        "expected": "[A, x, B, C]\n[x]"
      }
    ]
  },
  {
    "id": "4-34",
    "title": "Unit 4B - ArrayList Multiple-Choice Exercises",
    "blocks": [
      {
        "type": "text",
        "md": "Work each operation in sequence and record the size after insertion or removal. For wrapper questions, identify when Java boxes or unboxes."
      },
      {
        "type": "quiz",
        "id": "4-34-mc1",
        "question": "Which declaration compiles?",
        "choices": [
          "ArrayList<int> a=new ArrayList<int>();",
          "ArrayList<Integer> a=new ArrayList<Integer>();",
          "ArrayList a = new int[3];",
          "int a = new ArrayList<Integer>();"
        ],
        "answer": 1,
        "explanation": "Generic type arguments must be reference types."
      },
      {
        "type": "quiz",
        "id": "4-34-mc2",
        "question": "After adding 4, 7, 9 then calling list.set(1,2), what is the list?",
        "choices": [
          "[4, 2, 9]",
          "[4, 2, 7, 9]",
          "[2, 7, 9]",
          "[4, 7]"
        ],
        "answer": 0,
        "explanation": "set replaces an element without changing the size."
      },
      {
        "type": "quiz",
        "id": "4-34-mc3",
        "question": "After adding \"A\", \"B\", \"C\", what does list.remove(1) return?",
        "choices": [
          "1",
          "\"A\"",
          "\"B\"",
          "true"
        ],
        "answer": 2,
        "explanation": "Removing by index returns the removed element."
      },
      {
        "type": "quiz",
        "id": "4-34-mc4",
        "question": "Why does backward traversal help when removing matches?",
        "choices": [
          "It prevents removed elements from shifting",
          "Only already-visited higher indexes shift",
          "It sorts the values",
          "It eliminates all bounds checks"
        ],
        "answer": 1,
        "explanation": "Unvisited lower indexes retain their positions."
      },
      {
        "type": "quiz",
        "id": "4-34-mc5",
        "question": "What is printed? Integer x=7; System.out.println(x+2);",
        "choices": [
          "72",
          "9",
          "null",
          "A compile error"
        ],
        "answer": 1,
        "explanation": "Arithmetic unboxes Integer to int."
      },
      {
        "type": "quiz",
        "id": "4-34-mc6",
        "question": "For ArrayList<Integer> list containing [1,2,1], which removes the first value 1?",
        "choices": [
          "list.remove(1);",
          "list.remove(Integer.valueOf(1));",
          "list.set(1);",
          "list.removeAll(1);"
        ],
        "answer": 1,
        "explanation": "An Integer argument selects the object overload; int selects an index."
      },
      {
        "type": "quiz",
        "id": "4-34-mc7",
        "question": "Which is the last legal index in a nonempty list?",
        "choices": [
          "list.length-1",
          "list.size()",
          "list.size()-1",
          "list.length()"
        ],
        "answer": 2,
        "explanation": "size() counts elements; indexes begin at zero."
      },
      {
        "type": "quiz",
        "id": "4-34-mc8",
        "question": "A filter must preserve the original list. Which operation belongs in the traversal?",
        "choices": [
          "source.remove(i)",
          "result.add(source.get(i)) for each match",
          "source.clear()",
          "source.set(i,null)"
        ],
        "answer": 1,
        "explanation": "Accumulate selected references in a separate list."
      },
      {
        "type": "quiz",
        "id": "4-34-mc9",
        "question": "What happens when a null Integer is used in arithmetic?",
        "choices": [
          "It becomes 0",
          "It becomes -1",
          "Unboxing throws NullPointerException",
          "It always fails to compile"
        ],
        "answer": 2,
        "explanation": "Unboxing requires an actual wrapper object."
      },
      {
        "type": "quiz",
        "id": "4-34-mc10",
        "question": "Two variables reference the same ArrayList. One adds an element. What does the other observe?",
        "choices": [
          "An unchanged copy",
          "The same increased size",
          "A compiler error",
          "An empty list"
        ],
        "answer": 1,
        "explanation": "Reference assignment aliases the same mutable object."
      }
    ]
  },
  {
    "id": "4-35",
    "title": "Unit 4B - Free Response Question (FRQ) 3 - ItemInventory",
    "blocks": [
      {
        "type": "text",
        "md": "An inventory contains Item objects with a non-null name and nonnegative count. Part (a): restock(name,amount) adds amount to the first matching item; if no match exists, append a new item. amount is positive and stored names are unique. Part (b): removeEmpty removes all zero-count items and returns how many were removed. Preserve relative order and use equals for names.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-35-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic class Item {String name;int count;Item(String n,int c){name=n;count=c;}}\nstatic class ItemInventory {ArrayList<Item> items;ItemInventory(ArrayList<Item> a){items=a;}void restock(String name,int amount){throw new UnsupportedOperationException();}\nint removeEmpty(){throw new UnsupportedOperationException();}}\npublic static void main(String[] args) {\nItemInventory i=new ItemInventory(new ArrayList<>(Arrays.asList(new Item(\"pen\",0),new Item(\"pad\",0),new Item(\"clip\",3))));i.restock(\"clip\",2);i.restock(\"ink\",4);System.out.println(i.removeEmpty());for(Item x:i.items)System.out.println(x.name+\":\"+x.count);System.out.println(i.removeEmpty());\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic class Item {String name;int count;Item(String n,int c){name=n;count=c;}}\nstatic class ItemInventory {ArrayList<Item> items;ItemInventory(ArrayList<Item> a){items=a;}void restock(String name,int amount){for(Item x:items)if(x.name.equals(name)){x.count+=amount;return;}items.add(new Item(name,amount));}\nint removeEmpty(){int n=0;for(int k=items.size()-1;k>=0;k--)if(items.get(k).count==0){items.remove(k);n++;}return n;}}\npublic static void main(String[] args) {\nItemInventory i=new ItemInventory(new ArrayList<>(Arrays.asList(new Item(\"pen\",0),new Item(\"pad\",0),new Item(\"clip\",3))));i.restock(\"clip\",2);i.restock(\"ink\",4);System.out.println(i.removeEmpty());for(Item x:i.items)System.out.println(x.name+\":\"+x.count);System.out.println(i.removeEmpty());\n}\n}\n",
        "expected": "2\nclip:5\nink:4\n0"
      }
    ]
  },
  {
    "id": "4-36",
    "title": "Unit 4B - Free Response - Climbing Club A",
    "blocks": [
      {
        "type": "text",
        "md": "ClimbingClub stores ClimbInfo records in the order entered. Part (a): addClimb(peak,time) appends a record, even if that peak already occurs. Part (b): totalTime sums all climb times. peak is non-null and time is positive. An empty club has total time zero. This version intentionally retains repeated ascents as separate records.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-36-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic class ClimbInfo {String peak;int time;ClimbInfo(String p,int t){peak=p;time=t;}public String toString(){return peak+\":\"+time;}}\nstatic class ClimbingClub {ArrayList<ClimbInfo> climbs=new ArrayList<>();void addClimb(String peak,int time){throw new UnsupportedOperationException();}int totalTime(){throw new UnsupportedOperationException();}}\npublic static void main(String[] args) {\nClimbingClub c=new ClimbingClub();System.out.println(c.totalTime());c.addClimb(\"Cedar\",45);c.addClimb(\"Aspen\",60);c.addClimb(\"Cedar\",40);System.out.println(c.climbs);System.out.println(c.totalTime());\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic class ClimbInfo {String peak;int time;ClimbInfo(String p,int t){peak=p;time=t;}public String toString(){return peak+\":\"+time;}}\nstatic class ClimbingClub {ArrayList<ClimbInfo> climbs=new ArrayList<>();void addClimb(String peak,int time){climbs.add(new ClimbInfo(peak,time));}int totalTime(){int total=0;for(ClimbInfo c:climbs)total+=c.time;return total;}}\npublic static void main(String[] args) {\nClimbingClub c=new ClimbingClub();System.out.println(c.totalTime());c.addClimb(\"Cedar\",45);c.addClimb(\"Aspen\",60);c.addClimb(\"Cedar\",40);System.out.println(c.climbs);System.out.println(c.totalTime());\n}\n}\n",
        "expected": "0\n[Cedar:45, Aspen:60, Cedar:40]\n145"
      }
    ]
  },
  {
    "id": "4-37",
    "title": "Unit 4B - Free Response - Climbing Club B",
    "blocks": [
      {
        "type": "text",
        "md": "This club keeps its records in increasing lexicographic order by peak name. Part (a): addClimb inserts a new record after all existing records for the same peak. Part (b): bestTime(peak) returns the smallest time for that peak or -1 when absent. Times are positive. Preserve every ascent and maintain the sorted-order invariant after each insertion.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-37-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic class ClimbInfo {String peak;int time;ClimbInfo(String p,int t){peak=p;time=t;}public String toString(){return peak+\":\"+time;}}\nstatic class ClimbingClub {ArrayList<ClimbInfo> climbs=new ArrayList<>();void addClimb(String peak,int time){throw new UnsupportedOperationException();}int bestTime(String peak){throw new UnsupportedOperationException();}}\npublic static void main(String[] args) {\nClimbingClub c=new ClimbingClub();c.addClimb(\"Pine\",50);c.addClimb(\"Aspen\",70);c.addClimb(\"Pine\",45);c.addClimb(\"Cedar\",60);System.out.println(c.climbs);System.out.println(c.bestTime(\"Pine\"));System.out.println(c.bestTime(\"Oak\"));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic class ClimbInfo {String peak;int time;ClimbInfo(String p,int t){peak=p;time=t;}public String toString(){return peak+\":\"+time;}}\nstatic class ClimbingClub {ArrayList<ClimbInfo> climbs=new ArrayList<>();void addClimb(String peak,int time){int i=0;while(i<climbs.size()&&climbs.get(i).peak.compareTo(peak)<=0)i++;climbs.add(i,new ClimbInfo(peak,time));}int bestTime(String peak){int best=-1;for(ClimbInfo c:climbs)if(c.peak.equals(peak)&&(best<0||c.time<best))best=c.time;return best;}}\npublic static void main(String[] args) {\nClimbingClub c=new ClimbingClub();c.addClimb(\"Pine\",50);c.addClimb(\"Aspen\",70);c.addClimb(\"Pine\",45);c.addClimb(\"Cedar\",60);System.out.println(c.climbs);System.out.println(c.bestTime(\"Pine\"));System.out.println(c.bestTime(\"Oak\"));\n}\n}\n",
        "expected": "[Aspen:70, Cedar:60, Pine:50, Pine:45]\n45\n-1"
      }
    ]
  },
  {
    "id": "4-38",
    "title": "Unit 4B - Free Response - Climbing Club C",
    "blocks": [
      {
        "type": "text",
        "md": "A club stores climb records sorted by peak name, so repeated peaks are adjacent. Part (a): distinctPeakNames counts the number of different peaks in one traversal without another collection. Part (b): removePeak(name) removes every record for that peak and returns the number removed. Preserve the order of all other records. Empty input and consecutive matches must work.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-38-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic class ClimbInfo {String peak;int time;ClimbInfo(String p,int t){peak=p;time=t;}public String toString(){return peak+\":\"+time;}}\nstatic class ClimbingClub {ArrayList<ClimbInfo> climbs=new ArrayList<>();int distinctPeakNames(){throw new UnsupportedOperationException();}int removePeak(String name){throw new UnsupportedOperationException();}}\npublic static void main(String[] args) {\nClimbingClub c=new ClimbingClub();c.climbs.addAll(Arrays.asList(new ClimbInfo(\"Ash\",10),new ClimbInfo(\"Ash\",12),new ClimbInfo(\"Pine\",20)));System.out.println(c.distinctPeakNames());System.out.println(c.removePeak(\"Ash\"));System.out.println(c.climbs);System.out.println(new ClimbingClub().distinctPeakNames());\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic class ClimbInfo {String peak;int time;ClimbInfo(String p,int t){peak=p;time=t;}public String toString(){return peak+\":\"+time;}}\nstatic class ClimbingClub {ArrayList<ClimbInfo> climbs=new ArrayList<>();int distinctPeakNames(){int count=0;for(int i=0;i<climbs.size();i++)if(i==0||!climbs.get(i).peak.equals(climbs.get(i-1).peak))count++;return count;}int removePeak(String name){int removed=0;for(int i=climbs.size()-1;i>=0;i--)if(climbs.get(i).peak.equals(name)){climbs.remove(i);removed++;}return removed;}}\npublic static void main(String[] args) {\nClimbingClub c=new ClimbingClub();c.climbs.addAll(Arrays.asList(new ClimbInfo(\"Ash\",10),new ClimbInfo(\"Ash\",12),new ClimbInfo(\"Pine\",20)));System.out.println(c.distinctPeakNames());System.out.println(c.removePeak(\"Ash\"));System.out.println(c.climbs);System.out.println(new ClimbingClub().distinctPeakNames());\n}\n}\n",
        "expected": "2\n2\n[Pine:20]\n0"
      }
    ]
  },
  {
    "id": "4-39",
    "title": "Unit 4B - Free Response - CookieOrder A",
    "blocks": [
      {
        "type": "text",
        "md": "CookieOrder describes a variety and a positive box count. MasterOrder holds an ArrayList of orders. Part (a): addOrder appends the supplied order reference. Part (b): getTotalBoxes totals box counts across all orders, including repeated varieties. Do not merge or remove orders in this part. An empty master order has zero boxes.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-39-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic class CookieOrder {String variety;int boxes;CookieOrder(String v,int b){variety=v;boxes=b;}}\nstatic class MasterOrder {ArrayList<CookieOrder> orders=new ArrayList<>();void addOrder(CookieOrder o){throw new UnsupportedOperationException();}int getTotalBoxes(){throw new UnsupportedOperationException();}}\npublic static void main(String[] args) {\nMasterOrder m=new MasterOrder();System.out.println(m.getTotalBoxes());m.addOrder(new CookieOrder(\"oat\",3));m.addOrder(new CookieOrder(\"cocoa\",5));m.addOrder(new CookieOrder(\"oat\",2));System.out.println(m.getTotalBoxes());System.out.println(m.orders.size());\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic class CookieOrder {String variety;int boxes;CookieOrder(String v,int b){variety=v;boxes=b;}}\nstatic class MasterOrder {ArrayList<CookieOrder> orders=new ArrayList<>();void addOrder(CookieOrder o){orders.add(o);}int getTotalBoxes(){int total=0;for(CookieOrder o:orders)total+=o.boxes;return total;}}\npublic static void main(String[] args) {\nMasterOrder m=new MasterOrder();System.out.println(m.getTotalBoxes());m.addOrder(new CookieOrder(\"oat\",3));m.addOrder(new CookieOrder(\"cocoa\",5));m.addOrder(new CookieOrder(\"oat\",2));System.out.println(m.getTotalBoxes());System.out.println(m.orders.size());\n}\n}\n",
        "expected": "0\n10\n3"
      }
    ]
  },
  {
    "id": "4-40",
    "title": "Unit 4B - Free Response - CookieOrder B",
    "blocks": [
      {
        "type": "text",
        "md": "Complete removeVariety(variety) in MasterOrder. Part (a): remove every order with the specified variety and return the total number of boxes removed, not the number of orders. Part (b): preserve the relative order of the remaining orders. Matching orders may be consecutive, and the variety may be absent. Compare String contents.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-40-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic class CookieOrder {String variety;int boxes;CookieOrder(String v,int b){variety=v;boxes=b;}}\nstatic class MasterOrder {ArrayList<CookieOrder> orders=new ArrayList<>();int removeVariety(String variety){throw new UnsupportedOperationException();}}\npublic static void main(String[] args) {\nMasterOrder m=new MasterOrder();m.orders.addAll(Arrays.asList(new CookieOrder(\"oat\",3),new CookieOrder(\"oat\",2),new CookieOrder(\"mint\",4)));System.out.println(m.removeVariety(\"oat\"));System.out.println(m.orders.size()+\" \"+m.orders.get(0).variety);System.out.println(m.removeVariety(\"oat\"));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic class CookieOrder {String variety;int boxes;CookieOrder(String v,int b){variety=v;boxes=b;}}\nstatic class MasterOrder {ArrayList<CookieOrder> orders=new ArrayList<>();int removeVariety(String variety){int boxes=0;for(int i=orders.size()-1;i>=0;i--)if(orders.get(i).variety.equals(variety)){boxes+=orders.get(i).boxes;orders.remove(i);}return boxes;}}\npublic static void main(String[] args) {\nMasterOrder m=new MasterOrder();m.orders.addAll(Arrays.asList(new CookieOrder(\"oat\",3),new CookieOrder(\"oat\",2),new CookieOrder(\"mint\",4)));System.out.println(m.removeVariety(\"oat\"));System.out.println(m.orders.size()+\" \"+m.orders.get(0).variety);System.out.println(m.removeVariety(\"oat\"));\n}\n}\n",
        "expected": "5\n1 mint\n0"
      }
    ]
  },
  {
    "id": "4-41",
    "title": "Unit 4B - Free Response - StringFormatter A",
    "blocks": [
      {
        "type": "text",
        "md": "A formatter receives at least two non-null words containing no spaces. Part (a): totalLetters returns the sum of their lengths. Part (b): basicGapWidth(words,width) returns the number of spaces guaranteed in each interword gap when the line is expanded to width. Use integer division of available spaces by the number of gaps. Assume width is at least totalLetters plus one space per gap. Do not count any leading or trailing spaces.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-41-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic int totalLetters(ArrayList<String> words){throw new UnsupportedOperationException();}\nstatic int basicGapWidth(ArrayList<String> words,int width){throw new UnsupportedOperationException();}\npublic static void main(String[] args) {\nArrayList<String> w=new ArrayList<>(Arrays.asList(\"Data\",\"in\",\"Java\"));System.out.println(totalLetters(w));System.out.println(basicGapWidth(w,17));System.out.println(basicGapWidth(new ArrayList<>(Arrays.asList(\"a\",\"b\")),3));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic int totalLetters(ArrayList<String> words){int n=0;for(String s:words)n+=s.length();return n;}\nstatic int basicGapWidth(ArrayList<String> words,int width){return (width-totalLetters(words))/(words.size()-1);}\npublic static void main(String[] args) {\nArrayList<String> w=new ArrayList<>(Arrays.asList(\"Data\",\"in\",\"Java\"));System.out.println(totalLetters(w));System.out.println(basicGapWidth(w,17));System.out.println(basicGapWidth(new ArrayList<>(Arrays.asList(\"a\",\"b\")),3));\n}\n}\n",
        "expected": "10\n3\n1"
      }
    ]
  },
  {
    "id": "4-42",
    "title": "Unit 4B - Free Response - StringFormatter B",
    "blocks": [
      {
        "type": "text",
        "md": "Produce a fully justified line with no leading or trailing spaces. Part (a): format(words,width) distributes available spaces as evenly as possible across the gaps. If the division has a remainder, assign one extra space to each of the leftmost gaps until it is exhausted. Part (b): verify that the resulting length is exactly width and that the input list remains unchanged. Use at least two non-null words and enough width for one space per gap.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-42-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic String format(ArrayList<String> words,int width){throw new UnsupportedOperationException();}\npublic static void main(String[] args) {\nArrayList<String> a=new ArrayList<>(Arrays.asList(\"A\",\"BB\",\"C\"));String line=format(a,11);System.out.println(\"[\"+line+\"]\");System.out.println(line.length());System.out.println(a);System.out.println(\"[\"+format(new ArrayList<>(Arrays.asList(\"x\",\"y\")),3)+\"]\");\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic String format(ArrayList<String> words,int width){int letters=0;for(String word:words)letters+=word.length();int gaps=words.size()-1;int base=(width-letters)/gaps,extra=(width-letters)%gaps;String line=\"\";for(int i=0;i<words.size();i++){line+=words.get(i);if(i<gaps){int spaces=base+(i<extra?1:0);for(int k=0;k<spaces;k++)line+=\" \";}}return line;}\npublic static void main(String[] args) {\nArrayList<String> a=new ArrayList<>(Arrays.asList(\"A\",\"BB\",\"C\"));String line=format(a,11);System.out.println(\"[\"+line+\"]\");System.out.println(line.length());System.out.println(a);System.out.println(\"[\"+format(new ArrayList<>(Arrays.asList(\"x\",\"y\")),3)+\"]\");\n}\n}\n",
        "expected": "[A    BB   C]\n11\n[A, BB, C]\n[x y]"
      }
    ]
  },
  {
    "id": "4-43",
    "title": "Unit 4B - Free Response - Delimiters A",
    "blocks": [
      {
        "type": "text",
        "md": "A token sequence contains ordinary text along with one opening delimiter and one closing delimiter, such as \"<b>\" and \"</b>\". Part (a): getDelimitersList(tokens,open,close) returns a new list containing only tokens exactly equal to either delimiter, preserving order. Part (b): countOpen counts opening delimiters in the filtered list. Tokens that merely contain delimiter characters are ordinary text. All arguments are non-null.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-43-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic ArrayList<String> getDelimitersList(String[] tokens,String open,String close){throw new UnsupportedOperationException();}\nstatic int countOpen(ArrayList<String> tokens,String open){throw new UnsupportedOperationException();}\npublic static void main(String[] args) {\nString[] tokens={\"<b>\",\"word\",\"<b>text\",\"</b>\",\"<b>\"};ArrayList<String> d=getDelimitersList(tokens,\"<b>\",\"</b>\");System.out.println(d);System.out.println(countOpen(d,\"<b>\"));System.out.println(getDelimitersList(new String[]{\"plain\"},\"(\",\")\"));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic ArrayList<String> getDelimitersList(String[] tokens,String open,String close){ArrayList<String> result=new ArrayList<>();for(String s:tokens)if(s.equals(open)||s.equals(close))result.add(s);return result;}\nstatic int countOpen(ArrayList<String> tokens,String open){int n=0;for(String s:tokens)if(s.equals(open))n++;return n;}\npublic static void main(String[] args) {\nString[] tokens={\"<b>\",\"word\",\"<b>text\",\"</b>\",\"<b>\"};ArrayList<String> d=getDelimitersList(tokens,\"<b>\",\"</b>\");System.out.println(d);System.out.println(countOpen(d,\"<b>\"));System.out.println(getDelimitersList(new String[]{\"plain\"},\"(\",\")\"));\n}\n}\n",
        "expected": "[<b>, </b>, <b>]\n2\n[]"
      }
    ]
  },
  {
    "id": "4-44",
    "title": "Unit 4B - Free Response - Delimiters B",
    "blocks": [
      {
        "type": "text",
        "md": "Given a list containing only one type of opening or closing delimiter, decide whether it is balanced. Part (a): isBalanced returns false immediately if any prefix contains more closing than opening delimiters. Part (b): after the traversal, require equal totals. An empty list is balanced. This problem uses a single delimiter type, so a depth counter is sufficient; multiple delimiter types would require more state.\n\nPlan each part before writing code. State the precondition, identify the traversal bounds, and explain which values may change. The supplied main checks normal and boundary cases; extend it with another case before comparing your work with the reference."
      },
      {
        "type": "code",
        "id": "4-44-response",
        "prompt": "Complete the class skeleton. Implement the requested methods rather than replacing the main-driven checks. Preserve public signatures and the specified mutation behavior.",
        "starter": "import java.util.*;\npublic class Main {\nstatic boolean isBalanced(ArrayList<String> delimiters,String open){throw new UnsupportedOperationException();}\npublic static void main(String[] args) {\nSystem.out.println(isBalanced(new ArrayList<>(Arrays.asList(\"(\",\"(\",\")\",\")\")),\"(\"));System.out.println(isBalanced(new ArrayList<>(Arrays.asList(\")\",\"(\")),\"(\"));System.out.println(isBalanced(new ArrayList<>(Arrays.asList(\"(\")),\"(\"));System.out.println(isBalanced(new ArrayList<>(),\"(\"));\n}\n}\n",
        "solution": "import java.util.*;\npublic class Main {\nstatic boolean isBalanced(ArrayList<String> delimiters,String open){int depth=0;for(String token:delimiters){if(token.equals(open))depth++;else depth--;if(depth<0)return false;}return depth==0;}\npublic static void main(String[] args) {\nSystem.out.println(isBalanced(new ArrayList<>(Arrays.asList(\"(\",\"(\",\")\",\")\")),\"(\"));System.out.println(isBalanced(new ArrayList<>(Arrays.asList(\")\",\"(\")),\"(\"));System.out.println(isBalanced(new ArrayList<>(Arrays.asList(\"(\")),\"(\"));System.out.println(isBalanced(new ArrayList<>(),\"(\"));\n}\n}\n",
        "expected": "true\nfalse\nfalse\ntrue"
      }
    ]
  },
  {
    "id": "4-45",
    "title": "Unit 4D - Search/Sort Multiple-Choice Exercises",
    "blocks": [
      {
        "type": "text",
        "md": "Identify each algorithm by its invariant, not just its syntax. For search traces, write the inclusive interval before each probe. For sort traces, distinguish a completed outer pass from one inner comparison."
      },
      {
        "type": "quiz",
        "id": "4-45-mc1",
        "question": "Which precondition makes binary search valid?",
        "choices": [
          "All values are positive",
          "Values are sorted in the comparison order",
          "The length is even",
          "No values are duplicated"
        ],
        "answer": 1,
        "explanation": "The midpoint comparison can discard a half only when order is established."
      },
      {
        "type": "quiz",
        "id": "4-45-mc2",
        "question": "A binary search uses inclusive low and high. If a[mid] < target, what is the next low?",
        "choices": [
          "mid",
          "mid+1",
          "low+1",
          "high-1"
        ],
        "answer": 1,
        "explanation": "The midpoint and everything below it cannot contain the target."
      },
      {
        "type": "quiz",
        "id": "4-45-mc3",
        "question": "What should a linear search return when a target is absent and the contract uses -1?",
        "choices": [
          "0",
          "a.length",
          "-1",
          "The last value"
        ],
        "answer": 2,
        "explanation": "A sentinel index distinguishes absence from a valid position."
      },
      {
        "type": "quiz",
        "id": "4-45-mc4",
        "question": "After the first pass of selection sort on {5,3,4,1}, what is the array?",
        "choices": [
          "{1,3,4,5}",
          "{3,5,4,1}",
          "{1,5,3,4}",
          "{5,3,1,4}"
        ],
        "answer": 0,
        "explanation": "Select the global minimum and swap it into position zero."
      },
      {
        "type": "quiz",
        "id": "4-45-mc5",
        "question": "What invariant describes insertion sort before processing index i?",
        "choices": [
          "The whole array is sorted",
          "Indexes 0 through i-1 form a sorted prefix",
          "The suffix is sorted",
          "All elements are distinct"
        ],
        "answer": 1,
        "explanation": "The current key is inserted into the already sorted prefix."
      },
      {
        "type": "quiz",
        "id": "4-45-mc6",
        "question": "Which comparison allows insertion sort to keep equal items in original relative order?",
        "choices": [
          "Shift while previous > key",
          "Shift while previous >= key",
          "Always swap with the first item",
          "Use == only"
        ],
        "answer": 0,
        "explanation": "Strict comparison does not move an equal predecessor past the key."
      },
      {
        "type": "quiz",
        "id": "4-45-mc7",
        "question": "How many comparisons does a complete unsuccessful linear search of n elements make?",
        "choices": [
          "0",
          "1",
          "n",
          "n squared"
        ],
        "answer": 2,
        "explanation": "Every element must be checked in the worst case."
      },
      {
        "type": "quiz",
        "id": "4-45-mc8",
        "question": "For a standard binary search of 127 sorted elements, what is the maximum number of midpoint probes?",
        "choices": [
          "6",
          "7",
          "63",
          "127"
        ],
        "answer": 1,
        "explanation": "The sizes fall 127,63,31,15,7,3,1."
      },
      {
        "type": "quiz",
        "id": "4-45-mc9",
        "question": "Which algorithm guarantees O(n log n) time for sorting arbitrary input?",
        "choices": [
          "Selection sort",
          "Insertion sort",
          "Merge sort",
          "Linear search"
        ],
        "answer": 2,
        "explanation": "Merge sort has logarithmic levels and linear work at each level."
      },
      {
        "type": "quiz",
        "id": "4-45-mc10",
        "question": "Why does high=mid in a failed inclusive-range binary-search iteration risk nontermination?",
        "choices": [
          "It always sorts the array",
          "The interval may not shrink when mid equals high",
          "It removes the target",
          "It changes the element type"
        ],
        "answer": 1,
        "explanation": "Excluding an already examined midpoint ensures progress."
      }
    ]
  }
];
