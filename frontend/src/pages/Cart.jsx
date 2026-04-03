import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <h1 className="text-3xl sm:text-4xl font-playfair font-bold mb-8">Shopping Cart</h1>
                    <div className="text-center py-16">
                        <p className="text-gray-700 mb-6 font-medium">Your cart is empty</p>
                        <button
                            onClick={() => navigate('/shop')}
                            className="bg-brand-gold text-brand-charcoal px-8 py-3 uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-emerald-dark hover:text-brand-ivory transition-colors duration-300 rounded-sm"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl sm:text-4xl font-playfair font-bold">Shopping Cart</h1>
                    <button
                        onClick={() => navigate('/shop')}
                        className="text-sm text-gray-800 hover:text-black flex items-center gap-2 font-bold"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Continue Shopping
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item, index) => (
                            <div key={`${item.product.id}-${item.size}-${index}`} className="flex gap-4 sm:gap-6 border-b border-gray-200 pb-6">
                                {/* Product Image */}
                                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-100">
                                    <img
                                        src={item.product.image_url}
                                        alt={item.product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <Link
                                                to={`/shop/${item.product.id}`}
                                                className="text-base sm:text-lg font-bold hover:underline text-black"
                                            >
                                                {item.product.name}
                                            </Link>
                                            <p className="text-xs sm:text-sm text-gray-700 uppercase tracking-widest mt-1 font-medium">
                                                {item.product.category}
                                                {item.size && ` • Size: ${item.size}`}
                                            </p>
                                        </div>
                                        <p className="font-playfair font-bold text-base sm:text-lg ml-4 text-black">₦{item.product.price.toLocaleString()}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3 border border-gray-300">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                                                className="p-2 hover:bg-gray-100 transition-colors"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                                                className="p-2 hover:bg-gray-100 transition-colors"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromCart(item.product.id, item.size)}
                                            className="text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1 text-sm font-medium"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="hidden sm:inline">Remove</span>
                                        </button>
                                    </div>

                                    {/* Subtotal */}
                                    <p className="text-sm text-gray-800 mt-3 font-medium">
                                        Subtotal: <span className="font-bold text-black">₦{(item.product.price * item.quantity).toLocaleString()}</span>
                                    </p>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={clearCart}
                            className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium underline"
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-brand-cream border border-brand-gray/30 shadow-sm p-6 sticky top-24 rounded-sm">
                            <h2 className="text-xl font-playfair font-bold mb-6 text-brand-charcoal">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-700 font-medium">Subtotal</span>
                                    <span className="font-bold text-black">₦{getCartTotal().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-700 font-medium">Shipping</span>
                                    <span className="font-bold text-green-700">Free</span>
                                </div>
                                <div className="border-t border-gray-300 pt-3 flex justify-between">
                                    <span className="font-bold text-black">Total</span>
                                    <span className="font-playfair text-xl font-bold text-black">₦{getCartTotal().toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-brand-gold text-brand-charcoal py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-emerald-dark hover:text-brand-ivory hover:-translate-y-1 hover:shadow-lg transition-all duration-300 mb-3 rounded-sm"
                            >
                                Proceed to Checkout
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                                Free delivery within Lagos on all orders
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
