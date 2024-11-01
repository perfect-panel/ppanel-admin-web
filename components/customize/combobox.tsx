'use client';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib';

export type Option<T = string> = {
  value: T;
  label: string;
};

// Conditional types to determine the value type for onChange
type OnChangeType<T, M extends boolean> = M extends true ? T[] : T;

type ComboboxProps<T = string, M extends boolean = false> = {
  multiple?: M;
  options?: Option<T>[];
  placeholder?: string;
  value?: OnChangeType<T, M>;
  onChange: (value: OnChangeType<T, M>) => void;
  className?: string;
};

export function Combobox<T, M extends boolean = false>({
  multiple = false as M,
  options = [],
  placeholder = 'Select...',
  value,
  onChange,
  className,
}: ComboboxProps<T, M>) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selectedValue: T) => {
    if (multiple) {
      const newValue = Array.isArray(value) ? [...value] : [];

      if (newValue.includes(selectedValue)) {
        newValue.splice(newValue.indexOf(selectedValue), 1);
        onChange(newValue as OnChangeType<T, M>);
      } else {
        onChange([...newValue, selectedValue] as OnChangeType<T, M>);
      }
    } else {
      const newValue = selectedValue === value ? ('' as T) : selectedValue;
      onChange(newValue as OnChangeType<T, M>);
      setOpen(false);
    }
  };

  const renderButtonLabel = () => {
    if (multiple && Array.isArray(value) && value.length > 0) {
      const selectedLabels = options
        .filter((option) => value.includes(option.value))
        .map((option) => option.label)
        .join(', ');

      return selectedLabels;
    } else if (!multiple) {
      const selectedOption = options.find((option) => option.value === value);

      return selectedOption ? selectedOption.label : placeholder;
    }

    return placeholder;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn('w-full items-center justify-between', className)}
        >
          <span className='truncate'>{renderButtonLabel()}</span>
          <CaretSortIcon className='ml-2 size-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-fit p-0' align='start'>
        <Command>
          <CommandInput placeholder='Search...' className='h-9' />
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {options.map((option) => (
                <CommandItem
                  key={String(option.label)}
                  value={option.label}
                  onSelect={() => handleSelect(option.value)}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      multiple
                        ? Array.isArray(value) && value.includes(option.value)
                          ? 'opacity-100'
                          : 'opacity-0'
                        : value === option.value
                          ? 'opacity-100'
                          : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
