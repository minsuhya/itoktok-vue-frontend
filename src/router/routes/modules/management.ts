import { ViewNames } from '@/types/constants'

export default {
  path: '/management',
  name: ViewNames.management,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.management',
    requiresAuth: true,
    icon: 'icon-calendar',
    roles: ['*']
  },
  children: [
    {
      path: 'management-user',
      name: ViewNames.manageUser,
      component: () => import('@/views/list/search-table/index'),
      meta: {
        locale: 'menu.management.manageUser',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'management-consulting',
      name: ViewNames.scheduleMe,
      component: () => import('@/views/list/card-list/index'),
      meta: {
        locale: 'menu.management.consulting',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}
