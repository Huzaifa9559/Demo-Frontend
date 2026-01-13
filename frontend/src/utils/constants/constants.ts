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


export const SOMETHING_WENT_WRONG = "An unexpected error occurred. Please try again later.";
export const UNABLE_TO_FIND = "The requested resource could not be found. Please verify your information and try again.";
