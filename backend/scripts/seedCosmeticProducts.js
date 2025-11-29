import sequelize from '../config/database.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

// Ensure Category model is properly associated
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

const cosmeticProducts = [
  // SKINCARE PRODUCTS (30 products)
  {
    name: "Hydrating Vitamin C Serum",
    description: "Brightening serum with 20% Vitamin C, hyaluronic acid, and antioxidants. Reduces dark spots and promotes radiant skin.",
    shortDescription: "Brightening serum with 20% Vitamin C for radiant skin",
    brand: "Elissh Beauty",
    categoryName: "Skincare",
    subcategory: "Serums",
    price: 89.00,
    originalPrice: 120.00,
    stock: 45,
    sku: "ELB-VC-001",
    weight: 30.0,
    ingredients: ["Vitamin C", "Hyaluronic Acid", "Niacinamide", "Vitamin E"],
    howToUse: "Apply 2-3 drops to clean face morning and evening. Follow with moisturizer and SPF during day.",
    benefits: ["Brightens skin", "Reduces dark spots", "Anti-aging", "Hydrating"],
    suitableFor: ["All skin types", "Dull skin", "Aging skin"],
    certifications: ["Halal", "Cruelty-free", "Vegan"],
    tags: ["vitamin-c", "serum", "brightening", "anti-aging"],
    isFeatured: true,
    isOnSale: true,
    isHalal: true,
    isVegan: true,
    isCrueltyFree: true
  },
  {
    name: "Gentle Foam Cleanser",
    description: "Mild foaming cleanser with chamomile and aloe vera. Perfect for sensitive skin, removes makeup and impurities.",
    shortDescription: "Gentle foaming cleanser for sensitive skin",
    brand: "Pure Glow",
    categoryName: "Skincare",
    subcategory: "Cleansers",
    price: 45.00,
    stock: 60,
    sku: "PG-FC-002",
    weight: 150.0,
    ingredients: ["Chamomile Extract", "Aloe Vera", "Glycerin", "Coconut Oil"],
    howToUse: "Wet face, apply small amount, massage gently, rinse with lukewarm water.",
    benefits: ["Gentle cleansing", "Soothes skin", "Removes makeup", "Hydrating"],
    suitableFor: ["Sensitive skin", "Dry skin", "All skin types"],
    certifications: ["Halal", "Cruelty-free"],
    tags: ["cleanser", "gentle", "sensitive-skin"],
    isHalal: true,
    isCrueltyFree: true
  },
  {
    name: "Retinol Night Cream",
    description: "Anti-aging night cream with 0.5% retinol, peptides, and ceramides. Reduces fine lines and improves skin texture.",
    shortDescription: "Anti-aging night cream with retinol",
    brand: "Age Reverse",
    categoryName: "Skincare",
    subcategory: "Moisturizers",
    price: 125.00,
    originalPrice: 160.00,
    stock: 30,
    sku: "AR-RC-003",
    weight: 50.0,
    ingredients: ["Retinol", "Peptides", "Ceramides", "Shea Butter"],
    howToUse: "Apply to clean face before bed. Start 2-3 times per week, gradually increase. Use SPF during day.",
    benefits: ["Reduces fine lines", "Improves texture", "Anti-aging", "Firms skin"],
    suitableFor: ["Mature skin", "Aging skin", "Normal skin"],
    certifications: ["Cruelty-free"],
    tags: ["retinol", "anti-aging", "night-cream"],
    isOnSale: true,
    isCrueltyFree: true
  },
  {
    name: "Hyaluronic Acid Moisturizer",
    description: "Lightweight moisturizer with hyaluronic acid and ceramides. Provides 24-hour hydration without greasiness.",
    shortDescription: "Lightweight 24-hour hydrating moisturizer",
    brand: "Hydra Plus",
    categoryName: "Skincare",
    subcategory: "Moisturizers",
    price: 65.00,
    stock: 55,
    sku: "HP-HAM-004",
    weight: 75.0,
    ingredients: ["Hyaluronic Acid", "Ceramides", "Glycerin", "Squalane"],
    howToUse: "Apply to clean face morning and evening. Can be used under makeup.",
    benefits: ["Deep hydration", "Lightweight", "Non-greasy", "Plumps skin"],
    suitableFor: ["All skin types", "Dehydrated skin", "Oily skin"],
    certifications: ["Halal", "Cruelty-free", "Vegan"],
    tags: ["hyaluronic-acid", "moisturizer", "hydrating"],
    isFeatured: true,
    isHalal: true,
    isVegan: true,
    isCrueltyFree: true
  },
  {
    name: "Niacinamide Pore Minimizer",
    description: "10% Niacinamide serum that minimizes pores, controls oil, and improves skin texture.",
    shortDescription: "Pore minimizing serum with 10% Niacinamide",
    brand: "Clear Skin Co",
    categoryName: "Skincare",
    subcategory: "Serums",
    price: 55.00,
    stock: 40,
    sku: "CSC-NPM-005",
    weight: 30.0,
    ingredients: ["Niacinamide", "Zinc PCA", "Hyaluronic Acid"],
    howToUse: "Apply 2-3 drops to clean face twice daily before moisturizer.",
    benefits: ["Minimizes pores", "Controls oil", "Improves texture", "Reduces blemishes"],
    suitableFor: ["Oily skin", "Combination skin", "Acne-prone skin"],
    certifications: ["Halal", "Cruelty-free", "Vegan"],
    tags: ["niacinamide", "pore-minimizer", "oil-control"],
    isHalal: true,
    isVegan: true,
    isCrueltyFree: true
  },

  // MAKEUP PRODUCTS (40 products)
  {
    name: "Full Coverage Foundation",
    description: "Long-wearing foundation with buildable coverage. Available in 20 shades for all skin tones.",
    shortDescription: "Long-wearing full coverage foundation",
    brand: "Elissh Beauty",
    categoryName: "Makeup",
    subcategory: "Face",
    price: 75.00,
    stock: 80,
    sku: "ELB-FCF-006",
    weight: 30.0,
    variants: [
      { name: "Fair", value: "fair", price: 75.00 },
      { name: "Light", value: "light", price: 75.00 },
      { name: "Medium", value: "medium", price: 75.00 },
      { name: "Tan", value: "tan", price: 75.00 },
      { name: "Deep", value: "deep", price: 75.00 }
    ],
    howToUse: "Apply with brush or beauty sponge. Build coverage as needed.",
    benefits: ["Full coverage", "Long-wearing", "Buildable", "Natural finish"],
    suitableFor: ["All skin types", "All skin tones"],
    certifications: ["Halal", "Cruelty-free"],
    tags: ["foundation", "full-coverage", "long-wearing"],
    isFeatured: true,
    isHalal: true,
    isCrueltyFree: true
  },
  {
    name: "Matte Liquid Lipstick Set",
    description: "Set of 6 long-lasting matte liquid lipsticks in trending shades. Comfortable wear for up to 8 hours.",
    shortDescription: "6-piece matte liquid lipstick collection",
    brand: "Lip Luxe",
    categoryName: "Makeup",
    subcategory: "Lips",
    price: 95.00,
    originalPrice: 120.00,
    stock: 35,
    sku: "LL-MLS-007",
    weight: 42.0,
    variants: [
      { name: "Nude Collection", value: "nude", price: 95.00 },
      { name: "Bold Collection", value: "bold", price: 95.00 },
      { name: "Berry Collection", value: "berry", price: 95.00 }
    ],
    howToUse: "Apply directly to lips. Allow to dry for matte finish.",
    benefits: ["Long-lasting", "Matte finish", "Comfortable wear", "Highly pigmented"],
    suitableFor: ["All skin tones"],
    certifications: ["Halal", "Cruelty-free", "Vegan"],
    tags: ["lipstick", "matte", "long-lasting", "set"],
    isOnSale: true,
    isHalal: true,
    isVegan: true,
    isCrueltyFree: true
  },
  {
    name: "Eyeshadow Palette - Desert Rose",
    description: "18-shade eyeshadow palette with warm desert tones. Mix of matte and shimmer finishes.",
    shortDescription: "18-shade warm-toned eyeshadow palette",
    brand: "Color Dreams",
    categoryName: "Makeup",
    subcategory: "Eyes",
    price: 85.00,
    stock: 25,
    sku: "CD-EPD-008",
    weight: 180.0,
    howToUse: "Apply with eyeshadow brushes. Build and blend colors as desired.",
    benefits: ["Highly pigmented", "Blendable", "Long-wearing", "Versatile looks"],
    suitableFor: ["All skin tones", "Warm undertones"],
    certifications: ["Cruelty-free"],
    tags: ["eyeshadow", "palette", "warm-tones", "desert"],
    isCrueltyFree: true
  },
  {
    name: "Waterproof Mascara",
    description: "Volumizing and lengthening waterproof mascara. Smudge-proof formula lasts all day.",
    shortDescription: "Waterproof volumizing mascara",
    brand: "Lash Perfect",
    categoryName: "Makeup",
    subcategory: "Eyes",
    price: 45.00,
    stock: 70,
    sku: "LP-WM-009",
    weight: 12.0,
    variants: [
      { name: "Black", value: "black", price: 45.00 },
      { name: "Brown", value: "brown", price: 45.00 }
    ],
    howToUse: "Apply from root to tip in zigzag motion. Layer for more volume.",
    benefits: ["Waterproof", "Volumizing", "Lengthening", "Smudge-proof"],
    suitableFor: ["All eye types"],
    certifications: ["Halal", "Cruelty-free"],
    tags: ["mascara", "waterproof", "volumizing"],
    isFeatured: true,
    isHalal: true,
    isCrueltyFree: true
  },
  {
    name: "Contour & Highlight Kit",
    description: "Professional contour and highlight kit with 6 shades. Includes brushes and step-by-step guide.",
    shortDescription: "6-shade contour and highlight kit",
    brand: "Sculpt Pro",
    categoryName: "Makeup",
    subcategory: "Face",
    price: 110.00,
    stock: 20,
    sku: "SP-CHK-010",
    weight: 120.0,
    variants: [
      { name: "Light to Medium", value: "light-medium", price: 110.00 },
      { name: "Medium to Deep", value: "medium-deep", price: 110.00 }
    ],
    howToUse: "Use darker shades to contour, lighter shades to highlight. Blend well.",
    benefits: ["Professional results", "Includes brushes", "Step-by-step guide", "Buildable"],
    suitableFor: ["All skin tones"],
    certifications: ["Cruelty-free"],
    tags: ["contour", "highlight", "kit", "professional"],
    isCrueltyFree: true
  },

  // HAIRCARE PRODUCTS (20 products)
  {
    name: "Argan Oil Hair Mask",
    description: "Deep conditioning hair mask with pure argan oil. Repairs damaged hair and adds shine.",
    shortDescription: "Deep conditioning argan oil hair mask",
    brand: "Hair Therapy",
    categoryName: "Haircare",
    subcategory: "Treatments",
    price: 55.00,
    stock: 40,
    sku: "HT-AOM-011",
    weight: 200.0,
    ingredients: ["Argan Oil", "Keratin", "Vitamin E", "Coconut Oil"],
    howToUse: "Apply to damp hair, leave for 10-15 minutes, rinse thoroughly.",
    benefits: ["Deep conditioning", "Repairs damage", "Adds shine", "Strengthens hair"],
    suitableFor: ["Damaged hair", "Dry hair", "All hair types"],
    certifications: ["Halal", "Cruelty-free", "Vegan"],
    tags: ["hair-mask", "argan-oil", "deep-conditioning"],
    isHalal: true,
    isVegan: true,
    isCrueltyFree: true
  },
  {
    name: "Sulfate-Free Shampoo",
    description: "Gentle sulfate-free shampoo for color-treated hair. Maintains color vibrancy and moisture.",
    shortDescription: "Gentle sulfate-free shampoo for color-treated hair",
    brand: "Pure Hair",
    categoryName: "Haircare",
    subcategory: "Shampoo",
    price: 35.00,
    stock: 65,
    sku: "PH-SFS-012",
    weight: 300.0,
    ingredients: ["Coconut-derived cleansers", "Argan Oil", "Aloe Vera"],
    howToUse: "Apply to wet hair, massage gently, rinse thoroughly.",
    benefits: ["Sulfate-free", "Color-safe", "Gentle cleansing", "Moisturizing"],
    suitableFor: ["Color-treated hair", "Sensitive scalp", "All hair types"],
    certifications: ["Halal", "Cruelty-free", "Vegan"],
    tags: ["shampoo", "sulfate-free", "color-safe"],
    isHalal: true,
    isVegan: true,
    isCrueltyFree: true
  },

  // FRAGRANCE PRODUCTS (10 products)
  {
    name: "Arabian Nights Perfume",
    description: "Luxurious oriental fragrance with notes of oud, rose, and amber. Long-lasting eau de parfum.",
    shortDescription: "Oriental fragrance with oud and rose notes",
    brand: "Scent of Arabia",
    categoryName: "Fragrance",
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
    benefits: ["Long-lasting", "Luxurious scent", "Oriental notes", "Premium quality"],
    suitableFor: ["Evening wear", "Special occasions"],
    certifications: ["Halal"],
    tags: ["perfume", "oriental", "oud", "luxury"],
    isOnSale: true,
    isHalal: true
  }
];

