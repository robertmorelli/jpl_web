// ============================================================================
// JPL Playground — entry point
// ============================================================================

import { RunPage } from "../../src/ui/run_page.ts";

// ---------------------------------------------------------------------------
// Example programs
// ---------------------------------------------------------------------------

interface Example {
  name: string;
  source: string;
}

const EXAMPLES: Example[] = [
  // ── Basics ────────────────────────────────────────────────────────────────
  {
    name: "Hello, World",
    source: `print "Hello, World!"`,
  },
  {
    name: "Arithmetic",
    source: `show 1 + 2 * 3
show (10 - 4) / 2
show 17 % 5
show 2.0 * 3.14159`,
  },
  {
    name: "Boolean logic",
    source: `show true && false
show true || false
show !true
show 3 > 2 && 5 != 6
show 10 % 2 == 0`,
  },
  {
    name: "Math builtins",
    source: `show sqrt(2.0)
show sin(0.0)
show cos(0.0)
show pow(2.0, 10.0)
show floor(3.9)
show ceil(3.1)
show abs(-42.0)
show log(2.718281828)`,
  },

  // ── Functions ─────────────────────────────────────────────────────────────
  {
    name: "Factorial",
    source: `fn fact(n : int) : int {
  return if n <= 1 then 1 else n * fact(n - 1)
}

show fact(1)
show fact(5)
show fact(10)`,
  },
  {
    name: "Fibonacci",
    source: `fn fib(n : int) : int {
  return if n <= 1 then n else fib(n - 1) + fib(n - 2)
}

show fib(0)
show fib(1)
show fib(10)
show fib(15)`,
  },
  {
    name: "GCD & LCM",
    source: `fn gcd(a : int, b : int) : int {
  return if b == 0 then a else gcd(b, a % b)
}

fn lcm(a : int, b : int) : int {
  return a / gcd(a, b) * b
}

show gcd(48, 18)
show lcm(4, 6)
show lcm(12, 15)`,
  },
  {
    name: "Power (integer)",
    source: `fn ipow(base : int, e : int) : int {
  return if e == 0 then 1 else if e % 2 == 0 then ipow(base * base, e / 2) else base * ipow(base, e - 1)
}

show ipow(2, 10)
show ipow(3, 6)
show ipow(10, 5)`,
  },
  {
    name: "Assert / safe divide",
    source: `fn safe_div(a : int, b : int) : int {
  assert b != 0, "division by zero"
  return a / b
}

show safe_div(10, 2)
show safe_div(100, 4)`,
  },

  // ── Arrays ────────────────────────────────────────────────────────────────
  {
    name: "Array comprehension",
    source: `let squares = array[i : 8] i * i
show squares[0]
show squares[3]
show squares[7]

let evens = array[i : 6] (i * 2)
show evens[5]`,
  },
  {
    name: "Sum / product loops",
    source: `let n = 10
let total = sum[i : n] (i + 1)
show total

//sum of squares
show sum[i : 6] (i * i)

//triangular numbers
let tri = array[i : 6] sum[j : i + 1] (j + 1)
show tri[5]`,
  },
  {
    name: "2D array (matrix)",
    source: `//4×4 identity matrix
let identity = array[i : 4, j : 4] if i == j then 1 else 0

show identity[0, 0]
show identity[1, 1]
show identity[0, 1]
show identity[3, 3]

//Multiplication table
let times = array[i : 5, j : 5] (i + 1) * (j + 1)
show times[3, 4]`,
  },
  {
    name: "Array passed to function",
    source: `fn sum_array(a[n] : int[]) : int {
  return sum[i : n] a[i]
}

fn min_val(a[n] : int[]) : int {
  return sum[i : n] if a[i] < a[0] then a[i] - a[0] else 0 + a[0]
}

let data = array[i : 6] ((i - 2) * (i - 2))
show sum_array(data)
show data[0]
show data[5]`,
  },
  {
    name: "Array returned from function",
    source: `fn range(n : int) : int[] {
  return array[i : n] i
}

fn repeat(x : int, n : int) : int[] {
  return array[i : n] x
}

fn zeros(n : int) : int[] {
  return array[i : n] 0
}

let r = range(6)
show r[0]
show r[5]

let five3 = repeat(5, 3)
show five3[0]
show five3[2]`,
  },
  {
    name: "Map & filter patterns",
    source: `fn square(x : int) : int {
  return x * x
}

fn map_square(a[n] : int[]) : int[] {
  return array[i : n] square(a[i])
}

//count values matching a predicate
fn count_even(a[n] : int[]) : int {
  return sum[i : n] if a[i] % 2 == 0 then 1 else 0
}

let a = array[i : 7] (i + 1)
let b = map_square(a)
show b[0]
show b[6]
show count_even(a)`,
  },
  {
    name: "Dot product",
    source: `fn dot(a[n] : int[], b[m] : int[]) : int {
  return sum[i : n] a[i] * b[i]
}

let u = array[i : 4] (i + 1)
let v = array[i : 4] (i + 1)
show dot(u, v)

//float version
fn dot_f(a[n] : float[], b[m] : float[]) : float {
  return sum[i : n] a[i] * b[i]
}

let p = array[i : 3] to_float(i + 1)
let q = array[i : 3] to_float(i + 1)
show dot_f(p, q)`,
  },
  {
    name: "Reverse array",
    source: `fn reverse(a[n] : int[]) : int[] {
  return array[i : n] a[n - 1 - i]
}

let a = array[i : 6] (i * 2)
let b = reverse(a)
show a[0]
show a[5]
show b[0]
show b[5]`,
  },
  {
    name: "Prefix sums",
    source: `fn prefix_sum(a[n] : int[]) : int[] {
  return array[i : n] sum[j : i + 1] a[j]
}

let a = array[i : 6] (i + 1)
let p = prefix_sum(a)
show p[0]
show p[2]
show p[5]`,
  },
  {
    name: "Matrix row sums",
    source: `fn row_sums(m[rows, cols] : int[,]) : int[] {
  return array[i : rows] sum[j : cols] m[i, j]
}

let mat = array[i : 3, j : 4] (i * 4 + j + 1)
let rs  = row_sums(mat)
show rs[0]
show rs[1]
show rs[2]`,
  },
  {
    name: "Count positives",
    source: `fn count_positive(a[n] : int[]) : int {
  return sum[i : n] if a[i] > 0 then 1 else 0
}

fn count_negative(a[n] : int[]) : int {
  return sum[i : n] if a[i] < 0 then 1 else 0
}

let a = array[i : 9] (i - 4)
show count_positive(a)
show count_negative(a)`,
  },

  // ── Float arrays ──────────────────────────────────────────────────────────
  {
    name: "Float array & norm",
    source: `fn norm_sq(v[n] : float[]) : float {
  return sum[i : n] v[i] * v[i]
}

fn norm(v[n] : float[]) : float {
  return sqrt(norm_sq(v))
}

let v = array[i : 3] to_float(i + 1)
show norm_sq(v)
show norm(v)

let unit = array[i : 4] 0.25
show norm_sq(unit)`,
  },
  {
    name: "Sine table",
    source: `let n     = 8
let pi    = 3.14159265358979
let table = array[i : n] sin(to_float(i) * pi / to_float(n))

show table[0]
show table[2]
show table[4]
show table[6]`,
  },
  {
    name: "Newton's sqrt",
    source: `fn newton_step(x : float, guess : float, iters : int) : float {
  return if iters == 0 then guess else newton_step(x, (guess + x / guess) / 2.0, iters - 1)
}

fn my_sqrt(x : float) : float {
  return if x <= 0.0 then 0.0 else newton_step(x, x / 2.0, 20)
}

show my_sqrt(2.0)
show my_sqrt(9.0)
show my_sqrt(144.0)`,
  },

  // ── Timing ────────────────────────────────────────────────────────────────
  {
    name: "Timing",
    source: `fn fib(n : int) : int {
  return if n <= 1 then n else fib(n - 1) + fib(n - 2)
}

time show fib(30)`,
  },
];

// ---------------------------------------------------------------------------
// Build the sidebar
// ---------------------------------------------------------------------------

const listEl = document.getElementById("example-list")!;
const workspace = document.getElementById("workspace")!;

const page = new RunPage(workspace, {
  initialSource: EXAMPLES[0]!.source,
});

EXAMPLES.forEach((ex, i) => {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.className = "jpl-example-btn" + (i === 0 ? " active" : "");
  btn.textContent = ex.name;
  btn.addEventListener("click", () => {
    listEl.querySelectorAll(".jpl-example-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    page.source = ex.source;
  });
  li.appendChild(btn);
  listEl.appendChild(li);
});
