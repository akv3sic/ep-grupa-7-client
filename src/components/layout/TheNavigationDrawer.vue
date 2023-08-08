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
              class="py-2 px-4 text-gray-800 hover:bg-gray-200 hover:text-gray-900 rounded-md flex items-center">
              <i class="mr-2" :class="item.icon"></i> <!-- added icon -->
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
      { label: 'Pregled', link: '/office', icon: 'pi pi-home' },
      { label: 'Zaposlenici', link: '/office/zaposlenici', icon: 'pi pi-user' },
      { label: 'Radna mjesta', link: '/office/radna-mjesta', icon: 'pi pi-briefcase' },
      { label: 'Odjeli', link: '/office/odjeli', icon: 'pi pi-building' },
      { label: 'Radni centri', link: '/office/radni-centri', icon: 'pi pi-sitemap' },
      { label: 'Radni nalozi', link: '/office/radni-nalozi', icon: 'pi pi-folder' },
      { label: 'Kvarovi', link: '/office/kvarovi', icon: 'pi pi-wrench' },
      { label: 'Postavke', link: '/office/postavke', icon: 'pi pi-cog' },
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