import type { Block, CodeBlock, Lesson, QuizBlock } from './types';

const t = (text: string): Block => ({ type: 'text', md: text });
const program = (classes: string, body: string) => `${classes}\npublic class Main {\n public static void main(String[] args) {\n${body}\n }\n}\n`;
const exercise = (id: string, prompt: string, skeleton: string, implementation: string, body: string, expected: string): CodeBlock => ({
  type: 'code', id: `u3-${id}`, prompt, starter: program(skeleton, body), solution: program(implementation, body), expected,
});
const quiz = (id: string, question: string, choices: string[], answer: number, explanation: string): QuizBlock => ({ type: 'quiz', id: `u3-${id}`, question, choices, answer, explanation });

export const referenceLesson: Lesson = {
 id: '3-6', title: 'Methods: Passing and Returning References of an Object', blocks: [
 t(`A reference variable identifies an object; it does not contain the object's fields. Java always passes arguments **by value**. For an object argument, that value is a reference. The parameter and the caller's variable initially identify the same object. Calling a mutator through either reference changes that shared object. Assigning a new reference to the parameter changes only the parameter.

Draw a separate box for every variable and a separate object for every §new§ expression. Assignment copies the arrow, not the object. After §Meter b = a;§, §a§ and §b§ are **aliases**. After §b = new Meter(0);§ they identify different objects.

A method can also return a reference. §return this;§ returns the current object; §return new Meter(value);§ constructs a distinct object. Both have return type §Meter§, but their effects on later mutation differ. A getter returning a mutable field exposes the actual object unless it deliberately returns a copy. Encapsulation therefore involves more than putting §private§ before fields.

§§§java
public Meter copy() { return new Meter(value); }
public Meter alias() { return this; }
§§§

A String is immutable: methods such as §substring§ return Strings without changing the original. This differs from calling a setter on a mutable object. A §null§ reference identifies no object; calling an instance method through it causes a runtime exception. State a non-null precondition when the algorithm assumes an object exists.`),
 quiz('ref-copy', 'A method assigns §p = new Meter(9);§ to its Meter parameter. What changes?', ['The caller variable', 'Only the local parameter reference', 'Every Meter object', 'The class definition'], 1, 'The reference was copied into p; reassignment replaces only that copy.'),
 quiz('ref-getter', 'A getter returns a mutable object stored in a private field. What must a designer consider?', ['The returned object cannot change', 'The caller can potentially mutate the stored object', 'The field becomes static', 'Java copies the object automatically'], 1, 'Returning a reference can expose mutable state through an otherwise private field.'),
 quiz('ref-new', 'Which implementation guarantees a distinct object on each call?', ['return this;', 'return saved;', 'return new Meter(value);', 'return null;'], 2, 'A new expression creates a new object; returning an existing reference does not.'),
 { type: 'predict', id: 'u3-ref-predict', question: 'Trace the shared object and the reassigned parameter. What prints?', code: program('class Meter { int n; Meter(int n) { this.n=n; } }', 'Meter a = new Meter(4);\nMeter b = a;\nb.n += 3;\nb = new Meter(20);\nSystem.out.println(a.n + " " + b.n);'), answer: '7 20', explanation: 'The first mutation affects the object shared by a and b. Reassignment then separates their references.' },
 exercise('reference-copy', 'Implement §copy()§ to return an independent Meter with the same value. Implement §addTo(Meter other)§ to add this value to the other object without changing this one. Keep Main unchanged.',
 'class Meter { private int value; public Meter(int value) { this.value=value; } public int get() { return value; } /* TODO copy and addTo */ }',
 'class Meter { private int value; public Meter(int value) { this.value=value; } public int get() { return value; } public Meter copy() { return new Meter(value); } public void addTo(Meter other) { other.value += value; } }',
 'Meter a = new Meter(6); Meter b = a.copy(); a.addTo(b); System.out.println(a.get() + " " + b.get()); System.out.println(a == b);', '6 12\nfalse'),
 exercise('reference-return', 'Implement §larger(Box other)§ to return the existing Box with the larger capacity; ties return this object. Do not construct a new Box.',
 'class Box { private int capacity; public Box(int c) { capacity=c; } /* TODO larger */ }',
 'class Box { private int capacity; public Box(int c) { capacity=c; } public Box larger(Box other) { if (other.capacity > capacity) return other; return this; } }',
 'Box a = new Box(8); Box b = new Box(12); System.out.println(a.larger(b) == b); System.out.println(a.larger(new Box(8)) == a);', 'true\ntrue'),
 ]
};

