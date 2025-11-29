import Banner from '../models/Banner.js';

const homepageBanners = [
  // Hero Slider Banners
  {
    name: 'Summer Beauty Sale',
    area: 'hero-slider',
    heading: 'Summer Beauty Collection',
    subHeading: 'Up to 50% Off Selected Items',
    description: 'Discover the latest summer beauty trends with amazing discounts',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&h=600&fit=crop',
    link: '/sale',
    buttonText: 'Shop Now',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.3,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'New Arrivals Hero',
    area: 'hero-slider',
    heading: 'New Arrivals',
    subHeading: 'Latest Beauty Trends',
    description: 'Be the first to try our newest products',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1920&h=600&fit=crop',
    link: '/products?filter=new',
    buttonText: 'Explore',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 2
  },

  // Side Banners
  {
    name: 'Skincare Essentials',
    area: 'hero-left',
    heading: 'Skincare',
    subHeading: 'Glow Up',
    description: 'Premium skincare products for radiant skin',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=600&fit=crop',
    link: '/category/skincare',
    buttonText: 'Shop Skincare',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.3,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Makeup Must-Haves',
    area: 'hero-right',
    heading: 'Makeup',
    subHeading: 'Express Yourself',
    description: 'Professional makeup for every occasion',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=600&fit=crop',
    link: '/category/makeup',
    buttonText: 'Shop Makeup',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.3,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },

  // Bottom Banners
  {
    name: 'Luxury Collection',
    area: 'hero-bottom-left',
    heading: 'Luxury Beauty',
    subHeading: 'Premium Brands',
    description: 'Indulge in luxury with our premium collection',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=500&fit=crop',
    link: '/category/luxury',
    buttonText: 'Explore Luxury',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Halal Beauty',
    area: 'hero-bottom-right',
    heading: 'Halal Certified',
    subHeading: 'Pure & Natural',
    description: 'Certified halal beauty products for conscious consumers',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&h=500&fit=crop',
    link: '/category/halal',
    buttonText: 'Shop Halal',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.3,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },

  // Wide Banner
  {
    name: 'Mega Sale Banner',
    area: 'wide-banner',
    heading: 'MEGA SALE',
    subHeading: 'Up to 70% Off Everything',
    description: 'Limited time offer - biggest sale of the year',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&h=480&fit=crop',
    link: '/sale',
    buttonText: 'Shop Sale',
    textColor: '#ffffff',
    overlayColor: '#ff0000',
    overlayOpacity: 0.2,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },

  // Prime Banners
  {
    name: 'Summer Collection',
    area: 'prime-banner-left',
    heading: 'Summer Vibes',
    subHeading: 'Fresh & Bright',
    description: 'Perfect products for the summer season',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=500&fit=crop',
    link: '/collection/summer',
    buttonText: 'Shop Summer',
    textColor: '#ffffff',
    overlayColor: '#ff6b35',
    overlayOpacity: 0.3,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Anti-Aging Solutions',
    area: 'prime-banner-right',
    heading: 'Age Gracefully',
    subHeading: 'Anti-Aging Care',
    description: 'Advanced skincare for mature skin',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=500&fit=crop',
    link: '/category/anti-aging',
    buttonText: 'Shop Anti-Aging',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },

  // Wide Banner Top & Bottom
  {
    name: 'Brand Spotlight',
    area: 'wide-banner-top',
    heading: 'Featured Brands',
    subHeading: 'Discover Premium Beauty',
    description: 'Shop from the world\'s most trusted beauty brands',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=480&fit=crop',
    link: '/brands',
    buttonText: 'Explore Brands',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.3,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Seasonal Sale',
    area: 'wide-banner-bottom',
    heading: 'End of Season Sale',
    subHeading: 'Last Chance to Save',
    description: 'Final markdowns on seasonal favorites',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=1920&h=480&fit=crop',
    link: '/sale/seasonal',
    buttonText: 'Shop Final Sale',
    textColor: '#ffffff',
    overlayColor: '#dc2626',
    overlayOpacity: 0.2,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  }
];

const seedHomepageBanners = async () => {
  try {
    console.log('Seeding homepage banners...');
    
    // Clear existing banners for homepage areas
    const homepageAreas = [
      'hero-slider', 'hero-left', 'hero-right', 'hero-bottom-left', 'hero-bottom-right',
      'wide-banner', 'prime-banner-left', 'prime-banner-right', 'wide-banner-top', 'wide-banner-bottom'
    ];
    
    await Banner.destroy({
      where: {
        area: homepageAreas
      }
    });
    
    // Create new banners
    await Banner.bulkCreate(homepageBanners);
    
    console.log(`✅ Successfully seeded ${homepageBanners.length} homepage banners`);
  } catch (error) {
    console.error('❌ Error seeding homepage banners:', error);
  }
};

export default seedHomepageBanners;