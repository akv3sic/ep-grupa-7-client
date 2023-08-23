<template>
    <div class="relative h-full">
        <div class="main">
            <h1 class="app-title">WorkOrders+</h1>
            <p>
                Web aplikacija za upravljanje radnim nalozima u proizvodnim pogonima.
            </p>
            <br>

            <h2>Brzi linkovi:</h2>
            <div class="buttons">
                <button @click="$router.push('/about')" class="button-available">
                    O projetku
                </button>
                <a href="https://drawsql.app/teams/-b/diagrams/elektronicko-poslovanje-grupa-7" target="_blank">
                    <button class="button-available">
                        Dijagram baze podataka
                    </button>
                </a>
                <button class="button-available">
                    Tehnička dokumentacija
                </button>
            </div>
        </div>

        <!-- Floating Action Button -->
        <router-link to="/prijava"
            class="fixed top-6 right-6 button-available text-white p-4 rounded-full shadow-lg transition duration-200 fab-button"
            title="Login">
            <i class="pi pi-sign-in pt-1 px-1"></i>
        </router-link>

        <TheThinFooter />
        
        <!-- RFID Login -->
        <RFIDLoginView />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheThinFooter from '@/components/layout/TheThinFooter.vue';
import RFIDLoginView from './RFIDLoginView.vue';

export default defineComponent({
    name: 'AppHome',
    components: {
        TheThinFooter,
        RFIDLoginView
    },
    setup() {
        return {};
    },
});
</script>
  
<style scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    position: relative;
}

.main::before {
    content: "";
    background-image: url('/src/assets/img/technical-background.jpg');
    background-size: cover;
    background-position: center;
    opacity: 0.2;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
}

.buttons {
    margin-top: 1rem;
    display: flex;
    gap: 0.8rem;
}

@media (max-width: 768px) {
    .buttons {
        flex-direction: column;
    }
}

button {
    padding: 0.6rem;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.button-available {
    /* dark blue */
    background-color: #1e88e5;
}

button:hover {
    opacity: 0.8;
}

.fab-button:hover {
    opacity: 0.8;
}


.app-title {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0;
}
</style>