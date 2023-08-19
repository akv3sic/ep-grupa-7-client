import { createRouter, createWebHistory } from 'vue-router'
import OfficeHomeView from '../views/office/OfficeHomeView.vue'
import OfficeRootView from '../views/office/OfficeRootView.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/prijava',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/office',
      name: 'office',
      component: OfficeRootView,
      children: [
        {
          path: '',
          name: 'office-home',
          component: OfficeHomeView,
          meta: {
            title: 'Pregled'
          }
        },
        {
          path: 'zaposlenici',
          name: 'employees',
          component: () => import('@/views/office/employees/EmployeesListView.vue'),
          meta: {
            title: 'Zaposlenici'
          }
        },
        {
          path: 'dodaj-zaposlenika',
          name: 'add-employee',
          component: () => import('@/views/office/employees/AddNewEmployeeView.vue'),
          meta: {
            title: 'Dodaj zaposlenika'
          }
        },
        {
          path: 'radna-mjesta',
          name: 'workplaces',
          component: () => import('@/views/office/workplaces/WorkPlacesListView.vue'),
          meta: {
            title: 'Radna mjesta'
          }
        },
        {
          path: 'odjeli',
          name: 'departments',
          component: () => import('@/views/office/departments/DepartmentsListView.vue'),
          meta: {
            title: 'Odjeli'
          }
        },
        {
          path: 'radni-centri',
          name: 'workCenters',
          component: () => import('@/views/office/workCenters/WorkCentersListView.vue'),
          meta: {
            title: 'Radni centri'
          }
        },
        {
          path: 'radni-nalozi',
          name: 'workOrders',
          component: () => import('@/views/office/workOrders/WorkOrdersListView.vue'),
          meta: {
            title: 'Radni nalozi'
          },
        },
        {
          path: 'dodaj-radni-nalog',
          name: 'add-work-order',
          component: () => import('@/views/office/workOrders/AddWorkOrderView.vue'),
          meta: {
            title: 'Dodaj radni nalog'
          }
        },
        {
          path: 'kvarovi',
          name: 'failures',
          component: () => import('@/views/office/failures/FailuresListView.vue'),
          meta: {
            title: 'Kvarovi'
          }
        },
        {
          path: 'postavke',
          name: 'settings',
          component: () => import('@/views/office/SettingsView.vue'),
          meta: {
            title: 'Postavke'
          }
        },
      ]
    },
    {
      path: '/work-center-terminal',
      name: 'work-center-terminal',
      component: () => import('@/views/workCenterTerminal/WorkCenterTerminalRootView.vue'),
      meta: {
        title: 'Pregled'
      },
      children: [
        {
          path: '',
          name: 'work-center-terminal-home',
          component: () => import('@/views/workCenterTerminal/WorkCenterTerminalHomeView.vue'),
          meta: {
            title: 'Pregled'
          }
        },
        {
          path: 'radni-nalozi',
          name: 'work-center-terminal-work-orders',
          component: () => import('@/views/office/workOrders/WorkOrdersListView.vue'),
          meta: {
            title: 'Radni nalozi'
          }
        },
        {
          path: 'prijava-kvara',
          name: 'work-center-terminal-failure-report',
          component: () => import('@/views/workCenterTerminal/ReportFailureView.vue'),
        }
      ]

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
