import { useSearchParamsUtility } from '@hooks'
import { Input, type InputProps } from 'antd'

const { Search: AntSearch } = Input

export type SearchProps = InputProps & {
  className?: string
  placeholder?: string
  allowClear?: boolean
}

export const Search = ({
  className,
  placeholder = 'Search...',
  allowClear = true,
  ...props
}: SearchProps) => {
  const { getFilterParam, setFilterParams } = useSearchParamsUtility();
  return (
    <AntSearch
      className={className}
      placeholder={placeholder}
      allowClear={allowClear}
      value={getFilterParam("search", "")}
      onChange={(event) => setFilterParams("search", event.target.value)}
      onSearch={(value) => setFilterParams("search", value)}
      {...props}
    />
  )
}

