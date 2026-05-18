import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  external?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-groen-gras text-wit hover:bg-groen-donker focus-visible:ring-groen-donker",
  secondary:
    "bg-paars-primair text-wit hover:bg-paars-donker focus-visible:ring-paars-donker",
  outline:
    "bg-transparent text-paars-primair border border-paars-primair hover:bg-paars-primair hover:text-wit focus-visible:ring-paars-primair",
  ghost:
    "bg-transparent text-tekst-donker hover:bg-creme focus-visible:ring-tekst-donker",
  white:
    "bg-wit text-paars-primair hover:bg-creme focus-visible:ring-wit",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  type = "button",
  onClick,
  disabled,
  ariaLabel,
  external,
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-wit disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClasses} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
