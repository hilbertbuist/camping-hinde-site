/**
 * Volledig getekende SVG-plattegrond van Boerderijcamping De Hinde.
 * Coördinaten in viewBox 1000x1180.
 * Hotspot-percentages in `map-hotspots.ts` zijn gealigneerd met deze tekening.
 */

const COLORS = {
  grass: "#9FCB6E",
  grassDark: "#7DBA38",
  grassDarker: "#5C9128",
  path: "#E8E0CD",
  pathLine: "#C9BFA4",
  road: "#9CA3AF",
  treeDark: "#3B7E2A",
  treeMid: "#5DA73A",
  treeLight: "#85C957",
  building: "#9C7A4E",
  buildingDark: "#7A5E3A",
  roof: "#5C4A30",
  hutRed: "#B7392E",
  hutRoof: "#7A2620",
  tentDark: "#3A4A36",
  tentLight: "#647B5E",
  water: "#7FC2E6",
  sand: "#E6CD9A",
  white: "#FAF6EE",
  ink: "#1F2421",
};

export function CampMapSvg() {
  return (
    <svg
      viewBox="0 0 1000 1180"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Plattegrond Boerderijcamping De Hinde"
    >
      {/* ============= BACKGROUND ============= */}
      <rect width="1000" height="1180" fill={COLORS.grass} />

      {/* ============= MAIN PATHS (white/beige) ============= */}
      {/* Top horizontal path along safaritents */}
      <rect x="220" y="0" width="600" height="60" fill={COLORS.path} />
      {/* Vertical path between top fields */}
      <rect x="370" y="60" width="50" height="320" fill={COLORS.path} />
      <rect x="540" y="60" width="50" height="320" fill={COLORS.path} />
      {/* Horizontal path across middle */}
      <rect x="0" y="380" width="1000" height="50" fill={COLORS.path} />
      {/* Vertical path connecting central buildings */}
      <rect x="250" y="430" width="60" height="280" fill={COLORS.path} />
      <rect x="430" y="430" width="60" height="280" fill={COLORS.path} />
      <rect x="540" y="380" width="60" height="500" fill={COLORS.path} />
      {/* Right vertical path */}
      <rect x="800" y="380" width="50" height="700" fill={COLORS.path} />
      {/* Bottom path */}
      <rect x="0" y="880" width="1000" height="60" fill={COLORS.path} />

      {/* ============= ROAD AT BOTTOM ============= */}
      <rect x="0" y="1100" width="1000" height="80" fill={COLORS.road} />
      <line
        x1="20"
        y1="1140"
        x2="980"
        y2="1140"
        stroke={COLORS.white}
        strokeWidth="3"
        strokeDasharray="22 16"
      />

      {/* ============= COMPASS ROSE (top-left) ============= */}
      <CompassRose cx={100} cy={75} r={45} />

      {/* ============= PARKING NORD (top-left, below compass) ============= */}
      <ParkingLot x={30} y={140} width={130} height={210} cars={20} />

      {/* ============= PARKING SOUTH (left, near bottom) ============= */}
      <ParkingLot x={50} y={840} width={90} height={120} cars={12} />

      {/* ============= TOP-HALF CAMPING FIELDS (vogels) ============= */}
      {/* Gru – Grutto veld */}
      <FieldRect x={180} y={155} w={90} h={210} label="Gru" />
      {/* Ki – Kievit veld */}
      <FieldRect x={275} y={155} w={90} h={210} label="Ki" />
      {/* Tu – Tureluur veld (kleiner, top-center) */}
      <FieldRect x={425} y={70} w={110} h={110} label="Tu" />
      {/* Zw – Zwaluw veld */}
      <FieldRect x={595} y={155} w={90} h={130} label="Zw" />
      {/* Re – Reiger veld */}
      <FieldRect x={690} y={155} w={110} h={130} label="Re" />
      {/* Mu – Mus veld */}
      <FieldRect x={595} y={295} w={205} h={75} label="Mu" />

      {/* ============= TREES (scattered) ============= */}
      <Tree cx={75} cy={420} r={18} />
      <Tree cx={130} cy={400} r={22} />
      <Tree cx={180} cy={420} r={18} />
      <Tree cx={250} cy={50} r={16} />
      <Tree cx={400} cy={45} r={18} />
      <Tree cx={550} cy={45} r={18} />
      <Tree cx={700} cy={50} r={20} />
      <Tree cx={780} cy={45} r={16} />
      <Tree cx={880} cy={300} r={22} />
      <Tree cx={920} cy={350} r={18} />
      <Tree cx={870} cy={420} r={20} />
      <Tree cx={930} cy={460} r={18} />
      <Tree cx={870} cy={520} r={22} />
      <Tree cx={930} cy={600} r={18} />
      <Tree cx={870} cy={680} r={20} />
      <Tree cx={50} cy={500} r={20} />
      <Tree cx={120} cy={530} r={22} />
      <Tree cx={50} cy={590} r={18} />
      <Tree cx={130} cy={620} r={20} />
      <Tree cx={50} cy={680} r={22} />
      <Tree cx={70} cy={760} r={18} />
      <Tree cx={140} cy={815} r={20} />
      <Tree cx={150} cy={1010} r={22} />
      <Tree cx={50} cy={1020} r={18} />
      <Tree cx={400} cy={1020} r={20} />
      <Tree cx={520} cy={1020} r={18} />
      <Tree cx={640} cy={1020} r={22} />
      <Tree cx={770} cy={1020} r={20} />
      <Tree cx={920} cy={1020} r={22} />
      <Tree cx={870} cy={760} r={20} />
      <Tree cx={920} cy={830} r={18} />
      <Tree cx={875} cy={900} r={22} />

      {/* ============= TOP-HALF DECORATIONS ============= */}
      {/* Pinwheels next to safaritents (decorative, animate via CSS) */}
      <Pinwheel cx={400} cy={50} />
      <Pinwheel cx={555} cy={50} />
      <Pinwheel cx={680} cy={50} />

      {/* Slide / playground in middle of top fields */}
      <g transform="translate(450, 220)">
        <rect x="-20" y="-10" width="80" height="60" fill={COLORS.sand} rx="6" />
        <polygon points="0,40 40,0 50,0 50,8 8,40" fill="#E5524B" />
        <rect x="-10" y="0" width="6" height="40" fill={COLORS.buildingDark} />
        <rect x="50" y="0" width="6" height="40" fill={COLORS.buildingDark} />
      </g>

      {/* ============= SAFARITENTS (top row, 3 stuks) ============= */}
      <SafariTent x={290} y={30} number={3} />
      <SafariTent x={440} y={30} number={4} />
      <SafariTent x={550} y={35} number={5} />

      {/* ============= BOTTOM-HALF GEWASSEN (camping fields) ============= */}
      {/* Centraal pinwheel-pattern rond een centraal pad */}
      {/* Zi – Zilverui */}
      <FieldRect x={210} y={430} w={70} h={70} label="Zi" tone="darker" />
      {/* Wo – Wortel */}
      <FieldRect x={285} y={430} w={70} h={70} label="Wo" tone="darker" />
      {/* Lu – Luzerne */}
      <FieldRect x={360} y={430} w={70} h={70} label="Lu" tone="darker" />
      {/* Ta – Tarwe */}
      <FieldRect x={360} y={505} w={70} h={70} label="Ta" tone="darker" />
      {/* Aa – Aardappel */}
      <FieldRect x={360} y={580} w={70} h={70} label="Aa" tone="darker" />
      {/* Wi – Witof */}
      <FieldRect x={285} y={580} w={70} h={70} label="Wi" tone="darker" />
      {/* Bo – Bonen */}
      <FieldRect x={210} y={620} w={70} h={70} label="Bo" tone="darker" />
      {/* Er – Erwten */}
      <FieldRect x={140} y={580} w={65} h={70} label="Er" tone="darker" />
      {/* Ma – Maïs */}
      <FieldRect x={140} y={505} w={65} h={70} label="Ma" tone="darker" />

      {/* ============= TWEE BUILDING COMPLEXEN (sanitair + recreatieruimte) ============= */}
      {/* Linker gebouwencomplex */}
      <BuildingComplex x={310} y={690} />
      {/* Rechter gebouw (Stalloon) */}
      <Stalloon x={550} y={730} />

      {/* ============= GROTE GROENE VELDEN RECHTS ============= */}
      {/* Veld 6 (sportveld linksboven van rechtergroep) */}
      <BigField x={620} y={420} w={180} h={200} label="6" tint="dark" />
      {/* Veld 4 (recreatieruimte gebied – ander veld) */}
      <BigField x={620} y={750} w={180} h={120} label="4" tint="orange" />
      {/* Veld 5 (sportveld onderaan) */}
      <BigField x={620} y={880} w={180} h={200} label="5" tint="dark" />

      {/* ============= ACCOMMODATIES (Hutten) ============= */}
      <Hut x={130} y={750} number={1} />
      <Hut x={150} y={555} number={2} />

      {/* ============= DIEREN GEBIEDEN ============= */}
      {/* Kippenveld – iets aangegeven met een lichter veld + label */}
      <AnimalArea x={180} y={750} w={100} h={70} label="Kippen" tint="sand" />
      {/* Pony schuur */}
      <AnimalArea x={300} y={830} w={70} h={50} label="Pony" tint="sand" />
      {/* Geitenweide */}
      <AnimalArea x={620} y={730} w={170} h={80} label="Geiten" tint="darker" />
      {/* Pony weide */}
      <AnimalArea x={620} y={900} w={170} h={150} label="Ponywei" tint="darker" />

      {/* ============= LOGO ============= */}
      <CampingLogo x={260} y={1015} />

      {/* ============= LEGENDA-RANDJES (mooi eindigen) ============= */}
      <rect
        x="0"
        y="0"
        width="1000"
        height="1180"
        fill="none"
        stroke={COLORS.grassDarker}
        strokeWidth="4"
      />
    </svg>
  );
}

