const FooterLayout = () => {
  return (
    <footer className='bg-white border-t border-gray-200 py-4 mt-auto'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center text-sm text-gray-600'>
          <div className='mb-2 md:mb-0'>© 2025 VietBaIT. Tất cả quyền được bảo lưu.</div>
          <div className='flex items-center space-x-4'>
            <span>Phiên bản: 1.0.0</span>
            <span className='w-2 h-2 bg-green-500 rounded-full'></span>
            <span>Hệ thống hoạt động</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterLayout
