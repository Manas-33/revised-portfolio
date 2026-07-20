// Minimal 5x5 dot-matrix wordmark spelling "M".
const M = [
  [1, 0, 0, 0, 1],
  [1, 1, 0, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
];

const STEP = 6;
const R = 1.4;

export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className={className}
      role="img"
      aria-label="Manas Dalvi"
    >
      {M.flatMap((row, y) =>
        row.map((on, x) => (
          <circle
            key={`${x}-${y}`}
            cx={2 + x * STEP}
            cy={2 + y * STEP}
            r={R}
            fill={on ? "var(--ink)" : "var(--rule)"}
          />
        )),
      )}
    </svg>
  );
}
