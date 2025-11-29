import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const createDatabase = async () => {
  // Connect to PostgreSQL without specifying a database
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    logging: false
  });

  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL server');
    
    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'elissh_cosmetics';
    await sequelize.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Database "${dbName}" created successfully`);
    
  } catch (error) {
    if (error.original && error.original.code === '42P04') {
      console.log('Database already exists');
    } else {
      console.error('Error creating database:', error.message);
    }
  } finally {
    await sequelize.close();
  }
};

createDatabase();