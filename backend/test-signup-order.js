import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const testSignupAndOrder = async () => {
  try {
    console.log('🧪 Testing user signup and order functionality...\n');

    // Test user registration
    console.log('1. Testing user registration...');
    const registerData = {
      firstName: 'Test',
      lastName: 'User',
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    };

    const registerResponse = await axios.post(`${API_BASE}/auth/register`, registerData);
    console.log('✅ Registration successful');
    console.log('User:', registerResponse.data.user);
    
    const token = registerResponse.data.token;
    const headers = { Authorization: `Bearer ${token}` };

    // Test adding items to cart
    console.log('\n2. Testing add to cart...');
    const cartResponse = await axios.post(`${API_BASE}/cart/add`, {
      productId: 1, // Assuming product with ID 1 exists
      quantity: 2
    }, { headers });
    console.log('✅ Item added to cart');

    // Test getting cart
    console.log('\n3. Testing get cart...');
    const getCartResponse = await axios.get(`${API_BASE}/cart`, { headers });
    console.log('✅ Cart retrieved');
    console.log('Cart items:', getCartResponse.data.cart.totalItems);

    // Test creating order
    console.log('\n4. Testing order creation...');
    const orderData = {
      shippingAddress: {
        street: '123 Test Street',
        city: 'Dubai',
        state: 'Dubai',
        zipCode: '12345',
        country: 'UAE'
      },
      billingAddress: {
        street: '123 Test Street',
        city: 'Dubai',
        state: 'Dubai',
        zipCode: '12345',
        country: 'UAE'
      },
      paymentMethod: 'cod'
    };

    const orderResponse = await axios.post(`${API_BASE}/orders`, orderData, { headers });
    console.log('✅ Order created successfully');
    console.log('Order ID:', orderResponse.data.order.id);
    console.log('Order Number:', orderResponse.data.order.orderNumber);

    // Test getting user orders
    console.log('\n5. Testing get user orders...');
    const ordersResponse = await axios.get(`${API_BASE}/orders/my-orders`, { headers });
    console.log('✅ Orders retrieved');
    console.log('Total orders:', ordersResponse.data.orders.length);

    console.log('\n🎉 All tests passed! Normal users can signup and place orders successfully.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    if (error.response?.data) {
      console.error('Error details:', error.response.data);
    }
  }
};

testSignupAndOrder();