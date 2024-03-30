import Mock from 'mockjs'
import dayjs from 'dayjs'

import qs from 'query-string'
import setupMock, { successResponseWrap } from '@/mock/setupMock'
import type { GetParams } from '@/types/global'
const textList = [
  {
    // 중국어를 한국어로 번역해줘.
    key: 1,
    clickNumber: '346.3w+',
    title: '경제일보: 재정정책은 정확하게 개선되어야 합니다.',
    increases: 35
  },
  {
    key: 2,
    clickNumber: '324.2w+',
    title: '더블 12가 식상해졌다, 소비자들은 전자 상거래 플랫폼을 싫어합니다.',
    increases: 22
  },
  {
    key: 3,
    clickNumber: '318.9w+',
    title: '코로나19 전선에서 굳게 지키고 있는 지역 사회 노동자들에게 경의를 표합니다.',
    increases: 9
  },
  {
    key: 4,
    clickNumber: '257.9w+',
    title: '고등학교인가 직업 고등학교인가? 부모님들은 선택에 빠져들고 있습니다.',
    increases: 17
  },
  {
    key: 5,
    clickNumber: '124.2w+',
    title: '인민일보: "두피가 두꺼운"이라고 생각하지 않았습니다.',
    increases: 37
  }
]
const imageList = [
  {
    key: 1,
    clickNumber: '15.3w+',
    title: '양타오가 루강을 대신하여 외교부 미국 대사관을 맡았습니다.',
    increases: 15
  },
  {
    key: 2,
    clickNumber: '12.2w+',
    title: '사진집: 토네이도가 미국 여러 주를 공격하여 집을 파괴했습니다.',
    increases: 26
  },
  {
    key: 3,
    clickNumber: '18.9w+',
    title: '52세 누나가 돈을 내어 자폐증 아동을 돌보다가 8년간 무급으로 일했습니다.',
    increases: 9
  },
  {
    key: 4,
    clickNumber: '7.9w+',
    title: '杭州의 한 가족이 공원에서 캠핑하다가 중독됨',
    increases: 0
  },
  {
    key: 5,
    clickNumber: '5.2w+',
    title: '파출소 부소장이 시민들을 위협했나요? 경찰이 조사합니다.',
    increases: 4
  }
]
const videoList = [
  {
    key: 1,
    clickNumber: '367.6w+',
    title: '이것은 오늘 아침 10시의 난징입니다.',
    increases: 5
  },
  {
    key: 2,
    clickNumber: '352.2w+',
    title: '리투아니아는 계속 도발하여 경제적 피해를 입은 국민들...',
    increases: 17
  },
  {
    key: 3,
    clickNumber: '348.9w+',
    title: '한국 연예인 유재석이 코로나19 확진',
    increases: 30
  },
  {
    key: 4,
    clickNumber: '346.3w+',
    title: '평창 동계 올림픽에 대해 문재인이 입장을 밝혔다.',
    increases: 12
  },
  {
    key: 5,
    clickNumber: '271.2w+',
    title: '95세 현역 군인이 1등 공로를 얻다',
    increases: 2
  }
]
setupMock({
  setup() {
    Mock.mock(new RegExp('/api/content-data'), () => {
      const presetData = [58, 81, 53, 90, 64, 88, 49, 79]
      const getLineData = () => {
        const count = 8
        return new Array(count).fill(0).map((el, idx) => ({
          x: dayjs()
            .day(idx - 2)
            .format('YYYY-MM-DD'),
          y: presetData[idx]
        }))
      }
      return successResponseWrap([...getLineData()])
    })
    Mock.mock(new RegExp('/api/popular/list'), (params: GetParams) => {
      const { type = 'text' } = qs.parseUrl(params.url).query
      if (type === 'image') {
        return successResponseWrap([...videoList])
      }
      if (type === 'video') {
        return successResponseWrap([...imageList])
      }
      return successResponseWrap([...textList])
    })

    Mock.mock(new RegExp('/api/chat/list'), () => {
      const data = Mock.mock({
        'data|4-6': [
          {
            'id|+1': 1,
            username: '사용자7352772',
            content: '곧 시작됩니다. 너무 흥분되네요!',
            time: '13:09:12',
            'isCollect|2': true
          }
        ]
      })
      return successResponseWrap(data.data)
    })
  }
})
