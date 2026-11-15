import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-hairline bg-surface-1 py-8 mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink-secondary">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span className="font-reading font-bold tracking-display text-ink-primary">
              Thomas&apos; Calculus (14th Edition) Interactive Study Guide
            </span>
            <span className="hidden sm:inline text-ink-muted">|</span>
            <span className="text-sm text-ink-secondary">
              Clear notes, worked examples, and practice
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-ink-secondary hover:text-ink-primary transition-colors"
            >
              About &amp; Safeguards
            </Link>
            <a
              href="https://github.com/AbdullahMalik17"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-primary hover:text-brand-accent underline underline-offset-4 transition-colors"
              aria-label="GitHub profile of Muhammad Abdullah Athar"
            >
              Made by Muhammad Abdullah Athar
            </a>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-hairline flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-2">
          <p>
            Educational study companion. All problems are original or paraphrased with identifiers (no verbatim textbook text).
          </p>
          <p className="font-mono tabular-nums">
            &copy; {new Date().getFullYear()} Muhammad Abdullah Athar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
