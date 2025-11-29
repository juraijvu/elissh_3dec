import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const testOrderCreation = async () => {
  try {
    console.log('🧪 Testing order creation...\n');

    // Register a test user
    console.log('1. Creating test user...');
    const userData = {
      firstName: 'Test',
      lastName: 'Order',
      email: `testorder_${Date.now()}@example.com`,
      password: 'password123'
    };

    const userResponse = await axios.post(`${API_BASE}/auth/register`, userData);
    const token = userResponse.data.token;
    const headers = { Authorization: `Bearer ${token}` };
    console.log('✅ User created:', userResponse.data.user.email);

    // Test direct order creation (without cart)
    console.log('\n2. Testing direct order creation...');
    const orderData = {
      shippingAddress: {
        firstName: 'Test',
        lastName: 'Order',
        street: '123 Test Street',
        city: 'Dubai',
        state: 'Dubai',
        zipCode: '12345',
        phone: '+971501234567'
      },
      paymentMethod: 'cod',
      items: [
        {
          productId: 1,
          quantity: 1
        }
      ]
    };

    const orderResponse = await axios.post(`${API_BASE}/orders`, orderData, { headers });
    console.log('✅ Order created successfully!');
    console.log('Order Number:', orderResponse.data.order.orderNumber);
    console.log('Order Total:', orderResponse.data.order.total);

    // Test cart-based order
    console.log('\n3. Testing cart-based order...');
    
    // Add item to cart first
    await axios.post(`${API_BASE}/cart/add`, {
      productId: 1,
      quantity: 2
    }, { headers });
    console.log('✅ Item added to cart');

    // Create order from cart
    const cartOrderData = {
      shippingAddress: {
        firstName: 'Test',
        lastName: 'Order',
        street: '456 Cart Street',
        city: 'Abu Dhabi',
        state: 'Abu Dhabi',
        zipCode: '54321',
        phone: '+971507654321'
      },
      paymentMethod: 'card'
    };

    const cartOrderResponse = await axios.post(`${API_BASE}/orders`, cartOrderData, { headers });
    console.log('✅ Cart-based order created successfully!');
    console.log('Order Number:', cartOrderResponse.data.order.orderNumber);
    console.log('Order Total:', cartOrderResponse.data.order.total);

    console.log('\n🎉 All order creation tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    if (error.response?.data) {
      console.error('Error details:', error.response.data);
    }
    if (error.response?.status) {
      console.error('Status code:', error.response.status);
    }
  }
};

testOrderCreation();