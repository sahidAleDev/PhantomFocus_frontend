<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import useServices, { type Configuration } from '@/services'


/**
 * ------------------------------------------
 *	Components
 * ------------------------------------------
 */
import InputNumber from '@/components/InputNumber.vue';
import TextInput from '@/components/forms/TextInput.vue';
import ConfigurationCard from '@/components/ConfigurationCard.vue';

/**
 * ------------------------------------------
 *	Utils
 * ------------------------------------------
 */
const $service = useServices()

/**
 * ------------------------------------------
 *	Data
 * ------------------------------------------
 */

enum NAV {
  CREATE_CONFIG = 0,
  LIST_CONFIG = 1
}

const currentNav = ref<NAV>(NAV.CREATE_CONFIG);
const breakDuration = ref<number>(0);
const cyclesBeforeLongBreak = ref<number>(0);
const longBreakDuration = ref<number>(0);
const workDuration = ref<number>(0);
const configurations = ref<Configuration[]>([])
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
  } catch (error) {
    console.error(error)
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
        class="p-4 rounded-lg text-base font-bold text-[#278A6B] border border-[#278A6B] hover:text-white hover:bg-[#278A6B] transition"
        :class="{ 'bg-[#278A6B] !text-white': currentNav === NAV.CREATE_CONFIG }"
        @click="currentNav = NAV.CREATE_CONFIG"
      >
        Crear configuración
      </button>
      <button 
        class="p-4 rounded-lg text-base font-bold text-[#278A6B] border border-[#278A6B] hover:text-white hover:bg-[#278A6B] transition"
        :class="{ 'bg-[#278A6B] !text-white': currentNav === NAV.LIST_CONFIG }"
        @click="currentNav = NAV.LIST_CONFIG"
      >
        Listar configuraciones
      </button>
    </section>
    
    <section v-if="currentNav === NAV.CREATE_CONFIG" >
      <form 
        @submit.prevent="handleSubmit"
        class="max-w-md mx-auto" 
      >
        <TextInput label="Nombre de la configuración" v-model:value="configurationName" />
        <InputNumber label="Sesiones antes del descanso largo" v-model:value="cyclesBeforeLongBreak"/>
        <InputNumber label="Minutos de descanso corto" v-model:value="breakDuration"/>
        <InputNumber label="Minutos de descanso largo" v-model:value="longBreakDuration"/>
        <InputNumber label="Minutos de trabajo por sesión" v-model:value="workDuration"/>
        <button type="submit" class="block w-full p-4 mt-6 rounded-lg text-base font-bold text-[#45474B] border border-[#45474B] hover:text-white hover:bg-[#45474B] transition">Guardar</button>
      </form>
    </section>

    <section v-else>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ConfigurationCard v-for="configuration in configurations" :key="configuration._id" :configuration="configuration"/>
      </div>
    </section>
  </div>
</template>