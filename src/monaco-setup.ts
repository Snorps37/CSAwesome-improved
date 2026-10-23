// Bundle Monaco locally (no CDN) with only the Java grammar and the base worker.
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/editor/editor.worker?worker';

(self as unknown as { MonacoEnvironment: unknown }).MonacoEnvironment = {
  getWorker: () => new EditorWorker(),
};

monaco.editor.defineTheme('void', {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '5a5a64', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'a78bfa' },
    { token: 'string', foreground: '86efac' },
    { token: 'number', foreground: 'fdba74' },
    { token: 'type.identifier', foreground: '67e8f9' },
    { token: 'delimiter', foreground: '8a8a93' },
  ],
  colors: {
    'editor.background': '#000000',
    'editor.foreground': '#e4e4e7',
    'editorGutter.background': '#000000',
    'editorLineNumber.foreground': '#3a3a42',
    'editorLineNumber.activeForeground': '#8a8a93',
    'editor.lineHighlightBackground': '#0c0c0f',
    'editor.lineHighlightBorder': '#00000000',
    'editor.selectionBackground': '#67e8f933',
    'editorCursor.foreground': '#67e8f9',
    'editorIndentGuide.background1': '#14141a',
    'editorWidget.background': '#08080a',
    'editorSuggestWidget.background': '#08080a',
    'scrollbarSlider.background': '#ffffff10',
    'scrollbarSlider.hoverBackground': '#ffffff1c',
  },
});

loader.config({ monaco });
