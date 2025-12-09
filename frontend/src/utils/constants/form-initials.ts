export default class FormInitials {
  static projectFormInitials = (project?: any) => ({
    name: project?.name || '',
    projectCode: project?.projectCode || 'PRJ-',
    owner: project?.owner || '',
    status: project?.status || 'In Progress',
    dueDate: project?.dueDate || null,
    tickets: project?.tickets ?? 0,
  });
}
