import sequelize from './config/database.js';
import { User } from './models/index.js';
import bcrypt from 'bcryptjs';

const testAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    const admin = await User.findOne({ where: { email: 'admin@elisshbeauty.ae' } });
    
    if (!admin) {
      console.log('❌ Admin user not found');
      return;
    }

    console.log('✅ Admin user found:');
    console.log('Email:', admin.email);
    console.log('Role:', admin.role);
    console.log('Verified:', admin.isVerified);

    // Test password
    const isPasswordValid = await admin.comparePassword('admin123');
    console.log('Password test:', isPasswordValid ? '✅ Valid' : '❌ Invalid');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
  }
};

testAdmin();