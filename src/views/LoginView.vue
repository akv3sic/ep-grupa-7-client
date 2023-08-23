<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

        <!-- Traditional login form -->
        <div v-if="!showRfidLogin" class="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
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

        <!-- RFID login form -->
        <div v-else class="max-w-md w-full bg-white rounded-lg shadow-md flex flex-col items-center">
            <img class="" src="@/assets/img/rfid-loader.gif" alt="RFID loader" />
            <RFIDLoginView />
        </div>


        <div class="text-center text-gray-500 my-5">
            ILI
        </div>
        <!-- Toggle RFID login -->
        <div v-if="!showRfidLogin" class="text-center text-blue-600 hover:text-blue-500 cursor-pointer"
            @click="toggleRfidLogin">
            se prijavite RFID karticom
        </div>
        <div v-else class="text-center text-blue-600 hover:text-blue-500 cursor-pointer" @click="toggleRfidLogin">
            se prijavite korisničkim računom
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
        <TheThinFooter />
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import router from '@/router';
import { useToast } from 'primevue/usetoast';
import TheThinFooter from '@/components/layout/TheThinFooter.vue';
import RFIDLoginView from './RFIDLoginView.vue';

export default {
    name: 'LoginView',
    components: {
        InputText,
        Button,
        TheThinFooter,
        RFIDLoginView
    },
    setup() {
        const email = ref('');
        const password = ref('');

        const authStore = useAuthStore();
        const { isAuthenticated, error } = storeToRefs(authStore);

        async function login() {
            const isSuperUser = await authStore.login(email.value, password.value);

            if (isAuthenticated.value) {
                console.log('Successfully logged in.');
                showLoginSuccessToast();

                if (isSuperUser) {
                    router.push('/office');
                } else {
                    router.push('/work-center-terminal');
                }
            } else {
                console.log('Login failed:', error.value);
            }
        }


        /*************** toast ****************/
        const toast = useToast();

        const showLoginSuccessToast = () => {
            toast.add({ severity: 'success', summary: 'Prijava uspješna', detail: 'Dobrodošli u WorkOrders+', life: 3000 });
        };

        /**************toast END***************/

        /*********** RFID login ***************/
        const showRfidLogin = ref(false);

        const toggleRfidLogin = () => {
            showRfidLogin.value = !showRfidLogin.value;
        };
        /*********** RFID login END ***********/

        return {
            email,
            password,
            login,
            showRfidLogin,
            toggleRfidLogin
        };
    }
};
</script>

<style scoped></style>
