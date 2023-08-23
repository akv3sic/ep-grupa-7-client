import httpClient from "@/common/httpClient";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { WorkOrder } from "@/models/workOrder.model";
import type { WorkOrderForCreation } from "@/models/workOrderForCreation";

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

    const addWorkOrder = async (workOrder: WorkOrderForCreation) => {
        isLoading.value = true;
        try {
            const response = await httpClient.post("/work-orders/", workOrder);
            if (response.status === 201 || response.status === 200) { // 201 - Created, 200 - OK
                workOrders.value.push(response.data);
            } else {
                error.value = "Greška pri dodavanju radnog naloga";
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri dodavanju radnog naloga";
            }
        } finally {
            isLoading.value = false;
        }
    };

    return {
        workOrders,
        fetchWorkOrders,
        addWorkOrder,
        isLoading,
        error
    };
});
