import httpClient from "@/common/httpClient";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "@/models/user.model";

export const useAuthStore = defineStore("auth", () => {
    const isAuthenticated = ref(false);
    const user = ref<User | null>(null);
    const error = ref("");

    if (localStorage.getItem('isAuthenticated') === 'true') {
        isAuthenticated.value = true;
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            user.value = JSON.parse(storedUser);
        }
    }

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
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('user', JSON.stringify(response.data.user));
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

    /**
     * Asynchronously logs the current user out of the system.
     * 
     * 1. Sends an empty POST request to the `/api/logout/` endpoint to log the user out from the backend.
     * 2. If the logout is successful (status 200), the authentication state is reset, user details are cleared,
     *    and relevant items are removed from the `localStorage`.
     * 3. In the event of any errors during logout, a corresponding error message will be set.
     * 
     * @returns {Promise<boolean>} Returns `true` if logout was successful, otherwise `false`.
     * 
     * @throws Sets the `error` to a corresponding error message if any error occurs.
     * 
     * @example
     * 
     * const loggedOut = await logout();
     * if (loggedOut) {
     *     console.log("Successfully logged out");
     * } else {
     *     console.log("Failed to log out");
     * }
     */
    const logout = async (): Promise<boolean> => {
        try {
            const response = await httpClient.post('/logout/');
            if (response.status === 200) {
                isAuthenticated.value = false;
                user.value = null;
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('user');
                return true;
            } else {
                error.value = "Greška prilikom odjave";
                return false;
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Greška prilikom odjave";
            }
            return false;
        }
    };

    /**
     * Asynchronously logs a user in using their RFID card's unique ID.
     * 
     * @param {string} rfid - The RFID card's unique identification.
     * @returns {Promise<boolean>} - Returns `true` if the login was successful,
     *                              `false` otherwise.
     * 
     * @throws Will set the `error` ref value with the error message if any error occurs.
     * 
     * @example
     * 
     * const isSuccessful = await loginWithRFID('RFID12345678');
     * if (isSuccessful) {
     *     const user = JSON.parse(localStorage.getItem('user'));
     *     if (user?.is_superuser) {
     *         // Redirect superuser to a specific route or handle as needed.
     *     }
     * }
     */
    const loginWithRFID = async (rfid_uid: string): Promise<boolean> => {
        try {
            const response = await httpClient.post('/rfid-login/', { rfid_uid });
            if (response.status === 200 && response.data.message === "Login successful") {
                isAuthenticated.value = true;
                user.value = response.data.user;
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('user', JSON.stringify(response.data.user));
                return true;
            } else {
                error.value = "Greška prilikom RFID prijave";
                return false;
            }
        } catch (err: any) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = "Dogodila se greška prilikom RFID prijave";
            }
            return false;
        }
    };

    return {
        isAuthenticated,
        user,
        error,
        login,
        logout,
        loginWithRFID,
    };
});
