# Banner CMS System - Complete Guide

## Overview
The Elissh Cosmetics website now features a comprehensive Content Management System (CMS) for managing banners across different areas of the homepage and other pages. This system allows administrators to easily upload, manage, and track banner performance.

## Banner Areas & Specifications

### Homepage Banner Areas

#### 1. Hero Section
- **Hero Slider** (`hero-slider`)
  - **Aspect Ratio**: 16:6 (Wide)
  - **Recommended Size**: 1920x600px
  - **Usage**: Main rotating banners at the top of homepage
  - **Features**: Auto-rotation, navigation dots, click tracking

- **Hero Left Banner** (`hero-left`)
  - **Aspect Ratio**: 1:3 (Vertical)
  - **Recommended Size**: 200x600px
  - **Usage**: Left sidebar banner in hero section

- **Hero Right Banner** (`hero-right`)
  - **Aspect Ratio**: 1:3 (Vertical)
  - **Recommended Size**: 200x600px
  - **Usage**: Right sidebar banner in hero section

- **Hero Bottom Left** (`hero-bottom-left`)
  - **Aspect Ratio**: 16:10
  - **Recommended Size**: 800x500px
  - **Usage**: Bottom left banner in hero section

- **Hero Bottom Right** (`hero-bottom-right`)
  - **Aspect Ratio**: 16:10
  - **Recommended Size**: 800x500px
  - **Usage**: Bottom right banner in hero section

#### 2. Content Section Banners
- **Wide Banner** (`wide-banner`)
  - **Aspect Ratio**: 16:6
  - **Recommended Size**: 1920x480px
  - **Usage**: Full-width promotional banner

- **Prime Banner Left** (`prime-banner-left`)
  - **Aspect Ratio**: 16:10
  - **Recommended Size**: 800x500px
  - **Usage**: Left banner in two-column layout

- **Prime Banner Right** (`prime-banner-right`)
  - **Aspect Ratio**: 16:10
  - **Recommended Size**: 800x500px
  - **Usage**: Right banner in two-column layout

- **New Arrival Banners** (`new-arrival-banner`)
  - **Aspect Ratio**: 3:4 (Portrait)
  - **Recommended Size**: 300x400px
  - **Usage**: Grid of product showcase banners

- **Wide Banner Top** (`wide-banner-top`)
  - **Aspect Ratio**: 16:6
  - **Recommended Size**: 1920x480px
  - **Usage**: Top wide promotional banner

- **Wide Banner Bottom** (`wide-banner-bottom`)
  - **Aspect Ratio**: 16:6
  - **Recommended Size**: 1920x480px
  - **Usage**: Bottom wide promotional banner

## Features

### 1. Dynamic Content Management
- **Image Upload**: Support for desktop and mobile versions
- **Text Overlay**: Customizable heading, subheading, and description
- **Link Management**: Redirect URLs for banner clicks
- **Button Customization**: Custom button text and styling
- **Color Controls**: Text color, background, and overlay settings
- **Alignment Options**: Left, center, or right text alignment

### 2. Click Tracking & Analytics
- **Click Counting**: Automatic tracking of banner clicks
- **Impression Tracking**: Monitor banner views
- **Performance Analytics**: Track which banners perform best

### 3. Scheduling & Targeting
- **Date Scheduling**: Set start and end dates for banners
- **Active/Inactive Status**: Enable or disable banners
- **Sort Order**: Control banner display order
- **Target Audience**: Configure audience targeting (future feature)

### 4. Responsive Design
- **Mobile Optimization**: Separate mobile images supported
- **Aspect Ratio Maintenance**: Consistent display across devices
- **Hover Effects**: Smooth transitions and scaling effects

## How to Use the CMS

### Accessing Banner Management
1. Login to admin panel: `/admin`
2. Navigate to "Banner Management" section
3. Select the banner area you want to manage

### Creating a New Banner
1. Click "Add New Banner" button
2. Fill in the banner details:
   - **Banner Name**: Internal name for identification
   - **Banner Area**: Select the placement area
   - **Heading**: Main banner text
   - **Sub Heading**: Secondary text
   - **Description**: Additional details
   - **Link**: Redirect URL (e.g., `/category/makeup`)
   - **Button Text**: Call-to-action text

