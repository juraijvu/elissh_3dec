import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  excerpt: {
    type: DataTypes.TEXT
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  featuredImage: {
    type: DataTypes.STRING
  },
  gallery: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  categories: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'scheduled'),
    defaultValue: 'draft'
  },
  publishedAt: {
    type: DataTypes.DATE
  },
  scheduledAt: {
    type: DataTypes.DATE
  },
  metaTitle: {
    type: DataTypes.STRING
  },
  metaDescription: {
    type: DataTypes.TEXT
  },
  readTime: {
    type: DataTypes.INTEGER
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (blog) => {
      if (blog.title && !blog.slug) {
        blog.slug = blog.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
      }
      if (blog.content && !blog.readTime) {
        const wordCount = blog.content.split(' ').length;
        blog.readTime = Math.ceil(wordCount / 200);
      }
    },
    beforeUpdate: (blog) => {
      if (blog.changed('title')) {
        blog.slug = blog.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
      }
      if (blog.changed('content')) {
        const wordCount = blog.content.split(' ').length;
        blog.readTime = Math.ceil(wordCount / 200);
      }
    }
  }
});

export default Blog;