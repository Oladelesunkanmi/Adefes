'use client';

import Layout from '@/src/components/Layout';
import { useCart } from '@/src/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Trash2 } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

    return (
        <Layout>
            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="bg-gray-50 py-16 sm:py-24 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl font-playfair font-bold">Shopping Bag</h1>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-32">
                            <p className="text-gray-400 font-playfair italic text-2xl mb-8">Your bag is empty</p>
                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-brand-gold text-brand-charcoal px-8 py-4 hover:bg-brand-emerald-dark hover:text-brand-ivory transition-all"
                            >
                                Continue Shopping
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Cart Items */}
                            <div className="lg:col-span-2">
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={`${item.product.id}-${item.size}`} className="flex gap-6 pb-6 border-b border-gray-100">
                                            <Image
                                                src={item.product.image_url}
                                                alt={item.product.name}
                                                width={96}
                                                height={128}
                                                className="w-24 h-32 object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg mb-2">{item.product.name}</h3>
                                                {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                                                <p className="text-brand-emerald-dark font-bold">₦{item.product.price.toLocaleString()}</p>
                                                <div className="flex items-center gap-4 mt-4">
                                                    <div className="flex items-center border border-gray-200">
                                                        <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="px-3 py-1">-</button>
                                                        <span className="px-4">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="px-3 py-1">+</button>
                                                    </div>
                                                    <button onClick={() => removeFromCart(item.product.id, item.size)} className="text-red-600 hover:text-red-800">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gray-50 p-8 h-fit">
                                <h2 className="font-bold text-lg mb-6">Order Summary</h2>
                                <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>₦{getCartTotal().toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Shipping & Handling</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                </div>
                                <Link
                                    href="/checkout"
                                    className="block w-full text-center bg-brand-gold text-brand-charcoal py-4 font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-emerald-dark hover:text-brand-ivory transition-all rounded-sm"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
