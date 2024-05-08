import axios from 'axios'
import type {
  LatestActivity,
  LoginData,
  LoginRes,
  ProjectItem,
  TeamItem,
  UnitCertification,
  UserInfo,
  BasicInfoModel,
  RoleRes,
  UserListRes,
  UserListQuery
} from './type'
import type { Pagination, OKResponse } from '@/types/global'

export type {
  UserInfo,
  LatestActivity,
  LoginData,
  LoginRes,
  ProjectItem,
  TeamItem,
  UnitCertification,
  BasicInfoModel,
  UserListRes,
  UserListQuery
}

export function queryUserList(params: UserListQuery & Pagination) {
  return axios.get<UserListRes>('/api/user/list', {
    params
  })
}

export function getUserInfo() {
  return axios.post<UserInfo>('/api/user/info')
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data)
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout')
}

export function userUploadApi(data: FormData) {
  return axios.post<OKResponse>('/api/user/upload', data)
}

export function queryMyProjectList() {
  return axios.post<ProjectItem[]>('/api/user/my-project/list')
}
export function queryMyTeamList() {
  return axios.post<TeamItem[]>('/api/user/my-team/list')
}

export function queryLatestActivity() {
  return axios.post<LatestActivity[]>('/api/user/latest-activity')
}

export function saveUserInfo() {
  return axios.post<OKResponse>('/api/user/save-info')
}

export function queryCertification() {
  return axios.post<UnitCertification>('/api/user/certification')
}

export function requestSwitchRole() {
  return axios.post<RoleRes>('/api/user/switch-user-role')
}
