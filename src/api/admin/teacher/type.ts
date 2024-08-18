export type TeacherRecord {
  id: number;
  username: string;
  full_name: string;
  email: string;
  is_active: boolean;
  role: string;
  company_number?: string;
  address?: string;
  position: string;
  mobile_number: string;
  office_number?: string;
  birthdate?: string;
  profile_image?: string;
  teacher_role: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export type TeacherQuery = {
  is_active: boolean;
  full_name: string
}

export type TeacherParams = {
  current: number
  pageSize: number
} & Partial<TeacherRecord>

export type TeacherListRes = {
  list: TeacherRecord[]
  total: number
}
