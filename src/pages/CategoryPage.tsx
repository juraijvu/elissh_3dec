import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import CategoryPageBanner from "@/components/CategoryPageBanner";
import { useParams } from "react-router-dom";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import makeupImage from "@/assets/category-makeup.jpg";
import skincareImage from "@/assets/category-skincare.jpg";
import fragranceImage from "@/assets/category-fragrance.jpg";
import haircareImage from "@/assets/category-haircare.jpg";

const categoryData: Record<string, { title: string; image: string; description: string }> = {
  makeup: {
    title: "Makeup",
    image: makeupImage,
    description: "Discover the latest makeup trends and best-selling products",
  },
  skincare: {
    title: "Skincare",
    image: skincareImage,
    description: "Premium skincare solutions for glowing, healthy skin",
  },
  haircare: {
    title: "Haircare",
    image: haircareImage,
    description: "Professional haircare products for all hair types",
  },
  fragrance: {
    title: "Fragrance",
    image: fragranceImage,
    description: "Luxury fragrances and perfumes from top brands",
  },
  accessories: {
    title: "Accessories",
    image: makeupImage,
    description: "Beauty tools and accessories for the perfect look",
  },
};

const mockProducts = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  image: i % 4 === 0 ? makeupImage : i % 4 === 1 ? skincareImage : i % 4 === 2 ? fragranceImage : haircareImage,
  name: `Product ${i + 1}`,
  brand: "Brand Name",
  price: 99.99 + i * 10,
  originalPrice: i % 3 === 0 ? 149.99 + i * 10 : undefined,
  rating: 4.5 + (i % 5) * 0.1,
  reviews: 100 + i * 20,
  badge: i % 4 === 0 ? "Bestseller" : i % 4 === 1 ? "New" : undefined,
}));

const CategoryPage = () => {
  const { category = "makeup" } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('best-selling');
  const [filters, setFilters] = useState({
    priceRange: [],
    rating: [],
    features: []
  });
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const data = categoryData[category] || {
    title: category.charAt(0).toUpperCase() + category.slice(1),
    image: makeupImage,
    description: `Explore our ${category} collection`
  };

  // Function to render products with banners after every 3 rows (12 products)
  const renderProductsWithBanners = () => {
    const productsPerRow = 4;
    const rowsBeforeBanner = 3;
    const productsBeforeBanner = productsPerRow * rowsBeforeBanner; // 12 products
    const chunks = [];
    
    for (let i = 0; i < filteredProducts.length; i += productsBeforeBanner) {
      const chunk = filteredProducts.slice(i, i + productsBeforeBanner);
      chunks.push(chunk);
    }
    
    return chunks.map((chunk, chunkIndex) => (
      <div key={chunkIndex} className="space-y-6">
        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {chunk.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        {/* Banner after each chunk (except the last one if it's small) */}
        {chunkIndex < chunks.length - 1 && chunk.length >= productsBeforeBanner && (
          <div className="my-8">
            <CategoryPageBanner category={category} bannerIndex={chunkIndex} />
          </div>
        )}
      </div>
    ));
  };

  useEffect(() => {
    let filtered = [...mockProducts];

    // Apply price filters
    if (filters.priceRange.length > 0) {
      filtered = filtered.filter(product => {
        return filters.priceRange.some(range => {
          if (range === 'under-50') return product.price < 50;
          if (range === '50-100') return product.price >= 50 && product.price <= 100;
          if (range === '100-200') return product.price > 100 && product.price <= 200;
          if (range === 'over-200') return product.price > 200;
          return false;
        });
      });
    }

    // Apply rating filters
    if (filters.rating.length > 0) {
      filtered = filtered.filter(product => {
        return filters.rating.some(rating => {
          if (rating === '5') return product.rating >= 5;
          if (rating === '4') return product.rating >= 4;
          if (rating === '3') return product.rating >= 3;
          return false;
        });
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // best-selling - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [filters, sortBy]);

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      


      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <button onClick={() => window.location.href = '/'} className="hover:text-foreground transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="capitalize">{data.title}</span>
        </div>
      </div>

      {/* Category Header */}
      <section className="py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">{data.title}</h1>
          <p className="text-muted-foreground text-lg lg:text-xl">{data.description}</p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="container mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <p className="text-muted-foreground">Showing {filteredProducts.length} products</p>
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <select 
              className="border rounded-lg px-4 py-2 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="best-selling">Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <aside className="w-64 space-y-6">
              <div>
                <h3 className="font-bold text-foreground mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={filters.priceRange.includes('under-50')}
                      onChange={() => handleFilterChange('priceRange', 'under-50')}
                    />
                    <span className="text-sm">Under 50 AED</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={filters.priceRange.includes('50-100')}
                      onChange={() => handleFilterChange('priceRange', '50-100')}
                    />
                    <span className="text-sm">50 - 100 AED</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={filters.priceRange.includes('100-200')}
                      onChange={() => handleFilterChange('priceRange', '100-200')}
                    />
                    <span className="text-sm">100 - 200 AED</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={filters.priceRange.includes('over-200')}
                      onChange={() => handleFilterChange('priceRange', 'over-200')}
                    />
                    <span className="text-sm">Over 200 AED</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-3">Rating</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={filters.rating.includes('5')}
                      onChange={() => handleFilterChange('rating', '5')}
                    />
                    <span className="text-sm">⭐⭐⭐⭐⭐ & Up</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={filters.rating.includes('4')}
                      onChange={() => handleFilterChange('rating', '4')}
                    />
                    <span className="text-sm">⭐⭐⭐⭐ & Up</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={filters.rating.includes('3')}
                      onChange={() => handleFilterChange('rating', '3')}
                    />
                    <span className="text-sm">⭐⭐⭐ & Up</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-3">Features</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Halal Certified</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Vegan</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Cruelty-Free</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Sweat-Proof</span>
                  </label>
                </div>
              </div>
            </aside>
          )}

          {/* Product Grid with Dynamic Banners */}
          <div className="flex-1">
            <div className="space-y-6">
              {renderProductsWithBanners()}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;