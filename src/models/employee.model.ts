import type { Workplace } from "./workplace.model";
import type { WorkCenter } from "./workcenter.model";

export interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    father_name: string;
    date_of_birth: string;
    email: string;
    city: string;
    job_title: string | null;
    rfid_uid: string;
    workplace: Workplace;
    workcenter: WorkCenter;
    is_staff: boolean;
    is_superuser: boolean;
}
