<script setup lang="ts">
import useServices, { type GetPomodoroSession, type GetConfiguration } from '@/services'
import { onBeforeMount, ref } from 'vue';
import { usePomodoroStore } from '@/stores/pomodoro';
/**
 * ------------------------------------------
 *	Components
 * ------------------------------------------
 */
import LoadSkeleton from '@/components/widgets/LoadSkeleton.vue';
import PomodoroCard from '@/components/PomodoroCard.vue'
import DialogPomodoro from '@/components/widgets/DialogPomodoro.vue';
import RevealCircle from '@/components/RevealCircle.vue';
/**
 * ------------------------------------------
 *	Utils
 * ------------------------------------------
 */
const $service = useServices()
const $pomodoro = usePomodoroStore()

/**
 * ------------------------------------------
 *	Data
 * ------------------------------------------
 */

const configurations = ref<GetConfiguration[]>([])
const loading = ref<boolean>(true)
const pomodoros = ref<GetPomodoroSession[]>([])
const showDialog = ref<boolean>(false)
const showRevealCircle = ref<boolean>(false)

function removeItem(pomodoroToRemove: GetPomodoroSession) {
  pomodoros.value = pomodoros.value.filter((pomodoro) => pomodoro._id !== pomodoroToRemove._id)
}


/**
 * ------------------------------------------
 *	Methods
 * ------------------------------------------
 */

const handleStart = (pomodoro: GetPomodoroSession) => {
  console.log(pomodoro)
  $pomodoro.startSession(pomodoro)
  showRevealCircle.value = true
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
  <RevealCircle v-show="showRevealCircle" main-text="hola" secondary-text="bye" type="success" @action:cancel="showRevealCircle = false"/>

  <div class="space-y-6">

    <button class="btn-small btn-primary" @click="showDialog = true">Crear sesión</button>

    <div v-if="!loading" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 " v-auto-animate>
      <PomodoroCard 
        v-for="(pomodoro, index) in pomodoros" 
        :key="`${pomodoro._id}-${index}`" 
        :pomodoro="pomodoro"
        @remove="removeItem"
        @action:start="handleStart"
      />
    </div>

    <LoadSkeleton v-else-if="loading" :items="6" class="mt-4" />
  </div>
</template>