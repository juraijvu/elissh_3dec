import sequelize from './config/database.js';
import './models/index.js';
import { Category } from './models/index.js';

const testCategories = async () => {
  try {
    console.log('🔗 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected');

    console.log('📊 Checking existing categories...');
    const existingCategories = await Category.findAll();
    console.log(`Found ${existingCategories.length} existing categories`);
    
    if (existingCategories.length === 0) {
      console.log('🌱 Creating basic categories...');
      
      const categories = [
        {
          name: 'Makeup',
          slug: 'makeup',
          description: 'Complete makeup collection including foundations, lipsticks, and more',
          isActive: true,
          sortOrder: 1,
          showOnHomepage: true
        },
        {
          name: 'Skincare',
          slug: 'skincare',
          description: 'Premium skincare products for all skin types',
          isActive: true,
          sortOrder: 2,
          showOnHomepage: true
        },
        {
          name: 'Haircare',
          slug: 'haircare',
          description: 'Professional haircare products and treatments',
          isActive: true,
          sortOrder: 3,
          showOnHomepage: true
        },
        {
          name: 'Fragrance',
          slug: 'fragrance',
          description: 'Luxury perfumes and fragrances',
          isActive: true,
          sortOrder: 4,
          showOnHomepage: true
        }
      ];

      for (const categoryData of categories) {
        const category = await Category.create(categoryData);
        console.log(`✅ Created category: ${category.name}`);
      }
    } else {
      console.log('Categories already exist:');
      existingCategories.forEach(cat => {
        console.log(`- ${cat.name} (${cat.slug}) - Active: ${cat.isActive}`);
      });
    }

    console.log('🎉 Categories test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

testCategories();