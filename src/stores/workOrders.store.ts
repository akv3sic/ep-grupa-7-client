import httpClient from "@/common/httpClient";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { WorkOrder } from "@/models/workOrder.model";

export const useWorkOrdersStore = defineStore("workOrders", () => {
    const workOrders = ref<WorkOrder[]>([]);
    const isLoading = ref(false);
    const error = ref("");

    const fetchWorkOrders = async () => {
        isLoading.value = true;
        try {
            const response = await httpClient.get("/work-orders/");
            if (response.status === 200) {
                workOrders.value = response.data;
            } else {
                error.value = "Greška pri učitavanju radnih naloga";
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri učitavanju radnih naloga";
            }
        } finally {
            isLoading.value = false;
        }
    };

    return {
        workOrders,
        fetchWorkOrders,
        isLoading,
        error
    };
});
