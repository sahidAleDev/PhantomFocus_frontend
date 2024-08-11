<script setup lang="ts">
import { ref, computed } from 'vue';
import type { GetConfiguration, PostPomodoroSession } from '@/services';
import useService  from '@/services';
import { usePomodoroStore } from '@/stores/pomodoro';
import { useNotificationStore } from '@/stores/notification';
/**
 * ------------------------------------------
 *	Components
 * ------------------------------------------
 */
import CloseIcon from '@/components/icons/CloseIcon.vue';
import InputLabel from '@/components/forms/InputLabel.vue';
import InputText from '@/components/forms/InputText.vue';
interface Emits {
  (event: 'action:cancel'): void
}

/**
 * ------------------------------------------
 *	Utils
 * ------------------------------------------
 */
interface Props {
  configurations: GetConfiguration[]
}

const $emits = defineEmits<Emits>()
const $notificationStore = useNotificationStore();
const $pomodoro = usePomodoroStore()
const $props = defineProps<Props>()
const $service = useService()
/**
 * ------------------------------------------
 *	Data
 * ------------------------------------------
 */
const sessionName = ref<string>('');
const selectedConfigId = ref<string>('');

const selectedConfig = computed(() => {
  return $props.configurations.find(config => config._id === selectedConfigId.value) || null;
});

/**
 * ------------------------------------------
 *	Methods
 * ------------------------------------------
 */
const saveSession = async () => {
  try {
    if (!sessionName.value || !selectedConfig.value) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    const newSession: PostPomodoroSession = {
      breakDuration: selectedConfig.value.breakDuration,
      createdAt: new Date(),
      currentCycle: 0,
      cyclesBeforeLongBreak: selectedConfig.value.cyclesBeforeLongBreak,
      endTime: new Date(),
      isActive: false,
      isCompleted: false,
      longBreakDuration: selectedConfig.value.longBreakDuration,
      pauseRemainingTime: 0,
      startTime: new Date(),
      title: sessionName.value,
      userId: selectedConfig.value.userId,
      workDuration: selectedConfig.value.workDuration,
    };
  
    await $service.postPomodoroSession(newSession);
    const { data: dataPomdoroSession } = await $service.getPomodoroSessions('')
    $pomodoro.setPomodoroSessions(dataPomdoroSession)
    $notificationStore.showNotification('Sesión creada', 'success');
    $emits('action:cancel');
  } catch (error) {
    console.error(error);
    $notificationStore.showNotification('Error al crear la sesión', 'error');
  }
}
</script>

<template>
  <article id="container_popup" class="fixed z-20 flex justify-center items-center h-screen w-full top-0 left-0 right-0 bottom-0 px-4 bg-black/40">
    <section id="popup" class="w-full sm:max-w-screen-sm bg-white rounded-3xl popUp_fadeIn">
      
      <form @submit.prevent="saveSession" class="p-4 sm:py-8 sm:p-8 space-y-4 text-black">
        <div class="flex justify-between items-center">
          <h2 class="font-semibold text-xl sm:text-2xl ">Agregar sesión</h2>
          <CloseIcon @click="$emit('action:cancel')" class="rounded-full p-0.5 cursor-pointer hover:bg-[#45474B]/20"/>
        </div>

        <div class="space-y-2 sm:space-y-6">
          <div class="container-dialog-input">
            <InputLabel value="Nombre" forLabel="nombre-sesion" className="text-black"/>
            <InputText v-model:value="sessionName" id="nombre-sesion" classNames="p-2.5 sm:col-span-4 w-full" />
          </div>

          <div class="container-dialog-input">
            <InputLabel value="Configuración" forLabel="configuracion-sesion" />
            <select v-model="selectedConfigId" id="configuracion-sesion" class="sm:col-span-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option value="" selected>-- Elige una configuración --</option>
              <option 
                v-for="configuration in configurations" :key="configuration._id" :value="configuration._id"
              >
                {{ configuration.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <button @click="$emit('action:cancel')" role="button" class="btn-primary-outline btn-small">
            Cancelar
          </button>
          <button type="submit" role="button" class="btn-primary btn-small">
            Guardar
          </button>
        </div>
      </form>
    </section>
  </article>
</template>