import { SOMETHING_WENT_WRONG } from "../constants";

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const sortByUpdatedAtDesc = <T extends { updatedAt?: string }>(
  arr: T[]
): T[] =>
  [...arr].sort((a, b) => {
    const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return bTime - aTime;
  });

export const getPaginationParams = (page: number, limit = 10) => ({
  offset: (page - 1) * limit,
  limit,
});

export const getFirstErrorMessage = (errors: any): string | null => {
  if (!errors) return null;

  if (typeof errors === "string") return errors;

  if (Array.isArray(errors)) {
    for (const item of errors) {
      const found = getFirstErrorMessage(item);
      if (found) return found;
    }
  }

  if (typeof errors === "object") {
    for (const key in errors) {
      const found = getFirstErrorMessage(errors[key]);
      if (found) return found;
    }
  }

  return null;
};

export const getErrorMessage = (
  error: unknown,
  fallback = SOMETHING_WENT_WRONG
): string => {
  if (error instanceof Error) {
    return error.message || fallback;
  }

  if (typeof error === "string") {
    return error || fallback;
  }

  if (typeof error === "object" && error !== null) {
    const maybeAxiosError = error as any;
    if (maybeAxiosError.response?.data?.message) {
      return maybeAxiosError.response.data.message;
    }
    if (maybeAxiosError.message) {
      return maybeAxiosError.message;
    }
  }

  return fallback;
};
