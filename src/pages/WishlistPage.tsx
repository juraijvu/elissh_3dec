import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '@/lib/api';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/wishlist`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success && data.wishlist.items) {
        const items = data.wishlist.items.filter(item => item.product).map(item => ({
          id: item.product.id,
          name: item.product.name,
          brand: item.product.brand,
          price: parseFloat(item.product.price),
          image: item.product.images?.[0]?.url || '/images/placeholder.jpg',
          rating: 4.5,
          reviews: 100
        }));
        setWishlistItems(items);
      }
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
    
    // Listen for wishlist updates
    const handleWishlistUpdate = () => {
      fetchWishlist();
    };
    
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, [navigate]);

  const handleAddAllToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      for (const item of wishlistItems) {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/cart/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            productId: item.id,
            quantity: 1
          })
        });
      }
      alert('All items added to cart!');
    } catch (error) {
      console.error('Failed to add items to cart:', error);
    }
  };

  const handleRemoveFromWishlist = async (productId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/wishlist/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setWishlistItems(items => items.filter(item => item.id !== productId));
        window.dispatchEvent(new CustomEvent('wishlistUpdated'));
      }
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading wishlist...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Heart className="h-8 w-8 text-primary" />
                My Wishlist
              </h1>
              <p className="text-muted-foreground">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            {wishlistItems.length > 0 && (
              <Button onClick={handleAddAllToCart} className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Add All to Cart
              </Button>
            )}
          </div>

          {/* Wishlist Items */}
          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {wishlistItems.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard {...product} />
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-soft opacity-0 group-hover:opacity-100 transition-all duration-200"
                    title="Remove from wishlist"
                  >
                    <Heart className="h-4 w-4 text-destructive fill-destructive" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Save products you love by clicking the heart icon. We'll keep them safe here for you!
              </p>
              <Button size="lg" className="px-8">
                Start Shopping
              </Button>
            </div>
          )}

          {/* Recommendations */}
          {wishlistItems.length > 0 && (
            <section className="mt-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {wishlistItems.slice(0, 4).map((product) => (
                  <ProductCard
                    key={`rec-${product.id}`}
                    {...product}
                    id={product.id + 100}
                    badge="Recommended"
                  />
                ))}
              </div>
            </section>
          )}

          {/* Benefits Section */}
          <section className="mt-16 bg-gradient-card rounded-3xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Use Wishlist?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Keep track of products you love and never miss out on your favorites
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Save Favorites</h3>
                <p className="text-sm text-muted-foreground">
                  Keep track of products you love for easy access later
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Quick Shopping</h3>
                <p className="text-sm text-muted-foreground">
                  Add multiple items to cart with one click
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 0 0-15 0v5h5l-5 5-5-5h5V7a9.5 9.5 0 0 1 19 0v10z" />
                  </svg>
                </div>
                <h3 className="font-bold text-foreground mb-2">Price Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Get notified when your wishlist items go on sale
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WishlistPage;