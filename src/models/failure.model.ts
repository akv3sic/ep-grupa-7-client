import type { User } from "./user.model";
import type { WorkCenter } from "./work-center.model";

export interface Failure {
    id: number;
    name: string;
    description: string;
    reported_by: User;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    work_order: number;
    work_center: WorkCenter;
}
