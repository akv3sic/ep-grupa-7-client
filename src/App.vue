<template>
  <!-- toast -->
  <Toast />

  <RouterView />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Toast from 'primevue/toast';

export default defineComponent({
  name: 'App',
  setup() {
  },
  components: {
    Toast
  },
});
</script>

<style></style>