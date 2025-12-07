import { Input as AntInput, type InputProps as AntInputProps } from 'antd'

export type InputProps = AntInputProps & {
  className?: string
}

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <AntInput className={className} {...props} />
  )
}

// Export Input.Password as a sub-component
Input.Password = AntInput.Password
Input.Search = AntInput.Search
Input.TextArea = AntInput.TextArea

