import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, Star, Plus, Minus, ShoppingBag, Truck, RotateCcw, Shield, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cartAPI, wishlistAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const ReviewsSection = ({ productData }: { productData: any }) => {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const totalReviews = 15; // Mock total reviews
  
  const mockReviews = Array.from({ length: totalReviews }, (_, i) => ({
    id: i + 1,
    name: `Customer ${i + 1}`,
    rating: 4 + Math.random(),
    text: `Amazing lipstick! The color is exactly as shown and it lasts all day. Perfect for Dubai's hot weather. Review ${i + 1}.`
  }));

  const showMoreReviews = () => {
    setVisibleReviews(prev => Math.min(prev + 4, totalReviews));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews ({productData.reviews})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-3xl font-bold">{productData.rating}</div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(productData.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{productData.reviews} reviews</p>
          </div>
        </div>
        <div className="space-y-4">
          {mockReviews.slice(0, visibleReviews).map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium">{review.name}</span>
                <span className="text-xs text-muted-foreground">Verified Purchase</span>
              </div>
              <p className="text-sm text-muted-foreground">{review.text}</p>
            </div>
          ))}
        </div>
        {visibleReviews < totalReviews && (
          <div className="text-center pt-4">
            <Button variant="outline" onClick={showMoreReviews}>
              Show More Reviews ({totalReviews - visibleReviews} remaining)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
import makeupImage from "@/assets/category-makeup.jpg";
import skincareImage from "@/assets/category-skincare.jpg";
import fragranceImage from "@/assets/category-fragrance.jpg";
import haircareImage from "@/assets/category-haircare.jpg";

const relatedProducts = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  image: i % 4 === 0 ? makeupImage : i % 4 === 1 ? skincareImage : i % 4 === 2 ? fragranceImage : haircareImage,
  name: `Related Product ${i + 1}`,
  brand: "Brand Name",
  price: 89.99 + i * 10,
  rating: 4.5,
  reviews: 123,
}));

