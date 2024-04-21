import { ViewNames } from '@/types/constants'

export default {
  path: '/admin',
  name: ViewNames.admin,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.admin',
    requiresAuth: true,
    icon: 'icon-calendar',
    roles: ['*']
  },
  children: [
    {
      path: 'admin-teacher',
      name: ViewNames.adminTeacher,
      // component: () => import('@/views/list/search-table/index'),
      component: () => import('@/views/admin/teachers/index'),
      meta: {
        locale: 'menu.admin.teacher',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'admin-program',
      name: ViewNames.adminProgram,
      component: () => import('@/views/list/card-list/index'),
      meta: {
        locale: 'menu.admin.program',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'admin-voucher',
      name: ViewNames.adminVoucher,
      component: () => import('@/views/list/card-list/index'),
      meta: {
        locale: 'menu.admin.voucher',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}
