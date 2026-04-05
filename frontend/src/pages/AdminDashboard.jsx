import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Package, DollarSign, List, Image as ImageIcon, CheckCircle, Trash2 } from 'lucide-react';
import config from '../config';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('products'); // 'products' or 'users'
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Agbada',
        price: '',
        image_url: '',
        stock: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [fetchingProducts, setFetchingProducts] = useState(false);
    const [fetchingUsers, setFetchingUsers] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const fetchProducts = async () => {
        setFetchingProducts(true);
        try {
            const response = await fetch(`${config.API_BASE_URL}/api/products`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setFetchingProducts(false);
        }
    };

    const fetchUsers = async () => {
        setFetchingUsers(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${config.API_BASE_URL}/api/admin/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setFetchingUsers(false);
        }
    };

    React.useEffect(() => {
        if (user && user.role === 'admin') {
            fetchProducts();
            fetchUsers();
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? parseFloat(value) || value : value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const token = localStorage.getItem('token');
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('category', formData.category);
            data.append('price', formData.price);
            data.append('stock', formData.stock);

            if (selectedFile) {
                data.append('image', selectedFile);
            } else {
                data.append('image_url', formData.image_url);
            }

            const response = await fetch(`${config.API_BASE_URL}/api/products`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Product successfully added to the collection.' });
                setFormData({
                    name: '',
                    description: '',
                    category: 'Agbada',
                    price: '',
                    image_url: '',
                    stock: ''
                });
                setSelectedFile(null);
                setPreviewUrl('');
                fetchProducts(); // Refresh list
            } else {
                const errorData = await response.text();
                setMessage({ type: 'error', text: `Failed to add product: ${errorData}` });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An unexpected error occurred.' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        // if (!window.confirm('Are you sure you want to remove this piece from the collection?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${config.API_BASE_URL}/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 204) {
                setMessage({ type: 'success', text: 'Product successfully removed.' });
                fetchProducts(); // Refresh list
            } else {
                const errorData = await response.text();
                setMessage({ type: 'error', text: `Failed to remove product: ${errorData}` });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An unexpected error occurred.' });
        }
    };

    const handlePromote = async (email) => {
        if (!window.confirm(`Are you sure you want to promote ${email} to Admin?`)) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${config.API_BASE_URL}/api/admin/users/${email}/role`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: 'admin' })
            });

            if (response.ok) {
                setMessage({ type: 'success', text: `Successfully promoted ${email} to admin!` });
                fetchUsers(); // Refresh list
            } else {
                const errorData = await response.text();
                setMessage({ type: 'error', text: `Failed to promote user: ${errorData}` });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An unexpected error occurred.' });
        }
    };

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-playfair font-bold mb-4">Access Denied</h2>
                    <p className="text-gray-600">You do not have permission to view this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden">
                    <div className="bg-black p-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <Plus className="h-6 w-6" />
                            <h1 className="text-2xl font-playfair font-bold">Admin Dashboard</h1>
                        </div>
                        <p className="text-gray-400 text-sm">Add new pieces to the Adefes collection.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6 border-b border-gray-100">
                        {message.text && (
                            <div className={`p-4 rounded-md flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
                                {message.type === 'success' && <CheckCircle className="h-5 w-5" />}
                                <p className="text-sm font-medium">{message.text}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Product Name</label>
                                <div className="relative">
                                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 focus:ring-2 focus:ring-black transition-all text-sm rounded-md"
                                        placeholder="e.g., Royal Gold Agbada"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Category</label>
                                <div className="relative">
                                    <List className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 focus:ring-2 focus:ring-black transition-all text-sm rounded-md appearance-none"
                                    >
                                        <option value="Agbada">Agbada</option>
                                        <option value="Kaftan">Kaftan</option>
                                        <option value="Senator">Senator</option>
                                        <option value="Suit">Suit</option>
                                        <option value="Accessories">Accessories</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Price (₦)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        required
                                        type="number"
                                        name="price"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 focus:ring-2 focus:ring-black transition-all text-sm rounded-md"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Stock Quantity</label>
                                <input
                                    required
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border-0 focus:ring-2 focus:ring-black transition-all text-sm rounded-md"
                                    placeholder="e.g., 50"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Product Image</label>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-400 uppercase">Upload Local File</label>
                                    <div className="relative border-2 border-dashed border-gray-200 rounded-md p-4 hover:border-black transition-colors group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-black">
                                            <ImageIcon className="h-6 w-6" />
                                            <span className="text-xs">{selectedFile ? selectedFile.name : 'Select an image file'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-400 uppercase">Or Paste Image URL</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            type="url"
                                            name="image_url"
                                            value={formData.image_url}
                                            onChange={handleChange}
                                            disabled={selectedFile}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 focus:ring-2 focus:ring-black transition-all text-sm rounded-md disabled:bg-gray-100 disabled:text-gray-400"
                                            placeholder="https://images.unsplash.com/..."
                                        />
                                    </div>
                                    {selectedFile && <p className="text-[10px] text-orange-600">Local file selected. URL will be ignored.</p>}
                                </div>
                            </div>

                            {previewUrl && (
                                <div className="mt-4">
                                    <p className="text-[10px] text-gray-400 uppercase mb-2">Preview</p>
                                    <img src={previewUrl} alt="Preview" className="h-32 w-auto object-cover rounded shadow-sm" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Description</label>
                            <textarea
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 bg-gray-50 border-0 focus:ring-2 focus:ring-black transition-all text-sm rounded-md resize-none"
                                placeholder="Describe the piece — fabric type, embroidery style, occasion..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-900 transition-all disabled:bg-gray-400 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                                    Uploading...
                                </>
                            ) : (
                                'Upload Product'
                            )}
                        </button>
                    </form>
                </div>

                {/* Management Section */}
                <div className="bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden mt-12">
                    <div className="bg-gray-50 p-6 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex gap-1 border-b sm:border-b-0 border-gray-200 sm:bg-white sm:p-1 sm:rounded-md sm:border sm:border-gray-100">
                                <button
                                    onClick={() => setActiveTab('products')}
                                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded ${activeTab === 'products' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'}`}
                                >
                                    Products
                                </button>
                                <button
                                    onClick={() => setActiveTab('users')}
                                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded ${activeTab === 'users' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'}`}
                                >
                                    Users
                                </button>
                            </div>
                            <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-full w-fit">
                                {activeTab === 'products' ? `${products.length} Items Total` : `${users.length} Users Total`}
                            </span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        {activeTab === 'products' ? (
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Product</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Category</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Price</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Stock</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {fetchingProducts ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500 italic">
                                                Loading items...
                                            </td>
                                        </tr>
                                    ) : products.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500 italic">
                                                No items in the collection yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        products.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={product.image_url.startsWith('http') ? product.image_url : `http://localhost:8080${product.image_url}`}
                                                            alt={product.name}
                                                            className="w-12 h-16 object-cover rounded shadow-sm"
                                                        />
                                                        <div>
                                                            <p className="font-bold text-sm text-gray-900">{product.name}</p>
                                                            <p className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">{product.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 font-medium">{product.category}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900 font-bold">₦{product.price.toLocaleString()}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${product.stock > 10 ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                                                        {product.stock} in stock
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                        title="Remove from collection"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">User</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Email</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Role</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Joined</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {fetchingUsers ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500 italic">
                                                Loading users...
                                            </td>
                                        </tr>
                                    ) : users.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500 italic">
                                                No users found.
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map((u) => (
                                            <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-sm text-gray-900">{u.name}</p>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 font-medium">{u.email}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${u.role === 'admin' ? 'bg-purple-50 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(u.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {u.role !== 'admin' && (
                                                        <button
                                                            onClick={() => handlePromote(u.email)}
                                                            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-black text-white rounded hover:bg-gray-800 transition-all"
                                                            title="Promote to admin"
                                                        >
                                                            Promote
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
