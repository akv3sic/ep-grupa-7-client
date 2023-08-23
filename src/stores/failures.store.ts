import httpClient from "@/common/httpClient";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Failure } from "@/models/failure.model";
import type { FailureForCreation } from "@/models/failureForCreation.model";

export const useFailuresStore = defineStore("failures", () => {
    const failures = ref<Failure[]>([]);
    const isLoading = ref(false);
    const error = ref("");

    const fetchFailures = async () => {
        isLoading.value = true;
        try {
            const response = await httpClient.get("/failures/");
            if (response.status === 200) {
                failures.value = response.data;
            } else {
                error.value = "Greška pri učitavanju kvarova";
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri učitavanju kvarova";
            }
        } finally {
            isLoading.value = false;
        }
    };

    const reportFailure = async (failureData: FailureForCreation) => {
        isLoading.value = true;
        try {
            const response = await httpClient.post("/failures/", failureData);
            if (response.status === 201 || response.status === 200) {  // 201 - Created, 200 - OK
                failures.value = [...failures.value, response.data];
            } else {
                error.value = "Greška pri prijavi kvara";
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška pri prijavi kvara";
            }
        } finally {
            isLoading.value = false;
        }
    };

    return {
        failures,
        fetchFailures,
        reportFailure,
        isLoading,
        error
    };
});
