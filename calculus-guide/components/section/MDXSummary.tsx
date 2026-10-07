import * as runtime from 'react/jsx-runtime';
import { evaluate } from '@mdx-js/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import type { MDXComponents } from 'mdx/types';

const components: MDXComponents = {
  h1: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
  h2: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
  h3: ({ children, ...props }) => <h4 {...props}>{children}</h4>,
};

export async function MDXSummary({ source }: { source: string }) {
  const { default: Summary } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  });

  return <Summary components={components} />;
}
