<template>
  <div class="relative">
    <label for="textfield" v-if="label"
      class="absolute top-0 left-0 px-2 text-gray-500 text-sm md:text-base transition-all duration-300"
      :class="{ '-translate-y-3/4 !text-xs': inputFocused || inputValue }">
      {{ purgedLabel }}
    </label>
    <input id="textfield" type="text"
      class="block w-full bg-transparent py-1 px-2 focus:outline-none focus:border-blue-500 text-sm md:text-base border-b-1 border-gray-700"
      :class="{ '!border-b-2': inputFocused || inputValue }" :placeholder="inputFocused ? placeholder : ''"
      :value="inputValue" @input="$emit('update:inputValue', ($event.target as HTMLInputElement).value)"
      @focus="inputFocused = true" @blur="inputFocused = false">
    <p class="mt-1 px-2 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script lang="ts">
import { ref, defineEmits } from 'vue';

export default {
  name: 'VTextField',
  setup() {
    const inputFocused = ref(false);

    defineEmits(['update:inputValue'])

    return {
      inputFocused
    };
  },
  props: {
    label: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      required: false,
    },
    inputValue: {
      type: String,
      required: false,
    },
  },
  computed: {
    purgedLabel() {
      if (this.label) {
        return this.label.charAt(0).toUpperCase() + this.label.slice(1);
      }
    },
  }
};
</script>

<style scoped lang="css">
.border-b-1 {
  border-bottom-width: 1px;
}
</style>
