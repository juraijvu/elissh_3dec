// Test dashboard API
const testDashboard = async () => {
  try {
    // Login first
    const loginResponse = await fetch('http://localhost:/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@elisshbeauty.ae',
        password: 'admin123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Login:', loginData.success ? '✅ Success' : '❌ Failed');
    
    if (!loginData.success) return;
    
    // Test dashboard endpoint
    const dashResponse = await fetch('http://localhost:/api/admin/dashboard', {
      headers: { 'Authorization': `Bearer ${loginData.token}` }
    });
    
    const dashData = await dashResponse.json();
    console.log('Dashboard API:', dashData.success ? '✅ Success' : '❌ Failed');
    
    if (dashData.success) {
      console.log('Stats:', {
        products: dashData.stats.totalProducts,
        users: dashData.stats.totalUsers,
        categories: dashData.stats.totalCategories
      });
    } else {
      console.log('Error:', dashData.message);
    }
    
  } catch (error) {
    console.error('❌ Test Error:', error.message);
  }
};

testDashboard();