type Block = { x: number; w: number; h: number };

const H = 260;

const back: Block[] = [
  { x: 0, w: 90, h: 120 }, { x: 90, w: 70, h: 170 }, { x: 160, w: 110, h: 140 },
  { x: 270, w: 80, h: 200 }, { x: 350, w: 120, h: 130 }, { x: 470, w: 70, h: 180 },
  { x: 540, w: 100, h: 150 }, { x: 640, w: 90, h: 210 }, { x: 730, w: 110, h: 140 },
  { x: 840, w: 80, h: 175 }, { x: 920, w: 120, h: 135 }, { x: 1040, w: 90, h: 190 },
  { x: 1130, w: 110, h: 145 }, { x: 1240, w: 80, h: 165 }, { x: 1320, w: 120, h: 125 },
];

const mid: Block[] = [
  { x: 20, w: 100, h: 95 }, { x: 120, w: 80, h: 135 }, { x: 200, w: 120, h: 105 },
  { x: 320, w: 90, h: 150 }, { x: 410, w: 110, h: 100 }, { x: 520, w: 80, h: 140 },
  { x: 600, w: 120, h: 110 }, { x: 720, w: 90, h: 160 }, { x: 810, w: 110, h: 105 },
  { x: 920, w: 100, h: 145 }, { x: 1020, w: 120, h: 100 }, { x: 1140, w: 90, h: 150 },
  { x: 1230, w: 110, h: 110 }, { x: 1340, w: 100, h: 130 },
];

// Maisons à toit en pente au premier plan.
const houses: Block[] = [
  { x: 0, w: 110, h: 60 }, { x: 140, w: 90, h: 78 }, { x: 260, w: 120, h: 56 },
  { x: 410, w: 100, h: 84 }, { x: 540, w: 120, h: 60 }, { x: 690, w: 90, h: 76 },
  { x: 810, w: 120, h: 58 }, { x: 960, w: 100, h: 82 }, { x: 1090, w: 120, h: 60 },
  { x: 1240, w: 100, h: 74 }, { x: 1360, w: 90, h: 58 },
];

export default function Skyline() {
  return (
    <svg
      className="skyline"
      viewBox={`0 0 1440 ${H}`}
      preserveAspectRatio="xMaxYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <circle className="sun" cx="1120" cy="132" r="112" fill="#FFC233" />

      <g className="sky-layer" fill="#2A3FA0">
        {back.map((b) => (
          <rect key={b.x} x={b.x} y={H - b.h} width={b.w} height={b.h} />
        ))}
      </g>

      <g className="sky-layer sky-mid" fill="#1B2C80">
        {mid.map((b) => (
          <rect key={b.x} x={b.x} y={H - b.h} width={b.w} height={b.h} />
        ))}
      </g>

      <g className="sky-layer">
        {houses.map((b, i) => {
          const top = H - b.h;
          const roof = `${b.x - 8},${top} ${b.x + b.w / 2},${top - 34} ${b.x + b.w + 8},${top}`;
          return (
            <g key={b.x}>
              <rect x={b.x} y={top} width={b.w} height={b.h} fill="#0A1140" />
              <polygon points={roof} fill="#0A1140" />
              <rect
                x={b.x + b.w * 0.2}
                y={top + 14}
                width="14"
                height="16"
                rx="2"
                fill="#FFC233"
                opacity={i % 3 === 0 ? 0.55 : 1}
              />
              <rect
                x={b.x + b.w * 0.6}
                y={top + 14}
                width="14"
                height="16"
                rx="2"
                fill="#FFC233"
                opacity={i % 2 === 0 ? 1 : 0.5}
              />
            </g>
          );
        })}
        <rect x="0" y={H - 6} width="1440" height="6" fill="#23B5A5" />
      </g>
    </svg>
  );
}
