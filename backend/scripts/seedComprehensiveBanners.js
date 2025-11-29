import Banner from '../models/Banner.js';

const comprehensiveBanners = [
  // HERO SLIDER BANNERS (5 banners)
  {
    name: "Summer Glow Collection",
    area: "hero-slider",
    heading: "Summer Glow Collection",
    subHeading: "Get Ready to Shine",
    description: "Discover our radiant summer makeup collection with 30% off",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&h=600&fit=crop",
    mobileImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=768&h=400&fit=crop",
    link: "/category/makeup",
    buttonText: "Shop Collection",
    textColor: "#ffffff",
    overlayColor: "#000000",
    overlayOpacity: 0.3,
    textAlignment: "left",
    isActive: true,
    sortOrder: 1
  },


  // HERO SIDE BANNERS (4 banners)
  {
    name: "Makeup Masterclass",
    area: "hero-left",
    heading: "Makeup Masterclass",
    subHeading: "Free Tutorial",
    description: "Learn pro techniques",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=500&fit=crop",
    mobileImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=250&h=300&fit=crop",
    link: "/tutorials",
    buttonText: "Watch Now",
    textColor: "#ffffff",
    overlayColor: "#ff6b6b",
    overlayOpacity: 0.4,
    textAlignment: "center",
    isActive: true,
    sortOrder: 1
  },
  {
    name: "VIP Membership",
    area: "hero-right",
    heading: "Join VIP Club",
    subHeading: "Exclusive Benefits",
    description: "Get 20% off + free shipping",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=500&fit=crop",
    mobileImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=250&h=300&fit=crop",
    link: "/vip-membership",
    buttonText: "Join Now",
    textColor: "#ffffff",
    overlayColor: "#9c27b0",
    overlayOpacity: 0.3,
    textAlignment: "center",
    isActive: true,
    sortOrder: 1
  },
  {
    name: "Gift Cards Available",
    area: "hero-bottom-left",
    heading: "Perfect Gift",
    subHeading: "Beauty Gift Cards",
    description: "Starting from AED 50",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop",
    mobileImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop",
    link: "/gift-cards",
    buttonText: "Buy Gift Card",
    textColor: "#2c3e50",
    overlayColor: "#ffd700",
    overlayOpacity: 0.2,
    textAlignment: "left",
    isActive: true,
    sortOrder: 1
  },
  {
    name: "Free Consultation",
    area: "hero-bottom-right",
    heading: "Beauty Consultation",
    subHeading: "Book Free Session",
    description: "Personalized beauty advice",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600&h=300&fit=crop",
    mobileImage: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=200&fit=crop",
    link: "/consultation",
    buttonText: "Book Now",
    textColor: "#ffffff",
    overlayColor: "#00bcd4",
    overlayOpacity: 0.4,
    textAlignment: "right",
    isActive: true,
    sortOrder: 1
  },

  // AFTER SPECIAL OFFERS BANNERS (3 banners)
  {
    name: "Bestsellers Collection",
    area: "after-special-offers",
    heading: "Customer Favorites",
    subHeading: "Top Rated Products",
    description: "Shop our most loved items",
    image: "/uploads/banners/bestsellers.jpg",
    mobileImage: "/uploads/banners/bestsellers-mobile.jpg",
    link: "/bestsellers",
    buttonText: "Shop Bestsellers",
    textColor: "#ffffff",
    overlayColor: "#ff5722",
    overlayOpacity: 0.3,
    textAlignment: "center",
    isActive: true,
    sortOrder: 1
  },
  {
    name: "Cruelty-Free Promise",
    area: "after-special-offers",
    heading: "100% Cruelty-Free",
    subHeading: "Ethical Beauty",
    description: "All our products are cruelty-free certified",
    image: "/uploads/banners/cruelty-free.jpg",
    mobileImage: "/uploads/banners/cruelty-free-mobile.jpg",
    link: "/cruelty-free",
    buttonText: "Learn More",
    textColor: "#2e7d32",
    overlayColor: "#c8e6c9",
    overlayOpacity: 0.2,
    textAlignment: "center",
    isActive: true,
    sortOrder: 2
  },
  {
    name: "Express Delivery",
    area: "after-special-offers",
    heading: "Same Day Delivery",
    subHeading: "Dubai & Abu Dhabi",
    description: "Order before 2 PM",
    image: "/uploads/banners/express-delivery.jpg",
    mobileImage: "/uploads/banners/express-delivery-mobile.jpg",
    link: "/delivery-info",
    buttonText: "Check Areas",
    textColor: "#ffffff",
    overlayColor: "#4caf50",
    overlayOpacity: 0.4,
    textAlignment: "center",
    isActive: true,
    sortOrder: 3
  },

  // NEW ARRIVALS GRID BANNERS (8 banners)
  {
    name: "New Lipstick Shades",
    area: "new-arrival-banner",
    heading: "New Lip Colors",
    subHeading: "12 Fresh Shades",
    description: "Perfect for every occasion",
    image: "/uploads/banners/new-lipstick.jpg",
    mobileImage: "/uploads/banners/new-lipstick-mobile.jpg",
    link: "/category/makeup/lips",
    buttonText: "Shop Lips",
    textColor: "#ffffff",
    overlayColor: "#e91e63",
    overlayOpacity: 0.3,
    textAlignment: "center",
    isActive: true,
    sortOrder: 1
  },
  {
    name: "Vitamin C Serum Launch",
    area: "new-arrival-banner",
    heading: "Vitamin C Serum",
    subHeading: "20% Concentration",
    description: "Brighten & protect your skin",
    image: "/uploads/banners/new-vitamin-c.jpg",
    mobileImage: "/uploads/banners/new-vitamin-c-mobile.jpg",
    link: "/products/vitamin-c-serum",
    buttonText: "Try Now",
    textColor: "#2c3e50",
    overlayColor: "#fff3e0",
    overlayOpacity: 0.3,
    textAlignment: "center",
    isActive: true,
    sortOrder: 2
  },
  {
    name: "Eyeshadow Palette Drop",
    area: "new-arrival-banner",
    heading: "Sunset Palette",
    subHeading: "18 Warm Shades",
    description: "Create stunning eye looks",
    image: "/uploads/banners/new-eyeshadow.jpg",
    mobileImage: "/uploads/banners/new-eyeshadow-mobile.jpg",
    link: "/products/sunset-eyeshadow-palette",
    buttonText: "Get Palette",
    textColor: "#ffffff",
    overlayColor: "#ff6f00",
    overlayOpacity: 0.4,
    textAlignment: "center",
    isActive: true,
    sortOrder: 3
  },
  {
    name: "Hair Oil Treatment",
    area: "new-arrival-banner",
    heading: "Argan Hair Oil",
    subHeading: "Intensive Repair",
    description: "Restore damaged hair",
    image: "/uploads/banners/new-hair-oil.jpg",
    mobileImage: "/uploads/banners/new-hair-oil-mobile.jpg",
    link: "/products/argan-hair-oil",
    buttonText: "Repair Hair",
    textColor: "#ffffff",
    overlayColor: "#8d6e63",
    overlayOpacity: 0.4,
    textAlignment: "center",
    isActive: true,
    sortOrder: 4
  },
  {
    name: "Foundation Innovation",
    area: "new-arrival-banner",
    heading: "24H Foundation",
    subHeading: "Full Coverage",
    description: "Available in 25 shades",
    image: "/uploads/banners/new-foundation.jpg",
    mobileImage: "/uploads/banners/new-foundation-mobile.jpg",
    link: "/products/24h-foundation",
    buttonText: "Find Shade",
    textColor: "#ffffff",
    overlayColor: "#795548",
    overlayOpacity: 0.3,
    textAlignment: "center",
    isActive: true,
    sortOrder: 5
  },
  {
    name: "Perfume Collection",
    area: "new-arrival-banner",
    heading: "Signature Scents",
    subHeading: "3 New Fragrances",
    description: "Discover your signature",
    image: "/uploads/banners/new-perfume.jpg",
    mobileImage: "/uploads/banners/new-perfume-mobile.jpg",
    link: "/category/fragrance/new",
    buttonText: "Smell Amazing",
    textColor: "#ffffff",
    overlayColor: "#673ab7",
    overlayOpacity: 0.4,
    textAlignment: "center",
    isActive: true,
    sortOrder: 6
  },
  {
    name: "Skincare Routine Kit",
    area: "new-arrival-banner",
    heading: "Complete Routine",
    subHeading: "4-Step Kit",
    description: "Everything you need",
    image: "/uploads/banners/new-skincare-kit.jpg",
    mobileImage: "/uploads/banners/new-skincare-kit-mobile.jpg",
    link: "/products/skincare-routine-kit",
    buttonText: "Get Kit",
    textColor: "#2c3e50",
    overlayColor: "#e8f5e8",
    overlayOpacity: 0.3,
    textAlignment: "center",
    isActive: true,
    sortOrder: 7
  },
  {
    name: "Makeup Brushes Set",
    area: "new-arrival-banner",
    heading: "Pro Brush Set",
    subHeading: "12 Essential Brushes",
    description: "Professional quality tools",
    image: "/uploads/banners/new-brushes.jpg",
    mobileImage: "/uploads/banners/new-brushes-mobile.jpg",
    link: "/products/pro-brush-set",
    buttonText: "Upgrade Tools",
    textColor: "#ffffff",
    overlayColor: "#37474f",
    overlayOpacity: 0.4,
    textAlignment: "center",
    isActive: true,
    sortOrder: 8
  },

  // WIDE BANNERS (2 banners)
  {
    name: "Black Friday Mega Sale",
    area: "wide-banner-top",
    heading: "Black Friday Sale",
    subHeading: "Up to 70% Off Everything",
    description: "Biggest sale of the year! Don't miss out on incredible deals across all categories",
    image: "/uploads/banners/black-friday-wide.jpg",
    mobileImage: "/uploads/banners/black-friday-wide-mobile.jpg",
    link: "/sale",
    buttonText: "Shop Sale Now",
    textColor: "#ffffff",
    overlayColor: "#000000",
    overlayOpacity: 0.5,
    textAlignment: "center",
    isActive: true,
    sortOrder: 1,
    startDate: new Date('2024-11-25'),
    endDate: new Date('2024-11-30')
  },
  {
    name: "Free Shipping Promotion",
    area: "wide-banner-bottom",
    heading: "Free Shipping on Orders Over AED 200",
    subHeading: "All Across UAE",
    description: "No minimum order for VIP members. Join today and save on every order!",
    image: "/uploads/banners/free-shipping-wide.jpg",
    mobileImage: "/uploads/banners/free-shipping-wide-mobile.jpg",
    link: "/shipping-info",
    buttonText: "Learn More",
    textColor: "#2c3e50",
    overlayColor: "#4caf50",
    overlayOpacity: 0.2,
    textAlignment: "center",
    isActive: true,
    sortOrder: 1
  },

  // CATEGORY PAGE BANNERS (Multiple banners for each category)
  {
    name: "Makeup Category Banner 1",
    area: "category-page-banner",
    position: "makeup",
    heading: "Professional Makeup Collection",
    subHeading: "Create Your Perfect Look",
    description: "From everyday natural to glamorous evening looks - find everything you need",
    image: "/uploads/banners/category-makeup-banner.jpg",
    mobileImage: "/uploads/banners/category-makeup-banner-mobile.jpg",
    link: "/category/makeup/featured",
    buttonText: "Shop Featured",
    textColor: "#ffffff",
    overlayColor: "#e91e63",
    overlayOpacity: 0.3,
    textAlignment: "left",
    isActive: true,
    sortOrder: 1
  },
  {
    name: "Makeup Category Banner 2",
    area: "category-page-banner",
    position: "makeup",
    heading: "New Makeup Arrivals",
    subHeading: "Latest Trends & Colors",
    description: "Discover the newest makeup trends and must-have colors of the season",
    image: "/uploads/banners/category-makeup-banner2.jpg",
    mobileImage: "/uploads/banners/category-makeup-banner2-mobile.jpg",
    link: "/category/makeup/new",
    buttonText: "Shop New",
    textColor: "#ffffff",
    overlayColor: "#ff6b6b",
    overlayOpacity: 0.4,
    textAlignment: "center",
    isActive: true,
    sortOrder: 2
  },
  {
    name: "Skincare Category Banner 1",
    area: "category-page-banner",
    position: "skincare",
    heading: "Science-Backed Skincare",
    subHeading: "For Every Skin Concern",
    description: "Dermatologist-approved formulas for healthy, glowing skin at every age",
    image: "/uploads/banners/category-skincare-banner.jpg",
    mobileImage: "/uploads/banners/category-skincare-banner-mobile.jpg",
    link: "/category/skincare/bestsellers",
    buttonText: "Shop Bestsellers",
    textColor: "#2c3e50",
    overlayColor: "#e8f5e8",
    overlayOpacity: 0.3,
    textAlignment: "center",
    isActive: true,
    sortOrder: 1
  },
  {
    name: "Skincare Category Banner 2",
    area: "category-page-banner",
    position: "skincare",
    heading: "Anti-Aging Solutions",
    subHeading: "Turn Back Time",
    description: "Advanced anti-aging treatments for youthful, radiant skin",
    image: "/uploads/banners/category-skincare-antiaging.jpg",
    mobileImage: "/uploads/banners/category-skincare-antiaging-mobile.jpg",
    link: "/category/skincare/anti-aging",
    buttonText: "Discover Anti-Aging",
    textColor: "#ffffff",
    overlayColor: "#6c5ce7",
    overlayOpacity: 0.4,
    textAlignment: "left",
    isActive: true,
    sortOrder: 2
  },
  {
    name: "Haircare Category Banner 1",
    area: "category-page-banner",
    position: "haircare",
    heading: "Salon-Quality Hair Care",
    subHeading: "Transform Your Hair at Home",
    description: "Professional treatments and styling products for every hair type and concern",
    image: "/uploads/banners/category-haircare-banner.jpg",
    mobileImage: "/uploads/banners/category-haircare-banner-mobile.jpg",
    link: "/category/haircare/treatments",
    buttonText: "Explore Treatments",
    textColor: "#ffffff",
    overlayColor: "#8d6e63",
    overlayOpacity: 0.4,
    textAlignment: "right",
    isActive: true,
    sortOrder: 1
  },
  {
    name: "Fragrance Category Banner 1",
    area: "category-page-banner",
    position: "fragrance",
    heading: "Luxury Fragrances",
    subHeading: "Signature Scents Collection",
    description: "Discover your perfect fragrance from our curated collection of premium perfumes",
    image: "/uploads/banners/category-fragrance-banner.jpg",
    mobileImage: "/uploads/banners/category-fragrance-banner-mobile.jpg",
    link: "/category/fragrance/luxury",
    buttonText: "Discover Luxury",
    textColor: "#ffffff",
    overlayColor: "#673ab7",
    overlayOpacity: 0.4,
    textAlignment: "center",
    isActive: true,
    sortOrder: 1
  },
  {
    name: "All Categories - Free Shipping",
    area: "category-page-banner",
    position: "main",
    heading: "Free Shipping on Orders Over AED 200",
    subHeading: "All Categories Included",
    description: "Shop any category and enjoy free delivery across UAE",
    image: "/uploads/banners/category-free-shipping.jpg",
    mobileImage: "/uploads/banners/category-free-shipping-mobile.jpg",
    link: "/shipping-info",
    buttonText: "Learn More",
    textColor: "#ffffff",
    overlayColor: "#00b894",
    overlayOpacity: 0.3,
    textAlignment: "center",
    isActive: true,
    sortOrder: 1
  }
];

