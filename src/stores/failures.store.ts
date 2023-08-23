import httpClient from "@/common/httpClient";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Failure } from "@/models/failure.model";

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

    return {
        failures,
        fetchFailures,
        isLoading,
        error
    };
});
