// Tiny Java runner. POST /api/run {code} -> {stdout, stderr, compileError?}
import http from 'node:http';
import { spawn } from 'node:child_process';
import { mkdtemp, writeFile, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.PORT || 3001);
const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.map': 'application/json', '.wasm': 'application/wasm' };
const TIMEOUT_MS = 5000;
const COMPILE_TIMEOUT_MS = 15000;
const MAX_OUT = 256 * 1024;
const MAX_BODY = 200 * 1024;
const here = path.dirname(fileURLToPath(import.meta.url));
const DOT_SRC = await readFile(path.join(here, 'Dot.java'), 'utf8');

function exec(cmd, args, { cwd, timeout }) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd, detached: true, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '', stderr = '', truncated = false, timedOut = false;
    const add = (which) => (d) => {
      const room = MAX_OUT - (stdout.length + stderr.length);
      if (room <= 0) {
        if (!truncated) { truncated = true; try { process.kill(-child.pid, 'SIGKILL'); } catch {} }
        return;
      }
      const s = d.toString('utf8').slice(0, room);
      if (which === 'o') stdout += s; else stderr += s;
    };
    child.stdout.on('data', add('o'));
    child.stderr.on('data', add('e'));
    const timer = setTimeout(() => {
      timedOut = true;
      try { process.kill(-child.pid, 'SIGKILL'); } catch {}
    }, timeout);
    child.on('error', (e) => { clearTimeout(timer); resolve({ stdout, stderr: stderr + String(e), code: -1, timedOut, truncated }); });
    child.on('close', (code) => { clearTimeout(timer); resolve({ stdout, stderr, code, timedOut, truncated }); });
  });
}

async function runCode(code) {
  const m = /public\s+(?:final\s+)?class\s+([A-Za-z_]\w*)/.exec(code);
  const cls = m ? m[1] : 'Main';
  if (cls === 'Dot') return { stdout: '', stderr: 'Please name your class something other than Dot.', compileError: true };
  const dir = await mkdtemp(path.join(tmpdir(), 'csa-'));
  try {
    await writeFile(path.join(dir, 'Dot.java'), DOT_SRC);
    await writeFile(path.join(dir, cls + '.java'), code);
    const c = await exec('javac', ['-encoding', 'UTF-8', '-Xlint:none', cls + '.java', 'Dot.java'], { cwd: dir, timeout: COMPILE_TIMEOUT_MS });
    if (c.code !== 0) {
      const msg = (c.stderr || c.stdout || 'Compilation failed').split(dir + path.sep).join('');
      return { stdout: '', stderr: msg.trim(), compileError: true };
    }
    const r = await exec('java', ['-Xmx128m', '-Xshare:auto', '-XX:+UseSerialGC', '-cp', dir, cls], { cwd: dir, timeout: TIMEOUT_MS });
    let stderr = r.stderr;
    if (r.timedOut) stderr += `\n[stopped: exceeded ${TIMEOUT_MS / 1000}s time limit]`;
    if (r.truncated) stderr += '\n[stopped: output limit exceeded]';
    return { stdout: r.stdout, stderr: stderr.trim() };
  } finally {
    rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}

const send = (res, status, obj) => {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(obj));
};

function serveStatic(req, res) {
  let rel;
  try { rel = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { return send(res, 400, { error: 'bad url' }); }
  let file = path.normalize(path.join(DIST, rel));
  if (!file.startsWith(DIST)) return send(res, 403, { error: 'forbidden' });
  if (!existsSync(file) || statSync(file).isDirectory()) file = path.join(DIST, 'index.html');
  if (!existsSync(file)) return send(res, 404, { error: 'not found' });
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(res);
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api/health') return send(res, 200, { ok: true });
  if (req.method === 'GET' && !req.url.startsWith('/api/')) return serveStatic(req, res);
  if (req.method !== 'POST' || req.url !== '/api/run') return send(res, 404, { error: 'not found' });
  let body = '', tooBig = false;
  req.on('data', (d) => { body += d; if (body.length > MAX_BODY) { tooBig = true; req.destroy(); } });
  req.on('end', async () => {
    if (tooBig) return;
    try {
      const { code } = JSON.parse(body);
      if (typeof code !== 'string') return send(res, 400, { error: 'code must be a string' });
      send(res, 200, await runCode(code));
    } catch (e) {
      send(res, 500, { stdout: '', stderr: 'Server error: ' + e.message });
    }
  });
});

// Listen on `port`, falling back to a random free port if it is taken. Resolves to the port in use.
export function start(port = PORT) {
  return new Promise((resolve, reject) => {
    const tryListen = (p) => {
      server.once('error', (e) => { if (e.code === 'EADDRINUSE' && p !== 0) tryListen(0); else reject(e); });
      server.listen(p, '127.0.0.1', () => { server.removeAllListeners('error'); resolve(server.address().port); });
    };
    tryListen(port);
  });
}
export const stop = () => server.close();

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  start().then((p) => console.log(`java runner on http://127.0.0.1:${p}`));
}
