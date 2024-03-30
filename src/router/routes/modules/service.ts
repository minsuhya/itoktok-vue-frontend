import { ViewNames } from '@/types/constants'

export default {
  path: '/service',
  name: ViewNames.service,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.service',
    requiresAuth: true,
    icon: 'icon-calendar',
    roles: ['*']
  },
  children: [
    {
      path: 'service-month',
      name: ViewNames.serviceMonth,
      component: () => import('@/views/list/search-table/index'),
      meta: {
        locale: 'menu.service.serviceMonth',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'service-daily',
      name: ViewNames.serviceDaily,
      component: () => import('@/views/list/card-list/index'),
      meta: {
        locale: 'menu.service.serviceDaily',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'service-voucher',
      name: ViewNames.serviceVoucher,
      component: () => import('@/views/list/card-list/index'),
      meta: {
        locale: 'menu.service.serviceVoucher',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}
