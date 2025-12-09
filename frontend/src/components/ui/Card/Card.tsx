import { Card as AntCard, type CardProps as AntCardProps } from "antd";
import { type ReactNode } from "react";

export type CardProps = AntCardProps & {
  children?: ReactNode;
  className?: string;
};

export const Card = ({ children, className, ...props }: CardProps) => {
  const defaultClassName = "rounded-2xl border border-slate-200 shadow-sm";
  const mergedClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;

  return (
    <AntCard className={mergedClassName} {...props}>
      {children}
    </AntCard>
  );
};

