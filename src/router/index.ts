import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '@/layouts/HomeLayout.vue'
import { ROUTES } from './names'
import useServices from '@/services'

const $service = useServices()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTES.HOME,
      meta: { requiresAuth: true },
      component: HomeLayout,
      children: [
        {
          path: '',
          name: ROUTES.POMODORO_SESSIONS,
          component: () => import('@/views/PomodoroSessions.vue')
        },
        {
          path: 'completadas',
          name: ROUTES.COMPLETED_SESSIONS,
          component: () => import('@/views/CompletedSessions.vue')
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

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    try {
      // Llamada a la ruta de validación
      await $service.validateToken();
      next();
    } catch (error) {
      next({ name: ROUTES.LOGIN });
    }
  } else {
    next();
  }
});

export default router
