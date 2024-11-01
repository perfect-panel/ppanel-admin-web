'use client';

import { useTheme } from 'next-themes';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib';

export default function Markdown({ children }: { children: string }) {
  const { resolvedTheme } = useTheme();

  return (
    <ReactMarkdown
      className='prose max-w-none dark:prose-invert prose-a:!text-primary prose-pre:!m-0 prose-pre:!bg-transparent prose-pre:!p-0'
      // @ts-ignore
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code(props) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { children, className, node, ref, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <ScrollArea className='w-full'>
              <SyntaxHighlighter
                {...rest}
                PreTag='div'
                language={match?.[1]}
                style={resolvedTheme === 'dark' ? oneDark : oneLight}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          ) : (
            <code {...rest} className={cn(className, 'rounded !px-2 before:hidden after:hidden')}>
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
