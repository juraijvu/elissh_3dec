import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

interface ProductCarouselProps {
  products: any[];
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
}

const ProductCarousel = ({ 
  products, 
  title, 
  subtitle, 
  icon, 
  badge,
  showViewAll = true,
  viewAllLink = "#"
}: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const mouseStartX = useRef(0);
  const mouseEndX = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1.2); // Mobile: show 1.2 items for peek effect
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2.5); // Tablet: show 2.5 items
      } else {
        setItemsPerView(4); // Desktop: show 4 items
      }
    };
    
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);
  
  const maxIndex = Math.max(0, Math.ceil(products.length - itemsPerView));

  const nextSlide = () => {
    const step = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    setCurrentIndex(prev => Math.min(prev + step, maxIndex));
  };

  const prevSlide = () => {
    const step = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    setCurrentIndex(prev => Math.max(prev - step, 0));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Mouse drag handlers for laptop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    mouseStartX.current = e.clientX;
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    mouseEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const dragDistance = mouseStartX.current - mouseEndX.current;
    const minDragDistance = 50;

    if (Math.abs(dragDistance) > minDragDistance) {
      if (dragDistance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            {icon}
            {title}
          </h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-4">
          {showViewAll && (
            <a href={viewAllLink} className="text-primary font-semibold hover:underline hidden md:block">
              View All →
            </a>
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="h-10 w-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="h-10 w-10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div 
        ref={carouselRef}
        className={`relative overflow-hidden carousel-container group ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex gap-3 sm:gap-4 lg:gap-6 touch-scroll"
          style={{ 
            transform: `translateX(-${currentIndex * (window.innerWidth < 640 ? 85 : window.innerWidth < 1024 ? 42 : 25)}%)`,
            transition: 'var(--transition-carousel)',
            scrollSnapType: 'x mandatory'
          }}
        >
          {products.map((product, index) => (
            <div 
              key={`${product.id}-${index}`} 
              className="flex-none w-[80%] sm:w-[45%] lg:w-[23%] scroll-snap-align-start"
            >
              <ProductCard {...product} badge={badge || product.badge} />
            </div>
          ))}
        </div>
        
        {/* Drag indicator for desktop */}
        {window.innerWidth >= 1024 && (
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            Drag to navigate
          </div>
        )}
      </div>
      
      {products.length > Math.floor(itemsPerView) && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(products.length / Math.floor(itemsPerView)) }).map((_, index) => {
            const isActive = Math.floor(currentIndex / Math.floor(itemsPerView)) === index;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * Math.floor(itemsPerView))}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ProductCarousel;