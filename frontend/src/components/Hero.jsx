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
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <span className="text-white uppercase tracking-[0.3em] mb-3 sm:mb-4 text-xs sm:text-sm font-bold animate-fade-in-up">Agbada Collection 2026</span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6 sm:mb-8 tracking-tight animate-fade-in-up delay-100 leading-tight px-4">
                    The Art of the Agbada
                </h1>
                <p className="text-white text-base sm:text-lg md:text-xl max-w-xl lg:max-w-2xl mb-8 sm:mb-10 font-normal animate-fade-in-up delay-200 px-4">
                    Handcrafted Nigerian men's traditional wear — premium Agbada, Kaftan, and Senator styles with intricate embroidery for the distinguished modern man.
                </p>

                <Link
                    to="/shop"
                    className="group bg-white text-black px-6 sm:px-8 py-3 sm:py-4 uppercase tracking-widest text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-black hover:text-white transition-all duration-300 animate-fade-in-up delay-300"
                    aria-label="Explore our Agbada and men's wear collection"
                >
                    Explore Collection
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
};

export default Hero;
