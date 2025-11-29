@echo off
echo Starting Elissh Cosmetics Application...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d backend && npm run dev"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo   Elissh Cosmetics Application Started
echo ========================================
echo.
echo Backend API: http://localhost:5001
echo Frontend App: http://localhost:5173
echo Admin Panel: http://localhost:5173/admin
echo.
echo Login Credentials:
echo Email: admin@elisshbeauty.ae
echo Password: admin123
echo.
echo Press any key to continue...
pause > nul