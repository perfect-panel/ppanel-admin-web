import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex size-full'>
      <Sidebar />
      <section className='flex-1 overflow-hidden'>
        <Header />
        <ScrollArea className='h-[calc(100vh-54px-env(safe-area-inset-top))] overflow-hidden'>
          <div className='h-full p-4 md:px-8'>{children}</div>
        </ScrollArea>
      </section>
    </main>
  );
}
