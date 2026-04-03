import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './pages/Orders';
import About from './pages/About';
import Collections from './pages/Collections';
import AdminDashboard from './pages/AdminDashboard';
import FashionDesignerEkiti from './pages/FashionDesignerEkiti';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="shop" element={<Shop />} />
                  <Route path="shop/:id" element={<ProductDetail />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="order-success/:id" element={<OrderSuccess />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="about" element={<About />} />
                  <Route path="collections" element={<Collections />} />
                  <Route path="fashion-designer-ekiti" element={<FashionDesignerEkiti />} />
                  <Route path="admin" element={<AdminDashboard />} />
                  <Route path="*" element={<div className="p-20 text-center font-playfair text-2xl">Page Not Found</div>} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
