import httpClient from "@/common/httpClient";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { WorkOrderCategory } from "@/models/workOrderCategory.model";

export const useWorkOrderCategoriesStore = defineStore("workOrderCategories", () => {
    const workOrderCategories = ref<WorkOrderCategory[]>([]);
    const isLoading = ref(false);
    const error = ref("");

    const fetchWorkOrderCategories = async () => {
        isLoading.value = true;
        try {
            const response = await httpClient.get("/wo-categories/");
            if (response.status === 200) {
                workOrderCategories.value = response.data;
            } else {
                error.value = "Greška pri dohvatu kategorija radnih naloga";
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri dohvatu kategorija radnih naloga";
            }
        } finally {
            isLoading.value = false;
        }
    };

    return {
        workOrderCategories,
        fetchWorkOrderCategories,
        isLoading,
        error
    };
});
