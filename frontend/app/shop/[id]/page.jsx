'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Layout from '@/src/components/Layout';
import ProductCard from '@/src/components/ProductCard';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { useToast } from '@/src/context/ToastContext';
import Link from 'next/link';
import config from '@/src/config';

const ProductDetail = () => {
    const params = useParams();
    const { id } = params;
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const { addToCart } = useCart();
    const { showToast } = useToast();

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${config.API_BASE_URL}/api/products/${id}`);
                const data = await response.json();
                setProduct(data);

                // Fetch related products
                const allProductsResponse = await fetch(`${config.API_BASE_URL}/api/products`);
                const allProducts = await allProductsResponse.json();
                const related = allProducts
                    .filter(p => p.category === data.category && p.id !== data.id)
                    .slice(0, 4);
                setRelatedProducts(related);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product.category !== 'Accessories' && !selectedSize) {
            showToast('Please select a size', 'error');
            return;
        }

        addToCart(product, 1, selectedSize || null);
        showToast(`${product.name} added to cart!`, 'success');
    };

    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                </div>
            </Layout>
        );
    }

    if (!product) {
        return (
            <Layout>
                <div className="min-h-screen flex flex-col items-center justify-center px-4">
                    <p className="text-gray-400 font-playfair italic text-2xl mb-8">This piece is no longer available.</p>
                    <Link
                        href="/shop"
                        className="bg-black text-white px-8 py-4 uppercase tracking-widest text-sm font-bold"
                    >
                        Return to Shop
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                    {/* Single Product Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-32">
                        {/* Product Image */}
                        <div className="relative bg-gray-50 aspect-[4/5] overflow-hidden group rounded-sm">
                            <Image
                                src={product.image_url && (product.image_url.startsWith('http') ? product.image_url : `${config.API_BASE_URL}${product.image_url}`)}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col justify-center">
                            <div className="mb-10 border-b border-gray-100 pb-10">
                                <Link href={`/shop?category=${product.category}`} className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4 block hover:text-black transition-colors font-bold">
                                    {product.category}
                                </Link>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold mb-6">{product.name}</h1>
                                <p className="text-3xl font-playfair text-black">₦{product.price.toLocaleString()}</p>
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed mb-12">
                                {product.description}
                            </p>

                            {/* Size Selection */}
                            {product.category !== 'Accessories' && (
                                <div className="mb-10">
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-xs uppercase tracking-widest font-bold">Select Size</label>
                                        <button className="text-[10px] uppercase tracking-widest underline text-gray-400 hover:text-black">Size Guide</button>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-14 h-14 flex items-center justify-center border transition-all text-xs font-bold leading-none ${selectedSize === size
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white border-gray-200 hover:border-black'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className="flex-1 bg-brand-gold text-brand-charcoal py-5 px-8 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-emerald-dark hover:text-brand-ivory hover:-translate-y-1 hover:shadow-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group rounded-sm"
                                >
                                    <ShoppingCart className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                                    {product.stock === 0 ? 'Out of Stock' : 'Add to Shopping Bag'}
                                </button>
                                <button className="bg-brand-cream border border-brand-gray/50 py-5 px-8 flex items-center justify-center hover:bg-brand-emerald-dark hover:text-brand-ivory hover:border-brand-emerald-dark transition-all duration-300 group rounded-sm shadow-sm">
                                    <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <section className="py-20 lg:py-32">
                            <h2 className="text-4xl font-playfair font-bold mb-12">Related Pieces</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {relatedProducts.map(prod => (
                                    <ProductCard key={prod.id} product={prod} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetail;
