import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const testEndpoints = async () => {
  try {
    console.log('🧪 Testing API endpoints...\n');

    // Test categories endpoint
    console.log('1. Testing categories endpoint...');
    try {
      const categoriesResponse = await axios.get(`${API_BASE}/categories`);
      console.log('✅ Categories endpoint working');
      console.log(`   Found ${categoriesResponse.data.categories?.length || 0} categories`);
      if (categoriesResponse.data.categories?.length > 0) {
        console.log('   Categories:', categoriesResponse.data.categories.map(c => c.name).join(', '));
      }
    } catch (error) {
      console.log('❌ Categories endpoint failed:', error.message);
      if (error.response) {
        console.log('   Status:', error.response.status);
        console.log('   Data:', error.response.data);
      }
    }

    // Test admin categories endpoint
    console.log('\n2. Testing admin categories endpoint...');
    try {
      const adminCategoriesResponse = await axios.get(`${API_BASE}/categories/admin/all`);
      console.log('✅ Admin categories endpoint working');
      console.log(`   Found ${adminCategoriesResponse.data.categories?.length || 0} categories`);
    } catch (error) {
      console.log('❌ Admin categories endpoint failed:', error.message);
      if (error.response) {
        console.log('   Status:', error.response.status);
        console.log('   Data:', error.response.data);
      }
    }

    // Test banners endpoint
    console.log('\n3. Testing banners endpoint...');
    const bannerAreas = ['hero-slider', 'hero-left', 'hero-right', 'category-page-banner'];
    
    for (const area of bannerAreas) {
      try {
        const bannersResponse = await axios.get(`${API_BASE}/banner/${area}`);
        console.log(`✅ Banner endpoint for ${area} working`);
        console.log(`   Found ${bannersResponse.data.banners?.length || 0} banners`);
      } catch (error) {
        console.log(`❌ Banner endpoint for ${area} failed:`, error.message);
        if (error.response) {
          console.log('   Status:', error.response.status);
          console.log('   Data:', error.response.data);
        }
      }
    }

    // Test server health
    console.log('\n4. Testing server health...');
    try {
      const healthResponse = await axios.get(`${API_BASE}/health`);
      console.log('✅ Server health check passed');
      console.log('   Response:', healthResponse.data.message);
    } catch (error) {
      console.log('❌ Server health check failed:', error.message);
    }

    console.log('\n🎉 API endpoint testing completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testEndpoints();