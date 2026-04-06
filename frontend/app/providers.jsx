'use client';

import { AuthProvider } from '@/src/context/AuthContext';
import { CartProvider } from '@/src/context/CartContext';
import { ToastProvider } from '@/src/context/ToastContext';

export function Providers({ children }) {
    return (
        <AuthProvider>
            <CartProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </CartProvider>
        </AuthProvider>
    );
}
