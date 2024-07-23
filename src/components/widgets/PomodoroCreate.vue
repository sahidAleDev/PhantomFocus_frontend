<script setup lang="ts">
import type { Configuration } from '@/services';
import { ref } from 'vue';

interface Props {
  configurations: Configuration[]
}

defineProps<Props>()

const date = ref<Date>(new Date())
</script>

<template>
  <div class="py-4 px-4 bg-[#45474B] rounded-md auto-cols-fr grid md:grid-cols-2 lg:grid-cols-[3fr_1fr_1fr] gap-y-4 gap-x-2">
    <input class="md:col-span-2 lg:col-span-1 bg-transparent border-none outline-none text-[#fff] placeholder-white" type="text" placeholder="Escribe el nombre de la sesión y presione enter...">
    
    <div class="">
      <VueDatePicker :dark="true" v-model="date" placeholder="Selecciona la fecha" :enable-time-picker="false"></VueDatePicker>
    </div>
    
    <select id="configurations" class="border bg-[#252A34] border-r-8 border-transparent text-[#d0d0d0] text-sm rounded-md block px-1.5 py-2 text-center">
      <option v-for="configuration in configurations" :key="configuration._id" >{{ configuration.name }}</option>
    </select>
  </div>
</template>