import FooterLayout from '@/layouts/FooterLayout'
import HeaderLayout from '@/layouts/HeaderLayout'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col'>
      <HeaderLayout />

      <main className='flex-1'>
        <div className='max-w-screen mx-auto'>
          <div className='bg-white shadow-sm'>
            <Outlet />
          </div>
        </div>
      </main>

      <FooterLayout />
    </div>
  )
}

export default MainLayout
