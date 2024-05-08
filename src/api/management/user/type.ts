export type EnterpriseCertificationModel = {
  accountType: number
  status: number
  time: string
  legalPerson: string
  certificateType: string
  authenticationNumber: string
  enterpriseName: string
  enterpriseCertificateType: string
  organizationCode: string
}
export type Certification = {
  certificationType: number
  certificationContent: string
  status: number
  time: string
}

export type RoleType = '' | '*' | 'admin' | 'teacher' | 'student'

export type UserInfo = {
  userId?: string
  userPw?: string
  name?: string
  gender?: string
  birth?: string
  hp?: string
  address?: string
  disability?: string
  firstConsultedTime?: string,
  status?: string,
  updatedTime?: string,
  avatar?: string
  job?: string
  organization?: string
  location?: string
  email?: string
  introduction?: string
  personalWebsite?: string
  jobName?: string
  organizationName?: string
  locationName?: string
  phone?: string
  registrationDate?: string
  accountId?: string
  certification?: number
  role: RoleType
}
export type UserListQuery = {
  name: string
  birth: string
  hp: string
  userId: string
  status: string
  birthMonth: string
  gender: string
}

export type UserListParams = {
  current: number
  pageSize: number
} & Partial<UserInfo>

export type UserListRes = {
  list: UserInfo[]
  total: number
}
export type CertificationRecord = Certification[]

export type UnitCertification = {
  enterpriseInfo: EnterpriseCertificationModel
  record: CertificationRecord
}

export type LatestActivity = {
  id: number
  title: string
  description: string
  avatar: string
}
export type MyProjectRecord = {
  id: number
  name: string
  description: string
  peopleNumber: number
  contributors: {
    name: string
    email: string
    avatar: string
  }[]
}

export type BasicInfoModel = {
  email: string
  nickname: string
  countryRegion: string
  area: string
  address: string
  profile: string
}

export type ProjectItem = {
  id: number
  name: string
  description: string
  peopleNumber: number
  contributors: {
    name: string
    avatar: string
    email: string
  }[]
}

export type TeamItem = {
  id: number
  avatar: string
  name: string
  peopleNumber: number
}

export type LoginData = {
  username: string
  password: string
}

export type LoginRes = {
  token: string
}

export type RoleRes = {
  role: RoleType
}
