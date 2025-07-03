import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export type SelectItem = {
  value: string
  label: string
}

export type SearchableSelectProps = {
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  items: SelectItem[]
  disabled?: boolean
  emptyText?: string
  searchPlaceholder?: string
  className?: string
  loading?: boolean
  loadingText?: string
}

const SearchableSelect = ({
  value,
  onValueChange,
  placeholder = 'Chọn một mục...',
  items = [],
  disabled = false,
  emptyText = 'Không tìm thấy dữ liệu',
  searchPlaceholder = 'Tìm kiếm...',
  className,
  loading = false,
  loadingText = 'Đang tải...'
}: SearchableSelectProps) => {
  const [open, setOpen] = useState(false)

  const selectedItem = items.find((item) => item.value === value)

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue === value ? '' : selectedValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
          disabled={disabled || loading}
        >
          {loading ? (
            <span className='text-muted-foreground'>{loadingText}</span>
          ) : selectedItem ? (
            selectedItem.label
          ) : (
            <span className='text-muted-foreground'>{placeholder}</span>
          )}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0' align='start'>
        <Command>
          <CommandInput placeholder={searchPlaceholder} className='h-9' />
          <CommandEmpty>{emptyText}</CommandEmpty>
          <CommandGroup className='max-h-64 overflow-auto'>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.label}
                onSelect={() => handleSelect(item.value)}
                className='cursor-pointer'
              >
                <Check className={cn('mr-2 h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')} />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SearchableSelect
