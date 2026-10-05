import React from 'react';
import katex from 'katex';

interface MathBlockProps {
  math: string;
  className?: string;
  caption?: string;
  theme?: 'light' | 'dark' | 'auto';
}

export function MathBlock({
  math,
  className = '',
  caption,
  theme = 'auto',
}: MathBlockProps) {
  let html = '';
  try {
    html = katex.renderToString(math, {
      displayMode: true,
      throwOnError: false,
    });
  } catch {
    html = math;
  }

  const themeClass =
    theme === 'dark'
      ? 'dark-math text-sky-300 [&_.katex-display]:bg-slate-950/90 [&_.katex-display]:border-slate-700 [&_.katex-display]:text-sky-300'
      : theme === 'light'
      ? 'text-slate-900 [&_.katex-display]:bg-slate-50 [&_.katex-display]:border-slate-200 [&_.katex-display]:text-slate-900'
      : '';

  return (
    <div className={`my-2 overflow-x-auto text-center ${themeClass} ${className}`}>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        aria-label={`Math equation: ${math}`}
      />
      {caption && (
        <p
          className={`mt-1 text-xs italic text-center ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
