import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.TEXT
  },
  parentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
  slug: {
    type: DataTypes.STRING,
    unique: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (category) => {
      if (category.name && !category.slug) {
        category.slug = category.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
      }
    },
    beforeUpdate: (category) => {
      if (category.changed('name')) {
        category.slug = category.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
      }
    }
  }
});

Category.hasMany(Category, { as: 'children', foreignKey: 'parentId' });
Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });

export default Category;