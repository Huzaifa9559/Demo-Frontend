import { type ReactNode } from "react";
import { Label } from "../Label";
import { FormError } from "../FormError";

export type FormFieldProps = {
  label: string;
  children: ReactNode;
  error?: string;
  touched?: boolean;
  className?: string;
};

export const FormField = ({
  label,
  children,
  error,
  touched,
  className,
}: FormFieldProps) => {
  return (
    <div className={className}>
      <Label className="block mb-1 text-sm font-medium">{label}</Label>
      {children}
      {touched && error && <FormError>{error}</FormError>}
    </div>
  );
};

