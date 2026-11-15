import React from 'react';
import katex from 'katex';

interface MathBlockProps {
  math: string;
  className?: string;
  caption?: string;
  theme?: 'light' | 'dark' | 'auto';
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripOuterMathDelimiters(input: string): string {
  const s = input.trim();
  if (s.startsWith('$$') && s.endsWith('$$') && s.length >= 4) {
    return s.slice(2, -2).trim();
  }
  if (s.startsWith('$') && s.endsWith('$') && s.length >= 2 && !s.slice(1, -1).includes('$')) {
    return s.slice(1, -1).trim();
  }
  return s;
}

export function MathBlock({
  math,
  className = '',
  caption,
  theme = 'auto',
}: MathBlockProps) {
  const normalized = stripOuterMathDelimiters(String(math ?? ''));
  let html = '';
  try {
    html = katex.renderToString(normalized, {
      displayMode: true,
      throwOnError: false,
      strict: 'ignore',
      trust: false,
    });
  } catch {
    html = escapeHtml(normalized);
  }

  const themeClass =
    theme === 'dark'
      ? 'dark-math text-sky-300 [&_.katex-display]:bg-slate-950/90 [&_.katex-display]:border-slate-700 [&_.katex-display]:text-sky-300'
      : theme === 'light'
      ? 'text-slate-900 [&_.katex-display]:bg-slate-50 [&_.katex-display]:border-slate-200 [&_.katex-display]:text-slate-900'
      : '';

  return (
    <figure className={`my-2 min-w-0 text-center ${themeClass} ${className}`.trim()}>
      <div
        className="math-block-scroll"
        dangerouslySetInnerHTML={{ __html: html }}
        suppressHydrationWarning
      />
      {caption && (
        <figcaption
          className={`mt-1 text-xs italic text-center ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
