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
     * Update the status of a work order. If no status is provided, the status remains unchanged.
     * 
     * @param workOrder - The work order to be updated.
     * @param status - The new status for the work order (optional).
     * @returns Promise<boolean> - true if the update was successful, false otherwise.
     */
    const updateWorkOrderStatus = async (
        workOrder: WorkOrder,
        status?: number
    ): Promise<boolean> => {
        isLoading.value = true;
        try {
            const workOrderToUpdate: WorkOrderForCreation = {
                title: workOrder.title,
                description: workOrder.description,
                due_time: workOrder.due_time,
                work_center: workOrder.work_center_id,
                category: workOrder.category_id,
                assigned_to: workOrder.assigned_to_id,
                status: workOrder.status_id
            };

            if (status !== undefined) {
                workOrderToUpdate.status = status;
            }

            const response = await httpClient.put(`/work-orders/${workOrder.id}/`, workOrderToUpdate);
            if (response.status === 200) {
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

    /**
     * Activate a work order.
     * 
     * @param workOrder - The work order to be activated.
     * @returns Promise<boolean> - true if the activation was successful, false otherwise.
     */
    const activateWorkOrder = async (workOrder: WorkOrder): Promise<boolean> => {
        return await updateWorkOrderStatus(workOrder, 2); // 2 - Active
    }

    /**
     * Finish a work order.
     * 
     * @param workOrder - The work order to be finished.
     * @returns Promise<boolean> - true if the work order was successfully finished, false otherwise.
     */
    const finishWorkOrder = async (workOrder: WorkOrder): Promise<boolean> => {
        return await updateWorkOrderStatus(workOrder, 4); // 4 - Završeni
    }



    return {
        workOrders,
        fetchWorkOrders,
        addWorkOrder,
        isLoading,
        error,
        activateWorkOrder,
        finishWorkOrder
    };
});
