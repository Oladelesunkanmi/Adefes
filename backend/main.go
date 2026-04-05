package main

import (
	"adefes-backend/internal/database"
	"adefes-backend/internal/router"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file (ignore error if file doesn't exist)
	godotenv.Load()
	
	// Initialize Database
	if err := database.Connect(); err != nil {
		fmt.Printf("Warning: Failed to connect to database: %v\n", err)
		fmt.Println("Starting server without database connection...")
	} else {
		defer database.Close()

		// Run migrations to create tables
		if err := database.RunMigrations(); err != nil {
			fmt.Printf("Warning: Failed to run migrations: %v\n", err)
		}
	}

	r := chi.NewRouter()

	// Initialize all routes via the router package
	router.Setup(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
