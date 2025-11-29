import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const testAddToCart = async () => {
  try {
    console.log('🧪 Testing add to cart functionality...\n');

    // Register a test user
    console.log('1. Creating test user...');
    const userData = {
      firstName: 'Cart',
      lastName: 'Test',
      email: `carttest_${Date.now()}@example.com`,
      password: 'password123'
    };

    const userResponse = await axios.post(`${API_BASE}/auth/register`, userData);
    const token = userResponse.data.token;
    const headers = { Authorization: `Bearer ${token}` };
    console.log('✅ User created:', userResponse.data.user.email);

    // Check initial cart (should be empty)
    console.log('\n2. Checking initial cart...');
    const initialCart = await axios.get(`${API_BASE}/cart`, { headers });
    console.log('✅ Initial cart items:', initialCart.data.cart.totalItems);

    // Add item to cart
    console.log('\n3. Adding item to cart...');
    const addResponse = await axios.post(`${API_BASE}/cart/add`, {
      productId: 1,
      quantity: 2
    }, { headers });
    console.log('✅ Add to cart response:', addResponse.data.message);

    // Check cart after adding
    console.log('\n4. Checking cart after adding...');
    const updatedCart = await axios.get(`${API_BASE}/cart`, { headers });
    console.log('✅ Updated cart items:', updatedCart.data.cart.totalItems);
    console.log('✅ Cart total price:', updatedCart.data.cart.totalPrice);

    // Add another item
    console.log('\n5. Adding another item...');
    await axios.post(`${API_BASE}/cart/add`, {
      productId: 2,
      quantity: 1
    }, { headers });

    // Final cart check
    console.log('\n6. Final cart check...');
    const finalCart = await axios.get(`${API_BASE}/cart`, { headers });
    console.log('✅ Final cart items:', finalCart.data.cart.totalItems);
    console.log('✅ Final cart products:', finalCart.data.cart.items.length);

    if (finalCart.data.cart.totalItems > 0) {
      console.log('\n🎉 Add to cart is working correctly!');
    } else {
      console.log('\n❌ Add to cart is not working properly');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    if (error.response?.data) {
      console.error('Error details:', error.response.data);
    }
  }
};

testAddToCart();