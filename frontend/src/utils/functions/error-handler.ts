import axios from 'axios';
import { SOMETHING_WENT_WRONG } from '../constants';

/**
 * Extracts a user-friendly error message from various error types
 * @param error - The error object (can be Error, AxiosError, or unknown)
 * @returns A string error message
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;
    
    // Try to get error message from different possible fields
    return (
      responseData?.error?.message ||
      responseData?.message ||
      (typeof responseData?.error === "string" ? responseData.error : null) ||
      responseData?.errorMessage ||
      error.message ||
      SOMETHING_WENT_WRONG
    );
  }

  if (error instanceof Error) {
    return error.message || SOMETHING_WENT_WRONG;
  }

  return SOMETHING_WENT_WRONG;
};

