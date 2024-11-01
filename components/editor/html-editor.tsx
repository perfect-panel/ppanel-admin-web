'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import MonacoEditor from './monaco-editor';

interface HTMLEditorProps {
  value?: string;
  onSave?: (value: string) => boolean | void | Promise<boolean | void>;
  placeholder?: string;
  title?: string;
}

export function HTMLEditor({ value, onSave, placeholder, title = 'Edit HTML' }: HTMLEditorProps) {
  const t = useTranslations('common.editor');
  const { resolvedTheme } = useTheme();
  const [internalValue, setInternalValue] = useState(value || '');
  const [open, setOpen] = useState(false);
  const editorRef = useRef<unknown>();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  const updateIframeContent = useCallback(() => {
    if (iframeRef.current && isEditorReady) {
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        iframeDocument.open();
        iframeDocument.write(internalValue || placeholder || '');
        iframeDocument.close();
      }
    }
  }, [internalValue, placeholder, isEditorReady]);

  useEffect(() => {
    if (isEditorReady) {
      updateIframeContent();
    }
  }, [internalValue, updateIframeContent, isEditorReady]);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleSave = async () => {
    if (onSave) {
      const success = (await onSave(internalValue)) || true;
      if (success) setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size='sm'>{t('edit')}</Button>
      </SheetTrigger>
      <SheetContent className='flex w-screen !max-w-full flex-col'>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className='flex h-full flex-col md:flex-row'>
          <div className='h-1/2 w-full md:h-full md:w-1/2'>
            <MonacoEditor
              language='html'
              theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
              value={internalValue}
              onChange={(newValue) => setInternalValue(newValue || '')}
              options={{
                automaticLayout: true,
                formatOnPaste: true,
                formatOnType: true,
                tabSize: 2,
                wordWrap: 'on',
                minimap: { enabled: false },
              }}
              onMount={(editor) => {
                editorRef.current = editor;
                setIsEditorReady(true);
              }}
            />
          </div>

          <div className='h-1/2 w-full p-4 md:h-full md:w-1/2'>
            <iframe ref={iframeRef} title='HTML Preview' className='h-full w-full border-0' />
          </div>
        </div>
        <SheetFooter className='flex justify-end gap-2'>
          <Button variant='outline' onClick={() => setOpen(false)}>
            {t('cancel')}
          </Button>
          <Button onClick={handleSave}>{t('confirm')}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
