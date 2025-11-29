import sequelize from './config/database.js';
import { Product, Category, Banner, User, Order, Wallet } from './models/index.js';

const syncDatabase = async () => {
  try {
    console.log('🔄 Syncing database...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');
    
    // Sync all models (create tables)
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Database tables synchronized');
    
    console.log('🎉 Database sync completed successfully!');
    
  } catch (error) {
    console.error('❌ Error syncing database:', error);
    throw error;
  }
};

syncDatabase()
  .then(() => {
    console.log('✨ Database is ready!');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Database sync failed:', error);
    process.exit(1);
  });