import Mock from 'mockjs'
import { isLogin } from '@/utils/token'
import setupMock, { successResponseWrap, failResponseWrap } from '@/mock/setupMock'
import type { GetParams } from '@/types/global'
import { ResCode } from '@/types/constants'
setupMock({
  setup() {
    // 사용자 정보
    Mock.mock(new RegExp('/api/user/info'), () => {
      if (isLogin()) {
        const role = window.localStorage.getItem('data-base-role') || 'admin'
        return successResponseWrap({
          name: '루피',
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/54520846%20(1).jpg',
          email: '1486498123@email.com',
          job: 'frontend',
          jobName: '개발자',
          organization: 'Frontend',
          organizationName: '개발팀',
          location: 'Gyeonggi-do Gwangju',
          locationName: '경기도 광주',
          introduction: '루피는 원피스의 주인공이다. 루피는 미래의 해적왕이 되기 위해 모험을 떠나는 소년이다. 루피는 미래의 해적왕이 되기 위해 모험을 떠나는 소년이다. 루피는 미래의 해적왕이 되기 위해 모험을 떠나는 소년이다. 루피는 미래의 해적왕이 되기 위해 모험을 떠나는 소년이다. 루피는 미래의 해적왕이 되기 위해 모험을 떠나는 소년이다. 루피는 미래의 해적왕이 되기 위해 모험을 떠나는 소년이다. 루피는 미래의 해적왕이 되기 위해 모험을 떠나는 소년이다. 루피는 미래의 해적왕이 되기 위해 모험을 떠나는 소년이다. 루피는 미래의 해적왕이 되기 위해 모험을 떠나는 소년이다.',
          personalWebsite: 'https://www.arco.design',
          phone: '150****0000',
          registrationDate: '2013-05-10 12:10:00',
          accountId: '15012312300',
          certification: 1,
          role
        })
      }
      return failResponseWrap(null, '로그인 후 사용하세요.', ResCode.illegalToken)
    })

    // 로그인
    Mock.mock(new RegExp('/api/user/login'), (params: GetParams) => {
      const { username, password } = JSON.parse(params.body)
      if (!username) {
        return failResponseWrap(null, '로그인 아이디를 입력하세요.', ResCode.error)
      }
      if (!password) {
        return failResponseWrap(null, '비밀번호를 입력하세요.', ResCode.error)
      }
      if (username === 'rupi' && password === 'rupi@@1234') {
        window.localStorage.setItem('data-base-role', 'admin')
        return successResponseWrap({
          token: '12345'
        })
      }
      if (username === 'monkey' && password === 'monkey@@1234') {
        window.localStorage.setItem('data-base-role', 'user')
        return successResponseWrap({
          token: '54321'
        })
      }
      return failResponseWrap(null, '사용자정보를 확인하세요.', ResCode.error)
    })

    // 로그아웃
    Mock.mock(new RegExp('/api/user/logout'), () => {
      return successResponseWrap(null)
    })

    // 최신 프로젝트
    Mock.mock(new RegExp('/api/user/my-project/list'), () => {
      const contributors = [
        {
          name: '안나',
          email: 'qingzhenyu@arco.design',
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar3.webp'
        },
        {
          name: '조로',
          email: 'yuebao@arco.design',
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar3.webp'
        },
        {
          name: '루피',
          email: 'ningbo@arco.design',
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar2.webp'
        },
        {
          name: '상디',
          email: 'zhengxiyue@arco.design',
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar1.webp'
        },
        {
          name: '몬스터',
          email: 'ningbo@arco.design',
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar2.webp'
        }
      ]
      const units = [
        {
          name: '클루커스',
          description: 'Arco Design System'
        },
        {
          name: '엠몬스타',
          description: 'The Volcano Engine'
        },
        {
          name: 'OCR 이지위너',
          description: 'OCR text recognition'
        },
        {
          name: '샵링커',
          description: 'Content resource management '
        },
        {
          name: '헬스케어',
          description: 'Toutiao content management'
        },
        {
          name: '토마토 로봇',
          description: 'Intelligent Robot Project'
        }
      ]
      return successResponseWrap(
        new Array(6).fill(null).map((_item, index) => ({
          id: index,
          name: units[index].name,
          description: units[index].description,
          peopleNumber: Mock.Random.natural(10, 1000),
          contributors
        }))
      )
    })

    // 최근뉴스
    Mock.mock(new RegExp('/api/user/latest-activity'), () => {
      return successResponseWrap(
        new Array(7).fill(null).map((_item, index) => ({
          id: index,
          title: 'Arco Design System',
          description: 'Arco Design System is a design language and a set of accessible, high quality design resources. It helps designers and developers work together more efficiently and consistently, building and maintaining a design system.',
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar3.webp'
        }))
      )
    })

    // 방문자
    Mock.mock(new RegExp('/api/user/visits'), () => {
      return successResponseWrap([
        {
          name: '베트멘',
          visits: 5670,
          growth: 206.32
        },
        {
          name: '원더우먼',
          visits: 5670,
          growth: 206.32
        }
      ])
    })

    // 프로젝트 및 팀 목록
    Mock.mock(new RegExp('/api/user/project-and-team/list'), () => {
      return successResponseWrap([
        {
          id: 1,
          content: '그가 만든 프로젝트'
        },
        {
          id: 2,
          content: '그가 참여한 프로젝트'
        },
        {
          id: 3,
          content: '그가 만든 팀'
        },
        {
          id: 4,
          content: '그가 참여한 팀'
        }
      ])
    })
    // 팀목록
    Mock.mock(new RegExp('/api/user/my-team/list'), () => {
      return successResponseWrap([
        {
          id: 1,
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar3.webp',
          name: '화산 엔진 지능형 응용 팀',
          peopleNumber: Mock.Random.natural(10, 100)
        },
        {
          id: 2,
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar2.webp',
          name: '기업급 제품 디자인 팀',
          peopleNumber: Mock.Random.natural(5000, 6000)
        },
        {
          id: 3,
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar2.webp',
          name: '프론트엔드/UE 소분대',
          peopleNumber: Mock.Random.natural(10, 5000)
        },
        {
          id: 4,
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar1.webp',
          name: '콘텐츠 인식 플러그인 소분대',
          peopleNumber: Mock.Random.natural(10, 100)
        }
      ])
    })
    Mock.mock(new RegExp('/api/user/certification'), () => {
      return successResponseWrap({
        enterpriseInfo: {
          accountType: '기업계정',
          status: 0,
          time: '2018-10-22 14:53:12',
          legalPerson: '이**',
          certificateType: '신분증',
          authenticationNumber: '130************123',
          enterpriseName: '실력있는 기업',
          enterpriseCertificateType: '기업 사업등록증',
          organizationCode: '7*******9'
        },
        record: [
          {
            certificationType: 1,
            certificationContent: '기업 실명 인증, 법인 이름: 이**',
            status: 0,
            time: '2021-02-28 10:30:50'
          },
          {
            certificationType: 1,
            certificationContent: '기업 실명 인증, 법인 이름: 이**',
            status: 1,
            time: '2020-05-13 08:00:00'
          }
        ]
      })
    })

    Mock.mock(new RegExp('/api/user/upload'), () => {
      return successResponseWrap('ok')
    })

    Mock.mock(new RegExp('/api/user/save-info'), () => {
      return successResponseWrap('ok')
    })

    Mock.mock(new RegExp('/api/user/switch-user-role'), () => {
      const role = window.localStorage.getItem('data-base-role') || 'admin'
      const roleValue = role === 'admin' ? 'user' : 'admin'
      window.localStorage.setItem('data-base-role', roleValue)
      return successResponseWrap({
        role: roleValue
      })
    })
  }
})
