<script setup lang="ts">

/**
 * ------------------------------------------
 *	Utils
 * ------------------------------------------
 */

interface Emits {
  (event: 'action:not-save'): void
  (event: 'action:save-and-exit'): void
  
}
const $emits = defineEmits<Emits>()


</script>

<template>
  <article id="container_popup" class="fixed z-20 flex justify-center items-center h-screen w-full top-0 left-0 right-0 bottom-0 px-4 bg-black/40">
    <section id="popup" class="w-full sm:max-w-sm bg-white rounded-2xl popUp_fadeIn p-4 space-y-4">
      <p class="font-semibold text-lg sm:text-xl ">¿Deseas guardar tu progreso antes de salir?</p>


      <div class="flex gap-4">
        <button @click="$emits('action:not-save')" class="btn-primary-outline btn-small w-full">Salir sin guardar</button>
        <button @click="$emits('action:save-and-exit')" class="btn-primary btn-small w-full">Guardar</button>
      </div>
    </section>
  </article>
</template>