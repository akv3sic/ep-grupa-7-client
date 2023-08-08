<template>
    <div class="main">
        <h1 class="app-title">WorkOrders+</h1>
        <p>
            School project at <a href="https://fsre.sum.ba">FSRE</a>.
        </p>
        <p>This app is currently under development.</p>
        <br>

        <h2>Links:</h2>
        <div class="buttons">
            <button @click="$router.push('/office')" class="button-available">
                Office
                <i class="pi pi-check"></i>
            </button>
            <button @click="$router.push('/work-center-terminal')" class="button-available">
                Work Center Terminal
                <i class="pi pi-check"></i>
            </button>
            <button @click="$router.push('/about')" class="button-unavailable">
                About
                <i class="pi pi-times"></i>
            </button>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AppHome',
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
}

.buttons {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
}

@media (max-width: 768px) {
    .buttons {
        flex-direction: column;
    }
}

button {
    padding: 1rem;
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

.button-unavailable {
    background-color: #9e9e9e;
}

button:hover {
    opacity: 0.8;
}

.app-title {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0;
}
</style>
  