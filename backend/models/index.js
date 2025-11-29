import Product from './Product.js';
import Category from './Category.js';
import Banner from './Banner.js';
import User from './User.js';
import Order from './Order.js';
import Wallet from './Wallet.js';
import Cart from './Cart.js';
import Wishlist from './Wishlist.js';
import PaymentSettings from './PaymentSettings.js';

// Set up associations
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

// User associations
User.hasOne(Wallet, { foreignKey: 'userId' });
Wallet.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Wishlist, { foreignKey: 'userId' });
Wishlist.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'User' });

export { Product, Category, Banner, User, Order, Wallet, Cart, Wishlist, PaymentSettings };