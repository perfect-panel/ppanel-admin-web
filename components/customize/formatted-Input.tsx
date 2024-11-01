import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';

import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib';

interface FormattedInputProps<T extends string | number>
  extends Omit<InputProps, 'prefix' | 'onChange' | 'onFocus' | 'onBlur'> {
  prefix?: ReactNode;
  suffix?: ReactNode;
  onValueChange?: (formattedValue: T) => void;
  onBlurValueChange?: (formattedValue: T) => void;
  formatInput?: (value?: string) => string;
  formatOutput?: (value?: string) => T;
  min?: number;
  max?: number;
  maxLength?: number;
  defaultValue?: T;
}

export function FormattedInput<T extends string | number>({
  suffix,
  prefix,
  onValueChange,
  onBlurValueChange,
  formatInput,
  formatOutput,
  min,
  max,
  type = 'text',
  value: initialValue,
  defaultValue,
  maxLength,
  className,
  ...props
}: FormattedInputProps<T>) {
  const [value, setValue] = useState<string | undefined>(
    initialValue !== undefined ? String(initialValue) : String(defaultValue || ''),
  );
  const [formattedValue, setFormattedValue] = useState<string | number>(
    initialValue !== undefined ? String(initialValue) : String(defaultValue || ''),
  );

  const focusValueRef = useRef<string | number | null>(null);

  useEffect(() => {
    let newValue = initialValue !== undefined ? String(initialValue) : String(defaultValue || '');
    if (formatInput) newValue = formatInput(newValue) || '';
    setValue(newValue);
    setFormattedValue(formatOutput ? formatOutput(newValue) : newValue);
  }, [initialValue, defaultValue, formatInput, formatOutput]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let inputValue: string | undefined = e.target.value;

    // Apply maxLength check
    if (maxLength !== undefined && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    if (type === 'number') {
      const numericValue = Number(inputValue);

      // Check for valid numeric value
      if (!isNaN(numericValue)) {
        // Enforce min and max constraints
        if (min !== undefined && numericValue < min) {
          inputValue = String(min);
        } else if (max !== undefined && numericValue > max) {
          inputValue = String(max);
        }
      } else {
        inputValue = ''; // Reset if input is not a valid number
      }

      // Set inputValue to undefined if it is an empty string or zero
      if (inputValue === '') {
        inputValue = undefined;
      }
    }

    setValue(inputValue);

    const outputValue = formatOutput ? formatOutput(inputValue) : (inputValue as unknown as T);

    setFormattedValue(outputValue);

    if (onValueChange) {
      const valueToReturn = type === 'number' ? (Number(outputValue) as T) : (outputValue as T);
      onValueChange(valueToReturn);
    }
  }

  function handleFocus() {
    focusValueRef.current = formattedValue;
  }

  function handleBlur() {
    if (onBlurValueChange && focusValueRef.current !== formattedValue) {
      const valueToReturn =
        type === 'number' ? (Number(formattedValue) as T) : (formattedValue as T);
      onBlurValueChange(valueToReturn);
    }
  }

  return (
    <div className={cn('flex w-full items-center rounded-md border border-input', className)}>
      {prefix && <div className='mr-px flex h-9 items-center bg-muted px-3 text-sm'>{prefix}</div>}
      <Input
        {...props}
        type={type}
        min={min}
        max={max}
        value={value}
        maxLength={maxLength}
        className={cn('border-none')}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {suffix && <div className='ml-px flex h-9 items-center bg-muted px-3 text-sm'>{suffix}</div>}
    </div>
  );
}
