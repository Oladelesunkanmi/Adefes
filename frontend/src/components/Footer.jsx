import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-12 sm:pt-16 pb-6 sm:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
                    {/* Brand */}
                    <div className="col-span-1">
                        <h3 className="font-playfair text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-black">ADEFES</h3>
                        <p className="text-gray-700 text-sm leading-relaxed font-medium">
                            Redefining modern elegance with sustainable, timeless fashion pieces.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold uppercase text-xs tracking-wider mb-3 sm:mb-4 text-black">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-700 font-medium">
                            <li><a href="#" className="hover:text-black transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Best Sellers</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Accessories</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Sale</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase text-xs tracking-wider mb-3 sm:mb-4 text-black">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-700 font-medium">
                            <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Size Guide</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h4 className="font-bold uppercase text-xs tracking-wider mb-3 sm:mb-4 text-black">Stay Connected</h4>
                        <p className="text-gray-700 text-sm mb-4 font-medium">Sign up for exclusive offers and updates.</p>
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 border-b border-gray-300 py-2 focus:outline-none focus:border-black text-sm bg-white text-black"
                            />
                            <button className="text-xs uppercase font-bold tracking-widest border-b border-black hover:text-gray-600 transition-colors pb-2 w-full sm:w-auto lg:w-full text-left font-bold">Subscribe</button>
                        </div>
                        <div className="flex space-x-4 mt-5 sm:mt-6">
                            <Instagram className="h-5 w-5 text-gray-600 hover:text-black cursor-pointer transition-colors" />
                            <Twitter className="h-5 w-5 text-gray-600 hover:text-black cursor-pointer transition-colors" />
                            <Facebook className="h-5 w-5 text-gray-600 hover:text-black cursor-pointer transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
                    &copy; {new Date().getFullYear()} Adefes Fashion. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