// Add more products to reach 100
const additionalProducts = [
  // More Skincare
  { name: "Salicylic Acid Cleanser", brand: "Clear Skin Co", categoryName: "Skincare", subcategory: "Cleansers", price: 42.00, stock: 50, sku: "CSC-SAC-014" },
  { name: "Peptide Eye Cream", brand: "Age Reverse", categoryName: "Skincare", subcategory: "Eye Care", price: 95.00, stock: 30, sku: "AR-PEC-015" },
  { name: "Glycolic Acid Toner", brand: "Glow Labs", categoryName: "Skincare", subcategory: "Toners", price: 48.00, stock: 45, sku: "GL-GAT-016" },
  { name: "Ceramide Repair Serum", brand: "Barrier Fix", categoryName: "Skincare", subcategory: "Serums", price: 78.00, stock: 35, sku: "BF-CRS-017" },
  { name: "Vitamin E Night Oil", brand: "Nourish Co", categoryName: "Skincare", subcategory: "Oils", price: 52.00, stock: 40, sku: "NC-VEO-018" },
  
  // More Makeup
  { name: "Liquid Eyeliner Pen", brand: "Line Perfect", categoryName: "Makeup", subcategory: "Eyes", price: 28.00, stock: 60, sku: "LP-LEP-019" },
  { name: "Blush Palette", brand: "Rosy Glow", categoryName: "Makeup", subcategory: "Face", price: 65.00, stock: 35, sku: "RG-BP-020" },
  { name: "Lip Gloss Set", brand: "Glossy Lips", categoryName: "Makeup", subcategory: "Lips", price: 45.00, stock: 50, sku: "GL-LGS-021" },
  { name: "Eyebrow Gel", brand: "Brow Boss", categoryName: "Makeup", subcategory: "Eyes", price: 32.00, stock: 55, sku: "BB-EG-022" },
  { name: "Setting Spray", brand: "Lock It", categoryName: "Makeup", subcategory: "Face", price: 38.00, stock: 45, sku: "LI-SS-023" },
  
  // More Haircare
  { name: "Keratin Treatment", brand: "Smooth Hair", categoryName: "Haircare", subcategory: "Treatments", price: 85.00, stock: 25, sku: "SH-KT-024" },
  { name: "Dry Shampoo", brand: "Fresh Roots", categoryName: "Haircare", subcategory: "Styling", price: 28.00, stock: 70, sku: "FR-DS-025" },
  { name: "Hair Serum", brand: "Shine Plus", categoryName: "Haircare", subcategory: "Serums", price: 45.00, stock: 40, sku: "SP-HS-026" },
  { name: "Curl Defining Cream", brand: "Curl Love", categoryName: "Haircare", subcategory: "Styling", price: 38.00, stock: 35, sku: "CL-CDC-027" },
  { name: "Scalp Treatment", brand: "Healthy Scalp", categoryName: "Haircare", subcategory: "Treatments", price: 55.00, stock: 30, sku: "HS-ST-028" },
  
  // More Fragrance
  { name: "Fresh Citrus EDT", brand: "Zesty Scents", categoryName: "Fragrance", subcategory: "Eau de Toilette", price: 75.00, stock: 40, sku: "ZS-FCE-029" },
  { name: "Vanilla Musk Perfume", brand: "Sweet Scents", categoryName: "Fragrance", subcategory: "Perfume", price: 120.00, stock: 20, sku: "SS-VMP-030" },
  { name: "Rose Garden Spray", brand: "Floral Dreams", categoryName: "Fragrance", subcategory: "Body Spray", price: 35.00, stock: 60, sku: "FD-RGS-031" },
  { name: "Oud Collection Set", brand: "Luxury Oud", categoryName: "Fragrance", subcategory: "Gift Sets", price: 300.00, stock: 10, sku: "LO-OCS-032" },
  { name: "Jasmine Body Mist", brand: "Garden Fresh", categoryName: "Fragrance", subcategory: "Body Mist", price: 25.00, stock: 80, sku: "GF-JBM-033" }
];

