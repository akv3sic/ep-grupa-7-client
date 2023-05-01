import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WorkplacesListViewVue from '@/views/workplaces/WorkPlacesListView.vue'

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
      component: WorkplacesListViewVue,
      meta: {
        title: 'Radna mjesta'
      }
    },
    {
      path: '/radni-centri',
      name: 'workCenters',
      component: () => import('@/views/workcenters/WorkCentersListView.vue'),
      meta: {
        title: 'Radni centri'
      }
    },
  ]
})

// dynamically set application title
router.beforeEach((to, from) => {
  to.meta.title ? document.title = `${to.meta.title} - WorkOrders+` : document.title = 'WorkOrders+'
})

export default router
