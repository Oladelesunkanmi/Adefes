import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const { addToCart } = useCart();
    const { showToast } = useToast();

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/products/${id}`);
            const data = await response.json();
            setProduct(data);
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
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-gray-500 mb-4">Product not found</p>
                <Link to="/shop" className="text-black underline">Return to Shop</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {/* Back Button */}
                <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 text-sm text-gray-800 hover:text-black mb-6 sm:mb-8 font-bold"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Product Image */}
                    <div className="bg-gray-100 h-[400px] sm:h-[500px] lg:h-[600px]">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-700 mb-2 font-bold">{product.category}</p>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold mb-4 text-black">{product.name}</h1>
                            <p className="text-2xl sm:text-3xl font-playfair font-bold text-black">${product.price.toFixed(2)}</p>
                        </div>

                        <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-8 font-medium">
                            {product.description}
                        </p>

                        {/* Size Selection */}
                        {product.category !== 'Accessories' && (
                            <div className="mb-8">
                                <label className="block text-sm font-medium mb-3">Select Size</label>
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border transition-colors text-sm ${selectedSize === size
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white border-gray-300 hover:border-black'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Stock Status */}
                        <div className="mb-6">
                            {product.stock > 0 ? (
                                <p className="text-sm text-green-600">In Stock ({product.stock} available)</p>
                            ) : (
                                <p className="text-sm text-red-600">Out of Stock</p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="flex-1 bg-black text-white py-3 sm:py-4 px-6 flex items-center justify-center gap-2 uppercase tracking-widest text-xs sm:text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingCart className="h-4 w-4" />
                                Add to Cart
                            </button>
                            <button className="bg-white border border-black py-3 sm:py-4 px-6 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                <Heart className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Product Details */}
                        <div className="border-t border-gray-200 pt-6 space-y-4 text-sm">
                            <div>
                                <h3 className="font-bold mb-2 text-black">Product Details</h3>
                                <ul className="text-gray-800 space-y-2 text-xs sm:text-sm font-medium">
                                    <li>• Premium materials and craftsmanship</li>
                                    <li>• Designed for durability and style</li>
                                    <li>• Ethically and sustainably sourced</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold mb-2 text-black">Shipping & Returns</h3>
                                <p className="text-gray-800 text-xs sm:text-sm font-medium">Free shipping on orders over $200. 30-day return policy.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
