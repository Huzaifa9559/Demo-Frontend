import { type ReactNode, type LabelHTMLAttributes } from 'react'

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children?: ReactNode
  className?: string
  htmlFor?: string
}

export const Label = ({ children, className, htmlFor, ...props }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={className} {...props}>
      {children}
    </label>
  )
}

