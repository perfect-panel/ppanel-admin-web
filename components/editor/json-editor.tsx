'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

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

type SchemaType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null';
interface SchemaProperty {
  type: SchemaType;
  items?: SchemaProperty;
  properties?: Record<string, SchemaProperty>;
}

const generateSchema = (obj: Record<string, unknown>): Record<string, SchemaProperty> => {
  const properties: Record<string, SchemaProperty> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      properties[key] = {
        type: 'array',
        items: value.length > 0 ? generateSchema({ item: value[0] }).item : { type: 'null' },
      };
    } else if (typeof value === 'object' && value !== null) {
      properties[key] = {
        type: 'object',
        properties: generateSchema(value as Record<string, unknown>),
      };
    } else {
      properties[key] = { type: typeof value as SchemaType };
    }
  }
  return properties;
};

interface JSONEditorProps {
  value?: string;
  onSave?: (value?: string | Record<string, unknown>) => boolean | void | Promise<boolean | void>;
  placeholder: Record<string, unknown>;
  title?: string;
  trigger?: string;
  schema?: Record<string, unknown>;
}

export function JSONEditor({
  value,
  onSave,
  placeholder = {},
  schema,
  title = 'Edit JSON',
  trigger,
}: JSONEditorProps) {
  const t = useTranslations('common.editor');
  const { resolvedTheme } = useTheme();

  const [internalValue, setInternalValue] = useState<string>();
  const [open, setOpen] = useState(false);
  const editorRef = useRef<unknown>();

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleSave = async () => {
    if (!internalValue) return setOpen(false);
    try {
      const parsedValue = JSON.parse(internalValue);
      if (onSave) {
        const success = (await onSave(JSON.stringify(parsedValue, null, 2))) || true;
        if (success) setOpen(false);
      }
    } catch (error) {
      toast.error(t('invalidJSON'));
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size='sm' type='button'>
          {trigger || t('edit')}
        </Button>
      </SheetTrigger>
      <SheetContent className='flex w-[500px] max-w-full flex-col md:max-w-screen-md'>
        <SheetHeader className='flex-1'>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className='relative flex-auto'>
          {!internalValue && (
            <pre className='pointer-events-none absolute -top-2 left-14 z-10 p-2 text-sm text-muted-foreground'>
              {JSON.stringify(
                placeholder && typeof placeholder === 'object' ? placeholder : {},
                null,
                2,
              )}
            </pre>
          )}
          <MonacoEditor
            language='json'
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
            onMount={(editor, monaco) => {
              editorRef.current = editor;

              monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                validate: true,
                schemas: [
                  {
                    uri: 'http://my-schema.json',
                    fileMatch: ['*'],
                    schema: schema || {
                      $schema: 'http://json-schema.org/draft-07/schema#',
                      type: 'object',
                      properties: placeholder && generateSchema(placeholder),
                    },
                  },
                ],
              });
            }}
          />
        </div>
        <SheetFooter className='flex flex-1 justify-end gap-2'>
          <Button type='button' variant='outline' onClick={() => setOpen(false)}>
            {t('cancel')}
          </Button>
          <Button type='button' onClick={handleSave}>
            {t('confirm')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