export const toggleLesson: Lesson = { id: '3-11', title: 'Toggle Code Practice 3 (3.4-3.9)', blocks: [
 t(`For each exercise, compare the competing lines in the comments. Select the implementation that meets the contract, then explain why the alternative fails. Run the provided tests after editing. A program that compiles can still initialize the wrong variable or share state accidentally.

Use three checks: constructor names match the class and have no return type; fields are selected with §this§ when a parameter shadows them; §static§ belongs only on state shared by the whole class. Keep each test driver unchanged.`),
 exercise('toggle-this', 'Replace the constructor assignment with the correct choice: §level = level;§ or §this.level = level;§. Add the getter.',
 'class Gauge { private int level; public Gauge(int level) { level=level; } /* TODO getLevel() */ }',
 'class Gauge { private int level; public Gauge(int level) { this.level=level; } public int getLevel() { return level; } }',
 'Gauge a=new Gauge(7); Gauge b=new Gauge(2); System.out.println(a.getLevel()+" "+b.getLevel());', '7 2'),
 exercise('toggle-instance', 'Choose instance or static for balance. Each Wallet must keep an independent balance. Complete deposit and getBalance.',
 'class Wallet { private static int balance; public Wallet(int start) { balance=start; } /* TODO methods */ }',
 'class Wallet { private int balance; public Wallet(int start) { balance=start; } public void deposit(int n) { balance+=n; } public int getBalance() { return balance; } }',
 'Wallet a=new Wallet(4); Wallet b=new Wallet(10); a.deposit(3); System.out.println(a.getBalance()+" "+b.getBalance());', '7 10'),
 exercise('toggle-return', 'Choose between printing and returning. §doubleValue§ must return twice its stored value without changing the field. §add§ must change the field.',
 'class NumberStore { private int n; public NumberStore(int n) { this.n=n; } /* TODO doubleValue(), add(int), get() */ }',
 'class NumberStore { private int n; public NumberStore(int n) { this.n=n; } public int doubleValue() { return 2*n; } public void add(int amount) { n+=amount; } public int get() { return n; } }',
 'NumberStore s=new NumberStore(5); System.out.println(s.doubleValue()); s.add(2); System.out.println(s.get());', '10\n7'),
 ] };

export const mixedLesson: Lesson = { id:'3-12', title:'Unit 3 Mixed Up Code Practice', blocks: [
 t(`Reconstruct each class from the unordered fragments. Put fields at class level, initialization in constructors, and executable work inside methods. Indentation helps readers, but braces determine scope. Write the final Java in the editor; the comments are a fragment bank, not statements to run.

Before running, check the public interface against the driver. Then trace two objects to confirm that their instance state stays independent. Every needed fragment is supplied; avoid adding public fields to bypass a missing method.`),
 exercise('mixed-ticket','Arrange these fragments into Ticket: §private int seats;§ / §public Ticket(int n) { seats=n; }§ / §public boolean reserve()§ / §if (seats == 0) return false;§ / §seats--;§ / §return true;§ / §public int remaining() { return seats; }§.',
 'class Ticket { /* TODO arrange fragments */ }',
 'class Ticket { private int seats; public Ticket(int n) { seats=n; } public boolean reserve() { if (seats==0) return false; seats--; return true; } public int remaining() { return seats; } }',
 'Ticket t=new Ticket(1); System.out.println(t.reserve()); System.out.println(t.reserve()); System.out.println(t.remaining());','true\nfalse\n0'),
 exercise('mixed-clock','Arrange Clock from: §private int minute;§ / constructor §Clock(int m)§ / §minute=m;§ / §public void advance(int amount)§ / §minute=(minute+amount)%60;§ / accessor §getMinute()§ returning minute. Precondition: nonnegative arguments.',
 'class Clock { /* TODO arrange fields and methods */ }',
 'class Clock { private int minute; public Clock(int m) { minute=m; } public void advance(int amount) { minute=(minute+amount)%60; } public int getMinute() { return minute; } }',
 'Clock c=new Clock(58); c.advance(5); System.out.println(c.getMinute()); c.advance(60); System.out.println(c.getMinute());','3\n3'),
 exercise('mixed-static','Arrange Badge: shared §next=100§; instance §id§; no-argument constructor assigns next to id then increments next; accessor getId. Decide which field needs static.',
 'class Badge { /* TODO fields, constructor, accessor */ }',
 'class Badge { private static int next=100; private int id; public Badge() { id=next; next++; } public int getId() { return id; } }',
 'Badge a=new Badge(); Badge b=new Badge(); System.out.println(a.getId()+" "+b.getId());','100 101'),
 ] };

