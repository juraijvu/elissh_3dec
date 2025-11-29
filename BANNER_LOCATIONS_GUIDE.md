# 🎨 Banner Locations Guide - Elissh Cosmetics

This guide shows exactly where each banner appears on your website and provides best practices for each area.

## 🏠 Homepage Banner Areas

### 1. Hero Slider (`hero-slider`)
- **Location**: Top of homepage - main carousel
- **Dimensions**: 1920x600px (desktop), 768x400px (mobile)
- **Max Banners**: 5 rotating slides
- **Priority**: HIGH
- **Best For**: 
  - New collection launches
  - Major sales (Black Friday, Summer Sale)
  - Brand campaigns
  - Seasonal promotions
- **Tips**: Use high-impact visuals with clear call-to-action

### 2. Hero Side Banners
#### Hero Left (`hero-left`)
- **Location**: Left side of hero section
- **Dimensions**: 300x500px (desktop), 250x300px (mobile)
- **Priority**: MEDIUM
- **Best For**: 
  - Makeup tutorials
  - Beauty tips
  - Educational content
  - App downloads

#### Hero Right (`hero-right`)
- **Location**: Right side of hero section  
- **Dimensions**: 300x500px (desktop), 250x300px (mobile)
- **Priority**: MEDIUM
- **Best For**:
  - VIP membership offers
  - Loyalty programs
  - Customer testimonials
  - Social media links

### 3. Hero Bottom Banners
#### Hero Bottom Left (`hero-bottom-left`)
- **Location**: Bottom left of hero section
- **Dimensions**: 600x300px (desktop), 400x200px (mobile)
- **Priority**: MEDIUM
- **Best For**:
  - Gift cards
  - Seasonal offers
  - Service promotions
  - Brand partnerships

#### Hero Bottom Right (`hero-bottom-right`)
- **Location**: Bottom right of hero section
- **Dimensions**: 600x300px (desktop), 400x200px (mobile)
- **Priority**: MEDIUM
- **Best For**:
  - Beauty consultations
  - Customer support
  - Delivery information
  - Return policies

### 4. After Special Offers (`after-special-offers`)
- **Location**: After the "Special Offers" product carousel
- **Dimensions**: 400x250px (desktop), 300x200px (mobile)
- **Max Banners**: 3 side-by-side
- **Priority**: MEDIUM
- **Best For**:
  - Customer favorites/bestsellers
  - Brand certifications (Halal, Cruelty-free)
  - Shipping information
  - Trust badges

### 5. New Arrivals Grid (`new-arrival-banner`)
- **Location**: New Arrivals section - product grid
- **Dimensions**: 300x400px (desktop), 250x300px (mobile)
- **Max Banners**: 8 in grid layout
- **Priority**: HIGH
- **Best For**:
  - New product launches
  - Featured products
  - Category highlights
  - Limited edition items
- **Tips**: Each banner should highlight a specific product or small product group

### 6. Wide Banners
#### Wide Banner Top (`wide-banner-top`)
- **Location**: Top wide promotional area
- **Dimensions**: 1200x300px (desktop), 600x200px (mobile)
- **Priority**: HIGH
- **Best For**:
  - Site-wide sales
  - Major announcements
  - Black Friday/Cyber Monday
  - Flash sales

#### Wide Banner Bottom (`wide-banner-bottom`)
- **Location**: Bottom wide promotional area
- **Dimensions**: 1200x300px (desktop), 600x200px (mobile)
- **Priority**: MEDIUM
- **Best For**:
  - Newsletter signups
  - Free shipping thresholds
  - Membership benefits
  - Social media campaigns

## 📂 Category Page Banners

### Category Page Banner (`category-page-banner`)
- **Location**: All category pages - appears after every 3 rows of products
- **Dimensions**: 1200x300px (desktop), 600x200px (mobile)
- **Priority**: MEDIUM
- **Best For**:
  - Category-specific offers
  - Featured brands within category
  - Educational content related to category
  - Cross-selling to related categories
- **Tips**: Use the `position` field to target specific categories (makeup, skincare, haircare, fragrance)

## 🎯 Banner Best Practices

### Content Guidelines
1. **Headlines**: Keep under 6 words for mobile readability
2. **Descriptions**: Maximum 15 words for clarity
3. **Call-to-Action**: Use action verbs (Shop, Discover, Explore, Get)
4. **Colors**: Ensure text contrast meets accessibility standards

### Image Guidelines
1. **Quality**: Use high-resolution images (minimum 2x the display size)
2. **Format**: JPG for photos, PNG for graphics with transparency
3. **File Size**: Optimize for web (under 500KB for best performance)
4. **Mobile**: Always provide mobile-specific images for better UX

### Timing & Scheduling
1. **Seasonal**: Update banners monthly for seasonal relevance
2. **Sales**: Schedule start/end dates for promotional banners
3. **A/B Testing**: Test different versions to optimize performance
4. **Analytics**: Monitor click-through rates in admin panel

## 🔧 Technical Implementation

### Banner Areas in Code
```javascript
// Homepage areas
'hero-slider'           // Main carousel (5 slides)
'hero-left'            // Left vertical banner
'hero-right'           // Right vertical banner  
'hero-bottom-left'     // Bottom left horizontal
'hero-bottom-right'    // Bottom right horizontal
'after-special-offers' // 3 banners after product carousel
'new-arrival-banner'   // 8 banners in grid
'wide-banner-top'      // Full-width top
'wide-banner-bottom'   // Full-width bottom

// Category pages
'category-page-banner' // After every 3 product rows
```

### Position Targeting
For category-specific banners, use the `position` field:
- `makeup` - Shows only on makeup category pages
- `skincare` - Shows only on skincare category pages  
- `haircare` - Shows only on haircare category pages
- `fragrance` - Shows only on fragrance category pages
- `main` - Shows on all category pages (default)

## 📊 Performance Monitoring

### Available Metrics
- **Impressions**: How many times banner was viewed
- **Clicks**: How many times banner was clicked
- **CTR**: Click-through rate (clicks/impressions)
- **Conversion**: Track via Google Analytics integration

### Optimization Tips
1. **High CTR Areas**: Hero slider, new arrivals grid
2. **Brand Building**: Hero side banners, after special offers
3. **Information**: Wide banners, category banners
4. **Conversion**: New arrivals grid, category-specific banners

## 🚀 Quick Start Checklist

- [ ] Upload banner images to `/backend/uploads/banners/`
- [ ] Create banners in admin panel with proper dimensions
- [ ] Set appropriate priority levels (High/Medium)
- [ ] Add clear call-to-action buttons
- [ ] Test on both desktop and mobile
- [ ] Schedule promotional banners with start/end dates
- [ ] Monitor performance and adjust as needed

---

**Need Help?** Visit the admin panel at `/admin/banners` for the visual banner management interface with live previews and placement guides.