import { Form as AntForm, type FormProps as AntFormProps } from 'antd'
import { type ReactNode } from 'react'

export type FormProps<T = Record<string, unknown>> = AntFormProps<T> & {
  children?: ReactNode
  className?: string
}

export const Form = <T extends Record<string, unknown> = Record<string, unknown>>({ 
  children, 
  className, 
  ...props 
}: FormProps<T>) => {
  return (
    <AntForm className={className} {...props}>
      {children}
    </AntForm>
  )
}

// Export Form.Item as a sub-component
Form.Item = AntForm.Item
Form.List = AntForm.List
Form.ErrorList = AntForm.ErrorList
Form.Provider = AntForm.Provider

