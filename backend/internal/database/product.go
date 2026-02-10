package database

import (
	"context"
	"fmt"
	"time"
)

type Product struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Price       float64   `json:"price"`
	ImageURL    string    `json:"image_url"`
	Category    string    `json:"category"`
	Stock       int       `json:"stock"`
	CreatedAt   time.Time `json:"created_at"`
}

// Sample products for demo (in-memory fallback when DB is not connected)
var sampleProducts = []Product{
	{ID: 1, Name: "Cashmere Sweater", Description: "Luxurious cashmere blend sweater with ribbed details", Price: 189.00, ImageURL: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800", Category: "Women", Stock: 15, CreatedAt: time.Now()},
	{ID: 2, Name: "Tailored Blazer", Description: "Classic double-breasted blazer in premium wool", Price: 329.00, ImageURL: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800", Category: "Women", Stock: 8, CreatedAt: time.Now()},
	{ID: 3, Name: "Silk Midi Dress", Description: "Flowing silk dress with subtle floral print", Price: 245.00, ImageURL: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800", Category: "Women", Stock: 12, CreatedAt: time.Now()},
	{ID: 4, Name: "Leather Jacket", Description: "Timeless leather jacket with asymmetric zipper", Price: 459.00, ImageURL: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800", Category: "Women", Stock: 6, CreatedAt: time.Now()},
	{ID: 5, Name: "Oxford Shirt", Description: "Premium cotton oxford shirt with button-down collar", Price: 89.00, ImageURL: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800", Category: "Men", Stock: 20, CreatedAt: time.Now()},
	{ID: 6, Name: "Wool Trench Coat", Description: "Double-breasted trench coat in Italian wool", Price: 549.00, ImageURL: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800", Category: "Men", Stock: 5, CreatedAt: time.Now()},
	{ID: 7, Name: "Merino Cardigan", Description: "Lightweight merino wool cardigan with horn buttons", Price: 159.00, ImageURL: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800", Category: "Men", Stock: 18, CreatedAt: time.Now()},
	{ID: 8, Name: "Leather Messenger Bag", Description: "Full-grain leather messenger with brass hardware", Price: 279.00, ImageURL: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800", Category: "Accessories", Stock: 10, CreatedAt: time.Now()},
	{ID: 9, Name: "Silk Scarf", Description: "Hand-rolled silk scarf with geometric pattern", Price: 95.00, ImageURL: "https://images.unsplash.com/photo-1601224113738-21b0fc0b9366?auto=format&fit=crop&q=80&w=800", Category: "Accessories", Stock: 25, CreatedAt: time.Now()},
}

func GetProducts() ([]Product, error) {
	if DB == nil {
		// Return sample products when DB is not connected
		return sampleProducts, nil
	}

	query := `SELECT id, name, description, price, image_url, category, stock, created_at FROM products ORDER BY created_at DESC`

	rows, err := DB.Query(context.Background(), query)
	if err != nil {
		// Fallback to sample products on error
		return sampleProducts, nil
	}
	defer rows.Close()

	var products []Product
	for rows.Next() {
		var p Product
		err := rows.Scan(&p.ID, &p.Name, &p.Description, &p.Price, &p.ImageURL, &p.Category, &p.Stock, &p.CreatedAt)
		if err != nil {
			continue
		}
		products = append(products, p)
	}

	if len(products) == 0 {
		return sampleProducts, nil
	}

	return products, nil
}

func GetProductByID(id int) (*Product, error) {
	if DB == nil {
		// Search sample products
		for _, p := range sampleProducts {
			if p.ID == id {
				return &p, nil
			}
		}
		return nil, fmt.Errorf("product not found")
	}

	query := `SELECT id, name, description, price, image_url, category, stock, created_at FROM products WHERE id = $1`

	var p Product
	err := DB.QueryRow(context.Background(), query, id).Scan(
		&p.ID, &p.Name, &p.Description, &p.Price, &p.ImageURL, &p.Category, &p.Stock, &p.CreatedAt,
	)

	if err != nil {
		// Fallback to sample products
		for _, sp := range sampleProducts {
			if sp.ID == id {
				return &sp, nil
			}
		}
		return nil, fmt.Errorf("product not found")
	}

	return &p, nil
}
