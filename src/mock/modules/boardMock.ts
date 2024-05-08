import Mock from 'mockjs'
import setupMock, { successResponseWrap } from '@/mock/setupMock'
// import { type BoardRecord } from '@/api/board'

import qs from 'query-string'
import { type GetParams } from '@/types/global'
const { Random } = Mock

const data = Mock.mock({
  'list|55': [
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
      'number|+1': 1,
      'title|10-50': /[A-Z]/,
      'important|1': ['High', 'Midium', 'Low'],
      'contentType|1': ['img', 'horizontalVideo', 'verticalVideo'],
      'creater|8': /[A-Z]/,
      'content|100-255': /[A-Z][a-z][0-9]/,
      expiredTime: Random.datetime(),
      createdTime: Random.datetime()
    }
  ]
})

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/board'), (params: GetParams) => {
      const { current = 1, pageSize = 10 } = qs.parseUrl(params.url).query
      const p = current as number
      const ps = pageSize as number
      return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 55
      })
    })
  }
})
