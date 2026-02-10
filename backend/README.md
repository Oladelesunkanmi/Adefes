# Adefes Backend

## Quick Start

1. **Configure Environment**:
   - Open `backend/.env`
   - Update `DATABASE_URL` with your PostgreSQL credentials
   - Change `JWT_SECRET` to a secure random string

2. **Run Database Migrations** (if using PostgreSQL):
   ```bash
   psql -d adefes -f internal/database/schema.sql
   ```

3. **Start Server**:
   ```bash
   go run main.go
   ```
   Or build and run:
   ```bash
   go build -o server.exe main.go
   ./server.exe
   ```

## Environment Variables

Edit `backend/.env`:

```env
DATABASE_URL=postgres://your_user:your_password@localhost:5432/adefes?sslmode=disable
JWT_SECRET=your_secure_random_string_here
PORT=8080
```

## Running Without Database

The backend works without a database connection:
- Uses in-memory sample products
- Auth endpoints require database

## Dependencies

Install Go dependencies:
```bash
go mod tidy
```
