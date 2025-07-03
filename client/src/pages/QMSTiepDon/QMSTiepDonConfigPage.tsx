import { zodResolver } from '@hookform/resolvers/zod'
import { LayoutGrid, Rows3, Settings, Stethoscope, Users } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import DepartmentSelect from '@/components/DepartmentSelect'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const formSchema = z.object({
  clinic: z.array(z.string()).min(1, 'Vui lòng chọn ít nhất một phòng khám'),
  departmentName: z.array(z.string()).min(1, 'Vui lòng chọn ít nhất một phòng khám'),
  department: z.string().min(1, 'Vui lòng nhập khoa khám'),
  roomsToShow: z.string().min(1, 'Chọn số phòng hiển thị'),
  roomsPerRow: z.string().min(1, 'Chọn số phòng mỗi hàng')
})

interface IQMSTiepDonConfig {
  defaultClinic: string[]
  defaultDepartmentName: string[]
  defaultDepartment: string
  defaultRoomsToShow: string
  defaultRoomsPerRow: string
  onSave: (data: z.infer<typeof formSchema>) => void
}

const QMSTiepDonConfigPage: React.FC<IQMSTiepDonConfig> = ({
  defaultClinic,
  defaultDepartmentName,
  defaultDepartment,
  defaultRoomsToShow,
  defaultRoomsPerRow,
  onSave
}) => {
  const [selectRoomToShow, setSelectRoomToShow] = useState<number | null>(
    defaultRoomsToShow ? Number(defaultRoomsToShow) : null
  )
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clinic: defaultClinic,
      departmentName: defaultDepartmentName,
      department: defaultDepartment,
      roomsToShow: defaultRoomsToShow,
      roomsPerRow: defaultRoomsPerRow
    }
  })

  const resetFormToDefaults = () => {
    form.reset({
      clinic: defaultClinic,
      departmentName: defaultDepartmentName,
      department: defaultDepartment,
      roomsToShow: defaultRoomsToShow,
      roomsPerRow: defaultRoomsPerRow
    })
    setSelectRoomToShow(defaultRoomsToShow ? Number(defaultRoomsToShow) : null)
  }

  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open)
    if (!open) {
      resetFormToDefaults()
    }
  }

  const handleRoomsToShowChange = (value: string) => {
    setSelectRoomToShow(Number(value))
    form.setValue('clinic', [])
    form.setValue('departmentName', [])
    form.setValue('department', '')
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(values)
    setIsSheetOpen(false)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4'>
      <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetTrigger asChild>
          <button className='fixed bottom-0 left-4 mb-4 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-xl transition-all duration-200 focus:outline-none'>
            <Settings className='w-5 h-5' />
          </button>
        </SheetTrigger>

        <SheetContent
          side='right'
          className='p-6 w-[70vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] max-w-none'
          style={{ width: '50vw', maxWidth: 'none' }}
        >
          <SheetHeader>
            <SheetTitle className='text-xl'>Cấu hình tiếp đón</SheetTitle>
            <SheetDescription>
              Thiết lập thông tin phòng khám và khoa khám để bắt đầu sử dụng hệ thống.
            </SheetDescription>
          </SheetHeader>

          <div className='mt-6'>
            <Form {...form}>
              <div className='space-y-6'>
                <FormField
                  control={form.control}
                  name='roomsToShow'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
                        <Rows3 className='w-4 h-4 text-violet-500' />
                        Số phòng hiển thị
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            handleRoomsToShowChange(value)
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className='w-full h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-colors placeholder:text-gray-400 text-sm'>
                            <SelectValue placeholder='Chọn số phòng hiển thị' />
                          </SelectTrigger>
                          <SelectContent>
                            {[2, 3, 4, 5, 6, 7, 8].map((n) => (
                              <SelectItem key={n} value={n.toString()}>
                                {n}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='roomsPerRow'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
                        <LayoutGrid className='w-4 h-4 text-indigo-500' />
                        Số phòng / hàng
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className='w-full h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-colors placeholder:text-gray-400 text-sm'>
                            <SelectValue placeholder='Chọn số phòng trên mỗi hàng' />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4].map((n) => (
                              <SelectItem key={n} value={n.toString()}>
                                {n}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />

                <DepartmentSelect
                  maxSelect={selectRoomToShow || 100}
                  form={form}
                  name='clinic'
                  placeholder='Vui lòng chọn phòng khám'
                  onSelectionChange={(selectedOptions) => {
                    // Extract department names from selected options
                    const departmentNames = selectedOptions.map((option) => option.label)
                    form.setValue('departmentName', departmentNames)
                  }}
                />

                <FormField
                  control={form.control}
                  name='department'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
                        <Stethoscope className='w-4 h-4 text-emerald-500' />
                        Khoa khám
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Nhập tên khoa khám'
                          {...field}
                          className='h-12 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors'
                        />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />

                <Button
                  type='button'
                  onClick={() => form.handleSubmit(onSubmit)()}
                  className='w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]'
                >
                  <Users className='w-4 h-4 mr-2' />
                  Lưu cấu hình
                </Button>
              </div>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default QMSTiepDonConfigPage
