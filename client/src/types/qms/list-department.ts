import type { ApiResponse } from '@/types/common'

export interface IDepartment {
  department_ID: number
  department_Code: string
  department_Name: string
}

export interface IDepartmentResponseData {
  table: IDepartment[]
}

export type GetListDepartmentResponse = ApiResponse<IDepartmentResponseData>

export interface IDepartmenFunction {
  idPhong: number
  maPhong: string
  tenPhong: string
  stt: number
  hienThi: number
  tenBs: string
  uuTien: number
  soPhong: string
  maKhoa: string
  thoiGianCho: number
  motathem: string
  maChucnang: string
}

export type GetListDepartmentFunctionResponse = ApiResponse<IDepartmenFunction[]>
