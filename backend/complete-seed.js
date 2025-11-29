import sequelize from './config/database.js';
import { Product, Category, Banner, User, Order, Wallet } from './models/index.js';

const completeSeeding = async () => {
  try {
    console.log('🚀 Starting complete database seeding...\n');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established\n');
    
    // Sync database
    await sequelize.sync({ force: false });
    console.log('✅ Database synchronized\n');
    
    // 1. Create Categories
    console.log('📂 STEP 1: Creating categories...');
    const categories = [
      {
        name: 'Skincare',
        description: 'Complete skincare solutions for all skin types',
        slug: 'skincare',
        isActive: true,
        sortOrder: 1,
        metaTitle: 'Skincare Products - Elissh Beauty',
        metaDescription: 'Discover premium skincare products including cleansers, serums, moisturizers and more.'
      },
      {
        name: 'Makeup',
        description: 'Professional makeup products for every occasion',
        slug: 'makeup',
        isActive: true,
        sortOrder: 2,
        metaTitle: 'Makeup Products - Elissh Beauty',
        metaDescription: 'Shop the latest makeup trends including foundation, lipstick, eyeshadow and more.'
      },
      {
        name: 'Haircare',
        description: 'Nourishing haircare products for healthy, beautiful hair',
        slug: 'haircare',
        isActive: true,
        sortOrder: 3,
        metaTitle: 'Haircare Products - Elissh Beauty',
        metaDescription: 'Professional haircare products including shampoos, treatments and styling products.'
      },
      {
        name: 'Fragrance',
        description: 'Luxurious fragrances and perfumes',
        slug: 'fragrance',
        isActive: true,
        sortOrder: 4,
        metaTitle: 'Fragrances & Perfumes - Elissh Beauty',
        metaDescription: 'Discover our collection of premium fragrances and perfumes for every occasion.'
      }
    ];
    
    await Category.destroy({ where: {} });
    const createdCategories = await Category.bulkCreate(categories);
    console.log(`✅ Created ${createdCategories.length} categories\n`);
    
    // 2. Create Sample Products
    console.log('📦 STEP 2: Creating sample products...');
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });
    
    const sampleProducts = [
      // Skincare
      {
        name: "Hydrating Vitamin C Serum",
        description: "Brightening serum with 20% Vitamin C, hyaluronic acid, and antioxidants. Reduces dark spots and promotes radiant skin.",
        shortDescription: "Brightening serum with 20% Vitamin C for radiant skin",
        brand: "Elissh Beauty",
        categoryId: categoryMap['Skincare'],
        subcategory: "Serums",
        price: 89.00,
        originalPrice: 120.00,
        stock: 45,
        sku: "ELB-VC-001",
        weight: 30.0,
        ingredients: ["Vitamin C", "Hyaluronic Acid", "Niacinamide", "Vitamin E"],
        howToUse: "Apply 2-3 drops to clean face morning and evening.",
        benefits: ["Brightens skin", "Reduces dark spots", "Anti-aging", "Hydrating"],
        suitableFor: ["All skin types", "Dull skin", "Aging skin"],
        certifications: ["Halal", "Cruelty-free", "Vegan"],
        tags: ["vitamin-c", "serum", "brightening", "anti-aging"],
        rating: { average: 4.5, count: 89 },
        isFeatured: true,
        isOnSale: true,
        isHalal: true,
        isVegan: true,
        isCrueltyFree: true,
        isActive: true,
        metaTitle: "Hydrating Vitamin C Serum - Elissh Beauty",
        metaDescription: "Premium Vitamin C serum for brighter, healthier skin. Shop now at Elissh Beauty."
      },
      {
        name: "Gentle Foam Cleanser",
        description: "Mild foaming cleanser with chamomile and aloe vera. Perfect for sensitive skin.",
        shortDescription: "Gentle foaming cleanser for sensitive skin",
        brand: "Pure Glow",
        categoryId: categoryMap['Skincare'],
        subcategory: "Cleansers",
        price: 45.00,
        stock: 60,
        sku: "PG-FC-002",
        weight: 150.0,
        ingredients: ["Chamomile Extract", "Aloe Vera", "Glycerin"],
        howToUse: "Wet face, apply small amount, massage gently, rinse.",
        benefits: ["Gentle cleansing", "Soothes skin", "Removes makeup"],
        suitableFor: ["Sensitive skin", "Dry skin", "All skin types"],
        certifications: ["Halal", "Cruelty-free"],
        tags: ["cleanser", "gentle", "sensitive-skin"],
        rating: { average: 4.3, count: 67 },
        isHalal: true,
        isCrueltyFree: true,
        isActive: true,
        metaTitle: "Gentle Foam Cleanser - Pure Glow",
        metaDescription: "Gentle foaming cleanser perfect for sensitive skin. Shop at Elissh Beauty."
      },
      // Makeup
      {
        name: "Full Coverage Foundation",
        description: "Long-wearing foundation with buildable coverage. Available in 20 shades.",
        shortDescription: "Long-wearing full coverage foundation",
        brand: "Elissh Beauty",
        categoryId: categoryMap['Makeup'],
        subcategory: "Face",
        price: 75.00,
        stock: 80,
        sku: "ELB-FCF-006",
        weight: 30.0,
        variants: [
          { name: "Fair", value: "fair", price: 75.00 },
          { name: "Light", value: "light", price: 75.00 },
          { name: "Medium", value: "medium", price: 75.00 }
        ],
        howToUse: "Apply with brush or beauty sponge. Build coverage as needed.",
        benefits: ["Full coverage", "Long-wearing", "Buildable", "Natural finish"],
        suitableFor: ["All skin types", "All skin tones"],
        certifications: ["Halal", "Cruelty-free"],
        tags: ["foundation", "full-coverage", "long-wearing"],
        rating: { average: 4.7, count: 124 },
        isFeatured: true,
        isHalal: true,
        isCrueltyFree: true,
        isActive: true,
        metaTitle: "Full Coverage Foundation - Elissh Beauty",
        metaDescription: "Professional full coverage foundation in 20 shades. Shop at Elissh Beauty."
      },
      {
        name: "Matte Liquid Lipstick Set",
        description: "Set of 6 long-lasting matte liquid lipsticks in trending shades.",
        shortDescription: "6-piece matte liquid lipstick collection",
        brand: "Lip Luxe",
        categoryId: categoryMap['Makeup'],
        subcategory: "Lips",
        price: 95.00,
        originalPrice: 120.00,
        stock: 35,
        sku: "LL-MLS-007",
        weight: 42.0,
        howToUse: "Apply directly to lips. Allow to dry for matte finish.",
        benefits: ["Long-lasting", "Matte finish", "Comfortable wear"],
        suitableFor: ["All skin tones"],
        certifications: ["Halal", "Cruelty-free", "Vegan"],
        tags: ["lipstick", "matte", "long-lasting", "set"],
        rating: { average: 4.4, count: 78 },
        isOnSale: true,
        isHalal: true,
        isVegan: true,
        isCrueltyFree: true,
        isActive: true,
        metaTitle: "Matte Liquid Lipstick Set - Lip Luxe",
        metaDescription: "6-piece matte liquid lipstick collection. Shop at Elissh Beauty."
      },
      // Haircare
      {
        name: "Argan Oil Hair Mask",
        description: "Deep conditioning hair mask with pure argan oil. Repairs damaged hair.",
        shortDescription: "Deep conditioning argan oil hair mask",
        brand: "Hair Therapy",
        categoryId: categoryMap['Haircare'],
        subcategory: "Treatments",
        price: 55.00,
        stock: 40,
        sku: "HT-AOM-011",
        weight: 200.0,
        ingredients: ["Argan Oil", "Keratin", "Vitamin E"],
        howToUse: "Apply to damp hair, leave for 10-15 minutes, rinse.",
        benefits: ["Deep conditioning", "Repairs damage", "Adds shine"],
        suitableFor: ["Damaged hair", "Dry hair", "All hair types"],
        certifications: ["Halal", "Cruelty-free", "Vegan"],
        tags: ["hair-mask", "argan-oil", "deep-conditioning"],
        rating: { average: 4.6, count: 92 },
        isHalal: true,
        isVegan: true,
        isCrueltyFree: true,
        isActive: true,
        metaTitle: "Argan Oil Hair Mask - Hair Therapy",
        metaDescription: "Deep conditioning argan oil hair mask. Shop at Elissh Beauty."
      },
      // Fragrance
      {
        name: "Arabian Nights Perfume",
        description: "Luxurious oriental fragrance with notes of oud, rose, and amber.",
        shortDescription: "Oriental fragrance with oud and rose notes",
        brand: "Scent of Arabia",
        categoryId: categoryMap['Fragrance'],
        subcategory: "Perfume",
        price: 150.00,
        originalPrice: 200.00,
        stock: 15,
        sku: "SOA-AN-013",
        weight: 50.0,
        variants: [
          { name: "50ml", value: "50ml", price: 150.00 },
          { name: "100ml", value: "100ml", price: 250.00 }
        ],
        howToUse: "Spray on pulse points. Do not rub.",
        benefits: ["Long-lasting", "Luxurious scent", "Oriental notes"],
        suitableFor: ["Evening wear", "Special occasions"],
        certifications: ["Halal"],
        tags: ["perfume", "oriental", "oud", "luxury"],
        rating: { average: 4.8, count: 156 },
        isOnSale: true,
        isHalal: true,
        isActive: true,
        metaTitle: "Arabian Nights Perfume - Scent of Arabia",
        metaDescription: "Luxurious oriental perfume with oud and rose. Shop at Elissh Beauty."
      }
    ];
    
    await Product.destroy({ where: {} });
    const createdProducts = await Product.bulkCreate(sampleProducts);
    console.log(`✅ Created ${createdProducts.length} sample products\n`);
    
    // 3. Create Sample Banners
    console.log('🎨 STEP 3: Creating sample banners...');
    const sampleBanners = [
      {
        name: "Hero Banner 1",
        area: "hero-slider",
        position: "main",
        heading: "Welcome to Elissh Beauty",
        subHeading: "Discover Premium Cosmetics",
        description: "Shop the latest beauty trends with fast delivery across UAE",
        image: "/uploads/banners/hero-1.jpg",
        mobileImage: "/uploads/banners/hero-1-mobile.jpg",
        link: "/products",
        buttonText: "Shop Now",
        textColor: "#ffffff",
        backgroundColor: "#ff6b9d",
        overlayOpacity: 0.3,
        textAlignment: "center",
        isActive: true,
        sortOrder: 1
      },
      {
        name: "Skincare Category Banner",
        area: "category-page-banner",
        position: "skincare",
        heading: "Premium Skincare",
        subHeading: "For Every Skin Type",
        description: "Discover our range of halal-certified skincare products",
        image: "/uploads/banners/category-skincare.jpg",
        mobileImage: "/uploads/banners/category-skincare-mobile.jpg",
        link: "/category/skincare",
        buttonText: "Explore Skincare",
        textColor: "#2d3748",
        backgroundColor: "#f7fafc",
        overlayOpacity: 0.2,
        textAlignment: "left",
        isActive: true,
        sortOrder: 1
      },
      {
        name: "Makeup Category Banner",
        area: "category-page-banner",
        position: "makeup",
        heading: "Professional Makeup",
        subHeading: "Express Your Beauty",
        description: "High-quality makeup products for every occasion",
        image: "/uploads/banners/category-makeup.jpg",
        mobileImage: "/uploads/banners/category-makeup-mobile.jpg",
        link: "/category/makeup",
        buttonText: "Shop Makeup",
        textColor: "#ffffff",
        backgroundColor: "#e53e3e",
        overlayOpacity: 0.4,
        textAlignment: "center",
        isActive: true,
        sortOrder: 2
      }
    ];
    
    await Banner.destroy({ where: {} });
    const createdBanners = await Banner.bulkCreate(sampleBanners);
    console.log(`✅ Created ${createdBanners.length} sample banners\n`);
    
    console.log('🎉 COMPLETE SEEDING FINISHED SUCCESSFULLY!\n');
    console.log('📊 SUMMARY:');
    console.log(`  ✅ Categories: ${createdCategories.length}`);
    console.log(`  ✅ Products: ${createdProducts.length}`);
    console.log(`  ✅ Banners: ${createdBanners.length}`);
    console.log(`  ✅ Admin user: admin@elisshbeauty.ae / admin123`);
    
    console.log('\n🌐 NEXT STEPS:');
    console.log('  1. Start backend: npm run dev (in backend folder)');
    console.log('  2. Start frontend: npm run dev (in root folder)');
    console.log('  3. Visit: http://localhost:5173');
    console.log('  4. Admin panel: http://localhost:5173/admin');
    
  } catch (error) {
    console.error('❌ Error in complete seeding:', error);
    throw error;
  }
};

completeSeeding()
  .then(() => {
    console.log('\n✨ Database is ready with demo data!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Seeding failed:', error);
    process.exit(1);
  });