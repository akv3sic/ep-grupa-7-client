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
                        <router-link to="/work-center-terminal/prijava-kvara" class="mx-2 text-white navigation__item">
                            <i class="pi pi-exclamation-circle text-white mr-1"></i>
                            Prijavi kvar
                        </router-link>
                        <AccountCircle fillColor="#fff" class="ml-5" @click="toggleOverlayMenu" aria-haspopup="true"
                            aria-controls="overlay_menu_terminal" />
                        <Menu ref="menuTerminal" id="overlay_menu_terminal" :model="items" :popup="true" />
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AccountCircle from 'vue-material-design-icons/AccountCircle.vue';
import Menu from "primevue/menu";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'TerminalNavbar',
    setup() {
        const authStore = useAuthStore();
        const { user } = storeToRefs(authStore);

        const toast = useToast();
        const router = useRouter();

        const menuTerminal = ref();
        const items = ref([
            {
                label: user.value?.first_name + ' ' + user.value?.last_name,
                items: [
                    {
                        label: 'Profil',
                        icon: 'pi pi-user',
                        command: () => {
                        }
                    },
                    {
                        label: 'Odjava',
                        icon: 'pi pi-sign-out',
                        command: async () => {
                            const wasLogoutSuccessful = await authStore.logout();

                            if (wasLogoutSuccessful) {
                                toast.add({ severity: 'success', summary: 'Odjava uspješna', detail: 'Doviđenja!', life: 3000 });
                                router.push('/');
                            } else {
                                toast.add({ severity: 'error', summary: 'Greška prilikom odjave', detail: 'Pokušajte ponovo ili kontaktirajte administratora.', life: 3000 });
                            }
                        }
                    }
                ]
            },
        ]);

        const toggleOverlayMenu = (event: any) => {
            menuTerminal.value.toggle(event);
        };

        return {
            items, toggleOverlayMenu, menuTerminal
        };
    },
    components: {
        AccountCircle, Menu
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
