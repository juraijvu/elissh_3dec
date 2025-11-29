import fs from 'fs';
import path from 'path';

const bannerFiles = [
  // Hero Slider (5 banners)
  'hero-1.jpg', 'hero-1-mobile.jpg',
  'hero-2.jpg', 'hero-2-mobile.jpg', 
  'hero-3.jpg', 'hero-3-mobile.jpg',
  'hero-4.jpg', 'hero-4-mobile.jpg',
  'hero-5.jpg', 'hero-5-mobile.jpg',
  
  // Hero Side Banners
  'hero-left.jpg', 'hero-left-mobile.jpg',
  'hero-right.jpg', 'hero-right-mobile.jpg',
  
  // Hero Bottom Banners
  'hero-bottom-left.jpg', 'hero-bottom-left-mobile.jpg',
  'hero-bottom-right.jpg', 'hero-bottom-right-mobile.jpg',
  
  // After Special Offers (3 banners)
  'after-special-1.jpg', 'after-special-1-mobile.jpg',
  'after-special-2.jpg', 'after-special-2-mobile.jpg',
  'after-special-3.jpg', 'after-special-3-mobile.jpg',
  
  // New Arrivals (8 banners)
  'new-arrival-1.jpg', 'new-arrival-1-mobile.jpg',
  'new-arrival-2.jpg', 'new-arrival-2-mobile.jpg',
  'new-arrival-3.jpg', 'new-arrival-3-mobile.jpg',
  'new-arrival-4.jpg', 'new-arrival-4-mobile.jpg',
  'new-arrival-5.jpg', 'new-arrival-5-mobile.jpg',
  'new-arrival-6.jpg', 'new-arrival-6-mobile.jpg',
  'new-arrival-7.jpg', 'new-arrival-7-mobile.jpg',
  'new-arrival-8.jpg', 'new-arrival-8-mobile.jpg',
  
  // Wide Banners
  'wide-top.jpg', 'wide-top-mobile.jpg',
  'wide-bottom.jpg', 'wide-bottom-mobile.jpg',
  
  // Category Page Banners
  'category-makeup.jpg', 'category-makeup-mobile.jpg',
  'category-skincare.jpg', 'category-skincare-mobile.jpg'
];

const bannersDir = 'uploads/banners';

if (!fs.existsSync(bannersDir)) {
  fs.mkdirSync(bannersDir, { recursive: true });
}

bannerFiles.forEach(filename => {
  const filePath = path.join(bannersDir, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `Placeholder for ${filename}`);
    console.log(`Created: ${filename}`);
  }
});

console.log(`\n✅ Created ${bannerFiles.length} placeholder banner files`);
console.log('📁 Location: backend/uploads/banners/');
console.log('🔄 Replace these with actual banner images');
console.log('\n📋 Banner Areas:');
console.log('• Hero Slider: 5 banners (main carousel)');
console.log('• Hero Sides: 2 banners (left/right vertical)');
console.log('• Hero Bottom: 2 banners (bottom horizontal)');
console.log('• After Special Offers: 3 banners');
console.log('• New Arrivals: 8 banners (grid layout)');
console.log('• Wide Banners: 2 banners (full width)');
console.log('• Category Pages: 2 banners (after 3 rows)');