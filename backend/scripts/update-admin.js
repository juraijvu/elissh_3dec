import bcrypt from 'bcryptjs';
import sequelize from '../config/database.js';
import User from '../models/User.js';

const updateAdmin = async () => {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('Connected to database');

    // Find admin user
    const admin = await User.findOne({ where: { email: 'admin@elisshbeauty.ae' } });
    
    if (!admin) {
      console.log('Admin user not found, creating new one...');
      
      // Hash password
      const hashedPassword = await bcrypt.hash('admin123', 12);

      // Create admin user
      const newAdmin = await User.create({
        name: 'Admin User',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@elisshbeauty.ae',
        password: hashedPassword,
        role: 'admin',
        isVerified: true
      });

      console.log('Admin user created successfully!');
      console.log('Email:', newAdmin.email);
      console.log('Password: admin123');
      console.log('Role:', newAdmin.role);
    } else {
      console.log('Admin user found, updating password...');
      
      // Hash new password
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      // Update admin user - set password directly to trigger hook
      admin.password = 'admin123';
      admin.role = 'admin';
      admin.isVerified = true;
      admin.name = 'Admin User';
      admin.firstName = 'Admin';
      admin.lastName = 'User';
      await admin.save();

      console.log('Admin user updated successfully!');
      console.log('Email:', admin.email);
      console.log('Password: admin123');
      console.log('Role:', admin.role);
    }

    // Test password verification
    const updatedAdmin = await User.findOne({ where: { email: 'admin@elisshbeauty.ae' } });
    const isPasswordValid = await bcrypt.compare('admin123', updatedAdmin.password);
    console.log('Password verification test:', isPasswordValid ? 'PASSED' : 'FAILED');

  } catch (error) {
    console.error('Error updating admin user:', error);
  } finally {
    await sequelize.close();
  }
};

updateAdmin();