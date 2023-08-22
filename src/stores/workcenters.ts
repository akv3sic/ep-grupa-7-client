import httpClient from "@/common/httpClient";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { WorkCenter } from "@/models/workcenter.model";

export const useWorkCentersStore = defineStore("workcenters", () => {
    const workCenters = ref<WorkCenter[]>([]);
    const isLoading = ref(false);
    const error = ref("");

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

    return {
        workCenters,
        fetchWorkCenters,
        isLoading,
        error
    };
});
