import React from 'react';
import Hero from '../components/Hero';

const Home = () => {
    return (
        <div className="bg-white">
            <Hero />


            {/* Featured Categories Preview */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold mb-4">Curated Collections</h2>
                    <div className="h-0.5 w-12 sm:w-16 bg-black mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {['Women', 'Men', 'Accessories'].map((cat) => (
                        <div key={cat} className="group relative h-[400px] sm:h-[450px] lg:h-[500px] overflow-hidden cursor-pointer">
                            <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-700 ease-out">
                                {/* Placeholder backgrounds */}
                                {cat === 'Women' && <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt={cat} />}
                                {cat === 'Men' && <img src="https://images.unsplash.com/photo-1617137968427-b2b241db6c8a?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt={cat} />}
                                {cat === 'Accessories' && <img src="https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt={cat} />}
                            </div>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                            <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-6 sm:left-8 lg:left-10">
                                <h3 className="text-white text-3xl sm:text-4xl font-playfair font-medium mb-2">{cat}</h3>
                                <span className="text-white uppercase tracking-widest text-xs border-b border-transparent group-hover:border-white transition-all pb-1">Shop Now</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
