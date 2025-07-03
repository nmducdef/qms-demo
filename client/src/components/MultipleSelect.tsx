import { Check, ChevronDown, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

export interface Option {
  value: string
  label: string
}

export interface MultiSelectProps {
  options: Option[]
  placeholder?: string
  value: string[]
  onChange: (value: string[]) => void
  maxSelect?: number
  disabled?: boolean
  emptyText?: string
  loading?: boolean
  loadingText?: string
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = 'Chọn...',
  value = [],
  onChange,
  maxSelect,
  disabled = false,
  emptyText = 'Không có lựa chọn nào',
  loading = false,
  loadingText = 'Đang tải...'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleSelect = (option: Option) => {
    if (value.includes(option.value)) {
      onChange(value.filter((v) => v !== option.value))
    } else {
      if (!maxSelect || value.length < maxSelect) {
        onChange([...value, option.value])
      }
    }
  }

  const handleRemove = (valueToRemove: string) => {
    onChange(value.filter((v) => v !== valueToRemove))
  }

  const getSelectedLabels = () => {
    return value.map((v) => options.find((opt) => opt.value === v)?.label).filter(Boolean) as string[]
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative w-full' ref={ref}>
      <button
        type='button'
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className='flex min-h-12 w-full items-center justify-between rounded-md border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 bg-white px-3 py-2 text-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50'
        disabled={disabled || loading}
      >
        <div className='flex flex-wrap gap-1 flex-1 max-h-20 overflow-y-auto'>
          {loading ? (
            <span className='text-gray-500 py-1.5 text-sm'>{loadingText}</span>
          ) : !value || value.length === 0 ? (
            <span className='text-gray-400 py-1.5 text-sm'>{placeholder}</span>
          ) : (
            getSelectedLabels().map((label, index) => (
              <span
                key={index}
                className='inline-flex items-center gap-1 rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-xs font-medium border border-blue-200 flex-shrink-0'
              >
                {label}
                <span
                  role='button'
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove(value[index])
                  }}
                  className='ml-1 hover:bg-blue-200 rounded-full p-0.5 cursor-pointer transition-colors'
                >
                  <X className='h-3 w-3' />
                </span>
              </span>
            ))
          )}
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 ml-2 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className='absolute top-full z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg animate-in fade-in-0 zoom-in-95'>
          {maxSelect && (
            <div className='px-3 py-2 text-xs text-gray-500 border-b border-gray-100 bg-gray-50 rounded-t-lg'>
              Đã chọn {value.length}/{maxSelect}
            </div>
          )}
          <div className='max-h-60 overflow-auto p-1'>
            {loading ? (
              <div className='px-3 py-2 text-sm text-gray-500 text-center'>{loadingText}</div>
            ) : options.length === 0 ? (
              <div className='px-3 py-2 text-sm text-gray-500 text-center'>{emptyText}</div>
            ) : (
              options.map((option) => {
                const isSelected = value.includes(option.value)
                const isDisabled = !isSelected && maxSelect && value.length >= maxSelect

                return (
                  <div
                    key={option.value}
                    onClick={() => !isDisabled && handleSelect(option)}
                    className={`relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none transition-colors ${
                      isDisabled
                        ? 'opacity-50 cursor-not-allowed'
                        : isSelected
                          ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Check className={`mr-2 h-4 w-4 ${isSelected ? 'opacity-100 text-blue-600' : 'opacity-0'}`} />
                    {option.label}
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MultiSelect
