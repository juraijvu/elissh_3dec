#!/bin/bash

echo "Starting Elissh Cosmetics Development Environment..."
echo

echo "Installing Frontend Dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install frontend dependencies"
    exit 1
fi

echo "Installing Backend Dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install backend dependencies"
    exit 1
fi

echo
echo "Starting Backend Server..."
npm run dev &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 3

cd ..
echo "Starting Frontend Server..."
npm run dev &
FRONTEND_PID=$!

echo
echo "Development servers are running..."
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:5000"
echo
echo "Press Ctrl+C to stop all servers"

# Wait for user to stop
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait