import type { ApiResponse } from '@/types/common'

export interface IQMSBenhNhan {
  so_Kham: string
  ten_bn: string
  nam_sinh: string | null
  dia_chi?: string | null
  is_UuTien: string
}

export interface IQMSDangKham {
  benhNhanDangTiepDon: IQMSBenhNhan
}

export interface IQMSChoKham {
  danhSachChoTiepDon: IQMSBenhNhan[]
}

export interface IQMSNho {
  danhSachNho: IQMSBenhNhan[]
}

export interface IPhongKham {
  phongKham: string
  qmsDangKham: IQMSDangKham[]
  qmsChoKham: IQMSChoKham[]
  qmsNho: IQMSNho[]
}

export type GetListQMSDanhSachChoKhamResponse = ApiResponse<IPhongKham[]>
