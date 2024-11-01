import { CaretSortIcon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';

import { FormattedInput } from '@/components/customize/formatted-Input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib';

interface FieldConfig {
  name: string;
  type: 'text' | 'number';
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
}

interface DynamicFieldListProps<T> {
  value?: T[];
  onChange: (value: T[]) => void;
  fields: FieldConfig[];
}

export function DynamicFieldList<T extends Record<string, any>>({
  value = [],
  onChange,
  fields,
}: DynamicFieldListProps<T>) {
  if (!value || value?.length === 0) {
    const defaultItem = fields.reduce((acc, field) => {
      // @ts-ignore
      acc[field.name] = undefined;

      return acc;
    }, {} as T);

    value = [defaultItem];
  }

  const addField = () => {
    const newItem = fields.reduce((acc, field) => {
      // @ts-ignore
      acc[field.name] = undefined;

      return acc;
    }, {} as T);

    onChange([...value, newItem]);
  };

  const removeField = (index: number) => {
    const newFields = value.filter((_, i) => i !== index);

    onChange(newFields);
  };

  const updateField = (index: number, key: keyof T, fieldValue: string | number) => {
    const newFields = value.map((item, i) => (i === index ? { ...item, [key]: fieldValue } : item));

    onChange(newFields);
  };

  return (
    <div className='flex flex-col gap-4'>
      {value?.map((item, index) => (
        <div key={index} className='flex items-center gap-2'>
          {/* 动态生成字段 */}
          {fields.map(({ name, ...field }) => (
            <div key={name} className='flex-1'>
              <FormattedInput
                value={item[name]}
                onValueChange={(value) => {
                  updateField(index, name, value);
                }}
                {...field}
              />
            </div>
          ))}
          <Button variant='destructive' type='button' onClick={() => removeField(index)}>
            删除
          </Button>
        </div>
      ))}
      <Button type='button' onClick={addField}>
        添加
      </Button>
    </div>
  );
}

export function DynamicFieldPopover<T extends Record<string, any>>({
  value,
  onChange,
  fields,
  trigger,
  title,
  description,
}: DynamicFieldListProps<T> & {
  trigger: ReactNode;
  title: ReactNode;
  description: ReactNode;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className={cn('w-full items-center justify-between')}
        >
          {trigger}
          <CaretSortIcon className='ml-2 size-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-fit space-y-2' align='end'>
        <h4 className='font-medium leading-none'>{title}</h4>
        <p className='text-sm text-muted-foreground'>{description}</p>
        <DynamicFieldList value={value} onChange={onChange} fields={fields} />
      </PopoverContent>
    </Popover>
  );
}
