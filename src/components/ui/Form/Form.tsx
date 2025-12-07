import { Form as AntForm, type FormProps as AntFormProps } from 'antd'
import { type ReactNode } from 'react'

export type FormProps<T = any> = AntFormProps<T> & {
  children?: ReactNode
  className?: string
}

export const Form = <T = any,>({ children, className, ...props }: FormProps<T>) => {
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

