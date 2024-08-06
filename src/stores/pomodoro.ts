import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { GetPomodoroSession } from '@/services';

const STORE_NAME = 'pomodoro';

export type StatusSession = 'completed' | 'pending' | 'current';

export const usePomodoroStore = defineStore(STORE_NAME, () => {

  // DATA
  const isSessionEnded = ref<boolean>(false);
  const isWorkCycle = ref<boolean>(true); 
  const pauseRemainingTime = ref<number>(0);
  const remainingTime = ref<number>(0);
  const session = ref<GetPomodoroSession | null>(null);
  const timer = ref<number | null>(null);

  // GETTERS

  const getIsActive = computed(() => session.value?.isActive);
  const getIsWorkCycle = computed(() => isWorkCycle.value);

  const minutes = computed(() => {
    const mins = Math.floor(remainingTime.value / 60);
    return mins < 10 ? `0${mins}` : `${mins}`;
  });

  const seconds = computed(() => {
    const secs = remainingTime.value % 60;
    return secs < 10 ? `0${secs}` : `${secs}`;
  });


  function cycleStatus(sessionProp?: GetPomodoroSession): StatusSession[] {
    if (!sessionProp && !session.value) return [];
    else if (!sessionProp && session.value) {
      sessionProp = session.value;
    }
    
    const statusArray: StatusSession[] = [];
    
    // Usando la aserción no nula para decirle a TypeScript que sessionProp está definido
    const sessionPropDefined = sessionProp!;
  
    for (let i = 0; i < sessionPropDefined.cyclesBeforeLongBreak; i++) {
      if (i < sessionPropDefined.currentCycle) {
        statusArray.push('completed');
      } else if (i === sessionPropDefined.currentCycle && sessionPropDefined.isActive && isWorkCycle.value) {
        statusArray.push('current');
      } else {
        statusArray.push('pending');
      }
    }
  
    return statusArray;
  }

  // METHODS
  function startSession(sessionProp: GetPomodoroSession) {
    console.log('Starting session');
    console.log('Work session');
    session.value = {...sessionProp};
    session.value.isActive = true; // Activar la sesión
    isWorkCycle.value = true; // Iniciar con un ciclo de trabajo
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
    }, 100);
  }

  function pauseSession() {
    if (timer.value) {
      clearInterval(timer.value);
    }
    pauseRemainingTime.value = remainingTime.value; // Almacenar el tiempo restante al pausar

    if (session.value) {
      session.value.pauseTime = new Date();
      session.value.isActive = false;
    }
  }

  function resumeSession() {
    if (session.value) {
      session.value.resumeTime = new Date();
      remainingTime.value = pauseRemainingTime.value; // Restaurar el tiempo restante almacenado
      session.value.isActive = true;
      startTimer();
    }
  }

  function handleCycleEnd() {
    if (isSessionEnded.value) {
      endSession();
      return;
    }

    if (timer.value) {
      clearInterval(timer.value);
    }

    if (session.value) {
      if (isWorkCycle.value) {
        session.value.currentCycle++;
        isWorkCycle.value = false; // Cambiar a ciclo de descanso

        if (session.value.currentCycle >= session.value.cyclesBeforeLongBreak) {
          remainingTime.value = session.value.longBreakDuration * 60; // Descanso largo
          isSessionEnded.value = true;
          console.log('Long break');
        } else {
          remainingTime.value = session.value.breakDuration * 60; // Descanso corto
          console.log('Short break');
        }
      } else {
        isWorkCycle.value = true; // Cambiar a ciclo de trabajo
        remainingTime.value = session.value.workDuration * 60; // Convertir a segundos
        console.log('Work session');
      }
      startTimer();
    }
  }

  function endSession() {
    if (timer.value) {
      clearInterval(timer.value);
    }
    if (session.value) {
      console.log(session.value);
      session.value.isCompleted = true;
      session.value.isActive = false;
      console.log('Session ended');
    }

    isWorkCycle.value = true;
    remainingTime.value = 0;
    pauseRemainingTime.value = 0;
    isSessionEnded.value = false;
  }

  return { 
    // Data
    cycleStatus,
    getIsActive,
    getIsWorkCycle,
    isWorkCycle, // Añadir a los datos retornados
    minutes,
    pauseRemainingTime, // Añadir a los datos retornados
    remainingTime,
    seconds,
    session,
    timer,

    // Methods
    endSession,
    handleCycleEnd,
    pauseSession,
    resumeSession,
    startSession,
    startTimer,
  };
});
