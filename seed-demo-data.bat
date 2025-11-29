@echo off
echo ========================================
echo   ELISSH COSMETICS - DEMO DATA SEEDING
echo ========================================
echo.
echo This will create:
echo   - 100 cosmetic products (skincare, makeup, haircare, fragrance)
echo   - 25+ banners for all website areas
echo   - Clear banner location instructions
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause > nul
echo.

cd backend
echo Starting demo data seeding...
echo.

npm run seed

echo.
echo ========================================
echo   SEEDING COMPLETED!
echo ========================================
echo.
echo Next steps:
echo   1. Start backend: cd backend && npm run dev
echo   2. Start frontend: npm run dev
echo   3. Visit admin: http://localhost:5173/admin/banners
echo   4. Upload banner images to see them live
echo.
echo Banner locations are clearly marked in the admin panel!
echo.
pause