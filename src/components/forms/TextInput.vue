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
    <label :for="`${label}-input`" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
    <input 
      :id="`${label}-input`" 
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      type="text" 
      :value="value"
      @input="($event) => handleInput($event)"
    >
  </div>
</template>