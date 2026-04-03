import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-emerald-dark text-brand-ivory mt-auto border-t-[4px] border-brand-gold" role="contentinfo">
            <div className="max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
                    {/* Brand */}
                    <div className="col-span-1">
                        <h3 className="font-playfair text-2xl font-bold tracking-[0.15em] mb-4 text-brand-gold">ADEFES</h3>
                        <p className="text-brand-ivory/80 text-sm leading-relaxed mb-6">
                            Lagos • Ado Ekiti <br />
                            Premium handcrafted Nigerian men's traditional wear. Our master tailors combine generations of expertise with modern design for the distinguished man.
                        </p>
                    </div>

                    {/* Links */}
                    <nav aria-label="Shop navigation">
                        <h4 className="font-bold uppercase text-xs tracking-[0.2em] mb-4 text-brand-gold">Shop</h4>
                        <ul className="space-y-3 text-sm text-brand-ivory/80 font-medium">
                            <li><a href="/shop" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">New Arrivals</a></li>
                            <li><a href="/shop?category=Agbada" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Agbada</a></li>
                            <li><a href="/shop?category=Suit" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Suits</a></li>
                            <li><a href="/shop?category=Kaftan" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Kaftan & Senator</a></li>
                            <li><a href="/shop?category=Accessories" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Accessories</a></li>
                        </ul>
                    </nav>

                    <nav aria-label="Support navigation">
                        <h4 className="font-bold uppercase text-xs tracking-[0.2em] mb-4 text-brand-gold">Company</h4>
                        <ul className="space-y-3 text-sm text-brand-ivory/80 font-medium">
                            <li><a href="/about" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">About Us</a></li>
                            <li><a href="/fashion-designer-ekiti" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Fashion Designer in Ekiti</a></li>
                            <li><a href="#" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Measurement Guide</a></li>
                            <li><a href="#" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">Shipping & Returns</a></li>
                        </ul>
                    </nav>

                    {/* Newsletter */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h4 className="font-bold uppercase text-xs tracking-[0.2em] mb-4 text-brand-gold">Stay Connected</h4>
                        <p className="text-brand-ivory/80 text-sm mb-4">Subscribe to receive exclusive offers and updates.</p>
                        <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Email address"
                                className="px-4 py-2 bg-brand-emerald text-brand-ivory placeholder-brand-ivory/50 border border-brand-emerald-light outline-none focus:border-brand-gold text-sm transition-colors rounded-sm"
                                required
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-brand-gold text-brand-charcoal text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-ivory transition-colors duration-300 rounded-sm"
                            >
                                Subscribe
                            </button>
                        </form>
                        <div className="flex space-x-4 mt-6">
                            <a href="https://instagram.com/adefes" aria-label="Follow Adefes on Instagram" target="_blank" rel="noopener noreferrer">
                                <Instagram className="h-5 w-5 text-brand-ivory/60 hover:text-brand-gold cursor-pointer transition-colors" />
                            </a>
                            <a href="https://twitter.com/adefes" aria-label="Follow Adefes on Twitter" target="_blank" rel="noopener noreferrer">
                                <Twitter className="h-5 w-5 text-brand-ivory/60 hover:text-brand-gold cursor-pointer transition-colors" />
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
