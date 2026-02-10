package database

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func Connect() error {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		return fmt.Errorf("DATABASE_URL environment variable is not set")
	}

	config, err := pgxpool.ParseConfig(dbURL)
	if err != nil {
		return fmt.Errorf("unable to parse database config: %w", err)
	}

	// Connection pool settings
	config.MaxConns = 10
	config.MinConns = 1
	config.MaxConnLifetime = time.Hour
	config.MaxConnIdleTime = 30 * time.Minute

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	pool, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		return fmt.Errorf("unable to create connection pool: %w", err)
	}

	// Verify connection
	if err := pool.Ping(ctx); err != nil {
		return fmt.Errorf("unable to connect to database: %w", err)
	}

	DB = pool
	fmt.Println("Connected to database successfully")
	return nil
}

// RunMigrations executes the schema.sql file to create tables
func RunMigrations() error {
	if DB == nil {
		return fmt.Errorf("database not connected")
	}

	// Get the path to schema.sql
	schemaPath := filepath.Join("internal", "database", "schema.sql")

	// Read the schema file
	schemaSQL, err := os.ReadFile(schemaPath)
	if err != nil {
		return fmt.Errorf("unable to read schema.sql: %w", err)
	}

	// Execute the schema
	ctx := context.Background()
	_, err = DB.Exec(ctx, string(schemaSQL))
	if err != nil {
		return fmt.Errorf("unable to execute schema: %w", err)
	}

	fmt.Println("Database migrations completed successfully")
	return nil
}

func Close() {
	if DB != nil {
		DB.Close()
	}
}
