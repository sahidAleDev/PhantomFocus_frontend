<script setup lang="ts">
interface Props {
  value: string
  forLabel: string
  className?: string
}

defineProps<Props>()
</script>
<template>
  <label :for="`${forLabel}-input`" class="block font-extralight text-base" :class="className">{{ value }}</label>
</template>

