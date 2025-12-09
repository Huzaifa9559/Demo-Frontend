import { ProjectStatus } from '../entities/project.entity';
import * as dayjs from 'dayjs';

export interface SeedProject {
  projectCode: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  dueDate: Date;
  tickets: number;
}

export const SEED_PROJECTS: SeedProject[] = [
  {
    projectCode: 'PRJ-204',
    name: 'Customer portal redesign initiative for premium users',
    owner: 'Jane Cooper',
    status: ProjectStatus.IN_PROGRESS,
    dueDate: dayjs('2026-01-24').toDate(),
    tickets: 42,
  },
  {
    projectCode: 'PRJ-189',
    name: 'Mobile onboarding flow enhancements',
    owner: 'Devon Lane',
    status: ProjectStatus.ON_HOLD,
    dueDate: dayjs('2026-02-02').toDate(),
    tickets: 18,
  },
  {
    projectCode: 'PRJ-173',
    name: 'Payments compliance review',
    owner: 'Ronald Richards',
    status: ProjectStatus.COMPLETED,
    dueDate: dayjs('2025-12-11').toDate(),
    tickets: 63,
  },
  {
    projectCode: 'PRJ-162',
    name: 'Retail analytics dashboard revamp',
    owner: 'Courtney Henry',
    status: ProjectStatus.IN_PROGRESS,
    dueDate: dayjs('2026-01-08').toDate(),
    tickets: 27,
  },
  {
    projectCode: 'PRJ-150',
    name: 'Infrastructure hardening and SOC 2 controls',
    owner: 'Leslie Alexander',
    status: ProjectStatus.BLOCKED,
    dueDate: dayjs('2026-02-15').toDate(),
    tickets: 35,
  },
  {
    projectCode: 'PRJ-145',
    name: 'Data lake ingestion accelerator',
    owner: 'Arlene McCoy',
    status: ProjectStatus.IN_PROGRESS,
    dueDate: dayjs('2026-03-03').toDate(),
    tickets: 51,
  },
  {
    projectCode: 'PRJ-139',
    name: 'Customer success enablement toolkit',
    owner: 'Albert Flores',
    status: ProjectStatus.COMPLETED,
    dueDate: dayjs('2025-11-19').toDate(),
    tickets: 12,
  },
  {
    projectCode: 'PRJ-133',
    name: 'Next-gen experimentation platform',
    owner: 'Eleanor Pena',
    status: ProjectStatus.IN_PROGRESS,
    dueDate: dayjs('2026-04-14').toDate(),
    tickets: 75,
  },
  {
    projectCode: 'PRJ-128',
    name: 'Compliance evidence automation',
    owner: 'Marvin McKinney',
    status: ProjectStatus.ON_HOLD,
    dueDate: dayjs('2026-03-22').toDate(),
    tickets: 29,
  },
  {
    projectCode: 'PRJ-121',
    name: 'AI-assisted knowledge base rollout',
    owner: 'Brooklyn Simmons',
    status: ProjectStatus.IN_PROGRESS,
    dueDate: dayjs('2026-02-28').toDate(),
    tickets: 46,
  },
  {
    projectCode: 'PRJ-117',
    name: 'Partner marketplace expansion for EMEA',
    owner: 'Jacob Jones',
    status: ProjectStatus.COMPLETED,
    dueDate: dayjs('2025-10-05').toDate(),
    tickets: 8,
  },
  {
    projectCode: 'PRJ-111',
    name: 'Accessibility remediation sprint',
    owner: 'Darlene Robertson',
    status: ProjectStatus.IN_PROGRESS,
    dueDate: dayjs('2026-01-30').toDate(),
    tickets: 22,
  },
];

