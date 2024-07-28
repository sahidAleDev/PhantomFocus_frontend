<script setup lang="ts">
  
interface Props {
  id: string
  value: string
  classNames?: string
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
  <input 
    :class="classNames"
    :id="`${id}-input`" 
    :value="value"
    class="input"
    placeholder="Ingresa el valor"
    type="text" 
    @input="($event) => handleInput($event)"
  >
</template>