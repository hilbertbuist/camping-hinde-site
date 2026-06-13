import type { ReactNode } from "react";

type AdminCardProps = {
  children: ReactNode;
  className?: string;
};

export function AdminCard({ children, className = "" }: AdminCardProps) {
  return <div className={["a-card", className].filter(Boolean).join(" ")}>{children}</div>;
}

export default AdminCard;
