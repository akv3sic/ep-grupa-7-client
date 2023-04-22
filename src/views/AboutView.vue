<template>
  <div class="about">
    <div class="flex flex-col bg-blue-200 p-5">
      <h1 class="my-5">This is Tailwind and PrimeVue test</h1>
      <Button label="Test">
      </Button>
      <div class="flex flex-row mb-3 mt-6 justify-between px-12">
        <i class="pi pi-check"></i>
        <i class="pi pi-times"></i>
        <span class="pi pi-search"></span>
        <span class="pi pi-user"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from 'primevue/button';

export default defineComponent({
  name: 'AboutView',
  setup() {
    return {}
  },
  components: {
    Button
  }


})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