/* ============= REUSABLE PIECES ============= */

function CompassRose({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={COLORS.white} stroke={COLORS.ink} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r * 0.55} fill="none" stroke={COLORS.ink} strokeWidth="0.8" />
      {/* N */}
      <polygon
        points={`${cx},${cy - r + 4} ${cx - 6},${cy - 4} ${cx + 6},${cy - 4}`}
        fill={COLORS.ink}
      />
      <text x={cx} y={cy - r + 14} fontSize="10" fontWeight="700" fill={COLORS.ink} textAnchor="middle">N</text>
      {/* S */}
      <polygon
        points={`${cx},${cy + r - 4} ${cx - 6},${cy + 4} ${cx + 6},${cy + 4}`}
        fill={COLORS.ink}
        opacity="0.4"
      />
      <text x={cx} y={cy + r - 6} fontSize="10" fontWeight="700" fill={COLORS.ink} textAnchor="middle">S</text>
      {/* E */}
      <text x={cx + r - 8} y={cy + 4} fontSize="10" fontWeight="700" fill={COLORS.ink} textAnchor="middle">E</text>
      {/* W */}
      <text x={cx - r + 8} y={cy + 4} fontSize="10" fontWeight="700" fill={COLORS.ink} textAnchor="middle">W</text>
    </g>
  );
}

