import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock } from 'lucide-react';

const Signup = () => {
    const [name, setName] = useState('');
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
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error('Registration failed (email might be taken)');
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
                <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-center mb-2 sm:mb-3 text-black">Join Adefes</h2>
                <p className="text-center text-gray-500 text-sm mb-6 sm:mb-8">Create your account and discover premium Nigerian men's wear</p>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 mb-4 text-sm">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    <div>
                        <label className="block text-sm font-bold mb-2 text-gray-800">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 focus:outline-none focus:border-black text-sm sm:text-base bg-white text-black"
                                required
                            />
                        </div>
                    </div>

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
                                minLength={6}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2.5 sm:py-3 uppercase tracking-widest text-xs sm:text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-center mt-5 sm:mt-6 text-xs sm:text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="font-bold underline hover:text-black">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
