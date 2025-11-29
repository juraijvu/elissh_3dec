// Test script to verify banner API endpoints
const testBannerAPI = async () => {
  const baseURL = 'http://localhost:5000/api';
  
  try {
    console.log('🧪 Testing Banner API Endpoints...\n');
    
    // Test 1: Get category banners for makeup
    console.log('1. Testing category banners for makeup:');
    const makeupResponse = await fetch(`${baseURL}/banner/category-page-banner?position=makeup`);
    const makeupData = await makeupResponse.json();
    console.log(`   Found ${makeupData.data?.length || 0} makeup category banners`);
    
    // Test 2: Get category banners for skincare
    console.log('2. Testing category banners for skincare:');
    const skincareResponse = await fetch(`${baseURL}/banner/category-page-banner?position=skincare`);
    const skincareData = await skincareResponse.json();
    console.log(`   Found ${skincareData.data?.length || 0} skincare category banners`);
    
    // Test 3: Get all category banners
    console.log('3. Testing all category banners:');
    const allResponse = await fetch(`${baseURL}/banner/category-page-banner`);
    const allData = await allResponse.json();
    console.log(`   Found ${allData.data?.length || 0} total category banners`);
    
    // Test 4: Get hero slider banners
    console.log('4. Testing hero slider banners:');
    const heroResponse = await fetch(`${baseURL}/banner/hero-slider`);
    const heroData = await heroResponse.json();
    console.log(`   Found ${heroData.data?.length || 0} hero slider banners`);
    
    console.log('\n✅ All API tests completed!');
    
  } catch (error) {
    console.error('❌ API Test Error:', error.message);
  }
};

// Run the test
testBannerAPI();