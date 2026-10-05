import React from 'react';
import katex from 'katex';

interface InlineMathProps {
  math: string;
  className?: string;
}

export function InlineMath({ math, className = '' }: InlineMathProps) {
  let html = '';
  try {
    html = katex.renderToString(math, {
      displayMode: false,
      throwOnError: false,
    });
  } catch {
    html = math;
  }

  return (
    <span
      className={`inline-block px-0.5 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      aria-label={`Inline formula: ${math}`}
    />
  );
}
