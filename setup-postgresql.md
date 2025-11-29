# PostgreSQL Setup Guide

## 1. Install PostgreSQL

### Windows:
1. Download from: https://www.postgresql.org/download/windows/
2. Run installer and follow setup wizard
3. Remember the password you set for 'postgres' user

### macOS:
```bash
brew install postgresql
brew services start postgresql
```

### Ubuntu/Linux:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## 2. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE elissh_cosmetics;

# Create user (optional)
CREATE USER elissh_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE elissh_cosmetics TO elissh_user;

# Exit
\q
```

## 3. Update Environment Variables

Update `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=elissh_cosmetics
DB_USER=postgres
DB_PASSWORD=your_postgres_password
```

## 4. Run the Application

```bash
# Install dependencies
cd backend
npm install

# Seed database
npm run seed

# Start server
npm run dev
```

## 5. Verify Setup

- Backend: http://localhost:5000/api/health
- Admin: admin@elisshbeauty.ae / admin123

## Default PostgreSQL Settings:
- Host: localhost
- Port: 5432
- Database: elissh_cosmetics
- User: postgres