import sequelize from '../config/database.js';
import User from '../models/User.js';
import Category from '../models/CategoryBasic.js';
import Product from '../models/Product.js';
import bcrypt from 'bcryptjs';

const seedBasicData = async () => {
  try {
    console.log('🚀 Starting basic data seeding...');
    
    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    // Sync database
    await sequelize.sync({ force: true });
    console.log('✅ Database synced');
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await User.create({
      name: 'Admin User',
      email: 'admin@elisshbeauty.ae',
      password: hashedPassword,
      role: 'admin',
      isVerified: true
    });
    console.log('✅ Admin user created');
    
    // Create basic categories
    const categories = [
      { name: 'Skincare', description: 'Skincare products', slug: 'skincare' },
      { name: 'Makeup', description: 'Makeup products', slug: 'makeup' },
      { name: 'Haircare', description: 'Hair care products', slug: 'haircare' },
      { name: 'Fragrance', description: 'Perfumes and fragrances', slug: 'fragrance' }
    ];
    
    for (const cat of categories) {
      await Category.create(cat);
    }
    console.log('✅ Categories created');
    
    // Create sample products
    const products = [
      {
        name: 'Moisturizing Cream',
        description: 'Hydrating face cream',
        price: 99.00,
        categoryId: 1,
        stock: 50,
        isActive: true,
        brand: 'Elissh Beauty',
        sku: 'MC001'
      },
      {
        name: 'Foundation',
        description: 'Long-lasting foundation',
        price: 149.00,
        categoryId: 2,
        stock: 30,
        isActive: true,
        brand: 'Elissh Beauty',
        sku: 'FD001'
      }
    ];
    
    for (const product of products) {
      await Product.create(product);
    }
    console.log('✅ Sample products created');
    
    console.log('🎉 Basic seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await sequelize.close();
  }
};

seedBasicData();