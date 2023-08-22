export interface Manager {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export interface Department {
    id: number;
    manager: Manager;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
}
