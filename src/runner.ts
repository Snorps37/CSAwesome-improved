// Swap this implementation (e.g. for in-browser CheerpJ) without touching the UI.
export type RunResult = {
  stdout: string;
  stderr: string;
  compileError?: boolean;
};

export async function runJava(code: string): Promise<RunResult> {
  try {
    const res = await fetch('/api/run', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as RunResult;
  } catch (e) {
    return {
      stdout: '',
      stderr: `Could not reach the Java runner (${(e as Error).message}). Is the server running?`,
    };
  }
}

export type DotEvent = { id: number; op: string; [k: string]: unknown };

export type ParsedRun = {
  console: string;
  dots: DotEvent[];
  stderr: string;
  compileError: boolean;
};

const PREFIX = '@@DOT ';

/** Strip Dot protocol lines from stdout and decode them. */
export function parseRun(r: RunResult): ParsedRun {
  const dots: DotEvent[] = [];
  const out: string[] = [];
  const lines = r.stdout.split('\n');
  lines.forEach((line, i) => {
    if (line.startsWith(PREFIX)) {
      try {
        dots.push(JSON.parse(line.slice(PREFIX.length)) as DotEvent);
        return;
      } catch {
        /* fall through: show as text */
      }
    }
    if (i === lines.length - 1 && line === '') return;
    out.push(line);
  });
  return { console: out.join('\n'), dots, stderr: r.stderr, compileError: !!r.compileError };
}