const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedShade, setSelectedShade] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  const images = [makeupImage, skincareImage, fragranceImage, haircareImage];
  const shades = [
    { name: "Desert Rose", color: "#C4747E" },
    { name: "Coral Blush", color: "#FF6B6B" },
    { name: "Berry Wine", color: "#8B2635" },
    { name: "Nude Pink", color: "#D4A574" }
  ];

  const productData = {
    name: "Matte Luxe Lipstick - Desert Rose",
    brand: "Elissh Signature",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 234,
    description: "A long-lasting matte lipstick with intense color payoff. Perfect for the UAE climate with its sweat-proof and transfer-resistant formula. Available in 12 stunning shades.",
    ingredients: ["Dimethicone", "Cyclopentasiloxane", "Titanium Dioxide", "Iron Oxides", "Mica", "Vitamin E"],
    howToUse: "Apply directly to clean, dry lips starting from the center and working outward. For best results, exfoliate lips before application.",
    certifications: ["halal", "cruelty-free", "vegan"]
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast({ title: "Please login to add items to cart", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await cartAPI.addToCart({
        productId: id,
        quantity,
        variant: { name: "Shade", value: shades[selectedShade].name }
      });
      toast({ title: "Added to cart successfully!" });
    } catch (error) {
      toast({ title: "Failed to add to cart", variant: "destructive" });
    }
    setLoading(false);
  };

  const handleWishlist = async () => {
    if (!user) {
      toast({ title: "Please login to add to wishlist", variant: "destructive" });
      return;
    }
    try {
      if (isWishlisted) {
        await wishlistAPI.removeFromWishlist(id!);
        setIsWishlisted(false);
        toast({ title: "Removed from wishlist" });
      } else {
        await wishlistAPI.addToWishlist(id!);
        setIsWishlisted(true);
        toast({ title: "Added to wishlist!" });
      }
    } catch (error) {
      toast({ title: "Failed to update wishlist", variant: "destructive" });
    }
  };

  const handleShare = async () => {
    // Check if we're on HTTPS (required for Web Share API)
    if (navigator.share && window.location.protocol === 'https:') {
      try {
        await navigator.share({
          title: productData.name,
          text: `Check out this amazing product from ${productData.brand}`,
          url: window.location.href
        });
        return;
      } catch (error) {
        if (error.name === 'AbortError') return; // User cancelled
      }
    }
    
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied to clipboard!" });
    } catch (error) {
      // Final fallback
      const tempInput = document.createElement('input');
      tempInput.value = window.location.href;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      toast({ title: "Link copied to clipboard!" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-8 flex items-center gap-2">
          <button onClick={() => window.location.href = '/'} className="hover:text-foreground transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => window.location.href = '/category/makeup'} className="hover:text-foreground transition-colors">
            Makeup
          </button>
          <span>/</span>
          <button onClick={() => window.location.href = '/category/makeup'} className="hover:text-foreground transition-colors">
            Lipstick
          </button>
          <span>/</span>
          <span>Product {id}</span>
        </div>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-elevated mb-4 aspect-square">
              <img
                src={images[selectedImage]}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full aspect-square object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                Bestseller
              </Badge>
              {productData.certifications.includes('halal') && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  ✓ Halal Certified
                </Badge>
              )}
              {productData.certifications.includes('cruelty-free') && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  🐰 Cruelty Free
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {productData.name}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-4">{productData.brand}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-muted-foreground">4.8 (234 reviews)</span>
            </div>

            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-4xl font-bold text-primary">AED {productData.price}</span>
              <span className="text-2xl text-muted-foreground line-through">AED {productData.originalPrice}</span>
              <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">
                Save {Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)}%
              </Badge>
            </div>

            {/* Stock & Availability */}
            <div className="mb-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">In Stock - Only 8 left!</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>Free delivery by Tomorrow if ordered within 4 hours</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4" />
                <span>Available for Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4" />
                <span>1,234 people have this in their wishlist</span>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {productData.description}
            </p>

            {/* Shade Selector */}
            <div className="mb-6">
              <h3 className="font-bold text-foreground mb-3">Select Shade: {shades[selectedShade].name}</h3>
              <div className="flex gap-3">
                {shades.map((shade, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedShade(index)}
                    className={`w-12 h-12 rounded-full border-3 transition-all hover:scale-110 ${
                      selectedShade === index ? 'border-primary shadow-lg' : 'border-border'
                    }`}
                    style={{ backgroundColor: shade.color }}
                    title={shade.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-bold text-foreground mb-3">Quantity</h3>
              <div className="flex items-center gap-2 border rounded-lg w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex-1 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <Button 
                onClick={handleAddToCart}
                disabled={loading}
                className="flex-1 py-6 text-base lg:text-lg font-semibold"
              >
                <ShoppingBag className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                {loading ? 'Adding...' : 'Add to Cart'}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="py-6 px-4 lg:px-6 min-w-[48px] h-[60px]"
                onClick={handleWishlist}
                title="Add to Wishlist"
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="py-6 px-4 lg:px-6 min-w-[48px] h-[60px]"
                onClick={handleShare}
                title="Share Product"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-4 gap-2">
              <Card className="bg-gradient-card">
                <CardContent className="p-3 text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Truck className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="font-medium text-xs">Free Shipping</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card">
                <CardContent className="p-3 text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="font-medium text-xs">Cash on Delivery</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card">
                <CardContent className="p-3 text-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <RotateCcw className="h-4 w-4 text-orange-600" />
                  </div>
                  <p className="font-medium text-xs">14-Day Returns</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card">
                <CardContent className="p-3 text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="h-4 w-4 text-purple-600" />
                  </div>
                  <p className="font-medium text-xs">100% Authentic</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Desktop Tabs */}
        <Card className="mb-16 hidden md:block">
          <Tabs defaultValue="description" className="w-full">
            <CardHeader className="overflow-hidden">
              <div className="overflow-x-auto">
                <TabsList className="w-max min-w-full flex md:grid md:grid-cols-5 md:w-full">
                  <TabsTrigger value="description" className="flex-shrink-0 px-3 text-sm">Description</TabsTrigger>
                  <TabsTrigger value="ingredients" className="flex-shrink-0 px-3 text-sm">Ingredients</TabsTrigger>
                  <TabsTrigger value="howto" className="flex-shrink-0 px-3 text-sm">How to Use</TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-shrink-0 px-3 text-sm">Reviews ({productData.reviews})</TabsTrigger>
                  <TabsTrigger value="gallery" className="flex-shrink-0 px-3 text-sm">User Gallery</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="description" className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Our Matte Luxe Lipstick delivers rich, velvety color that lasts all day. The lightweight formula 
                  glides on smoothly and sets to a comfortable matte finish without drying your lips. Infused with 
                  nourishing ingredients, it keeps your lips soft and hydrated even in hot climates.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Long-lasting 8+ hour wear</li>
                      <li>• Transfer-resistant formula</li>
                      <li>• Comfortable matte finish</li>
                      <li>• Buildable coverage</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Perfect For:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• All-day wear</li>
                      <li>• Special occasions</li>
                      <li>• Hot climate conditions</li>
                      <li>• Professional settings</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="ingredients" className="space-y-4">
                <h4 className="font-semibold">Full Ingredient List:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {productData.ingredients.map((ingredient, index) => (
                    <div key={index} className="text-sm text-muted-foreground p-2 bg-muted/50 rounded">
                      {ingredient}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  All ingredients are carefully selected and tested for safety. This product is free from parabens, 
                  sulfates, and harmful chemicals.
                </p>
              </TabsContent>
              <TabsContent value="howto" className="space-y-4">
                <h4 className="font-semibold">Application Instructions:</h4>
                <p className="text-muted-foreground">{productData.howToUse}</p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Pro Tips:</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use a lip liner for precise application</li>
                    <li>• Blot with tissue and reapply for longer wear</li>
                    <li>• Apply lip balm 10 minutes before for smoother application</li>
                    <li>• Use a makeup remover for easy removal</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl font-bold">{productData.rating}</div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(productData.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{productData.reviews} reviews</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[1,2,3].map((review) => (
                    <div key={review} className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm font-medium">Sarah M.</span>
                        <span className="text-xs text-muted-foreground">Verified Purchase</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Amazing lipstick! The color is exactly as shown and it lasts all day. Perfect for Dubai's hot weather.
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="gallery" className="space-y-4">
                <h4 className="font-semibold">Customer Photos</h4>
                <p className="text-sm text-muted-foreground mb-4">See how other customers are using this product</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1,2,3,4,5,6,7,8].map((photo) => (
                    <div key={photo} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                      <img 
                        src={`https://images.unsplash.com/photo-${1596462502278 + photo}?w=200&h=200&fit=crop`}
                        alt={`Customer photo ${photo}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                    </div>
                  ))}
                </div>
                <div className="text-center pt-4">
                  <Button variant="outline" className="text-sm">
                    Upload Your Photo
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        {/* Mobile Sections */}
        <div className="mb-16 space-y-6 md:hidden">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Our Matte Luxe Lipstick delivers rich, velvety color that lasts all day. The lightweight formula 
                glides on smoothly and sets to a comfortable matte finish without drying your lips. Infused with 
                nourishing ingredients, it keeps your lips soft and hydrated even in hot climates.
              </p>
              <div className="space-y-4 mt-6">
                <div>
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Long-lasting 8+ hour wear</li>
                    <li>• Transfer-resistant formula</li>
                    <li>• Comfortable matte finish</li>
                    <li>• Buildable coverage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Perfect For:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• All-day wear</li>
                    <li>• Special occasions</li>
                    <li>• Hot climate conditions</li>
                    <li>• Professional settings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">Full Ingredient List:</h4>
              <div className="grid grid-cols-2 gap-2">
                {productData.ingredients.map((ingredient, index) => (
                  <div key={index} className="text-sm text-muted-foreground p-2 bg-muted/50 rounded">
                    {ingredient}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                All ingredients are carefully selected and tested for safety. This product is free from parabens, 
                sulfates, and harmful chemicals.
              </p>
            </CardContent>
          </Card>

          {/* How to Use */}
          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">Application Instructions:</h4>
              <p className="text-muted-foreground">{productData.howToUse}</p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h5 className="font-semibold mb-2">Pro Tips:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use a lip liner for precise application</li>
                  <li>• Blot with tissue and reapply for longer wear</li>
                  <li>• Apply lip balm 10 minutes before for smoother application</li>
                  <li>• Use a makeup remover for easy removal</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <ReviewsSection productData={productData} />

          {/* User Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>User Gallery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">See how other customers are using this product</p>
              <div className="grid grid-cols-2 gap-4">
                {[1,2,3,4,5,6,7,8].map((photo) => (
                  <div key={photo} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                    <img 
                      src={`https://images.unsplash.com/photo-${1596462502278 + photo}?w=200&h=200&fit=crop`}
                      alt={`Customer photo ${photo}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                  </div>
                ))}
              </div>
              <div className="text-center pt-4">
                <Button variant="outline" className="text-sm">
                  Upload Your Photo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Frequently Bought Together */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Bought Together</h2>
          <Card className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-4">
                <img src={makeupImage} alt="This item" className="w-20 h-20 rounded-lg object-cover" />
                <span className="text-2xl">+</span>
                <img src={skincareImage} alt="Lip liner" className="w-20 h-20 rounded-lg object-cover" />
                <span className="text-2xl">+</span>
                <img src={fragranceImage} alt="Lip balm" className="w-20 h-20 rounded-lg object-cover" />
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground mb-2">Total Price: <span className="line-through">AED 249.97</span></p>
                <p className="text-2xl font-bold text-primary mb-4">Bundle Price: AED 199.99</p>
                <Button className="w-full md:w-auto">Add All to Cart - Save AED 49.98</Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Size Guide */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Size Guide & Application Tips</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Coverage Guide</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Light Coverage:</span><span>1-2 swipes</span></div>
                  <div className="flex justify-between"><span>Medium Coverage:</span><span>2-3 swipes</span></div>
                  <div className="flex justify-between"><span>Full Coverage:</span><span>3-4 swipes</span></div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Longevity Tips</h4>
                <ul className="text-sm space-y-1">
                  <li>• Exfoliate lips before application</li>
                  <li>• Use lip liner for longer wear</li>
                  <li>• Blot and reapply for intensity</li>
                  <li>• Avoid oily foods for first hour</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>



        {/* Cross-sell Products */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Complete Your Look</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { name: "Lip Liner - Desert Rose", price: 39.99, image: makeupImage, badge: "Perfect Match" },
              { name: "Lip Prep Scrub", price: 29.99, image: skincareImage, badge: "Prep Essential" },
              { name: "Setting Spray", price: 49.99, image: fragranceImage, badge: "Long Wear" },
              { name: "Makeup Remover", price: 34.99, image: haircareImage, badge: "Gentle Remove" }
            ].map((product, i) => (
              <Card key={i} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-t-lg" />
                  <Badge className="absolute top-2 left-2 text-xs">{product.badge}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-2">{product.name}</h3>
                  <p className="text-primary font-bold mb-3">AED {product.price}</p>
                  <Button size="sm" className="w-full">Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recently Viewed */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Recently Viewed</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* You May Also Like */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
