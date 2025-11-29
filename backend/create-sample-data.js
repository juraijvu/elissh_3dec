import sequelize from './config/database.js';
import { User, Product, Category } from './models/index.js';

const createSampleData = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Create sample users
    const sampleUsers = [
      { name: 'John Doe', firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123', role: 'user', isVerified: true },
      { name: 'Jane Smith', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', password: 'password123', role: 'user', isVerified: true },
      { name: 'Mike Johnson', firstName: 'Mike', lastName: 'Johnson', email: 'mike@example.com', password: 'password123', role: 'user', isVerified: false },
      { name: 'Sarah Wilson', firstName: 'Sarah', lastName: 'Wilson', email: 'sarah@example.com', password: 'password123', role: 'storemanager', isVerified: true },
      { name: 'Tom Brown', firstName: 'Tom', lastName: 'Brown', email: 'tom@example.com', password: 'password123', role: 'user', isVerified: true }
    ];

    for (const userData of sampleUsers) {
      const existingUser = await User.findOne({ where: { email: userData.email } });
      if (!existingUser) {
        await User.create(userData);
        console.log(`✅ Created user: ${userData.email}`);
      }
    }

    // Create sample categories if they don't exist
    const categories = ['Skincare', 'Makeup', 'Haircare', 'Fragrance'];
    for (const catName of categories) {
      const existing = await Category.findOne({ where: { name: catName } });
      if (!existing) {
        await Category.create({
          name: catName,
          slug: catName.toLowerCase(),
          description: `${catName} products`
        });
        console.log(`✅ Created category: ${catName}`);
      }
    }

    // Create sample products with low stock
    const skincare = await Category.findOne({ where: { name: 'Skincare' } });
    const makeup = await Category.findOne({ where: { name: 'Makeup' } });
    
    const sampleProducts = [
      { name: 'Vitamin C Serum', description: 'Brightening vitamin C serum', brand: 'ElisshBeauty', sku: 'VCS001', price: 29.99, stock: 3, categoryId: skincare?.id, isFeatured: true, isOnSale: false },
      { name: 'Hyaluronic Acid', description: 'Hydrating hyaluronic acid serum', brand: 'ElisshBeauty', sku: 'HAS002', price: 24.99, stock: 7, categoryId: skincare?.id, isFeatured: true, isOnSale: true },
      { name: 'Red Lipstick', description: 'Classic red lipstick', brand: 'ElisshBeauty', sku: 'RL003', price: 19.99, stock: 2, categoryId: makeup?.id, isFeatured: false, isOnSale: true },
      { name: 'Foundation', description: 'Full coverage foundation', brand: 'ElisshBeauty', sku: 'FND004', price: 34.99, stock: 15, categoryId: makeup?.id, isFeatured: true, isOnSale: false },
      { name: 'Moisturizer', description: 'Daily moisturizing cream', brand: 'ElisshBeauty', sku: 'MOI005', price: 39.99, stock: 5, categoryId: skincare?.id, isFeatured: false, isOnSale: false }
    ];

    for (const productData of sampleProducts) {
      const existing = await Product.findOne({ where: { name: productData.name } });
      if (!existing && productData.categoryId) {
        await Product.create(productData);
        console.log(`✅ Created product: ${productData.name}`);
      }
    }

    console.log('✅ Sample data created successfully!');
    
  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  } finally {
    await sequelize.close();
  }
};

createSampleData();