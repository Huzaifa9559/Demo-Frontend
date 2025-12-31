import type { ProjectRecord } from "@/types/project";
import type { Dayjs } from "dayjs";

export type ProjectFormInitialValues = {
  name: string;
  projectCode: string;
  owner: string;
  status: ProjectRecord["status"];
  dueDate: Dayjs | null;
  tickets: number;
};

export const FormInitials = {
  projectFormInitials: (project?: Partial<ProjectRecord>): ProjectFormInitialValues => ({
    name: project?.name || '',
    projectCode: project?.projectCode || 'PRJ-',
    owner: project?.owner || '',
    status: project?.status || 'In Progress',
    dueDate: null, // Will be set separately from project.dueDate string
    tickets: project?.tickets ?? 0,
  }),
} as const;
