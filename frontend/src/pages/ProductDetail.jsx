import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import config from '../config';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const { addToCart } = useCart();
    const { showToast } = useToast();

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${config.API_BASE_URL}/api/products/${id}`);
            const data = await response.json();
            setProduct(data);

            // Fetch related products after getting main product
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <p className="text-gray-400 font-playfair italic text-2xl mb-8">This piece is no longer available.</p>
                <Link
                    to="/shop"
                    className="bg-black text-white px-8 py-4 uppercase tracking-widest text-sm font-bold"
                >
                    Return to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                {/* Single Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-32">
                    {/* Product Image */}
                    <div className="bg-gray-50 aspect-[4/5] overflow-hidden group rounded-sm">
                        <img
                            src={product.image_url && (product.image_url.startsWith('http') ? product.image_url : `${config.API_BASE_URL}${product.image_url}`)}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-10 border-b border-gray-100 pb-10">
                            <Link to={`/shop?category=${product.category}`} className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4 block hover:text-black transition-colors font-bold">
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
                                className="flex-1 bg-black text-white py-5 px-8 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                            >
                                <ShoppingCart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                {product.stock === 0 ? 'Out of Stock' : 'Add to Shopping Bag'}
                            </button>
                            <button className="bg-white border border-gray-200 py-5 px-8 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all group">
                                <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>

                        {/* Collapsible Details (Simulated) */}
                        <div className="space-y-4 border-t border-gray-100 pt-10">
                            <details className="group" open>
                                <summary className="flex justify-between items-center cursor-pointer list-none py-2">
                                    <span className="text-xs uppercase tracking-widest font-bold">Details & Composition</span>
                                    <span className="text-xl group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <div className="py-4 text-sm text-gray-600 leading-relaxed font-medium">
                                    <ul className="space-y-2">
                                        <li>• Premium guinea brocade, aso-oke, or damask fabric</li>
                                        <li>• Hand-stitched embroidery by master Nigerian tailors</li>
                                        <li>• Crafted in our Lagos atelier with traditional techniques</li>
                                        <li>• Custom sizing available upon request</li>
                                    </ul>
                                </div>
                            </details>
                            <details className="group">
                                <summary className="flex justify-between items-center cursor-pointer list-none py-2 border-t border-gray-100 pt-4">
                                    <span className="text-xs uppercase tracking-widest font-bold">Shipping & Care</span>
                                    <span className="text-xl group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <div className="py-4 text-sm text-gray-600 leading-relaxed">
                                    Free delivery within Lagos. Nationwide shipping across Nigeria in 3-5 business days. Dry clean only to preserve embroidery and fabric quality.
                                </div>
                            </details>
                        </div>
                    </div>
                </div>

                {/* Related Products section */}
                {relatedProducts.length > 0 && (
                    <div className="border-t border-gray-100 pt-20 sm:pt-32">
                        <div className="text-center mb-16 lg:mb-24">
                            <span className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2 block font-bold">Complete Your Outfit</span>
                            <h2 className="text-4xl sm:text-5xl font-playfair font-bold">You May Also Like</h2>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12">
                            {relatedProducts.map(rel => (
                                <ProductCard key={rel.id} product={rel} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
