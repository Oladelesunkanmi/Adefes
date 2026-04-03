package api

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"adefes-backend/internal/database"

	"github.com/go-chi/chi/v5"
)

func GetProductsHandler(w http.ResponseWriter, r *http.Request) {
	products, err := database.GetProducts()
	if err != nil {
		http.Error(w, "Failed to fetch products", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

func GetProductByIDHandler(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid product ID", http.StatusBadRequest)
		return
	}

	product, err := database.GetProductByID(id)
	if err != nil {
		http.Error(w, "Product not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(product)
}

func SearchProductsHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")
	if query == "" {
		http.Error(w, "Query parameter 'q' is required", http.StatusBadRequest)
		return
	}

	products, err := database.SearchProducts(query)
	if err != nil {
		http.Error(w, "Failed to search products", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

func CreateProductHandler(w http.ResponseWriter, r *http.Request) {
	// 10MB max memory
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		http.Error(w, "Failed to parse form", http.StatusBadRequest)
		return
	}

	name := r.FormValue("name")
	description := r.FormValue("description")
	category := r.FormValue("category")
	priceStr := r.FormValue("price")
	stockStr := r.FormValue("stock")

	price, _ := strconv.ParseFloat(priceStr, 64)
	stock, _ := strconv.Atoi(stockStr)

	// Handle file upload
	file, handler, err := r.FormFile("image")
	var imageURL string

	if err == nil {
		defer file.Close()

		// Create unique filename
		filename := fmt.Sprintf("%d_%s", time.Now().Unix(), handler.Filename)
		filePath := filepath.Join("uploads", filename)

		dst, err := os.Create(filePath)
		if err != nil {
			http.Error(w, "Failed to save image", http.StatusInternalServerError)
			return
		}
		defer dst.Close()

		if _, err := io.Copy(dst, file); err != nil {
			http.Error(w, "Failed to copy image", http.StatusInternalServerError)
			return
		}

		imageURL = "/uploads/" + filename
	} else {
		// Fallback to image_url if provided (for backward compatibility or remote links)
		imageURL = r.FormValue("image_url")
	}

	p := database.Product{
		Name:        name,
		Description: description,
		Category:    category,
		Price:       price,
		Stock:       stock,
		ImageURL:    imageURL,
	}

	if err := database.CreateProduct(&p); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(p)
}

func DeleteProductHandler(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid product ID", http.StatusBadRequest)
		return
	}

	if err := database.DeleteProduct(id); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
