<script setup lang="ts">
import type { GetPomodoroSession } from '@/services';
import { ref } from 'vue';
import { usePomodoroStore } from '@/stores/pomodoro';
import type { StatusSession } from '@/stores/pomodoro';

/**
 * ------------------------------------------
 *	Components
 * ------------------------------------------
 */
import PlayIcon from './icons/PlayIcon.vue';
import FireIcon from './icons/FireIcon.vue';

/**
 * ------------------------------------------
 *	Utils
 * ------------------------------------------
 */
interface Props {
  pomodoro: GetPomodoroSession
}

interface Emits {
  (e: 'remove', pomodoro: GetPomodoroSession): void
  (e: 'action:start', pomodoro: GetPomodoroSession): void
}

const $emits = defineEmits<Emits>()
const $props = defineProps<Props>()
const $pomodoro = usePomodoroStore()

/**
 * ------------------------------------------
 *	Data
 * ------------------------------------------
 */

const classByStatus: Record<StatusSession, string> = {
  'completed': 'text-[#FC5185]',
  'current': 'text-[#3FC1C9]',
  'pending': 'text-[#FC5185]/20'
}
const showIcon = ref<boolean>(false);


/**
 * ------------------------------------------
 *	Methods
 * ------------------------------------------
 */

/**
 * remove
 */ 
function remove() {
  showIcon.value = true;
  $emits('remove', $props.pomodoro);
}

</script>

<template>
    <div class="bg-[#F5F5F5] text-white px-4 py-2 rounded-md flex gap-2 items-center justify-between shadow-lg">
      <div class="text-[#253240]">
        <p class="font-bold uppercase">{{ pomodoro.title }}</p>
        
        <div class="flex gap-0.5">
          <FireIcon v-for="(status, index) in $pomodoro.cycleStatus(pomodoro)" :key="index" class="size-6"  :class="classByStatus[status]" />
        </div>
      </div>

      <div v-if="!pomodoro.isCompleted">
        <div @click="$emit('action:start', pomodoro)">
          <PlayIcon class="size-6 bg-[#FC5185] text-white rounded-full p-0.5 cursor-pointer" />
        </div>
      </div>
    </div>
</template>

<style>
  input[type="checkbox"] {
    clip-path: circle(40% at 50% 50%);   /* Set the clip path of circle*/
  }
</style>
