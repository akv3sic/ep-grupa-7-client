import httpClient from "@/common/httpClient";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { WorkCenter } from "@/models/workcenter.model";
import type { WorkCenterForCreation } from "@/models/workcenterForCreation.model";

export const useWorkCentersStore = defineStore("workcenters", () => {
    const workCenters = ref<WorkCenter[]>([]);
    const isLoading = ref(false);
    const error = ref("");
    /**
     * Fetch all work centers.
     **/
    const fetchWorkCenters = async () => {
        isLoading.value = true;
        try {
            const response = await httpClient.get("/work-centers/");
            if (response.status === 200) {
                workCenters.value = response.data;
            } else {
                error.value = "Greška pri učitavanju radnih centara";
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri učitavanju radnih centara";
            }
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Create a new work center.
     *
     * @param workCenter - Object containing information about the work center to be created.
     * @returns {Promise<boolean>} - Returns true if the creation was successful, false otherwise.
     */
    const createWorkCenter = async (workCenter: WorkCenterForCreation) => {
        isLoading.value = true;
        try {
            const response = await httpClient.post("/work-centers/", workCenter);
            if (response.status === 201) {
                return true;
            } else {
                error.value = "Greška pri kreiranju radnog centra";
                return false;
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri kreiranju radnog centra";
            }
            return false;
        } finally {
            isLoading.value = false;
        }
    };

    return {
        workCenters,
        fetchWorkCenters,
        isLoading,
        error,
        createWorkCenter,
    };
});
