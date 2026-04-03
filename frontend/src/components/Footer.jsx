import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-12 sm:pt-16 pb-6 sm:pb-8" role="contentinfo">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
                    {/* Brand */}
                    <div className="col-span-1">
                        <h3 className="font-playfair text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-black">ADEFES</h3>
                        <p className="text-gray-700 text-sm leading-relaxed font-medium">
                            Nigeria's premier fashion house specializing in luxury Agbada, Kaftan, Senator styles, and traditional men's wear with handcrafted embroidery.
                        </p>
                    </div>

                    {/* Links */}
                    <nav aria-label="Shop navigation">
                        <h4 className="font-bold uppercase text-xs tracking-wider mb-3 sm:mb-4 text-black">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-700 font-medium">
                            <li><a href="/shop" className="hover:text-black transition-colors">New Arrivals</a></li>
                            <li><a href="/shop?category=Agbada" className="hover:text-black transition-colors">Agbada</a></li>
                            <li><a href="/shop?category=Kaftan" className="hover:text-black transition-colors">Kaftan & Senator</a></li>
                            <li><a href="/shop?category=Accessories" className="hover:text-black transition-colors">Accessories</a></li>
                        </ul>
                    </nav>

                    <nav aria-label="Support navigation">
                        <h4 className="font-bold uppercase text-xs tracking-wider mb-3 sm:mb-4 text-black">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-700 font-medium">
                            <li><a href="/about" className="hover:text-black transition-colors">About Us</a></li>
                            <li><a href="/fashion-designer-ekiti" className="hover:text-black transition-colors">Fashion Designer in Ekiti</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Measurement Guide</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Shipping & Returns</a></li>
                        </ul>
                    </nav>

                    {/* Newsletter */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h4 className="font-bold uppercase text-xs tracking-wider mb-3 sm:mb-4 text-black">Stay Connected</h4>
                        <p className="text-gray-700 text-sm mb-4 font-medium">Join the Adefes family for exclusive drops and styling tips.</p>
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 border-b border-gray-300 py-2 focus:outline-none focus:border-black text-sm bg-white text-black"
                                aria-label="Email address for newsletter subscription"
                            />
                            <button className="text-xs uppercase font-bold tracking-widest border-b border-black hover:text-gray-600 transition-colors pb-2 w-full sm:w-auto lg:w-full text-left font-bold">Subscribe</button>
                        </div>
                        <div className="flex space-x-4 mt-5 sm:mt-6">
                            <a href="https://instagram.com/adefes" aria-label="Follow Adefes on Instagram" target="_blank" rel="noopener noreferrer">
                                <Instagram className="h-5 w-5 text-gray-600 hover:text-black cursor-pointer transition-colors" />
                            </a>
                            <a href="https://twitter.com/adefes" aria-label="Follow Adefes on Twitter" target="_blank" rel="noopener noreferrer">
                                <Twitter className="h-5 w-5 text-gray-600 hover:text-black cursor-pointer transition-colors" />
                            </a>
                            <a href="https://facebook.com/adefes" aria-label="Follow Adefes on Facebook" target="_blank" rel="noopener noreferrer">
                                <Facebook className="h-5 w-5 text-gray-600 hover:text-black cursor-pointer transition-colors" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
                    &copy; {new Date().getFullYear()} Adefes Fashion House. Premium Nigerian Agbada & Men's Wear. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
