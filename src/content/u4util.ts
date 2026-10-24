/** Wraps statements (and optional extra static members) in a complete runnable Main class. */
const ind = (s: string, n: number) => s.split('\n').map((l) => (l.trim() ? ' '.repeat(n) + l : '')).join('\n');

export const w = (body: string, extra = ''): string => {
  const all = body + '\n' + extra;
  const imports: string[] = [];
  if (/ArrayList/.test(all)) imports.push('import java.util.ArrayList;');
  if (/Scanner/.test(all)) imports.push('import java.util.Scanner;');
  if (/Arrays\./.test(all)) imports.push('import java.util.Arrays;');
  const head = imports.length ? imports.join('\n') + '\n\n' : '';
  const ex = extra.trim() ? ind(extra.trim(), 4) + '\n\n' : '';
  return `${head}public class Main {\n${ex}    public static void main(String[] args) {\n${ind(body.trim(), 8)}\n    }\n}\n`;
};
