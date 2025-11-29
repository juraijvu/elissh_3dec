# User Signup and Order Placement Fixes

## Issues Fixed

### 1. User Registration - "notNull Violation: User.name cannot be null"

**Problem**: The User model required a `name` field, but the registration route only provided `firstName` and `lastName`.

**Solution**: Updated the registration route in `backend/routes/auth.js` to automatically generate the `name` field by combining `firstName` and `lastName`.

```javascript
// Before
const user = await User.create({
  firstName,
  lastName,
  email,
  password
});

// After
const user = await User.create({
  name: `${firstName} ${lastName}`,
  firstName,
  lastName,
  email,
  password
});
```

### 2. Order Routes - MongoDB vs PostgreSQL Mismatch

**Problem**: Order routes were written for MongoDB but the system uses PostgreSQL with Sequelize.

**Solution**: Updated all order routes in `backend/routes/orders.js` to use Sequelize syntax:

- Changed `Order.find()` to `Order.findAll()`
- Changed `Order.findById()` to `Order.findByPk()`
- Updated query syntax and associations
- Fixed pagination with `findAndCountAll()`

### 3. Cart Integration with Orders

**Problem**: Order creation wasn't properly integrated with the cart system.

**Solution**: 
- Added Cart model to exports in `backend/models/index.js`
- Updated order creation to use cart items instead of requiring manual item input
- Added cart clearing after successful order placement
- Added stock validation before order creation

### 4. Model Associations

**Problem**: Missing Cart model associations.

**Solution**: Added proper Sequelize associations:
```javascript
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });
```

## Testing

Created `backend/test-signup-order.js` to verify:
1. ✅ User registration works without name field errors
2. ✅ Users can add items to cart
3. ✅ Users can create orders from cart items
4. ✅ Orders are properly saved and retrievable
5. ✅ Cart is cleared after order placement

## How to Test

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Run the test script:
```bash
node test-signup-order.js
```

3. Or test manually:
   - Register a new user via `/api/auth/register`
   - Add items to cart via `/api/cart/add`
   - Create order via `/api/orders`
   - Check orders via `/api/orders/my-orders`

## User Flow Now Works

1. **Normal User Registration**: ✅ Works without admin privileges
2. **Add to Cart**: ✅ Users can add products to cart
3. **Place Orders**: ✅ Users can create orders from cart items
4. **Order Management**: ✅ Users can view their order history
5. **No Admin Access**: ✅ Normal users don't get admin privileges

## Security Maintained

- Users still get `role: 'user'` by default
- Admin routes remain protected with `admin` middleware
- JWT authentication works correctly
- Order ownership is validated (users can only see their own orders)

All fixes maintain the existing security model while enabling normal e-commerce functionality for regular users.