import dayjs, { type Dayjs } from 'dayjs'
import type { Rule } from 'antd/es/form'

export const PROJECT_CODE_REGEX = /^PRJ-\d{3}$/i

export const PROJECT_NAME_RULES: Rule[] = [
  { required: true, message: 'Please enter a project name' },
  { min: 3, message: 'Project name must be at least 3 characters long' },
]

export const PROJECT_CODE_RULES: Rule[] = [
  { required: true, message: 'Please enter a project code' },
  {
    pattern: PROJECT_CODE_REGEX,
    message: 'Project code must match the pattern PRJ-123',
  },
]

export const PROJECT_OWNER_RULES: Rule[] = [
  { required: true, message: 'Please specify an owner' },
  { min: 3, message: 'Owner name must be at least 3 characters long' },
]

export const PROJECT_STATUS_RULES: Rule[] = [
  { required: true, message: 'Select the current project status' },
]

export const PROJECT_TICKETS_RULES: Rule[] = [
  {
    type: 'number',
    min: 0,
    max: 500,
    message: 'Tickets must be between 0 and 500',
  },
]

export const PROJECT_DUE_DATE_RULES: Rule[] = [
  { required: true, message: 'Select the next milestone date' },
  {
    validator: (_: unknown, value: Dayjs | undefined) => {
      if (!value) return Promise.resolve()
      const today = dayjs().startOf('day')
      if (value.isBefore(today)) {
        return Promise.reject(new Error('Due date cannot be in the past'))
      }
      return Promise.resolve()
    },
  },
]

