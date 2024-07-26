<script setup lang="ts">
import type { GetConfiguration } from '@/services';

import ClockIcon from './icons/ClockIcon.vue';
import FaceIcon from './icons/FaceIcon.vue';
import PauseIcon from './icons/PauseIcon.vue';
import { computed } from 'vue';

interface Props {
  configuration: GetConfiguration;
}

const $props = defineProps<Props>();

const totalTime = computed(() => {
  return $props.configuration.cyclesBeforeLongBreak * $props.configuration.workDuration + 
    ($props.configuration.cyclesBeforeLongBreak - 1) * $props.configuration.breakDuration + 
    $props.configuration.longBreakDuration;
});
</script>

<template>
  <div class="bg-[#45474B] rounded-xl p-4 space-y-4 text-white">
    <h2 class="text-lg font-bold uppercase">Configuración</h2>

    <div>
      <p class="flex justify-between">
        <span class="flex items-center gap-1">
          <ClockIcon class="size-5 text-[#F4CE14]" />
          Sesiones de trabajo
        </span>
        
        <span class="font-semibold">
          {{ configuration.workDuration }} min.
        </span>
        
        
      </p>
  
      <p class="flex justify-between">
        <span class="flex items-center gap-1">
          <PauseIcon class="size-5 text-[#F4CE14]" />
          Descansos cortos
        </span>
        
        <span class="font-semibold">
          {{ configuration.breakDuration }} min.
        </span>
      </p>
      
      <p class="flex justify-between">
        <span class="flex items-center gap-1">
          <FaceIcon class="size-5 text-[#F4CE14]" />
          Descanso largo
        </span>
        
        <span class="font-semibold">
          {{ configuration.longBreakDuration }} min.
        </span>
      </p>
    </div>
    
    <div>
      <p>Ciclo completo:</p>
      <p>{{ configuration.cyclesBeforeLongBreak }} sesiones antes del descanso largo</p>
      <p>Total de tiempo: {{ totalTime }} minutos</p>
    </div>
  </div>
</template>
