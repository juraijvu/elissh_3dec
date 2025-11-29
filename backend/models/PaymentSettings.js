import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PaymentSettings = sequelize.define('PaymentSettings', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  isEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  apiKey: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  secretKey: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  webhookUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  testMode: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  settings: {
    type: DataTypes.JSON,
    defaultValue: {}
  }
}, {
  timestamps: true,
  tableName: 'PaymentSettings'
});

export default PaymentSettings;