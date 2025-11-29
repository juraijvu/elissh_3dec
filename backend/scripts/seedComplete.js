import sequelize from '../config/database.js';
import Banner from '../models/Banner.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

// Complete banner data with clear descriptions
const bannerData = [
  // Hero Section Banners
  {
    name: 'Hero Slider Banner 1',
    area: 'hero-slider',
    heading: 'New Eid Collection',
    subHeading: 'Discover luxury beauty for your special moments',
    description: 'Up to 50% Off',
    image: '/uploads/banners/hero-1.jpg',
    mobileImage: '/uploads/banners/hero-1-mobile.jpg',
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
    name: 'Hero Slider Banner 2',
    area: 'hero-slider',
    heading: 'Summer Glow Collection',
    subHeading: 'Beat the UAE heat with long-lasting formulas',
    description: 'Free Shipping Over 100 AED',
    image: '/uploads/banners/hero-2.jpg',
    mobileImage: '/uploads/banners/hero-2-mobile.jpg',
    link: '/category/skincare',
    buttonText: 'Shop Collection',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.3,
    textAlignment: 'left',
    isActive: true,
    sortOrder: 2
  },
  {
    name: 'Hero Slider Banner 3',
    area: 'hero-slider',
    heading: 'Halal Certified Beauty',
    subHeading: 'Premium products you can trust',
    description: 'New Arrivals',
    image: '/uploads/banners/hero-3.jpg',
    mobileImage: '/uploads/banners/hero-3-mobile.jpg',
    link: '/products?filter=halal',
    buttonText: 'Discover Now',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.5,
    textAlignment: 'left',
    isActive: true,
    sortOrder: 3
  },
  {
    name: 'Hero Slider Banner 4',
    area: 'hero-slider',
    heading: 'Luxury International Brands',
    subHeading: 'Premium cosmetics from around the world',
    description: 'Exclusive Collection',
    image: '/uploads/banners/hero-4.jpg',
    mobileImage: '/uploads/banners/hero-4-mobile.jpg',
    link: '/brands',
    buttonText: 'Shop Luxury',
    textColor: '#ffffff',
    overlayColor: '#000000',
    overlayOpacity: 0.4,
    textAlignment: 'left',
    isActive: true,
    sortOrder: 4
  },
  {
    name: 'Hero Slider Banner 5',
    area: 'hero-slider',
    heading: 'Flash Sale',
    subHeading: '24 Hours Only - Up to 70% Off',
    description: 'Limited Time',
    image: '/uploads/banners/hero-5.jpg',
    mobileImage: '/uploads/banners/hero-5-mobile.jpg',
    link: '/flash-sale',
    buttonText: 'Shop Flash Sale',
    textColor: '#ffffff',
    overlayColor: '#dc2626',
    overlayOpacity: 0.6,
    textAlignment: 'left',
    isActive: true,
    sortOrder: 5
  },

  // Hero Side Banners
  {
    name: 'Hero Left Side Banner',
    area: 'hero-left',
    heading: 'Skincare Essentials',
    subHeading: 'Glow naturally every day',
    image: '/uploads/banners/hero-left.jpg',
    mobileImage: '/uploads/banners/hero-left-mobile.jpg',
    link: '/category/skincare',
    buttonText: 'Shop Skincare',
    textColor: '#ffffff',
    overlayColor: '#059669',
    overlayOpacity: 0.5,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Hero Right Side Banner',
    area: 'hero-right',
    heading: 'Signature Scents',
    subHeading: 'Luxury fragrances',
    image: '/uploads/banners/hero-right.jpg',
    mobileImage: '/uploads/banners/hero-right-mobile.jpg',
    link: '/category/fragrance',
    buttonText: 'Explore Scents',
    textColor: '#ffffff',
    overlayColor: '#7c3aed',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },

  // Hero Bottom Banners
  {
    name: 'Hero Bottom Left Banner',
    area: 'hero-bottom-left',
    heading: 'Makeup Collection',
    subHeading: 'Express your beauty',
    image: '/uploads/banners/hero-bottom-left.jpg',
    mobileImage: '/uploads/banners/hero-bottom-left-mobile.jpg',
    link: '/category/makeup',
    buttonText: 'Shop Makeup',
    textColor: '#ffffff',
    overlayColor: '#ec4899',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Hero Bottom Right Banner',
    area: 'hero-bottom-right',
    heading: 'Hair Care Essentials',
    subHeading: 'Nourish & protect your hair',
    image: '/uploads/banners/hero-bottom-right.jpg',
    mobileImage: '/uploads/banners/hero-bottom-right-mobile.jpg',
    link: '/category/haircare',
    buttonText: 'Shop Hair Care',
    textColor: '#ffffff',
    overlayColor: '#8b5cf6',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },

  // After Special Offers Banners
  {
    name: 'After Special Offers Banner 1',
    area: 'after-special-offers',
    heading: 'Summer Collection',
    subHeading: 'Beat the heat with summer essentials',
    image: '/uploads/banners/after-special-1.jpg',
    mobileImage: '/uploads/banners/after-special-1-mobile.jpg',
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
    name: 'After Special Offers Banner 2',
    area: 'after-special-offers',
    heading: 'Halal Beauty',
    subHeading: 'Certified halal cosmetics',
    image: '/uploads/banners/after-special-2.jpg',
    mobileImage: '/uploads/banners/after-special-2-mobile.jpg',
    link: '/products?filter=halal',
    buttonText: 'Explore Halal',
    textColor: '#ffffff',
    overlayColor: '#059669',
    overlayOpacity: 0.5,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 2
  },
  {
    name: 'After Special Offers Banner 3',
    area: 'after-special-offers',
    heading: 'Luxury Brands',
    subHeading: 'Premium international brands',
    image: '/uploads/banners/after-special-3.jpg',
    mobileImage: '/uploads/banners/after-special-3-mobile.jpg',
    link: '/brands',
    buttonText: 'Shop Luxury',
    textColor: '#ffffff',
    overlayColor: '#1f2937',
    overlayOpacity: 0.6,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 3
  },

  // New Arrival Banners (8 banners)
  {
    name: 'New Arrival - Lipsticks',
    area: 'new-arrival-banner',
    heading: 'New Lipsticks',
    subHeading: 'Matte & Glossy',
    image: '/uploads/banners/new-arrival-1.jpg',
    mobileImage: '/uploads/banners/new-arrival-1-mobile.jpg',
    link: '/category/lips',
    textColor: '#ffffff',
    overlayColor: '#dc2626',
    overlayOpacity: 0.3,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'New Arrival - Skincare',
    area: 'new-arrival-banner',
    heading: 'Skincare Range',
    subHeading: 'Glow naturally',
    image: '/uploads/banners/new-arrival-2.jpg',
    mobileImage: '/uploads/banners/new-arrival-2-mobile.jpg',
    link: '/category/skincare',
    textColor: '#ffffff',
    overlayColor: '#7c3aed',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 2
  },
  {
    name: 'New Arrival - Fragrances',
    area: 'new-arrival-banner',
    heading: 'Signature Scents',
    subHeading: 'Luxury fragrances',
    image: '/uploads/banners/new-arrival-3.jpg',
    mobileImage: '/uploads/banners/new-arrival-3-mobile.jpg',
    link: '/category/fragrance',
    textColor: '#ffffff',
    overlayColor: '#f59e0b',
    overlayOpacity: 0.5,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 3
  },
  {
    name: 'New Arrival - Hair Care',
    area: 'new-arrival-banner',
    heading: 'Hair Care',
    subHeading: 'Nourish & protect',
    image: '/uploads/banners/new-arrival-4.jpg',
    mobileImage: '/uploads/banners/new-arrival-4-mobile.jpg',
    link: '/category/haircare',
    textColor: '#ffffff',
    overlayColor: '#8b5cf6',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 4
  },
  {
    name: 'New Arrival - Foundation',
    area: 'new-arrival-banner',
    heading: 'Perfect Base',
    subHeading: 'Flawless foundation',
    image: '/uploads/banners/new-arrival-5.jpg',
    mobileImage: '/uploads/banners/new-arrival-5-mobile.jpg',
    link: '/category/face',
    textColor: '#ffffff',
    overlayColor: '#d97706',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 5
  },
  {
    name: 'New Arrival - Eye Makeup',
    area: 'new-arrival-banner',
    heading: 'Eye Drama',
    subHeading: 'Bold & beautiful',
    image: '/uploads/banners/new-arrival-6.jpg',
    mobileImage: '/uploads/banners/new-arrival-6-mobile.jpg',
    link: '/category/eyes',
    textColor: '#ffffff',
    overlayColor: '#059669',
    overlayOpacity: 0.5,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 6
  },
  {
    name: 'New Arrival - Body Care',
    area: 'new-arrival-banner',
    heading: 'Body Essentials',
    subHeading: 'Pamper yourself',
    image: '/uploads/banners/new-arrival-7.jpg',
    mobileImage: '/uploads/banners/new-arrival-7-mobile.jpg',
    link: '/category/body-care',
    textColor: '#ffffff',
    overlayColor: '#0ea5e9',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 7
  },
  {
    name: 'New Arrival - Beauty Tools',
    area: 'new-arrival-banner',
    heading: 'Beauty Tools',
    subHeading: 'Professional quality',
    image: '/uploads/banners/new-arrival-8.jpg',
    mobileImage: '/uploads/banners/new-arrival-8-mobile.jpg',
    link: '/category/tools',
    textColor: '#ffffff',
    overlayColor: '#7c2d12',
    overlayOpacity: 0.5,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 8
  },

  // Wide Banners
  {
    name: 'Wide Banner - Brand Spotlight',
    area: 'wide-banner-top',
    heading: 'Brand Spotlight',
    subHeading: 'Discover premium international brands',
    image: '/uploads/banners/wide-top.jpg',
    mobileImage: '/uploads/banners/wide-top-mobile.jpg',
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
    name: 'Wide Banner - Season Sale',
    area: 'wide-banner-bottom',
    heading: 'End of Season Sale',
    subHeading: 'Last chance for amazing deals',
    image: '/uploads/banners/wide-bottom.jpg',
    mobileImage: '/uploads/banners/wide-bottom-mobile.jpg',
    link: '/sale',
    buttonText: 'Shop Now',
    textColor: '#ffffff',
    overlayColor: '#dc2626',
    overlayOpacity: 0.7,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },

  // Category Page Banners
  {
    name: 'Category Page Banner - Makeup',
    area: 'category-page-banner',
    heading: 'Makeup Masterclass',
    subHeading: 'Learn from the pros',
    image: '/uploads/banners/category-makeup.jpg',
    mobileImage: '/uploads/banners/category-makeup-mobile.jpg',
    link: '/tutorials',
    buttonText: 'Watch Tutorials',
    textColor: '#ffffff',
    overlayColor: '#ec4899',
    overlayOpacity: 0.6,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Category Page Banner - Skincare',
    area: 'category-page-banner',
    heading: 'Skincare Routine',
    subHeading: 'Build your perfect routine',
    image: '/uploads/banners/category-skincare.jpg',
    mobileImage: '/uploads/banners/category-skincare-mobile.jpg',
    link: '/skincare-guide',
    buttonText: 'Get Guide',
    textColor: '#ffffff',
    overlayColor: '#059669',
    overlayOpacity: 0.5,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 2
  }
];

