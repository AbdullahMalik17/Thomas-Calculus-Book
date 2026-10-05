import React from 'react';
import Link from 'next/link';
import { BookOpen, Compass, CheckCircle2, Award, LayoutDashboard, Info } from 'lucide-react';

export function Header() {
  const navItems = [
    { label: 'Chapters', href: '/chapters/ch01', icon: BookOpen },
    { label: 'Practice', href: '/practice/1.1-functions-and-graphs', icon: Compass },
    { label: 'Quizzes', href: '/quiz/ch01', icon: Award },
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'About', href: '/about', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-blue-800 transition-colors">
                &int;dx
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
                  Thomas&apos; Calculus
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Interactive Study Guide
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-700 hover:bg-slate-50 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/chapters/ch01/1.1-functions-and-graphs"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 shadow-sm transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Section 1.1 Standard</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
