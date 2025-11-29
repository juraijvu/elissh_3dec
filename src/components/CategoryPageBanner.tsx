import { useState, useEffect } from 'react';
import { bannerAPI } from '@/lib/api';

interface Banner {
  id: number;
  name: string;
  heading: string;
  subHeading?: string;
  description?: string;
  image: string;
  mobileImage?: string;
  link?: string;
  buttonText?: string;
  textColor: string;
  backgroundColor?: string;
  overlayColor?: string;
  overlayOpacity: number;
  textAlignment: 'left' | 'center' | 'right';
  isActive: boolean;
}

interface CategoryPageBannerProps {
  category: string;
  bannerIndex?: number;
}

const CategoryPageBanner = ({ category, bannerIndex = 0 }: CategoryPageBannerProps) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setLoading(true);
        const response = await bannerAPI.getBanners('category-page-banner');
        const bannersData = response.data?.data || response.data || [];
        // Filter banners for this specific category or all categories
        const filteredBanners = bannersData.filter(banner => 
          banner.position === category || banner.position === 'main'
        );
        setBanners(filteredBanners);
      } catch (error) {
        console.error('Failed to load category banners:', error);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    loadBanners();
  }, [category]);

  if (loading || !banners.length) {
    return null;
  }

  const banner = banners[bannerIndex % banners.length];
  if (!banner) return null;

  const handleBannerClick = () => {
    if (banner.link) {
      bannerAPI.trackClick(banner.id.toString());
      window.open(banner.link, '_blank');
    }
  };

  const imageUrl = banner.image?.startsWith('http') 
    ? banner.image 
    : `http://localhost:5000${banner.image}`;

  return (
    <div 
      className="relative w-full h-[200px] md:h-[250px] lg:h-[300px] rounded-lg overflow-hidden cursor-pointer group"
      onClick={handleBannerClick}
    >
      <img 
        src={imageUrl}
        alt={banner.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.src = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=300&fit=crop';
        }}
      />
      
      {/* Overlay */}
      {banner.overlayColor && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: banner.overlayColor,
            opacity: banner.overlayOpacity
          }}
        />
      )}
      
      {/* Content */}
      <div 
        className={`absolute inset-0 flex flex-col justify-center p-6 ${
          banner.textAlignment === 'left' ? 'items-start text-left' :
          banner.textAlignment === 'right' ? 'items-end text-right' :
          'items-center text-center'
        }`}
      >
        <h3 
          className="text-xl md:text-2xl lg:text-3xl font-bold mb-2"
          style={{ color: banner.textColor }}
        >
          {banner.heading}
        </h3>
        
        {banner.subHeading && (
          <p 
            className="text-sm md:text-base lg:text-lg mb-3"
            style={{ color: banner.textColor }}
          >
            {banner.subHeading}
          </p>
        )}
        
        {banner.description && (
          <p 
            className="text-xs md:text-sm mb-4 max-w-md"
            style={{ color: banner.textColor }}
          >
            {banner.description}
          </p>
        )}
        
        {banner.buttonText && banner.link && (
          <button 
            className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {banner.buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export { CategoryPageBanner };