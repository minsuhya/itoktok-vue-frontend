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
      component: () => import('@/views/management/user/index'),
      meta: {
        locale: 'menu.management.manageUser',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'management-consulting',
      name: ViewNames.scheduleMe,
      component: () => import('@/views/management/consulting/index'),
      meta: {
        locale: 'menu.management.consulting',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}
