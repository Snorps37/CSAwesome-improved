import { CodeBlock } from './CodeBlock';

const starter = `public class Main {
    public static void main(String[] args) {

    }
}`;
const block = { type: 'code' as const, id: 'sandbox', starter, dot: true };

export function Sandbox() {
  return (
    <div className="sandbox">
      <h1>Sandbox</h1>
      <p className="sandbox-intro">Write and run Java. Your code is saved in this browser.</p>
      <details className="dot-reference">
        <summary>Dot API reference</summary>
        <div className="md">
          <p>Create an instance with <code>Dot dot = new Dot();</code>. Coordinates use (0, 0) at the center, positive y upward. The canvas shows approximately −110 to 110 on its shorter axis. Heading 0 points up; right turns are clockwise.</p>
          <table>
            <thead><tr><th>Method</th><th>Behavior</th></tr></thead>
            <tbody>
              <tr><td><code>new Dot(x, y, "cyan")</code></td><td>Start at a position and color. Position and color are optional.</td></tr>
              <tr><td><code>forward(n), backward(n), moveTo(x, y)</code></td><td>Move, leaving a trail when the pen is down (the default).</td></tr>
              <tr><td><code>turnLeft(deg), turnRight(deg), setHeading(deg)</code></td><td>Change direction in degrees.</td></tr>
              <tr><td><code>circle(r), rect(w, h)</code></td><td>Draw centered at the current position without moving. Rectangles rotate with the heading. Dimensions must be finite and nonnegative.</td></tr>
              <tr><td><code>line(length), lineTo(x, y)</code></td><td>Draw forward or to a coordinate and move there, even with the pen up. Length must be finite and nonnegative.</td></tr>
              <tr><td><code>text("Hello")</code></td><td>Draw horizontal text at the current position.</td></tr>
              <tr><td><code>setColor("red"), setColor("#67e8f9")</code></td><td>Set the color of future drawings and the dot. Standard CSS color names and hex colors are supported.</td></tr>
              <tr><td><code>fill(true), fill(false)</code></td><td>Fill future circles and rectangles, or draw outlines (the default).</td></tr>
              <tr><td><code>setSize(n), penDown(), penUp()</code></td><td>Set stroke and dot size, or enable/disable movement trails.</td></tr>
              <tr><td><code>clear()</code></td><td>Remove all drawings, keeping dot positions and styles.</td></tr>
              <tr><td><code>getX(), getY(), getHeading(), getColor(), isPenDown()</code></td><td>Read the current state.</td></tr>
            </tbody>
          </table>
        </div>
      </details>
      <CodeBlock block={block} lessonId="" sandbox />
    </div>
  );
}
