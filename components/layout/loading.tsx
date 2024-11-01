import { Loading, RocketLoading } from '@/components/lotties';
import { cn } from '@/lib';

export default function Load({ className }: { className: string }) {
  return (
    <section className={cn('flex size-full flex-col items-center justify-center gap-8', className)}>
      <div className='overflow-hidden md:w-3/5'>
        <RocketLoading className='-my-[10%] scale-125' />
      </div>
      <div className='md:3/5 w-full overflow-hidden pb-16'>
        <Loading className='h-16' />
      </div>
    </section>
  );
}
