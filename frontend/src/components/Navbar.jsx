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
        <nav className="bg-white sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="font-playfair text-2xl font-bold tracking-wider text-gray-900">
                            ADEFES
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-gray-800 hover:text-black transition-colors uppercase text-sm tracking-wide font-medium">Home</Link>
                        <Link to="/shop" className="text-gray-800 hover:text-black transition-colors uppercase text-sm tracking-wide font-medium">Shop</Link>
                        <Link to="/collections" className="text-gray-800 hover:text-black transition-colors uppercase text-sm tracking-wide font-medium">Collections</Link>
                        <Link to="/about" className="text-gray-800 hover:text-black transition-colors uppercase text-sm tracking-wide font-medium">About</Link>
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
                                className="pl-4 pr-10 py-1.5 border-b border-gray-200 focus:border-black outline-none transition-all w-48 focus:w-64 text-sm"
                            />
                            <button type="submit" className="absolute right-0 text-gray-800 hover:text-black transition-colors">
                                <Search className="h-5 w-5" />
                            </button>
                        </form>
                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-gray-800 hover:text-black transition-colors uppercase text-[10px] tracking-widest font-bold border-r border-gray-100 pr-4 mr-2">
                                        Admin
                                    </Link>
                                )}
                                <Link to="/orders" className="text-gray-800 hover:text-black transition-colors" title="My Orders">
                                    <User className="h-5 w-5" />
                                </Link>
                                <Link to="/cart" className="text-gray-800 hover:text-black transition-colors relative">
                                    <ShoppingCart className="h-5 w-5" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        window.location.href = '/login';
                                    }}
                                    className="text-gray-800 hover:text-black transition-colors text-xs uppercase tracking-widest font-bold border-l pl-6 ml-2"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="text-gray-800 hover:text-black transition-colors text-sm uppercase tracking-wide font-bold">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 hover:text-black">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                        <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-black uppercase text-sm tracking-wide">Home</Link>
                        <Link to="/shop" className="block px-3 py-2 text-gray-600 hover:text-black uppercase text-sm tracking-wide">Shop</Link>
                        <Link to="/collections" className="block px-3 py-2 text-gray-600 hover:text-black uppercase text-sm tracking-wide">Collections</Link>
                        <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-black uppercase text-sm tracking-wide">About</Link>
                        <div className="flex space-x-6 mt-4 pb-2">
                            <button className="text-gray-600"><Search className="h-5 w-5" /></button>
                            <Link to="/account" className="text-gray-600"><User className="h-5 w-5" /></Link>
                            <Link to="/cart" className="text-gray-600"><ShoppingCart className="h-5 w-5" /></Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
