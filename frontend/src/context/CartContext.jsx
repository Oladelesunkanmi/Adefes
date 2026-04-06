'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load cart from session storage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCart = sessionStorage.getItem('cart');
            if (savedCart) {
                try {
                    setCartItems(JSON.parse(savedCart));
                } catch {
                    setCartItems([]);
                }
            }
        }
        setLoading(false);
    }, []);

    // Save cart to session storage whenever it changes
    useEffect(() => {
        if (!loading && typeof window !== 'undefined') {
            sessionStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems, loading]);

    const addToCart = (product, quantity = 1, size = null) => {
        setCartItems(prevItems => {
            // Check if item already exists (same product and size)
            const existingIndex = prevItems.findIndex(
                item => item.product.id === product.id && item.size === size
            );

            if (existingIndex > -1) {
                // Update quantity of existing item
                const newItems = [...prevItems];
                newItems[existingIndex].quantity += quantity;
                return newItems;
            } else {
                // Add new item
                return [...prevItems, { product, quantity, size }];
            }
        });
    };

    const removeFromCart = (productId, size) => {
        setCartItems(prevItems =>
            prevItems.filter(item => !(item.product.id === productId && item.size === size))
        );
    };

    const updateQuantity = (productId, size, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId, size);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product.id === productId && item.size === size
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount,
            loading
        }}>
            {!loading && children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
