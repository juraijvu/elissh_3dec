import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Banner = sequelize.define('Banner', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  area: {
    type: DataTypes.ENUM('hero-slider', 'hero-left', 'hero-right', 'hero-bottom-left', 'hero-bottom-right', 'wide-banner', 'prime-banner-left', 'prime-banner-right', 'new-arrival-banner', 'wide-banner-top', 'wide-banner-bottom', 'after-special-offers', 'category-page-banner', 'category', 'promotion', 'sidebar', 'footer', 'popup'),
    allowNull: false
  },
  position: {
    type: DataTypes.STRING,
    defaultValue: 'main'
  },
  heading: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subHeading: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobileImage: {
    type: DataTypes.STRING
  },
  link: {
    type: DataTypes.STRING
  },
  buttonText: {
    type: DataTypes.STRING
  },
  buttonStyle: {
    type: DataTypes.JSON,
    defaultValue: {}
  },
  textColor: {
    type: DataTypes.STRING,
    defaultValue: '#ffffff'
  },
  backgroundColor: {
    type: DataTypes.STRING
  },
  overlayColor: {
    type: DataTypes.STRING
  },
  overlayOpacity: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.3
  },
  textAlignment: {
    type: DataTypes.ENUM('left', 'center', 'right'),
    defaultValue: 'center'
  },
  animation: {
    type: DataTypes.JSON,
    defaultValue: {}
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  startDate: {
    type: DataTypes.DATE
  },
  endDate: {
    type: DataTypes.DATE
  },
  targetAudience: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  clickCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  impressions: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true
});

export default Banner;