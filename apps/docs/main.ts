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
  {
    name: "Hello, World",
    source: `print "Hello, World!"`,
  },
  {
    name: "Arithmetic",
    source: `show 1 + 2 * 3
show (10 - 4) / 2
show 2.0 * 3.14159`,
  },
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
    name: "Array comprehension",
    source: `let squares = array[i : 8] i * i
show squares[0]
show squares[3]
show squares[7]`,
  },
  {
    name: "Sum loop",
    source: `let n = 10
let total = sum[i : n] (i + 1)
show total`,
  },
  {
    name: "Boolean logic",
    source: `show true && false
show true || false
show !true
show 3 > 2 && 5 != 6`,
  },
  {
    name: "Math builtins",
    source: `show sqrt(2.0)
show sin(0.0)
show cos(0.0)
show pow(2.0, 10.0)
show floor(3.9)
show ceil(3.1)`,
  },
  {
    name: "Assert",
    source: `fn safe_div(a : int, b : int) : int {
  assert b != 0, "division by zero"
  return a / b
}
show safe_div(10, 2)`,
  },
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
