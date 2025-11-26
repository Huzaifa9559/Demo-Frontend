import { Input, type InputProps } from 'antd'

const { Search: AntSearch } = Input

export type SearchProps = InputProps & {
  className?: string
  placeholder?: string
  onSearch?: (value: string) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  allowClear?: boolean
}

export const Search = ({
  className,
  placeholder = 'Search...',
  onSearch,
  onChange,
  value,
  allowClear = true,
  ...props
}: SearchProps) => {
  return (
    <AntSearch
      className={className}
      placeholder={placeholder}
      allowClear={allowClear}
      value={value}
      onChange={onChange}
      onSearch={onSearch}
      {...props}
    />
  )
}

