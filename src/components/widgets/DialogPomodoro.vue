<script setup lang="ts">
import { ref, computed } from 'vue';
import type { GetConfiguration, PostPomodoroSession } from '@/services';
import { convertToISO } from '@/helpers';
import useService  from '@/services';

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

defineEmits<Emits>()
const $props = defineProps<Props>()
const $service = useService()
/**
 * ------------------------------------------
 *	Data
 * ------------------------------------------
 */
const sessionName = ref<string>('');
const date = ref<string>('');
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
  if (!sessionName.value || !date.value || !selectedConfig.value) {
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
    pauseTime: new Date(),
    resumeTime: new Date(),
    startTime: new Date(),
    title: sessionName.value,
    userId: selectedConfig.value.userId,
    workDuration: selectedConfig.value.workDuration,
  };

  // Aquí puedes llamar a una función para guardar la sesión, por ejemplo:
  // savePomodoroSession(newSession);

  await $service.postPomodoroSession(newSession);
  await $service.getPomodoroSessions('');
  console.log('New Session:', newSession);
}
</script>

<template>
  <article id="container_popup" class="fixed z-10 flex justify-center items-center h-screen w-full top-0 left-0 right-0 bottom-0 px-4 bg-black/40">
    <section id="popup" class="w-full sm:max-w-screen-sm bg-white rounded-3xl popUp_fadeIn">
      
      <form @submit.prevent="saveSession" class="p-4 sm:py-8 sm:p-8 space-y-4 sm:space-y-4 text-black">
        <div class="flex justify-between items-center">
          <h2 class="font-semibold text-xl sm:text-2xl ">Agregar sesión</h2>
          <CloseIcon @click="$emit('action:cancel')" class="rounded-full p-0.5 cursor-pointer hover:bg-[#45474B]/20"/>
        </div>

        <div class="space-y-2 sm:space-y-6">
          <div class="container-dialog-input">
            <InputLabel value="Nombre" forLabel="nombre-sesion" />
            <InputText v-model:value="sessionName" id="nombre-sesion" classNames="p-2.5 sm:col-span-4 w-full" />
          </div>

          <div class="container-dialog-input">
            <InputLabel value="Fecha" forLabel="fecha-sesion" />
            <div class="sm:col-span-4">
              <VueDatePicker id="fecha-sesion" :dark="false" v-model="date"  locale="es" placeholder="Selecciona la fecha" :enable-time-picker="false"></VueDatePicker>
            </div>
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
          <button @click="$emit('action:cancel')" role="button" class="btn-secondary">
            Cancelar
          </button>
          <button type="submit" role="button" class="btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </section>
  </article>
</template>


<style>
:root {
  /*General*/
  --dp-font-family: "Outfit", sans-serif;
  --dp-border-radius: 8px ; /*Configurable border-radius*/
  --dp-cell-border-radius: 4px; /*Specific border radius for the calendar cell*/
  --dp-common-transition: all 0.1s ease-in; /*Generic transition applied on buttons and calendar cells*/

  /*Sizing*/
  --dp-button-height: 35px; /*Size for buttons in overlays*/
  --dp-month-year-row-height: 35px; /*Height of the month-year select row*/
  --dp-month-year-row-button-size: 35px; /*Specific height for the next/previous buttons*/
  --dp-button-icon-height: 20px; /*Icon sizing in buttons*/
  --dp-cell-size: 35px; /*Width and height of calendar cell*/
  --dp-cell-padding: 5px; /*Padding in the cell*/
  --dp-common-padding: 10px; /*Common padding used*/
  --dp-input-icon-padding: 35px; /*Padding on the left side of the input if icon is present*/
  --dp-input-padding: 10px; /*Padding in the input*/
  --dp-menu-min-width: 260px; /*Adjust the min width of the menu*/
  --dp-action-buttons-padding: 2px 5px; /*Adjust padding for the action buttons in action row*/
  --dp-row-margin:  5px 0; /*Adjust the spacing between rows in the calendar*/
  --dp-calendar-header-cell-padding:  0.5rem; /*Adjust padding in calendar header cells*/
  --dp-two-calendars-spacing:  10px; /*Space between multiple calendars*/
  --dp-overlay-col-padding:  3px; /*Padding in the overlay column*/
  --dp-time-inc-dec-button-size:  32px; /*Sizing for arrow buttons in the time picker*/
  --dp-menu-padding: 6px 8px; /*Menu padding*/
  
  /*Font sizes*/
  --dp-font-size: 14px; /*Default font-size*/
  --dp-preview-font-size: 0.8rem; /*Font size of the date preview in the action row*/
  --dp-time-font-size: 0.8rem; /*Font size in the time picker*/
  
  /*Transitions*/
  --dp-animation-duration: 0.1s; /*Transition duration*/
  --dp-menu-appear-transition-timing: cubic-bezier(.4, 0, 1, 1); /*Timing on menu appear animation*/
  --dp-transition-timing: ease-out; /*Timing on slide animations*/
}
.dp__theme_light {
  --dp-background-color: #f9fafb  ;
  --dp-text-color: #111827 ;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #1976d2;
  --dp-primary-disabled-color: #6bacea;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-border-color-focus: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #111827 ;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #8e8e8e;
  --dp-highlight-color: rgb(25 118 210 / 10%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
  --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
}
</style>