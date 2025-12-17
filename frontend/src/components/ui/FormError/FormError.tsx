import { type ReactNode } from "react";

export type FormErrorProps = {
  children: ReactNode;
  className?: string;
};

export const FormError = ({ children, className }: FormErrorProps) => {
  return (
    <div className={`mt-1 text-sm text-red-500 ${className ?? ""}`}>
      {children}
    </div>
  );
};

