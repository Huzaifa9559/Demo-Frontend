import { useSearchParamsUtility } from '@hooks';
import { Select, type SelectProps } from 'antd'

export type DropdownProps = SelectProps & {
  paramKey: string
  className?: string
  options?: Array<{ label: string; value: string | number }>
  placeholder?: string
}

export const Dropdown = ({
  paramKey,
  className,
  options = [],
  defaultValue,
  placeholder = 'Select...',
  ...props
}: DropdownProps) => {
  const { getFilterParam, setFilterParams } = useSearchParamsUtility();
  return (
    <Select
      className={className}
      options={options}
      value={getFilterParam(paramKey, defaultValue)}
      onChange={(value) => setFilterParams(paramKey, value as string)}
      placeholder={placeholder}
      {...props}
    />
  )
}

