'use client';

import { CalendarIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, formatDate } from '@/lib';

export function DatePicker({
  placeholder,
  value,
  onChange,
  ...props
}: CalendarProps & {
  placeholder?: string;
  value?: number;
  onChange?: (value?: number) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(value ? new Date(value) : undefined);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onChange) {
      onChange(selectedDate?.getTime());
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn('w-full justify-between font-normal', !value && 'text-muted-foreground')}
        >
          {value ? formatDate(value) : <span>{placeholder}</span>}
          <CalendarIcon className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar {...props} mode='single' selected={date} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
