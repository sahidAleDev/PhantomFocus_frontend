<script setup lang="ts">
import useServices, { type GetPomodoroSession, type GetConfiguration } from '@/services'
import { onBeforeMount, ref } from 'vue';

/**
 * ------------------------------------------
 *	Components
 * ------------------------------------------
 */
import LoadSkeleton from '@/components/widgets/LoadSkeleton.vue';
import PomodoroCard from '@/components/PomodoroCard.vue'
import DialogPomodoro from '@/components/widgets/DialogPomodoro.vue';
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

const configurations = ref<GetConfiguration[]>([])
const loading = ref<boolean>(true)
const pomodoros = ref<GetPomodoroSession[]>([])
const showDialog = ref<boolean>(false)

function removeItem(pomodoroToRemove: GetPomodoroSession) {
  pomodoros.value = pomodoros.value.filter((pomodoro) => pomodoro._id !== pomodoroToRemove._id)
}

onBeforeMount(async () => {
  try {
    loading.value = true
    const { data: dataPomdoroSession } = await $service.getPomodoroSessions('')
    pomodoros.value = dataPomdoroSession
    console.log(pomodoros.value)
    const { data: dataConfigurations } = await $service.getConfigurations()
    configurations.value = dataConfigurations

    console.log(dataConfigurations)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <DialogPomodoro v-if="showDialog" @action:cancel="showDialog = false" :configurations="configurations"/>
  
  <div class="space-y-6">
    <h1 class="font-black text-4xl text-[#137E5F]">Hoy</h1>

    <button class="btn-blue-outline" @click="showDialog = true">Crear sesión</button>

    
    <div v-if="!loading" class="grid grid-cols-2 gap-2 " v-auto-animate>
      <PomodoroCard 
        v-for="(pomodoro, index) in pomodoros" 
        :key="`${pomodoro._id}-${index}`" 
        :pomodoro="pomodoro"
        @remove="removeItem"
      />
    </div>

    <LoadSkeleton v-else-if="loading" :items="6" class="mt-4" />
  </div>
</template>