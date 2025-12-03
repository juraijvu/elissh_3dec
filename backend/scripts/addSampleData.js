import sequelize from '../config/database.js';
import Category from '../models/CategoryBasic.js';
import Product from '../models/ProductBasic.js';
import Banner from '../models/BannerBasic.js';

const addSampleData = async () => {
  try {
    console.log('🚀 Adding sample data...');
    
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    // Get categories
    const categories = await Category.findAll();
    if (categories.length === 0) {
      console.log('❌ No categories found. Run fix-production first.');
      return;
    }
    
    // Add sample products
    const products = [
      {
        name: 'Hydrating Face Cream',
        description: 'Moisturizing cream for all skin types',
        price: 99.00,
        categoryId: categories[0].id,
        brand: 'Elissh Beauty',
        sku: 'HFC001',
        stock: 50,
        isActive: true,
        isFeatured: true,
        images: ['/uploads/products/sample1.jpg']
      },
      {
        name: 'Long-Lasting Foundation',
        description: 'Full coverage foundation',
        price: 149.00,
        categoryId: categories[1]?.id || categories[0].id,
        brand: 'Elissh Beauty',
        sku: 'LLF001',
        stock: 30,
        isActive: true,
        isFeatured: true,
        images: ['/uploads/products/sample2.jpg']
      },
      {
        name: 'Nourishing Hair Mask',
        description: 'Deep conditioning hair treatment',
        price: 79.00,
        categoryId: categories[2]?.id || categories[0].id,
        brand: 'Elissh Beauty',
        sku: 'NHM001',
        stock: 25,
        isActive: true,
        isOnSale: true,
        originalPrice: 99.00,
        images: ['/uploads/products/sample3.jpg']
      }
    ];
    
    for (const product of products) {
      await Product.create(product);
    }
    console.log('✅ Sample products created');
    
    // Add sample banners
    const banners = [
      {
        title: 'Welcome to Elissh Beauty',
        area: 'hero-slider',
        heading: 'Premium Beauty Products',
        subHeading: 'Discover luxury cosmetics',
        image: '/uploads/banners/hero1.jpg',
        link: '/products',
        buttonText: 'Shop Now',
        isActive: true,
        sortOrder: 1
      },
      {
        title: 'Special Offer',
        area: 'hero-left',
        heading: '50% Off Skincare',
        image: '/uploads/banners/offer1.jpg',
        link: '/category/skincare',
        isActive: true,
        sortOrder: 1
      }
    ];
    
    for (const banner of banners) {
      await Banner.create(banner);
    }
    console.log('✅ Sample banners created');
    
    console.log('🎉 Sample data added successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sequelize.close();
  }
};

addSampleData();