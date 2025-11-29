import sequelize from '../config/database.js';
import Category from '../models/Category.js';

const categories = [
  {
    name: 'Makeup',
    slug: 'makeup',
    description: 'Complete makeup collection including lipsticks, foundations, and more',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop',
    parentId: null,
    isActive: true,
    sortOrder: 1,
    metaTitle: 'Makeup Products - Elissh Beauty',
    metaDescription: 'Discover premium makeup products at Elissh Beauty',
    productCount: 0
  },
  {
    name: 'Skincare',
    slug: 'skincare',
    description: 'Premium skincare essentials for all skin types',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&h=200&fit=crop',
    parentId: null,
    isActive: true,
    sortOrder: 2,
    metaTitle: 'Skincare Products - Elissh Beauty',
    metaDescription: 'Professional skincare products for healthy, glowing skin',
    productCount: 0
  },
  {
    name: 'Fragrance',
    slug: 'fragrance',
    description: 'Luxury fragrances and perfumes for every occasion',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop',
    parentId: null,
    isActive: true,
    sortOrder: 3,
    metaTitle: 'Fragrances - Elissh Beauty',
    metaDescription: 'Explore our collection of luxury fragrances and perfumes',
    productCount: 0
  },
  {
    name: 'Hair Care',
    slug: 'hair-care',
    description: 'Professional hair care products for healthy, beautiful hair',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=200&fit=crop',
    parentId: null,
    isActive: true,
    sortOrder: 4,
    metaTitle: 'Hair Care Products - Elissh Beauty',
    metaDescription: 'Professional hair care solutions for all hair types',
    productCount: 0
  }
];

const subcategories = [
  // Makeup subcategories
  {
    name: 'Lipsticks',
    slug: 'lipsticks',
    description: 'Premium lipsticks in various shades and finishes',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=200&fit=crop',
    parentId: 1, // Will be updated after parent creation
    isActive: true,
    sortOrder: 1,
    metaTitle: 'Lipsticks - Elissh Beauty',
    metaDescription: 'Shop premium lipsticks in various shades',
    productCount: 0
  },
  {
    name: 'Foundations',
    slug: 'foundations',
    description: 'Perfect coverage foundations for all skin tones',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=200&fit=crop',
    parentId: 1,
    isActive: true,
    sortOrder: 2,
    metaTitle: 'Foundations - Elissh Beauty',
    metaDescription: 'Find your perfect foundation match',
    productCount: 0
  },
  // Skincare subcategories
  {
    name: 'Serums',
    slug: 'serums',
    description: 'Targeted serums for specific skin concerns',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=200&fit=crop',
    parentId: 2,
    isActive: true,
    sortOrder: 1,
    metaTitle: 'Serums - Elissh Beauty',
    metaDescription: 'Targeted skincare serums for all skin types',
    productCount: 0
  },
  {
    name: 'Moisturizers',
    slug: 'moisturizers',
    description: 'Hydrating moisturizers for healthy skin',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop',
    parentId: 2,
    isActive: true,
    sortOrder: 2,
    metaTitle: 'Moisturizers - Elissh Beauty',
    metaDescription: 'Hydrating moisturizers for all skin types',
    productCount: 0
  }
];

const seedCategories = async () => {
  try {
    console.log('🌱 Seeding categories...');
    
    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    // Sync models
    await sequelize.sync({ force: false });
    console.log('✅ Models synced');
    
    // Clear existing categories
    await Category.destroy({ where: {} });
    console.log('🗑️ Cleared existing categories');
    
    // Create main categories
    const createdCategories = await Category.bulkCreate(categories);
    console.log(`✅ Created ${createdCategories.length} main categories`);
    
    // Update subcategories with correct parent IDs
    const updatedSubcategories = subcategories.map(sub => ({
      ...sub,
      parentId: createdCategories.find(cat => cat.name === (sub.parentId === 1 ? 'Makeup' : 'Skincare'))?.id
    }));
    
    // Create subcategories
    const createdSubcategories = await Category.bulkCreate(updatedSubcategories);
    console.log(`✅ Created ${createdSubcategories.length} subcategories`);
    
    console.log('🎉 Categories seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();