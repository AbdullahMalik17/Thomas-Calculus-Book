import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          0: 'var(--surface-0)',
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
        },
        ink: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)',
        },
        brand: {
          primary: 'var(--color-primary)',
          'primary-hover': 'var(--color-primary-hover)',
          accent: 'var(--color-accent)',
          'accent-hover': 'var(--color-accent-hover)',
          'accent-subtle': 'var(--color-accent-subtle)',
        },
        hairline: 'var(--border-hairline)',
        specular: 'var(--border-specular)',
        callout: {
          theorem: {
            bg: 'var(--callout-theorem-bg)',
            border: 'var(--callout-theorem-border)',
            ink: 'var(--callout-theorem-ink)',
          },
          definition: {
            bg: 'var(--callout-definition-bg)',
            border: 'var(--callout-definition-border)',
            ink: 'var(--callout-definition-ink)',
          },
          example: {
            bg: 'var(--callout-example-bg)',
            border: 'var(--callout-example-border)',
            ink: 'var(--callout-example-ink)',
          },
          misconception: {
            bg: 'var(--callout-misconception-bg)',
            border: 'var(--callout-misconception-border)',
            ink: 'var(--callout-misconception-ink)',
          },
        },
        paper: {
          page: 'var(--surface-0)',
          shade: 'var(--surface-2)',
          edge: 'var(--border-hairline)',
          ink: 'var(--text-primary)',
          muted: 'var(--text-muted)',
        },
        math: {
          primary: 'var(--color-primary)',
          accent: 'var(--color-accent)',
          theorem: 'var(--callout-theorem-border)',
          definition: 'var(--callout-definition-border)',
          example: 'var(--callout-example-border)',
          misconception: 'var(--callout-misconception-border)',
          warning: 'var(--callout-misconception-border)',
          success: 'var(--callout-theorem-border)',
          surface: 'var(--surface-2)',
        },
      },
      fontFamily: {
        reading: [
          'Charter',
          '"Bitstream Charter"',
          '"Iowan Old Style"',
          '"Cormorant"',
          'Georgia',
          '"Palatino Linotype"',
          '"Book Antiqua"',
          '"Times New Roman"',
          'serif',
        ],
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      letterSpacing: {
        display: '-0.02em',
      },
      maxWidth: {
        'prose-tight': '65ch',
        'prose-reading': '68ch',
        'prose-wide': '72ch',
      },
    },
  },
  plugins: [],
};

export default config;