// 100 Cosmetic Products
const productData = [
  // Face Products (25 products)
  { name: 'Matte Foundation - Fair', description: 'Long-lasting matte foundation perfect for UAE climate', shortDescription: 'Full coverage matte foundation', brand: 'Elissh Beauty', categoryId: 1, price: 89.99, originalPrice: 119.99, stock: 50, sku: 'ELB-FOUND-001', isActive: true, isFeatured: true, isOnSale: true },
  { name: 'Matte Foundation - Light', description: 'Long-lasting matte foundation in light shade', shortDescription: 'Full coverage matte foundation', brand: 'Elissh Beauty', categoryId: 1, price: 89.99, originalPrice: 119.99, stock: 45, sku: 'ELB-FOUND-002', isActive: true, isFeatured: false, isOnSale: true },
  { name: 'Matte Foundation - Medium', description: 'Long-lasting matte foundation in medium shade', shortDescription: 'Full coverage matte foundation', brand: 'Elissh Beauty', categoryId: 1, price: 89.99, originalPrice: 119.99, stock: 40, sku: 'ELB-FOUND-003', isActive: true, isFeatured: false, isOnSale: true },
  { name: 'Concealer - Fair', description: 'High coverage concealer that hides imperfections', shortDescription: 'Full coverage concealer', brand: 'Elissh Beauty', categoryId: 1, price: 45.99, stock: 75, sku: 'ELB-CONC-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Concealer - Light', description: 'High coverage concealer in light shade', shortDescription: 'Full coverage concealer', brand: 'Elissh Beauty', categoryId: 1, price: 45.99, stock: 70, sku: 'ELB-CONC-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Setting Powder - Translucent', description: 'Translucent setting powder for long-lasting makeup', shortDescription: 'Long-lasting setting powder', brand: 'Elissh Beauty', categoryId: 1, price: 35.99, stock: 60, sku: 'ELB-POWD-001', isActive: true, isFeatured: true, isOnSale: false },
  { name: 'Blush - Coral', description: 'Natural-looking blush in coral shade', shortDescription: 'Natural coral blush', brand: 'Elissh Beauty', categoryId: 1, price: 29.99, stock: 40, sku: 'ELB-BLSH-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Blush - Rose', description: 'Natural-looking blush in rose shade', shortDescription: 'Natural rose blush', brand: 'Elissh Beauty', categoryId: 1, price: 29.99, stock: 35, sku: 'ELB-BLSH-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Highlighter - Golden', description: 'Luminous highlighter for radiant glow', shortDescription: 'Golden highlighter', brand: 'Elissh Beauty', categoryId: 1, price: 39.99, stock: 30, sku: 'ELB-HIGH-001', isActive: true, isFeatured: true, isOnSale: false },
  { name: 'Contour Palette', description: '6-shade contour palette for sculpting', shortDescription: 'Professional contour palette', brand: 'Elissh Beauty', categoryId: 1, price: 65.99, originalPrice: 79.99, stock: 25, sku: 'ELB-CONT-001', isActive: true, isFeatured: true, isOnSale: true },
  { name: 'BB Cream - Light', description: 'Multi-benefit BB cream with SPF 30', shortDescription: 'Tinted moisturizer with SPF', brand: 'Elissh Beauty', categoryId: 1, price: 49.99, stock: 55, sku: 'ELB-BB-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'CC Cream - Medium', description: 'Color correcting cream with coverage', shortDescription: 'Color correcting cream', brand: 'Elissh Beauty', categoryId: 1, price: 52.99, stock: 50, sku: 'ELB-CC-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Primer - Mattifying', description: 'Oil-control primer for oily skin', shortDescription: 'Mattifying face primer', brand: 'Elissh Beauty', categoryId: 1, price: 42.99, stock: 45, sku: 'ELB-PRIM-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Primer - Hydrating', description: 'Moisturizing primer for dry skin', shortDescription: 'Hydrating face primer', brand: 'Elissh Beauty', categoryId: 1, price: 42.99, stock: 40, sku: 'ELB-PRIM-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Setting Spray', description: 'Long-lasting makeup setting spray', shortDescription: 'Makeup setting spray', brand: 'Elissh Beauty', categoryId: 1, price: 32.99, stock: 65, sku: 'ELB-SETT-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Bronzer - Warm', description: 'Warm-toned bronzer for sun-kissed look', shortDescription: 'Warm bronzer', brand: 'Elissh Beauty', categoryId: 1, price: 38.99, stock: 35, sku: 'ELB-BRON-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Face Powder - Light', description: 'Pressed powder for touch-ups', shortDescription: 'Pressed face powder', brand: 'Elissh Beauty', categoryId: 1, price: 28.99, stock: 50, sku: 'ELB-FPOW-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Tinted Moisturizer', description: 'Light coverage tinted moisturizer', shortDescription: 'Tinted moisturizer', brand: 'Elissh Beauty', categoryId: 1, price: 44.99, stock: 40, sku: 'ELB-TINT-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Color Corrector - Green', description: 'Green color corrector for redness', shortDescription: 'Green color corrector', brand: 'Elissh Beauty', categoryId: 1, price: 24.99, stock: 30, sku: 'ELB-CORR-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Color Corrector - Peach', description: 'Peach color corrector for dark circles', shortDescription: 'Peach color corrector', brand: 'Elissh Beauty', categoryId: 1, price: 24.99, stock: 35, sku: 'ELB-CORR-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Makeup Remover Wipes', description: 'Gentle makeup removing wipes', shortDescription: 'Makeup remover wipes', brand: 'Elissh Beauty', categoryId: 1, price: 15.99, stock: 80, sku: 'ELB-WIPE-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Micellar Water', description: 'Gentle micellar cleansing water', shortDescription: 'Micellar cleansing water', brand: 'Elissh Beauty', categoryId: 1, price: 22.99, stock: 60, sku: 'ELB-MIC-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Face Mist - Hydrating', description: 'Refreshing hydrating face mist', shortDescription: 'Hydrating face mist', brand: 'Elissh Beauty', categoryId: 1, price: 26.99, stock: 45, sku: 'ELB-MIST-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Illuminating Drops', description: 'Liquid highlighter drops for glow', shortDescription: 'Illuminating drops', brand: 'Elissh Beauty', categoryId: 1, price: 34.99, stock: 25, sku: 'ELB-ILLU-001', isActive: true, isFeatured: true, isOnSale: false },
  { name: 'Face Oil - Glow', description: 'Nourishing face oil for radiant skin', shortDescription: 'Radiance face oil', brand: 'Elissh Beauty', categoryId: 1, price: 48.99, stock: 20, sku: 'ELB-FOIL-001', isActive: true, isFeatured: false, isOnSale: false },

  // Eye Products (25 products)
  { name: 'Waterproof Mascara - Black', description: 'Waterproof mascara for dramatic lashes', shortDescription: 'Waterproof black mascara', brand: 'Elissh Beauty', categoryId: 2, price: 45.99, stock: 75, sku: 'ELB-MASC-001', isActive: true, isFeatured: true, isOnSale: false },
  { name: 'Waterproof Mascara - Brown', description: 'Waterproof mascara in brown shade', shortDescription: 'Waterproof brown mascara', brand: 'Elissh Beauty', categoryId: 2, price: 45.99, stock: 60, sku: 'ELB-MASC-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Volume Mascara - Black', description: 'Volumizing mascara for fuller lashes', shortDescription: 'Volume black mascara', brand: 'Elissh Beauty', categoryId: 2, price: 42.99, stock: 70, sku: 'ELB-MASC-003', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Eyeshadow Palette - Neutral', description: '12-shade neutral eyeshadow palette', shortDescription: '12-shade neutral palette', brand: 'Elissh Beauty', categoryId: 2, price: 79.99, originalPrice: 99.99, stock: 30, sku: 'ELB-EYES-001', isActive: true, isFeatured: true, isOnSale: true },
  { name: 'Eyeshadow Palette - Smoky', description: '12-shade smoky eyeshadow palette', shortDescription: '12-shade smoky palette', brand: 'Elissh Beauty', categoryId: 2, price: 79.99, originalPrice: 99.99, stock: 25, sku: 'ELB-EYES-002', isActive: true, isFeatured: true, isOnSale: true },
  { name: 'Eyeshadow Palette - Colorful', description: '18-shade colorful eyeshadow palette', shortDescription: '18-shade colorful palette', brand: 'Elissh Beauty', categoryId: 2, price: 89.99, stock: 20, sku: 'ELB-EYES-003', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Eyeliner - Black Liquid', description: 'Precision liquid eyeliner in black', shortDescription: 'Black liquid eyeliner', brand: 'Elissh Beauty', categoryId: 2, price: 25.99, stock: 80, sku: 'ELB-EYLR-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Eyeliner - Brown Liquid', description: 'Precision liquid eyeliner in brown', shortDescription: 'Brown liquid eyeliner', brand: 'Elissh Beauty', categoryId: 2, price: 25.99, stock: 65, sku: 'ELB-EYLR-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Eyeliner - Black Pencil', description: 'Smooth black pencil eyeliner', shortDescription: 'Black pencil eyeliner', brand: 'Elissh Beauty', categoryId: 2, price: 18.99, stock: 90, sku: 'ELB-EYLR-003', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Eyebrow Gel - Clear', description: 'Clear eyebrow setting gel', shortDescription: 'Clear brow gel', brand: 'Elissh Beauty', categoryId: 2, price: 22.99, stock: 55, sku: 'ELB-BROW-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Eyebrow Gel - Brown', description: 'Tinted brown eyebrow gel', shortDescription: 'Brown brow gel', brand: 'Elissh Beauty', categoryId: 2, price: 26.99, stock: 50, sku: 'ELB-BROW-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Eyebrow Pencil - Blonde', description: 'Blonde eyebrow defining pencil', shortDescription: 'Blonde brow pencil', brand: 'Elissh Beauty', categoryId: 2, price: 19.99, stock: 40, sku: 'ELB-BROW-003', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Eye Primer', description: 'Long-lasting eyeshadow primer', shortDescription: 'Eyeshadow primer', brand: 'Elissh Beauty', categoryId: 2, price: 28.99, stock: 45, sku: 'ELB-EPRI-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'False Eyelashes - Natural', description: 'Natural-looking false eyelashes', shortDescription: 'Natural false lashes', brand: 'Elissh Beauty', categoryId: 2, price: 12.99, stock: 100, sku: 'ELB-LASH-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'False Eyelashes - Dramatic', description: 'Dramatic volume false eyelashes', shortDescription: 'Dramatic false lashes', brand: 'Elissh Beauty', categoryId: 2, price: 15.99, stock: 85, sku: 'ELB-LASH-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lash Glue', description: 'Strong-hold eyelash adhesive', shortDescription: 'Eyelash glue', brand: 'Elissh Beauty', categoryId: 2, price: 8.99, stock: 120, sku: 'ELB-GLUE-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Eye Makeup Remover', description: 'Gentle waterproof eye makeup remover', shortDescription: 'Eye makeup remover', brand: 'Elissh Beauty', categoryId: 2, price: 18.99, stock: 70, sku: 'ELB-EREM-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Eyeshadow Single - Gold', description: 'Shimmery gold eyeshadow single', shortDescription: 'Gold eyeshadow', brand: 'Elissh Beauty', categoryId: 2, price: 16.99, stock: 35, sku: 'ELB-SING-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Eyeshadow Single - Bronze', description: 'Metallic bronze eyeshadow single', shortDescription: 'Bronze eyeshadow', brand: 'Elissh Beauty', categoryId: 2, price: 16.99, stock: 30, sku: 'ELB-SING-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Cream Eyeshadow - Nude', description: 'Long-wearing cream eyeshadow in nude', shortDescription: 'Nude cream eyeshadow', brand: 'Elissh Beauty', categoryId: 2, price: 24.99, stock: 25, sku: 'ELB-CREM-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Glitter Eyeshadow - Silver', description: 'Sparkly silver glitter eyeshadow', shortDescription: 'Silver glitter eyeshadow', brand: 'Elissh Beauty', categoryId: 2, price: 19.99, stock: 20, sku: 'ELB-GLIT-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Eye Brightener', description: 'Under-eye brightening concealer', shortDescription: 'Eye brightener', brand: 'Elissh Beauty', categoryId: 2, price: 32.99, stock: 40, sku: 'ELB-BRIG-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lash Serum', description: 'Nourishing eyelash growth serum', shortDescription: 'Lash growth serum', brand: 'Elissh Beauty', categoryId: 2, price: 68.99, stock: 15, sku: 'ELB-LSER-001', isActive: true, isFeatured: true, isOnSale: false },
  { name: 'Brow Wax', description: 'Clear eyebrow shaping wax', shortDescription: 'Brow shaping wax', brand: 'Elissh Beauty', categoryId: 2, price: 21.99, stock: 35, sku: 'ELB-BWAX-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Eye Cream - Anti-Aging', description: 'Anti-aging eye cream with peptides', shortDescription: 'Anti-aging eye cream', brand: 'Elissh Beauty', categoryId: 2, price: 55.99, stock: 25, sku: 'ELB-ECRE-001', isActive: true, isFeatured: false, isOnSale: false },

  // Lip Products (25 products)
  { name: 'Liquid Lipstick - Desert Rose', description: 'Matte liquid lipstick with 12-hour wear', shortDescription: 'Desert Rose liquid lipstick', brand: 'Elissh Beauty', categoryId: 3, price: 35.99, originalPrice: 49.99, stock: 100, sku: 'ELB-LIP-001', isActive: true, isFeatured: true, isOnSale: true },
  { name: 'Liquid Lipstick - Berry Wine', description: 'Deep berry matte liquid lipstick', shortDescription: 'Berry Wine liquid lipstick', brand: 'Elissh Beauty', categoryId: 3, price: 35.99, originalPrice: 49.99, stock: 85, sku: 'ELB-LIP-002', isActive: true, isFeatured: true, isOnSale: true },
  { name: 'Liquid Lipstick - Nude Pink', description: 'Nude pink matte liquid lipstick', shortDescription: 'Nude Pink liquid lipstick', brand: 'Elissh Beauty', categoryId: 3, price: 35.99, originalPrice: 49.99, stock: 90, sku: 'ELB-LIP-003', isActive: true, isFeatured: true, isOnSale: true },
  { name: 'Liquid Lipstick - Classic Red', description: 'Classic red matte liquid lipstick', shortDescription: 'Classic Red liquid lipstick', brand: 'Elissh Beauty', categoryId: 3, price: 35.99, originalPrice: 49.99, stock: 95, sku: 'ELB-LIP-004', isActive: true, isFeatured: true, isOnSale: true },
  { name: 'Lip Gloss - Clear', description: 'High-shine clear lip gloss', shortDescription: 'Clear lip gloss', brand: 'Elissh Beauty', categoryId: 3, price: 22.99, stock: 90, sku: 'ELB-GLSS-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lip Gloss - Pink Shimmer', description: 'Shimmery pink lip gloss', shortDescription: 'Pink shimmer gloss', brand: 'Elissh Beauty', categoryId: 3, price: 24.99, stock: 75, sku: 'ELB-GLSS-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lip Gloss - Coral', description: 'Coral-tinted lip gloss', shortDescription: 'Coral lip gloss', brand: 'Elissh Beauty', categoryId: 3, price: 24.99, stock: 70, sku: 'ELB-GLSS-003', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lip Liner - Nude', description: 'Creamy nude lip liner', shortDescription: 'Nude lip liner', brand: 'Elissh Beauty', categoryId: 3, price: 18.99, stock: 70, sku: 'ELB-LINR-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lip Liner - Red', description: 'Classic red lip liner', shortDescription: 'Red lip liner', brand: 'Elissh Beauty', categoryId: 3, price: 18.99, stock: 65, sku: 'ELB-LINR-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lip Liner - Brown', description: 'Brown-toned lip liner', shortDescription: 'Brown lip liner', brand: 'Elissh Beauty', categoryId: 3, price: 18.99, stock: 60, sku: 'ELB-LINR-003', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lip Balm - Vanilla', description: 'Nourishing vanilla lip balm', shortDescription: 'Vanilla lip balm', brand: 'Elissh Beauty', categoryId: 3, price: 12.99, stock: 120, sku: 'ELB-BALM-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lip Balm - Coconut', description: 'Moisturizing coconut lip balm', shortDescription: 'Coconut lip balm', brand: 'Elissh Beauty', categoryId: 3, price: 12.99, stock: 115, sku: 'ELB-BALM-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lip Balm - Strawberry', description: 'Sweet strawberry lip balm', shortDescription: 'Strawberry lip balm', brand: 'Elissh Beauty', categoryId: 3, price: 12.99, stock: 110, sku: 'ELB-BALM-003', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lipstick - Classic Red', description: 'Creamy classic red lipstick', shortDescription: 'Classic red lipstick', brand: 'Elissh Beauty', categoryId: 3, price: 28.99, stock: 80, sku: 'ELB-LIPS-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lipstick - Pink Rose', description: 'Romantic pink rose lipstick', shortDescription: 'Pink rose lipstick', brand: 'Elissh Beauty', categoryId: 3, price: 28.99, stock: 75, sku: 'ELB-LIPS-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lipstick - Coral Sunset', description: 'Vibrant coral sunset lipstick', shortDescription: 'Coral sunset lipstick', brand: 'Elissh Beauty', categoryId: 3, price: 28.99, stock: 70, sku: 'ELB-LIPS-003', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lip Stain - Berry', description: 'Long-lasting berry lip stain', shortDescription: 'Berry lip stain', brand: 'Elissh Beauty', categoryId: 3, price: 26.99, stock: 50, sku: 'ELB-STAI-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lip Stain - Cherry', description: 'Vibrant cherry lip stain', shortDescription: 'Cherry lip stain', brand: 'Elissh Beauty', categoryId: 3, price: 26.99, stock: 45, sku: 'ELB-STAI-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lip Scrub - Sugar', description: 'Exfoliating sugar lip scrub', shortDescription: 'Sugar lip scrub', brand: 'Elissh Beauty', categoryId: 3, price: 16.99, stock: 60, sku: 'ELB-SCRU-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lip Mask - Overnight', description: 'Nourishing overnight lip mask', shortDescription: 'Overnight lip mask', brand: 'Elissh Beauty', categoryId: 3, price: 24.99, stock: 40, sku: 'ELB-MASK-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lip Oil - Rose', description: 'Nourishing rose lip oil', shortDescription: 'Rose lip oil', brand: 'Elissh Beauty', categoryId: 3, price: 22.99, stock: 35, sku: 'ELB-LOIL-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lip Plumper', description: 'Volumizing lip plumper gloss', shortDescription: 'Lip plumper', brand: 'Elissh Beauty', categoryId: 3, price: 32.99, stock: 30, sku: 'ELB-PLUM-001', isActive: true, isFeatured: true, isOnSale: false },
  { name: 'Tinted Lip Balm - Rose', description: 'Rose-tinted moisturizing lip balm', shortDescription: 'Rose tinted balm', brand: 'Elissh Beauty', categoryId: 3, price: 18.99, stock: 55, sku: 'ELB-TBAL-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Matte Lipstick - Burgundy', description: 'Rich burgundy matte lipstick', shortDescription: 'Burgundy matte lipstick', brand: 'Elissh Beauty', categoryId: 3, price: 32.99, stock: 40, sku: 'ELB-MATT-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Glossy Lipstick - Nude', description: 'Glossy nude lipstick', shortDescription: 'Nude glossy lipstick', brand: 'Elissh Beauty', categoryId: 3, price: 29.99, stock: 50, sku: 'ELB-GLOS-001', isActive: true, isFeatured: false, isOnSale: false },

  // Skincare Products (25 products)
  { name: 'Vitamin C Serum', description: 'Brightening vitamin C serum with 20% L-Ascorbic Acid', shortDescription: 'Anti-aging vitamin C serum', brand: 'Elissh Skincare', categoryId: 4, price: 79.99, stock: 30, sku: 'ELS-SER-001', isActive: true, isFeatured: true, isOnSale: false },
  { name: 'Hyaluronic Acid Serum', description: 'Intensive hydrating serum with hyaluronic acid', shortDescription: 'Hydrating serum', brand: 'Elissh Skincare', categoryId: 4, price: 69.99, stock: 35, sku: 'ELS-SER-002', isActive: true, isFeatured: true, isOnSale: false },
  { name: 'Retinol Serum', description: 'Anti-aging retinol serum for night use', shortDescription: 'Anti-aging retinol serum', brand: 'Elissh Skincare', categoryId: 4, price: 89.99, stock: 25, sku: 'ELS-SER-003', isActive: true, isFeatured: true, isOnSale: false },
  { name: 'Niacinamide Serum', description: 'Pore-minimizing niacinamide serum', shortDescription: 'Pore-minimizing serum', brand: 'Elissh Skincare', categoryId: 4, price: 59.99, stock: 40, sku: 'ELS-SER-004', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Moisturizer - Dry Skin', description: 'Rich moisturizer for dry skin', shortDescription: 'Dry skin moisturizer', brand: 'Elissh Skincare', categoryId: 4, price: 65.99, stock: 40, sku: 'ELS-MOIS-001', isActive: true, isFeatured: true, isOnSale: false },
  { name: 'Moisturizer - Oily Skin', description: 'Lightweight moisturizer for oily skin', shortDescription: 'Oily skin moisturizer', brand: 'Elissh Skincare', categoryId: 4, price: 62.99, stock: 45, sku: 'ELS-MOIS-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Moisturizer - Sensitive Skin', description: 'Gentle moisturizer for sensitive skin', shortDescription: 'Sensitive skin moisturizer', brand: 'Elissh Skincare', categoryId: 4, price: 68.99, stock: 35, sku: 'ELS-MOIS-003', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Gentle Cleanser', description: 'Gentle foaming cleanser for all skin types', shortDescription: 'Gentle foaming cleanser', brand: 'Elissh Skincare', categoryId: 4, price: 39.99, stock: 60, sku: 'ELS-CLEN-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Exfoliating Cleanser', description: 'Deep-cleansing exfoliating face wash', shortDescription: 'Exfoliating cleanser', brand: 'Elissh Skincare', categoryId: 4, price: 42.99, stock: 50, sku: 'ELS-CLEN-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Oil Cleanser', description: 'Makeup-removing oil cleanser', shortDescription: 'Oil cleanser', brand: 'Elissh Skincare', categoryId: 4, price: 45.99, stock: 40, sku: 'ELS-CLEN-003', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Sunscreen SPF 50', description: 'Broad-spectrum sunscreen for UAE sun', shortDescription: 'SPF 50 sunscreen', brand: 'Elissh Skincare', categoryId: 4, price: 49.99, stock: 50, sku: 'ELS-SUN-001', isActive: true, isFeatured: true, isOnSale: false },
  { name: 'Sunscreen SPF 30', description: 'Daily broad-spectrum sunscreen', shortDescription: 'SPF 30 sunscreen', brand: 'Elissh Skincare', categoryId: 4, price: 42.99, stock: 55, sku: 'ELS-SUN-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Face Mask - Hydrating', description: 'Intensive hydrating sheet mask', shortDescription: 'Hydrating face mask', brand: 'Elissh Skincare', categoryId: 4, price: 8.99, stock: 100, sku: 'ELS-MASK-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Face Mask - Brightening', description: 'Vitamin C brightening sheet mask', shortDescription: 'Brightening face mask', brand: 'Elissh Skincare', categoryId: 4, price: 9.99, stock: 90, sku: 'ELS-MASK-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Face Mask - Purifying', description: 'Clay purifying face mask', shortDescription: 'Purifying clay mask', brand: 'Elissh Skincare', categoryId: 4, price: 24.99, stock: 40, sku: 'ELS-MASK-003', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Toner - Hydrating', description: 'Alcohol-free hydrating toner', shortDescription: 'Hydrating toner', brand: 'Elissh Skincare', categoryId: 4, price: 32.99, stock: 50, sku: 'ELS-TON-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Toner - Exfoliating', description: 'AHA/BHA exfoliating toner', shortDescription: 'Exfoliating toner', brand: 'Elissh Skincare', categoryId: 4, price: 38.99, stock: 35, sku: 'ELS-TON-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Eye Cream - Anti-Aging', description: 'Peptide-rich anti-aging eye cream', shortDescription: 'Anti-aging eye cream', brand: 'Elissh Skincare', categoryId: 4, price: 55.99, stock: 25, sku: 'ELS-EYE-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Eye Cream - Hydrating', description: 'Intensive hydrating eye cream', shortDescription: 'Hydrating eye cream', brand: 'Elissh Skincare', categoryId: 4, price: 48.99, stock: 30, sku: 'ELS-EYE-002', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Night Cream', description: 'Restorative night moisturizer', shortDescription: 'Night moisturizer', brand: 'Elissh Skincare', categoryId: 4, price: 72.99, stock: 30, sku: 'ELS-NIGH-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Face Oil - Rosehip', description: 'Nourishing rosehip face oil', shortDescription: 'Rosehip face oil', brand: 'Elissh Skincare', categoryId: 4, price: 52.99, stock: 25, sku: 'ELS-OIL-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Essence - Hydrating', description: 'Lightweight hydrating essence', shortDescription: 'Hydrating essence', brand: 'Elissh Skincare', categoryId: 4, price: 44.99, stock: 35, sku: 'ELS-ESS-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Spot Treatment', description: 'Targeted acne spot treatment', shortDescription: 'Acne spot treatment', brand: 'Elissh Skincare', categoryId: 4, price: 28.99, stock: 40, sku: 'ELS-SPOT-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Lip Treatment', description: 'Overnight lip repair treatment', shortDescription: 'Lip repair treatment', brand: 'Elissh Skincare', categoryId: 4, price: 22.99, stock: 45, sku: 'ELS-LIP-001', isActive: true, isFeatured: false, isOnSale: false },
  { name: 'Mist - Refreshing', description: 'Refreshing facial mist spray', shortDescription: 'Refreshing face mist', brand: 'Elissh Skincare', categoryId: 4, price: 26.99, stock: 50, sku: 'ELS-MIST-001', isActive: true, isFeatured: false, isOnSale: false }
];

async function seedComplete() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Clear existing data
    await Banner.destroy({ where: {} });
    await Product.destroy({ where: {} });
    console.log('Cleared existing banners and products.');

    // Insert banners
    await Banner.bulkCreate(bannerData);
    console.log(`Successfully seeded ${bannerData.length} banners.`);

    // Insert products
    await Product.bulkCreate(productData);
    console.log(`Successfully seeded ${productData.length} products.`);

    // Display summary
    const bannersByArea = bannerData.reduce((acc, banner) => {
      acc[banner.area] = (acc[banner.area] || 0) + 1;
      return acc;
    }, {});

    console.log('\n=== SEEDING COMPLETE ===');
    console.log(`✅ ${bannerData.length} banners created`);
    console.log(`✅ ${productData.length} cosmetic products created`);
    
    console.log('\nBanners by area:');
    Object.entries(bannersByArea).forEach(([area, count]) => {
      console.log(`  ${area}: ${count} banners`);
    });

    console.log('\nProducts by category:');
    console.log('  Face: 25 products');
    console.log('  Eyes: 25 products'); 
    console.log('  Lips: 25 products');
    console.log('  Skincare: 25 products');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
  }
}

seedComplete();