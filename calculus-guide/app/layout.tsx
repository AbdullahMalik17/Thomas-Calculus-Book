import type { Metadata } from 'next';
import 'katex/dist/katex.min.css';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: "Thomas' Calculus Study Guide | Interactive & Verifiable",
  description:
    "Interactive Next.js study platform for Thomas' Calculus (14th Edition) with verifiable math, automated validation pipelines, and verified Golden Examples.",
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
      "Interactive study guide and verifiable math platform for Thomas' Calculus 14th Edition with automated validation pipelines.",
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
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
