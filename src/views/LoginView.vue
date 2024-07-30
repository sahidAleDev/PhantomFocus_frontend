<script setup lang="ts">
import { ref } from 'vue';
import { ROUTES } from '@/router/names'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import type { User } from '@/types/index';
import useServices from '@/services';

const $router = useRouter();
const $service = useServices()
const $user = useUserStore()

const user = ref<User>({
  username: '',
  password: '',
});

const handleSubmit = async () => {
  try {
    const { data } = await $service.login(user.value);
    $user.setUser(data.user);
    $router.push({ name: ROUTES.HOME });
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="w-1/4 min-w-80 space-y-4">
      <figure class="w-40 mx-auto">
        <img class="w-full img-logo" src="/phantom.png" alt="">
      </figure>

      <h2 class='text-center text-3xl font-black text-white'>PhantomFocus</h2>

      <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
          <input
            class="input input-medium"
            id="username" 
            name="username" 
            placeholder="Citlali22" 
            required 
            type="text" 
            v-model="user.username" 
          />
        </div>

        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
          <input
            class="input input-medium"
            id="password" 
            name="password" 
            placeholder="••••••••"
            required type="password" 
            v-model="user.password" 
          />
        </div>

        <button type="submit" class="btn-secondary btn-medium w-full">
          Iniciar sesión
        </button>
      </form>
    </div>
  </div>
</template>