// Bundle Monaco locally (no CDN) with only the Java grammar and the base worker.
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { getSettings, subscribe, type Settings } from './settings';
import EditorWorker from 'monaco-editor/editor/editor.worker?worker';

(self as unknown as { MonacoEnvironment: unknown }).MonacoEnvironment = {
  getWorker: () => new EditorWorker(),
};

function applyTheme({ colors: c, accent: a }: Settings) {
  monaco.editor.defineTheme('void', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: '', foreground: c.text },
      { token: 'comment', foreground: c.comment, fontStyle: 'italic' },
      { token: 'keyword', foreground: c.keyword },
      { token: 'string', foreground: c.string },
      { token: 'number', foreground: c.number },
      { token: 'type.identifier', foreground: c.type },
      { token: 'delimiter', foreground: c.delimiter },
      { token: 'delimiter.bracket', foreground: c.delimiter },
      { token: 'delimiter.parenthesis', foreground: c.delimiter },
      { token: 'delimiter.square', foreground: c.delimiter },
      { token: 'delimiter.curly', foreground: c.delimiter },
      { token: 'delimiter.angle', foreground: c.delimiter },
    ],
    colors: {
      'editor.background': '#000000',
      'editor.foreground': '#' + c.text,
      'editorGutter.background': '#000000',
      'editorLineNumber.foreground': '#3a3a42',
      'editorLineNumber.activeForeground': '#8a8a93',
      'editor.lineHighlightBackground': '#0c0c0f',
      'editor.lineHighlightBorder': '#00000000',
      'editor.selectionBackground': '#' + a + '33',
      'editorCursor.foreground': '#' + a,
      'editorIndentGuide.background1': '#14141a',
      'editorWidget.background': '#08080a',
      'editorSuggestWidget.background': '#08080a',
      'scrollbarSlider.background': '#ffffff10',
      'scrollbarSlider.hoverBackground': '#ffffff1c',
    },
  });
  monaco.editor.setTheme('void');
}

let lastColors = getSettings().colors;
let lastAccent = getSettings().accent;
applyTheme(getSettings());
subscribe(() => {
  const s = getSettings();
  if (s.colors !== lastColors || s.accent !== lastAccent) { lastColors = s.colors; lastAccent = s.accent; applyTheme(s); }
});

loader.config({ monaco });
