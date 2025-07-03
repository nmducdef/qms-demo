import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserCheck, Users } from 'lucide-react'

const cashierData = [
  {
    cashier: 'Thu ngân A1',
    staff: 'NV. Trần Thị Hà',
    currentPayment: { name: 'Nguyễn Văn Quân', amount: '1.200.000đ', service: 'Khám tổng quát' },
    waitingPayments: [
      { name: 'Lê Thị Hồng', amount: '950.000đ', service: 'Xét nghiệm máu' },
      { name: 'Phạm Văn Tuấn', amount: '2.500.000đ', service: 'Chụp cộng hưởng từ' }
    ]
  },
  {
    cashier: 'Thu ngân B2',
    staff: 'NV. Đỗ Văn Lâm',
    currentPayment: { name: 'Vũ Thị Thắm', amount: '700.000đ', service: 'Khám tai mũi họng' },
    waitingPayments: [
      { name: 'Nguyễn Thị Mai', amount: '1.000.000đ', service: 'Khám tim mạch' },
      { name: 'Trần Văn Lộc', amount: '1.200.000đ', service: 'Chụp X-quang' },
      { name: 'Phạm Văn An', amount: '800.000đ', service: 'Khám tổng quát' }
    ]
  }
]

const QMSThuNganPage = () => {
  return (
    <div className='min-h-screen mt-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4'>
      <div
        className={`w-full grid gap-4`}
        style={{ gridTemplateColumns: `repeat(${cashierData.length}, minmax(0, 1fr))` }}
      >
        {cashierData.map((counter, index) => (
          <Card
            key={index}
            className='bg-white p-0 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-sm overflow-hidden w-full'
          >
            <CardHeader className='bg-gradient-to-r bg-[#008080] text-white p-3 !mb-0'>
              <CardTitle className='text-xl font-bold text-center'>
                <div>{counter.cashier}</div>
                <div className='text-sm font-normal text-white/90 mt-1'>{counter.staff}</div>
              </CardTitle>
            </CardHeader>

            <CardContent className='!p-2 !pt-0'>
              <div className='mb-4 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-3'>
                <div className='flex items-start gap-3'>
                  <div className='bg-yellow-500 p-1.5 rounded-lg'>
                    <UserCheck className='w-4 h-4 text-white' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-semibold text-yellow-800 text-xs mb-1'>Đang thanh toán</h3>
                    <p className='font-bold text-slate-800 text-sm mb-1'>{counter.currentPayment.name}</p>
                    <div className='text-xs text-slate-600'>
                      {counter.currentPayment.service} -{' '}
                      <span className='font-semibold text-emerald-700'>{counter.currentPayment.amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between mb-3'>
                  <h3 className='flex items-center gap-2 font-semibold text-slate-800 text-sm'>
                    <Users className='w-4 h-4 text-slate-600' />
                    <span>Danh sách chờ</span>
                  </h3>
                  <Badge className='bg-orange-100 text-orange-700 border-orange-200 font-semibold px-2 py-0.5 text-xs'>
                    {counter.waitingPayments.length} người
                  </Badge>
                </div>

                <div className='space-y-2 max-h-52 overflow-y-auto'>
                  {counter.waitingPayments.map((item, idx) => (
                    <div
                      key={idx}
                      className='bg-slate-50 hover:bg-slate-100 transition-colors duration-200 p-2 rounded-lg border border-slate-200'
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex-1'>
                          <p className='font-semibold text-slate-800 text-sm mb-0.5'>{item.name}</p>
                          <div className='text-xs text-slate-600'>{item.service}</div>
                        </div>
                        <div className='text-xs font-semibold text-green-600 bg-white px-2 py-0.5 rounded-full border'>
                          {item.amount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default QMSThuNganPage
