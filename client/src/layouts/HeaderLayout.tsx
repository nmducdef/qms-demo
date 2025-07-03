import React from 'react'
import { Button } from '@/components/ui/button'
import { Home, Hospital, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeaderLayout = () => {
  const navigate = useNavigate()
  const handleHomeClick = () => {
    navigate('/home')
  }

  const getCurrentTime = () => {
    return new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const [currentTime, setCurrentTime] = React.useState(getCurrentTime())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <header className='bg-[#00008b] shadow-lg'>
      <div className='max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm'>
              <Hospital className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='text-lg font-bold text-white leading-tight'>VietBa IT</h1>
              <p className='text-blue-100 text-xs font-medium'>QMS</p>
            </div>
          </div>

          <div className='flex items-center justify-center gap-6'>
            <div className='hidden lg:flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm'>
              <Clock className='w-4 h-4 text-blue-200' />
              <span className='text-white text-xs font-semibold'>{currentTime}</span>
            </div>

            <div className='flex items-center'>
              <Button
                onClick={handleHomeClick}
                variant='outline'
                size='sm'
                className='bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:text-white transition-all duration-300 rounded-full px-4 py-1'
              >
                <Home className='w-4 h-4 mr-1' />
                Trang chủ
              </Button>
            </div>
          </div>
        </div>

        <div className='lg:hidden mt-2 flex items-center justify-center space-x-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm'>
          <Clock className='w-4 h-4 text-blue-200' />
          <span className='text-white text-xs font-semibold'>{currentTime}</span>
        </div>
      </div>

      <div className='h-1 bg-[#00008b]'></div>
    </header>
  )
}

export default HeaderLayout
