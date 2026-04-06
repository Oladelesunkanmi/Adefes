'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check session storage for existing session
        const storedToken = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
        const storedUser = typeof window !== 'undefined' ? sessionStorage.getItem('user') : null;

        if (storedToken && storedUser) {
            setToken(storedToken);
            try {
                setUser(JSON.parse(storedUser));
            } catch (parseError) {
                console.error('Failed to parse stored user:', parseError);
                sessionStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = (newToken, newUser) => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('token', newToken);
            sessionStorage.setItem('user', JSON.stringify(newUser));
        }
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
        }
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
