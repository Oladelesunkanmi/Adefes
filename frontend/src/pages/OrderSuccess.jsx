import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const OrderSuccess = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircle className="h-16 w-16 text-green-600" />
                    </div>
                </div>
                <h1 className="text-4xl font-playfair font-bold mb-4">Thank You!</h1>
                <p className="text-gray-600 mb-8">
                    Your Adefes order has been placed successfully! Our master tailors will begin crafting your piece. We've sent a confirmation to your inbox.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Order Number</p>
                    <p className="text-xl font-mono font-bold">#ADF-{id?.padStart(6, '0')}</p>
                </div>
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/shop')}
                        className="w-full bg-brand-gold text-brand-charcoal py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-emerald-dark hover:text-brand-ivory hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 rounded-sm"
                    >
                        Continue Shopping
                        <ArrowRight className="h-4 w-4" />
                    </button>
                    <Link
                        to="/orders"
                        className="block text-sm font-medium text-gray-600 hover:text-black underline"
                    >
                        View Order History
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
