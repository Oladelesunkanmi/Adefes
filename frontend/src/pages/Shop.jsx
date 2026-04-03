import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { ChevronDown, SlidersHorizontal, Grid3X3, Grid2X2 } from 'lucide-react';
import config from '../config';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const categoryParam = queryParams.get('category');
        const searchParam = queryParams.get('search');

        if (categoryParam) {
            setSelectedCategory(categoryParam);
        } else {
            setSelectedCategory('All');
        }

        if (searchParam) {
            setSearchTerm(searchParam);
            fetchSearchedProducts(searchParam);
        } else {
            setSearchTerm('');
            fetchProducts();
        }
    }, [location.search]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${config.API_BASE_URL}/api/products`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSearchedProducts = async (query) => {
        try {
            setLoading(true);
            const response = await fetch(`${config.API_BASE_URL}/api/products/search?q=${encodeURIComponent(query)}`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error('Failed to search products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['All', 'Agbada', 'Kaftan', 'Senator', 'Accessories'];

    let filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    // Apply Sorting
    filteredProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'newest') return b.id - a.id;
        return 0;
    });

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="Shop Agbada, Kaftan & Senator | Fashion Designer in Ekiti"
                description="Browse premium Agbada, Kaftan, Senator styles and accessories from the best fashion designer in Ekiti. Handcrafted Nigerian men's wear. Shop now or visit us in Ado Ekiti."
                url="https://adefes.com/shop"
            />
            {/* Page Header */}
            <div className="bg-gray-50 py-16 sm:py-24 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2 block font-bold">
                        {searchTerm ? 'Search Results' : 'Collections'}
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold mb-6">
                        {searchTerm ? `Results for "${searchTerm}"` : 'The Shop'}
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        {searchTerm
                            ? `Discovering pieces that match your search for "${searchTerm}".`
                            : 'Premium handcrafted Agbada, Kaftan, Senator styles, and accessories — designed for the distinguished Nigerian man.'
                        }
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 border-b border-gray-100 pb-8 uppercase tracking-widest text-[10px] font-bold">
                    <div className="flex items-center gap-8">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-2 hover:text-gray-400 transition-colors"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                        </button>
                        <p className="text-gray-400">{filteredProducts.length} Results</p>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 text-gray-400">
                            <Grid2X2 className="h-4 w-4 cursor-pointer hover:text-black transition-colors" />
                            <Grid3X3 className="h-4 w-4 cursor-pointer text-black" />
                        </div>
                        <div className="relative group">
                            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400 transition-colors">
                                <span>Sort By: {sortBy.replace('-', ' ')}</span>
                                <ChevronDown className="h-4 w-4" />
                            </div>
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                                {[
                                    { id: 'newest', label: 'Newest' },
                                    { id: 'price-low', label: 'Price: Low to High' },
                                    { id: 'price-high', label: 'Price: High to Low' }
                                ].map(option => (
                                    <button
                                        key={option.id}
                                        onClick={() => setSortBy(option.id)}
                                        className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Animated Sidebar Filter */}
                    <div className={`lg:w-64 space-y-12 transition-all duration-500 overflow-hidden ${isFilterOpen ? 'w-full opacity-100 max-h-[1000px]' : 'w-0 opacity-0 max-h-0 lg:block lg:w-64 lg:opacity-100 lg:max-h-full'}`}>
                        <div>
                            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6">Category</h3>
                            <div className="space-y-4">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`block w-full text-left text-sm transition-all ${selectedCategory === cat ? 'font-bold pl-4 border-l-2 border-black' : 'text-gray-500 hover:text-black hover:pl-2'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6">Price Range</h3>
                            <div className="space-y-4 text-sm text-gray-500">
                                <label className="flex items-center gap-3 cursor-pointer hover:text-black">
                                    <input type="checkbox" className="accent-black" />
                                    Under ₦50,000
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer hover:text-black">
                                    <input type="checkbox" className="accent-black" />
                                    ₦50,000 - ₦200,000
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer hover:text-black">
                                    <input type="checkbox" className="accent-black" />
                                    Over ₦200,000
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="animate-pulse">
                                        <div className="bg-gray-100 aspect-[3/4] mb-4"></div>
                                        <div className="h-4 bg-gray-100 w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-100 w-1/4"></div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-32 bg-gray-50 rounded-lg">
                                <p className="text-gray-400 font-playfair italic text-xl">No pieces found in this collection.</p>
                                <button
                                    onClick={() => setSelectedCategory('All')}
                                    className="mt-6 text-sm font-bold uppercase tracking-widest underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
