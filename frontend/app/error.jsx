'use client';

import Link from 'next/link';

export default function GlobalError({ reset }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
      <div className="max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">Something went wrong</p>
        <h1 className="text-5xl sm:text-6xl font-playfair font-bold mb-6">Oops</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          An unexpected error occurred while loading this page. Please try again or return home.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] bg-brand-gold text-brand-charcoal hover:bg-brand-emerald-dark hover:text-brand-ivory transition-all rounded-sm"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] border border-brand-gold text-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal transition-all rounded-sm"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
