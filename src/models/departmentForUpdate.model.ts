import type { DepartmentForCreation } from "./departmentForCreation.model";

export interface DepartmentForUpdate extends DepartmentForCreation {
    id: number;
}