<script setup lang="ts">
  
interface Props {
  id: string
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
  <div>

    <input 
      :id="`${id}-input`" 
      :value="value"
      class="input input-medium" 
      min="0"
      placeholder="Ingrese una cantidad" 
      required 
      type="number" 
      @input="($event) => handleInput($event)"
    />
  </div>
</template>