<script setup lang="ts">
import type { PomodoroSession } from '@/services';

import CircleCheck from './icons/CircleCheck.vue';
import FireIcon from './icons/FireIcon.vue';

import { computed, ref } from 'vue';

interface Props {
  pomodoro: PomodoroSession
}

interface Emits {
  (e: 'remove', pomodoro: PomodoroSession): void
}

const $emits = defineEmits<Emits>()
const $props = defineProps<Props>()

const showIcon = ref<boolean>(false);

const completedPomodoros = computed(() => {
  return $props.pomodoro.currentCycle - 1
})

const uncompletedPomodoros = computed(() => {
  return $props.pomodoro.totalCycles - $props.pomodoro.currentCycle
})

function remove() {
  showIcon.value = true
  $emits('remove', $props.pomodoro)
}

</script>

<template>
  <div>
    <div class="bg-[#252A34] text-white px-4 py-2 rounded-md flex gap-2 items-center shadow-lg">

      <div 
        @click="remove" 
        class="bg-white rounded-full"
        :class="{'p-3': !showIcon}"
      >
        <CircleCheck v-if="showIcon" class="bg-green-500 size-6 rounded-full" />
      </div>

      <div class="">
        <p class="font-bold uppercase">{{ pomodoro.title }}</p>
        
        <div class="flex gap-0.5">
          <FireIcon v-for="(_,index) in completedPomodoros" :key="index" class="text-red-500 size-4" />
          <FireIcon v-if="pomodoro.isActive" class="text-red-500 size-4"/>
          <FireIcon v-for="(_,index) in uncompletedPomodoros" :key="index" class="text-red-500 size-4 opacity-40"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  input[type="checkbox"] {
    clip-path: circle(40% at 50% 50%);   /* Set the clip path of circle*/
  }
</style>