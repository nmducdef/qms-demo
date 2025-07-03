import { getListDepartment, getListQMSDanhSachChoKham, type IQMSDanhSachChoKhamParams } from '@/apis/qms.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useGetListDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: () => getListDepartment().then((res) => res.data.data.table),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData
  })
}

export const useGetListQMSDanhSachChoKham = (params: IQMSDanhSachChoKhamParams) => {
  return useQuery({
    queryKey: ['qms-danh-sach-cho-kham', params],
    queryFn: () => getListQMSDanhSachChoKham(params).then((res) => res.data.data),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData
  })
}
