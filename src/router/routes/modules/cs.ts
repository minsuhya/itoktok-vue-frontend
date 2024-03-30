import { ViewNames } from '@/types/constants'

export default {
  path: '/cs',
  name: ViewNames.cs,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.cs',
    requiresAuth: true,
    icon: 'icon-calendar',
    roles: ['*']
  },
  children: [
    {
      path: 'cs-faq',
      name: ViewNames.csFaq,
      component: () => import('@/views/list/search-table/index'),
      meta: {
        locale: 'menu.cs.faq',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'cs-qna',
      name: ViewNames.csQna,
      component: () => import('@/views/list/card-list/index'),
      meta: {
        locale: 'menu.cs.qna',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}