function ParkingLot({ x, y, width, height, cars }: { x: number; y: number; width: number; height: number; cars: number }) {
  const cols = 4;
  const rows = Math.ceil(cars / cols);
  const carW = (width - 16) / cols - 2;
  const carH = (height - 20) / rows - 3;
  const items: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      if (idx >= cars) break;
      const cx = x + 8 + c * (carW + 2);
      const cy = y + 12 + r * (carH + 3);
      items.push(
        <rect
          key={`p-${r}-${c}`}
          x={cx}
          y={cy}
          width={carW}
          height={carH}
          fill="#A9B5BD"
          stroke={COLORS.ink}
          strokeWidth="0.6"
          rx="2"
        />
      );
    }
  }
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={COLORS.path} stroke={COLORS.pathLine} strokeWidth="1.5" rx="6" />
      <text x={x + width / 2} y={y + 9} fontSize="9" fontWeight="700" fill={COLORS.ink} textAnchor="middle">P</text>
      {items}
    </g>
  );
}

function FieldRect({
  x,
  y,
  w,
  h,
  label,
  tone = "default",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  tone?: "default" | "darker";
}) {
  const fill = tone === "darker" ? COLORS.grassDark : "#A8D26F";
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={COLORS.white} strokeWidth="2" rx="4" />
      {/* mowed-stripe pattern */}
      {Array.from({ length: Math.floor(h / 14) }).map((_, i) => (
        <line
          key={i}
          x1={x + 4}
          y1={y + 7 + i * 14}
          x2={x + w - 4}
          y2={y + 7 + i * 14}
          stroke={tone === "darker" ? COLORS.grassDarker : COLORS.grassDark}
          strokeWidth="0.9"
          opacity="0.55"
        />
      ))}
      <text
        x={x + w / 2}
        y={y + h / 2 + 6}
        fontSize="22"
        fontWeight="800"
        fill={COLORS.ink}
        textAnchor="middle"
        opacity="0.85"
      >
        {label}
      </text>
    </g>
  );
}

