import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const useSearchParamsUtility = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const setFilterParams = useCallback((key: string, value: string) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            if (value === "" || value === null) {
                newParams.delete(key);
            } else {
                newParams.set(key, value);
            }
            return newParams;
        });
    }, [setSearchParams]);

    const getFilterParam = useCallback((key: string, defaultValue: string) => {
        return searchParams.get(key) ?? defaultValue;
    }, [searchParams]);

    const resetFilterParams = useCallback(() => {
        setSearchParams(new URLSearchParams());
    }, [setSearchParams]);

    return { getFilterParam, setFilterParams, resetFilterParams };
};