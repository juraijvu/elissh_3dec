// Simple banner API test
console.log('Testing banner API...');

fetch('http://localhost:5000/api/banner/admin/all')
  .then(res => res.json())
  .then(data => {
    console.log('✅ Admin banners response:', data);
    console.log('Banner count:', data.data?.length || 0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
  });

fetch('http://localhost:5000/api/banner/category-page-banner')
  .then(res => res.json())
  .then(data => {
    console.log('✅ Category banners response:', data);
    console.log('Category banner count:', data.data?.length || 0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
  });