// Generate remaining products programmatically
const generateMoreProducts = () => {
  const brands = ["Elissh Beauty", "Glow Labs", "Pure Radiance", "Luxury Touch", "Natural Glow", "Beauty Essentials", "Premium Care", "Radiant Skin"];
  const makeupSubcategories = ["Foundation", "Concealer", "Powder", "Bronzer", "Highlighter", "Eyeshadow", "Mascara", "Eyeliner", "Lipstick", "Lip Gloss"];
  const skincareSubcategories = ["Cleanser", "Toner", "Serum", "Moisturizer", "Mask", "Exfoliant", "Eye Cream", "Sunscreen"];
  const haircareSubcategories = ["Shampoo", "Conditioner", "Mask", "Oil", "Serum", "Spray", "Gel", "Mousse"];
  
  const products = [];
  let skuCounter = 34;
  
  // Generate makeup products
  for (let i = 0; i < 30; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const subcategory = makeupSubcategories[Math.floor(Math.random() * makeupSubcategories.length)];
    products.push({
      name: `${subcategory} ${brand.split(' ')[0]} ${i + 1}`,
      brand,
      categoryName: "Makeup",
      subcategory,
      price: Math.floor(Math.random() * 100) + 20,
      stock: Math.floor(Math.random() * 80) + 10,
      sku: `AUTO-${skuCounter++}`,
      isHalal: Math.random() > 0.3,
      isCrueltyFree: Math.random() > 0.2,
      isVegan: Math.random() > 0.4
    });
  }
  
  // Generate skincare products
  for (let i = 0; i < 25; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const subcategory = skincareSubcategories[Math.floor(Math.random() * skincareSubcategories.length)];
    products.push({
      name: `${subcategory} ${brand.split(' ')[0]} ${i + 1}`,
      brand,
      categoryName: "Skincare",
      subcategory,
      price: Math.floor(Math.random() * 120) + 30,
      stock: Math.floor(Math.random() * 60) + 15,
      sku: `AUTO-${skuCounter++}`,
      isHalal: Math.random() > 0.2,
      isCrueltyFree: Math.random() > 0.1,
      isVegan: Math.random() > 0.3
    });
  }
  
  // Generate haircare products
  for (let i = 0; i < 10; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const subcategory = haircareSubcategories[Math.floor(Math.random() * haircareSubcategories.length)];
    products.push({
      name: `${subcategory} ${brand.split(' ')[0]} ${i + 1}`,
      brand,
      categoryName: "Haircare",
      subcategory,
      price: Math.floor(Math.random() * 80) + 25,
      stock: Math.floor(Math.random() * 50) + 20,
      sku: `AUTO-${skuCounter++}`,
      isHalal: Math.random() > 0.3,
      isCrueltyFree: Math.random() > 0.2,
      isVegan: Math.random() > 0.4
    });
  }
  
  return products;
};

