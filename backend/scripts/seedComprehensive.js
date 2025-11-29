import sequelize from '../config/database.js';
import Banner from '../models/Banner.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

// Comprehensive banner data for all areas
const bannerData = [
  // Hero Slider Banners (5 banners)
  {
    name: 'Eid Collection Hero 1',
    area: 'hero-slider',
    heading: 'New Eid Collection',
    subHeading: 'Discover luxury beauty for your special moments',
    description: 'Up to 50% Off',
    image: '/uploads/banners/hero-eid-1.jpg',
    mobileImage: '/uploads/banners/hero-eid-1-mobile.jpg',
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
    name: 'Summer Glow Hero 2',
    area: 'hero-slider',
    heading: 'Glow This Summer',
    subHeading: 'Sweat-proof & long-lasting formulas for UAE heat',
    description: 'Free Shipping Over 100 AED',
    image: '/uploads/banners/hero-summer-2.jpg',
    mobileImage: '/uploads/banners/hero-summer-2-mobile.jpg',
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
    name: 'Halal Beauty Hero 3',
    area: 'hero-slider',
    heading: 'Halal Certified Beauty',
    subHeading: 'Premium products you can trust',
    description: 'New Arrivals',
    image: '/uploads/banners/hero-halal-3.jpg',
    mobileImage: '/uploads/banners/hero-halal-3-mobile.jpg',
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
    name: 'Luxury Collection Hero 4',
    area: 'hero-slider',
    heading: 'Luxury Collection',
    subHeading: 'Premium international brands',
    description: 'Exclusive Deals',
    image: '/uploads/banners/hero-luxury-4.jpg',
    mobileImage: '/uploads/banners/hero-luxury-4-mobile.jpg',
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
    name: 'Flash Sale Hero 5',
    area: 'hero-slider',
    heading: 'Flash Sale',
    subHeading: '24 Hours Only - Up to 70% Off',
    description: 'Limited Time',
    image: '/uploads/banners/hero-flash-5.jpg',
    mobileImage: '/uploads/banners/hero-flash-5-mobile.jpg',
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
    name: 'Left Side Skincare',
    area: 'hero-left',
    heading: 'Skincare Essentials',
    subHeading: 'Glow naturally',
    image: '/uploads/banners/hero-left-skincare.jpg',
    mobileImage: '/uploads/banners/hero-left-skincare-mobile.jpg',
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
    name: 'Right Side Fragrance',
    area: 'hero-right',
    heading: 'Signature Scents',
    subHeading: 'Luxury fragrances',
    image: '/uploads/banners/hero-right-fragrance.jpg',
    mobileImage: '/uploads/banners/hero-right-fragrance-mobile.jpg',
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
    name: 'Bottom Left Makeup',
    area: 'hero-bottom-left',
    heading: 'Makeup Collection',
    subHeading: 'Express your beauty',
    image: '/uploads/banners/hero-bottom-left-makeup.jpg',
    mobileImage: '/uploads/banners/hero-bottom-left-makeup-mobile.jpg',
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
    name: 'Bottom Right Hair Care',
    area: 'hero-bottom-right',
    heading: 'Hair Care',
    subHeading: 'Nourish & protect',
    image: '/uploads/banners/hero-bottom-right-hair.jpg',
    mobileImage: '/uploads/banners/hero-bottom-right-hair-mobile.jpg',
    link: '/category/haircare',
    buttonText: 'Shop Hair Care',
    textColor: '#ffffff',
    overlayColor: '#8b5cf6',
    overlayOpacity: 0.4,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 1
  },

  // After Special Offers - 3 Banners
  {
    name: 'After Special Offers 1',
    area: 'after-special-offers',
    heading: 'Summer Collection',
    subHeading: 'Beat the heat with our summer essentials',
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
    name: 'After Special Offers 2',
    area: 'after-special-offers',
    heading: 'Halal Beauty',
    subHeading: 'Certified halal cosmetics for conscious beauty',
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
    name: 'After Special Offers 3',
    area: 'after-special-offers',
    heading: 'Luxury Brands',
    subHeading: 'Premium international beauty brands',
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
    name: 'New Arrival Lipstick',
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
    name: 'New Arrival Skincare',
    area: 'new-arrival-banner',
    heading: 'Skincare Essentials',
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
    name: 'New Arrival Fragrance',
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
    name: 'New Arrival Hair Care',
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
    name: 'New Arrival Foundation',
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
    name: 'New Arrival Eye Makeup',
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
    name: 'New Arrival Body Care',
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
    name: 'New Arrival Tools',
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

  // Category Page Banners (for after 3 rows of products)
  {
    name: 'Category Page Makeup Banner',
    area: 'category-page-banner',
    heading: 'Makeup Masterclass',
    subHeading: 'Learn from the pros',
    image: '/uploads/banners/category-makeup-banner.jpg',
    mobileImage: '/uploads/banners/category-makeup-banner-mobile.jpg',
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
    name: 'Category Page Skincare Banner',
    area: 'category-page-banner',
    heading: 'Skincare Routine',
    subHeading: 'Build your perfect routine',
    image: '/uploads/banners/category-skincare-banner.jpg',
    mobileImage: '/uploads/banners/category-skincare-banner-mobile.jpg',
    link: '/skincare-guide',
    buttonText: 'Get Guide',
    textColor: '#ffffff',
    overlayColor: '#059669',
    overlayOpacity: 0.5,
    textAlignment: 'center',
    isActive: true,
    sortOrder: 2
  },

  // Wide Banners
  {
    name: 'Wide Banner Top',
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
    name: 'Wide Banner Bottom',
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
  }
];

// 28 Products data
const productData = [
  // Face Products
  {
    name: 'Matte Foundation - Fair',
    description: 'Long-lasting matte foundation for all skin types. Perfect for UAE climate with sweat-proof formula.',
    shortDescription: 'Full coverage matte foundation',
    brand: 'Elissh Beauty',
    categoryId: 1,
    price: 89.99,
    originalPrice: 119.99,
    stock: 50,
    sku: 'ELB-FOUND-001',
    isActive: true,
    isFeatured: true,
    isOnSale: true
  },
  {
    name: 'Concealer - Light',
    description: 'High coverage concealer that hides imperfections and brightens under-eye area.',
    shortDescription: 'Full coverage concealer',
    brand: 'Elissh Beauty',
    categoryId: 1,
    price: 45.99,
    stock: 75,
    sku: 'ELB-CONC-001',
    isActive: true,
    isFeatured: false,
    isOnSale: false
  },
  {
    name: 'Setting Powder',
    description: 'Translucent setting powder for long-lasting makeup in humid conditions.',
    shortDescription: 'Long-lasting setting powder',
    brand: 'Elissh Beauty',
    categoryId: 1,
    price: 35.99,
    stock: 60,
    sku: 'ELB-POWD-001',
    isActive: true,
    isFeatured: true,
    isOnSale: false
  },
  {
    name: 'Blush - Coral',
    description: 'Natural-looking blush that adds a healthy glow to your cheeks.',
    shortDescription: 'Natural coral blush',
    brand: 'Elissh Beauty',
    categoryId: 1,
    price: 29.99,
    stock: 40,
    sku: 'ELB-BLSH-001',
    isActive: true,
    isFeatured: false,
    isOnSale: false
  },

  // Eye Products
  {
    name: 'Waterproof Mascara',
    description: 'Waterproof mascara for dramatic lashes that withstands Dubai heat and humidity.',
    shortDescription: 'Long-lasting waterproof mascara',
    brand: 'Elissh Beauty',
    categoryId: 2,
    price: 45.99,
    stock: 75,
    sku: 'ELB-MASC-001',
    isActive: true,
    isFeatured: true,
    isOnSale: false
  },
  {
    name: 'Eyeshadow Palette - Neutral',
    description: '12-shade neutral eyeshadow palette perfect for everyday and evening looks.',
    shortDescription: '12-shade neutral palette',
    brand: 'Elissh Beauty',
    categoryId: 2,
    price: 79.99,
    originalPrice: 99.99,
    stock: 30,
    sku: 'ELB-EYES-001',
    isActive: true,
    isFeatured: true,
    isOnSale: true
  },
  {
    name: 'Eyeliner - Black',
    description: 'Precision liquid eyeliner for perfect lines that last all day.',
    shortDescription: 'Long-wearing liquid eyeliner',
    brand: 'Elissh Beauty',
    categoryId: 2,
    price: 25.99,
    stock: 80,
    sku: 'ELB-EYLR-001',
    isActive: true,
    isFeatured: false,
    isOnSale: false
  },
  {
    name: 'Eyebrow Gel',
    description: 'Tinted eyebrow gel for natural-looking, defined brows.',
    shortDescription: 'Tinted eyebrow gel',
    brand: 'Elissh Beauty',
    categoryId: 2,
    price: 32.99,
    stock: 45,
    sku: 'ELB-BROW-001',
    isActive: true,
    isFeatured: false,
    isOnSale: false
  },

  // Lip Products
  {
    name: 'Liquid Lipstick - Desert Rose',
    description: 'Matte liquid lipstick with 12-hour wear. Transfer-resistant formula perfect for all-day events.',
    shortDescription: 'Long-wearing liquid lipstick',
    brand: 'Elissh Beauty',
    categoryId: 3,
    price: 35.99,
    originalPrice: 49.99,
    stock: 100,
    sku: 'ELB-LIP-001',
    isActive: true,
    isFeatured: true,
    isOnSale: true
  },
  {
    name: 'Lip Gloss - Clear',
    description: 'High-shine lip gloss for a glossy, plump-looking pout.',
    shortDescription: 'High-shine lip gloss',
    brand: 'Elissh Beauty',
    categoryId: 3,
    price: 22.99,
    stock: 90,
    sku: 'ELB-GLSS-001',
    isActive: true,
    isFeatured: false,
    isOnSale: false
  },
  {
    name: 'Lip Liner - Nude',
    description: 'Creamy lip liner for precise application and long-lasting color.',
    shortDescription: 'Long-lasting lip liner',
    brand: 'Elissh Beauty',
    categoryId: 3,
    price: 18.99,
    stock: 70,
    sku: 'ELB-LINR-001',
    isActive: true,
    isFeatured: false,
    isOnSale: false
  },
  {
    name: 'Lip Balm - Vanilla',
    description: 'Nourishing lip balm with vanilla scent for soft, hydrated lips.',
    shortDescription: 'Nourishing vanilla lip balm',
    brand: 'Elissh Beauty',
    categoryId: 3,
    price: 12.99,
    stock: 120,
    sku: 'ELB-BALM-001',
    isActive: true,
    isFeatured: false,
    isOnSale: false
  },

  // Skincare Products
  {
    name: 'Vitamin C Serum',
    description: 'Brightening vitamin C serum for radiant skin. Contains 20% Vitamin C for maximum effectiveness.',
    shortDescription: 'Anti-aging vitamin C serum',
    brand: 'Elissh Skincare',
    categoryId: 4,
    price: 79.99,
    stock: 30,
    sku: 'ELS-SER-001',
    isActive: true,
    isFeatured: true,
    isOnSale: false
  },
  {
    name: 'Hyaluronic Acid Moisturizer',
    description: 'Intensive hydrating moisturizer with hyaluronic acid for plump, hydrated skin.',
    shortDescription: 'Hydrating face moisturizer',
    brand: 'Elissh Skincare',
    categoryId: 4,
    price: 65.99,
    stock: 40,
    sku: 'ELS-MOIS-001',
    isActive: true,
    isFeatured: true,
    isOnSale: false
  },
  {
    name: 'Gentle Cleanser',
    description: 'Gentle foaming cleanser suitable for all skin types, removes makeup and impurities.',
    shortDescription: 'Gentle foaming cleanser',
    brand: 'Elissh Skincare',
    categoryId: 4,
    price: 39.99,
    stock: 60,
    sku: 'ELS-CLEN-001',
    isActive: true,
    isFeatured: false,
    isOnSale: false
  },
  {
    name: 'Sunscreen SPF 50',
    description: 'Broad-spectrum sunscreen perfect for UAE sun protection. Non-greasy formula.',
    shortDescription: 'Broad-spectrum sunscreen',
    brand: 'Elissh Skincare',
    categoryId: 4,
    price: 49.99,
    stock: 50,
    sku: 'ELS-SUN-001',
    isActive: true,
    isFeatured: true,
    isOnSale: false
  },

  // Fragrance Products
  {
    name: 'Rose Gold Perfume',
    description: 'Elegant floral fragrance with rose and gold notes. A luxurious scent perfect for special occasions.',
    shortDescription: 'Luxury floral perfume',
    brand: 'Elissh Fragrance',
    categoryId: 5,
    price: 149.99,
    stock: 25,
    sku: 'ELF-PERF-001',
    isActive: true,
    isFeatured: false,
    isOnSale: false
  },
  {
    name: 'Oud Essence',
    description: 'Traditional oud fragrance with modern twist. Perfect for evening wear.',
    shortDescription: 'Traditional oud fragrance',
    brand: 'Elissh Fragrance',
    categoryId: 5,
    price: 199.99,
    stock: 15,
    sku: 'ELF-OUD-001',
    isActive: true,
    isFeatured: true,
    isOnSale: false
  },
  {
    name: 'Fresh Citrus EDT',
    description: 'Light and fresh citrus fragrance perfect for daytime wear in hot climate.',
    shortDescription: 'Fresh citrus fragrance',
    brand: 'Elissh Fragrance',
    categoryId: 5,
    price: 89.99,
    originalPrice: 109.99,
    stock: 35,
    sku: 'ELF-CIT-001',
    isActive: true,
    isFeatured: false,
    isOnSale: true
  },
  {
    name: 'Vanilla Musk',
    description: 'Warm and comforting vanilla musk fragrance for cozy evenings.',
    shortDescription: 'Warm vanilla musk',
    brand: 'Elissh Fragrance',
    categoryId: 5,
    price: 119.99,
    stock: 20,
    sku: 'ELF-VAN-001',
    isActive: true,
    isFeatured: false,
    isOnSale: false
  },

  // Hair Care Products
  {
    name: 'Argan Oil Shampoo',
    description: 'Nourishing shampoo with argan oil for dry and damaged hair.',
    shortDescription: 'Nourishing argan oil shampoo',
    brand: 'Elissh Hair',
    categoryId: 6,
    price: 45.99,
    stock: 40,
    sku: 'ELH-SHAM-001',
    isActive: true,
    isFeatured: false,
    isOnSale: false
  },
  {
    name: 'Deep Conditioning Mask',
    description: 'Intensive hair mask for weekly deep conditioning treatment.',
    shortDescription: 'Deep conditioning hair mask',
    brand: 'Elissh Hair',
    categoryId: 6,
    price: 55.99,
    stock: 30,
    sku: 'ELH-MASK-001',
    isActive: true,
    isFeatured: true,
    isOnSale: false
  },
  {
    name: 'Heat Protection Spray',
    description: 'Protects hair from heat damage while styling. Essential for UAE climate.',
    shortDescription: 'Heat protection styling spray',
    brand: 'Elissh Hair',
    categoryId: 6,
    price: 32.99,
    stock: 50,
    sku: 'ELH-HEAT-001',
    isActive: true,
    isFeatured: false,
    isOnSale: false
  },
  {
    name: 'Hair Oil Treatment',
    description: 'Luxurious hair oil blend for shine and nourishment.',
    shortDescription: 'Nourishing hair oil',
    brand: 'Elissh Hair',
    categoryId: 6,
    price: 39.99,
    originalPrice: 49.99,
    stock: 35,
    sku: 'ELH-OIL-001',
    isActive: true,
    isFeatured: false,
    isOnSale: true
  },

  // Body Care Products
  {
    name: 'Body Lotion - Coconut',
    description: 'Hydrating body lotion with coconut scent for soft, smooth skin.',
    shortDescription: 'Hydrating coconut body lotion',
    brand: 'Elissh Body',
    categoryId: 7,
    price: 29.99,
    stock: 60,
    sku: 'ELB-LOT-001',
    isActive: true,
    isFeatured: false,
    isOnSale: false
  },
  {
    name: 'Body Scrub - Sugar',
    description: 'Exfoliating sugar scrub for smooth, radiant skin.',
    shortDescription: 'Exfoliating sugar body scrub',
    brand: 'Elissh Body',
    categoryId: 7,
    price: 35.99,
    stock: 40,
    sku: 'ELB-SCRB-001',
    isActive: true,
    isFeatured: true,
    isOnSale: false
  },
  {
    name: 'Body Wash - Rose',
    description: 'Gentle body wash with rose extract for clean, fragrant skin.',
    shortDescription: 'Gentle rose body wash',
    brand: 'Elissh Body',
    categoryId: 7,
    price: 24.99,
    stock: 70,
    sku: 'ELB-WASH-001',
    isActive: true,
    isFeatured: false,
    isOnSale: false
  },
  {
    name: 'Hand Cream - Shea Butter',
    description: 'Rich hand cream with shea butter for intensive moisture.',
    shortDescription: 'Rich shea butter hand cream',
    brand: 'Elissh Body',
    categoryId: 7,
    price: 19.99,
    originalPrice: 24.99,
    stock: 80,
    sku: 'ELB-HAND-001',
    isActive: true,
    isFeatured: false,
    isOnSale: true
  }
];

async function seedComprehensive() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Clear existing banners
    await Banner.destroy({ where: {} });
    console.log('Cleared existing banners.');

    // Insert new banners
    await Banner.bulkCreate(bannerData);
    console.log(`Successfully seeded ${bannerData.length} banners.`);

    // Clear existing products (except first 5 to keep some data)
    await Product.destroy({ where: { id: { [sequelize.Sequelize.Op.gt]: 5 } } });
    console.log('Cleared existing additional products.');

    // Insert new products
    await Product.bulkCreate(productData);
    console.log(`Successfully seeded ${productData.length} products.`);

    // Display summary
    const bannersByArea = bannerData.reduce((acc, banner) => {
      acc[banner.area] = (acc[banner.area] || 0) + 1;
      return acc;
    }, {});

    console.log('\nBanners created by area:');
    Object.entries(bannersByArea).forEach(([area, count]) => {
      console.log(`  ${area}: ${count} banners`);
    });

    console.log(`\nTotal: ${bannerData.length} banners and ${productData.length} products created.`);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
  }
}

seedComprehensive();