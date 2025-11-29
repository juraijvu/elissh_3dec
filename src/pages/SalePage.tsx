import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Clock } from "lucide-react";
import makeupImage from "@/assets/category-makeup.jpg";
import skincareImage from "@/assets/category-skincare.jpg";
import fragranceImage from "@/assets/category-fragrance.jpg";
import haircareImage from "@/assets/category-haircare.jpg";

const saleProducts = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  image: i % 4 === 0 ? makeupImage : i % 4 === 1 ? skincareImage : i % 4 === 2 ? fragranceImage : haircareImage,
  name: `Sale Product ${i + 1}`,
  brand: "Brand Name",
  price: 79.99 + i * 5,
  originalPrice: 149.99 + i * 10,
  rating: 4.5 + (i % 5) * 0.1,
  reviews: 150 + i * 15,
  badge: `${30 + (i % 6) * 5}% OFF`,
}));

const SalePage = () => {
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
          <h2 className="text-3xl font-bold text-foreground">All Sale Items</h2>
          <select className="border rounded-lg px-4 py-2 text-sm">
            <option>Biggest Discount</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Best Selling</option>
          </select>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SalePage;
