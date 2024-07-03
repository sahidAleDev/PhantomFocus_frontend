import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '@/layouts/HomeLayout.vue'

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
          name: 'today-task',
          component: () => import('@/views/TodayPomodoros.vue')

        },
        {
          path: 'tareas-mañana',
          name: 'tomorrow-task',
          component: () => import('@/views/TomorrowPomodoros.vue')

        },
        {
          path: 'tareas-semana',
          name: 'week-task',
          component: () => import('@/views/WeekPomodoros.vue')

        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/layouts/HomeLayout.vue')
    }
  ]
})

export default router
