import sequelize from './config/database.js';
import './models/index.js';
import Banner from './models/Banner.js';

const testBanners = async () => {
  try {
    console.log('🔗 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected');

    console.log('📊 Checking existing banners...');
    const existingBanners = await Banner.findAll();
    console.log(`Found ${existingBanners.length} existing banners`);
    
    if (existingBanners.length > 0) {
      console.log('Banners by area:');
      const bannersByArea = {};
      existingBanners.forEach(banner => {
        if (!bannersByArea[banner.area]) {
          bannersByArea[banner.area] = [];
        }
        bannersByArea[banner.area].push(banner);
      });
      
      Object.keys(bannersByArea).forEach(area => {
        console.log(`- ${area}: ${bannersByArea[area].length} banners`);
        bannersByArea[area].forEach(banner => {
          console.log(`  • ${banner.name} (Active: ${banner.isActive})`);
        });
      });
    } else {
      console.log('🌱 Creating test banner...');
      
      const testBanner = await Banner.create({
        name: 'Test Hero Banner',
        area: 'hero-slider',
        position: 'main',
        heading: 'Welcome to Elissh Beauty',
        subHeading: 'Discover Premium Cosmetics',
        description: 'Shop the latest in beauty and skincare',
        image: '/placeholder.svg',
        link: '/products',
        buttonText: 'Shop Now',
        textColor: '#ffffff',
        backgroundColor: '#000000',
        overlayColor: '#000000',
        overlayOpacity: 0.3,
        textAlignment: 'center',
        isActive: true,
        sortOrder: 0
      });
      
      console.log(`✅ Created test banner: ${testBanner.name}`);
    }

    console.log('🎉 Banners test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

testBanners();