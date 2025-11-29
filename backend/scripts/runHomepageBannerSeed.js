import dotenv from 'dotenv';
import sequelize from '../config/database.js';
import seedHomepageBanners from './seedHomepageBanners.js';

dotenv.config();

const runSeed = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Sync database (create tables if they don't exist)
    await sequelize.sync();
    console.log('✅ Database synchronized.');

    // Run the banner seeding
    await seedHomepageBanners();

    console.log('🎉 Homepage banner seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

runSeed();