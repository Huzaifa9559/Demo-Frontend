import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd'
import { type ReactNode } from 'react'

export type ButtonProps = AntButtonProps & {
  children?: ReactNode
  className?: string
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <AntButton className={className} {...props}>
      {children}
    </AntButton>
  )
}

