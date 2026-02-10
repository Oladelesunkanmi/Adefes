# Adefes E-commerce Platform

A modern, full-stack e-commerce platform for fashion with premium aesthetics.

## Tech Stack
- **Frontend**: React + Vite, Tailwind CSS v4
- **Backend**: Go + Chi router
- **Database**: PostgreSQL

## Quick Start

### Backend
```bash
cd backend
# Edit .env with your database credentials
go run main.go
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit: http://localhost:5173

## Features
✅ Landing Page with Hero & Collections  
✅ User Authentication (JWT)  
✅ Product Catalog with 9 sample items  
✅ Responsive Design (Mobile/Tablet/Desktop)  
✅ Product Detail Pages  
✅ Category Filtering  

## Configuration

### Backend (.env)
```env
DATABASE_URL=postgres://user:pass@localhost:5432/adefes?sslmode=disable
JWT_SECRET=your_secret_key
PORT=8080
```

### Database Setup
```bash
createdb adefes
psql -d adefes -f backend/internal/database/schema.sql
```

## API Endpoints
- `POST /api/register` - Create account
- `POST /api/login` - Login
- `GET /api/products` - List products
- `GET /api/products/:id` - Product details
