import { ViewNames } from '@/types/constants'

export default {
  path: '/board',
  name: ViewNames.board,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.board',
    requiresAuth: true,
    icon: 'icon-list'
  },
  children: [
    {
      path: 'center-notice',
      name: ViewNames.centerBoard,
      component: () => import('@/views/list/search-table/index'),
      meta: {
        locale: 'menu.board.centerBoard',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'card',
      name: ViewNames.customBoard,
      component: () => import('@/views/list/card-list/index'),
      meta: {
        locale: 'menu.board.customBoard',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}
