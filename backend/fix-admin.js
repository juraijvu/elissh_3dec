import sequelize from './config/database.js';
import { User } from './models/index.js';

const fixAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Delete existing admin
    await User.destroy({ where: { email: 'admin@elisshbeauty.ae' } });
    console.log('🗑️ Removed existing admin');

    // Create new admin (password will be hashed by the model hook)
    const admin = await User.create({
      name: 'Admin User',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@elisshbeauty.ae',
      password: 'admin123',
      role: 'admin',
      isVerified: true
    });

    console.log('✅ New admin created');
    
    // Test login
    const testPassword = await admin.comparePassword('admin123');
    console.log('Password test:', testPassword ? '✅ Valid' : '❌ Invalid');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
  }
};

fixAdmin();