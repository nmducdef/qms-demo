import { getListDepartmentFunction } from '@/apis/qms.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useGetListDepartmentFunction = () => {
  return useQuery({
    queryKey: ['department-functions'],
    queryFn: () => getListDepartmentFunction().then((res) => res.data.data),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000
  })
}
