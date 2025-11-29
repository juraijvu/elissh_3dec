import sequelize from './config/database.js';
import { User, Order, Wallet } from './models/index.js';

const cleanupData = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Clear all orders
    await Order.destroy({ where: {} });
    console.log('🗑️ Cleared all orders');

    // Clear all wallets
    await Wallet.destroy({ where: {} });
    console.log('🗑️ Cleared all wallets');

    // Keep only admin and create store manager
    await User.destroy({ 
      where: { 
        email: { 
          [sequelize.Sequelize.Op.notIn]: ['admin@elisshbeauty.ae'] 
        } 
      } 
    });
    console.log('🗑️ Removed extra users');

    // Create store manager
    const existingManager = await User.findOne({ where: { email: 'manager@elisshbeauty.ae' } });
    if (!existingManager) {
      await User.create({
        name: 'Store Manager',
        firstName: 'Store',
        lastName: 'Manager',
        email: 'manager@elisshbeauty.ae',
        password: 'manager123',
        role: 'storemanager',
        isVerified: true
      });
      console.log('✅ Created store manager: manager@elisshbeauty.ae / manager123');
    }

    // Create wallets for both users
    const users = await User.findAll();
    for (const user of users) {
      await Wallet.create({
        userId: user.id,
        balance: user.role === 'admin' ? 500 : 300,
        loyaltyPoints: user.role === 'admin' ? 1000 : 750,
        totalEarned: user.role === 'admin' ? 600 : 400,
        totalSpent: 100
      });
      console.log(`✅ Created wallet for ${user.email}`);
    }

    console.log('✅ Database cleanup completed!');
    console.log('👤 Users: admin@elisshbeauty.ae / admin123');
    console.log('👤 Manager: manager@elisshbeauty.ae / manager123');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sequelize.close();
  }
};

cleanupData();