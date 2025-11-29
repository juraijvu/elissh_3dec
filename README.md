# Elissh Cosmetics - Complete E-commerce Platform

A full-stack e-commerce platform for cosmetics and beauty products, built with modern web technologies and designed specifically for the UAE market.

## 🌟 Features

### Frontend Features
- **Modern React UI** with TypeScript and Tailwind CSS
- **Responsive Design** optimized for mobile and desktop
- **User Authentication** with JWT tokens
- **Product Catalog** with advanced filtering and search
- **Shopping Cart** with persistent storage
- **Wishlist** functionality
- **User Profiles** with order history and preferences
- **Secure Checkout** with multiple payment options
- **Order Tracking** and management
- **Multi-language Support** (Arabic/English)
- **PWA Ready** for mobile app-like experience

### Backend Features
- **RESTful API** built with Node.js and Express
- **MongoDB Database** with Mongoose ODM
- **JWT Authentication** with refresh tokens
- **Role-based Access Control** (User/Admin)
- **File Upload** with Cloudinary integration
- **Email Notifications** with Nodemailer
- **Payment Processing** with Stripe integration
- **Rate Limiting** and security middleware
- **API Documentation** with comprehensive endpoints

### UAE-Specific Features
- **Cash on Delivery** payment option
- **Halal Certification** filtering
- **Arabic Language** support
- **UAE Shipping** zones and rates
- **Local Currency** (AED) support
- **Emirates-based** delivery tracking

### Dynamic Banner System
- **Admin-Controlled Banners** for all website areas
- **Multiple Banner Types** (Hero, Wide, Prime, Category, Promotional)
- **Click Tracking** and performance analytics
- **Mobile-Responsive** with separate mobile images
- **Scheduled Campaigns** with start/end dates
- **Custom Styling** (colors, overlays, text alignment)
- **Real-time Updates** without code deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Elissh_Cosmetics_Web
```

2. **Install Frontend Dependencies**
```bash
npm install
```

3. **Install Backend Dependencies**
```bash
cd backend
npm install
```

4. **Environment Setup**

Create `.env` files in both root and backend directories:

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Elissh Beauty
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

**Backend (backend/.env)**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elissh_cosmetics
JWT_SECRET=your_very_long_and_secure_jwt_secret_key
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

5. **Database Setup & Demo Data**

Seed the database with comprehensive demo data:

**Windows:**
```bash
seed-demo-data.bat
```

**Linux/Mac:**
```bash
chmod +x seed-demo-data.sh
./seed-demo-data.sh
```

**Or manually:**
```bash
cd backend
npm run seed
```

This creates:
- **100 cosmetic products** (skincare, makeup, haircare, fragrance)
- **25+ banners** for all website areas with clear location guides
- **Realistic product data** with pricing, stock, certifications
- **Banner placement instructions** in admin panel

7. **Start Development Servers**

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Frontend (Terminal 2):**
```bash
npm run dev
```

8. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Admin Login: admin@elisshbeauty.ae / admin123
- Banner Management: http://localhost:5173/admin/banners

## 📁 Project Structure

```
Elissh_Cosmetics_Web/
├── src/                          # Frontend source code
│   ├── components/               # Reusable UI components
│   ├── pages/                    # Page components
│   ├── contexts/                 # React contexts
│   ├── lib/                      # Utilities and API client
│   └── assets/                   # Static assets
├── backend/                      # Backend source code
│   ├── models/                   # Database models
│   ├── routes/                   # API routes
│   ├── middleware/               # Custom middleware
│   ├── controllers/              # Route controllers
│   └── scripts/                  # Database scripts
└── public/                       # Static files
```

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Router** for navigation
- **React Query** for data fetching
- **Axios** for HTTP requests
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Multer** for file uploads
- **Nodemailer** for emails
- **Stripe** for payments
- **Helmet** for security

## 🔧 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run seed         # Seed complete demo data (products + banners)
npm run seed-products # Seed 100 cosmetic products only
npm run seed-banners # Seed comprehensive banners only
npm run create-admin # Create admin user
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured/list` - Get featured products
- `GET /api/products/sale/list` - Get sale products

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update cart item
- `DELETE /api/cart/remove/:itemId` - Remove from cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get single order

### Banners
- `GET /api/banner/:area` - Get banners by area
- `POST /api/banner` - Create banner (Admin)
- `PUT /api/banner/:id` - Update banner (Admin)
- `DELETE /api/banner/:id` - Delete banner (Admin)
- `POST /api/banner/:id/click` - Track banner click

## 🎨 Design System

The application uses a comprehensive design system with:
- **Color Palette** optimized for beauty/cosmetics
- **Typography** with Arabic font support
- **Component Library** with consistent styling
- **Responsive Grid** system
- **Animation** and micro-interactions

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Input validation and sanitization
- Helmet.js security headers
- Protected routes on frontend

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in deployment platform

### Backend Deployment (Railway/Heroku)
1. Set up MongoDB Atlas
2. Configure environment variables
3. Deploy backend code
4. Update frontend API URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: support@elisshbeauty.ae
- Phone: 800-ELISSH (Free in UAE)

---

**Built with ❤️ for the UAE beauty community**
