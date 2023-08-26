import httpClient from "@/common/httpClient";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Department } from "@/models/department.model";
import type { DepartmentForUpdate } from "@/models/departmentForUpdate.model";
import type { DepartmentForCreation } from "@/models/departmentForCreation.model";

export const useDepartmentsStore = defineStore("departments", () => {
    const departments = ref<Department[]>([]);
    const isLoading = ref(false);
    const error = ref("");

    /**
     * Fetch all departments.
     */
    const fetchDepartments = async () => {
        isLoading.value = true;
        try {
            const response = await httpClient.get("/departments/");
            if (response.status === 200) {
                departments.value = response.data;
            } else {
                error.value = "Greška pri učitavanju odjela";
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri učitavanju odjela";
            }
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Delete a department by its ID.
     * @param workplaceId - The ID of the department to delete.
     * @returns true if the deletion was successful, false otherwise.
     */
    const deleteDepartment = async (departmentId: number) => {
        isLoading.value = true;
        try {
            const response = await httpClient.delete(`/departments/${departmentId}/`);
            if (response.status === 204) {
                departments.value = departments.value.filter((department) => department.id !== departmentId);
                return true;
            } else {
                error.value = "Greška pri brisanju odjela";
                return false;
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri brisanju odjela";
            }
            return false;
        } finally {
            isLoading.value = false;
        }
    }


    /**
     * Update a department.
     * @param department - The department to update.
     * @returns true if the update was successful, false otherwise.
     */
    const updateDepartment = async (department: DepartmentForUpdate) => {
        isLoading.value = true;
        try {
            const response = await httpClient.put(`/departments/${department.id}/`, department);
            if (response.status === 200) {
                return true;
            } else {
                error.value = "Greška pri ažuriranju odjela";
                return false;
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri ažuriranju odjela";
            }
            return false;
        } finally {
            isLoading.value = false;
        }
    }

    /**
     * Create a department.
     * @param department - The department to create.
     * @returns true if the creation was successful, false otherwise.
     */
    const createDepartment = async (department: DepartmentForCreation) => {
        isLoading.value = true;
        try {
            const response = await httpClient.post("/departments/", department);
            if (response.status === 201) {
                return true;
            } else {
                error.value = "Greška pri kreiranju odjela";
                return false;
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri kreiranju odjela";
            }
            return false;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        departments,
        fetchDepartments,
        isLoading,
        error,
        deleteDepartment,
        updateDepartment,
        createDepartment
    };
});
