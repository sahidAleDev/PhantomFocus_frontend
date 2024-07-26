import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'

const STORE_NAME = 'user'

export const useUserStore = defineStore(STORE_NAME, () => {
  const LOCAL_STORAGE_KEY = 'user'

  const user = ref<User | null>(null)

  // GETTERS
  const getUser = computed(() => user.value)

  // SETTERS
  const setUser = (newUser: User) => {
    user.value = newUser
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser))
  }

  // METHODS
  const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  // Llamar a la función para cargar el usuario al iniciar el store
  loadUserFromLocalStorage()

  watch(user, (newUser) => {
    if (newUser) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser))
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    }
  })

  return { 
    getUser,
    user,

    logout,
    setUser,
  }
})
