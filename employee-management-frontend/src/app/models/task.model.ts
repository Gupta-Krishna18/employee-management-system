export interface Task {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    dueDate: string;
    projectId: number;
    projectName: string;
    assignedToId: number;
    assignedToName: string;
}