import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const collections = [
    {
        id: 'royal-agbada',
        name: 'Royal Agbada',
        description: 'Our signature grand Agbada collection — flowing three-piece ensembles with heavy embroidery fit for royalty. Crafted from premium guinea brocade and aso-oke.',
        image: '/images/hero-agbada.png',
        alt: 'Royal Agbada collection - Premium Nigerian Agbada with intricate gold embroidery',
    },
    {
        id: 'modern-kaftan',
        name: 'Modern Kaftan',
        description: 'Contemporary Kaftan designs that blend traditional Nigerian styling with modern tailoring. Perfect for everyday elegance and casual owambe events.',
        image: '/images/kaftan-senator.png',
        alt: 'Modern Nigerian Kaftan and Senator styles - Contemporary African men\'s fashion',
    },
    {
        id: 'senator-collection',
        name: 'Senator Collection',
        description: 'Sharp, fitted Senator styles that command attention in the boardroom and beyond. Clean lines meet fine Nigerian craftsmanship.',
        image: '/images/agbada-collection.png',
        alt: 'Nigerian Senator style collection - Premium fitted men\'s traditional wear',
    },
    {
        id: 'owambe-special',
        name: 'Owambe Special',
        description: 'Showstopping designs for weddings, celebrations, and grand occasions. Make your entrance unforgettable with Adefes luxury event wear.',
        image: '/images/about-studio.png',
        alt: 'Owambe and Nigerian wedding special collection - Luxury celebration wear',
    }
];

const Collections = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
            <SEO
                title="Collections | Agbada & Men's Wear | Fashion Designer Ekiti"
                description="Explore our curated Agbada, Kaftan, Senator, and Owambe collections. Premium Nigerian men's wear by the best fashion designer in Ekiti."
                url="https://adefes.com/collections"
            />
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-16 lg:mb-24">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold mb-6">Collections</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Explore our curated collections of premium Nigerian men's wear — from grand Agbada to sleek Senator styles, each piece celebrates the art of traditional craftsmanship.
                    </p>
                </header>

                <div className="space-y-24 lg:space-y-32">
                    {collections.map((collection, index) => (
                        <article
                            key={collection.id}
                            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                }`}
                        >
                            <div className="w-full lg:w-3/5 relative group overflow-hidden rounded-2xl shadow-lg aspect-[16/9]">
                                <img
                                    src={collection.image}
                                    alt={collection.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                            </div>

                            <div className="w-full lg:w-2/5 text-center lg:text-left">
                                <span className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4 block">Collection {index + 1}</span>
                                <h2 className="text-3xl sm:text-4xl font-playfair font-bold mb-6">{collection.name}</h2>
                                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                    {collection.description}
                                </p>
                                <button
                                    onClick={() => navigate('/shop')}
                                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-all"
                                >
                                    View Collection
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collections;
