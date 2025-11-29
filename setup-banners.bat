@echo off
echo ========================================
echo Elissh Cosmetics - Banner System Setup
echo ========================================
echo.

echo Step 1: Creating placeholder banner images...
cd backend
node scripts/createPlaceholderBanners.js
echo.

echo Step 2: Seeding banner data to database...
npm run seed-banners
echo.

echo ========================================
echo Banner System Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Replace placeholder images in backend/uploads/banners/
echo 2. Access admin panel at http://localhost:5173/admin
echo 3. Navigate to Banners section to configure your banners
echo 4. Upload actual banner images and customize settings
echo.
echo For detailed instructions, see DYNAMIC_BANNER_SYSTEM.md
echo.
pause