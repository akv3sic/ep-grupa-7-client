import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/office/HomeView.vue'

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
      component: () => import('@/views/office/employees/EmployeesListView.vue'),
      meta: {
        title: 'Zaposlenici'
      }
    },
    {
      path: '/radna-mjesta',
      name: 'workplaces',
      component: () => import('@/views/office/workplaces/WorkPlacesListView.vue'),
      meta: {
        title: 'Radna mjesta'
      }
    },
    {
      path: '/odjeli',
      name: 'departments',
      component: () => import('@/views/office/departments/DepartmentsListView.vue'),
      meta: {
        title: 'Odjeli'
      }
    },
    {
      path: '/radni-centri',
      name: 'workCenters',
      component: () => import('@/views/office/workCenters/WorkCentersListView.vue'),
      meta: {
        title: 'Radni centri'
      }
    },
    {
      path: '/radni-nalozi',
      name: 'workOrders',
      component: () => import('@/views/office/workOrders/WorkOrdersListView.vue'),
      meta: {
        title: 'Radni nalozi'
      }
    },
    {
      path: '/kvarovi',
      name: 'failures',
      component: () => import('@/views/office/failures/FailuresListView.vue'),
      meta: {
        title: 'Kvarovi'
      }
    },
    {
      path: '/postavke',
      name: 'settings',
      component: () => import('@/views/office/SettingsView.vue'),
      meta: {
        title: 'Postavke'
      }
    },
    // catch all 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        title: '404'
      }
    }
  ]
})

// dynamically set application title
router.beforeEach((to, from) => {
  to.meta.title ? document.title = `${to.meta.title} - WorkOrders+` : document.title = 'WorkOrders+'
})

export default router
