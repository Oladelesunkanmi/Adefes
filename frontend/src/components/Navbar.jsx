import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    return (
        <nav className="bg-brand-ivory/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-brand-gray/50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="font-playfair text-2xl md:text-3xl font-bold tracking-[0.15em] text-brand-emerald-dark hover:text-brand-gold transition-colors duration-300">
                            ADEFES
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-brand-charcoal hover:text-brand-gold transition-colors duration-300 uppercase text-xs tracking-widest font-medium">Home</Link>
                        <Link to="/shop" className="text-brand-charcoal hover:text-brand-gold transition-colors duration-300 uppercase text-xs tracking-widest font-medium">Shop</Link>
                        <Link to="/collections" className="text-brand-charcoal hover:text-brand-gold transition-colors duration-300 uppercase text-xs tracking-widest font-medium">Collections</Link>
                        <Link to="/about" className="text-brand-charcoal hover:text-brand-gold transition-colors duration-300 uppercase text-xs tracking-widest font-medium">About</Link>
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const query = e.target.search.value;
                                if (query.trim()) {
                                    window.location.href = `/shop?search=${encodeURIComponent(query)}`;
                                }
                            }}
                            className="relative flex items-center"
                        >
                            <input
                                name="search"
                                type="text"
                                placeholder="Search products..."
                                className="pl-4 pr-10 py-1.5 bg-transparent border-b border-brand-gray focus:border-brand-gold outline-none transition-all duration-300 w-40 hover:w-48 focus:w-64 text-sm text-brand-charcoal placeholder-gray-400"
                            />
                            <button type="submit" className="absolute right-0 text-brand-charcoal hover:text-brand-gold transition-colors duration-300">
                                <Search className="h-5 w-5" />
                            </button>
                        </form>
                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-brand-emerald hover:text-brand-gold transition-colors duration-300 uppercase text-[10px] tracking-widest font-bold border-r border-brand-gray/50 pr-4 mr-2">
                                        Admin
                                    </Link>
                                )}
                                <Link to="/orders" className="text-brand-charcoal hover:text-brand-gold transition-colors duration-300" title="My Orders">
                                    <User className="h-5 w-5" />
                                </Link>
                                <Link to="/cart" className="text-brand-charcoal hover:text-brand-gold transition-colors duration-300 relative group">
                                    <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        window.location.href = '/login';
                                    }}
                                    className="text-brand-charcoal hover:text-red-600 transition-colors duration-300 text-xs uppercase tracking-widest font-bold border-l pl-6 ml-2"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="text-brand-charcoal hover:text-brand-gold transition-colors duration-300 text-xs uppercase tracking-widest font-bold">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-brand-charcoal hover:text-brand-gold transition-colors">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-brand-ivory border-t border-brand-gray/50 shadow-md">
                    <div className="px-2 pt-2 pb-5 space-y-2 sm:px-3 flex flex-col items-center">
                        <Link to="/" className="block px-3 py-2 text-brand-charcoal hover:text-brand-gold uppercase text-xs tracking-widest font-bold transition-colors">Home</Link>
                        <Link to="/shop" className="block px-3 py-2 text-brand-charcoal hover:text-brand-gold uppercase text-xs tracking-widest font-bold transition-colors">Shop</Link>
                        <Link to="/collections" className="block px-3 py-2 text-brand-charcoal hover:text-brand-gold uppercase text-xs tracking-widest font-bold transition-colors">Collections</Link>
                        <Link to="/about" className="block px-3 py-2 text-brand-charcoal hover:text-brand-gold uppercase text-xs tracking-widest font-bold transition-colors">About</Link>
                        <div className="flex space-x-8 mt-6 pb-2">
                            <button className="text-brand-charcoal hover:text-brand-gold transition-colors"><Search className="h-6 w-6" /></button>
                            <Link to="/orders" className="text-brand-charcoal hover:text-brand-gold transition-colors"><User className="h-6 w-6" /></Link>
                            <Link to="/cart" className="text-brand-charcoal hover:text-brand-gold transition-colors"><ShoppingCart className="h-6 w-6" /></Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
