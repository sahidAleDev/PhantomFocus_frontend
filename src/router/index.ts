import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '@/layouts/HomeLayout.vue'
import { ROUTES } from './names'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeLayout,
      children: [
        {
          path: 'tareas-hoy',
          name: ROUTES.TODAY_TASK,
          component: () => import('@/views/TodayPomodoros.vue')

        },
        {
          path: 'tareas-mañana',
          name: ROUTES.TOMORROW_TASK,
          component: () => import('@/views/TomorrowPomodoros.vue')

        },
        {
          path: 'tareas-semana',
          name: ROUTES.WEEK_TASK,
          component: () => import('@/views/WeekPomodoros.vue')

        },
        {
          path: 'configuracion',
          name: ROUTES.CONFIGURATION,
          component: () => import('@/views/ConfigurationView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: ROUTES.LOGIN,
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

export default router
