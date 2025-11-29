import dotenv from 'dotenv';
import sequelize from '../config/database.js';
import { Product, Category, User } from '../models/index.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedData = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync({ force: true });
    console.log('✅ Database synced');

    // Create categories
    const categories = await Category.bulkCreate([
      { name: 'Makeup', description: 'Complete makeup collection', slug: 'makeup' },
      { name: 'Skincare', description: 'Skincare essentials', slug: 'skincare' },
      { name: 'Haircare', description: 'Hair care products', slug: 'haircare' },
      { name: 'Fragrance', description: 'Perfumes and fragrances', slug: 'fragrance' },
      { name: 'Tools', description: 'Beauty tools and accessories', slug: 'tools' }
    ]);
    console.log('✅ Categories created');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@elisshbeauty.ae',
      password: hashedPassword,
      role: 'admin',
      isVerified: true
    });
    console.log('✅ Admin user created');

    // Create sample products
    const products = [
      {
        name: 'Matte Luxe Lipstick - Desert Rose',
        description: 'A long-lasting matte lipstick with intense color payoff.',
        shortDescription: 'Long-lasting matte lipstick',
        brand: 'Elissh Signature',
        categoryId: categories[0].id,
        price: 89.99,
        originalPrice: 129.99,
        stock: 50,
        sku: 'ELS-LIP-001',
        isFeatured: true,
        isOnSale: true,
        images: [{ url: '/images/lipstick-1.jpg', alt: 'Desert Rose Lipstick', isPrimary: true }]
      },
      {
        name: 'Hydrating Glow Serum',
        description: 'Intensive hydrating serum with hyaluronic acid.',
        shortDescription: 'Hydrating serum with hyaluronic acid',
        brand: 'SkinLuxe',
        categoryId: categories[1].id,
        price: 149.99,
        stock: 30,
        sku: 'SKL-SER-001',
        isFeatured: true,
        images: [{ url: '/images/serum-1.jpg', alt: 'Hydrating Serum', isPrimary: true }]
      },
      {
        name: 'Oud Royal Eau de Parfum',
        description: 'Luxurious oud fragrance with rich, woody notes.',
        shortDescription: 'Premium oud fragrance',
        brand: 'Arabia Essence',
        categoryId: categories[3].id,
        price: 299.99,
        originalPrice: 399.99,
        stock: 20,
        sku: 'ARE-OUD-001',
        isFeatured: true,
        isOnSale: true,
        images: [{ url: '/images/perfume-1.jpg', alt: 'Oud Royal Perfume', isPrimary: true }]
      }
    ];

    await Product.bulkCreate(products);
    console.log('✅ Products created');

    console.log('🎉 Database seeded successfully!');
    console.log('Admin credentials: admin@elisshbeauty.ae / admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();