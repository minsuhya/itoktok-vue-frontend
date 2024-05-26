export type TeacherRecord = {
  id: string
  number: number
  name: string
  important?: boolean
  contentType: string
  creater: string
  content: string
  expiredTime: string
  createdTime: string
}

export type BoardQuery = {
  title: string
  contentType: string
}

export type BoardParams = {
  current: number
  pageSize: number
} & Partial<BoardRecord>

export type BoardListRes = {
  list: BoardRecord[]
  total: number
}
