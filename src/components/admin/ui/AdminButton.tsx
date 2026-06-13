import Link from "next/link";
import type { ReactNode } from "react";

type AdminButtonProps = {
  children: ReactNode;
  variant?: "primary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

export function AdminButton({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: AdminButtonProps) {
  const classes = [
    "a-btn",
    `a-btn--${variant}`,
    size === "sm" ? "a-btn--sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default AdminButton;
