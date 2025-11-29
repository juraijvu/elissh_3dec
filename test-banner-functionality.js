import axios from 'axios';

const API_BASE = 'http://localhost:5001/api';

const testBannerFunctionality = async () => {
  try {
    console.log('🧪 Testing Banner Functionality...\n');

    // Step 1: Login as admin
    console.log('1. Logging in as admin...');
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
        throw new Error('Login failed: ' + (loginResponse.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.log('❌ Admin login failed:', error.response?.data?.message || error.message);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    // Step 2: Test fetching existing banners
    console.log('\n2. Testing banner fetching...');
    try {
      const bannersResponse = await axios.get(`${API_BASE}/banner/hero-slider`, { headers });
      console.log('✅ Banner fetching works');
      console.log(`   Found ${bannersResponse.data.banners?.length || 0} hero-slider banners`);
    } catch (error) {
      console.log('❌ Banner fetching failed:', error.response?.data?.message || error.message);
    }

    // Step 3: Test creating a new banner
    console.log('\n3. Testing banner creation...');
    const testBannerData = {
      name: 'Test Banner ' + Date.now(),
      area: 'hero-slider',
      position: 'main',
      heading: 'Test Heading',
      subHeading: 'Test Sub Heading',
      description: 'Test description for banner',
      image: '/placeholder.svg',
      link: '/test-link',
      buttonText: 'Test Button',
      textColor: '#ffffff',
      backgroundColor: '#000000',
      overlayColor: '#000000',
      overlayOpacity: 0.3,
      textAlignment: 'center',
      isActive: true,
      sortOrder: 0
    };

    try {
      const createResponse = await axios.post(`${API_BASE}/banner/json`, testBannerData, { headers });
      
      if (createResponse.data.success) {
        console.log('✅ Banner creation successful');
        console.log(`   Created banner ID: ${createResponse.data.banner.id}`);
        
        // Step 4: Test updating the banner
        console.log('\n4. Testing banner update...');
        const updateData = {
          ...testBannerData,
          heading: 'Updated Test Heading',
          subHeading: 'Updated Sub Heading'
        };
        
        try {
          const updateResponse = await axios.put(`${API_BASE}/banner/${createResponse.data.banner.id}/json`, updateData, { headers });
          
          if (updateResponse.data.success) {
            console.log('✅ Banner update successful');
            console.log(`   Updated heading: ${updateResponse.data.banner.heading}`);
          } else {
            console.log('❌ Banner update failed:', updateResponse.data.message);
          }
        } catch (updateError) {
          console.log('❌ Banner update failed:', updateError.response?.data?.message || updateError.message);
        }
        
        // Step 5: Test deleting the banner
        console.log('\n5. Testing banner deletion...');
        try {
          const deleteResponse = await axios.delete(`${API_BASE}/banner/${createResponse.data.banner.id}`, { headers });
          
          if (deleteResponse.data.success) {
            console.log('✅ Banner deletion successful');
          } else {
            console.log('❌ Banner deletion failed:', deleteResponse.data.message);
          }
        } catch (deleteError) {
          console.log('❌ Banner deletion failed:', deleteError.response?.data?.message || deleteError.message);
        }
        
      } else {
        console.log('❌ Banner creation failed:', createResponse.data.message);
      }
    } catch (createError) {
      console.log('❌ Banner creation failed:', createError.response?.data?.message || createError.message);
      if (createError.response?.data) {
        console.log('   Error details:', createError.response.data);
      }
    }

    // Step 6: Test banner areas
    console.log('\n6. Testing different banner areas...');
    const areas = ['hero-slider', 'hero-left', 'hero-right', 'category-page-banner'];
    
    for (const area of areas) {
      try {
        const areaResponse = await axios.get(`${API_BASE}/banner/${area}`);
        console.log(`✅ ${area}: ${areaResponse.data.banners?.length || 0} banners`);
      } catch (areaError) {
        console.log(`❌ ${area}: Failed to fetch`);
      }
    }

    console.log('\n🎉 Banner functionality testing completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testBannerFunctionality();