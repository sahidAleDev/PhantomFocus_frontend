<script setup lang="ts">

import { RouterLink } from 'vue-router';
import { ROUTES } from '@/router/names';

/**
 * ------------------------------------------
 *	Components
 * ------------------------------------------
 */

import TomateIcon from '@/components/icons/TomatoIcon.vue'

</script>

<template>
  <div class="md:min-h-screen md:flex">
    <aside class="md:w-1/4 bg-[#379777] px-5 py-10 flex flex-col">
        <div class="flex items-center justify-center gap-2 flex-wrap">
          <h2 class='text-3xl font-black text-white'>TomatoTime  </h2>
        </div>

        <nav class="mt-10 flex-grow">
          <RouterLink
            class="text-white text-2xl block mt-2 hover:text-[#D6F0E5]"
            :to="{ name: ROUTES.TODAY_TASK }"
          >
            Hoy
          </RouterLink>
          
          <RouterLink
            class="text-white text-2xl block mt-2 hover:text-[#D6F0E5]"
            :to="{ name: ROUTES.TOMORROW_TASK }"
          >
            Mañana
          </RouterLink>
          
          <RouterLink
            class="text-white text-2xl block mt-2 hover:text-[#D6F0E5]"
            :to="{ name: ROUTES.WEEK_TASK }"
          >
            Esta semana
          </RouterLink>
          
          <RouterLink
            class="text-white text-2xl block mt-2 hover:text-[#D6F0E5]"
            :to="{ name: ROUTES.TOMORROW_TASK }"
          >
            Completadas
          </RouterLink>
        </nav>

        <nav>
          <RouterLink
            class="text-white text-2xl block mt-2 hover:text-[#D6F0E5]"
            :to="{ name: ROUTES.CONFIGURATION }"
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
