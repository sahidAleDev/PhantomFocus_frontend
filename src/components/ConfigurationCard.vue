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

const totalTime = computed<number>(() => {
  return $props.configuration.cyclesBeforeLongBreak * $props.configuration.workDuration + 
    ($props.configuration.cyclesBeforeLongBreak - 1) * $props.configuration.breakDuration + 
    $props.configuration.longBreakDuration;
});
</script>

<template>
  <div class="bg-[#F5F5F5] rounded-xl p-4 space-y-4 text-[#506A88]">
    <h2 class="text-lg font-bold uppercase">{{ configuration.name }}</h2>

    <div>
      <p class="flex justify-between">
        <span class="flex items-center gap-1">
          <ClockIcon class="size-5 text-[#ED447A]" />
          Sesiones de trabajo
        </span>
        
        <span class="font-semibold">
          {{ configuration.workDuration }} min.
        </span>
        
        
      </p>
  
      <p class="flex justify-between">
        <span class="flex items-center gap-1">
          <PauseIcon class="size-5 text-[#ED447A]" />
          Descansos cortos
        </span>
        
        <span class="font-semibold">
          {{ configuration.breakDuration }} min.
        </span>
      </p>
      
      <p class="flex justify-between">
        <span class="flex items-center gap-1">
          <FaceIcon class="size-5 text-[#ED447A]" />
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
