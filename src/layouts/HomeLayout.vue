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
  <div class="md:min-h-screen md:flex">
    <aside class="md:w-1/4 bg-[#379777] px-5 py-10 flex flex-col">
        <div class="flex items-center justify-center gap-2 flex-wrap">
          <h2 class='text-3xl font-black text-white'>TomatoTime  </h2>
        </div>

        <nav class="mt-10 md:flex-grow space-y-2">
          <RouterLink
            class="text-white text-2xl block hover:text-[#D6F0E5]"
            :to="{ name: ROUTES.TODAY_TASK }"
          >
            Hoy
          </RouterLink>
          
          <RouterLink
            class="text-white text-2xl block hover:text-[#D6F0E5]"
            :to="{ name: ROUTES.TOMORROW_TASK }"
          >
            Completadas
          </RouterLink>

          <RouterLink
            class="text-white text-2xl block hover:text-[#D6F0E5]"
            :to="{ name: ROUTES.CONFIGURATION }"
          >
            Configuraciones
          </RouterLink>
        </nav>

        <section class="flex justify-between items-center mt-2">
          <div class="flex items-center gap-1 text-white">
            <UserCircleIcon class="size-5" />
            <p class="text-2xl">{{ $user.getUser?.username }}</p>
          </div>

          <ArrowRightBracket @click="handleLogout" class="size-6 text-white cursor-pointer" />
        </section>

    </aside>

    <main class="md:w-3/4 p-10 md:h-screen">
      <RouterView/>
    </main>
  </div>
</template>
