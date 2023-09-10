<template>
  <div class="w-full">
    <nav class="bg-blue-500 shadow-lg">
      <div class=" px-2 py-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <button
              class="text-white mt-1 w-8 h-8 flex justify-center align-middle focus:outline-none rounded-full hover:bg-blue-400 bg-opacity-75">
              <MenuIcon @click="toggleNavigationDrawer" class="mt-1" />
            </button>
            <router-link to="/">
              <div class="mx-4 text-white font-semibold text-lg">WorkOrders+</div>
            </router-link>
          </div>

          <div class="flex justify-end">
            <AccountCircle fillColor="#fff" @click="toggleOverlayMenu" aria-haspopup="true"
              aria-controls="overlay_menu" />
            <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import AccountCircle from 'vue-material-design-icons/AccountCircle.vue';
import { useNavigationDrawerStore } from '@/stores/navigationDrawer';
import { useToast } from "primevue/usetoast";
import Menu from "primevue/menu";
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const navigationDrawerStore = useNavigationDrawerStore();
    const toggleNavigationDrawer = () => {
      navigationDrawerStore.toggleCollapsed();
    };

    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);

    const toast = useToast();
    const router = useRouter();

    /**
     * Overlay menu
     */
    const menu = ref();

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
      menu.value.toggle(event);
      console.log('toggleOverlayMenu');
    };

    /**
     *  Overlay menu END
     */


    return {
      toggleNavigationDrawer, menu, items, toggleOverlayMenu
    };

  },
  components: {
    MenuIcon,
    AccountCircle,
    Menu,
  },
});
</script>