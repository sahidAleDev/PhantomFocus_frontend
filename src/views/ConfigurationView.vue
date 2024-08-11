<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import useServices, { type GetConfiguration } from '@/services'
import { useNotificationStore } from '@/stores/notification';

/**
 * ------------------------------------------
 *	Components
 * ------------------------------------------
 */
import InputNumber from '@/components/forms/InputNumber.vue';
import TextInput from '@/components/forms/InputText.vue';
import ConfigurationCard from '@/components/ConfigurationCard.vue';
import InputLabel from '@/components/forms/InputLabel.vue';

/**
 * ------------------------------------------
 *	Utils
 * ------------------------------------------
 */
const $service = useServices()
const $notificationStore = useNotificationStore()

/**
 * ------------------------------------------
 *	Data
 * ------------------------------------------
 */
enum NAV {
  LIST_CONFIG = 0,
  CREATE_CONFIG = 1
}

const currentNav = ref<NAV>(NAV.LIST_CONFIG);
const breakDuration = ref<number>(0);
const cyclesBeforeLongBreak = ref<number>(0);
const longBreakDuration = ref<number>(0);
const workDuration = ref<number>(0);
const configurations = ref<GetConfiguration[]>([])
const configurationName = ref<string>('')

/**
 * ------------------------------------------
 *	Methods
 * ------------------------------------------
 */

const getConfigurations = async () => {
  try {
    const { data: dataConfigurations } = await $service.getConfigurations()
    configurations.value = dataConfigurations
    console.log(dataConfigurations)
  } catch (error) {
    console.error(error)
    throw new Error('Error al obtener las configuraciones')
  }
}

/**
 * handleSubmit
 */
const handleSubmit = async () => {
  console.log('Submit');

  try {
    const { data } = await $service.postConfiguration({
      name: configurationName.value,
      breakDuration: breakDuration.value,
      cyclesBeforeLongBreak: cyclesBeforeLongBreak.value,
      longBreakDuration: longBreakDuration.value,
      workDuration: workDuration.value,
      userId: '6645bae77d80e9286015a785'
    })

    console.log(data)
    await getConfigurations()
    $notificationStore.showNotification('Configuración creada', 'success')
    currentNav.value = NAV.LIST_CONFIG
  } catch (error) {
    console.error(error)
    $notificationStore.showNotification('Error al crear la configuración', 'error')
  }

};

/**
 * ------------------------------------------
 *	Lifecycle
 * ------------------------------------------
 */
onBeforeMount(async () => {
  try {
    const { data: dataConfigurations } = await $service.getConfigurations()
    configurations.value = dataConfigurations
    console.log(dataConfigurations)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="space-y-10">

    <section class="flex gap-4">
      <button 
        class="btn-medium btn-primary-outline hover:text-white hover:bg-[#364F6B] transition"
        :class="{ 'bg-[#364F6B] !text-white': currentNav === NAV.LIST_CONFIG }"
        @click="currentNav = NAV.LIST_CONFIG"
      >
        Listar configuraciones
      </button>
      <button 
        class="btn-medium btn-primary-outline hover:text-white hover:bg-[#364F6B] transition"
        :class="{ 'bg-[#364F6B] !text-white': currentNav === NAV.CREATE_CONFIG }"
        @click="currentNav = NAV.CREATE_CONFIG"
      >
        Crear configuración
      </button>
    </section>
    
    <section v-if="currentNav === NAV.CREATE_CONFIG" >
      <form 
        @submit.prevent="handleSubmit"
        class="max-w-md mx-auto space-y-4" 
      >
        <div>
          <InputLabel forLabel="nombre-configuracion" value="Nombre de la configuración" className="text-white"/>
          <TextInput id="nombre-configuracion" v-model:value="configurationName" />
        </div>

        <div>
          <InputLabel forLabel="sesiones-antes-descanso-largo" value="Sesiones antes del descanso largo" className="text-white" />
          <InputNumber id="sesiones-antes-descanso-largo" v-model:value="cyclesBeforeLongBreak"/>
        </div>

        <div>
          <InputLabel forLabel="Minutos de descanso corto" value="Minutos de descanso corto" className="text-white"/>
          <InputNumber id="minutos-de-descanso-corto" v-model:value="breakDuration"/>
        </div>

        <div>
          <InputLabel forLabel="Minutos de descanso largo" value="Minutos de descanso largo" className="text-white"/>
          <InputNumber id="minutos-de-descanso-largo" v-model:value="longBreakDuration"/>
        </div>

        <div>
          <InputLabel forLabel="Minutos de trabajo por sesión" value="Minutos de trabajo por sesión" className="text-white"/>
          <InputNumber id="minutos-de-trabajo-por-sesión" v-model:value="workDuration"/>
        </div>

        <button type="submit" class="btn-secondary btn-medium w-full">Guardar</button>
      </form>
    </section>

    <section v-else>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ConfigurationCard v-for="configuration in configurations" :key="configuration._id" :configuration="configuration"/>
      </div>
    </section>
  </div>
</template>