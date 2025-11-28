export const ALERT_TYPES = {
  ERROR: "error",
  SUCCESS: "success",
} as const;

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type StatusFilter = "all" | "active" | "hold" | "completed" | "blocked";
export type RangeFilter = "week" | "month" | "quarter";

export const STATUS_OPTIONS = [
  { label: "All Status", value: "all" },
  { label: "In Progress", value: "active" },
  { label: "On Hold", value: "hold" },
  { label: "Completed", value: "completed" },
  { label: "Blocked", value: "blocked" },
] as const;

export const RANGE_OPTIONS = [
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Quarter", value: "quarter" },
] as const;

export const SOMETHING_WENT_WRONG = "Something went wrong";
export const UNABLE_TO_FIND = "Unable to find";
