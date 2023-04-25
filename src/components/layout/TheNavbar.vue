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
              <div class="mx-4 text-white font-semibold text-lg" v-on:click="handleAppTitleClick">WorkOrders+</div>
            </div>
  
            <div class="flex justify-end">
              <AccountCircle fillColor="#fff" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import MenuIcon from 'vue-material-design-icons/Menu.vue';
  import AccountCircle from 'vue-material-design-icons/AccountCircle.vue';
  import { useNavigationDrawerStore } from '@/stores/navigationDrawer';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'Navbar',
    setup() {
      const navigationDrawerStore = useNavigationDrawerStore();
      const toggleNavigationDrawer = () => {
        navigationDrawerStore.toggleCollapsed();
      };
  
      const router = useRouter()
      let clickCount = 0
  
      // opens the dev options page if the app title is clicked 3 times
      const handleAppTitleClick = (): void => {
        clickCount++
        if (clickCount === 3) {
          router.push('/dev-options')
          clickCount = 0 // reset the click count
        }
      }
  
      return {
        toggleNavigationDrawer, handleAppTitleClick
      };
    },
    components: {
      MenuIcon,
      AccountCircle,
    },
  });
  </script>