<script setup lang="ts">
import type { GetPomodoroSession } from '@/services';

import CircleCheck from './icons/CircleCheck.vue';
import FireIcon from './icons/FireIcon.vue';

import { computed, ref, watch } from 'vue';

interface Props {
  pomodoro: GetPomodoroSession
}

interface Emits {
  (e: 'remove', pomodoro: GetPomodoroSession): void
}

const $emits = defineEmits<Emits>()
const $props = defineProps<Props>()

const showIcon = ref<boolean>(false);

const completedPomodoros = computed(() => {
  const cycles = $props.pomodoro.currentCycle;
  return cycles > 0 ? cycles - 1 : 0;
})

const uncompletedPomodoros = computed(() => {
  const cyclesBeforeLongBreak = $props.pomodoro.cyclesBeforeLongBreak;
  const currentCycle = $props.pomodoro.currentCycle;
  return cyclesBeforeLongBreak > currentCycle ? cyclesBeforeLongBreak - currentCycle : 0;
})

function remove() {
  showIcon.value = true;
  $emits('remove', $props.pomodoro);
}

</script>

<template>
  <div>
    <div class="bg-[#F5F5F5] text-white px-4 py-2 rounded-md flex gap-2 items-center shadow-lg">

      <div 
        @click="remove" 
        class="bg-white border border-black rounded-full"
        :class="{'p-3': !showIcon}"
      >
        <CircleCheck v-if="showIcon" class="bg-green-500 size-6 rounded-full" />
      </div>

      <div class="text-[#253240]">
        <p class="font-bold uppercase">{{ pomodoro.title }}</p>
        
        <div class="flex gap-0.5">
          <FireIcon v-for="(_, index) in completedPomodoros" :key="index" class="text-[#ED447A] size-4" />
          <FireIcon v-if="pomodoro.isActive" class="text-[#ED447A] size-4"/>
          <FireIcon v-for="(_, index) in uncompletedPomodoros" :key="index" class="text-[#ED447A] size-4 opacity-40"/>
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
