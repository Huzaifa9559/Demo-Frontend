export type ProjectRecord = {
  key: string
  projectCode: string
  name: string
  owner: string
  status: 'In Progress' | 'On Hold' | 'Completed' | 'Blocked'
  dueDate: string
  tickets: number
}

export const PROJECT_STATUS_COLORS: Record<ProjectRecord['status'], string> = {
  'In Progress': 'blue',
  'On Hold': 'orange',
  Completed: 'green',
  Blocked: 'red',
}

export const PROJECT_ROWS: ProjectRecord[] = [
  {
    key: '1',
    projectCode: 'PRJ-204',
    name: 'Customer portal redesign initiative for premium users',
    owner: 'Jane Cooper',
    status: 'In Progress',
    dueDate: 'Jan 24, 2026',
    tickets: 42,
  },
  {
    key: '2',
    projectCode: 'PRJ-189',
    name: 'Mobile onboarding flow enhancements',
    owner: 'Devon Lane',
    status: 'On Hold',
    dueDate: 'Feb 2, 2026',
    tickets: 18,
  },
  {
    key: '3',
    projectCode: 'PRJ-173',
    name: 'Payments compliance review',
    owner: 'Ronald Richards',
    status: 'Completed',
    dueDate: 'Dec 11, 2025',
    tickets: 63,
  },
  {
    key: '4',
    projectCode: 'PRJ-162',
    name: 'Retail analytics dashboard revamp',
    owner: 'Courtney Henry',
    status: 'In Progress',
    dueDate: 'Jan 8, 2026',
    tickets: 27,
  },
  {
    key: '5',
    projectCode: 'PRJ-150',
    name: 'Infrastructure hardening and SOC 2 controls',
    owner: 'Leslie Alexander',
    status: 'Blocked',
    dueDate: 'Feb 15, 2026',
    tickets: 35,
  },
  {
    key: '6',
    projectCode: 'PRJ-145',
    name: 'Data lake ingestion accelerator',
    owner: 'Arlene McCoy',
    status: 'In Progress',
    dueDate: 'Mar 3, 2026',
    tickets: 51,
  },
  {
    key: '7',
    projectCode: 'PRJ-139',
    name: 'Customer success enablement toolkit',
    owner: 'Albert Flores',
    status: 'Completed',
    dueDate: 'Nov 19, 2025',
    tickets: 12,
  },
  {
    key: '8',
    projectCode: 'PRJ-133',
    name: 'Next-gen experimentation platform',
    owner: 'Eleanor Pena',
    status: 'In Progress',
    dueDate: 'Apr 14, 2026',
    tickets: 75,
  },
  {
    key: '9',
    projectCode: 'PRJ-128',
    name: 'Compliance evidence automation',
    owner: 'Marvin McKinney',
    status: 'On Hold',
    dueDate: 'Mar 22, 2026',
    tickets: 29,
  },
  {
    key: '10',
    projectCode: 'PRJ-121',
    name: 'AI-assisted knowledge base rollout',
    owner: 'Brooklyn Simmons',
    status: 'In Progress',
    dueDate: 'Feb 28, 2026',
    tickets: 46,
  },
  {
    key: '11',
    projectCode: 'PRJ-117',
    name: 'Partner marketplace expansion for EMEA',
    owner: 'Jacob Jones',
    status: 'Completed',
    dueDate: 'Oct 5, 2025',
    tickets: 8,
  },
  {
    key: '12',
    projectCode: 'PRJ-111',
    name: 'Accessibility remediation sprint',
    owner: 'Darlene Robertson',
    status: 'In Progress',
    dueDate: 'Jan 30, 2026',
    tickets: 22,
  },
]

