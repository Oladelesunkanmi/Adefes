import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { Package, ChevronRight, Clock } from 'lucide-react';
import config from '../config';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { showToast } = useToast();

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`${config.API_BASE_URL}/api/orders`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data || []);
            } catch (error) {
                console.error('Fetch orders error:', error);
                showToast('Failed to load order history', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate, showToast]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-playfair font-bold mb-8">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="bg-white p-12 text-center rounded-lg shadow-sm">
                        <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                        <h2 className="text-xl font-medium mb-2">No orders found</h2>
                        <p className="text-gray-500 mb-6">You haven't placed any orders yet. Explore our Agbada and men's wear collection.</p>
                        <button
                            onClick={() => navigate('/shop')}
                            className="bg-brand-gold text-brand-charcoal px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-emerald-dark hover:text-brand-ivory hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-sm"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border border-transparent hover:border-gray-200 transition-all">
                                <div className="flex flex-wrap justify-between items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gray-100 p-3 rounded-full">
                                            <Package className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                                                Order #ADF-{order.id.toString().padStart(6, '0')}
                                            </p>
                                            <p className="font-bold text-lg">₦{order.total_amount.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-sm text-gray-500 flex items-center gap-1 justify-end">
                                                <Clock className="h-4 w-4" />
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </p>
                                            <span className={`text-xs px-2 py-1 rounded-full uppercase tracking-tighter font-bold ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        {/* Future: Link to order details */}
                                        <div className="text-gray-400">
                                            <ChevronRight className="h-6 w-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
