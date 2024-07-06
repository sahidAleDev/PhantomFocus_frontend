<script setup lang="ts">
import useServices, { type PomodoroSession, type Configuration } from '@/services'
import { onBeforeMount, ref } from 'vue';

/**
 * ------------------------------------------
 *	Components
 * ------------------------------------------
 */
import LoadSkeleton from '@/components/widgets/LoadSkeleton.vue';
import PomodoroCard from '@/components/PomodoroCard.vue'
import PomodoroCreate from '@/components/widgets/PomodoroCreate.vue';

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

const configurations = ref<Configuration[]>([])
const pomodoros = ref<PomodoroSession[]>([])
const loading = ref<boolean>(true)

function removeItem(pomodoroToRemove: PomodoroSession) {
  pomodoros.value = pomodoros.value.filter((pomodoro) => pomodoro._id !== pomodoroToRemove._id)
}

onBeforeMount(async () => {
  try {
    loading.value = true
    const { data: dataPomdoroSession } = await $service.getPomodoroSessions('')
    pomodoros.value = dataPomdoroSession
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
  <div class="space-y-6">
    <h1 class="font-black text-4xl text-[#D10D44]">Hoy</h1>

    
    <PomodoroCreate :configurations="configurations" />

    <div v-if="!loading" class="space-y-4" v-auto-animate>
      <PomodoroCard 
        v-for="pomodoro in pomodoros" 
        :key="pomodoro._id" 
        :pomodoro="pomodoro"
        @remove="removeItem"
      />
    </div>

    <LoadSkeleton v-else-if="loading" :items="6" class="mt-4" />
  </div>
</template>