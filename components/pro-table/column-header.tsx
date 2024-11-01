import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import { flexRender, Header } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib';

interface ColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  header: Header<TData, TValue>;
}

export function ColumnHeader<TData, TValue>({
  header,
  className,
}: ColumnHeaderProps<TData, TValue>) {
  const t = useTranslations('common.table');
  const column = header.column;
  const title = header.isPlaceholder
    ? null
    : flexRender(header.column.columnDef.header, header.getContext());
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex w-full items-center', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='flex h-8 w-full justify-start !bg-transparent p-0 text-sm'
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className='ml-2 h-4 w-4' />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className='ml-2 h-4 w-4' />
            ) : (
              <CaretSortIcon className='ml-2 h-4 w-4' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            {t('asc')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            {t('desc')}
          </DropdownMenuItem>
          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeNoneIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                {t('hide')}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