export const cupcakeLesson: Lesson = { id:'3-16', title:'FRQ 2 Class Design - CupcakeMachine', blocks: [
 t(`### Class specification
A school event uses a CupcakeMachine to track available cupcakes and completed sales. Write the complete class. This is an original AP-style class-design problem; no payment hardware is involved.

**Part (a): state and construction.** A constructor §CupcakeMachine(int capacity, int startingStock)§ stores a positive capacity and starting stock between zero and capacity. These are preconditions. Track stock, total cupcakes sold, and total revenue in cents. All fields are private.

**Part (b): transactions.** §sell(int requested)§ returns false and changes nothing if requested is not positive or exceeds stock. Otherwise remove the requested cupcakes, increase the sold count, add 250 cents per cupcake to revenue, and return true. §restock(int amount)§ accepts positive amounts, filling only up to capacity; it returns the number actually added. A rejected sale must not increase revenue.

**Part (c): reporting.** Supply §getStock()§, §getSold()§, and §getRevenue()§. Store cents as ints to avoid decimal rounding. Trace the final sale that requests more than stock before coding.

Plan invariants: stock is always in [0, capacity], sold never decreases, and revenue equals 250 times sold. The driver checks successful, unsuccessful, and capacity-limited operations.`),
 exercise('cupcake','Complete all three parts. Keep the supplied Main; its checks cover empty-stock behavior and capped restocking.',
 'class CupcakeMachine { /* TODO private fields */ public CupcakeMachine(int capacity,int startingStock) { /* TODO */ } /* TODO sell, restock, getStock, getSold, getRevenue */ }',
 'class CupcakeMachine { private int capacity,stock,sold,revenue; public CupcakeMachine(int capacity,int startingStock) { this.capacity=capacity; stock=startingStock; } public boolean sell(int requested) { if (requested<=0 || requested>stock) return false; stock-=requested; sold+=requested; revenue+=250*requested; return true; } public int restock(int amount) { if (amount<=0) return 0; int added=Math.min(amount,capacity-stock); stock+=added; return added; } public int getStock() { return stock; } public int getSold() { return sold; } public int getRevenue() { return revenue; } }',
 'CupcakeMachine m=new CupcakeMachine(10,4); System.out.println(m.sell(3)); System.out.println(m.sell(2)); System.out.println(m.restock(20)); System.out.println(m.getStock()+" "+m.getSold()+" "+m.getRevenue()); System.out.println(m.sell(0)); System.out.println(m.sell(10)); System.out.println(m.getStock()+" "+m.getSold()+" "+m.getRevenue());','true\nfalse\n9\n10 3 750\nfalse\ntrue\n0 13 3250'),
 t(`### Review and extend
Explain why stock, sold, and revenue must be updated together inside one successful-sale branch. Add tests for restock(0), a full machine, and a sale of exactly the available stock. As an extension, make price a constructor parameter and preserve the invariant that revenue records completed sales at their sale price.`),
 ] };

