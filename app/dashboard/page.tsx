'use client';

import { useLocale } from 'next-intl';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  XAxis,
} from 'recharts';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components//ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components//ui/chart';
import { Separator } from '@/components//ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatBytes } from '@/lib';

const UserStatisticsConfig = {
  register: {
    label: '注册',
    color: 'hsl(var(--chart-1))',
  },
  new_purchase: {
    label: '新购',
    color: 'hsl(var(--chart-2))',
  },
  repurchase: {
    label: '复购',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

const IncomeStatisticsConfig = {
  new_purchase: {
    label: '新购',
    color: 'hsl(var(--chart-1))',
  },
  repurchase: {
    label: '复购',
    color: 'hsl(var(--chart-2))',
  },
};

export default function Dashboard() {
  const locale = useLocale();
  return (
    <div className='flex flex-1 flex-col gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>统计</CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
          <div className='grid flex-1 auto-rows-min gap-0.5'>
            <div className='text-sm text-muted-foreground'>在线IP数</div>
            <div className='text-xl font-bold tabular-nums leading-none'>666</div>
          </div>
          <div className='grid flex-1 auto-rows-min gap-0.5'>
            <div className='text-sm text-muted-foreground'>在线节点数</div>
            <div className='text-xl font-bold tabular-nums leading-none'>99</div>
          </div>
          <div className='grid flex-1 auto-rows-min gap-0.5'>
            <div className='text-sm text-muted-foreground'>离线节点数</div>
            <div className='text-xl font-bold tabular-nums leading-none'>1</div>
          </div>

          <div className='grid flex-1 auto-rows-min gap-0.5'>
            <div className='text-sm text-muted-foreground'>待处理工单</div>
            <div className='text-xl font-bold tabular-nums leading-none'>1</div>
          </div>
          <div className='grid flex-1 auto-rows-min gap-0.5'>
            <div className='text-sm text-muted-foreground'>今日上传流量</div>
            <div className='text-xl font-bold tabular-nums leading-none'>
              {formatBytes(99999999999999)}
            </div>
          </div>
          <div className='grid flex-1 auto-rows-min gap-0.5'>
            <div className='text-sm text-muted-foreground'>今日下载流量</div>
            <div className='text-xl font-bold tabular-nums leading-none'>
              {formatBytes(99999999999999)}
            </div>
          </div>
          <div className='grid flex-1 auto-rows-min gap-0.5'>
            <div className='text-sm text-muted-foreground'>总上传流量</div>
            <div className='text-xl font-bold tabular-nums leading-none'>
              {formatBytes(99999999999999)}
            </div>
          </div>
          <div className='grid flex-1 auto-rows-min gap-0.5'>
            <div className='text-sm text-muted-foreground'>总下载流量</div>
            <div className='text-xl font-bold tabular-nums leading-none'>
              {formatBytes(99999999999999)}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className='grid gap-4 lg:grid-cols-3'>
        <Card>
          <CardHeader className='items-center'>
            <CardTitle>今日收入统计</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={IncomeStatisticsConfig}
              className='mx-auto aspect-square max-h-[213px]'
            >
              <PieChart>
                <ChartLegend content={<ChartLegendContent />} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={[
                    {
                      type: 'new_purchase',
                      value: 200,
                      fill: 'var(--color-new_purchase)',
                    },
                    {
                      type: 'repurchase',
                      value: 187,
                      fill: 'var(--color-repurchase)',
                    },
                  ]}
                  dataKey='value'
                  nameKey='type'
                  innerRadius={50}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor='middle'
                            dominantBaseline='middle'
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className='fill-foreground text-2xl font-bold'
                            >
                              6,666
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className='flex flex-row border-t p-4'>
            <div className='flex w-full items-center gap-2'>
              <div className='grid flex-1 auto-rows-min gap-0.5'>
                <div className='text-xs text-muted-foreground'>总收入</div>
                <div className='text-xl font-bold tabular-nums leading-none'>6,666</div>
              </div>
              <Separator orientation='vertical' className='mx-2 h-10 w-px' />
              <div className='grid flex-1 auto-rows-min gap-0.5'>
                <div className='text-xs text-muted-foreground'>
                  {IncomeStatisticsConfig.new_purchase.label}
                </div>
                <div className='text-xl font-bold tabular-nums leading-none'>123</div>
              </div>
              <Separator orientation='vertical' className='mx-2 h-10 w-px' />
              <div className='grid flex-1 auto-rows-min gap-0.5'>
                <div className='text-xs text-muted-foreground'>
                  {IncomeStatisticsConfig.repurchase.label}
                </div>
                <div className='text-xl font-bold tabular-nums leading-none'>456</div>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>本月收入统计</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={IncomeStatisticsConfig}>
              <BarChart
                accessibilityLayer
                data={[
                  { date: '2024-10-01', new_purchase: 98, repurchase: 125 },
                  { date: '2024-10-02', new_purchase: 110, repurchase: 140 },
                  { date: '2024-10-03', new_purchase: 100, repurchase: 130 },
                  { date: '2024-10-04', new_purchase: 115, repurchase: 145 },
                  { date: '2024-10-05', new_purchase: 108, repurchase: 138 },
                  { date: '2024-10-06', new_purchase: 120, repurchase: 150 },
                ]}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='date'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString(locale, {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                />
                <Bar dataKey='new_purchase' fill='var(--color-new_purchase)' radius={4} />
                <Bar dataKey='repurchase' fill='var(--color-repurchase)' radius={4} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className='flex flex-row border-t p-4'>
            <div className='flex w-full items-center gap-2'>
              <div className='grid flex-1 auto-rows-min gap-0.5'>
                <div className='text-xs text-muted-foreground'>总收入</div>
                <div className='text-xl font-bold tabular-nums leading-none'>654,321</div>
              </div>
              <Separator orientation='vertical' className='mx-2 h-10 w-px' />
              <div className='grid flex-1 auto-rows-min gap-0.5'>
                <div className='text-xs text-muted-foreground'>
                  {IncomeStatisticsConfig.new_purchase.label}
                </div>
                <div className='text-xl font-bold tabular-nums leading-none'>123</div>
              </div>
              <Separator orientation='vertical' className='mx-2 h-10 w-px' />
              <div className='grid flex-1 auto-rows-min gap-0.5'>
                <div className='text-xs text-muted-foreground'>
                  {IncomeStatisticsConfig.repurchase.label}
                </div>
                <div className='text-xl font-bold tabular-nums leading-none'>456</div>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>收入统计</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={IncomeStatisticsConfig}>
              <AreaChart
                accessibilityLayer
                data={[
                  { date: '2024-07', new_purchase: 98, repurchase: 125 },
                  { date: '2024-08', new_purchase: 110, repurchase: 140 },
                  { date: '2024-09', new_purchase: 100, repurchase: 130 },
                  { date: '2024-10', new_purchase: 115, repurchase: 145 },
                  { date: '2024-11', new_purchase: 108, repurchase: 138 },
                  { date: '2024-12', new_purchase: 120, repurchase: 150 },
                ]}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='date'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString(locale, {
                      month: 'short',
                    });
                  }}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dot' />} />
                <Area
                  dataKey='new_purchase'
                  type='natural'
                  fill='var(--color-new_purchase)'
                  fillOpacity={0.4}
                  stroke='var(--color-new_purchase)'
                  stackId='a'
                />
                <Area
                  dataKey='repurchase'
                  type='natural'
                  fill='var(--color-repurchase)'
                  fillOpacity={0.4}
                  stroke='var(--color-repurchase)'
                  stackId='a'
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className='flex flex-row border-t p-4'>
            <div className='flex w-full items-center gap-2'>
              <div className='grid flex-1 auto-rows-min gap-0.5'>
                <div className='text-xs text-muted-foreground'>总收入</div>
                <div className='text-xl font-bold tabular-nums leading-none'>987,654,321</div>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className='items-center'>
            <CardTitle>今日用户统计</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={UserStatisticsConfig}
              className='mx-auto aspect-square max-h-[213px]'
            >
              <PieChart>
                <ChartLegend content={<ChartLegendContent />} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={[
                    {
                      type: 'register',
                      value: 275,
                      fill: 'var(--color-register)',
                    },
                    {
                      type: 'new_purchase',
                      value: 200,
                      fill: 'var(--color-new_purchase)',
                    },
                    {
                      type: 'repurchase',
                      value: 187,
                      fill: 'var(--color-repurchase)',
                    },
                  ]}
                  dataKey='value'
                  nameKey='type'
                  innerRadius={50}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor='middle'
                            dominantBaseline='middle'
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className='fill-foreground text-3xl font-bold'
                            >
                              275
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className='flex flex-row border-t p-4'>
            <div className='flex w-full items-center gap-2'>
              <div className='grid flex-1 auto-rows-min gap-0.5'>
                <div className='text-xs text-muted-foreground'>
                  {UserStatisticsConfig.register.label}
                </div>
                <div className='text-xl font-bold tabular-nums leading-none'>789</div>
              </div>
              <Separator orientation='vertical' className='mx-2 h-10 w-px' />
              <div className='grid flex-1 auto-rows-min gap-0.5'>
                <div className='text-xs text-muted-foreground'>
                  {UserStatisticsConfig.new_purchase.label}
                </div>
                <div className='text-xl font-bold tabular-nums leading-none'>123</div>
              </div>
              <Separator orientation='vertical' className='mx-2 h-10 w-px' />
              <div className='grid flex-1 auto-rows-min gap-0.5'>
                <div className='text-xs text-muted-foreground'>
                  {UserStatisticsConfig.repurchase.label}
                </div>
                <div className='text-xl font-bold tabular-nums leading-none'>456</div>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>本月用户统计</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={UserStatisticsConfig}>
              <BarChart
                accessibilityLayer
                data={[
                  { date: '2024-10-01', register: 215, new_purchase: 98, repurchase: 125 },
                  { date: '2024-10-02', register: 240, new_purchase: 110, repurchase: 140 },
                  { date: '2024-10-03', register: 225, new_purchase: 100, repurchase: 130 },
                  { date: '2024-10-04', register: 250, new_purchase: 115, repurchase: 145 },
                  { date: '2024-10-05', register: 235, new_purchase: 108, repurchase: 138 },
                  { date: '2024-10-06', register: 260, new_purchase: 120, repurchase: 150 },
                ]}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='date'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString(locale, {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                />
                <Bar dataKey='register' fill='var(--color-register)' radius={4} />
                <Bar dataKey='new_purchase' fill='var(--color-new_purchase)' radius={4} />
                <Bar dataKey='repurchase' fill='var(--color-repurchase)' radius={4} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className='flex flex-row border-t p-4'>
            <div className='flex w-full items-center gap-2'>
              <div className='grid flex-1 auto-rows-min gap-0.5'>
                <div className='text-xs text-muted-foreground'>
                  {UserStatisticsConfig.register.label}
                </div>
                <div className='text-xl font-bold tabular-nums leading-none'>789</div>
              </div>
              <Separator orientation='vertical' className='mx-2 h-10 w-px' />
              <div className='grid flex-1 auto-rows-min gap-0.5'>
                <div className='text-xs text-muted-foreground'>
                  {UserStatisticsConfig.new_purchase.label}
                </div>
                <div className='text-xl font-bold tabular-nums leading-none'>123</div>
              </div>
              <Separator orientation='vertical' className='mx-2 h-10 w-px' />
              <div className='grid flex-1 auto-rows-min gap-0.5'>
                <div className='text-xs text-muted-foreground'>
                  {UserStatisticsConfig.repurchase.label}
                </div>
                <div className='text-xl font-bold tabular-nums leading-none'>456</div>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>用户统计</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={UserStatisticsConfig}>
              <AreaChart
                accessibilityLayer
                data={[
                  { date: '2024-07', register: 215, new_purchase: 98, repurchase: 125 },
                  { date: '2024-08', register: 240, new_purchase: 110, repurchase: 140 },
                  { date: '2024-09', register: 225, new_purchase: 100, repurchase: 130 },
                  { date: '2024-10', register: 250, new_purchase: 115, repurchase: 145 },
                  { date: '2024-11', register: 235, new_purchase: 108, repurchase: 138 },
                  { date: '2024-12', register: 260, new_purchase: 120, repurchase: 150 },
                ]}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='date'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString(locale, {
                      month: 'short',
                    });
                  }}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dot' />} />
                <Area
                  dataKey='register'
                  type='natural'
                  fill='var(--color-register)'
                  fillOpacity={0.4}
                  stroke='var(--color-register)'
                  stackId='a'
                />
                <Area
                  dataKey='new_purchase'
                  type='natural'
                  fill='var(--color-new_purchase)'
                  fillOpacity={0.4}
                  stroke='var(--color-new_purchase)'
                  stackId='a'
                />
                <Area
                  dataKey='repurchase'
                  type='natural'
                  fill='var(--color-repurchase)'
                  fillOpacity={0.4}
                  stroke='var(--color-repurchase)'
                  stackId='a'
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className='flex flex-row border-t p-4'>
            <div className='flex w-full items-center gap-2'>
              <div className='grid flex-1 auto-rows-min gap-0.5'>
                <div className='text-xs text-muted-foreground'>
                  {UserStatisticsConfig.register.label}
                </div>
                <div className='text-xl font-bold tabular-nums leading-none'>987,654,321</div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
        <Card className='xl:col-span-2'>
          <CardHeader>
            <CardTitle>今日节点流量排行</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>类型</TableHead>
                  <TableHead>节点</TableHead>
                  <TableHead className='text-right'>流量</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {new Array(10)
                  .toString()
                  .split(',')
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Badge>Trojan</Badge>
                      </TableCell>
                      <TableCell>
                        <div className='font-medium'>节点名称</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>
                          127.0.0.1:443
                        </div>
                      </TableCell>
                      <TableCell className='text-right'>1,000 GB</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>今日用户流量排行</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-4'>
            {new Array(15)
              .toString()
              .split(',')
              .map((item, index) => (
                <div className='flex items-center gap-4' key={index}>
                  <div className='text-sm font-medium leading-none'>olivia.martin@email.com</div>
                  <div className='ml-auto font-medium'>100 GB</div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
