import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock } from 'lucide-react';
import config from '../config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            login(data.token, data.user);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-dark-gray px-4 py-8 sm:py-12">
            <div className="max-w-md w-full bg-white p-6 sm:p-8 shadow-md border border-gray-100">
                <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-center mb-2 sm:mb-3 text-black">Welcome Back</h2>
                <p className="text-center text-gray-500 text-sm mb-6 sm:mb-8">Sign in to your Adefes account</p>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 mb-4 text-sm">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    <div>
                        <label className="block text-sm font-bold mb-2 text-gray-800">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 focus:outline-none focus:border-black text-sm sm:text-base bg-white text-black"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-gray-800">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 focus:outline-none focus:border-black text-sm sm:text-base bg-white text-black"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-gold text-brand-charcoal py-3 sm:py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-emerald-dark hover:text-brand-ivory hover:-translate-y-1 hover:shadow-xl transition-all duration-300 disabled:opacity-50 rounded-sm"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center mt-5 sm:mt-6 text-xs sm:text-sm text-gray-600">
                    Don't have an account? <Link to="/signup" className="font-bold underline hover:text-black">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
