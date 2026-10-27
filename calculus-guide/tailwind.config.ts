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
        paper: {
          page: '#fdfbf6',
          shade: '#f6f1e7',
          edge: '#e5dcc9',
          ink: '#292018',
          muted: '#6d6357',
        },
        math: {
          primary: '#1e3a8a',
          accent: '#0284c7',
          theorem: '#0f766e',
          example: '#4338ca',
          warning: '#d97706',
          success: '#15803d',
          surface: '#f8fafc',
        },
      },
      fontFamily: {
        reading: [
          'Charter',
          '"Bitstream Charter"',
          '"Iowan Old Style"',
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
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
