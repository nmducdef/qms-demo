import MultiSelect, { type Option } from '@/components/MultipleSelect'
import { useGetListDepartments } from '@/hooks/useDepartment'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { Building2 } from 'lucide-react'

interface DepartmentSelectProps<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  label?: string
  placeholder?: string
  disabled?: boolean
  maxSelect?: number
  onSelectionChange?: (selectedOptions: Option[]) => void
}

const DepartmentSelect = <T extends FieldValues>({
  form,
  name,
  label = 'Phòng ban',
  placeholder = 'Chọn phòng ban...',
  disabled = false,
  maxSelect,
  onSelectionChange
}: DepartmentSelectProps<T>) => {
  const { data, isLoading } = useGetListDepartments()

  const options: Option[] = (data || []).map((dept) => ({
    value: String(dept.department_Code),
    label: dept.department_Name.trim()
  }))

  const handleSelectionChange = (selectedValues: string[]) => {
    // Find the selected options with their labels
    const selectedOptions = options.filter((option) => selectedValues.includes(option.value))

    // Call the parent callback if provided
    if (onSelectionChange) {
      onSelectionChange(selectedOptions)
    }

    // Update the form field
    return selectedValues
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full'>
          <FormLabel className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
            <Building2 className='w-4 h-4 text-blue-500' />
            {label}
          </FormLabel>
          <FormControl>
            <MultiSelect
              options={options}
              value={field.value || []}
              onChange={(selectedValues) => {
                const newValues = handleSelectionChange(selectedValues)
                field.onChange(newValues)
              }}
              maxSelect={maxSelect}
              placeholder={placeholder}
              loading={isLoading}
              loadingText='Đang tải phòng ban...'
              emptyText='Không có phòng ban'
              disabled={disabled}
            />
          </FormControl>

          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  )
}

export default DepartmentSelect
