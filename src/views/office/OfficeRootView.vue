<template>
    <!-- overlay -->
    <div v-if="!isCollapsed" class="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden" @click="toggleNavigationDrawer">
    </div>
    
    <div class="flex h-screen">
      <NavigationDrawer :is-collapsed="isCollapsed" />
      <div class="flex flex-col w-full">
        <Navbar />
        <div class="flex flex-col w-full">
          <div class="flex-1 flex flex-col">
            <main class="flex-1 p-4">
              <RouterView />
            </main>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Navbar from '@/components/layout/TheNavbar.vue';
  import NavigationDrawer from '@/components/layout/TheNavigationDrawer.vue';
  import { useNavigationDrawerStore } from '@/stores/navigationDrawer';
  import { storeToRefs } from 'pinia';
  
  export default defineComponent({
    name: 'OfficeRootView',
    setup() {
      const navigationDrawerStore = useNavigationDrawerStore();
      const { isCollapsed } = storeToRefs(navigationDrawerStore);
      const toggleNavigationDrawer = () => {
        navigationDrawerStore.toggleCollapsed();
      };
      return {
        isCollapsed, toggleNavigationDrawer
      };
    },
    components: {
      Navbar,
      NavigationDrawer
    },
  });
  </script>
  
  <style></style>