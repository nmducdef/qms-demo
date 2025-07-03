import { Settings, Monitor, Users, Building2 } from 'lucide-react'

export default function WaitScreenPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4'>
      <div className='text-center max-w-2xl mx-auto'>
        <div className='relative mb-12'>
          <div className='w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-2xl transform hover:scale-105 transition-transform duration-300'>
            <Settings className='w-16 h-16 text-white animate-spin' style={{ animationDuration: '8s' }} />
          </div>
          <div className='absolute inset-0 w-32 h-32 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mx-auto opacity-20 animate-pulse'></div>
        </div>

        <div className='space-y-8'>
          <div>
            <h1 className='text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4'>
              Chưa có cấu hình
            </h1>
            <p className='text-xl text-slate-600 leading-relaxed max-w-lg mx-auto'>
              Vui lòng thiết lập cấu hình để bắt đầu hiển thị thông tin tiếp đón bệnh nhân
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6 mt-16'>
            <div className='group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2'>
              <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300'>
                <Monitor className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-slate-800 mb-2'>Chọn phòng khám</h3>
              <p className='text-sm text-slate-600'>Lựa chọn phòng khám cần hiển thị thông tin</p>
            </div>

            <div className='group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2'>
              <div className='w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300'>
                <Building2 className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-slate-800 mb-2'>Thiết lập bố cục</h3>
              <p className='text-sm text-slate-600'>Cấu hình số lượng phòng và bố cục hiển thị</p>
            </div>

            <div className='group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2'>
              <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300'>
                <Users className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-slate-800 mb-2'>Chọn khoa/phòng ban</h3>
              <p className='text-sm text-slate-600'>Lựa chọn các khoa và phòng ban cần quản lý</p>
            </div>
          </div>
        </div>

        <div
          className='absolute top-20 left-20 w-20 h-20 bg-blue-200 rounded-full opacity-50 animate-bounce'
          style={{ animationDelay: '0s', animationDuration: '3s' }}
        ></div>
        <div
          className='absolute top-40 right-32 w-16 h-16 bg-indigo-200 rounded-full opacity-50 animate-bounce'
          style={{ animationDelay: '1s', animationDuration: '3s' }}
        ></div>
        <div
          className='absolute bottom-32 left-32 w-12 h-12 bg-purple-200 rounded-full opacity-50 animate-bounce'
          style={{ animationDelay: '2s', animationDuration: '3s' }}
        ></div>
      </div>
    </div>
  )
}
