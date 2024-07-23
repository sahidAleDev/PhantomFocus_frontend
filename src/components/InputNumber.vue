<script setup lang="ts">
  
interface Props {
  label: string
  value: number
}

interface Emits {
  (event: 'update:value', value: number): void
}

defineProps<Props>()
const $emits = defineEmits<Emits>()

const handleInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  $emits('update:value', Number(inputElement.value));
};
</script>

<template>
  <div class="mb-6 w-full">
    <label :for="`${label}-input`" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>

    <input 
      :id="`${label}-input`" 
      :value="value"
      @input="($event) => handleInput($event)"
      aria-describedby="helper-text-explanation" 
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
      placeholder="Ingrese una cantidad" 
      required 
      type="number" 
      min="0"
    />
  </div>
</template>