import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  shortDescription: {
    type: DataTypes.STRING(200)
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
  subcategory: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  originalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    validate: {
      min: 0
    }
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  variants: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  weight: {
    type: DataTypes.DECIMAL(8, 2)
  },
  dimensions: {
    type: DataTypes.JSON
  },
  ingredients: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  howToUse: {
    type: DataTypes.TEXT
  },
  benefits: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  suitableFor: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  certifications: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  rating: {
    type: DataTypes.JSON,
    defaultValue: { average: 0, count: 0 }
  },
  deliveryDays: {
    type: DataTypes.INTEGER,
    defaultValue: 3
  },
  codAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isHalal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isVegan: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isCrueltyFree: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isOnSale: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  saleEndDate: {
    type: DataTypes.DATE
  },
  metaTitle: {
    type: DataTypes.STRING
  },
  metaDescription: {
    type: DataTypes.TEXT
  },
  slug: {
    type: DataTypes.STRING,
    unique: true
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (product) => {
      if (product.name && !product.slug) {
        product.slug = product.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
      }
    },
    beforeUpdate: (product) => {
      if (product.changed('name')) {
        product.slug = product.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
      }
    }
  }
});

Product.prototype.getDiscountPercentage = function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
};

export default Product;