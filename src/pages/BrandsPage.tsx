import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import makeupImage from "@/assets/category-makeup.jpg";

const brands = [
  "Maybelline", "L'Oréal", "MAC", "NARS", "Fenty Beauty",
  "Huda Beauty", "Charlotte Tilotte", "Estée Lauder", "Clinique", "Lancôme",
  "Dior", "Chanel", "YSL", "Tom Ford", "Gucci",
  "Anastasia Beverly Hills", "Urban Decay", "Too Faced", "Benefit", "Tarte",
  "The Ordinary", "CeraVe", "Neutrogena", "Olay", "Dove"
];

const BrandsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header */}
      <section className="relative h-64 overflow-hidden">
        <img src={makeupImage} alt="Brands" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">Our Brands</h1>
            <p className="text-white/90 text-lg">Discover authentic products from world-renowned beauty brands</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12">
        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for brands..."
              className="pl-10 pr-4 py-6 rounded-full border-2 focus:border-primary"
            />
          </div>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {brands.map((brand) => (
            <div
              key={brand}
              className="bg-gradient-card rounded-2xl p-8 text-center shadow-soft hover:shadow-elevated transition-all cursor-pointer group"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl font-bold text-primary">{brand.charAt(0)}</span>
              </div>
              <h3 className="font-bold text-foreground">{brand}</h3>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrandsPage;
