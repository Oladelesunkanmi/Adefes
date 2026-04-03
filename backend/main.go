package main

import (
	"adefes-backend/internal/api"
	"adefes-backend/internal/database"
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

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
		AllowedOrigins:   []string{"http://localhost:5173", "https://adefes-1.onrender.com"}, // Allow frontend origin
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	// Serve React Frontend (SPA)
	distPath := "./frontend/dist"
	if _, err := os.Stat(distPath); os.IsNotExist(err) {
		distPath = "../frontend/dist" // fallback if running from backend folder
	}
	fs := http.FileServer(http.Dir(distPath))

	r.Get("/*", func(w http.ResponseWriter, r *http.Request) {
		// Prevent the frontend handler from catching /api or /uploads requests that somehow slipped through
		if strings.HasPrefix(r.URL.Path, "/api") || strings.HasPrefix(r.URL.Path, "/uploads") {
			http.NotFound(w, r)
			return
		}

		// Check if file exists, else serve index.html for React Router SPA
		if _, err := os.Stat(filepath.Join(distPath, r.URL.Path)); os.IsNotExist(err) {
			http.ServeFile(w, r, filepath.Join(distPath, "index.html"))
		} else {
			fs.ServeHTTP(w, r)
		}
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

	// Serve static files from the "uploads" directory
	workDir, _ := os.Getwd()
	filesDir := http.Dir(filepath.Join(workDir, "uploads"))
	FileServer(r, "/uploads", filesDir)

	r.Route("/api", func(r chi.Router) {
		// Public routes
		r.Post("/register", api.RegisterHandler)
		r.Post("/login", api.LoginHandler)
		r.Get("/products", api.GetProductsHandler)
		r.Get("/products/search", api.SearchProductsHandler)
		r.Get("/products/{id}", api.GetProductByIDHandler)

		// Protected routes
		r.Group(func(r chi.Router) {
			r.Use(api.AuthMiddleware)
			r.Get("/orders", api.GetOrdersHandler)
		})

		// Admin routes
		r.Group(func(r chi.Router) {
			r.Use(api.AuthMiddleware)
			r.Use(api.AdminMiddleware)
			r.Post("/products", api.CreateProductHandler)
			r.Delete("/products/{id}", api.DeleteProductHandler)

			// Admin user management
			r.Get("/admin/users", api.GetUsersHandler)
			r.Put("/admin/users/{email}/role", api.UpdateUserRoleHandler)
		})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}

// FileServer conveniently sets up a http.FileServer handler to serve
// static files from a http.FileSystem.
func FileServer(r chi.Router, path string, root http.FileSystem) {
	if strings.ContainsAny(path, "{}*") {
		panic("FileServer does not permit any URL parameters.")
	}

	if path != "/" && path[len(path)-1] != '/' {
		r.Get(path, http.RedirectHandler(path+"/", http.StatusMovedPermanently).ServeHTTP)
		path += "/"
	}
	path += "*"

	r.Get(path, func(w http.ResponseWriter, r *http.Request) {
		rctx := chi.RouteContext(r.Context())
		pathPrefix := strings.TrimSuffix(rctx.RoutePattern(), "/*")
		fs := http.StripPrefix(pathPrefix, http.FileServer(root))
		fs.ServeHTTP(w, r)
	})
}
