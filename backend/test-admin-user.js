import sequelize from './config/database.js';
import './models/index.js';
import { User } from './models/index.js';
import bcrypt from 'bcryptjs';

const testAdminUser = async () => {
  try {
    console.log('🔗 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected');

    console.log('👤 Checking for admin user...');
    let adminUser = await User.findOne({ where: { email: 'admin@elisshbeauty.ae' } });
    
    if (!adminUser) {
      console.log('🌱 Creating admin user...');
      
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      adminUser = await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@elisshbeauty.ae',
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        emailVerified: true
      });
      
      console.log('✅ Admin user created successfully');
    } else {
      console.log('✅ Admin user already exists');
      console.log(`   Name: ${adminUser.firstName} ${adminUser.lastName}`);
      console.log(`   Email: ${adminUser.email}`);
      console.log(`   Role: ${adminUser.role}`);
      console.log(`   Active: ${adminUser.isActive}`);
    }

    console.log('🎉 Admin user check completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

testAdminUser();