export const stepLesson: Lesson = { id:'3-18', title:'FRQ StepTracker Class', blocks: [
 t(`### Tracking activity over time
Implement a StepTracker whose constructor receives a positive daily activity threshold. This guided problem focuses on choosing persistent state rather than storing every day's data.

**Part (a).** Define private fields and §StepTracker(int minimum)§. Initially no days have been recorded. Track the number of days, total steps, and number of active days.

**Part (b).** §addDailySteps(int steps)§ records one day. Precondition: steps is nonnegative. A day is active when steps is at least the constructor threshold, including equality. A day with zero steps still counts as a recorded day.

**Part (c).** §activeDays()§ returns the active-day count. §averageSteps()§ returns total steps divided by recorded days as a double, or 0.0 before the first day. Never divide by the active-day count: inactive days are part of the average.

Use integer fields for counts and total steps. Cast before division. Work through days of 0, exactly the threshold, and above the threshold to derive expected state. Your class should answer queries without rescanning previous days.`),
 exercise('steps','Write StepTracker, then run the boundary and independent-object checks in Main.',
 'class StepTracker { /* TODO fields */ public StepTracker(int minimum) { /* TODO */ } /* TODO addDailySteps, activeDays, averageSteps */ }',
 'class StepTracker { private int minimum,days,total,active; public StepTracker(int minimum) { this.minimum=minimum; } public void addDailySteps(int steps) { days++; total+=steps; if (steps>=minimum) active++; } public int activeDays() { return active; } public double averageSteps() { if (days==0) return 0.0; return (double)total/days; } }',
 'StepTracker t=new StepTracker(10000); System.out.println(t.averageSteps()); t.addDailySteps(0); t.addDailySteps(10000); t.addDailySteps(11000); System.out.println(t.activeDays()); System.out.println(t.averageSteps()); StepTracker other=new StepTracker(1); System.out.println(other.activeDays()+" "+other.averageSteps());','0.0\n2\n7000.0\n0 0.0'),
 quiz('steps-review','Why can the class omit a field for the current average?', ['An average is always an int','It can compute the average from total and count','Static fields store it automatically','Every day is active'],1,'Derived values can be computed from persistent totals, reducing redundant state.'),
 ] };

export const timeLesson: Lesson = { id:'3-19', title:'FRQ Time', blocks: [
 t(`### Normalizing a duration
Design a Time class that represents a nonnegative elapsed duration. This is a duration, so hours may exceed 23. The internal representation is your choice; one total-seconds field avoids inconsistent hour/minute/second combinations.

**Part (a).** §Time(int hours, int minutes, int seconds)§ receives nonnegative arguments, including minutes or seconds greater than 59. Normalize them into a duration. For example, (1, 59, 75) represents 2 hours, 0 minutes, 15 seconds.

**Part (b).** §add(Time other)§ adds the other duration to this object. It must leave the other object unchanged. Access to another object's private fields is permitted inside the same class. Consider what should happen for §t.add(t)§: the duration doubles once.

**Part (c).** §getHours()§, §getMinutes()§, and §getSeconds()§ return the normalized components, with minutes and seconds in [0,59]. §toString()§ returns them separated by colons; no leading zero padding is required. Use division and remainder rather than loops.

Derive conversions before coding: total seconds = 3600 × hours + 60 × minutes + seconds. Divide by 3600 for hours, use the remainder to isolate minutes, and use remainder 60 for seconds.`),
 exercise('time','Complete the duration class and verify normalization, addition, unchanged arguments, and self-addition.',
 'class Time { /* TODO private representation */ public Time(int hours,int minutes,int seconds) { /* TODO */ } /* TODO add, accessors, toString */ }',
 'class Time { private int total; public Time(int hours,int minutes,int seconds) { total=3600*hours+60*minutes+seconds; } public void add(Time other) { total+=other.total; } public int getHours() { return total/3600; } public int getMinutes() { return total%3600/60; } public int getSeconds() { return total%60; } public String toString() { return getHours()+":"+getMinutes()+":"+getSeconds(); } }',
 'Time a=new Time(1,59,75); Time b=new Time(0,0,50); System.out.println(a); a.add(b); System.out.println(a); System.out.println(b); b.add(b); System.out.println(b);','2:0:15\n2:1:5\n0:0:50\n0:1:40'),
 quiz('time-review','Which expression isolates the minute component from nonnegative total seconds?', ['total / 60','total % 60','total % 3600 / 60','total / 3600'],2,'Remove full hours first, then convert the remaining seconds into whole minutes.'),
 ] };

