import React from 'react';
import katex from 'katex';

interface InlineMathProps {
  math: string;
  className?: string;
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

export function InlineMath({ math, className = '' }: InlineMathProps) {
  const normalized = stripOuterMathDelimiters(String(math ?? ''));
  let html = '';
  try {
    html = katex.renderToString(normalized, {
      displayMode: false,
      throwOnError: false,
      strict: 'ignore',
      trust: false,
    });
  } catch {
    html = escapeHtml(normalized);
  }

  return (
    <span
      className={`inline-block px-0.5 ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
      aria-label={`Inline formula: ${normalized}`}
      suppressHydrationWarning
    />
  );
}
