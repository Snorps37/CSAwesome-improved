import type { Lesson, CodeBlock, QuizBlock, PredictBlock } from './types';

// Original console-based practice: no external lab framework is required.
const exercise = (id: string, prompt: string, main: string, classes: string, missing: string, expected: string): CodeBlock => {
  const solution = `public class Main { public static void main(String[] args) {\n${main}\n} }\n${classes}`;
  return { type: 'code', id, prompt, expected, solution,
    starter: solution.replace(missing, '// TODO: replace this comment with the missing members\n'),
    hint: 'Preserve the driver. Identify which state belongs to the parent, then match each overridden method signature.' };
};
const payClasses = `class Worker {
 private int base;
 public Worker(int base) { this.base = base; }
 public int pay() { return base; }
}
class Specialist extends Worker {
 private int bonus;
 public Specialist(int base, int bonus) { super(base); this.bonus = bonus; }
 @Override public int pay() { return super.pay() + bonus; }
}`;
export const summaryCode = exercise('u5-summary-pay', 'Synthesize the unit: implement Specialist with private bonus, a two-argument constructor, and pay(). The inherited base is private. Verify both a plain Worker and a Specialist through Worker references.',
`Worker[] team = { new Worker(40), new Specialist(40, 12) };
for (Worker w : team) System.out.println(w.pay());`, payClasses,
` private int bonus;
 public Specialist(int base, int bonus) { super(base); this.bonus = bonus; }
 @Override public int pay() { return super.pay() + bonus; }`, '40\n52');

const mixed1 = exercise('u5-mixed-ctor', `Reorder these constructor statements inside PremiumTicket(int price, int fee):

1. this.fee = fee;
2. super(price);

Then place the field declaration and total() override in the class. total() returns the parent total plus fee. Check constructor order before running.`,
`Ticket t = new PremiumTicket(18, 3); System.out.println(t.total());`,
`class Ticket { private int price; public Ticket(int p) { price = p; } public int total() { return price; } }
class PremiumTicket extends Ticket {
 private int fee;
 public PremiumTicket(int price, int fee) { super(price); this.fee = fee; }
 public int total() { return super.total() + fee; }
}`,
` private int fee;
 public PremiumTicket(int price, int fee) { super(price); this.fee = fee; }
 public int total() { return super.total() + fee; }`, '21');
const mixed2 = exercise('u5-mixed-dispatch', `Arrange the fragments into an override in PriorityJob, then complete the driver loop: (a) public String label() { (b) } (c) return "priority:" + super.label();. Each Job reference must invoke label() once; do not use casts.`,
`Job[] jobs = { new Job(), new PriorityJob() }; for (Job job : jobs) System.out.println(job.label());`,
`class Job { public String label() { return "job"; } }
class PriorityJob extends Job { public String label() { return "priority:" + super.label(); } }`,
`public String label() { return "priority:" + super.label(); }`, 'job\npriority:job');
const mixed3 = exercise('u5-mixed-equals', `Reconstruct Code.equals(Object other) using these decisions in order: reject non-Code objects; cast; compare text using String.equals. Include the public boolean method header and return statements. Confirm equal values in separate objects and rejection of another type.`,
`Code a = new Code("A7"); System.out.println(a.equals(new Code("A7"))); System.out.println(a.equals("A7")); System.out.println(a.equals(null));`,
`class Code {
 private String text;
 public Code(String text) { this.text = text; }
 @Override public boolean equals(Object other) {
  if (!(other instanceof Code)) return false;
  Code c = (Code) other;
  return text.equals(c.text);
 }
}`,
` @Override public boolean equals(Object other) {
  if (!(other instanceof Code)) return false;
  Code c = (Code) other;
  return text.equals(c.text);
 }`, 'true\nfalse\nfalse');
