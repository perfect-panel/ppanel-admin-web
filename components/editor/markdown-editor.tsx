'use client';

import dynamic from 'next/dynamic';

import 'react-markdown-editor-lite/lib/index.css';
import './markdown-editor.css';

const MarkdownEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

export default MarkdownEditor;
