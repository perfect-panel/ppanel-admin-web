'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';

interface ColumnToggleProps<TData> {
  table: Table<TData>;
}

export function ColumnToggle<TData>({ table }: ColumnToggleProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 w-8 p-1'>
          <MixerHorizontalIcon className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[150px]'>
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
          .map((column) => {
            const columns = table.getAllColumns().filter((item) => item.getIsVisible());
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                disabled={columns.length === 1 && columns[0].id === column.id}
              >
                {column.columnDef.header as ReactNode}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
