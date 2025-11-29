import sequelize from '../config/database.js';
import Banner from '../models/Banner.js';

const bannerData = [
  // Hero Slider Banners
  {
    name: 'Eid Collection Hero',
    area: 'hero-slider',
    heading: 'New Eid Collection',
    subHeading: 'Discover luxury beauty for your special moments',
    description: 'Up to 50% Off',
    image: '/uploads/banners/hero-eid.jpg',
    mobileImage: '/uploads/banners/hero-eid-mobile.jpg',
    link: '/category/makeup',
    buttonText: 'Shop Now',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.4,
    textAlignment: 'left',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Summer Glow Hero',
    area: 'hero-slider',
    heading: 'Glow This Summer',
    subHeading: 'Sweat-proof & long-lasting formulas for UAE heat',
    description: 'Free Shipping Over 100 AED',
    image: '/uploads/banners/hero-summer.jpg',
    mobileImage: '/uploads/banners/hero-summer-mobile.jpg',
    link: '/category/skincare',
    buttonText: 'Explore Collection',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.3,
    textAlignment: 'left',
    isActive: true,
    sortOrder: 2
  },
  {
    name: 'Halal Beauty Hero',
    area: 'hero-slider',
    heading: 'Halal Certified Beauty',
    subHeading: 'Premium products you can trust',
    description: 'New Arrivals',
    image: '/uploads/banners/hero-halal.jpg',
    mobileImage: '/uploads/banners/hero-halal-mobile.jpg',
    link: '/products?filter=halal',
    buttonText: 'Discover Now',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.5,
    textAlignment: 'left',
    isActive: true,
    sortOrder: 3
  },

  // Wide Banner
  {
    name: 'Mega Sale Wide Banner',
    area: 'wide-banner',
    heading: 'Mega Beauty Sale',
    subHeading: 'Up to 70% off on selected items',
    description: 'Limited time offer',
    image: '/uploads/banners/wide-mega-sale.jpg',
    mobileImage: '/uploads/banners/wide-mega-sale-mobile.jpg',
    link: '/sale',
    buttonText: 'Shop Sale',
    textColor: '#ffffff',
    overlayColor: '#d97706',
    overlayOpacity: 0.6,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },

  // Prime Banners
  {
    name: 'Summer Collection Left',
    area: 'prime-banner-left',
    heading: 'Summer Collection',
    subHeading: 'Beat the heat with our summer essentials',
    image: '/uploads/banners/prime-summer.jpg',
    mobileImage: '/uploads/banners/prime-summer-mobile.jpg',
    link: '/category/summer',
    buttonText: 'Shop Summer',
    textColor: '#ffffff',
    overlayColor: '#0ea5e9',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Halal Beauty Right',
    area: 'prime-banner-right',
    heading: 'Halal Beauty',
    subHeading: 'Certified halal cosmetics for conscious beauty',
    image: '/uploads/banners/prime-halal.jpg',
    mobileImage: '/uploads/banners/prime-halal-mobile.jpg',
    link: '/products?filter=halal',
    buttonText: 'Explore Halal',
    textColor: '#ffffff',
    overlayColor: '#059669',
    overlayOpacity: 0.5,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },

  // New Arrival Banners (Grid)
  {
    name: 'New Lipstick Collection',
    area: 'new-arrival-banner',
    heading: 'New Lipsticks',
    subHeading: 'Matte & Glossy',
    image: '/uploads/banners/new-lipstick.jpg',
    mobileImage: '/uploads/banners/new-lipstick-mobile.jpg',
    link: '/category/lips',
    textColor: '#ffffff',
    overlayColor: '#dc2626',
    overlayOpacity: 0.3,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'New Skincare Range',
    area: 'new-arrival-banner',
    heading: 'Skincare Essentials',
    subHeading: 'Glow naturally',
    image: '/uploads/banners/new-skincare.jpg',
    mobileImage: '/uploads/banners/new-skincare-mobile.jpg',
    link: '/category/skincare',
    textColor: '#ffffff',
    overlayColor: '#7c3aed',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 2
  },
  {
    name: 'New Fragrance Launch',
    area: 'new-arrival-banner',
    heading: 'Signature Scents',
    subHeading: 'Luxury fragrances',
    image: '/uploads/banners/new-fragrance.jpg',
    mobileImage: '/uploads/banners/new-fragrance-mobile.jpg',
    link: '/category/fragrance',
    textColor: '#ffffff',
    overlayColor: '#f59e0b',
    overlayOpacity: 0.5,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 3
  },
  {
    name: 'New Hair Care',
    area: 'new-arrival-banner',
    heading: 'Hair Care',
    subHeading: 'Nourish & protect',
    image: '/uploads/banners/new-haircare.jpg',
    mobileImage: '/uploads/banners/new-haircare-mobile.jpg',
    link: '/category/haircare',
    textColor: '#ffffff',
    overlayColor: '#8b5cf6',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 4
  },

  // Wide Banner Top & Bottom
  {
    name: 'Brand Spotlight Top',
    area: 'wide-banner-top',
    heading: 'Brand Spotlight',
    subHeading: 'Discover premium international brands',
    image: '/uploads/banners/wide-brands.jpg',
    mobileImage: '/uploads/banners/wide-brands-mobile.jpg',
    link: '/brands',
    buttonText: 'Explore Brands',
    textColor: '#ffffff',
    overlayColor: '#1f2937',
    overlayOpacity: 0.6,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Seasonal Sale Bottom',
    area: 'wide-banner-bottom',
    heading: 'End of Season Sale',
    subHeading: 'Last chance to grab amazing deals',
    image: '/uploads/banners/wide-seasonal.jpg',
    mobileImage: '/uploads/banners/wide-seasonal-mobile.jpg',
    link: '/sale',
    buttonText: 'Shop Now',
    textColor: '#ffffff',
    overlayColor: '#dc2626',
    overlayOpacity: 0.7,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },

  // Category Banners
  {
    name: 'Makeup Category Banner',
    area: 'category',
    heading: 'Makeup Collection',
    subHeading: 'Express your beauty',
    image: '/uploads/banners/category-makeup.jpg',
    mobileImage: '/uploads/banners/category-makeup-mobile.jpg',
    link: '/category/makeup',
    textColor: '#ffffff',
    overlayColor: '#ec4899',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },

  // Promotional Banners
  {
    name: 'Flash Sale Promotion',
    area: 'promotion',
    heading: 'Flash Sale',
    subHeading: '24 Hours Only - Up to 60% Off',
    description: 'Hurry! Limited time offer',
    image: '/uploads/banners/promo-flash.jpg',
    mobileImage: '/uploads/banners/promo-flash-mobile.jpg',
    link: '/flash-sale',
    buttonText: 'Shop Flash Sale',
    textColor: '#ffffff',
    overlayColor: '#dc2626',
    overlayOpacity: 0.8,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },

  // Sidebar Banners
  {
    name: 'Newsletter Signup',
    area: 'sidebar',
    heading: 'Stay Updated',
    subHeading: 'Get exclusive offers & beauty tips',
    image: '/uploads/banners/sidebar-newsletter.jpg',
    mobileImage: '/uploads/banners/sidebar-newsletter-mobile.jpg',
    link: '/newsletter',
    buttonText: 'Subscribe',
    textColor: '#ffffff',
    overlayColor: '#6366f1',
    overlayOpacity: 0.6,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  }
];

async function seedBanners() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Clear existing banners
    await Banner.destroy({ where: {} });
    console.log('Cleared existing banners.');

    // Insert new banners
    await Banner.bulkCreate(bannerData);
    console.log(`Successfully seeded ${bannerData.length} banners.`);

    // Display summary
    const bannersByArea = bannerData.reduce((acc, banner) => {
      acc[banner.area] = (acc[banner.area] || 0) + 1;
      return acc;
    }, {});

    console.log('\nBanners created by area:');
    Object.entries(bannersByArea).forEach(([area, count]) => {
      console.log(`  ${area}: ${count} banners`);
    });

  } catch (error) {
    console.error('Error seeding banners:', error);
  } finally {
    await sequelize.close();
  }
}

seedBanners();