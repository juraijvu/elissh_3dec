import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  image: string;
  title: string;
  itemCount?: number;
}

export const CategoryCard = ({ image, title, itemCount }: CategoryCardProps) => {
  const categorySlug = title.toLowerCase();
  
  return (
    <Link to={`/category/${categorySlug}`} className="block">
      <div className="group relative aspect-square rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 cursor-pointer hover:-translate-y-1">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-white font-bold text-2xl mb-2 drop-shadow-lg">{title}</h3>
          {itemCount && (
            <p className="text-white/90 text-sm mb-3">{itemCount}+ Products</p>
          )}
          <div className="flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
            <span>Shop Now</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};
