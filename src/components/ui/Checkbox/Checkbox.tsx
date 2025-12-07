import { Checkbox as AntCheckbox, type CheckboxProps as AntCheckboxProps } from 'antd'
import { type ReactNode } from 'react'

export type CheckboxProps = AntCheckboxProps & {
  children?: ReactNode
  className?: string
}

export const Checkbox = ({ children, className, ...props }: CheckboxProps) => {
  return (
    <AntCheckbox className={className} {...props}>
      {children}
    </AntCheckbox>
  )
}

// Export Checkbox.Group as a sub-component
Checkbox.Group = AntCheckbox.Group

