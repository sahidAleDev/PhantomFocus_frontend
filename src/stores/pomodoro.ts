import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { GetPomodoroSession } from '@/services';

const STORE_NAME = 'pomodoro';

export const usePomodoroStore = defineStore(STORE_NAME, () => {
  const session = ref<GetPomodoroSession | null>(null);
  const timer = ref<number | null>(null);
  const remainingTime = ref<number>(0);
  const pauseRemainingTime = ref<number>(0); // Nuevo ref para almacenar el tiempo restante al pausar

  // GETTERS
  const minutes = computed(() => {
    const mins = Math.floor(remainingTime.value / 60);
    return mins < 10 ? `0${mins}` : `${mins}`;
  });

  const seconds = computed(() => {
    const secs = remainingTime.value % 60;
    return secs < 10 ? `0${secs}` : `${secs}`;
  });

  // METHODS
  function startSession(sessionProp: GetPomodoroSession) {
    session.value = sessionProp;
    remainingTime.value = sessionProp.workDuration * 60; // Convertir a segundos
    startTimer();
  }

  function startTimer() {
    if (timer.value) {
      clearInterval(timer.value);
    }
    timer.value = setInterval(() => {
      if (remainingTime.value > 0) {
        remainingTime.value--;
      } else {
        handleCycleEnd();
      }
    }, 1000);
  }

  function pauseSession() {
    if (timer.value) {
      clearInterval(timer.value);
    }
    pauseRemainingTime.value = remainingTime.value; // Almacenar el tiempo restante al pausar
    if (session.value) {
      session.value.pauseTime = new Date();
    }
  }

  function resumeSession() {
    if (session.value) {
      session.value.resumeTime = new Date();
      remainingTime.value = pauseRemainingTime.value; // Restaurar el tiempo restante almacenado
      startTimer();
    }
  }

  function handleCycleEnd() {
    if (timer.value) {
      clearInterval(timer.value);
    }

    if (session.value) {
      session.value.currentCycle++;

      if(session.value.currentCycle > session.value.cyclesBeforeLongBreak) {
        endSession();
      }
      
      else if (session.value.currentCycle === session.value.cyclesBeforeLongBreak ) {
        remainingTime.value = session.value.longBreakDuration * 60; // Convertir a segundos
        startTimer();
        console.log('Long break');
      } 
      
      else if(session.value.currentCycle < session.value.cyclesBeforeLongBreak) {
        remainingTime.value = session.value.breakDuration * 60; // Convertir a segundos
        startTimer();
        console.log('Short break');
      }
    }
  }

  function endSession() {
    if (timer.value) {
      clearInterval(timer.value);
    }
    if (session.value) {
      session.value.isCompleted = true;
    }
  }

  return { 
    // Data
    session,
    timer,
    remainingTime,
    pauseRemainingTime, // Añadir a los datos retornados
    minutes,
    seconds,

    // Methods
    startSession,
    startTimer,
    pauseSession,
    resumeSession,
    handleCycleEnd,
    endSession
  };
});
