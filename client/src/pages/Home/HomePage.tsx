import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Monitor } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  const handleQMSTiepDon = () => {
    navigate('/qms-tiep-don')
  }

  const handleQMSThuNgan = () => {
    navigate('/qms-thu-ngan-config')
  }

  return (
    <div className='py-8 sm:py-12 lg:py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight'>
            Hệ thống Quản lý Hàng đợi (QMS)
          </h1>
          <p className='mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto'>
            Phần mềm màn hình chờ tiếp đón và thu ngân của Bệnh viện Ung bướu Hưng Việt, được thiết kế để cấu hình động,
            tối ưu hóa quy trình và nâng cao trải nghiệm bệnh nhân.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
          <Card className='bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl'>
            <CardHeader>
              <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                  <Monitor className='w-6 h-6 text-blue-600' />
                </div>
                <CardTitle className='text-xl font-semibold text-gray-900'>Màn hình chờ Tiếp đón</CardTitle>
              </div>
              <CardDescription className='mt-2 text-gray-600'>
                Quản lý hàng đợi tại quầy tiếp đón với giao diện trực quan và dễ sử dụng.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-500'>
                Hiển thị thông tin bệnh nhân, số thứ tự, và thời gian chờ theo thời gian thực, giúp tối ưu hóa quy trình
                tiếp đón.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleQMSTiepDon}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200'
              >
                Chọn Tiếp đón
              </Button>
            </CardFooter>
          </Card>

          <Card className='bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl'>
            <CardHeader>
              <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
                  <DollarSign className='w-6 h-6 text-green-600' />
                </div>
                <CardTitle className='text-xl font-semibold text-gray-900'>Màn hình chờ Thu ngân</CardTitle>
              </div>
              <CardDescription className='mt-2 text-gray-600'>
                Hỗ trợ quản lý hàng đợi tại quầy thu ngân với hiệu suất cao.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-500'>
                Cung cấp thông tin thanh toán, số thứ tự, và trạng thái hàng đợi, đảm bảo quy trình thanh toán nhanh
                chóng và chính xác.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleQMSThuNgan}
                className='w-full bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200'
              >
                Chọn Thu ngân
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HomePage
