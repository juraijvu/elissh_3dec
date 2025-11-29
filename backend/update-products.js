import sequelize from './config/database.js';
import { Product } from './models/index.js';

const updateProducts = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Update products with featured and sale flags
    await Product.update({ isFeatured: true }, { where: { name: 'Vitamin C Serum' } });
    await Product.update({ isFeatured: true, isOnSale: true }, { where: { name: 'Hyaluronic Acid' } });
    await Product.update({ isOnSale: true }, { where: { name: 'Red Lipstick' } });
    await Product.update({ isFeatured: true }, { where: { name: 'Foundation' } });

    console.log('✅ Products updated with featured and sale flags');
    
  } catch (error) {
    console.error('❌ Error updating products:', error);
  } finally {
    await sequelize.close();
  }
};

updateProducts();