3. Upload Images:
   - **Desktop Image**: Main banner image
   - **Mobile Image**: Optional mobile-specific image

4. Customize Appearance:
   - **Text Color**: Choose text color
   - **Text Alignment**: Left, center, or right
   - **Overlay Settings**: Background overlay for text readability

5. Set Status:
   - **Active**: Enable/disable the banner
   - **Sort Order**: Control display priority

6. Click "Create Banner" to save

### Editing Existing Banners
1. Navigate to the appropriate banner area tab
2. Click the "Edit" button on the banner you want to modify
3. Update the fields as needed
4. Click "Update Banner" to save changes

### Deleting Banners
1. Find the banner you want to remove
2. Click the "Delete" button (trash icon)
3. Confirm the deletion

## Technical Implementation

### Backend Components
- **Model**: `Banner.js` - Database schema for banner data
- **Routes**: `banner.js` - API endpoints for CRUD operations
- **File Upload**: Multer configuration for image handling
- **Click Tracking**: Endpoint for analytics

### Frontend Components
- **DynamicBanner**: Reusable component for displaying banners
- **NewHeroSection**: Enhanced hero section with CMS integration
- **BannerManager**: Admin interface for banner management

### API Endpoints
- `GET /api/banner/:area` - Fetch banners for specific area
- `POST /api/banner` - Create new banner
- `PUT /api/banner/:id` - Update existing banner
- `DELETE /api/banner/:id` - Delete banner
- `POST /api/banner/:id/click` - Track banner click

## Setup Instructions

### 1. Database Setup
The banner system uses Sequelize with the following supported databases:
- PostgreSQL (recommended)
- MySQL
- SQLite (development)

### 2. Environment Variables
Ensure these variables are set in your `.env` file:
```env
# Database
DATABASE_URL=your_database_url

# File Upload
UPLOAD_PATH=uploads/banners/

# API Base URL
API_BASE_URL=http://localhost:5000
```

### 3. Seed Sample Data
Run the following command to populate sample banners:
```bash
cd backend
npm run seed:homepage-banners
```

### 4. File Storage
- Banner images are stored in `backend/uploads/banners/`
- Ensure the directory has proper write permissions
- Consider using cloud storage (Cloudinary) for production

## Best Practices

### Image Guidelines
1. **File Formats**: Use JPG, PNG, or WebP
2. **File Size**: Keep under 2MB for optimal loading
3. **Quality**: Use high-resolution images (2x for retina displays)
4. **Compression**: Optimize images before upload

### Content Guidelines
1. **Headings**: Keep under 50 characters
2. **Descriptions**: Maximum 150 characters for readability
3. **Links**: Use relative URLs (e.g., `/category/makeup`)
4. **Button Text**: Use action words (Shop Now, Explore, Discover)

### Performance Optimization
1. **Image Optimization**: Compress images appropriately
2. **Lazy Loading**: Images load as needed
3. **Caching**: Browser caching for better performance
4. **CDN**: Consider using a CDN for image delivery

## Troubleshooting

### Common Issues

#### Images Not Displaying
- Check file permissions on upload directory
- Verify image paths in database
- Ensure API base URL is correct

#### Banner Not Showing
- Check if banner is marked as "Active"
- Verify start/end dates
- Confirm banner area matches component usage

#### Click Tracking Not Working
- Check network requests in browser dev tools
- Verify API endpoint is accessible
- Ensure banner has a valid link

### Support
For technical support or feature requests, contact the development team or create an issue in the project repository.

## Future Enhancements

### Planned Features
1. **A/B Testing**: Test different banner versions
2. **Advanced Analytics**: Detailed performance metrics
3. **Bulk Operations**: Manage multiple banners at once
4. **Template System**: Pre-designed banner templates
5. **Video Banners**: Support for video content
6. **Personalization**: User-specific banner content

---

**Built with ❤️ for Elissh Cosmetics**