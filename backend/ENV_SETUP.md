# Adefes Backend Environment Variables

## Required Variables

### DATABASE_URL
PostgreSQL connection string. Format:
```
postgres://username:password@host:port/database?sslmode=disable
```

Example:
```
DATABASE_URL=postgres://adefes_user:mypassword@localhost:5432/adefes?sslmode=disable
```

**Note**: The backend will run without a database connection and use sample in-memory data as a fallback.

### JWT_SECRET
Secret key for signing JWT tokens. Use a strong, random string in production.

Example:
```
JWT_SECRET=my_super_secret_jwt_key_12345
```

### PORT (Optional)
Server port. Defaults to 8080 if not set.

Example:
```
PORT=8080
```

## Setup Instructions

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` with your actual configuration

3. The `.env` file is git-ignored for security

## Development Setup

For local development without a database:
- You can skip setting `DATABASE_URL`
- The app will use sample product data
- Auth endpoints won't work without a database

For full functionality:
1. Install PostgreSQL
2. Create a database: `createdb adefes`
3. Run the schema: `psql -d adefes -f internal/database/schema.sql`
4. Set `DATABASE_URL` in `.env`