export const labsLesson: Lesson = { id:'3-20', title:'College Board Labs', blocks: [
 t(`Labs connect class design to larger programs. The following original mini-labs develop skills used in object-oriented lab work: reading a specification, separating a model from a driver, collaborating through public methods, and testing object interactions. They are guided preparation rather than copied lab instructions.

### Lab 1: response model
1. Write a ResponseRule class that stores one keyword and one response. Normalize the input and keyword with toLowerCase before searching.
2. Implement matches(String input) using indexOf; the precondition is non-null input. This simple version matches substrings, so document its limitation for words embedded in other words.
3. Implement reply() as an accessor. Keep console input and output outside this model class.
4. Test case variation, missing keywords, and an empty input. Discuss how storing full conversation logs could reveal personal information; this model need not store any input.`),
 exercise('lab-response','Implement the two methods of ResponseRule. A match is case insensitive; reply returns the stored response.',
 'class ResponseRule { private String keyword,response; public ResponseRule(String k,String r) { keyword=k; response=r; } /* TODO matches and reply */ }',
 'class ResponseRule { private String keyword,response; public ResponseRule(String k,String r) { keyword=k; response=r; } public boolean matches(String input) { return input.toLowerCase().indexOf(keyword.toLowerCase())>=0; } public String reply() { return response; } }',
 'ResponseRule r=new ResponseRule("schedule","Check the timetable."); System.out.println(r.matches("SCHEDULE update")); System.out.println(r.matches("")); System.out.println(r.reply());','true\nfalse\nCheck the timetable.'),
 t(`### Lab 2: collaborating objects
1. Represent a loanable Device with an identifier and availability state.
2. A LoanDesk receives an existing Device reference. Its checkout operation delegates to the device rather than maintaining a second availability flag.
3. Return success as a boolean so a later user interface can choose what to display.
4. Test two desks sharing the same device. Explain why both must see the same availability. Extend the design with a return operation and test checkout after return.`),
 exercise('lab-device','Complete Device.checkout and LoanDesk.issue. A checkout succeeds once, then fails until the device is returned.',
 'class Device { private boolean available=true; /* TODO checkout and giveBack */ } class LoanDesk { private Device device; public LoanDesk(Device d) { device=d; } /* TODO issue */ }',
 'class Device { private boolean available=true; public boolean checkout() { if (!available) return false; available=false; return true; } public void giveBack() { available=true; } } class LoanDesk { private Device device; public LoanDesk(Device d) { device=d; } public boolean issue() { return device.checkout(); } }',
 'Device d=new Device(); LoanDesk a=new LoanDesk(d); LoanDesk b=new LoanDesk(d); System.out.println(a.issue()); System.out.println(b.issue()); d.giveBack(); System.out.println(b.issue());','true\nfalse\ntrue'),
 ] };

export const communityLesson: Lesson = { id:'3-21', title:'Design a Class for your Community Project', blocks: [
 t(`Choose a community process with a clear resource or service: volunteer hours, equipment loans, food distributions, or event registration. Interview a potential user or write a short scenario. Identify what the program must remember, what it should compute, and what information it should avoid collecting.

### Design sequence
1. Write three user requirements as observable behavior. Example: a coordinator can record service hours and see progress toward a goal.
2. Define one class with private fields and a small public interface. Specify parameter types, return types, preconditions, and invalid-input behavior before implementation.
3. Decide which state belongs to each object and which, if any, belongs to the class. Do not make personal records static.
4. Implement and test typical values, boundaries, rejected operations, and two independent objects.
5. Ask whether your names, units, and rules match the real workflow. Document a limitation and revise one design choice.

The guided baseline below stores an anonymous label, goal, and total hours. It deliberately avoids personal contact data. Extend it with a progress percentage or an immutable summary object after the baseline passes.`),
 exercise('community-hours','Implement ServiceRecord. Constructor takes a label and positive goal. record(int hours) accepts only positive values. remaining() returns goal minus total, bounded below by zero. summary() returns label followed by a colon and total hours.',
 'class ServiceRecord { /* TODO fields */ public ServiceRecord(String label,int goal) { /* TODO */ } /* TODO record, remaining, summary */ }',
 'class ServiceRecord { private String label; private int goal,total; public ServiceRecord(String label,int goal) { this.label=label; this.goal=goal; } public void record(int hours) { if (hours>0) total+=hours; } public int remaining() { return Math.max(0,goal-total); } public String summary() { return label+":"+total; } }',
 'ServiceRecord a=new ServiceRecord("Team A",10); ServiceRecord b=new ServiceRecord("Team B",4); a.record(6); a.record(-2); System.out.println(a.summary()+" "+a.remaining()); a.record(7); System.out.println(a.summary()+" "+a.remaining()); System.out.println(b.summary()+" "+b.remaining());','Team A:6 4\nTeam A:13 0\nTeam B:0 4'),
 t(`### Review evidence
Submit your class, a driver with at least six assertions or printed comparisons, and a short explanation of one invariant. Identify an accessibility or privacy concern tied to the chosen workflow. For peer review, exchange only the specification first; ask a partner to write client code without reading your implementation. Ambiguity in that client code signals a contract that needs revision.`),
 ] };

