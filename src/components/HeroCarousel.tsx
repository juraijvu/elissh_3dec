import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { bannerAPI } from "@/lib/api";
import heroImage from "@/assets/hero-cosmetics.jpg";

const fallbackSlides = [
  {
    id: 1,
    heading: "New Eid Collection",
    subHeading: "Discover luxury beauty for your special moments",
    description: "Up to 50% Off",
    buttonText: "Shop Now",
    image: heroImage,
  },
  {
    id: 2,
    heading: "Glow This Summer",
    subHeading: "Sweat-proof & long-lasting formulas for UAE heat",
    description: "Free Shipping Over 100 AED",
    buttonText: "Explore Collection",
    image: heroImage,
  },
  {
    id: 3,
    heading: "Halal Certified Beauty",
    subHeading: "Premium products you can trust",
    description: "New Arrivals",
    buttonText: "Discover Now",
    image: heroImage,
  },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState(fallbackSlides);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHeroBanners = async () => {
      try {
        const response = await bannerAPI.getBanners('hero-slider');
        if (response.data && response.data.length > 0) {
          setSlides(response.data);
        }
      } catch (error) {
        console.error('Failed to load hero banners:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHeroBanners();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleSlideClick = async (slide) => {
    if (slide.link) {
      try {
        await bannerAPI.trackClick(slide.id);
        window.location.href = slide.link;
      } catch (error) {
        console.error('Failed to track banner click:', error);
        window.location.href = slide.link;
      }
    }
  };

  if (loading) {
    return (
      <div className="relative w-full h-[400px] lg:h-[600px] bg-gray-200 animate-pulse">
        <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] lg:h-[600px] overflow-hidden bg-gradient-hero">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 cursor-pointer ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => handleSlideClick(slide)}
        >
          <img
            src={slide.image?.startsWith('http') ? slide.image : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${slide.image || slide.image}`}
            alt={slide.heading || slide.title}
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 flex items-center"
            style={{
              background: slide.overlayColor ? `linear-gradient(to right, ${slide.overlayColor}${Math.round((slide.overlayOpacity || 0.5) * 255).toString(16).padStart(2, '0')}, transparent)` : 'linear-gradient(to right, rgba(0,0,0,0.5), transparent)'
            }}
          >
            <div className="container mx-auto px-4 lg:px-8">
              <div className={`max-w-xl animate-slide-up text-${slide.textAlignment || 'left'}`}>
                {slide.description && (
                  <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    {slide.description}
                  </div>
                )}
                <h2 
                  className="text-4xl lg:text-6xl font-bold mb-4 drop-shadow-lg"
                  style={{ color: slide.textColor || '#ffffff' }}
                >
                  {slide.heading || slide.title}
                </h2>
                {slide.subHeading && (
                  <p 
                    className="text-lg lg:text-xl mb-8 drop-shadow"
                    style={{ color: slide.textColor || '#ffffff', opacity: 0.9 }}
                  >
                    {slide.subHeading || slide.subtitle}
                  </p>
                )}
                {slide.buttonText && (
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-glow">
                    {slide.buttonText || slide.cta}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-elevated transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-elevated transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-primary w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
