import http from '@/apis/http'
import type { GetListDepartmentFunctionResponse, GetListDepartmentResponse } from '@/types/qms/list-department'
import type { GetListQMSDanhSachChoKhamResponse } from '@/types/qms/list-qms-dsach-cho-kham'

export const getListDepartment = () => http.get<GetListDepartmentResponse>('QMS/getListDepartment')

export const getListDepartmentFunction = () =>
  http.get<GetListDepartmentFunctionResponse>('QMS/getListDepartmentFunction')

export interface IQMSDanhSachChoKhamParams {
  maPhong: string
  maKhoa: string
  numberRow?: number
}
export const getListQMSDanhSachChoKham = (param: IQMSDanhSachChoKhamParams) => {
  const { maPhong, maKhoa, numberRow = 3 } = param
  const url = `QMS/QMSDanhSachChoKham?maPhong=${maPhong}&maKhoa=${maKhoa}&numberRow=${numberRow}`
  return http.get<GetListQMSDanhSachChoKhamResponse>(url)
}

export const getListQMSDanhSachCLS = (params: IQMSDanhSachChoKhamParams) => {
  const { maKhoa, maPhong, numberRow = 3 } = params
  const url = `QMS/QMSDanhSachCLS?maPhong=${maPhong}&maKhoa=${maKhoa}&numberRow=${numberRow}`
  return http.get(url)
}
