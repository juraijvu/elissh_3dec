import axios from 'axios';

const API_BASE = 'http://localhost:/api';

const testServerRoutes = async () => {
  try {
    console.log('🧪 Testing Server Routes...\n');

    // Test health endpoint
    console.log('1. Testing health endpoint...');
    try {
      const healthResponse = await axios.get(`${API_BASE}/health`);
      console.log('✅ Server is running');
      console.log('   Response:', healthResponse.data.message);
    } catch (error) {
      console.log('❌ Server is not running or health endpoint failed');
      console.log('   Error:', error.message);
      return;
    }

    // Test login to get token
    console.log('\n2. Testing admin login...');
    let token;
    try {
      const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
        email: 'admin@elisshbeauty.ae',
        password: 'admin123'
      });
      
      if (loginResponse.data.success && loginResponse.data.token) {
        token = loginResponse.data.token;
        console.log('✅ Admin login successful');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.log('❌ Admin login failed:', error.response?.data?.message || error.message);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    // Test banner routes
    console.log('\n3. Testing banner routes...');
    
    // Test GET /api/banner/hero-slider
    try {
      const getResponse = await axios.get(`${API_BASE}/banner/hero-slider`);
      console.log('✅ GET /api/banner/hero-slider works');
    } catch (error) {
      console.log('❌ GET /api/banner/hero-slider failed:', error.response?.status, error.response?.data?.message);
    }

    // Test POST /api/banner/json
    try {
      const testData = {
        name: 'Route Test Banner',
        area: 'hero-slider',
        heading: 'Test',
        image: '/placeholder.svg'
      };
      
      const postResponse = await axios.post(`${API_BASE}/banner/json`, testData, { headers });
      console.log('✅ POST /api/banner/json works');
      console.log('   Created banner ID:', postResponse.data.banner?.id);
      
      // Clean up - delete the test banner
      if (postResponse.data.banner?.id) {
        try {
          await axios.delete(`${API_BASE}/banner/${postResponse.data.banner.id}`, { headers });
          console.log('✅ Test banner cleaned up');
        } catch (deleteError) {
          console.log('⚠️  Failed to clean up test banner');
        }
      }
    } catch (error) {
      console.log('❌ POST /api/banner/json failed:', error.response?.status, error.response?.data?.message);
      if (error.response?.data) {
        console.log('   Full error:', error.response.data);
      }
    }

    console.log('\n🎉 Server route testing completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testServerRoutes();