import { useState, useEffect, useRef } from 'react'
import { useSearchParamsUtility } from '@hooks'
import { Input, type InputProps } from 'antd'

const { Search: AntSearch } = Input

export type SearchProps = InputProps & {
  className?: string
  placeholder?: string
  allowClear?: boolean
  debounceMs?: number
}

export const Search = ({
  className,
  placeholder = 'Search...',
  allowClear = true,
  debounceMs = 500,
  ...props
}: SearchProps) => {
  const { getFilterParam, setFilterParams } = useSearchParamsUtility();
  const initialSearchValue = getFilterParam("search", "");
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialMount = useRef(true);

  // Clean up empty search param on mount
  useEffect(() => {
    if (isInitialMount.current && initialSearchValue === "") {
      // Remove empty search param from URL if it exists
      const currentUrlValue = getFilterParam("search", "");
      if (currentUrlValue === "") {
        setFilterParams("search", "");
      }
      isInitialMount.current = false;
    }
  }, []);

  // Sync with URL param when it changes externally (e.g., from reset)
  const urlSearchValue = getFilterParam("search", "");
  useEffect(() => {
    if (isInitialMount.current) return;
    // Only sync if URL changed externally (not from our debounced update)
    if (urlSearchValue !== searchValue && !debounceTimerRef.current) {
      setSearchValue(urlSearchValue);
    }
  }, [urlSearchValue, searchValue]);

  // Debounce the URL param update
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setFilterParams("search", searchValue);
      debounceTimerRef.current = null;
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchValue, setFilterParams, debounceMs]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    // Clear debounce and update immediately on search button click or Enter
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    setFilterParams("search", value);
  };

  return (
    <AntSearch
      className={className}
      placeholder={placeholder}
      allowClear={allowClear}
      value={searchValue}
      onChange={handleChange}
      onSearch={handleSearch}
      {...props}
    />
  )
}

