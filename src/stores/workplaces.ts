import httpClient from "@/common/httpClient";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Workplace } from "@/models/workplace.model";
import type { WorkplaceForCreation } from "@/models/workplaceForCreation.model";

export const useWorkplacesStore = defineStore("workplaces", () => {
    const workplaces = ref<Workplace[]>([]);
    const isLoading = ref(false);
    const error = ref("");

    const fetchWorkplaces = async () => {
        isLoading.value = true;
        try {
            const response = await httpClient.get("/workplaces/");
            if (response.status === 200) {
                workplaces.value = response.data;
            } else {
                error.value = "Greška pri dohvatu radnih mjesta";
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri dohvatu radnih mjesta";
            }
        } finally {
            isLoading.value = false;
        }
    };

    const addWorkplace = async (newWorkplace: WorkplaceForCreation) => {
        isLoading.value = true;
        try {
            const response = await httpClient.post("/workplaces/", newWorkplace);
            if (response.status === 201 || response.status === 200) {
                workplaces.value.push(response.data);
            } else {
                error.value = "Greška pri dodavanju radnog mjesta";
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri dodavanju radnog mjesta";
            }
        } finally {
            isLoading.value = false;
        }
    };

    const updateWorkplace = async (updatedWorkplace: Workplace) => {
        isLoading.value = true;
        try {
            const response = await httpClient.put(`/workplaces/${updatedWorkplace.id}/`, updatedWorkplace);
            if (response.status === 200) {
                const index = workplaces.value.findIndex(wp => wp.id === updatedWorkplace.id);
                if (index !== -1) {
                    workplaces.value[index] = updatedWorkplace;
                }
            } else {
                error.value = "Greška pri ažuriranju radnog mjesta";
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri ažuriranju radnog mjesta";
            }
        } finally {
            isLoading.value = false;
        }
    };

    const deleteWorkplace = async (workplaceId: number) => {
        // soft delete
        isLoading.value = true;
        const workPlaceToDelete = workplaces.value.find(wp => wp.id === workplaceId);
        if (!workPlaceToDelete) {
            error.value = "Radno mjesto ne postoji";
            isLoading.value = false;
            return;
        }
        workPlaceToDelete.is_deleted = true;
        try {
            const response = await httpClient.put(`/workplaces/${workplaceId}/`, workPlaceToDelete);
            if (response.status === 200) {
                const index = workplaces.value.findIndex(wp => wp.id === workplaceId);
                if (index !== -1) {
                    // remove workplace from array
                    workplaces.value.splice(index, 1);
                }
            } else {
                error.value = "Greška pri brisanju radnog mjesta";
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri brisanju radnog mjesta";
            }
        } finally {
            isLoading.value = false;
        }
    };


    return {
        workplaces,
        fetchWorkplaces,
        addWorkplace,
        updateWorkplace,
        deleteWorkplace,
        isLoading,
        error
    };
});
