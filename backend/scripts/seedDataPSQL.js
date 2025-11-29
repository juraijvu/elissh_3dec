import sequelize from '../config/database.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import dotenv from 'dotenv';

dotenv.config();

const categories = [
  { name: 'Makeup', description: 'Complete makeup collection' },
  { name: 'Skincare', description: 'Skincare essentials' },
  { name: 'Haircare', description: 'Hair care products' },
  { name: 'Fragrance', description: 'Perfumes and fragrances' },
  { name: 'Tools', description: 'Beauty tools and accessories' }
];

const seedData = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL');

    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Create categories
    const createdCategories = await Category.bulkCreate(categories);
    console.log('Categories created');

    // Create admin user
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@elisshbeauty.ae',
      password: 'admin123',
      role: 'admin',
      isVerified: true
    });
    console.log('Admin user created');

    // Create store manager user
    const storeManagerUser = await User.create({
      firstName: 'Store',
      lastName: 'Manager',
      email: 'manager@elisshbeauty.ae',
      password: 'manager123',
      role: 'storemanager',
      isVerified: true
    });
    console.log('Store manager user created');

    console.log('Database seeded successfully!');
    console.log('Admin credentials: admin@elisshbeauty.ae / admin123');
    console.log('Store Manager credentials: manager@elisshbeauty.ae / manager123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();