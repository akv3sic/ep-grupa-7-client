<template>
    <div class="bg-gray-100 shadow-md w-64 flex-shrink-0 h-full hidden lg:block fixed lg:static z-50"
      :class="[isCollapsed ? '!hidden' : '!block']">
      <!-- logo -->
      <router-link to="/">
        <div class="flex items-center justify-center h-16">
        <img src="@/assets/img/fsre-logo.svg" alt="logo" class="h-8" />
      </div>
      </router-link>
      
  
      <!-- navigation -->
      <nav class="mt-5">
        <ul class="space-y-1">
          <template v-for="(item, index) in navigationItems" :key="index">
            <li class="mx-2">
              <router-link :to="item.link" active-class="bg-gray-300 text-gray-900"
                class="block py-2 px-4 text-gray-800 hover:bg-gray-200 hover:text-gray-900 rounded-md">
                <span class="font-medium text-sm">
                  {{ item.label }}
                </span>
              </router-link>
            </li>
          </template>
        </ul>
      </nav>
    </div>
  </template>
  <style scoped>
  main {
    padding: 1rem;
  }
  </style>
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'NavigationDrawer',
    setup() {
      const navigationItems = [
        { label: 'Pregled', link: '/' },
        { label: 'Zaposlenici', link: '/zaposlenici' },
        { label: 'Radna mjesta', link: '/radna-mjesta' },
        { label: 'Odjeli', link: '/odjeli' },
        { label: 'Radni centri', link: '/radni-centri' },
        { label: 'Radni nalozi', link: '/radni-nalozi' },
        { label: 'Kvarovi', link: '/kvarovi' },
        { label: 'Postavke', link: '/postavke' },
      ]
  

      return {
        navigationItems,
      }
    },
    props: {
      isCollapsed: {
        type: Boolean,
        required: true,
      },
    },
    components: {
    },
  });
  </script> 