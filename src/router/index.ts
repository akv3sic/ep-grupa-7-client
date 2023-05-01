import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/zaposlenici',
      name: 'employees',
      component: () => import('@/views/employees/EmployeesListView.vue')
    },
  ]
})

export default router
