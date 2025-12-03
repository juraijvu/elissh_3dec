import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id?: number;
  image?: string;
  images?: string[];
  name: string;
  brand: string;
  price: number | string;
  originalPrice?: number | string;
  rating: number;
  reviews: number;
  badge?: string;
}

export const ProductCard = ({
  id = 1,
  image,
  images,
  name,
  brand,
  price,
  originalPrice,
  rating,
  reviews,
  badge,
}: ProductCardProps) => {
  const displayImage = images && images.length > 0 ? images[0] : image;
  const imageUrl = displayImage && !displayImage.startsWith('http') ? `http://elissh.com${displayImage}` : displayImage;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  const numOriginalPrice = typeof originalPrice === 'string' ? parseFloat(originalPrice) : originalPrice;
  const discount = numOriginalPrice ? Math.round(((numOriginalPrice - numPrice) / numOriginalPrice) * 100) : 0;

  useEffect(() => {
    checkWishlistStatus();
  }, [id]);

  const checkWishlistStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://elissh.com/api'}/wishlist`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success && data.wishlist.items) {
        const isInWishlist = data.wishlist.items.some(item => item.productId === id);
        setIsWishlisted(isInWishlist);
      }
    } catch (error) {
      console.error('Failed to check wishlist status:', error);
    }
  };

  const toggleWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: 'Login Required',
          description: 'Please login to add items to wishlist',
          variant: 'destructive'
        });
        return;
      }

      setLoading(true);
      const url = isWishlisted 
        ? `${import.meta.env.VITE_API_URL || 'http://elissh.com/api'}/wishlist/remove/${id}`
        : `${import.meta.env.VITE_API_URL || 'http://elissh.com/api'}/wishlist/add/${id}`;
      
      const method = isWishlisted ? 'DELETE' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsWishlisted(!isWishlisted);
        window.dispatchEvent(new CustomEvent('wishlistUpdated'));
        toast({
          title: isWishlisted ? 'Removed from Wishlist' : 'Added to Wishlist',
          description: isWishlisted ? 'Item removed from your wishlist' : 'Item added to your wishlist'
        });
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to update wishlist',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update wishlist',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link to={`/product/${id}`} className="block">
      <div className="group relative bg-card rounded overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-card">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className={`${imageUrl ? 'hidden' : 'flex'} items-center justify-center w-full h-full text-gray-400`}>
          <ShoppingBag className="h-12 w-12" />
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {badge && (
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-semibold">
              {badge}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded text-xs font-semibold">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist();
          }}
          disabled={loading}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded shadow-soft transition-all disabled:opacity-50"
        >
          <Heart
            className={`h-5 w-5 ${
              isWishlisted ? "fill-primary text-primary" : "text-foreground"
            }`}
          />
        </button>

        {/* Quick Add - Shows on Hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
          <Button 
            onClick={(e) => e.preventDefault()}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-glow"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground font-medium mb-1">{brand}</p>
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[2.5rem]">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(rating)
                    ? "fill-primary text-primary"
                    : "text-border"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            AED {numPrice.toFixed(2)}
          </span>
          {numOriginalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              AED {numOriginalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">(incl. VAT)</p>
      </div>
    </div>
    </Link>
  );
};