function Tree({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx + 1} cy={cy + 1} r={r} fill={COLORS.ink} opacity="0.18" />
      <circle cx={cx} cy={cy} r={r} fill={COLORS.treeDark} />
      <circle cx={cx - r * 0.35} cy={cy - r * 0.25} r={r * 0.5} fill={COLORS.treeMid} />
      <circle cx={cx + r * 0.3} cy={cy - r * 0.2} r={r * 0.4} fill={COLORS.treeLight} />
    </g>
  );
}

function Pinwheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <line x1="0" y1="0" x2="0" y2="20" stroke={COLORS.buildingDark} strokeWidth="2" />
      <g style={{ transformOrigin: "0 0", animation: "spin 6s linear infinite" }}>
        <path d="M 0 0 L 12 -2 L 14 -10 L 4 -8 Z" fill="#E5524B" />
        <path d="M 0 0 L -2 -12 L -10 -14 L -8 -4 Z" fill={COLORS.white} />
        <path d="M 0 0 L -12 2 L -14 10 L -4 8 Z" fill="#E5524B" />
        <path d="M 0 0 L 2 12 L 10 14 L 8 4 Z" fill={COLORS.white} />
        <circle cx="0" cy="0" r="2.5" fill={COLORS.ink} />
      </g>
    </g>
  );
}

function SafariTent({ x, y, number }: { x: number; y: number; number: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* shadow */}
      <ellipse cx="50" cy="78" rx="46" ry="6" fill={COLORS.ink} opacity="0.18" />
      {/* tent body */}
      <path
        d="M 8 75 L 8 35 L 50 8 L 92 35 L 92 75 Z"
        fill={COLORS.tentLight}
        stroke={COLORS.ink}
        strokeWidth="1.3"
      />
      {/* roof shadow */}
      <path d="M 8 35 L 50 8 L 92 35 L 92 42 L 50 16 L 8 42 Z" fill={COLORS.tentDark} opacity="0.6" />
      {/* door */}
      <path d="M 38 75 L 38 50 L 62 50 L 62 75 Z" fill={COLORS.tentDark} />
      <path d="M 50 75 L 50 50" stroke={COLORS.white} strokeWidth="0.8" />
      {/* poles */}
      <line x1="8" y1="35" x2="8" y2="80" stroke={COLORS.buildingDark} strokeWidth="1.5" />
      <line x1="92" y1="35" x2="92" y2="80" stroke={COLORS.buildingDark} strokeWidth="1.5" />
    </g>
  );
}

