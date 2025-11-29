import sequelize from '../config/database.js';
import Banner from '../models/Banner.js';

const bannerData = [
  {
    name: 'Hero Slider 1',
    area: 'hero-slider',
    heading: 'Summer Beauty Collection',
    subHeading: 'Up to 50% Off Selected Items',
    description: 'Discover the latest beauty trends with our summer collection',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=350&fit=crop',
    link: '/sale',
    buttonText: 'Shop Now',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Hero Slider 2',
    area: 'hero-slider',
    heading: 'New Arrivals',
    subHeading: 'Latest Beauty Trends',
    description: 'Explore our newest collection of premium beauty products',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=350&fit=crop',
    link: '/products',
    buttonText: 'Explore',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 2
  },
  {
    name: 'Left Side Banner',
    area: 'hero-left',
    heading: 'Skincare Essentials',
    subHeading: 'Glow Up',
    description: 'Premium skincare for radiant skin',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=500&fit=crop',
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
    name: 'Right Side Banner',
    area: 'hero-right',
    heading: 'Makeup Must-Haves',
    subHeading: 'Professional Quality',
    description: 'Create stunning looks with our makeup collection',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=500&fit=crop',
    link: '/category/makeup',
    buttonText: 'Shop Makeup',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.3,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Bottom Left Banner',
    area: 'hero-bottom-left',
    heading: 'Makeup Collection',
    subHeading: 'Professional Quality',
    description: 'Transform your look with our premium makeup range',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
    link: '/category/makeup',
    buttonText: 'Shop Now',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.3,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Bottom Right Banner',
    area: 'hero-bottom-right',
    heading: 'Skincare Essentials',
    subHeading: 'Radiant Skin',
    description: 'Nourish your skin with our premium skincare products',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=250&fit=crop',
    link: '/category/skincare',
    buttonText: 'Discover',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.3,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Category Banner 1',
    area: 'category',
    heading: 'Special Offers',
    subHeading: 'Up to 30% Off',
    description: 'Limited time offers on selected products',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=200&fit=crop',
    link: '/sale',
    buttonText: 'Shop Sale',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Category Banner 2',
    area: 'category',
    heading: 'New Arrivals',
    subHeading: 'Fresh Beauty Trends',
    description: 'Discover the latest products in beauty',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=200&fit=crop',
    link: '/products',
    buttonText: 'Explore',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 2
  },
  {
    name: 'Category Banner 3',
    area: 'category',
    heading: 'Premium Brands',
    subHeading: 'Luxury Collection',
    description: 'Exclusive products from top beauty brands',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=200&fit=crop',
    link: '/brands',
    buttonText: 'View Brands',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 3
  },
  {
    name: 'Category Banner 4',
    area: 'category',
    heading: 'Free Shipping',
    subHeading: 'Orders Over 100 AED',
    description: 'Get free delivery on qualifying orders',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop',
    link: '/shipping-info',
    buttonText: 'Learn More',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 4
  },
  {
    name: 'Category Banner 5',
    area: 'category',
    heading: 'Beauty Tips',
    subHeading: 'Expert Advice',
    description: 'Professional beauty tips and tutorials',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=200&fit=crop',
    link: '/blog',
    buttonText: 'Read More',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 5
  }
];

const seedBanners = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');
    
    // Sync the Banner model to create table
    await Banner.sync({ force: true });
    console.log('Banner table created/updated');
    
    // Insert new banners
    await Banner.bulkCreate(bannerData);
    console.log('Banners seeded successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding banners:', error);
    process.exit(1);
  }
};

seedBanners();