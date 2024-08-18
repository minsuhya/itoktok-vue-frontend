import axios from 'axios'
import type { Pagination } from '@/types/global'
import type { TeacherRecord, TeacherQuery, TeacherListRes } from './type'
export type { TeacherRecord, TeacherQuery, TeacherListRes }

export function queryTeacherList(params: TeacherQuery & Pagination) {
  return axios.get<TeacherListRes>('/teachers', {
    params
  })
}
