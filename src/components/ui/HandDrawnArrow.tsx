type Props = {
  className?: string;
  color?: string;
  direction?: "right" | "down" | "downRight";
};

export function HandDrawnArrow({
  className = "",
  color = "var(--color-oranje-warm)",
  direction = "right",
}: Props) {
  if (direction === "down") {
    return (
      <svg
        viewBox="0 0 60 80"
        className={className}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path
          className="draw-stroke"
          d="M30 6 C 26 22, 36 36, 28 52 C 22 64, 32 70, 30 74"
        />
        <path d="M22 66 L30 76 L38 66" />
      </svg>
    );
  }

  if (direction === "downRight") {
    return (
      <svg
        viewBox="0 0 100 80"
        className={className}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path
          className="draw-stroke"
          d="M8 12 C 22 28, 44 22, 64 38 C 78 50, 86 56, 90 66"
        />
        <path d="M82 56 L92 68 L80 70" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 120 40"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path
        className="draw-stroke"
        d="M6 22 C 28 12, 56 28, 84 18 C 96 14, 104 22, 112 20"
      />
      <path d="M102 12 L114 20 L102 28" />
    </svg>
  );
}

type CircleProps = {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
};

export function HandDrawnCircle({ children, className = "", rotate = -3 }: CircleProps) {
  return (
    <span
      className={`relative inline-block px-5 py-2 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 200 60"
        fill="none"
        stroke="var(--color-oranje-warm)"
        strokeWidth="2.5"
        strokeLinecap="round"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M30 8 C 80 2, 160 4, 188 18 C 198 26, 196 42, 170 50 C 130 60, 60 58, 18 48 C 2 42, 4 26, 14 18 C 22 12, 30 10, 30 8 Z" />
      </svg>
      <span className="relative font-script text-lg text-tekst-donker">{children}</span>
    </span>
  );
}
