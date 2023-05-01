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
      component: () => import('@/views/employees/EmployeesListView.vue'),
      meta: {
        title: 'Zaposlenici'
      }
    },
    {
      path: '/radna-mjesta',
      name: 'workplaces',
      component: WorkPlacesListViewVue,
      meta: {
        title: 'Radna mjesta'
      }
    },
  ]
})

// dynamically set application title
router.beforeEach((to, from) => {
  to.meta.title ? document.title = `${to.meta.title} - WorkOrders+` : document.title = 'WorkOrders+'
})

export default router
