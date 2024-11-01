import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaginationProps<TData> {
  table: Table<TData>;
}

export function Pagination<TData>({ table }: PaginationProps<TData>) {
  const t = useTranslations('common.table');
  return (
    <div className='flex items-center justify-between'>
      <div className='flex-1 text-sm text-muted-foreground'>
        {t('pageInfo', {
          current: table.getState().pagination.pageIndex + 1,
          total: table.getPageCount(),
        })}
      </div>
      <div className='flex items-center gap-2'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>{t('rowsPerPage')}</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 50, 100, 200].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant='outline'
          className='hidden h-8 w-8 p-2 lg:flex'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className='sr-only'>Go to first page</span>
          <DoubleArrowLeftIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='h-8 w-8 p-2'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className='sr-only'>Go to previous page</span>
          <ChevronLeftIcon className='h-4 w-4' />
        </Button>
        <Select
          value={`${table.getState().pagination.pageIndex + 1}`}
          onValueChange={(value) => table.setPageIndex(Number(value) - 1)}
        >
          <SelectTrigger className='h-8 w-[70px]'>
            <SelectValue placeholder='Select page number' />
          </SelectTrigger>
          <SelectContent className='w-12'>
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <SelectItem key={i} value={`${i + 1}`}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant='outline'
          className='h-8 w-8 p-2'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className='sr-only'>Go to next page</span>
          <ChevronRightIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='hidden h-8 w-8 p-2 lg:flex'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className='sr-only'>Go to last page</span>
          <DoubleArrowRightIcon className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
