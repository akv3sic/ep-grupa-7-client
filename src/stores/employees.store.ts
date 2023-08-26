import httpClient from "@/common/httpClient";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Employee } from "@/models/employee.model";

export const useEmployeesStore = defineStore("employees", () => {
    const employees = ref<Employee[]>([]);
    const isLoading = ref(false);
    const error = ref("");

    const fetchEmployees = async (departmentId: number | null = null, role: string | null = null) => {
        isLoading.value = true;
        try {
            let endpoint = "/user/";
            
            const response = await httpClient.get(endpoint, { params: { department: departmentId, role: role } });
            if (response.status === 200) {
                employees.value = response.data;
            } else {
                error.value = "Greška pri učitavanju zaposlenika";
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri učitavanju zaposlenika";
            }
        } finally {
            isLoading.value = false;
        }
    }; 

    return {
        employees,
        fetchEmployees,
        isLoading,
        error
    };
});
