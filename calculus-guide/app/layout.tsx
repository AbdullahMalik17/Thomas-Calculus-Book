import type { Metadata } from 'next';
import 'katex/dist/katex.min.css';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: "Thomas' Calculus Study Guide | Interactive & Verifiable",
  description:
    "A clear, step-by-step study companion for Thomas' Calculus with concept notes, worked examples, progressive hints, and practice.",
  authors: [
    {
      name: 'Muhammad Abdullah Athar',
      url: 'https://github.com/AbdullahMalik17',
    },
  ],
  creator: 'Muhammad Abdullah Athar',
  publisher: 'Muhammad Abdullah Athar',
  metadataBase: new URL('https://github.com/AbdullahMalik17/Thomas-Calculus-Book'),
  openGraph: {
    title: "Thomas' Calculus Study Guide | Interactive & Verifiable",
    description:
      "Interactive Next.js study platform for Thomas' Calculus (14th Edition) created by Muhammad Abdullah Athar.",
    type: 'website',
    locale: 'en_US',
    siteName: "Thomas' Calculus Guide",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalWebSite',
    name: "Thomas' Calculus Study Guide",
    url: 'https://github.com/AbdullahMalik17/Thomas-Calculus-Book',
    description:
      "A clear study companion with section notes, worked examples, progressive practice hints, and symbolic math checks.",
    author: {
      '@type': 'Person',
      name: 'Muhammad Abdullah Athar',
      url: 'https://github.com/AbdullahMalik17',
    },
    creator: {
      '@type': 'Person',
      name: 'Muhammad Abdullah Athar',
      url: 'https://github.com/AbdullahMalik17',
    },
    publisher: {
      '@type': 'Person',
      name: 'Muhammad Abdullah Athar',
      url: 'https://github.com/AbdullahMalik17',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased font-sans">
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-md bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
