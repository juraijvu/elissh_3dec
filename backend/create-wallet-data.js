import sequelize from './config/database.js';
import { User, Order, Wallet } from './models/index.js';

const createWalletData = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Create wallets for existing users
    const users = await User.findAll();
    
    for (const user of users) {
      const existingWallet = await Wallet.findOne({ where: { userId: user.id } });
      
      if (!existingWallet) {
        const loyaltyPoints = Math.floor(Math.random() * 1000) + 100; // 100-1100 points
        const balance = Math.floor(Math.random() * 500) + 50; // 50-550 AED
        
        await Wallet.create({
          userId: user.id,
          balance: balance,
          loyaltyPoints: loyaltyPoints,
          totalEarned: balance + (loyaltyPoints * 0.01),
          totalSpent: Math.floor(Math.random() * 200)
        });
        
        console.log(`✅ Created wallet for ${user.email}: ${loyaltyPoints} points, AED ${balance}`);
      }
    }

    // Create sample orders
    const sampleOrders = [
      { 
        userId: users[0]?.id, 
        orderNumber: 'ORD-001', 
        items: JSON.stringify([{name: 'Lipstick', price: 299.99, qty: 1}]), 
        subtotal: 299.99, 
        total: 299.99, 
        paymentMethod: 'card', 
        status: 'delivered' 
      },
      { 
        userId: users[1]?.id, 
        orderNumber: 'ORD-002', 
        items: JSON.stringify([{name: 'Foundation', price: 189.50, qty: 1}]), 
        subtotal: 189.50, 
        total: 189.50, 
        paymentMethod: 'card', 
        status: 'shipped' 
      },
      { 
        userId: users[2]?.id, 
        orderNumber: 'ORD-003', 
        items: JSON.stringify([{name: 'Serum', price: 459.00, qty: 1}]), 
        subtotal: 459.00, 
        total: 459.00, 
        paymentMethod: 'cod', 
        status: 'processing' 
      }
    ];

    for (const orderData of sampleOrders) {
      if (orderData.userId) {
        const existingOrder = await Order.findOne({ 
          where: { userId: orderData.userId, total: orderData.total } 
        });
        
        if (!existingOrder) {
          await Order.create(orderData);
          console.log(`✅ Created order: AED ${orderData.total} - ${orderData.status}`);
        }
      }
    }

    console.log('✅ Wallet and order data created successfully!');
    
  } catch (error) {
    console.error('❌ Error creating wallet data:', error);
  } finally {
    await sequelize.close();
  }
};

createWalletData();