export const projectsLesson: Lesson = { id:'3-22', title:'Unit 3 Projects', blocks: [
 t(`Build a small system with two collaborating classes. Select an equipment reservation service, a library loan model, or a workshop registration system. Keep the model independent of console interaction so the same objects could later support another interface.

### Milestones
1. **Specify:** describe a normal operation and a rejected operation. List fields, constructors, and public methods in a design table.
2. **Implement:** use private state, at least one overloaded constructor, a validated mutator, and a useful toString. Include one class-level counter only if it represents information shared by the system.
3. **Integrate:** pass an object reference between the two classes. Explain which operations mutate a shared object and which return a new value.
4. **Verify:** write a deterministic Main that tests an empty or full resource, a boundary value, rejection without side effects, and two independent resources.
5. **Review:** document one data-minimization decision and one limitation. Rename unclear methods before adding more features.

The baseline is a workshop with a Registration facade. A registration delegates to the workshop, so all registrations observe one authoritative seat count. Capacity is positive; reserve must fail without mutation when full.`),
 exercise('project-workshop','Implement Workshop with overloaded constructors Workshop() (capacity 2) and Workshop(int capacity), reserve(), remaining(), and toString() returning "Seats: N". Implement Registration(Workshop w) and enroll(), which delegates to reserve().',
 'class Workshop { /* TODO constructors and methods */ } class Registration { /* TODO field, constructor, enroll */ }',
 'class Workshop { private int seats; public Workshop() { this(2); } public Workshop(int capacity) { seats=capacity; } public boolean reserve() { if (seats==0) return false; seats--; return true; } public int remaining() { return seats; } public String toString() { return "Seats: "+seats; } } class Registration { private Workshop workshop; public Registration(Workshop w) { workshop=w; } public boolean enroll() { return workshop.reserve(); } }',
 'Workshop w=new Workshop(); Registration a=new Registration(w); Registration b=new Registration(w); System.out.println(a.enroll()); System.out.println(b.enroll()); System.out.println(a.enroll()); System.out.println(w); Workshop other=new Workshop(5); System.out.println(other.remaining());','true\ntrue\nfalse\nSeats: 0\n5'),
 exercise('project-account','Alternative project baseline: implement Account with a balance, deposit(int), withdraw(int), getBalance(), and a shared count of accounts created. Accept only positive deposits and withdrawals; refuse overdrafts with false. Constructor receives a nonnegative opening balance. Extend it later with a separate TransferService class.',
 'class Account { /* TODO private instance/static state */ public Account(int opening) { /* TODO */ } /* TODO operations and static getCount */ }',
 'class Account { private int balance; private static int count; public Account(int opening) { balance=opening; count++; } public void deposit(int amount) { if (amount>0) balance+=amount; } public boolean withdraw(int amount) { if (amount<=0 || amount>balance) return false; balance-=amount; return true; } public int getBalance() { return balance; } public static int getCount() { return count; } }',
 'Account a=new Account(20); Account b=new Account(0); a.deposit(-3); System.out.println(a.withdraw(21)); System.out.println(a.withdraw(20)); b.deposit(7); System.out.println(a.getBalance()+" "+b.getBalance()+" "+Account.getCount());','false\ntrue\n0 7 2'),
 t(`For your final version, preserve the baseline's contracts while adding a meaningful feature such as cancellation, a maximum deposit, or an audit summary. Write the feature's tests before changing the class. Explain how encapsulation allowed client code to stay the same when the internal representation changed.`),
 ] };

