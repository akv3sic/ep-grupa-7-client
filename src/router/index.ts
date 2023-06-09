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
      component: () => import('@/views/employees/EmployeesListView.vue'),
      meta: {
        title: 'Zaposlenici'
      }
    },
    {
      path: '/radna-mjesta',
      name: 'workplaces',
      component: () => import('@/views/workplaces/WorkplacesListView.vue'),
      meta: {
        title: 'Radna mjesta'
      }
    },
    {
      path: '/odjeli',
      name: 'departments',
      component: () => import('@/views/departments/DepartmentsListView.vue'),
      meta: {
        title: 'Odjeli'
      }
    },
    {
      path: '/radni-centri',
      name: 'workCenters',
      component: () => import('@/views/workCenters/WorkCentersListView.vue'),
      meta: {
        title: 'Radni centri'
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
