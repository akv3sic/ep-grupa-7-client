export interface WorkOrder {
    id: number;
    title: string;
    description: string;
    start_time: string;
    due_time: string;
    complete_time: string;
    work_center_id: number;
    work_center: string;
    category_id: number;
    category: string;
    created_by_id: number;
    created_by: string;
    assigned_to_id: number;
    assigned_to: string;
    status_id: number;
    status: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
}
