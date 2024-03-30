import { ViewNames } from '@/types/constants'

export default {
  path: '/schedule',
  name: ViewNames.schedule,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.schedule',
    requiresAuth: true,
    icon: 'icon-calendar',
    roles: ['*']
  },
  children: [
    {
      path: 'schedule-all',
      name: ViewNames.scheduleAll,
      component: () => import('@/views/list/search-table/index'),
      meta: {
        locale: 'menu.schedule.scheduleAll',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'schedule-me',
      name: ViewNames.scheduleMe,
      component: () => import('@/views/list/card-list/index'),
      meta: {
        locale: 'menu.schedule.scheduleMe',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}
