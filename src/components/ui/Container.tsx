import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
  as?: "section" | "div" | "article" | "header" | "footer";
};

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-[76rem]",
  wide: "max-w-[88rem]",
};

export function Container({
  children,
  className = "",
  size = "default",
  as: Tag = "div",
}: Props) {
  return (
    <Tag className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${sizes[size]} ${className}`}>
      {children}
    </Tag>
  );
}
