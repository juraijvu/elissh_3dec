import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Content = sequelize.define('Content', {
  type: {
    type: DataTypes.ENUM('banner', 'page', 'promotion', 'announcement'),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    unique: true
  },
  subtitle: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING
  },
  link: {
    type: DataTypes.STRING
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  metadata: {
    type: DataTypes.JSON,
    defaultValue: {}
  }
}, {
  timestamps: true
});

export default Content;