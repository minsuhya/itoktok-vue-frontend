import axios from 'axios'
import type { Pagination } from '@/types/global'
import type { BoardRecord, BoardQuery, BoardListRes } from './type'
export type { BoardRecord, BoardQuery, BoardListRes }

export function queryBoardList(params: BoardQuery & Pagination) {
  return axios.get<BoardListRes>('/api/board', {
    params
  })
}
