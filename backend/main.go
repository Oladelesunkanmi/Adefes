package main

import (
	"adefes-backend/internal/api"
	"adefes-backend/internal/database"
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
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
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// CORS Configuration
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"}, // Allow frontend origin
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello from Adefes Backend!"))
	})

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		if database.DB != nil {
			if err := database.DB.Ping(context.Background()); err == nil {
				w.Write([]byte("Database: Connected"))
				return
			}
		}
		w.Write([]byte("Database: Disconnected"))
	})

	r.Route("/api", func(r chi.Router) {
		// Public routes
		r.Post("/register", api.RegisterHandler)
		r.Post("/login", api.LoginHandler)
		r.Get("/products", api.GetProductsHandler)
		r.Get("/products/{id}", api.GetProductByIDHandler)

		// Protected routes
		r.Group(func(r chi.Router) {
			r.Use(api.AuthMiddleware)
			r.Post("/orders", api.CreateOrderHandler)
		})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
