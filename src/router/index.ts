import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WorkPlacesListViewVue from '@/views/workplaces/WorkPlacesListView.vue'

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
    {
      path: '/radna-mjesta',
      name: 'workplaces',
      component: WorkPlacesListViewVue
    },
  ]
})

export default router
