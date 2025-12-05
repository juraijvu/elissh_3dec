// Simple test to check if backend is running
const testAPI = async () => {
  try {
    const response = await fetch('http://localhost:/api/health');
    const data = await response.json();
    console.log('✅ Backend is running:', data);
    
    // Test categories endpoint (public)
    const categoriesResponse = await fetch('http://localhost:/api/categories');
    const categoriesData = await categoriesResponse.json();
    console.log('✅ Categories endpoint:', categoriesData);
    
  } catch (error) {
    console.error('❌ Backend error:', error.message);
  }
};

testAPI();