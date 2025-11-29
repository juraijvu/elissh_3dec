import sequelize from '../config/database.js';
import { Product, Category, User } from '../models/index.js';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Create categories
    const categories = await Category.bulkCreate([
      { name: 'Face', description: 'Face makeup and skincare products' },
      { name: 'Eyes', description: 'Eye makeup products' },
      { name: 'Lips', description: 'Lip makeup products' },
      { name: 'Skincare', description: 'Skincare and beauty products' },
      { name: 'Fragrance', description: 'Perfumes and fragrances' },
      { name: 'Hair Care', description: 'Hair care products' },
      { name: 'Body Care', description: 'Body care and wellness products' }
    ]);
    console.log('Categories created');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await User.create({
      name: 'Admin User',
      email: 'admin@elisshbeauty.ae',
      password: hashedPassword,
      role: 'admin',
      isVerified: true
    });
    console.log('Admin user created');

    // Create sample products
    const products = await Product.bulkCreate([
      {
        name: 'Matte Foundation',
        description: 'Long-lasting matte foundation for all skin types. Perfect for UAE climate with sweat-proof formula that provides full coverage without caking.',
        shortDescription: 'Full coverage matte foundation',
        brand: 'Elissh Beauty',
        categoryId: categories[0].id, // Face
        price: 89.99,
        originalPrice: 119.99,
        stock: 50,
        sku: 'ELB-FOUND-001',
        weight: 30.0,
        howToUse: 'Apply with a damp beauty sponge or foundation brush. Start from the center of your face and blend outward.',
        ingredients: ['Dimethicone', 'Cyclopentasiloxane', 'Titanium Dioxide', 'Iron Oxides', 'Mica', 'Vitamin E'],
        benefits: ['Long-lasting 12+ hour wear', 'Sweat and humidity resistant', 'Full coverage', 'Non-comedogenic'],
        variants: [
          { type: 'colors', name: 'Fair', value: '#F5DEB3' },
          { type: 'colors', name: 'Light', value: '#E6C2A6' },
          { type: 'colors', name: 'Medium', value: '#D4A574' },
          { type: 'colors', name: 'Tan', value: '#C19A6B' },
          { type: 'colors', name: 'Deep', value: '#8B4513' }
        ],
        deliveryDays: 2,
        codAvailable: true,
        isHalal: true,
        isVegan: false,
        isCrueltyFree: true,
        isActive: true,
        isFeatured: true,
        isOnSale: true
      },
      {
        name: 'Waterproof Mascara',
        description: 'Waterproof mascara for dramatic lashes that withstands Dubai heat and humidity',
        shortDescription: 'Long-lasting waterproof mascara',
        brand: 'Elissh Beauty',
        categoryId: categories[1].id, // Eyes
        price: 45.99,
        stock: 75,
        sku: 'ELB-MASC-001',
        weight: 8.5,
        howToUse: 'Apply from root to tip in zigzag motion. Layer for more volume.',
        ingredients: ['Beeswax', 'Carnauba Wax', 'Iron Oxides', 'Panthenol'],
        benefits: ['Waterproof formula', 'Volume and length', 'Smudge-proof', 'Easy removal'],
        variants: [
          { type: 'colors', name: 'Black', value: '#000000' },
          { type: 'colors', name: 'Brown', value: '#8B4513' },
          { type: 'colors', name: 'Navy', value: '#000080' }
        ],
        deliveryDays: 3,
        codAvailable: true,
        isHalal: true,
        isVegan: true,
        isCrueltyFree: true,
        isActive: true,
        isFeatured: false
      },
      {
        name: 'Liquid Lipstick',
        description: 'Matte liquid lipstick with 12-hour wear. Transfer-resistant formula perfect for all-day events.',
        shortDescription: 'Long-wearing liquid lipstick',
        brand: 'Elissh Beauty',
        categoryId: categories[2].id, // Lips
        price: 35.99,
        originalPrice: 49.99,
        stock: 100,
        sku: 'ELB-LIP-001',
        weight: 3.2,
        howToUse: 'Apply directly to clean lips. Allow to dry for 30 seconds for best results.',
        ingredients: ['Isododecane', 'Dimethicone', 'Kaolin', 'Vitamin E', 'Jojoba Oil'],
        benefits: ['12-hour wear', 'Transfer-resistant', 'Comfortable matte finish', 'Highly pigmented'],
        variants: [
          { type: 'colors', name: 'Desert Rose', value: '#C4747E' },
          { type: 'colors', name: 'Coral Blush', value: '#FF6B6B' },
          { type: 'colors', name: 'Berry Wine', value: '#8B2635' },
          { type: 'colors', name: 'Nude Pink', value: '#D4A574' },
          { type: 'colors', name: 'Classic Red', value: '#DC143C' }
        ],
        deliveryDays: 1,
        codAvailable: true,
        isHalal: true,
        isVegan: true,
        isCrueltyFree: true,
        isActive: true,
        isFeatured: true,
        isOnSale: true
      },
      {
        name: 'Vitamin C Serum',
        description: 'Brightening vitamin C serum for radiant skin. Contains 20% Vitamin C for maximum effectiveness.',
        shortDescription: 'Anti-aging vitamin C serum',
        brand: 'Elissh Skincare',
        categoryId: categories[3].id, // Skincare
        price: 79.99,
        stock: 30,
        sku: 'ELS-SER-001',
        weight: 30.0,
        howToUse: 'Apply 2-3 drops to clean face morning and evening. Follow with moisturizer and SPF.',
        ingredients: ['Vitamin C (L-Ascorbic Acid)', 'Hyaluronic Acid', 'Vitamin E', 'Ferulic Acid'],
        benefits: ['Brightens skin tone', 'Reduces dark spots', 'Anti-aging properties', 'Boosts collagen'],
        deliveryDays: 2,
        codAvailable: true,
        isHalal: true,
        isVegan: true,
        isCrueltyFree: true,
        isActive: true,
        isFeatured: true
      },
      {
        name: 'Rose Gold Perfume',
        description: 'Elegant floral fragrance with rose and gold notes. A luxurious scent perfect for special occasions.',
        shortDescription: 'Luxury floral perfume',
        brand: 'Elissh Fragrance',
        categoryId: categories[4].id, // Fragrance
        price: 149.99,
        stock: 25,
        sku: 'ELF-PERF-001',
        weight: 50.0,
        howToUse: 'Spray on pulse points: wrists, neck, and behind ears. Do not rub.',
        ingredients: ['Alcohol Denat', 'Rose Extract', 'Bergamot', 'Vanilla', 'Musk'],
        benefits: ['Long-lasting fragrance', 'Elegant scent profile', 'Perfect for evening wear', 'Luxurious packaging'],
        deliveryDays: 3,
        codAvailable: false,
        isHalal: false,
        isVegan: false,
        isCrueltyFree: true,
        isActive: true,
        isFeatured: false
      }
    ]);
    console.log('Sample products created');

    console.log('Database seeded successfully!');
    console.log(`Created ${categories.length} categories and ${products.length} products`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();