import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative h-[85vh] w-full bg-brand-gray overflow-hidden">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                    alt="Fashion Campaign"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <span className="text-white uppercase tracking-[0.3em] mb-3 sm:mb-4 text-xs sm:text-sm font-bold animate-fade-in-up">New Collection 2026</span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6 sm:mb-8 tracking-tight animate-fade-in-up delay-100 leading-tight px-4">
                    Effortless Elegance
                </h1>
                <p className="text-white text-base sm:text-lg md:text-xl max-w-xl lg:max-w-2xl mb-8 sm:mb-10 font-normal animate-fade-in-up delay-200 px-4">
                    Discover the new season's most coveted pieces, designed for the modern individual who values style and sustainability.
                </p>

                <Link
                    to="/shop"
                    className="group bg-white text-black px-6 sm:px-8 py-3 sm:py-4 uppercase tracking-widest text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-black hover:text-white transition-all duration-300 animate-fade-in-up delay-300"
                >
                    Explore Collection
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default Hero;
