import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "orange" | "green" | "purple";
};

const variants = {
  orange: "bg-oranje-warm text-tekst-donker",
  green: "bg-groen-gras text-wit",
  purple: "bg-paars-primair text-wit",
};

export function WiggleBadge({ children, className = "", variant = "orange" }: Props) {
  return (
    <span className={`wiggle ${className}`}>
      <span
        className={`inline-block rounded-pill px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-sm ${variants[variant]}`}
      >
        {children}
      </span>
    </span>
  );
}
