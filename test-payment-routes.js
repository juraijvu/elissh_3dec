import axios from 'axios';

const API_BASE = 'http://localhost:/api';

const testPaymentRoutes = async () => {
  try {
    console.log('🧪 Testing Payment Routes...\n');

    // Test health endpoint first
    console.log('1. Testing server health...');
    try {
      const healthResponse = await axios.get(`${API_BASE}/health`);
      console.log('✅ Server is running:', healthResponse.data.message);
    } catch (error) {
      console.log('❌ Server not running:', error.message);
      return;
    }

    // Test webhook endpoint (should work without auth)
    console.log('\n2. Testing webhook endpoint...');
    try {
      const webhookResponse = await axios.post(`${API_BASE}/payments/vault/webhook`, {
        type: 'test',
        data: { test: true }
      });
      console.log('✅ Webhook endpoint exists:', webhookResponse.data);
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('❌ Webhook route not found - server needs restart');
      } else {
        console.log('✅ Webhook endpoint exists (got error but not 404):', error.response?.status);
      }
    }

    // Test payment settings endpoint (needs auth)
    console.log('\n3. Testing payment settings endpoint...');
    try {
      const settingsResponse = await axios.get(`${API_BASE}/payments/settings`);
      console.log('✅ Settings endpoint exists');
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('❌ Settings route not found - server needs restart');
      } else if (error.response?.status === 401) {
        console.log('✅ Settings endpoint exists (needs auth)');
      } else {
        console.log('⚠️ Settings endpoint response:', error.response?.status);
      }
    }

    console.log('\n📋 If routes are not found, restart the backend server:');
    console.log('1. Stop the current server (Ctrl+C)');
    console.log('2. cd backend');
    console.log('3. npm run dev');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testPaymentRoutes();