import type { Department } from "@/models/department.model";

export interface WorkCenter {
    id: number;
    name: string;
    description: string;
    department: Department;
    is_deleted: boolean;
}
