<script setup lang="ts">
import { ref } from 'vue'
import { usePomodoroStore } from '@/stores/pomodoro';
import type { StatusSession } from '@/stores/pomodoro';

/**
 * ------------------------------------------
 *	Components
 * ------------------------------------------
 */
import IconCheck from '@/components/icons/CircleCheck.vue'
import FireIcon from './icons/FireIcon.vue';

/**
 * ------------------------------------------
 *	Utils
 * ------------------------------------------
 */

interface Props {
  mainText: string
  secondaryText: string
  type: 'success' | 'error'
}

interface Emit {
  (e: 'action:cancel'): void
}

defineProps<Props>()
const $emit = defineEmits<Emit>()
const $pomodoro = usePomodoroStore()
/**
 * ------------------------------------------
 *	Data
 * ------------------------------------------
 */

const transition = ref('circle-enter-active')

const classByStatus: Record<StatusSession, string> = {
  'completed': 'text-[#FC5185]',
  'current': 'text-[#3FC1C9]',
  'pending': 'text-[#FC5185]/20'
}

/**
 * ------------------------------------------
 *	Methods
 * ------------------------------------------
 */

/**
 * handleClickTransition
 *
 */

const handleClickTransition = () => {
  transition.value = 'circle-leave-active'
  $pomodoro.session = null
  $emit('action:cancel')
}
</script>

<template>
  <transition name="circle">
    <div v-if="true"  class="fixed z-10 top-0 bottom-0 left-0 right-0 bg-slate-950">
      <div class="min-h-screen bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]">
        <section>
          <div class="flex justify-end p-4">
            <button @click="handleClickTransition">
              <IconCheck class="text-white" />
            </button>
          </div>
        </section>

        <section class="px-10 py-32 text-white text-center space-y-8">
          <div class="flex justify-center items-center gap-4">
            <div 
              class="flex justify-center items-center text-5xl border rounded-lg w-32 h-32"
              :class="[$pomodoro.getIsActive && $pomodoro.getIsWorkCycle ? 'border-[#3FC1C9]' : 'border-white']"
            >
              {{  $pomodoro.minutes }}
            </div>
            :
            <div 
              class="flex justify-center items-center text-5xl border rounded-lg w-32 h-32"
              :class="[$pomodoro.getIsActive && $pomodoro.getIsWorkCycle  ? 'border-[#3FC1C9]' : 'border-white']"
            >
              {{ $pomodoro.seconds }}
            </div>
          </div>

          <h2 class="text-2xl ">
            {{ $pomodoro.session?.title }}
          </h2>

          <h3 class="text-xl">
            Sesión de {{ $pomodoro.getIsWorkCycle ? 'Trabajo' : 'Descanso' }}
          </h3>

          <div class="flex justify-center items-center">
            <FireIcon v-for="(status, index) in $pomodoro.cycleStatus()" :key="index" :class="classByStatus[status]" />
          </div>

          <div>
            <button v-if="$pomodoro.getIsActive" @click="$pomodoro.pauseSession()">
              Pausar
            </button>

            <button v-else @click="$pomodoro.resumeSession()">
              Reanudar
            </button>
          </div>

        </section>
      </div>
    </div>
  </transition>
</template>

<style>
.circle-enter-active {
  animation: 0.75s circle reverse;
}

.circle-leave-active {
  animation: 0.75s circle;
}

@keyframes circle {
  0% {
    clip-path: circle(75%);
  }

  100% {
    clip-path: circle(0%);
  }
}
</style>
