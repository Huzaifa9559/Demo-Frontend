import { Select, type SelectProps } from 'antd'

export type DropdownProps = SelectProps & {
  className?: string
  options?: Array<{ label: string; value: string | number }>
  value?: string | number
  onChange?: (value: string | number) => void
  placeholder?: string
}

export const Dropdown = ({
  className,
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  ...props
}: DropdownProps) => {
  return (
    <Select
      className={className}
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  )
}

