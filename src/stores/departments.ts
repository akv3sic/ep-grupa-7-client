import httpClient from "@/common/httpClient";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Department } from "@/models/department.model";

export const useDepartmentsStore = defineStore("departments", () => {
    const departments = ref<Department[]>([]);
    const isLoading = ref(false);
    const error = ref("");

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


    return {
        departments,
        fetchDepartments,
        isLoading,
        error,
        deleteDepartment,
    };
});
