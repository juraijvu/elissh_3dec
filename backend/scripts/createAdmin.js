import sequelize from '../config/database.js';
import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';

const createAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@elisshbeauty.ae' } });
    if (existingAdmin) {
      await existingAdmin.destroy();
      console.log('Removed existing admin user');
    }

    // Create new admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = await User.create({
      name: 'Admin User',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@elisshbeauty.ae',
      password: hashedPassword,
      role: 'admin',
      isVerified: true
    });

    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@elisshbeauty.ae');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await sequelize.close();
  }
};

createAdmin();