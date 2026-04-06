import Layout from '@/src/components/Layout';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function OrderSuccess({ params }) {
    return (
        <Layout>
            <div className="min-h-screen bg-white flex items-center">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-5xl font-playfair font-bold mb-4">Order Confirmed!</h1>
                    <p className="text-xl text-gray-600 mb-6">
                        Thank you for your purchase. Your order has been received and we&apos;ll start processing it right away.
                    </p>
                    <p className="text-lg text-gray-500 mb-8">
                        Order ID: <span className="font-bold">{params.id}</span>
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-brand-gold text-brand-charcoal px-8 py-4 hover:bg-brand-emerald-dark hover:text-brand-ivory transition-all"
                    >
                        Return to Home
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
