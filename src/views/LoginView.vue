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
  <div class="min-h-screen">
    <section class="bg-[#FFEAEA]">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-[#D10D44]">
          <img class="size-20 mr-2" src="/login-logo.png" alt="logo">
          TomateTime
        </a>

        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Acceda a su cuenta
            </h1>
            <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit">
              <div>
                <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu username</label>
                <input 
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="password" 
                  name="password" 
                  placeholder="••••••••"
                  required
                  type="password" 
                  v-model="user.password"
                />
              </div>

              <button 
                type="submit"
                class="w-full py-2 text-white bg-[#F23D5E]"
              >
                Iniciar sesión
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿No tienes una cuenta?
                <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrate</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
