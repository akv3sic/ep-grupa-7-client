import { createRouter, createWebHistory } from 'vue-router'
import OfficeHomeView from '../views/office/OfficeHomeView.vue'
import OfficeRootView from '../views/office/OfficeRootView.vue'
import Home from '../views/Home.vue'
import { useAuthStore } from '@/stores/auth';

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
      redirect: { name: 'employees' },
      component: OfficeRootView,
      meta: {
        requiresAuth: true,
        requiresSuperuser: true,
      },
      children: [
        {
          path: 'pregled',
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
      redirect: { name: 'work-center-terminal-work-orders' },
      component: () => import('@/views/workCenterTerminal/WorkCenterTerminalRootView.vue'),
      meta: {
        requiresAuth: true,
        requiresSuperuser: false,
      },
      children: [
        {
          path: 'pregled',
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
    // non authorized
    {
      path: '/pristup-zabranjen',
      name: 'forbidden',
      component: () => import('@/views/NotAuthorizedView.vue'),
      meta: {
        title: 'Pristup zabranjen'
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

router.beforeEach((to, from, next) => {
  // set page title
  to.meta.title ? document.title = `${to.meta.title} - WorkOrders+` : document.title = 'WorkOrders+';

  const isAuthenticatedFromLocalStorage = localStorage.getItem('isAuthenticated') === 'true';
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user') || 'null');

  // check if route requires auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isAuthenticatedFromLocalStorage) {
          next({
              name: 'login',
              query: { redirect: to.fullPath }
          });
          return;
      }
  }

  // check if route requires superuser
  if (to.matched.some(record => record.meta.requiresSuperuser)) {
      if (!userFromLocalStorage?.is_superuser || !userFromLocalStorage) {
          next({ name: 'forbidden' });
          return;
      }
  }

  next();
});



export default router
