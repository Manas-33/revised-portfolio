// Node-constellation mark: a small network graph with signal pulses
// traveling along the edges — a nod to distributed systems / AI networks.
const NODES: [number, number][] = [
  [6, 8],
  [18, 6],
  [27, 16],
  [10, 23],
  [24, 26],
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 3],
  [3, 4],
  [2, 4],
];

export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Manas Dalvi"
      fill="none"
    >
      {EDGES.map(([a, b], i) => {
        const [x1, y1] = NODES[a];
        const [x2, y2] = NODES[b];
        return (
          <g key={`e-${i}`}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--faint)"
              strokeWidth={1}
            />
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--signal)"
              strokeWidth={1.5}
              strokeLinecap="round"
              pathLength={100}
              className="mark-signal"
              style={{ animationDelay: `${i * 0.38}s` }}
            />
          </g>
        );
      })}
      {NODES.map(([x, y], i) => (
        <circle key={`n-${i}`} cx={x} cy={y} r={1.7} fill="var(--ink)" />
      ))}
    </svg>
  );
}
