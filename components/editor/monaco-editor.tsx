'use client';

import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default MonacoEditor;
