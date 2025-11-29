@echo off
echo Starting Elissh Cosmetics Full Stack...

echo Installing Frontend Dependencies...
call npm install

echo Installing Backend Dependencies...
cd backend
call npm install

echo Starting Backend Server...
start "Backend Server" cmd /k "npm run dev"

timeout /t 3 /nobreak > nul

cd ..
echo Starting Frontend Server...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Servers are starting...
echo Frontend: http://localhost:5173
echo Backend: http://localhost:5000
echo Admin: http://localhost:5173/admin
echo.
pause