import sequelize from './config/database.js';
import { User, Order } from './models/index.js';

const createTestOrder = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    const admin = await User.findOne({ where: { email: 'admin@elisshbeauty.ae' } });
    const manager = await User.findOne({ where: { email: 'manager@elisshbeauty.ae' } });

    if (!admin || !manager) {
      console.log('❌ Users not found');
      return;
    }

    // Create test orders
    const testOrders = [
      {
        orderNumber: 'ORD-2024-001',
        userId: admin.id,
        items: JSON.stringify([
          { name: 'Vitamin C Serum', price: 29.99, qty: 2 },
          { name: 'Moisturizer', price: 39.99, qty: 1 }
        ]),
        subtotal: 99.97,
        total: 99.97,
        paymentMethod: 'card',
        status: 'delivered'
      },
      {
        orderNumber: 'ORD-2024-002',
        userId: manager.id,
        items: JSON.stringify([
          { name: 'Red Lipstick', price: 19.99, qty: 1 },
          { name: 'Foundation', price: 34.99, qty: 1 }
        ]),
        subtotal: 54.98,
        total: 54.98,
        paymentMethod: 'cod',
        status: 'shipped'
      },
      {
        orderNumber: 'ORD-2024-003',
        userId: admin.id,
        items: JSON.stringify([
          { name: 'Hyaluronic Acid', price: 24.99, qty: 3 }
        ]),
        subtotal: 74.97,
        total: 74.97,
        paymentMethod: 'card',
        status: 'processing'
      }
    ];

    for (const orderData of testOrders) {
      await Order.create(orderData);
      console.log(`✅ Created order ${orderData.orderNumber}: AED ${orderData.total} - ${orderData.status}`);
    }

    console.log('✅ Test orders created successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sequelize.close();
  }
};

createTestOrder();