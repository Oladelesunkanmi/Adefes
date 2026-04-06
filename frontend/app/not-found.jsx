import Link from 'next/link';
import Layout from '@/src/components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-xl text-center px-6 py-20">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">Page not found</p>
          <h1 className="text-5xl sm:text-6xl font-playfair font-bold mb-6">404</h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            The page you are looking for does not exist or has been moved. Let us take you back to the boutique.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] bg-brand-gold text-brand-charcoal px-8 py-4 hover:bg-brand-emerald-dark hover:text-brand-ivory transition-all rounded-sm"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
