'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import Layout from '@/src/components/Layout';
import config from '@/src/config';

export default function AdminDashboard() {
    const { user, token, loading: authLoading } = useAuth();
    const apiBaseUrl = config.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        category: 'Agbada',
        price: '',
        stock: '',
        image_url: '',
    });
    const [productImageFile, setProductImageFile] = useState(null);
    const [productPreviewUrl, setProductPreviewUrl] = useState('');
    const [productLoading, setProductLoading] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editProduct, setEditProduct] = useState({
        name: '',
        description: '',
        category: 'Agbada',
        price: '',
        stock: '',
        image_url: '',
    });
    const [editProductImageFile, setEditProductImageFile] = useState(null);
    const [editProductPreviewUrl, setEditProductPreviewUrl] = useState('');

    useEffect(() => {
        if (authLoading) return;
        if (!user || user.role !== 'admin') {
            setLoading(false);
            return;
        }

        if (!token) {
            setLoading(false);
            return;
        }

        fetchUsers();
        fetchProducts();
        fetchOrders();
    }, [authLoading, user, token]);

    if (authLoading) {
        return (
            <Layout>
                <div className="min-h-screen bg-white flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                </div>
            </Layout>
        );
    }

    // Check if user is admin
    if (!user || user.role !== 'admin') {
        return (
            <Layout>
                <div className="min-h-screen bg-white flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-playfair font-bold mb-4">Access Denied</h1>
                        <p className="text-gray-600">You need admin privileges to access this page.</p>
                    </div>
                </div>
            </Layout>
        );
    }

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/api/admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(Array.isArray(data) ? data : []);
            } else {
                setUsers([]);
            }
        } catch (err) {
            console.error('Failed to fetch users:', err);
            setUsers([]);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/api/products`);
            if (response.ok) {
                const data = await response.json();
                setProducts(Array.isArray(data) ? data : []);
            } else {
                setProducts([]);
            }
        } catch (err) {
            console.error('Failed to fetch products:', err);
            setProducts([]);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/api/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setOrders(Array.isArray(data) ? data : []);
            } else {
                setOrders([]);
            }
        } catch (err) {
            console.error('Failed to fetch orders:', err);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const updateUserRole = async (email, newRole) => {
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch(`${apiBaseUrl}/api/admin/users/${email}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role: newRole }),
            });

            if (response.ok) {
                await fetchUsers(); // Refresh users list
                setSuccessMessage('User role updated successfully.');
            } else {
                setError('Failed to update user role');
            }
        } catch (err) {
            console.error('Failed to update user role:', err);
            setError('Failed to update user role');
        }
    };

    const deleteProduct = async (productId) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch(`${apiBaseUrl}/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                await fetchProducts(); // Refresh products list
                setSuccessMessage('Product removed successfully.');
            } else {
                const text = await response.text();
                setError(text || 'Failed to delete product');
            }
        } catch (err) {
            console.error('Failed to delete product:', err);
            setError('Failed to delete product');
        }
    };

    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleProductImageChange = (event) => {
        const file = event.target.files?.[0];
        setProductImageFile(file || null);
        setProductPreviewUrl(file ? URL.createObjectURL(file) : '');
    };

    const createProduct = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setProductLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('description', newProduct.description);
            formData.append('category', newProduct.category);
            formData.append('price', newProduct.price);
            formData.append('stock', newProduct.stock);
            if (productImageFile) {
                formData.append('image', productImageFile);
            } else if (newProduct.image_url) {
                formData.append('image_url', newProduct.image_url);
            }

            const response = await fetch(`${apiBaseUrl}/api/products`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                await fetchProducts();
                setSuccessMessage('Product created successfully.');
                setNewProduct({
                    name: '',
                    description: '',
                    category: 'Agbada',
                    price: '',
                    stock: '',
                    image_url: '',
                });
                setProductImageFile(null);
                setProductPreviewUrl('');
                setShowAddProductForm(false);
            } else {
                const text = await response.text();
                setError(text || 'Failed to create product');
            }
        } catch (err) {
            console.error('Failed to create product:', err);
            setError('Failed to create product');
        } finally {
            setProductLoading(false);
        }
    };

    const startEditingProduct = (product) => {
        setEditingProduct(product);
        setEditProduct({
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            stock: product.stock,
            image_url: product.image_url,
        });
        setEditProductImageFile(null);
        setEditProductPreviewUrl(product.image_url && (product.image_url.startsWith('http') ? product.image_url : `${apiBaseUrl}${product.image_url}`));
        setShowAddProductForm(false); // Close add form if open
    };

    const cancelEditingProduct = () => {
        setEditingProduct(null);
        setEditProduct({
            name: '',
            description: '',
            category: 'Agbada',
            price: '',
            stock: '',
            image_url: '',
        });
        setEditProductImageFile(null);
        setEditProductPreviewUrl('');
    };

    const handleEditProductChange = (e) => {
        const { name, value } = e.target;
        setEditProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditProductImageChange = (event) => {
        const file = event.target.files?.[0];
        setEditProductImageFile(file || null);
        setEditProductPreviewUrl(file ? URL.createObjectURL(file) : (editingProduct?.image_url && (editingProduct.image_url.startsWith('http') ? editingProduct.image_url : `${apiBaseUrl}${editingProduct.image_url}`)));
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setProductLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', editProduct.name);
            formData.append('description', editProduct.description);
            formData.append('category', editProduct.category);
            formData.append('price', editProduct.price);
            formData.append('stock', editProduct.stock);
            if (editProductImageFile) {
                formData.append('image', editProductImageFile);
            } else if (editProduct.image_url) {
                formData.append('image_url', editProduct.image_url);
            }

            const response = await fetch(`${apiBaseUrl}/api/products/${editingProduct.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                await fetchProducts();
                setSuccessMessage('Product updated successfully.');
                cancelEditingProduct();
            } else {
                const text = await response.text();
                setError(text || 'Failed to update product');
            }
        } catch (err) {
            console.error('Failed to update product:', err);
            setError('Failed to update product');
        } finally {
            setProductLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen bg-white flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50">
                <div className="bg-white py-16 sm:py-24 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-playfair font-bold">Admin Dashboard</h1>
                        <p className="mt-2 text-gray-600">Manage users, products, and orders</p>
                    </div>
                </div>

                {error && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            {error}
                            <button onClick={() => setError('')} className="ml-4 underline">Dismiss</button>
                        </div>
                    </div>
                )}
                {successMessage && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                            {successMessage}
                            <button onClick={() => setSuccessMessage('')} className="ml-4 underline">Dismiss</button>
                        </div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-8">
                        <nav className="-mb-px flex space-x-8">
                            {[
                                { id: 'users', label: 'Users', count: users.length },
                                { id: 'products', label: 'Products', count: products.length },
                                { id: 'orders', label: 'Orders', count: orders.length }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === tab.id
                                            ? 'border-brand-gold text-brand-gold'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {tab.label} ({tab.count})
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">User Management</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => updateUserRole(user.email, e.target.value)}
                                                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <h3 className="text-lg font-medium text-gray-900">Product Management</h3>
                                <button
                                    onClick={() => setShowAddProductForm((prev) => !prev)}
                                    className="bg-brand-gold text-brand-charcoal px-4 py-2 rounded text-sm font-medium hover:bg-brand-emerald-dark hover:text-brand-ivory transition-colors"
                                >
                                    {showAddProductForm ? 'Close Form' : 'Add Product'}
                                </button>
                            </div>
                            {showAddProductForm && (
                                <div className="px-6 py-6 border-b border-gray-200 bg-gray-50">
                                    <form onSubmit={createProduct} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                                <input
                                                    name="name"
                                                    value={newProduct.name}
                                                    onChange={handleNewProductChange}
                                                    required
                                                    className="mt-2 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                                <select
                                                    name="category"
                                                    value={newProduct.category}
                                                    onChange={handleNewProductChange}
                                                    className="mt-2 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
                                                >
                                                    <option value="Agbada">Agbada</option>
                                                    <option value="Kaftan">Kaftan</option>
                                                    <option value="Senator">Senator</option>
                                                    <option value="Suit">Suit</option>
                                                    <option value="Accessories">Accessories</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                                <input
                                                    name="price"
                                                    type="number"
                                                    step="0.01"
                                                    value={newProduct.price}
                                                    onChange={handleNewProductChange}
                                                    required
                                                    className="mt-2 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Stock</label>
                                                <input
                                                    name="stock"
                                                    type="number"
                                                    value={newProduct.stock}
                                                    onChange={handleNewProductChange}
                                                    required
                                                    className="mt-2 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    name="description"
                                                    value={newProduct.description}
                                                    onChange={handleNewProductChange}
                                                    required
                                                    rows={4}
                                                    className="mt-2 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                                <input
                                                    name="image_url"
                                                    value={newProduct.image_url}
                                                    onChange={handleNewProductChange}
                                                    className="mt-2 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleProductImageChange}
                                                    className="mt-2 block w-full text-sm text-gray-700"
                                                />
                                                {productPreviewUrl && (
                                                    <img
                                                        src={productPreviewUrl}
                                                        alt="Preview"
                                                        className="mt-3 h-24 w-auto rounded border border-gray-200 object-cover"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={productLoading}
                                                className="inline-flex items-center justify-center rounded bg-black px-6 py-2 text-sm font-semibold text-white hover:bg-gray-900 disabled:opacity-50"
                                            >
                                                {productLoading ? 'Saving...' : 'Save Product'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                            {editingProduct && (
                                <div className="px-6 py-6 border-b border-gray-200 bg-blue-50">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-lg font-medium text-gray-900">Edit Product</h4>
                                        <button
                                            onClick={cancelEditingProduct}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <form onSubmit={updateProduct} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                                <input
                                                    name="name"
                                                    value={editProduct.name}
                                                    onChange={handleEditProductChange}
                                                    required
                                                    className="mt-2 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                                <select
                                                    name="category"
                                                    value={editProduct.category}
                                                    onChange={handleEditProductChange}
                                                    className="mt-2 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
                                                >
                                                    <option value="Agbada">Agbada</option>
                                                    <option value="Kaftan">Kaftan</option>
                                                    <option value="Senator">Senator</option>
                                                    <option value="Suit">Suit</option>
                                                    <option value="Accessories">Accessories</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                                <input
                                                    name="price"
                                                    type="number"
                                                    step="0.01"
                                                    value={editProduct.price}
                                                    onChange={handleEditProductChange}
                                                    required
                                                    className="mt-2 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Stock</label>
                                                <input
                                                    name="stock"
                                                    type="number"
                                                    value={editProduct.stock}
                                                    onChange={handleEditProductChange}
                                                    required
                                                    className="mt-2 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    name="description"
                                                    value={editProduct.description}
                                                    onChange={handleEditProductChange}
                                                    required
                                                    rows={4}
                                                    className="mt-2 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                                <input
                                                    name="image_url"
                                                    value={editProduct.image_url}
                                                    onChange={handleEditProductChange}
                                                    className="mt-2 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">Upload New Image</label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleEditProductImageChange}
                                                    className="mt-2 block w-full text-sm text-gray-700"
                                                />
                                                {editProductPreviewUrl && (
                                                    <img
                                                        src={editProductPreviewUrl}
                                                        alt="Preview"
                                                        className="mt-3 h-24 w-auto rounded border border-gray-200 object-cover"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                onClick={cancelEditingProduct}
                                                className="inline-flex items-center justify-center rounded bg-gray-300 px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-400"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={productLoading}
                                                className="inline-flex items-center justify-center rounded bg-black px-6 py-2 text-sm font-semibold text-white hover:bg-gray-900 disabled:opacity-50"
                                            >
                                                {productLoading ? 'Updating...' : 'Update Product'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {products.map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <img
                                                        src={product.image_url && (product.image_url.startsWith('http') ? product.image_url : `${apiBaseUrl}${product.image_url}`)}
                                                        alt={product.name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₦{product.price.toLocaleString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => startEditingProduct(product)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteProduct(product.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Order Management</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {orders.map((order) => (
                                            <tr key={order.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer_name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₦{order.total_amount?.toLocaleString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
