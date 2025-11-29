# Dynamic Banner System - Elissh Cosmetics

## Overview
The dynamic banner system allows you to manage all website banners from the admin panel. No more static images - everything is now configurable and trackable.

## Banner Areas

### 1. Hero Slider (`hero-slider`)
- **Location**: Main homepage carousel
- **Recommended Size**: 1920x600px (desktop), 768x400px (mobile)
- **Features**: Auto-rotating slides with overlay text, buttons, and click tracking
- **Usage**: Main promotional content, new collections, major sales

### 2. Wide Banners
- **`wide-banner`**: Full-width promotional banner (16:6 ratio)
- **`wide-banner-top`**: Top section wide banner (16:6 ratio)
- **`wide-banner-bottom`**: Bottom section wide banner (16:6 ratio)
- **Usage**: Major promotions, brand spotlights, seasonal campaigns

### 3. Prime Banners
- **`prime-banner-left`**: Left side promotional banner (16:10 ratio)
- **`prime-banner-right`**: Right side promotional banner (16:10 ratio)
- **Usage**: Featured categories, special collections

### 4. New Arrival Banners (`new-arrival-banner`)
- **Location**: Grid layout in new arrivals section
- **Recommended Size**: 400x533px (3:4 ratio)
- **Usage**: Showcase new products, categories, or collections

### 5. Category Banners (`category`)
- **Location**: Category page headers
- **Usage**: Category-specific promotions and branding

### 6. Promotional Banners (`promotion`)
- **Location**: Various promotional sections
- **Usage**: Flash sales, limited-time offers, special deals

### 7. Sidebar Banners (`sidebar`)
- **Location**: Sidebar areas
- **Usage**: Newsletter signup, app download, secondary promotions

## Banner Features

### Visual Customization
- **Text Color**: Customize heading and text colors
- **Overlay Color**: Add colored overlay to images
- **Overlay Opacity**: Control overlay transparency (0-1)
- **Text Alignment**: Left, center, or right alignment
- **Background Color**: Optional background color

### Content Fields
- **Name**: Internal identifier for admin use
- **Heading**: Main banner title
- **Sub Heading**: Secondary text
- **Description**: Additional descriptive text
- **Button Text**: Call-to-action button text
- **Link**: Destination URL when banner is clicked

### Images
- **Desktop Image**: Main banner image
- **Mobile Image**: Optional mobile-optimized image
- **Supported Formats**: JPEG, PNG, GIF, WebP
- **File Size Limit**: 5MB per image

### Advanced Features
- **Active/Inactive Status**: Control banner visibility
- **Sort Order**: Control display order for multiple banners
- **Start/End Dates**: Schedule banner campaigns
- **Click Tracking**: Monitor banner performance
- **Impression Tracking**: Track banner views

## Admin Panel Usage

### Creating a Banner
1. Navigate to **Admin > Banners**
2. Click **"Add New Banner"**
3. Fill in banner details:
   - **Banner Name**: Internal reference name
   - **Banner Area**: Select where the banner will appear
   - **Heading & Sub Heading**: Display text
   - **Link**: Where users go when clicking
   - **Button Text**: Call-to-action text
4. Upload images (desktop and mobile)
5. Customize styling (colors, alignment, overlay)
6. Set as **Active** and click **Create Banner**

### Managing Banners
- **View by Area**: Use tabs to see banners for each area
- **Edit**: Click edit icon to modify existing banners
- **Delete**: Remove banners you no longer need
- **Reorder**: Use sort order to control display sequence

### Banner Performance
- **Click Count**: See how many times each banner was clicked
- **Impressions**: Track how often banners are viewed
- **Analytics**: Monitor which banners perform best

## Frontend Implementation

### Dynamic Components
All static banner images have been replaced with `DynamicBanner` components:

```tsx
<DynamicBanner 
  area="hero-slider" 
  className="w-full" 
  aspectRatio="aspect-[16/6]" 
  fallbackImage={heroImage}
/>
```

### Fallback System
If no banners are configured for an area, the system shows:
1. Fallback image (if provided)
2. "Coming Soon" placeholder
3. Nothing (if no fallback specified)

### Mobile Responsiveness
- Automatically uses mobile images when available
- Responsive text sizing and positioning
- Touch-friendly interactions

## Setup Instructions

### 1. Seed Banner Data
```bash
cd backend
npm run seed-banners
```

### 2. Create Placeholder Images
```bash
cd backend
node scripts/createPlaceholderBanners.js
```

### 3. Replace Placeholder Images
- Navigate to `backend/uploads/banners/`
- Replace placeholder files with actual banner images
- Maintain the same filenames for automatic linking

### 4. Configure Banners
1. Access admin panel at `/admin`
2. Go to **Banners** section
3. Edit existing banners or create new ones
4. Upload proper images and configure settings

## Image Guidelines

### Recommended Sizes
- **Hero Slider**: 1920x600px (desktop), 768x400px (mobile)
- **Wide Banners**: 1920x400px (desktop), 768x300px (mobile)
- **Prime Banners**: 800x500px (desktop), 400x250px (mobile)
- **New Arrival**: 400x533px (desktop), 300x400px (mobile)
- **Category**: 1200x400px (desktop), 600x200px (mobile)
- **Promotional**: 1000x300px (desktop), 500x150px (mobile)
- **Sidebar**: 300x400px (desktop), 250x300px (mobile)

### Best Practices
- Use high-quality images (72-150 DPI)
- Optimize file sizes for web (use compression)
- Ensure text is readable with overlay settings
- Test on both desktop and mobile devices
- Use consistent branding and colors

## API Endpoints

### Public Endpoints
- `GET /api/banner/{area}` - Get active banners for specific area
- `POST /api/banner/{id}/click` - Track banner click

### Admin Endpoints (Protected)
- `GET /api/banner/admin/all` - Get all banners
- `GET /api/banner/admin/{area}` - Get banners by area
- `POST /api/banner` - Create new banner
- `PUT /api/banner/{id}` - Update banner
- `DELETE /api/banner/{id}` - Delete banner

## Troubleshooting

### Common Issues

1. **Images not displaying**
   - Check file paths in database
   - Verify images exist in uploads/banners/
   - Ensure proper file permissions

2. **Banners not showing**
   - Verify banner is set to Active
   - Check start/end dates
   - Confirm correct area assignment

3. **Mobile images not loading**
   - Upload mobile-specific images
   - Check mobile image paths
   - Verify responsive settings

### Performance Tips
- Optimize image file sizes
- Use WebP format when possible
- Enable browser caching for banner images
- Monitor click-through rates to optimize content

## Future Enhancements

### Planned Features
- A/B testing for banners
- Advanced analytics dashboard
- Bulk banner operations
- Template system for quick banner creation
- Integration with marketing campaigns
- Automated banner rotation based on performance

### Customization Options
- Animation effects
- Video banner support
- Interactive elements
- Personalized banners based on user behavior
- Geolocation-based banner targeting

---

**Note**: This system replaces all static banner images with dynamic, manageable content. All banners are now controlled through the admin panel, providing flexibility and real-time updates without code changes.