const seedComprehensiveBanners = async () => {
  try {
    console.log('🎨 Starting comprehensive banner seeding...');
    
    // Clear existing banners
    await Banner.destroy({ where: {} });
    console.log('🗑️ Cleared existing banners');
    
    // Create banners in batches
    const batchSize = 5;
    let createdCount = 0;
    
    for (let i = 0; i < comprehensiveBanners.length; i += batchSize) {
      const batch = comprehensiveBanners.slice(i, i + batchSize);
      await Banner.bulkCreate(batch);
      createdCount += batch.length;
      console.log(`✅ Created ${createdCount}/${comprehensiveBanners.length} banners`);
    }
    
    console.log('🎉 Comprehensive banner seeding completed!');
    
    // Show summary by area
    const bannersByArea = comprehensiveBanners.reduce((acc, banner) => {
      acc[banner.area] = (acc[banner.area] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n📊 Banners created by area:');
    console.log('🏠 HOMEPAGE BANNERS:');
    console.log(`  Hero Slider: ${bannersByArea['hero-slider'] || 0} banners (Main carousel)`);
    console.log(`  Hero Left: ${bannersByArea['hero-left'] || 0} banners (Left side of hero)`);
    console.log(`  Hero Right: ${bannersByArea['hero-right'] || 0} banners (Right side of hero)`);
    console.log(`  Hero Bottom Left: ${bannersByArea['hero-bottom-left'] || 0} banners (Bottom left of hero)`);
    console.log(`  Hero Bottom Right: ${bannersByArea['hero-bottom-right'] || 0} banners (Bottom right of hero)`);
    console.log(`  After Special Offers: ${bannersByArea['after-special-offers'] || 0} banners (After product carousel)`);
    console.log(`  New Arrivals Grid: ${bannersByArea['new-arrival-banner'] || 0} banners (New arrivals section)`);
    console.log(`  Wide Banner Top: ${bannersByArea['wide-banner-top'] || 0} banners (Wide promotional banner)`);
    console.log(`  Wide Banner Bottom: ${bannersByArea['wide-banner-bottom'] || 0} banners (Wide promotional banner)`);
    
    console.log('\n📂 CATEGORY PAGE BANNERS:');
    console.log(`  Category Pages: ${bannersByArea['category-page-banner'] || 0} banners (Appears after 3 rows of products)`);
    
    console.log('\n💡 BANNER LOCATIONS GUIDE:');
    console.log('🏠 Homepage Areas:');
    console.log('  • Hero Slider: Top of homepage - main rotating carousel');
    console.log('  • Hero Sides: Left and right vertical banners in hero section');
    console.log('  • Hero Bottom: Two horizontal banners at bottom of hero section');
    console.log('  • After Special Offers: 3 banners after the special offers product carousel');
    console.log('  • New Arrivals Grid: 8 banners in grid layout in new arrivals section');
    console.log('  • Wide Banners: Full-width promotional banners (top and bottom positions)');
    console.log('📂 Category Pages:');
    console.log('  • Category Banner: Appears after every 3 rows of products on category pages');
    
  } catch (error) {
    console.error('❌ Error seeding comprehensive banners:', error);
    throw error;
  }
};

export default seedComprehensiveBanners;

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedComprehensiveBanners()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}