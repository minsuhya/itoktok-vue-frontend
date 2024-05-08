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
      component: () => import('@/views/board/center/index'),
      meta: {
        locale: 'menu.board.centerBoard',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'custom-board',
      name: ViewNames.customBoard,
      component: () => import('@/views/board/custom/index'),
      meta: {
        locale: 'menu.board.customBoard',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}
