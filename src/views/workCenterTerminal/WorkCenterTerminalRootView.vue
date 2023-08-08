<template>
  <div class="flex h-screen">
    <div class="flex flex-col w-full">
      <TerminalNavbar />
      <div class="flex-1 flex flex-col">
        <main class="flex-1 p-4">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import TerminalNavbar from '@/components/layout/workCenterTerminal/TheTerminalNavbar.vue';

export default defineComponent({
  name: 'WorkCenterTerminalRootView',
  setup() {
    return {};
  },
  components: {
    TerminalNavbar
  },
});
</script>
  
<style></style>