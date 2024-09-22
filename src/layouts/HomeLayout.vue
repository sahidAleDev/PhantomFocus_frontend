<script setup lang="ts">

import { RouterLink } from 'vue-router';
import { ROUTES } from '@/router/names';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import useService from '@/services';
/**
 * ------------------------------------------
 *	Components
 * ------------------------------------------
 */
import UserCircleIcon from '@/components/icons/UserCircleIcon.vue';
import ArrowRightBracket from '@/components/icons/ArrowRightBracket.vue';

/**
 * ------------------------------------------
 *	Utils
 * ------------------------------------------
 */
const $user = useUserStore()
const $router = useRouter()
const $service  = useService()

/**
 * ------------------------------------------
 *	Methods
 * ------------------------------------------
 */

/**
 * handleLogout
 */
const handleLogout = async () => {
  try {
    await $service.logout()
    $user.logout()
    $router.push({ name: ROUTES.LOGIN })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <AlertNotification />
  
  <aside class="px-10 py-10">
      <section class="flex justify-between items-center gap-4 mb-20">
        <div class="flex items-center gap-2 text-white">
          <ArrowRightBracket @click="handleLogout" class="size-4 lg:size-6 text-white cursor-pointer rotate-180" />
          <p class="text-lg lg:text-2xl">Cerrar Sesión</p> 
        </div>
        <div class="flex items-center gap-2 text-white">
          <UserCircleIcon class="size-4 lg:size-6" />
          <p class="text-lg lg:text-2xl">{{ $user.getUser?.username.toUpperCase() }}</p>
        </div>
      </section>

      <div class="flex flex-col lg:flex-row justify-center items-center gap-4">
        <figure class="block lg:hidden  w-20">
          <img class="w-full img-logo" src="/phantom.png" alt="">
        </figure>
        <h2 class='text-center text-3xl font-black text-white'>PhantomFocus</h2>
        <figure class="hidden lg:block  w-20">
          <img class="w-full img-logo" src="/phantom.png" alt="">
        </figure>
      </div>

      <nav class="mt-10 w-2/3 lg:w-1/3 mx-auto gap-x-12 gap-y-4 pb-4 text-white flex flex-wrap justify-center items-cente border border-l-0 border-t-0 border-r-0 border-b">
        <RouterLink
          class="text-white text-2xl block hover:text-[#FCCED6]"
          :to="{ name: ROUTES.POMODORO_SESSIONS }"
        >
          Sesiones
        </RouterLink>
        
        <RouterLink
          class="text-white text-2xl block hover:text-[#FCCED6]"
          :to="{ name: ROUTES.COMPLETED_SESSIONS }"
        >
          Completadas
        </RouterLink>

        <RouterLink
          class="text-white text-2xl block hover:text-[#FCCED6]"
          :to="{ name: ROUTES.CONFIGURATION }"
        >
          Configuraciones
        </RouterLink>
      </nav>
  </aside>

  <main class="h-full w-2/3 mx-auto py-10">
    <RouterView/>
  </main>
</template>
