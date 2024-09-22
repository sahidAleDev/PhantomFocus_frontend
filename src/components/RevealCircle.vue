<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePomodoroStore } from '@/stores/pomodoro';
import type { StatusSession } from '@/stores/pomodoro';
import useService, { type GetPomodoroSession } from '@/services';

/**
 * ------------------------------------------
 *	Components
 * ------------------------------------------
 */
import FireIcon from './icons/FireIcon.vue';
import AngleLeftIcon from './icons/AngleLeftIcon.vue';
import DialogConfirm from './widgets/DialogConfirm.vue';

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
const $service = useService()
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
const showDialog = ref<boolean>(false)

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
  $pomodoro.pomodoroSession = undefined
  $emit('action:cancel')
}

/**
 * handleDialog
 *
 */
const handleDialog = () => {
  showDialog.value = true
}

/**
 * leaveWithoutSave
 *
 */
 const leaveWithoutSave = () => {
  $pomodoro.clearSession()
  showDialog.value = false
  handleClickTransition()
}

/**
 * saveProgress
 *
 */
const saveProgress = async () => {
  try {
    const session = $pomodoro.pomodoroSession;
    if (!session) return; // Verifica si es null antes de continuar
    await $service.updatePomodoroSession(session._id, session);
    $pomodoro.updateSession();
  } catch (error) {
    console.error(error);    
  }
}


/**
 * handleSaveAndExit
 */
const handleSaveAndExit = () => {
  $pomodoro.pauseSession()
  $pomodoro.updateSession()
  saveProgress()
  $pomodoro.clearSession()
  showDialog.value = false
  handleClickTransition()
}

watch(() => $pomodoro.pomodoroSession, (newSession) => {
  if (newSession === undefined) {
    transition.value = 'circle-enter-active';
    $emit('action:cancel');
  }
}, { immediate: true });
</script>

<template>
  <transition name="circle">
    <div v-if="true" class="fixed z-10 top-0 bottom-0 left-0 right-0 bg-slate-950">
      <div class="min-h-screen bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]">

        <DialogConfirm v-if="showDialog" @action:save-and-exit="handleSaveAndExit" @action:not-save="leaveWithoutSave"  />

        <div class="px-10 py-10">
          <section class="flex items-center gap-4 mb-20 text-white cursor-pointer">

            <AngleLeftIcon @click="handleDialog" class="size-6 hover:bg-[#364F6B] rounded-md transition" />
            Regresar
          </section>
  
          <section class="text-white text-center space-y-8 max-w-lg mx-auto">
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
              {{ $pomodoro.pomodoroSession?.title }}
            </h2>
  
  
            <div class="space-y-2">
              <h3 class="text-xl" :class="[ $pomodoro.getIsWorkCycle ? 'text-[#3FC1C9]' : 'text-white' ]">
                Sesión de {{ $pomodoro.getIsWorkCycle ? 'Trabajo' : 'Descanso' }}
              </h3>
    
              <div class="flex justify-center items-center">
                <FireIcon v-for="(status, index) in $pomodoro.cycleStatus()" :key="index" class="size-8"  :class="classByStatus[status]" />
              </div>
            </div>
  
            
            <div class="flex justify-center gap-4">
              <button v-if="$pomodoro.getIsActive" @click="$pomodoro.pauseSession()" class="btn-medium btn-primary w-36">
                Pausar
              </button>
              <button v-else class="btn-medium btn-primary w-36" @click="$pomodoro.resumeSession()">
                Reanudar
              </button>
            </div>
          </section>
        </div>
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
