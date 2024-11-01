'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { ListRestart, Loader, RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { Fragment, useEffect, useImperativeHandle, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Empty from '../customize/empty';
import { ColumnFilter, IParams } from './column-filter';
import { ColumnHeader } from './column-header';
import { ColumnToggle } from './column-toggle';
import { Pagination } from './pagination';

interface ProTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  request: (
    pagination: {
      page: number;
      size: number;
    },
    filter: TValue,
  ) => Promise<{ list: TData[]; total: number }>;
  params?: IParams[];
  header?: {
    title?: React.ReactNode;
    toolbar?: React.ReactNode | React.ReactNode[];
  };
  actions?: {
    render?: (row: TData) => React.ReactNode[];
    batchRender?: (rows: TData[]) => React.ReactNode[];
  };
  action?: React.Ref<ProTableActions | undefined>;
}
export interface ProTableActions {
  refresh: () => void;
  reset: () => void;
}

export function ProTable<TData, TValue extends Record<string, unknown>>({
  columns,
  request,
  params,
  header,
  actions,
  action,
}: ProTableProps<TData, TValue>) {
  const t = useTranslations('common.table');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<TData[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });
  const [loading, setLoading] = useState(false);

  const table = useReactTable({
    data,
    columns: [
      ...(actions?.batchRender ? [createSelectColumn<TData, TValue>()] : []),
      ...columns,
      ...(actions?.render
        ? ([
            {
              id: 'actions',
              header: t('actions'),
              cell: ({ row }) => (
                <div className='flex items-center justify-end gap-2'>
                  {actions
                    ?.render?.(row.original)
                    .map((item, index) => <Fragment key={index}>{item}</Fragment>)}
                </div>
              ),
              enableSorting: false,
              enableHiding: false,
            },
          ] as ColumnDef<TData, TValue>[])
        : []),
    ],
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    manualPagination: true,
    manualFiltering: true,
    rowCount: rowCount,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await request(
        {
          page: pagination.pageIndex + 1,
          size: pagination.pageSize,
        },
        Object.fromEntries(columnFilters.map((item) => [item.id, item.value])) as TValue,
      );
      setData(response.list);
      setRowCount(response.total);
    } catch (error) {
      console.error('Fetch data error:', error);
    } finally {
      setLoading(false);
    }
  };
  const reset = async () => {
    table.resetSorting();
    table.resetColumnFilters();
    table.resetGlobalFilter(true);
    table.resetColumnVisibility();
    table.resetRowSelection();
    table.resetPagination();
  };

  useImperativeHandle(action, () => ({
    refresh: fetchData,
    reset,
  }));

  useEffect(() => {
    fetchData();
  }, [pagination.pageIndex, pagination.pageSize, columnFilters]);

  const selectedRows = table.getSelectedRowModel().flatRows.map((row) => row.original);
  const selectedCount = selectedRows.length;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap-reverse items-center justify-between gap-4'>
        <div>
          {params ? (
            <ColumnFilter
              table={table}
              params={params}
              filters={Object.fromEntries(columnFilters.map((item) => [item.id, item.value]))}
            />
          ) : (
            header?.title
          )}
        </div>
        <div className='flex flex-1 items-center justify-end gap-2'>
          <Button variant='outline' className='h-8 w-8 p-2' onClick={fetchData}>
            <RefreshCcw className='h-4 w-4' />
          </Button>
          <ColumnToggle table={table} />
          <Button variant='outline' className='h-8 w-8 p-2' onClick={reset}>
            <ListRestart className='h-4 w-4' />
          </Button>
          {header?.toolbar}
        </div>
      </div>

      {selectedCount > 0 && actions?.batchRender && (
        <BatchActionsSection<TData> selectedRows={selectedRows} batchRender={actions.batchRender} />
      )}

      <div className='relative w-[calc(100vw-32px-env(safe-area-inset-top))] overflow-x-auto rounded-md border md:w-auto'>
        <Table className='w-full'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={getTableHeaderClass(header.column.id)}>
                    <ColumnHeader header={header} />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className=''>
            {table.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={getTableCellClass(cell.column.id)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 2} className='py-24'>
                  <Empty />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {loading && (
          <div className='absolute top-0 z-20 flex h-full w-full items-center justify-center bg-muted/80'>
            <Loader className='h-4 w-4 animate-spin' />
          </div>
        )}
      </div>
      {rowCount > 0 && <Pagination table={table} />}
    </div>
  );
}

function createSelectColumn<TData, TValue>(): ColumnDef<TData, TValue> {
  return {
    id: 'selected',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

function BatchActionsSection<TData>({
  selectedRows,
  batchRender,
}: {
  selectedRows: TData[];
  batchRender: (rows: TData[]) => React.ReactNode[];
}) {
  const t = useTranslations('common.table');
  return (
    <Alert className='flex items-center justify-between'>
      <AlertTitle className='m-0'>{t('selectedItems', { total: selectedRows.length })}</AlertTitle>
      <AlertDescription className='flex gap-2'>
        {batchRender(selectedRows.map((row) => row)).map((item, index) => (
          <Fragment key={index}>{item}</Fragment>
        ))}
      </AlertDescription>
    </Alert>
  );
}

function getTableHeaderClass(columnId: string) {
  if (columnId === 'selected') {
    return 'sticky left-0 z-10 bg-background shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] [&:has([role=checkbox])]:pr-2';
  } else if (columnId === 'actions') {
    return 'sticky right-0 z-10 text-right bg-background shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)]';
  }
  return 'truncate';
}

function getTableCellClass(columnId: string) {
  if (columnId === 'selected') {
    return 'sticky left-0 bg-background shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]';
  } else if (columnId === 'actions') {
    return 'sticky right-0 bg-background shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)]';
  }
  return 'truncate';
}