const seedCosmeticProducts = async () => {
  try {
    console.log('🧴 Starting cosmetic products seeding...');
    
    // Combine all products
    const allProducts = [...cosmeticProducts, ...additionalProducts, ...generateMoreProducts()];
    
    // Get categories
    const categories = await Category.findAll();
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });
    
    console.log(`📦 Seeding ${allProducts.length} cosmetic products...`);
    
    // Clear existing products
    await Product.destroy({ where: {} });
    
    // Process products in batches
    const batchSize = 10;
    for (let i = 0; i < allProducts.length; i += batchSize) {
      const batch = allProducts.slice(i, i + batchSize);
      
      const processedBatch = batch.map((product, index) => {
        const categoryId = categoryMap[product.categoryName];
        if (!categoryId) {
          console.warn(`⚠️ Category not found: ${product.categoryName}`);
          return null;
        }
        
        return {
          ...product,
          categoryId,
          description: product.description || `High-quality ${product.name.toLowerCase()} from ${product.brand}. Perfect for your beauty routine.`,
          shortDescription: product.shortDescription || `Premium ${product.name.toLowerCase()}`,
          weight: product.weight || Math.floor(Math.random() * 200) + 10,
          ingredients: product.ingredients || ["Natural extracts", "Vitamins", "Moisturizing agents"],
          howToUse: product.howToUse || "Apply as directed on packaging.",
          benefits: product.benefits || ["High quality", "Long-lasting", "Professional results"],
          suitableFor: product.suitableFor || ["All skin types"],
          certifications: product.certifications || ["Cruelty-free"],
          tags: product.tags || [product.subcategory?.toLowerCase(), product.brand.toLowerCase().replace(/\s+/g, '-')],
          rating: { average: Math.floor(Math.random() * 2) + 4, count: Math.floor(Math.random() * 100) + 10 },
          deliveryDays: Math.floor(Math.random() * 3) + 2,
          codAvailable: true,
          isActive: true,
          isFeatured: Math.random() > 0.8,
          isOnSale: Math.random() > 0.7,
          saleEndDate: Math.random() > 0.5 ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null,
          metaTitle: `${product.name} - ${product.brand} | Elissh Beauty`,
          metaDescription: product.shortDescription || `Buy ${product.name} from ${product.brand} at Elissh Beauty. Premium cosmetics with fast delivery in UAE.`
        };
      }).filter(Boolean);
      
      await Product.bulkCreate(processedBatch);
      console.log(`✅ Batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(allProducts.length/batchSize)} completed`);
    }
    
    console.log('🎉 Cosmetic products seeding completed successfully!');
    console.log(`📊 Total products created: ${allProducts.length}`);
    
    // Show summary by category
    const summary = await Product.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      include: [{
        model: Category,
        attributes: ['name']
      }],
      group: ['Category.id', 'Category.name']
    });
    
    console.log('\n📈 Products by category:');
    summary.forEach(item => {
      console.log(`  ${item.Category.name}: ${item.dataValues.count} products`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding cosmetic products:', error);
    throw error;
  }
};

export default seedCosmeticProducts;

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedCosmeticProducts()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}