function Hut({ x, y, number }: { x: number; y: number; number: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* shadow */}
      <ellipse cx="20" cy="42" rx="22" ry="3.5" fill={COLORS.ink} opacity="0.2" />
      {/* body */}
      <rect x="0" y="14" width="42" height="28" fill={COLORS.hutRed} stroke={COLORS.ink} strokeWidth="1" />
      {/* roof */}
      <polygon
        points="-3,15 21,-2 45,15"
        fill={COLORS.hutRoof}
        stroke={COLORS.ink}
        strokeWidth="1"
      />
      {/* door */}
      <rect x="16" y="22" width="10" height="20" fill={COLORS.buildingDark} />
      {/* window */}
      <rect x="4" y="22" width="8" height="8" fill={COLORS.white} stroke={COLORS.ink} strokeWidth="0.5" />
      <rect x="30" y="22" width="8" height="8" fill={COLORS.white} stroke={COLORS.ink} strokeWidth="0.5" />
    </g>
  );
}

function BuildingComplex({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Main horizontal building */}
      <rect x="0" y="0" width="200" height="70" fill={COLORS.building} stroke={COLORS.ink} strokeWidth="1.2" />
      <polygon points="0,0 200,0 200,-12 0,-12" fill={COLORS.roof} />
      {/* Roof ridges */}
      <line x1="0" y1="-6" x2="200" y2="-6" stroke={COLORS.ink} strokeWidth="0.7" opacity="0.4" />
      {/* Doors and windows */}
      <rect x="20" y="38" width="14" height="32" fill={COLORS.buildingDark} />
      <rect x="50" y="20" width="20" height="14" fill={COLORS.water} stroke={COLORS.ink} strokeWidth="0.5" />
      <rect x="80" y="20" width="20" height="14" fill={COLORS.water} stroke={COLORS.ink} strokeWidth="0.5" />
      <rect x="110" y="20" width="20" height="14" fill={COLORS.water} stroke={COLORS.ink} strokeWidth="0.5" />
      <rect x="140" y="20" width="20" height="14" fill={COLORS.water} stroke={COLORS.ink} strokeWidth="0.5" />
      <rect x="170" y="38" width="14" height="32" fill={COLORS.buildingDark} />

      {/* Wing extending down */}
      <rect x="60" y="70" width="100" height="50" fill={COLORS.building} stroke={COLORS.ink} strokeWidth="1.2" />
      <rect x="80" y="80" width="20" height="14" fill={COLORS.water} stroke={COLORS.ink} strokeWidth="0.5" />
      <rect x="110" y="80" width="20" height="14" fill={COLORS.water} stroke={COLORS.ink} strokeWidth="0.5" />
      <rect x="100" y="100" width="14" height="20" fill={COLORS.buildingDark} />
    </g>
  );
}

function Stalloon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* shadow */}
      <ellipse cx="55" cy="105" rx="55" ry="6" fill={COLORS.ink} opacity="0.2" />
      {/* base */}
      <rect x="0" y="35" width="110" height="70" fill={COLORS.building} stroke={COLORS.ink} strokeWidth="1.2" />
      {/* big peaked roof */}
      <polygon points="-6,38 55,2 116,38" fill={COLORS.roof} stroke={COLORS.ink} strokeWidth="1.2" />
      <line x1="-6" y1="38" x2="116" y2="38" stroke={COLORS.ink} strokeWidth="0.6" />
      {/* big sliding door */}
      <rect x="36" y="55" width="40" height="50" fill={COLORS.buildingDark} stroke={COLORS.ink} strokeWidth="0.7" />
      <line x1="56" y1="55" x2="56" y2="105" stroke={COLORS.white} strokeWidth="0.8" />
      {/* windows */}
      <rect x="10" y="55" width="18" height="14" fill={COLORS.water} stroke={COLORS.ink} strokeWidth="0.5" />
      <rect x="82" y="55" width="18" height="14" fill={COLORS.water} stroke={COLORS.ink} strokeWidth="0.5" />
      {/* "Stalloon" text */}
      <text x="55" y="28" fontSize="9" fontWeight="700" fill={COLORS.ink} textAnchor="middle">
        STALLOON
      </text>
    </g>
  );
}

