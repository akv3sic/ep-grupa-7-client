import httpClient from "@/common/httpClient";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { WorkOrder } from "@/models/workOrder.model";
import type { WorkOrderForCreation } from "@/models/workOrderForCreation.model";

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

    /**
     * @param workOrder - WorkOrderForCreation
     * @returns boolean - true if successful, false otherwise
     * @description - Adds a new work order via POST request to the API
     **/
    const addWorkOrder = async (workOrder: WorkOrderForCreation): Promise<boolean> => {
        isLoading.value = true;
        try {
            const response = await httpClient.post("/work-orders/", workOrder);
            if (response.status === 201 || response.status === 200) { // 201 - Created, 200 - OK
                workOrders.value.push(response.data);
                return true;
            } else {
                error.value = "Greška pri dodavanju radnog naloga";
                return false;
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri dodavanju radnog naloga";
            }
            return false;
        } finally {
            isLoading.value = false;
        }
    };

    /**
   * @param workOrder - WorkOrderForCreation
   * @returns boolean - true if successful, false otherwise
   * @description - Updates a work
   **/
    const updateWorkOrder = async (workOrder: WorkOrder): Promise<boolean> => {
        isLoading.value = true;
        try {
            const response = await httpClient.put(`/work-orders/${workOrder.id}/`, workOrder);
            if (response.status === 200) { // 200 - OK
                return true;
            } else {
                error.value = "Greška pri ažuriranju radnog naloga";
                return false;
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri ažuriranju radnog naloga";
            }
            return false;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        workOrders,
        fetchWorkOrders,
        addWorkOrder,
        isLoading,
        error,
        updateWorkOrder
    };
});