export const mixedPractice: Lesson = { id: '5-10', title: 'Mixed Up Code Practice', blocks: [
 {type:'text', md: 'Reconstruct each method from the supplied fragments. First determine the scope of every brace, then identify constructor calls, field assignments, and return expressions. A valid ordering must compile and satisfy the complete contract, rather than merely produce one matching line. After each check, explain which ordering constraints Java enforces and which follow from the problem specification.'}, mixed1, mixed2, mixed3
]};

const celebrityClasses = `class Celebrity {
 private String name;
 private String clue;
 public Celebrity(String name, String clue) { this.name = name; this.clue = clue; }
 public String getClue() { return clue; }
 public boolean matches(String guess) { return name.equalsIgnoreCase(guess.trim()); }
}
class Scientist extends Celebrity {
 private String field;
 public Scientist(String name, String clue, String field) { super(name, clue); this.field = field; }
 @Override public String getClue() { return field + ": " + super.getClue(); }
}`;
const lab1 = exercise('u5-celebrity-model', 'Step 1 — Model. Finish Celebrity: store a name and clue in private fields; getClue returns the clue; matches trims surrounding whitespace and compares the guess without case sensitivity. A blank or incorrect guess is false. The test uses a fictional profile so the program needs no external database.',
`Celebrity c = new Celebrity("Ari Stone", "Studies ocean currents");
System.out.println(c.getClue()); System.out.println(c.matches(" ari STONE ")); System.out.println(c.matches(""));`, celebrityClasses,
` private String name;
 private String clue;
 public Celebrity(String name, String clue) { this.name = name; this.clue = clue; }
 public String getClue() { return clue; }
 public boolean matches(String guess) { return name.equalsIgnoreCase(guess.trim()); }`, 'Studies ocean currents\ntrue\nfalse');
const lab2 = exercise('u5-celebrity-subclass', 'Step 2 — Specialize. Implement Scientist with a field, constructor, and getClue override that prefixes the field followed by a colon and space. Keep name matching inherited. Verify behavior through a Celebrity reference.',
`Celebrity c = new Scientist("Ari Stone", "Studies ocean currents", "Oceanography");
System.out.println(c.getClue()); System.out.println(c.matches("Ari Stone"));`, celebrityClasses,
` private String field;
 public Scientist(String name, String clue, String field) { super(name, clue); this.field = field; }
 @Override public String getClue() { return field + ": " + super.getClue(); }`, 'Oceanography: Studies ocean currents\ntrue');
const roundMethod = `public static int score(Celebrity[] profiles, String[] guesses) {
 int score = 0;
 for (int i = 0; i < profiles.length; i++) if (profiles[i].matches(guesses[i])) score++;
 return score;
}`;
const lab3: CodeBlock = {
 type:'code', id:'u5-celebrity-controller', prompt:'Step 3 — Control and test. Implement static score for equal-length arrays: each matching guess earns one point. Process all profiles polymorphically. Test a mixed round and an empty round. Then design a second specialized profile and discuss why score needs no changes.', expected:'2\n0',
 starter:`public class Main {\n// TODO: static int score(Celebrity[] profiles, String[] guesses)\npublic static void main(String[] args) {\nCelebrity[] profiles = {new Celebrity("Bo Vale", "Writes essays"), new Scientist("Ari Stone", "Studies currents", "Oceanography"), new Celebrity("Cam Reed", "Composes music")};\nSystem.out.println(score(profiles, new String[]{"Bo Vale", "wrong", " cam reed "}));\nSystem.out.println(score(new Celebrity[0], new String[0]));\n}}\n${celebrityClasses}`,
 solution:`public class Main {\n${roundMethod}\npublic static void main(String[] args) {\nCelebrity[] profiles = {new Celebrity("Bo Vale", "Writes essays"), new Scientist("Ari Stone", "Studies currents", "Oceanography"), new Celebrity("Cam Reed", "Composes music")};\nSystem.out.println(score(profiles, new String[]{"Bo Vale", "wrong", " cam reed "}));\nSystem.out.println(score(new Celebrity[0], new String[0]));\n}}\n${celebrityClasses}`,
};

