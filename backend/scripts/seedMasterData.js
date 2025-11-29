import sequelize from '../config/database.js';
import seedCosmeticProducts from './seedCosmeticProducts.js';
import seedComprehensiveBanners from './seedComprehensiveBanners.js';

const seedMasterData = async () => {
  try {
    console.log('🚀 Starting master data seeding process...\n');
    
    // Ensure database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established\n');
    
    // Sync database (create tables if they don't exist)
    await sequelize.sync();
    console.log('✅ Database synchronized\n');
    
    // Seed products first
    console.log('📦 STEP 1: Seeding cosmetic products...');
    await seedCosmeticProducts();
    console.log('✅ Products seeding completed!\n');
    
    // Seed banners
    console.log('🎨 STEP 2: Seeding comprehensive banners...');
    await seedComprehensiveBanners();
    console.log('✅ Banners seeding completed!\n');
    
    console.log('🎉 MASTER DATA SEEDING COMPLETED SUCCESSFULLY!');
    console.log('\n📊 SUMMARY:');
    console.log('  ✅ 100 cosmetic products created');
    console.log('  ✅ 25+ banners created for all website areas');
    console.log('  ✅ All data is ready for use');
    
    console.log('\n🌐 WHAT\'S BEEN CREATED:');
    console.log('📦 PRODUCTS:');
    console.log('  • Skincare products (cleansers, serums, moisturizers, etc.)');
    console.log('  • Makeup products (foundation, lipstick, eyeshadow, etc.)');
    console.log('  • Haircare products (shampoo, treatments, styling, etc.)');
    console.log('  • Fragrance products (perfumes, body sprays, etc.)');
    console.log('  • All products have realistic pricing, stock, and certifications');
    
    console.log('\n🎨 BANNERS:');
    console.log('  🏠 Homepage Banners:');
    console.log('    • Hero slider (5 rotating banners)');
    console.log('    • Hero side banners (left/right vertical)');
    console.log('    • Hero bottom banners (left/right horizontal)');
    console.log('    • After special offers (3 promotional banners)');
    console.log('    • New arrivals grid (8 product highlight banners)');
    console.log('    • Wide promotional banners (top/bottom)');
    console.log('  📂 Category Page Banners:');
    console.log('    • Makeup category banner');
    console.log('    • Skincare category banner');
    console.log('    • Haircare category banner');
    console.log('    • Fragrance category banner');
    
    console.log('\n🎯 NEXT STEPS:');
    console.log('  1. Start your development server: npm run dev');
    console.log('  2. Visit admin panel: http://localhost:5173/admin/banners');
    console.log('  3. Upload banner images to see them in action');
    console.log('  4. Visit homepage to see banner placements');
    console.log('  5. Browse categories to see category banners');
    
  } catch (error) {
    console.error('❌ Error in master data seeding:', error);
    throw error;
  }
};

export default seedMasterData;

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedMasterData()
    .then(() => {
      console.log('\n✨ All done! Your Elissh Cosmetics store is ready with demo data.');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 Seeding failed:', error);
      process.exit(1);
    });
}