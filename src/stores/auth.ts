import httpClient from "@/common/httpClient";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "@/models/user.model";

export const useAuthStore = defineStore("auth", () => {
    const isAuthenticated = ref(false);
    const user = ref<User | null>(null);
    const error = ref("");

    /**
     * Asynchronously logs a user in using their email and password.
     * 
     * @param {string} email - The email address of the user.
     * @param {string} password - The password for the provided email.
     * @returns {Promise<boolean>} - Returns `true` if the logged-in user is a superuser, 
     *                              `false` otherwise. This also implicitly indicates successful login.
     * 
     * @throws Will set the `error` ref value with the error message if any error occurs.
     * 
     * @example
     * 
     * const isSuperUser = await login('example@example.com', 'password123');
     * if (isSuperUser) {
     *     // Redirect superuser to a specific route.
     * }
     */
    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await httpClient.post('/login/', { email, password });
            if (response.status === 200) {
                isAuthenticated.value = true;
                user.value = response.data.user;
                return user.value?.is_superuser || false;
            } else {
                error.value = "Login failed";
                return false;
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "An error occurred during login";
            }
            return false;
        }
    };

    return {
        isAuthenticated,
        user,
        error,
        login
    };
});
