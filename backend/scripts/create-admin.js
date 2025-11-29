import bcrypt from 'bcryptjs';
import sequelize from '../config/database.js';
import User from '../models/User.js';

const createAdmin = async () => {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('Connected to database');

    // Sync models
    await sequelize.sync();
    console.log('Database synced');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@elisshbeauty.ae' } });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@elisshbeauty.ae',
      password: hashedPassword,
      role: 'admin',
      isVerified: true
    });

    console.log('Admin user created successfully!');
    console.log('Email:', admin.email);
    console.log('Password: admin123');
    console.log('Role:', admin.role);

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await sequelize.close();
  }
};

createAdmin();