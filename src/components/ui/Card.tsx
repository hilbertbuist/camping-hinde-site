import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
};

export function Card({ children, className = "", as: Tag = "div" }: Props) {
  return (
    <Tag
      className={`card-lift overflow-hidden rounded-card border border-rand-zacht bg-wit shadow-sm ${className}`}
    >
      {children}
    </Tag>
  );
}
