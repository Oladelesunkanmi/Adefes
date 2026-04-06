import Layout from '@/src/components/Layout';
import Link from 'next/link';

export default function Checkout() {
    return (
        <Layout>
            <div className="min-h-screen bg-white">
                <div className="bg-gray-50 py-16 sm:py-24 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl font-playfair font-bold">Checkout</h1>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <p className="text-center text-gray-600 mb-8">
                        Checkout functionality coming soon. For now, please contact us via WhatsApp to complete your order.
                    </p>
                    <Link
                        href="/cart"
                        className="block text-center text-brand-gold hover:text-brand-emerald-dark font-bold uppercase"
                    >
                        ← Back to Cart
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
