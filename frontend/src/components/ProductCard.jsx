import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/shop/${product.id}`} className="group">
            <div className="relative overflow-hidden bg-gray-100 h-[400px] sm:h-[450px] lg:h-[500px] mb-4">
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {product.stock < 10 && product.stock > 0 && (
                    <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs uppercase tracking-wide">
                        Low Stock
                    </div>
                )}
                {product.stock === 0 && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-xs uppercase tracking-wide">
                        Sold Out
                    </div>
                )}
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm sm:text-base group-hover:underline text-black">{product.name}</h3>
                    <span className="font-playfair font-bold text-sm sm:text-base text-black">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-700 text-xs sm:text-sm uppercase tracking-widest font-medium">{product.category}</p>
            </div>
        </Link>
    );
};

export default ProductCard;