const examA: QuizBlock[] = [
  {
    "type": "quiz",
    "id": "u5-examA-1",
    "question": "A has public int value(){return 2;}. B extends A and overrides value to return 5. What does A x = new B(); System.out.println(x.value()); print?",
    "choices": [
      "2",
      "5",
      "7",
      "Compilation fails"
    ],
    "answer": 1,
    "explanation": "The actual B object supplies the overridden instance method."
  },
  {
    "type": "quiz",
    "id": "u5-examA-2",
    "question": "Parent has only Parent(String s). Which Child constructor compiles?",
    "choices": [
      "public Child(){ }",
      "public Child(){ super(); }",
      "public Child(){ super(\"x\"); }",
      "public Child(){ Parent(\"x\"); }"
    ],
    "answer": 2,
    "explanation": "The explicit call must select an available Parent constructor."
  },
  {
    "type": "quiz",
    "id": "u5-examA-3",
    "question": "A Base variable refers to a Sub object. Only Sub declares extra(). Which call is rejected at compile time?",
    "choices": [
      "b.toString()",
      "b.equals(b)",
      "b.extra()",
      "((Sub)b).extra()"
    ],
    "answer": 2,
    "explanation": "Member availability is checked using the declared Base type."
  },
  {
    "type": "quiz",
    "id": "u5-examA-4",
    "question": "B extends A; C extends B. Which assignment requires no cast?",
    "choices": [
      "C x = new A();",
      "B x = new C();",
      "C x = new B();",
      "B x = new A();"
    ],
    "answer": 1,
    "explanation": "Every C is a B, so widening the reference is safe."
  },
  {
    "type": "quiz",
    "id": "u5-examA-5",
    "question": "A subclass needs the value of a private parent field. Which design preserves encapsulation?",
    "choices": [
      "Redeclare it with the same name",
      "Read it using super.field",
      "Call an accessible parent accessor",
      "Use a cast to access it"
    ],
    "answer": 2,
    "explanation": "An accessor exposes the permitted behavior without exposing storage."
  },
  {
    "type": "quiz",
    "id": "u5-examA-6",
    "question": "Parent declares public int size(). Which declaration overrides it?",
    "choices": [
      "public int size(int n)",
      "public double size()",
      "public int size()",
      "private int size()"
    ],
    "answer": 2,
    "explanation": "The same parameter list and compatible return type are required, and access cannot be narrowed."
  },
  {
    "type": "quiz",
    "id": "u5-examA-7",
    "question": "Base.label returns \"B\". Child.label returns super.label()+\"C\". What does new Child().label() return?",
    "choices": [
      "C",
      "BC",
      "CB",
      "Infinite recursion"
    ],
    "answer": 1,
    "explanation": "super.label explicitly invokes the inherited implementation before concatenation."
  },
  {
    "type": "quiz",
    "id": "u5-examA-8",
    "question": "Which model best justifies extends?",
    "choices": [
      "Schedule has an ArrayList of events",
      "Car has an Engine",
      "GraduateStudent is a Student",
      "School has Teachers"
    ],
    "answer": 2,
    "explanation": "A subclass must be usable wherever the superclass contract is expected."
  },
  {
    "type": "quiz",
    "id": "u5-examA-9",
    "question": "A class overrides public boolean equals(Code other), but not equals(Object). What happens through an Object reference?",
    "choices": [
      "The Code overload is always selected",
      "Object.equals is inherited",
      "The compiler rejects the class",
      "All Code objects compare equal"
    ],
    "answer": 1,
    "explanation": "equals(Code) overloads rather than overrides the Object signature."
  },
  {
    "type": "quiz",
    "id": "u5-examA-10",
    "question": "A[] a = {new A(), new B()}; B overrides run(). How should a client invoke the appropriate behavior?",
    "choices": [
      "for (A x : a) x.run();",
      "Cast every element to B",
      "Use only a[0].run()",
      "Declare run private in A"
    ],
    "answer": 0,
    "explanation": "An ordinary instance call dynamically dispatches for each element."
  },
  {
    "type": "quiz",
    "id": "u5-examA-11",
    "question": "A and B constructors print \"A\" and \"B\" respectively; B extends A and calls super(). What is the construction order for new B()?",
    "choices": [
      "B then A",
      "A then B",
      "B only",
      "Unspecified"
    ],
    "answer": 1,
    "explanation": "Superclass initialization completes before the subclass body."
  },
  {
    "type": "quiz",
    "id": "u5-examA-12",
    "question": "Which statement about constructors is correct?",
    "choices": [
      "They are inherited like methods",
      "They can be overridden",
      "Each class declares its own constructors",
      "Their return type is void"
    ],
    "answer": 2,
    "explanation": "Constructors are initialization routines without a return type, and are not inherited."
  },
  {
    "type": "quiz",
    "id": "u5-examA-13",
    "question": "Two distinct objects contain the same field values. The class does not override equals. What does a.equals(b) return?",
    "choices": [
      "true",
      "false",
      "A compile error",
      "It compares all fields"
    ],
    "answer": 1,
    "explanation": "Object.equals uses identity unless a class supplies value equality."
  },
  {
    "type": "quiz",
    "id": "u5-examA-14",
    "question": "An inherited Base.report() calls value(); Derived overrides value(). A Derived object executes report(). Which value() runs?",
    "choices": [
      "Base.value always",
      "Derived.value",
      "Neither method",
      "It depends on the reference variable name"
    ],
    "answer": 1,
    "explanation": "Calls made inside inherited instance methods still dispatch on the actual object."
  },
  {
    "type": "quiz",
    "id": "u5-examA-15",
    "question": "Which method is available through any non-null Object reference?",
    "choices": [
      "length()",
      "getName()",
      "toString()",
      "size()"
    ],
    "answer": 2,
    "explanation": "toString is declared by Object and may be overridden."
  },
  {
    "type": "quiz",
    "id": "u5-examA-16",
    "question": "Animal a = new Cat(); Dog d = (Dog)a; Cat and Dog are sibling subclasses. What happens?",
    "choices": [
      "A Dog is created",
      "ClassCastException at runtime",
      "The Cat changes class",
      "A safe assignment"
    ],
    "answer": 1,
    "explanation": "A cast cannot change the actual class of the object."
  }
];

