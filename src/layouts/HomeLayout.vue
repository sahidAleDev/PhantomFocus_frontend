<script setup lang="ts">

import { RouterLink } from 'vue-router';


/**
 * ------------------------------------------
 *	Components
 * ------------------------------------------
 */

import TomateIcon from '@/components/icons/TomatoIcon.vue'

</script>

<template>
  <div class="md:min-h-screen md:flex">
    <aside class="md:w-1/4 bg-[#F23D5E] px-5 py-10 flex flex-col">
        <div class="flex items-center justify-center gap-2 flex-wrap">
          <h2 class='text-3xl font-black text-white'>TomatoTime  </h2>
          <TomateIcon class="size-6 inline-block"/>
        </div>

        <nav class="mt-10 flex-grow">
          <RouterLink
            class="text-white text-2xl block mt-2 hover:text-red-300"
            to="/tareas-hoy"
          >
            Hoy
          </RouterLink>
          
          <RouterLink
            class="text-white text-2xl block mt-2 hover:text-red-300"
            to="/tareas-mañana"
          >
            Mañana
          </RouterLink>
          
          <RouterLink
            class="text-white text-2xl block mt-2 hover:text-red-300"
            to="/tareas-semana"
          >
            Esta semana
          </RouterLink>
          
          <RouterLink
            class="text-white text-2xl block mt-2 hover:text-red-300"
            to="/tareas-hoy"
          >
            Completadas
          </RouterLink>
        </nav>

        <nav>
          <RouterLink
            class="text-white text-2xl block mt-2 hover:text-red-300"
            to="/configuracion"
          >
            Configuraciones
          </RouterLink>
        </nav>
    </aside>

    <main class="md:w-3/4 p-10 md:h-screen">
      <RouterView/>
    </main>
  </div>
</template>
