import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "purple" | "green" | "orange" | "white";
  className?: string;
};

const variants = {
  purple: "bg-paars-primair/10 text-paars-primair",
  green: "bg-groen-gras/15 text-groen-donker",
  orange: "bg-oranje-warm/15 text-oranje-warm",
  white: "bg-wit/15 text-wit border border-wit/30",
};

export function SectionTag({ children, variant = "purple", className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-pill px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] ${variants[variant]} ${className}`}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-60" aria-hidden />
      {children}
    </span>
  );
}
