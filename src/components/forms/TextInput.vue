<script setup lang="ts">
  
interface Props {
  label: string
  value: string
}

interface Emits {
  (event: 'update:value', value: string): void
}

defineProps<Props>()
const $emits = defineEmits<Emits>()

const handleInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  $emits('update:value', inputElement.value);
};
</script>

<template>
  <div class="mb-6 w-full">
    <label :for="`${label}-input`" class="block mb-2 text-sm font-medium text-green-custom">{{ label }}</label>
    <input 
      :id="`${label}-input`" 
      class="input"
      type="text" 
      :value="value"
      @input="($event) => handleInput($event)"
    >
  </div>
</template>