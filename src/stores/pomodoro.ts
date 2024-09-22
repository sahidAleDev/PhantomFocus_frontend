import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { GetPomodoroSession } from '@/services';
import useService  from '@/services';
const STORE_NAME = 'pomodoro';

export type StatusSession = 'completed' | 'pending' | 'current';

export const usePomodoroStore = defineStore(STORE_NAME, () => {
  // Utils
  const $service = useService();

  // DATA
  const isSessionEnded = ref<boolean>(false);
  const isWorkCycle = ref<boolean>(true); 
  const pauseRemainingTime = ref<number>(0);
  const pomodoroSession = ref<GetPomodoroSession>();
  const pomodoroSessions = ref<GetPomodoroSession[]>([]);
  const remainingTime = ref<number>(0);
  const timer = ref<number | null>(null);
  const hasSession = computed(() => pomodoroSession.value !== null);

  // GETTERS
  const getIsActive = computed(() => pomodoroSession.value?.isActive);
  const getIsWorkCycle = computed(() => isWorkCycle.value);
  const getPomodoroSessions = computed<GetPomodoroSession[]>(() => pomodoroSessions.value);
  const minutes = computed(() => {
    const mins = Math.floor(remainingTime.value / 60);
    return mins < 10 ? `0${mins}` : `${mins}`;
  });
  const seconds = computed(() => {
    const secs = remainingTime.value % 60;
    return secs < 10 ? `0${secs}` : `${secs}`;
  });
  const completedSessions = computed(() => pomodoroSessions.value.filter(session => session.isCompleted));
  const uncompletedSessions = computed(() => pomodoroSessions.value.filter(session => !session.isCompleted));

  // SETTERS 
  function setPomodoroSessions(sessions: GetPomodoroSession[]) { 
    pomodoroSessions.value = sessions;
  } 

  // METHODS

  /**
   * cycleStatus
   */ 
  function cycleStatus(sessionProp?: GetPomodoroSession): StatusSession[] {
    if (!sessionProp && !pomodoroSession.value) return [];
    else if (!sessionProp && pomodoroSession.value) {
      sessionProp = pomodoroSession.value;
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

  /**
   * startSession
   */ 
  function startSession(sessionProp: GetPomodoroSession) {
    console.log('Starting session');
    console.log('Work session');
    console.log(sessionProp.pauseRemainingTime, 'pauseRemainingTime');
    pomodoroSession.value = {...sessionProp};
    pomodoroSession.value.isActive = true; // Activar la sesión
    isWorkCycle.value = true; // Iniciar con un ciclo de trabajo
    if(sessionProp.pauseRemainingTime != 0) {
      remainingTime.value = sessionProp.pauseRemainingTime; 
    } else {
      remainingTime.value = sessionProp.workDuration * 60; // Convertir a segundos
    }

    startTimer();
  }

  /**
   * startTimer
   */ 
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
    }, 10);
  }

  /**
   * pauseSession
   */ 
  function pauseSession() {
    if (timer.value) {
      clearInterval(timer.value);
    }
    
    if (pomodoroSession.value) {
      pauseRemainingTime.value = remainingTime.value; // Almacenar el tiempo restante al pausar
      pomodoroSession.value.pauseRemainingTime = pauseRemainingTime.value;
      console.log(`Paused remaining time: ${pomodoroSession.value.pauseRemainingTime}`);
      pomodoroSession.value.isActive = false;
    }
  }

  /**
   * resumeSession
   */ 
  function resumeSession() {
    if (pomodoroSession.value) {
      remainingTime.value = pauseRemainingTime.value; // Restaurar el tiempo restante almacenado
      pomodoroSession.value.isActive = true;
      startTimer();
    }
  }

  /**
   * handleCycleEnd
   */ 
  function handleCycleEnd() {
    if (isSessionEnded.value) {
      finishSession();
      return;
    }

    if (timer.value) {
      clearInterval(timer.value);
    }

    if (pomodoroSession.value) {
      if (isWorkCycle.value) {
        pomodoroSession.value.currentCycle++;
        isWorkCycle.value = false; // Cambiar a ciclo de descanso

        if (pomodoroSession.value.currentCycle >= pomodoroSession.value.cyclesBeforeLongBreak) {
          remainingTime.value = pomodoroSession.value.longBreakDuration * 60; // Descanso largo
          isSessionEnded.value = true;
          console.log('Long break');
        } else {
          remainingTime.value = pomodoroSession.value.breakDuration * 60; // Descanso corto
          console.log('Short break');
        }
      } else {
        isWorkCycle.value = true; // Cambiar a ciclo de trabajo
        remainingTime.value = pomodoroSession.value.workDuration * 60; // Convertir a segundos
        console.log('Work session');
      }
      startTimer();
    }
  }

  /**
   * finishSession
   */ 
  function finishSession() {
    if (timer.value) {
      clearInterval(timer.value);
    }
    if (pomodoroSession.value) {
      console.log(pomodoroSession.value);
      pomodoroSession.value.isCompleted = true;
      pomodoroSession.value.isActive = false;
      $service.updatePomodoroSession(pomodoroSession.value._id, pomodoroSession.value);
      updateSession();
    }

    clearSession();
  }

  /**
   * clearSession
   */ 
  function clearSession() {
    if (timer.value) {
      clearInterval(timer.value);
    }
    pomodoroSession.value = undefined;
    isWorkCycle.value = true;
    remainingTime.value = 0;
    pauseRemainingTime.value = 0;
    isSessionEnded.value = false;
  }

  /**
   * updateSession
   */
  function updateSession() {
    if (pomodoroSession.value) {
      const index = pomodoroSessions.value.findIndex(sessionItem => sessionItem._id === pomodoroSession.value?._id);
      if (index !== -1) {
        pomodoroSessions.value.splice(index, 1, pomodoroSession.value);
      }
    }
  }

  return { 
    // Data
    completedSessions,
    cycleStatus,
    getIsActive,
    getIsWorkCycle,
    getPomodoroSessions,
    hasSession,
    isWorkCycle, 
    minutes,
    pauseRemainingTime,
    pomodoroSession,
    pomodoroSessions,
    remainingTime,
    seconds,
    timer,
    uncompletedSessions,

    // Methods
    clearSession,
    finishSession,
    handleCycleEnd,
    pauseSession,
    resumeSession,
    setPomodoroSessions,
    startSession,
    startTimer,
    updateSession,
  };
});
