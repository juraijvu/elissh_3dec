import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const categories = [
  { name: 'Makeup', description: 'Complete makeup collection' },
  { name: 'Skincare', description: 'Skincare essentials' },
  { name: 'Haircare', description: 'Hair care products' },
  { name: 'Fragrance', description: 'Perfumes and fragrances' },
  { name: 'Tools', description: 'Beauty tools and accessories' }
];

const products = [
  {
    name: 'Matte Luxe Lipstick - Desert Rose',
    description: 'A long-lasting matte lipstick with intense color payoff. Perfect for the UAE climate with its sweat-proof and transfer-resistant formula.',
    shortDescription: 'Long-lasting matte lipstick with intense color',
    brand: 'Elissh Signature',
    price: 89.99,
    originalPrice: 129.99,
    images: [
      { url: '/images/lipstick-1.jpg', alt: 'Desert Rose Lipstick', isPrimary: true }
    ],
    stock: 50,
    sku: 'ELS-LIP-001',
    ingredients: ['Dimethicone', 'Cyclopentasiloxane', 'Titanium Dioxide'],
    howToUse: 'Apply directly to lips for full coverage',
    benefits: ['Long-lasting', 'Transfer-resistant', 'Comfortable wear'],
    suitableFor: ['All skin types'],
    certifications: ['halal', 'cruelty-free'],
    tags: ['matte', 'lipstick', 'long-lasting'],
    isFeatured: true,
    isOnSale: true
  },
  {
    name: 'Hydrating Glow Serum with Hyaluronic Acid',
    description: 'Intensive hydrating serum that plumps and moisturizes skin for a healthy glow.',
    shortDescription: 'Hydrating serum with hyaluronic acid',
    brand: 'SkinLuxe',
    price: 149.99,
    images: [
      { url: '/images/serum-1.jpg', alt: 'Hydrating Serum', isPrimary: true }
    ],
    stock: 30,
    sku: 'SKL-SER-001',
    ingredients: ['Hyaluronic Acid', 'Niacinamide', 'Vitamin E'],
    howToUse: 'Apply 2-3 drops to clean face, morning and evening',
    benefits: ['Hydrating', 'Anti-aging', 'Brightening'],
    suitableFor: ['Dry skin', 'Mature skin'],
    certifications: ['dermatologist-tested'],
    tags: ['serum', 'hydrating', 'anti-aging'],
    isFeatured: true
  },
  {
    name: 'Oud Royal Eau de Parfum 100ml',
    description: 'Luxurious oud fragrance with rich, woody notes perfect for special occasions.',
    shortDescription: 'Premium oud fragrance',
    brand: 'Arabia Essence',
    price: 299.99,
    originalPrice: 399.99,
    images: [
      { url: '/images/perfume-1.jpg', alt: 'Oud Royal Perfume', isPrimary: true }
    ],
    stock: 20,
    sku: 'ARE-OUD-001',
    howToUse: 'Spray on pulse points',
    benefits: ['Long-lasting', 'Luxurious scent'],
    tags: ['oud', 'perfume', 'luxury'],
    isFeatured: true,
    isOnSale: true
  },
  {
    name: 'Keratin Repair Hair Mask - Intense',
    description: 'Deep conditioning hair mask that repairs and strengthens damaged hair.',
    shortDescription: 'Intensive hair repair mask',
    brand: 'HairRevive',
    price: 119.99,
    images: [
      { url: '/images/hairmask-1.jpg', alt: 'Keratin Hair Mask', isPrimary: true }
    ],
    stock: 40,
    sku: 'HR-MASK-001',
    ingredients: ['Keratin', 'Argan Oil', 'Coconut Oil'],
    howToUse: 'Apply to damp hair, leave for 10-15 minutes, rinse thoroughly',
    benefits: ['Repairs damage', 'Strengthens hair', 'Adds shine'],
    suitableFor: ['Damaged hair', 'Dry hair'],
    tags: ['hair mask', 'keratin', 'repair'],
    isFeatured: true
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/elissh_cosmetics');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    // Create categories
    const createdCategories = await Category.insertMany(categories);
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

    // Create products with category references
    const productsWithCategories = products.map((product, index) => ({
      ...product,
      category: createdCategories[index % createdCategories.length]._id
    }));

    await Product.insertMany(productsWithCategories);
    console.log('Products created');

    console.log('Database seeded successfully!');
    console.log('Admin credentials: admin@elisshbeauty.ae / admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();