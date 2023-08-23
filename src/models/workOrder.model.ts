export interface WorkOrder {
    id: number;
    title: string;
    description: string;
    start_time: string;
    due_time: string;
    complete_time: string;
    work_center: string;
    category: string;
    created_by: string;
    assigned_to: string;
    status: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
}
