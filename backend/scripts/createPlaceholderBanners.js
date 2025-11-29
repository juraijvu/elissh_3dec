import fs from 'fs';
import path from 'path';

// Create placeholder banner files (empty files that can be replaced with actual images)
const bannerFiles = [
  'hero-eid.jpg',
  'hero-eid-mobile.jpg',
  'hero-summer.jpg',
  'hero-summer-mobile.jpg',
  'hero-halal.jpg',
  'hero-halal-mobile.jpg',
  'wide-mega-sale.jpg',
  'wide-mega-sale-mobile.jpg',
  'prime-summer.jpg',
  'prime-summer-mobile.jpg',
  'prime-halal.jpg',
  'prime-halal-mobile.jpg',
  'new-lipstick.jpg',
  'new-lipstick-mobile.jpg',
  'new-skincare.jpg',
  'new-skincare-mobile.jpg',
  'new-fragrance.jpg',
  'new-fragrance-mobile.jpg',
  'new-haircare.jpg',
  'new-haircare-mobile.jpg',
  'wide-brands.jpg',
  'wide-brands-mobile.jpg',
  'wide-seasonal.jpg',
  'wide-seasonal-mobile.jpg',
  'category-makeup.jpg',
  'category-makeup-mobile.jpg',
  'promo-flash.jpg',
  'promo-flash-mobile.jpg',
  'sidebar-newsletter.jpg',
  'sidebar-newsletter-mobile.jpg'
];

const bannersDir = 'uploads/banners';

// Ensure directory exists
if (!fs.existsSync(bannersDir)) {
  fs.mkdirSync(bannersDir, { recursive: true });
}

// Create placeholder files
bannerFiles.forEach(filename => {
  const filePath = path.join(bannersDir, filename);
  if (!fs.existsSync(filePath)) {
    // Create a simple text file as placeholder
    fs.writeFileSync(filePath, `Placeholder for ${filename}`);
    console.log(`Created placeholder: ${filename}`);
  } else {
    console.log(`File already exists: ${filename}`);
  }
});

console.log(`\nCreated ${bannerFiles.length} placeholder banner files.`);
console.log('Replace these files with actual banner images for your website.');
console.log('Recommended image sizes:');
console.log('- Hero banners: 1920x600px (desktop), 768x400px (mobile)');
console.log('- Wide banners: 1920x400px (desktop), 768x300px (mobile)');
console.log('- Prime banners: 800x500px (desktop), 400x250px (mobile)');
console.log('- New arrival banners: 400x533px (desktop), 300x400px (mobile)');
console.log('- Category banners: 1200x400px (desktop), 600x200px (mobile)');
console.log('- Promotional banners: 1000x300px (desktop), 500x150px (mobile)');
console.log('- Sidebar banners: 300x400px (desktop), 250x300px (mobile)');