const examB: QuizBlock[] = [
  {
    "type": "quiz",
    "id": "u5-examB-1",
    "question": "Account.balance() returns 20. FeeAccount overrides balance() to return super.balance()-3. Account a = new FeeAccount(); what is a.balance()?",
    "choices": [
      "20",
      "3",
      "17",
      "23"
    ],
    "answer": 2,
    "explanation": "The override runs and explicitly reuses the parent value."
  },
  {
    "type": "quiz",
    "id": "u5-examB-2",
    "question": "P(int x) stores x. Q(int y) calls super(y+1); R(int z) extends Q and calls super(z*2). What value is stored by new R(4)?",
    "choices": [
      "4",
      "5",
      "8",
      "9"
    ],
    "answer": 3,
    "explanation": "R passes 8 to Q; Q passes 9 to P."
  },
  {
    "type": "quiz",
    "id": "u5-examB-3",
    "question": "Which header overrides Object.toString()?",
    "choices": [
      "public String toString()",
      "public void toString()",
      "public String toString(int n)",
      "private String toString()"
    ],
    "answer": 0,
    "explanation": "The public no-argument method must return String."
  },
  {
    "type": "quiz",
    "id": "u5-examB-4",
    "question": "Device[] contains Phone and Tablet objects. Both override describe(). A loop prints describe(). What decides each implementation?",
    "choices": [
      "The array declared type",
      "The element index",
      "The object actual class",
      "The loop variable name"
    ],
    "answer": 2,
    "explanation": "Dynamic dispatch uses the receiver object."
  },
  {
    "type": "quiz",
    "id": "u5-examB-5",
    "question": "Child declares score(double); Parent declares score(int). What is the relationship?",
    "choices": [
      "An override",
      "An overload",
      "A constructor pair",
      "Illegal duplicate methods"
    ],
    "answer": 1,
    "explanation": "Different parameter types define overloads."
  },
  {
    "type": "quiz",
    "id": "u5-examB-6",
    "question": "Base b = new Derived(); Derived d = (Derived)b; which statement is true?",
    "choices": [
      "A second object is allocated",
      "b and d refer to the same object",
      "b changes its declared type",
      "Derived constructors run again"
    ],
    "answer": 1,
    "explanation": "Casting changes the type used for checking an expression, not object identity."
  },
  {
    "type": "quiz",
    "id": "u5-examB-7",
    "question": "Which assignment compiles if Novel extends Book?",
    "choices": [
      "Novel n = new Book();",
      "Book b = new Novel();",
      "Novel n = (Book)new Novel();",
      "Novel n = new Object();"
    ],
    "answer": 1,
    "explanation": "A Novel satisfies the Book type."
  },
  {
    "type": "quiz",
    "id": "u5-examB-8",
    "question": "Parent has private int n; Child declares its own private int n. What is true?",
    "choices": [
      "Child overrides the field",
      "The fields are independent",
      "Only one storage location exists",
      "The program cannot compile"
    ],
    "answer": 1,
    "explanation": "Fields are not overridden; each declaration represents separate state."
  },
  {
    "type": "quiz",
    "id": "u5-examB-9",
    "question": "Child.f() contains return f()+1; where f returns int. The intention was to extend Parent.f(). What repair is appropriate?",
    "choices": [
      "return this.f()+1;",
      "return super.f()+1;",
      "return Parent()+1;",
      "Make f private"
    ],
    "answer": 1,
    "explanation": "super selects the parent implementation and avoids self recursion."
  },
  {
    "type": "quiz",
    "id": "u5-examB-10",
    "question": "Which statement preserves substitutability?",
    "choices": [
      "A subclass may remove all parent public methods",
      "A subclass honors the documented parent method contract",
      "A subclass must duplicate private fields",
      "A subclass must have no new methods"
    ],
    "answer": 1,
    "explanation": "Clients of the parent rely on that contract for every subtype."
  },
  {
    "type": "quiz",
    "id": "u5-examB-11",
    "question": "Object o = new String(\"CS\"); System.out.println(o); what appears?",
    "choices": [
      "CS",
      "Object",
      "A compile error",
      "null"
    ],
    "answer": 0,
    "explanation": "Printing invokes the actual String implementation of toString."
  },
  {
    "type": "quiz",
    "id": "u5-examB-12",
    "question": "Which expression can safely reject a null argument before a cast in equals(Object other)?",
    "choices": [
      "other.equals(null)",
      "other instanceof Code",
      "(Code)other != null always",
      "other.toString()"
    ],
    "answer": 1,
    "explanation": "instanceof is false for null and for objects of unrelated types."
  },
  {
    "type": "quiz",
    "id": "u5-examB-13",
    "question": "Base declares public void send(). Which Child declaration fails to override legally?",
    "choices": [
      "public void send()",
      "@Override public void send()",
      "private void send()",
      "public void send(int n) as a separate overload"
    ],
    "answer": 2,
    "explanation": "An override cannot reduce public access to private."
  },
  {
    "type": "quiz",
    "id": "u5-examB-14",
    "question": "Parent.report() returns \"R\"; Child does not declare report(). What does new Child().report() return?",
    "choices": [
      "An empty string",
      "R",
      "A compile error",
      "The class name"
    ],
    "answer": 1,
    "explanation": "An accessible parent method is inherited when it is not overridden."
  },
  {
    "type": "quiz",
    "id": "u5-examB-15",
    "question": "A client needs only getPrice() for every Product subtype. Which parameter supports extension best?",
    "choices": [
      "One parameter for each concrete subtype",
      "Product p",
      "Object p followed by an unchecked cast",
      "A String containing the class name"
    ],
    "answer": 1,
    "explanation": "Depending on the common parent contract lets new subtypes work without client changes."
  },
  {
    "type": "quiz",
    "id": "u5-examB-16",
    "question": "A subclass constructor has no explicit constructor call. Its parent provides a no-argument constructor. What does Java insert in the traditional AP Java constructor model?",
    "choices": [
      "this(0);",
      "super();",
      "new Parent();",
      "Nothing; parent initialization is skipped"
    ],
    "answer": 1,
    "explanation": "The implicit no-argument superclass call initializes the inherited part."
  }
];

