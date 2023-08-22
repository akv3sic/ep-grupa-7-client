import httpClient from "@/common/httpClient";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const isAuthenticated = ref(false);
    const user = ref(null);
    const error = ref("");

    const login = async (email: string, password: string) => {
        try {
            const response = await httpClient.post('/login/', { email, password });
            if (response.status === 200) {
                isAuthenticated.value = true;
                user.value = response.data.user;
            } else {
                error.value = "Login failed";
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "An error occurred during login";
            }
        }
    };

    return {
        isAuthenticated,
        user,
        error,
        login
    };
});
