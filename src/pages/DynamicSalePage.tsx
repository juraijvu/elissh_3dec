import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Clock } from "lucide-react";
import { productsAPI } from "@/lib/api";
import makeupImage from "@/assets/category-makeup.jpg";

const DynamicSalePage = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('discount');

  useEffect(() => {
    fetchSaleProducts();
  }, []);

  const fetchSaleProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getSaleProducts();
      setSaleProducts(response.data.products || []);
    } catch (error) {
      console.error('Failed to fetch sale products:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedProducts = [...saleProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'discount':
        const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
        const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
        return discountB - discountA;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header */}
      <section className="relative h-80 overflow-hidden">
        <img src={makeupImage} alt="Sale" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-destructive/80 to-destructive/40 flex items-center">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block bg-white text-destructive px-6 py-3 rounded-full text-xl font-bold mb-6">
              🔥 MEGA SALE 🔥
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4">Up to 70% Off</h1>
            <p className="text-white text-xl lg:text-2xl mb-6">Limited Time Offers on Top Beauty Products</p>
            <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full inline-flex">
              <Clock className="h-5 w-5 text-white" />
              <span className="text-white font-bold">Ends in 3:45:30</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            All Sale Items ({saleProducts.length})
          </h2>
          <select 
            className="border rounded-lg px-4 py-2 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="discount">Biggest Discount</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : saleProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold mb-2">No sale products available</h3>
            <p className="text-muted-foreground">Check back soon for amazing deals!</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default DynamicSalePage;