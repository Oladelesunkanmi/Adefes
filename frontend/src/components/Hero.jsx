import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative h-[85vh] w-full bg-brand-gray overflow-hidden" aria-label="Hero Banner">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="/images/hero-agbada.png"
                    alt="Premium Nigerian Agbada with intricate gold embroidery - Adefes Fashion House"
                    className="w-full h-full object-cover scale-105 animate-[pulse_20s_infinite_alternate]"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-emerald-dark/80 via-black/40 to-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <span className="text-brand-gold uppercase tracking-[0.3em] mb-3 sm:mb-5 text-xs sm:text-sm font-bold animate-fade-in-up drop-shadow-md">Agbada Collection 2026</span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6 sm:mb-8 tracking-wide animate-fade-in-up delay-100 leading-tight px-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    The Art of the Agbada
                </h1>
                <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-xl lg:max-w-2xl mb-8 sm:mb-10 font-normal animate-fade-in-up delay-200 px-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                    Handcrafted Nigerian men's traditional wear — premium Agbada, Kaftan, and Senator styles with intricate embroidery for the distinguished modern man.
                </p>

                <Link
                    to="/shop"
                    className="group bg-brand-gold text-brand-charcoal px-8 sm:px-10 py-3 sm:py-4 uppercase tracking-[0.2em] text-xs sm:text-sm font-bold flex items-center gap-3 hover:bg-brand-emerald hover:text-brand-ivory hover:-translate-y-1 hover:shadow-xl transition-all duration-300 animate-fade-in-up delay-300 rounded-sm"
                    aria-label="Explore our Agbada and men's wear collection"
                >
                    Explore Collection
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
            </div>
        </section>
    );
};

export default Hero;
