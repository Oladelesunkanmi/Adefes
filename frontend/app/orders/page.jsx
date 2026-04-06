'use client';

import Layout from '@/src/components/Layout';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Orders = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                // Fetch orders from API
                const response = await fetch('/api/orders', {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, router]);

    return (
        <Layout>
            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="bg-gray-50 py-16 sm:py-24 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl font-playfair font-bold">My Orders</h1>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    {loading ? (
                        <p>Loading orders...</p>
                    ) : orders.length === 0 ? (
                        <p className="text-center text-gray-500">You haven&apos;t made any orders yet.</p>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="border border-gray-200 p-6 rounded">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold">Order #{order.id}</p>
                                            <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">₦{order.total.toLocaleString()}</p>
                                            <p className="text-sm">{order.status}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