export const extraExamQuestions: QuizBlock[] = [
 quiz('exam-5','A constructor is declared §public Sample(int n)§. Which declaration constructs an object?', ['Sample s = new Sample(4);','Sample s = Sample(4);','Sample s = new Sample();','int s = new Sample(4);'],0,'The new expression must match the constructor parameter list.'),
 quiz('exam-6','Which header is an accessor for a boolean field named open?', ['public void isOpen()','public boolean isOpen()','public open boolean()','public Open()'],1,'An accessor returns the field type and needs no new value parameter.'),
 quiz('exam-7','After §Box a = new Box(); Box b = a;§, how many Box objects were created?', ['0','1','2','Cannot determine'],1,'Only one new expression executes; assignment copies its reference.'),
 quiz('exam-8','A class declares only §public Item(int n)§. What happens for §new Item()§?', ['Fields receive defaults','It calls Item(0)','Compile-time error','Runtime exception'],2,'Writing any constructor prevents Java from supplying an implicit no-argument constructor.'),
 quiz('exam-9','Which member is shared across all instances?', ['private int total;','private static int total;','public void total() {}','public Item() {}'],1,'A static field belongs to the class rather than each instance.'),
 quiz('exam-10','A setter receives a negative value forbidden by its contract. Which implementation best preserves an existing valid field?', ['Assign first, then print a warning','Assign only when the value passes validation','Always assign zero','Make the field public'],1,'Validation before assignment preserves state on a rejected operation.'),
 quiz('exam-11','A method returns an int but its only return statement is inside §if (n > 0)§. What is the issue?', ['Every path must return a value','The method must be static','An int cannot be returned','Nothing; Java returns zero otherwise'],0,'A reachable path that reaches the end of a non-void method causes a compile error.'),
 quiz('exam-12','Which overload can coexist with §public int calc(int n)§?', ['public double calc(int n)','public int calc(int x)','public int calc(double n)','private int calc(int n)'],2,'Parameter types or count must differ; return type, access, and names do not distinguish signatures.'),
 quiz('exam-13','Where is a parameter declared in a constructor accessible?', ['In every method of the class','Only within that constructor body','In every constructor','Only in main'],1,'Its scope is the constructor, unlike an instance field.'),
 quiz('exam-14','Inside an instance method of Point, which use of this is legal?', ['this = new Point();','return this; when the return type is Point','this(); after another statement','static this.x'],1,'this identifies the current object and can be returned as a Point reference.'),
 quiz('exam-15','A getter returns a private mutable object. Why might a copy be preferable?', ['Copies always use less memory','It prevents clients from changing the stored object through the getter','It turns the object into a primitive','A private object cannot be returned'],1,'Returning a defensive copy can protect mutable internal state.'),
 quiz('exam-16','A class tracks total/count. Which expression returns a fractional average for positive count?', ['total / count','(double)(total / count)','(double)total / count','total % count'],2,'Casting before division makes the arithmetic floating point; casting afterward loses the fraction.'),
 ];

export const summaryExercise = exercise('summary-code','Complete Counter: construction stores a starting value; increment changes this object; totalMade reports the number constructed. Keep the class counter separate from the per-object value.',
 'class Counter { /* TODO fields */ public Counter(int start) { /* TODO */ } /* TODO increment, get, static totalMade */ }',
 'class Counter { private int value; private static int made; public Counter(int start) { value=start; made++; } public void increment() { value++; } public int get() { return value; } public static int totalMade() { return made; } }',
 'Counter a=new Counter(4); Counter b=new Counter(9); a.increment(); System.out.println(a.get()+" "+b.get()+" "+Counter.totalMade());','5 9 2');
