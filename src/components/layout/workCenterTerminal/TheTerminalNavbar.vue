<template>
    <div class="w-full">
        <nav class="bg-blue-500 shadow-lg">
            <div class="px-2 py-2">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="mx-4 text-white font-semibold text-lg">WorkOrders+</div>
                    </div>
                    <div class="flex items-center justify-end">
                        <router-link to="/work-center-terminal/radni-nalozi" class="mx-2 text-white navigation__item">
                            <i class="pi pi-file text-white mr-1"></i>
                            Radni nalozi
                        </router-link>
                        <router-link to="/work-center-terminal/prijavi-kvar" class="mx-2 text-white navigation__item">
                            <i class="pi pi-exclamation-circle text-white mr-1"></i>
                            Prijavi kvar
                        </router-link>
                        <AccountCircle fillColor="#fff" class="ml-5" />
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AccountCircle from 'vue-material-design-icons/AccountCircle.vue';

export default defineComponent({
    name: 'TerminaNavbar',
    setup() {
        return {};
    },
    components: {
        AccountCircle,
    },
});
</script>

<style scoped>
.router-link-active {
    text-decoration: underline;
}

.navigation__item {
    text-decoration: none;
    padding: 0.3rem 0.8rem;
    border-radius: 0.3rem;
    font-weight: 500;
    border: 1px solid transparent;
}

.navigation__item:hover {
    border: 1px solid rgba(255, 255, 255, .8);
    opacity: 0.9;
}
</style>
