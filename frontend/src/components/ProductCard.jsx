import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

const ProductCard = ({ product }) => {
    if (!product) return null;

    const imageUrl = product.image_url.startsWith('http')
        ? product.image_url
        : `${config.API_BASE_URL}${product.image_url}`;

    return (
        <Link to={`/shop/${product.id}`} className="group block hover:-translate-y-1 transition-transform duration-500">
            <div className="relative overflow-hidden bg-brand-cream border border-brand-gray/30 shadow-sm group-hover:shadow-2xl transition-shadow duration-500 h-[400px] sm:h-[450px] lg:h-[500px] mb-4 rounded-sm">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {product.stock < 10 && product.stock > 0 && (
                    <div className="absolute top-4 right-4 bg-brand-charcoal text-brand-gold px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md rounded-sm">
                        Low Stock
                    </div>
                )}
                {product.stock === 0 && (
                    <div className="absolute top-4 right-4 bg-red-800 text-white px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md rounded-sm">
                        Sold Out
                    </div>
                )}
            </div>
            <div className="space-y-1.5 px-1">
                <div className="flex justify-between items-start gap-4">
                    <h3 className="font-bold text-sm sm:text-base group-hover:text-brand-gold transition-colors duration-300 text-brand-charcoal line-clamp-1">{product.name}</h3>
                    <span className="font-playfair font-bold text-sm sm:text-base text-brand-emerald-dark">₦{product.price.toLocaleString()}</span>
                </div>
                <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold">{product.category}</p>
            </div>
        </Link>
    );
};

export default ProductCard;
