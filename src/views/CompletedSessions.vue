<script setup lang="ts">
import { usePomodoroStore } from '@/stores/pomodoro';

import PomodoroCard from '@/components/PomodoroCard.vue'

const $pomodoro = usePomodoroStore()

</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2" v-auto-animate>
    <PomodoroCard 
      v-for="(pomodoro, index) in $pomodoro.completedSessions" 
      :key="`${pomodoro._id}-${index}`" 
      :pomodoro="pomodoro"
    />
  </div>
</template>