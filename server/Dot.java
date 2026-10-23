import java.util.Locale;

/**
 * Dot: a tiny turtle-like helper. Each call prints a protocol line that the
 * web app turns into an animation. Heading 0 = up, angles in degrees,
 * turnRight is clockwise. The drawing area spans about -100..100 on both axes
 * with (0, 0) in the middle and y pointing up.
 */
public class Dot {
    private static int nextId = 1;
    private final int id = nextId++;
    private double x, y, heading;
    private boolean pen = true;
    private String color = "cyan";
    private double size = 3;

    public Dot() { this(0, 0); }
    public Dot(double x, double y) {
        this.x = x; this.y = y;
        emit("create", "\"x\":" + num(x) + ",\"y\":" + num(y));
    }
    public Dot(String color) { this(0, 0); setColor(color); }
    public Dot(double x, double y, String color) { this(x, y); setColor(color); }

    public void forward(double n) {
        double r = Math.toRadians(heading);
        moveTo(x + n * Math.sin(r), y + n * Math.cos(r));
    }
    public void backward(double n) { forward(-n); }
    public void moveTo(double nx, double ny) {
        x = nx; y = ny;
        emit("move", "\"x\":" + num(x) + ",\"y\":" + num(y));
    }
    public void turnLeft(double deg) { setHeading(heading - deg); }
    public void turnRight(double deg) { setHeading(heading + deg); }
    public void setHeading(double deg) {
        heading = ((deg % 360) + 360) % 360;
        emit("heading", "\"deg\":" + num(heading));
    }
    public void setColor(String c) {
        color = c;
        emit("color", "\"color\":\"" + esc(c) + "\"");
    }
    public void setSize(double s) {
        size = s;
        emit("size", "\"size\":" + num(s));
    }
    public void penDown() { pen = true; emit("pen", "\"down\":true"); }
    public void penUp() { pen = false; emit("pen", "\"down\":false"); }
    public void clear() { emit("clear", "\"_\":0"); }

    public double getX() { return x; }
    public double getY() { return y; }
    public double getHeading() { return heading; }
    public String getColor() { return color; }
    public boolean isPenDown() { return pen; }

    private void emit(String op, String fields) {
        System.out.println("@@DOT {\"id\":" + id + ",\"op\":\"" + op + "\"," + fields + "}");
    }
    private static String num(double d) {
        if (Double.isNaN(d) || Double.isInfinite(d)) return "0";
        return String.format(Locale.ROOT, "%.3f", d);
    }
    private static String esc(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replaceAll("[\\p{Cntrl}]", "");
    }
}
