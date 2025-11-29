// Test admin API endpoints
const testAPI = async () => {
  try {
    // Test login first
    const loginResponse = await fetch('http://localhost:5001/api/auth/login', {
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
    
    // Test admin users endpoint
    const usersResponse = await fetch('http://localhost:5001/api/admin/users', {
      headers: { 'Authorization': `Bearer ${loginData.token}` }
    });
    
    const usersData = await usersResponse.json();
    console.log('Users API:', usersData.success ? '✅ Success' : '❌ Failed');
    console.log('Users count:', usersData.users?.length || 0);
    
  } catch (error) {
    console.error('❌ API Test Error:', error.message);
  }
};

testAPI();