import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from '@/lib/api';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/cart`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (data.success && data.cart.items) {
          const items = data.cart.items.filter(item => item.product).map(item => ({
            id: item.product.id,
            name: item.product.name,
            brand: item.product.brand,
            price: parseFloat(item.product.price),
            quantity: item.quantity,
            image: item.product.images?.[0]?.url || '/images/placeholder.jpg'
          }));
          setCartItems(items);
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/cart/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (response.ok) {
        setCartItems(items => 
          items.map(item => 
            item.id === productId 
              ? { ...item, quantity: newQuantity }
              : item
          ).filter(item => item.quantity > 0)
        );
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setCartItems(items => items.filter(item => item.id !== productId));
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const total = subtotal + shipping - discount;

  const handleApplyCoupon = () => {
    setCouponError('');
    
    // Sample coupon codes
    const validCoupons = {
      'new26': { code: 'new26', discount: 26, description: 'New Customer 26% Off' },
      'save10': { code: 'save10', discount: 10, description: '10% Off' },
      'welcome15': { code: 'welcome15', discount: 15, description: 'Welcome 15% Off' }
    };

    const coupon = validCoupons[couponCode.toLowerCase()];
    
    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

        {loading ? (
          <div className="text-center py-12">
            <p>Loading cart...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Button onClick={() => navigate('/')}>Continue Shopping</Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
              <div key={item.id} className="bg-gradient-card rounded-2xl p-6 shadow-soft flex gap-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 
                    className="font-bold text-foreground text-lg mb-1 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleProductClick(item.id)}
                  >
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">{item.brand}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 border rounded-lg">
                      <button 
                        className="p-2 hover:bg-muted transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 font-semibold">{item.quantity}</span>
                      <button 
                        className="p-2 hover:bg-muted transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="font-bold text-foreground">AED {item.price.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  className="text-destructive hover:text-destructive/80 transition-colors"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              ))}
            </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-card rounded-2xl p-6 shadow-soft sticky top-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">AED {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "FREE" : `AED ${shipping.toFixed(2)}`}
                  </span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span className="text-sm">{appliedCoupon.description}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">-AED {discount.toFixed(2)}</span>
                      <button 
                        onClick={handleRemoveCoupon}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
                {shipping > 0 && (
                  <p className="text-sm text-primary">
                    Add AED {(100 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary">AED {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <Input 
                  placeholder="Enter coupon code (try: new26)" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                />
                {couponError && (
                  <p className="text-sm text-red-500">{couponError}</p>
                )}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim()}
                >
                  Apply Coupon
                </Button>
              </div>

              <Button 
                className="w-full py-6 text-lg font-semibold"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>

              <div className="mt-4 text-center text-sm text-muted-foreground">
                Cash on Delivery Available
              </div>
            </div>
          </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
