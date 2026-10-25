import type { Lesson, Block } from './types';
import { w } from './u4util';
const text = (md: string): Block => ({ type: 'text', md: md.replaceAll('§', '`') });
const code = (id: string, prompt: string, main: string, starter: string, solution: string, expected: string): Block => ({ type:'code', id:'u2-'+id, prompt, starter:w(main,starter), solution:w(main,solution), expected, hint:'Preserve the main checks. Implement one part at a time, tracing empty and boundary inputs.' });
const messageSolution = `static class MessageBuilder {
    private String message;
    MessageBuilder(String start) { message = start; }
    void repeat(String word, int times) {
        for (int i = 0; i < times; i++) {
            if (message.length() > 0) message += " ";
            message += word;
        }
    }
    String initials() {
        String result = "";
        for (int i = 0; i < message.length(); i++) {
            if (i == 0 || message.substring(i-1,i).equals(" ")) result += message.substring(i,i+1);
        }
        return result;
    }
    String getMessage() { return message; }
}`;
const calendarSolution = `static boolean leap(int year) {
    return year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
}
static int leapCount(int first, int last) {
    int count = 0;
    for (int y = first; y <= last; y++) if (leap(y)) count++;
    return count;
}
static int dayOfWeek(int firstDay, int day) { return (firstDay + day - 1) % 7; }`;
const divisorSolution = `static boolean isSelfDivisor(int n) {
    int remaining = n;
    while (remaining > 0) {
        int digit = remaining % 10;
        if (digit == 0 || n % digit != 0) return false;
        remaining /= 10;
    }
    return true;
}
static int countSelfDivisors(int first, int last) {
    int count = 0;
    for (int n = first; n <= last; n++) if (isSelfDivisor(n)) count++;
    return count;
}`;
const scrambleSolution = `static String scramble(String word) {
    String result = "";
    int i = 0;
    while (i < word.length()) {
        if (i + 1 < word.length() && word.substring(i,i+1).equals("A") && !word.substring(i+1,i+2).equals("A")) {
            result += word.substring(i+1,i+2) + "A";
            i += 2;
        } else {
            result += word.substring(i,i+1);
            i++;
        }
    }
    return result;
}`;
const keywordSolution = `static int findWord(String statement, String goal) {
    String lower = statement.toLowerCase();
    String target = goal.toLowerCase();
    for (int i = 0; i <= lower.length() - target.length(); i++) {
        if (lower.substring(i,i+target.length()).equals(target)) {
            boolean left = i == 0 || !letter(lower.substring(i-1,i));
            int end = i + target.length();
            boolean right = end == lower.length() || !letter(lower.substring(end,end+1));
            if (left && right) return i;
        }
    }
    return -1;
}
static boolean letter(String c) { return c.compareTo("a") >= 0 && c.compareTo("z") <= 0; }`;
const sentimentSolution = `static int wordScore(String word) {
    if (word.equals("clear") || word.equals("useful")) return 2;
    if (word.equals("slow") || word.equals("confusing")) return -2;
    return 0;
}
static int score(String review) {
    String remaining = review.toLowerCase().trim();
    int total = 0;
    while (remaining.length() > 0) {
        int space = remaining.indexOf(" ");
        String word;
        if (space == -1) { word = remaining; remaining = ""; }
        else { word = remaining.substring(0,space); remaining = remaining.substring(space+1).trim(); }
        total += wordScore(word);
    }
    return total;
}`;
export const unit2d: Lesson[] = [
 {id:'2-25',title:'FRQ 1 MessageBuilder with Loops and Strings',blocks:[text(`A MessageBuilder stores a message made of words separated by single spaces. This original exercise emphasizes String traversal and repetition inside a provided class. The constructor receives either an empty String or words with no leading/trailing spaces. All word arguments contain at least one letter and no spaces; times is nonnegative.

**Part A:** implement §repeat(word, times)§ to append exactly times copies. Insert one space between neighboring words, including the original message and the first addition. Appending zero copies leaves the message unchanged.

**Part B:** implement §initials()§, which returns the first character of every word in the current message, in order. For an empty message return the empty String. Do not change stored message data while extracting initials.

Plan the separator rule before writing the loop. An invariant for Part A is that the stored message contains no leading/trailing spaces after every pass. For Part B, a word starts at index zero or immediately after a space. Trace the first character carefully because index -1 is invalid. The provided getters and constructor are outside the requested work.`),code('message-a','Complete repeat and initials in the class skeleton. The first check includes an existing word; the second checks the empty-message and zero-repeat cases.','MessageBuilder b = new MessageBuilder("Review");\nb.repeat("Java", 2);\nSystem.out.println(b.getMessage());\nSystem.out.println(b.initials());\nMessageBuilder empty = new MessageBuilder("");\nempty.repeat("Code", 0);\nSystem.out.println(empty.initials().length());\nempty.repeat("Code", 1);\nSystem.out.println(empty.getMessage());',`static class MessageBuilder {
    private String message;
    MessageBuilder(String start) { message = start; }
    void repeat(String word, int times) { /* Part A */ }
    String initials() { return ""; /* Part B */ }
    String getMessage() { return message; }
}`,messageSolution,'Review Java Java\nRJJ\n0\nCode'),text('Review your implementation: Does a zero count preserve the original message? Does initials work for a one-word message? Add checks for those cases, then explain why the short-circuit condition protects substring(i-1,i).')]},
 {id:'2-26',title:'FRQ APCalendar for Loops and Control Structures',blocks:[text(`Calendar programs separate date rules into small methods. In this original AP-style practice, assume years and dates supplied to the methods are valid, years are positive, and first <= last. Day-of-week values use 0 for Sunday through 6 for Saturday.

**Part A:** implement §leap(year)§ using the Gregorian exceptions: multiples of 4 are leap years except multiples of 100, which are leap years only if also divisible by 400. Then implement §leapCount(first,last)§ for an inclusive range by calling leap once for each year.

**Part B:** a helper supplies the weekday of January 1 as firstDay. Implement §dayOfWeek(firstDay,day)§ for day number day in that year, starting with day 1. Repeated weekday cycles wrap after 6, so use remainder rather than a long selection chain.

The year range needs both endpoints; the weekday offset needs day minus one. Distinguish these two uses of inclusive numbering. The century checks below prevent an oversimplified divisible-by-four rule from passing.`),code('calendar','Complete all three helpers. Treat the firstDay parameter as already computed; do not use a date library.','System.out.println(leap(1900));\nSystem.out.println(leap(2000));\nSystem.out.println(leapCount(1996,2004));\nSystem.out.println(dayOfWeek(5,1));\nSystem.out.println(dayOfWeek(5,10));', 'static boolean leap(int year) { return false; }\nstatic int leapCount(int first, int last) { return 0; }\nstatic int dayOfWeek(int firstDay, int day) { return 0; }',calendarSolution,'false\ntrue\n3\n5\n0'),text('Extend the tests with a range containing no leap years and with first == last. Explain why the dayOfWeek result always belongs to 0 through 6 for valid positive day numbers.')]},
 {id:'2-27',title:'FRQ Self Divisor A',blocks:[text(`A positive integer is a **self divisor** when every decimal digit is nonzero and divides the original integer evenly. For example, 128 qualifies because 1, 2, and 8 divide 128. The number 102 fails because zero is a digit, and 26 fails because 6 does not divide 26.

**Part A:** implement §isSelfDivisor(n)§ for n > 0. Preserve the original n while a separate variable loses one digit on each pass. Check a zero digit before using it as a divisor; Java cannot compute an integer remainder with zero.

**Part B:** implement §countSelfDivisors(first,last)§ for a valid positive inclusive range by calling Part A. A method with a correct contract should be reused rather than copied into the caller.

Use §remaining % 10§ to inspect the rightmost digit and §remaining / 10§ to discard it. Return false as soon as a disqualifying digit is found. Return true only after the entire number has been checked. Trace a number with an internal zero and one where the first inspected digit passes but a later digit fails.`),code('self-divisor','Complete the predicate and range counter. Keep the original number unchanged while extracting digits.','System.out.println(isSelfDivisor(128));\nSystem.out.println(isSelfDivisor(102));\nSystem.out.println(isSelfDivisor(26));\nSystem.out.println(countSelfDivisors(1,12));','static boolean isSelfDivisor(int n) { return false; }\nstatic int countSelfDivisors(int first, int last) { return 0; }',divisorSolution,'true\nfalse\nfalse\n11'),text('Explain why returning true inside the first loop pass is incorrect. Extend main with 111 and 120, and predict the results before running. The positive-input precondition means a zero-length digit traversal never needs to define whether zero qualifies.')]},
 {id:'2-28',title:'FRQ String Scramble A',blocks:[text(`A text transformation scans an uppercase word from left to right. Whenever it encounters an A immediately followed by a character other than A, it swaps that pair and resumes after the pair. Characters involved in a swap are not reconsidered. All other characters retain their relative order. This is an original statement of a pairwise traversal exercise.

**Part A:** implement §scramble(word)§ using a result String and an index. For example, AB becomes BA, AAB becomes ABA, and BAR becomes BRA. An empty or one-character String is unchanged.

**Part B:** check the transformation on adjacent eligible pairs and on a final A. Explain why the algorithm increments by two after a swap but by one otherwise. A last-index guard must precede the attempt to inspect the next character.

Because Strings are immutable, the result is assembled separately. At the beginning of each pass, indices before i have already been consumed; the output contains their transformed form. This invariant prevents the moved A from being swapped repeatedly.`),code('scramble','Complete the method without replace or regular expressions. Process each original character at most once.','System.out.println(scramble("ABAC"));\nSystem.out.println(scramble("AAB"));\nSystem.out.println(scramble("BAR"));\nSystem.out.println(scramble("A"));\nSystem.out.println(scramble("").length());','static String scramble(String word) { return ""; }',scrambleSolution,'BACA\nABA\nBRA\nA\n0'),text('As a follow-up, write a countSwaps method using the same traversal rule. For ABAC it should return 2; for AAA it should return 0. Keep this extension distinct from the graded scramble method so the main contract remains clear.')]},
 {id:'2-29',title:'Magpie Chatbot Lab',blocks:[text(`Build a small deterministic conversation engine and examine its limitations. This original lab uses scripted inputs rather than interactive Scanner input so every run is reproducible.

**Stage 1 — match complete words.** A keyword such as art must match "art class" but must not match "start". Normalize text to lowercase. Search candidate positions, then inspect the characters immediately before and after each candidate. A boundary is the start/end of the String or a character outside a through z. The lab deliberately defines letters as the English lowercase alphabet.

**Stage 2 — response priority.** Empty trimmed input receives "Please enter a statement." A whole-word match for school receives "Which course interests you?" Otherwise, a match for help receives "What have you tried?" All other statements receive "Explain your reasoning." When several keywords occur, the first rule in this list wins.

**Stage 3 — evaluate.** Create a transcript of at least eight inputs, including uppercase, punctuation, a keyword inside a longer word, and two keywords together. Record intended and actual responses. Identify one statement where a keyword rule misinterprets meaning. Explain why detecting a word is weaker than understanding a user's intent; do not store identifying personal information in test transcripts.`),code('magpie-word','Implement the complete-word search helper and its letter helper. Return the index of the first complete match, or -1. goal is nonempty.','System.out.println(findWord("Start art now", "art"));\nSystem.out.println(findWord("School!", "school"));\nSystem.out.println(findWord("helpful", "help"));','static int findWord(String statement, String goal) { return -1; }\nstatic boolean letter(String c) { return false; }',keywordSolution,'6\n0\n-1'),code('magpie-response','Implement response using the Stage 2 priority. The keyword helpers are provided in the starter; preserve them.', 'System.out.println(response("  "));\nSystem.out.println(response("I need HELP at school."));\nSystem.out.println(response("helpful advice"));\nSystem.out.println(response("help!"));',keywordSolution+'\nstatic String response(String s) { return ""; }',keywordSolution+`\nstatic String response(String s) {
    if (s.trim().length() == 0) return "Please enter a statement.";
    if (findWord(s,"school") >= 0) return "Which course interests you?";
    if (findWord(s,"help") >= 0) return "What have you tried?";
    return "Explain your reasoning.";
}`,'Please enter a statement.\nWhich course interests you?\nExplain your reasoning.\nWhat have you tried?'),text('Finish the lab by adding a new response rule and testing its interaction with existing priorities. Write a short evaluation: one successful match, one false interpretation, and one improvement requiring information beyond keyword presence.')]},
 {id:'2-30',title:'Consumer Review Lab',blocks:[text(`Develop a transparent sentiment scorer for short product reviews. This original lab uses a deliberately small dictionary so you can inspect every decision. Inputs contain words separated by spaces, without punctuation. The words clear and useful score +2; slow and confusing score -2; every other word scores zero. Matching ignores case.

**Stage 1 — tokenize and score.** Repeatedly extract the first word, score it, and shorten the remaining String. Trim the remainder so repeated spaces do not create spurious tokens. An empty review has score zero.

**Stage 2 — summarize.** Convert a total score above zero to "positive", below zero to "negative", and zero to "neutral". The numerical score and label should be returned or printed separately so a reviewer can audit the calculation.

**Stage 3 — evaluate bias and context.** Test repeated words, mixed case, unknown words, and conflicting positive/negative words. Then inspect "not useful": the simplified algorithm scores it positively despite the negation. Explain why a small word dictionary cannot fairly represent every writer or context. Propose a specific improvement and new tests before changing the model.`),code('review-score','Implement wordScore and score according to Stage 1. Use loops and String operations; do not use split or a collection.','System.out.println(score("CLEAR and useful"));\nSystem.out.println(score("slow confusing useful"));\nSystem.out.println(score("  "));\nSystem.out.println(score("useful   slow"));','static int wordScore(String word) { return 0; }\nstatic int score(String review) { return 0; }',sentimentSolution,'4\n-2\n0\n0'),code('review-label','Implement label while retaining the provided scoring methods. Classify the final total rather than choosing a label for each individual word.', 'System.out.println(label("useful"));\nSystem.out.println(label("slow confusing"));\nSystem.out.println(label("clear slow"));',sentimentSolution+'\nstatic String label(String review) { return ""; }',sentimentSolution+`\nstatic String label(String review) {
    int total = score(review);
    if (total > 0) return "positive";
    if (total < 0) return "negative";
    return "neutral";
}`,'positive\nnegative\nneutral'),text('Complete the lab with a table of six reviews and hand-calculated scores. Separate algorithm correctness from model quality: an implementation can obey its dictionary exactly and still classify real language poorly. Discuss who could be affected if a business used this score to hide reviews.')]},
 {id:'2-31',title:'Unit 2A Projects',blocks:[text(`**Project: an auditable delivery quote.** Build a program that converts a short policy into explicit decisions. The input is an integer distance in kilometers (nonnegative), an urgent flag, and a member flag. Base delivery is 5 for distances through 5, 9 for distances 6 through 20, and 15 beyond 20. Urgent delivery adds 6. Members receive a 2-unit discount after the surcharge.

1. Write a decision table for the distance bands and a separate table for the two flags. State the preconditions and expected output for each case.
2. Implement the quote function below. Preserve the independent urgency and membership rules: both may apply.
3. Add a reporting method that labels a distance as local, regional, or extended using the same cutoffs. Keep presentation separate from price arithmetic.
4. Add tests for distances 0, 5, 6, 20, and 21 with all four flag combinations. Explain how this set covers every decision boundary.
5. Propose one policy change, such as a minimum quote, and describe precisely where it belongs in the calculation. Do not silently change the original contract.

Deliver the Java program, the decision tables, and a short rationale for branch order. Evaluate whether the policy is clear enough that two programmers would produce the same result.`),code('project-quote','Implement the delivery price contract. The tests exercise cutoff boundaries and independent adjustments.','System.out.println(quote(5,false,false));\nSystem.out.println(quote(6,true,true));\nSystem.out.println(quote(20,false,true));\nSystem.out.println(quote(21,true,false));','static int quote(int distance, boolean urgent, boolean member) { return 0; }',`static int quote(int distance, boolean urgent, boolean member) {
    int cost;
    if (distance <= 5) cost = 5;
    else if (distance <= 20) cost = 9;
    else cost = 15;
    if (urgent) cost += 6;
    if (member) cost -= 2;
    return cost;
}`,'5\n13\n7\n21'),code('project-zone','Implement the reporting label. Add a main check for distance zero after the supplied cases pass.','System.out.println(zone(5));\nSystem.out.println(zone(6));\nSystem.out.println(zone(21));','static String zone(int distance) { return ""; }',`static String zone(int distance) {
    if (distance <= 5) return "local";
    if (distance <= 20) return "regional";
    return "extended";
}`,'local\nregional\nextended'),text('Extension: design a second selection-based project, such as a course eligibility checker. Write a complete specification and boundary tests before implementation. Avoid collecting personal information; use invented records and explain each eligibility decision.')]},
 {id:'2-32',title:'Unit 2B Projects',blocks:[text(`**Project: a run-length text compressor.** Implement a reversible representation for uppercase text. A run is a maximal adjacent group of identical letters. Encode each run as its letter followed by its decimal length: AAABBCCCC becomes A3B2C4. A one-letter run still includes 1, and empty input encodes as the empty String. Original input contains only A through Z, so digits in encoded output are unambiguous.

1. Trace a scanning index and the start of a run on paper. Identify how the algorithm handles the final run without reading past the end.
2. Implement encode using an outer scan over runs and an inner scan that advances to the next different letter. Explain why the total number of character visits still grows proportionally to input length.
3. Implement the repeat helper, then design a decoder that reads one letter followed by one or more digits. Decode only well-formed encodings produced by your encoder.
4. Test empty input, a single letter, alternating letters, and a run longer than nine characters. Test the property decode(encode(s)).equals(s) for several inputs.
5. Compare encoded and original lengths. Explain why compression may make alternating text longer, and propose a rule for choosing whether to store the encoded version.

Deliver both methods, a test transcript, and a description of the invariant for each loop. The graded checkpoints establish the encoder and repetition helper; the full decoder is your integration task.`),code('project-encode','Implement the encoder. Use substring to compare one-character Strings. A run must be fully consumed before the next run begins.','System.out.println(encode("AAABBCCCC"));\nSystem.out.println(encode("AB"));\nSystem.out.println(encode("AAAAAAAAAAAA"));\nSystem.out.println(encode("").length());','static String encode(String input) { return ""; }',`static String encode(String input) {
    String result = "";
    int i = 0;
    while (i < input.length()) {
        String letter = input.substring(i,i+1);
        int end = i + 1;
        while (end < input.length() && input.substring(end,end+1).equals(letter)) end++;
        result += letter + (end - i);
        i = end;
    }
    return result;
}`,'A3B2C4\nA1B1\nA12\n0'),code('project-repeat','Implement the decoder building block repeat: return count copies of a one-character String, with nonnegative count.', 'System.out.println(repeat("Q",4));\nSystem.out.println(repeat("X",0).length());\nSystem.out.println(repeat("A",1));', 'static String repeat(String letter, int count) { return ""; }',`static String repeat(String letter, int count) {
    String result = "";
    for (int i = 0; i < count; i++) result += letter;
    return result;
}`,'QQQQ\n0\nA'),text('Project review: distinguish a correct encoding from an effective compression ratio. Describe the worst case for output length, explain how multi-digit counts are parsed, and document the uppercase-only input restriction. A peer should be able to reproduce your tests using only your stated contract.')]},
];
