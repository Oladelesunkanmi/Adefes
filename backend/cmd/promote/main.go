package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"adefes-backend/internal/database"

	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(".env"); err != nil {
		log.Println("Warning: Error loading .env file, using environment variables")
	}

	if len(os.Args) < 2 {
		fmt.Println("Usage: go run promote.go <email>")
		fmt.Println("Example: go run promote.go admin@adefes.com")
		os.Exit(1)
	}

	email := os.Args[1]

	// Init database
	err := database.InitDB()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer database.DB.Close(context.Background())

	// Upgrade user
	err = database.UpdateUserRole(email, "admin")
	if err != nil {
		log.Fatalf("Failed to promote user '%s': %v\n", email, err)
	}

	fmt.Printf("✅ Successfully promoted %s to admin!\n", email)
}
