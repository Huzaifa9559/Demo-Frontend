export const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'In progress' },
  { value: 'hold', label: 'On hold' },
  { value: 'completed', label: 'Completed' },
  { value: 'blocked', label: 'Blocked' },
] as const

export const RANGE_OPTIONS = [
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
  { value: 'quarter', label: 'This quarter' },
] as const

export type StatusFilter = (typeof STATUS_OPTIONS)[number]['value']
export type RangeFilter = (typeof RANGE_OPTIONS)[number]['value']

export const RANGE_DESCRIPTIONS: Record<RangeFilter, string> = {
  week: 'this week',
  month: 'this month',
  quarter: 'this quarter',
}

