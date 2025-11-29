import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const testCartIsolation = async () => {
  try {
    console.log('🧪 Testing cart and wishlist isolation between users...\n');

    // Create first user
    console.log('1. Creating first user...');
    const user1Data = {
      firstName: 'User',
      lastName: 'One',
      email: `user1_${Date.now()}@example.com`,
      password: 'password123'
    };

    const user1Response = await axios.post(`${API_BASE}/auth/register`, user1Data);
    const user1Token = user1Response.data.token;
    const user1Headers = { Authorization: `Bearer ${user1Token}` };
    console.log('✅ User 1 created:', user1Response.data.user.email);

    // Create second user
    console.log('\n2. Creating second user...');
    const user2Data = {
      firstName: 'User',
      lastName: 'Two',
      email: `user2_${Date.now()}@example.com`,
      password: 'password123'
    };

    const user2Response = await axios.post(`${API_BASE}/auth/register`, user2Data);
    const user2Token = user2Response.data.token;
    const user2Headers = { Authorization: `Bearer ${user2Token}` };
    console.log('✅ User 2 created:', user2Response.data.user.email);

    // Add items to User 1's cart
    console.log('\n3. Adding items to User 1 cart...');
    await axios.post(`${API_BASE}/cart/add`, {
      productId: 1,
      quantity: 2
    }, { headers: user1Headers });
    console.log('✅ Items added to User 1 cart');

    // Add items to User 1's wishlist
    console.log('\n4. Adding items to User 1 wishlist...');
    await axios.post(`${API_BASE}/wishlist/add/1`, {}, { headers: user1Headers });
    console.log('✅ Items added to User 1 wishlist');

    // Check User 1's cart and wishlist
    console.log('\n5. Checking User 1 cart and wishlist...');
    const user1Cart = await axios.get(`${API_BASE}/cart`, { headers: user1Headers });
    const user1Wishlist = await axios.get(`${API_BASE}/wishlist`, { headers: user1Headers });
    console.log('✅ User 1 cart items:', user1Cart.data.cart.totalItems);
    console.log('✅ User 1 wishlist items:', user1Wishlist.data.wishlist.items.length);

    // Check User 2's cart and wishlist (should be empty)
    console.log('\n6. Checking User 2 cart and wishlist (should be empty)...');
    const user2Cart = await axios.get(`${API_BASE}/cart`, { headers: user2Headers });
    const user2Wishlist = await axios.get(`${API_BASE}/wishlist`, { headers: user2Headers });
    console.log('✅ User 2 cart items:', user2Cart.data.cart.totalItems);
    console.log('✅ User 2 wishlist items:', user2Wishlist.data.wishlist.items.length);

    // Verify isolation
    if (user2Cart.data.cart.totalItems === 0 && user2Wishlist.data.wishlist.items.length === 0) {
      console.log('\n🎉 SUCCESS: Cart and wishlist are properly isolated between users!');
    } else {
      console.log('\n❌ FAILED: Cart/wishlist isolation is not working properly');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    if (error.response?.data) {
      console.error('Error details:', error.response.data);
    }
  }
};

testCartIsolation();