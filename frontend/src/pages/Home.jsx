import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { ArrowRight } from 'lucide-react';
import config from '../config';

const Home = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await fetch(`${config.API_BASE_URL}/api/products`);
                const data = await response.json();
                // Take the last 4 products as new arrivals
                setNewArrivals(data.slice(-4).reverse());
            } catch (error) {
                console.error('Failed to fetch new arrivals:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNewArrivals();
    }, []);

    return (
        <div className="bg-white">
            <SEO
                title="Adefes | Best Fashion Designer in Ekiti | Agbada & Men's Wear"
                description="Adefes is the best fashion designer in Ekiti, Nigeria. Premium Agbada, Kaftan, Senator styles with handcrafted embroidery. Based in Ado Ekiti. Call 08154280329."
                url="https://adefes.com/"
            />
            <Hero />

            {/* New Arrivals Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32" aria-labelledby="new-arrivals-heading">
                <div className="flex justify-between items-end mb-12 sm:mb-16">
                    <div>
                        <span className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2 block">Fresh Designs</span>
                        <h2 id="new-arrivals-heading" className="text-4xl sm:text-5xl font-playfair font-bold">New Arrivals</h2>
                    </div>
                    <Link
                        to="/shop"
                        className="hidden sm:flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-all"
                    >
                        View All
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 aspect-[3/4] mb-4"></div>
                                <div className="h-4 bg-gray-200 w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 w-1/4"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                        {newArrivals.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                <div className="mt-12 sm:hidden flex justify-center">
                    <Link
                        to="/shop"
                        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1"
                    >
                        View All
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>

            {/* Featured Categories Preview */}
            <section className="bg-gray-50 py-20 lg:py-32" aria-labelledby="collections-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 lg:mb-24">
                        <span className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2 block">Explore</span>
                        <h2 id="collections-heading" className="text-4xl sm:text-5xl font-playfair font-bold">Our Collections</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            {
                                name: 'Agbada',
                                image: '/images/agbada-collection.png',
                                alt: 'Premium Nigerian Agbada collection with embroidered designs - Shop Agbada online',
                                category: 'Agbada'
                            },
                            {
                                name: 'Kaftan & Senator',
                                image: '/images/kaftan-senator.png',
                                alt: 'Nigerian Kaftan and Senator style men\'s wear - Modern traditional fashion',
                                category: 'Kaftan'
                            },
                            {
                                name: 'Accessories',
                                image: '/images/craftsmanship-detail.png',
                                alt: 'Nigerian men\'s fashion accessories - Fila caps, shoes, and jewelry',
                                category: 'Accessories'
                            }
                        ].map((cat) => (
                            <Link to={`/shop?category=${cat.category}`} key={cat.name} className="group relative h-[450px] sm:h-[500px] lg:h-[600px] overflow-hidden cursor-pointer">
                                <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-1000 ease-out">
                                    <img src={cat.image} className="w-full h-full object-cover" alt={cat.alt} loading="lazy" />
                                </div>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                                <div className="absolute inset-0 flex items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="w-full h-full border border-white/30"></div>
                                </div>
                                <div className="absolute bottom-10 left-10">
                                    <h3 className="text-white text-3xl sm:text-4xl font-playfair font-medium mb-3">{cat.name}</h3>
                                    <span className="text-white uppercase tracking-widest text-xs border-b border-white transition-all pb-1">Shop Now</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32" aria-labelledby="philosophy-heading">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="order-2 lg:order-1">
                        <img
                            src="/images/about-studio.png"
                            alt="Adefes fashion design studio in Lagos - where premium Agbada and men's wear are handcrafted"
                            className="w-full aspect-[4/5] object-cover rounded-sm shadow-2xl"
                            loading="lazy"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <span className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4 block font-bold">Our Heritage</span>
                        <h2 id="philosophy-heading" className="text-4xl sm:text-5xl font-playfair font-bold mb-8 leading-tight">Where Tradition Meets Modern Elegance</h2>
                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed mb-10">
                            <p>
                                At ADEFES, we honour the rich heritage of Nigerian men's fashion. Every Agbada, Kaftan, and Senator piece is a celebration of Yoruba craftsmanship, blending centuries-old embroidery techniques with contemporary design.
                            </p>
                            <p>
                                From premium aso-oke and guinea brocade to hand-stitched embroidery, our garments are crafted to make every man feel like royalty — whether it's for an owambe, a wedding, or everyday distinction.
                            </p>
                        </div>
                        <Link
                            to="/about"
                            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] bg-brand-gold text-brand-charcoal px-8 py-4 hover:bg-brand-emerald-dark hover:text-brand-ivory hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-sm group"
                            aria-label="Learn more about Adefes Fashion House story"
                        >
                            Read Our Story
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