function BigField({
  x,
  y,
  w,
  h,
  label,
  tint = "dark",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  tint?: "dark" | "orange";
}) {
  const fill = tint === "orange" ? "#F4A52B" : COLORS.grassDark;
  const opacity = tint === "orange" ? 0.5 : 1;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} opacity={opacity} stroke={COLORS.white} strokeWidth="2" rx="6" />
      {/* mowed pattern for grass tint */}
      {tint === "dark" &&
        Array.from({ length: Math.floor(h / 18) }).map((_, i) => (
          <line
            key={i}
            x1={x + 6}
            y1={y + 9 + i * 18}
            x2={x + w - 6}
            y2={y + 9 + i * 18}
            stroke={COLORS.grassDarker}
            strokeWidth="1"
            opacity="0.5"
          />
        ))}
      <text
        x={x + w / 2}
        y={y + h / 2 + 12}
        fontSize="48"
        fontWeight="800"
        fill={COLORS.white}
        textAnchor="middle"
        opacity="0.55"
      >
        {label}
      </text>
    </g>
  );
}

function AnimalArea({
  x,
  y,
  w,
  h,
  label,
  tint = "darker",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  tint?: "darker" | "sand";
}) {
  const fill = tint === "sand" ? COLORS.sand : COLORS.grassDark;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={COLORS.ink} strokeWidth="1.2" rx="4" opacity="0.7" />
      {/* fence look */}
      {Array.from({ length: Math.floor(w / 14) }).map((_, i) => (
        <line
          key={i}
          x1={x + 7 + i * 14}
          y1={y}
          x2={x + 7 + i * 14}
          y2={y + 6}
          stroke={COLORS.buildingDark}
          strokeWidth="1"
        />
      ))}
      <line x1={x} y1={y + 6} x2={x + w} y2={y + 6} stroke={COLORS.buildingDark} strokeWidth="0.8" />
      <text
        x={x + w / 2}
        y={y + h - 8}
        fontSize="11"
        fontWeight="700"
        fill={COLORS.ink}
        textAnchor="middle"
        opacity="0.7"
      >
        {label}
      </text>
    </g>
  );
}

function CampingLogo({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="100" cy="80" rx="100" ry="10" fill={COLORS.ink} opacity="0.2" />
      {/* sun */}
      <circle cx="80" cy="20" r="14" fill="#F4A52B" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x1 = 80 + Math.cos(angle) * 18;
        const y1 = 20 + Math.sin(angle) * 18;
        const x2 = 80 + Math.cos(angle) * 26;
        const y2 = 20 + Math.sin(angle) * 26;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#F4A52B"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
      {/* tent */}
      <polygon points="20,75 50,30 80,75" fill="#3FA3D9" stroke={COLORS.ink} strokeWidth="1" />
      <line x1="50" y1="30" x2="50" y2="75" stroke={COLORS.ink} strokeWidth="0.8" />
      {/* deer (simplified) */}
      <ellipse cx="135" cy="60" rx="22" ry="12" fill="#A86D3F" />
      <circle cx="155" cy="48" r="8" fill="#A86D3F" />
      <path d="M 153 42 L 152 36 M 158 42 L 159 36" stroke="#A86D3F" strokeWidth="2" strokeLinecap="round" />
      <line x1="124" y1="70" x2="124" y2="80" stroke="#1F2421" strokeWidth="2" />
      <line x1="146" y1="70" x2="146" y2="80" stroke="#1F2421" strokeWidth="2" />
      {/* logo text */}
      <text x="100" y="115" fontSize="22" fontWeight="800" fill="#5A1F6B" textAnchor="middle" fontStyle="italic">
        de Hinde
      </text>
      <text x="100" y="100" fontSize="9" fontWeight="600" fill="#5A1F6B" textAnchor="middle" letterSpacing="1">
        BOERDERIJCAMPING
      </text>
    </g>
  );
}
