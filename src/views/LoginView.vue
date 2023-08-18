<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full bg-white p-6 rounded-lg shadow-md">

            <div class="flex items-center justify-center mb-8">
                <img class="h-12 w-auto" src="@/assets/img/workorders-pad.png" alt="WorkOrders+ logo" />
                <h2 class="ml-2 text-2xl font-extrabold text-gray-900">WorkOrders+</h2>
            </div>

            <form @submit.prevent="login">
                <div class="mb-4">
                    <label for="email" class="sr-only">E-mail</label>
                    <InputText id="email" v-model="email" placeholder="E-mail"
                        class="w-full p-3 rounded-md border border-gray-300" />
                </div>
                <div class="mb-4">
                    <label for="password" class="sr-only">Lozinka</label>
                    <InputText id="password" type="password" v-model="password" placeholder="Lozinka"
                        class="w-full p-3 rounded-md border border-gray-300" />
                </div>
                <div class="mb-4">
                    <Button type="submit" label="Prijavi se" class="w-full p-3 rounded-md bg-blue-500 text-white" />
                </div>

                <div class="text-sm text-gray-600 text-center">
                    <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                        Zaboravili ste lozinku?
                    </a>
                </div>
            </form>
        </div>

        <!--
            natrag na početnu stranicu
        -->
        <div class="absolute top-0 left-0 mt-4 ml-4">
            <router-link to="/" class="text-blue-600 hover:text-blue-500">
                <i class="pi pi-arrow-left mr-1"></i>
                Natrag na početnu stranicu
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
    name: 'LoginView',
    components: {
        InputText,
        Button
    },
    setup() {
        const email = ref('');
        const password = ref('');

        function login() {
            console.log('Pokušaj prijave s e-mailom:', email.value);
        }

        return {
            email,
            password,
            login
        };
    }
};
</script>

<style scoped></style>