const examPredict = (id: string, amount: number): PredictBlock => ({type:'predict', id,
 question:'Trace the inherited call and the explicit superclass call. What is printed?',
 code:`public class Main { public static void main(String[] args) { Record r = new Bonus(${amount}); System.out.println(r.report()); } }
class Record { public int points() { return 4; } public String report() { return "points=" + points(); } }
class Bonus extends Record { private int extra; public Bonus(int extra) { this.extra = extra; } public int points() { return super.points() + extra; } }`,
 answer:`points=${4+amount}`, explanation:'report is inherited, but its call to points dispatches to Bonus; super.points contributes 4.'});
export const unit5d: Lesson[] = [
 {id:'5-13', title:'College Board Celebrity Lab', blocks:[
  {type:'text', md:'### A console guessing-game model\n\nThis original adaptation develops the object-oriented ideas of a celebrity guessing lab without a graphical framework. Use fictional public profiles, separate the data model from the round controller, and avoid storing personal information about classmates.\n\n1. Build a base profile with private answer and clue state.\n2. Add a specialized profile that enriches its clue while inheriting answer matching.\n3. Score a deterministic round over a mixed array.\n\nBefore coding, sketch the is-a relationship and list the public methods the controller actually needs. After completing each step, run its driver. Then add an unsuccessful guess, a differently capitalized guess, and an empty round. Explain why inheritance belongs in the profile hierarchy while a game controller should contain profiles rather than extend Celebrity.'},
  lab1, lab2, lab3,
  {type:'quiz',id:'u5-lab-design',question:'Why can score process a Scientist without checking its class?',choices:['Scientist inherits the matches contract','Arrays remove all type checks','Every Scientist is a String','score must know every subclass'],answer:0,explanation:'The controller depends on Celebrity methods, which every Scientist supports.'},
  {type:'quiz',id:'u5-lab-separation',question:'Where should the score for an entire guessing round live?',choices:['In each individual clue String','In the controller that processes the round','In a duplicate copy of Celebrity.name','In Object.toString'],answer:1,explanation:'Round state belongs to the object coordinating the collection of profiles.'}
 ]},
 {id:'5-14',title:'Practice Exam - Inheritance (not timed)',blocks:[
  {type:'text',md:'Complete all 16 multiple-choice questions and the output trace without running code. This version is not timed. For each item, record the declared reference type, actual object type, and relevant method signature. Review explanations after submitting, then implement a small counterexample for a distractor you selected.'}, ...examA, examPredict('u5-examA-trace',3)]},
 {id:'5-15',title:'Practice Exam - Inheritance (Timed)',blocks:[
  {type:'text',md:'Suggested time: 30 minutes for 16 multiple-choice questions and one output trace. Use your own clock; this lesson does not enforce a timer. Work independently and mark uncertain items before reviewing explanations. Constructor questions use the traditional AP Java rule that the superclass constructor call comes first. Afterward, distinguish compile-time member checks from runtime dispatch in every missed item.'}, ...examB, examPredict('u5-examB-trace',7)]}
];
