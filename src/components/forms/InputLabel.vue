<script setup lang="ts">
interface Props {
  value: string
  forLabel: string
}

defineProps<Props>()
</script>
<template>
  <label :for="`${forLabel}-input`" class="block font-extralight text-base text-green-custom">{{ value }}</label>
</template>

