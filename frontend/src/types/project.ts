export type ProjectRecord = {
  key: string;
  projectCode: string;
  name: string;
  owner: string;
  status: "In Progress" | "On Hold" | "Completed" | "Blocked";
  dueDate: string;
  tickets: number;
};

export const PROJECT_STATUS_COLORS: Record<ProjectRecord["status"], string> = {
  "In Progress": "blue",
  "On Hold": "orange",
  Completed: "green",
  Blocked: "red",
};
