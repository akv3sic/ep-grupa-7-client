export interface WorkOrderForCreation {
    title: string;
    description: string;
    due_time: string;
    work_center: number | null;
    category: number | null;
    assigned_to: number | null;
    status: number | null;
}
