import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetListQMSDanhSachChoKham } from '@/hooks/useDepartment'
import { fakeQMSData } from '@/pages/QMSTiepDon/data-fake'
import QMSTiepDonConfigPage from '@/pages/QMSTiepDon/QMSTiepDonConfigPage'
import WaitScreenPage from '@/pages/QMSTiepDon/WaitScreenPage'
import { qmsTiepDonConfigActions, selectQMSConfiguration } from '@/stores/slices/qms-tiep-don-config.slice'
import { Stethoscope, UserCheck, Users, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const QMSTiepDonPage = () => {
  const dispatch = useDispatch()
  const config = useSelector(selectQMSConfiguration)
  const [clinicsData, setClinicsData] = useState<any[]>([])
  const [patientsData, setPatientsData] = useState<any>({})

  const { data: realData } = useGetListQMSDanhSachChoKham({
    maPhong: config.visibleClinicIds.join(','),
    maKhoa: config.department,
    numberRow: Number(config.roomsToShow)
  })

  const data = fakeQMSData

  useEffect(() => {
    if (!data) return

    setClinicsData(
      data.map((item) => ({
        id: item.phongKham,
        department: item.phongKham,
        doctor: ''
      }))
    )

    const mappedPatients = data.reduce(
      (acc, item) => {
        acc[item.phongKham] = {
          current: item.qmsDangKham[0]?.benhNhanDangTiepDon
            ? {
                so_kham: item.qmsDangKham[0].benhNhanDangTiepDon.so_Kham,
                name: item.qmsDangKham[0].benhNhanDangTiepDon.ten_bn,
                age: item.qmsDangKham[0].benhNhanDangTiepDon.nam_sinh
                  ? 2025 - Number(item.qmsDangKham[0].benhNhanDangTiepDon.nam_sinh)
                  : '?',
                dob: item.qmsDangKham[0].benhNhanDangTiepDon.nam_sinh || '?'
              }
            : null,
          waiting: item.qmsChoKham || [],
          missed: item.qmsNho || []
        }
        return acc
      },
      {} as Record<string, any>
    )

    setPatientsData(mappedPatients)
  }, [data])

  const handleConfigSave = (data: {
    clinic: string[]
    department: string
    departmentName: string[]
    roomsToShow: string
    roomsPerRow: string
  }) => {
    dispatch(qmsTiepDonConfigActions.setConfiguration(data))
  }

  const displayedClinics = clinicsData.filter((clinic) => config.visibleClinicIds.includes(clinic.id))

  const clinicIdToName = config.visibleClinicIds.reduce(
    (acc, id, idx) => {
      acc[id] = config.departmentName[idx] || id
      return acc
    },
    {} as Record<string, string>
  )

  if (!config.isConfigured && (config.visibleClinicIds.length === 0 || displayedClinics.length === 0)) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-1'>
        <WaitScreenPage />
        <QMSTiepDonConfigPage
          defaultDepartmentName={config.departmentName}
          defaultClinic={config.visibleClinicIds}
          defaultDepartment={config.department}
          defaultRoomsToShow={config.roomsToShow}
          defaultRoomsPerRow={config.roomsPerRow}
          onSave={handleConfigSave}
        />
      </div>
    )
  }

  if (config.isConfigured && config.visibleClinicIds.length > 0 && displayedClinics.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative p-1'>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4'></div>
            <p className='text-gray-800 text-2xl font-medium'>Đang tải dữ liệu...</p>
          </div>
        </div>
        <QMSTiepDonConfigPage
          defaultClinic={config.visibleClinicIds}
          defaultDepartment={config.department}
          defaultDepartmentName={config.departmentName}
          defaultRoomsToShow={config.roomsToShow}
          defaultRoomsPerRow={config.roomsPerRow}
          onSave={handleConfigSave}
        />
      </div>
    )
  }

  const roomsPerRow = Number(config.roomsPerRow)
  const totalRooms = Math.min(Number(config.roomsToShow), displayedClinics.length)
  const numRows = Math.ceil(totalRooms / roomsPerRow)

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2'>
      <div className='max-w-full mx-auto'>
        <div
          className='grid gap-4'
          style={{
            gridTemplateColumns: `repeat(${Math.min(roomsPerRow, totalRooms)}, minmax(350px, 1fr))`,
            gridTemplateRows: numRows > 1 ? `repeat(${numRows}, 1fr)` : '1fr',
            height: 'calc(100vh - 80px)',
            maxHeight: 'calc(100vh - 80px)',
            overflow: 'hidden'
          }}
        >
          {displayedClinics.slice(0, totalRooms).map((clinic) => {
            const data = patientsData[clinic.id] || { current: null, waiting: [], missed: [] }
            return (
              <Card
                key={clinic.id}
                className='bg-white border-2 border-blue-200 shadow-lg rounded-xl overflow-hidden flex flex-col h-full py-0 gap-1'
              >
                <CardHeader className='bg-[#00008b] text-white p-4 flex-shrink-0 gap-0'>
                  <CardTitle className='text-[10px] font-bold flex items-center gap-3'>
                    <div className='bg-white/20 p-2 rounded-lg'>
                      <Stethoscope className='w-4 h-4' />
                    </div>
                    <div className='flex-1'>
                      <div className='text-[22px] leading-tight uppercase tracking-wide'>
                        {clinicIdToName[clinic.id] || clinic.department}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className='p-1 flex flex-col flex-1 overflow-hidden'>
                  {/* Đang Tiếp Đón */}
                  <div className='mb-3 bg-gradient-to-r mt-3 from-emerald-100 to-green-200 border-2 border-emerald-300 rounded-lg p-2 flex-shrink-0 relative'>
                    <div className='absolute -top-4 -left-0 rounded-full'>
                      <Badge className='px-3 py-1 text-sm rounded-lg bg-emerald-600 text-white flex items-center gap-1'>
                        <UserCheck className='w-4 h-4' />
                        ĐANG TIẾP ĐÓN
                      </Badge>
                    </div>

                    <div className='absolute -top-3 -right-0 rounded-full'>
                      <Badge
                        variant='destructive'
                        className='px-3 py-1 text-sm rounded-lg text-white flex items-center gap-1'
                      >
                        {data.current.dob}
                      </Badge>
                    </div>

                    {data.current ? (
                      <div className='flex items-center !p-0 gap-3 mt-3'>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center justify-between gap-3'>
                            <p className='font-bold text-gray-900 text-xl truncate'>
                              <span className='text-red-600 text-3xl'>{data.current.so_kham}</span> -{' '}
                              <span className='text-[25px]'>{data.current.name}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className='flex items-center gap-3 mt-3'>
                        <div className='flex-1'>
                          <p className='font-bold text-gray-600 text-xl'>Chưa có bệnh nhân</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Danh Sách Chờ */}
                  <div className='flex-1 mb-3 overflow-hidden flex flex-col'>
                    <div className='flex items-center justify-between mb-3 flex-shrink-0'>
                      <h3 className='flex items-center gap-2 font-bold text-gray-900 text-lg'>
                        <Users className='w-6 h-6 text-blue-600' />
                        <span>DANH SÁCH CHỜ</span>
                      </h3>
                    </div>

                    <div className='flex-1 overflow-y-auto space-y-2 pr-1'>
                      {data.waiting.length > 0 ? (
                        data.waiting
                          .flatMap((grp: any) => grp.danhSachChoTiepDon || [])
                          .map((patient: any, idx: number) => (
                            <div
                              key={idx}
                              className='bg-gradient-to-r from-amber-50 to-yellow-100 hover:from-amber-100 hover:to-yellow-200 transition-colors p-3 rounded-lg border border-amber-200 flex-shrink-0'
                            >
                              <div className='flex items-center justify-between'>
                                <p className='font-bold text-gray-900 text-xl truncate flex-1 mr-3'>
                                  <span className='text-blue-700 text-2xl'>{patient.so_Kham}</span> - {patient.ten_bn}
                                </p>
                                <div className='flex items-center gap-2 flex-shrink-0'>
                                  <Badge variant='destructive' className='text-[14px] bg-blue-600'>
                                    {patient.nam_sinh || '?'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className='text-center py-8 text-gray-500 flex-1 flex items-center justify-center'>
                          <div>
                            <Users className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                            <p className='text-lg font-medium'>Không có bệnh nhân chờ</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Danh Sách Nhỡ */}
                  <div className='border-t border-gray-200 pt-4 mt-4'>
                    <div className='flex items-center justify-between mb-3'>
                      <h3 className='flex items-center gap-2 text-lg font-semibold text-red-600'>
                        <Clock className='w-5 h-5' />
                        <span>DANH SÁCH NHỠ</span>
                      </h3>
                      <span className='bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow'>
                        {data.missed.length}
                      </span>
                    </div>

                    <div className='h-[72px] overflow-hidden'>
                      {data.missed.length > 0 ? (
                        <div className='flex gap-3 animate-marquee whitespace-nowrap'>
                          {data.missed
                            .flatMap((grp: any) => grp.danhSachNho || [])
                            .map((patient: any, idx: number) => (
                              <div
                                key={idx}
                                className='flex-shrink-0 w-[200px] bg-white border border-red-200 rounded-lg shadow-sm p-3'
                              >
                                <div className='flex items-center justify-between mb-1'>
                                  <p className='font-medium text-gray-800 truncate flex-1'>{patient.ten_bn}</p>
                                  <span className='text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full'>
                                    #{idx + 1}
                                  </span>
                                </div>
                                <div className='flex items-center justify-between text-sm text-gray-600 mt-1'>
                                  <span className='bg-gray-100 px-2 py-0.5 rounded'>
                                    {patient.nam_sinh ? 2025 - Number(patient.nam_sinh) : '?'}T
                                  </span>
                                  <span className='bg-gray-100 px-2 py-0.5 rounded'>{patient.nam_sinh || '?'}</span>
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className='flex items-center justify-center h-full text-gray-400 text-sm py-6'>
                          <div className='text-center'>
                            <Clock className='w-6 h-6 mx-auto mb-2' />
                            <p>Không có bệnh nhân nhỡ</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <QMSTiepDonConfigPage
        defaultClinic={config.visibleClinicIds}
        defaultDepartment={config.department}
        defaultDepartmentName={config.departmentName}
        defaultRoomsToShow={config.roomsToShow}
        defaultRoomsPerRow={config.roomsPerRow}
        onSave={handleConfigSave}
      />
    </div>
  )
}

export default QMSTiepDonPage
