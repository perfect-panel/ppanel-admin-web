'use client';

import { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/input';

import { Combobox } from '../customize/combobox';

export interface IParams {
  key: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
}
interface ColumnFilterProps<TData> {
  table: Table<TData>;
  params: IParams[];
  filters?: any;
}

export function ColumnFilter<TData>({ table, params, filters }: ColumnFilterProps<TData>) {
  const updateFilter = (key: string, value: any) => {
    table.setColumnFilters((prev) => {
      const newFilters = prev.filter((filter) => filter.id !== key);
      if (value) {
        newFilters.push({ id: key, value });
      }
      return newFilters;
    });
  };

  return (
    <div className='flex gap-2'>
      {params.map((param) => {
        if (param.options) {
          return (
            <Combobox
              key={param.key}
              className='w-32'
              placeholder={param.placeholder || 'Choose...'}
              value={filters[param.key] || ''}
              onChange={(value) => {
                updateFilter(param.key, value);
              }}
              options={param.options}
            />
          );
        }
        return (
          <Input
            key={param.key}
            className='w-32'
            placeholder={param.placeholder || 'Search...'}
            value={filters[param.key] || ''}
            onChange={(event) => updateFilter(param.key, event.target.value)}
          />
        );
      })}
    </div>
  );
}
