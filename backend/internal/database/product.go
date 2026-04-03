package database

import (
	"context"
	"fmt"
	"strings"
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
	{ID: 1, Name: "Royal Gold Agbada", Description: "Grand three-piece Agbada ensemble in premium guinea brocade with heavy gold hand-stitched embroidery. Perfect for weddings and owambe celebrations.", Price: 185000, ImageURL: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?auto=format&fit=crop&q=80&w=800", Category: "Agbada", Stock: 8, CreatedAt: time.Now()},
	{ID: 2, Name: "Ivory Classic Agbada", Description: "Elegant ivory white Agbada crafted from premium aso-oke fabric with silver embroidery detailing on chest and sleeves.", Price: 165000, ImageURL: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&q=80&w=800", Category: "Agbada", Stock: 12, CreatedAt: time.Now()},
	{ID: 3, Name: "Navy Senator Style", Description: "Sharp fitted Senator outfit in premium Italian fabric. Clean lines with subtle embroidery on collar and cuffs for a modern professional look.", Price: 95000, ImageURL: "https://images.unsplash.com/photo-1617137968427-b2b241db6c8a?auto=format&fit=crop&q=80&w=800", Category: "Senator", Stock: 15, CreatedAt: time.Now()},
	{ID: 4, Name: "Emerald Kaftan Set", Description: "Flowing emerald green Kaftan with matching trousers and cap. Lightweight damask fabric with geometric embroidery pattern.", Price: 78000, ImageURL: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800", Category: "Kaftan", Stock: 20, CreatedAt: time.Now()},
	{ID: 5, Name: "Burgundy Grand Agbada", Description: "Statement burgundy Agbada in guinea brocade with contrasting gold thread work. Three-piece set including sokoto and fila cap.", Price: 210000, ImageURL: "https://images.unsplash.com/photo-1590735213408-9dab8c6fa55e?auto=format&fit=crop&q=80&w=800", Category: "Agbada", Stock: 5, CreatedAt: time.Now()},
	{ID: 6, Name: "Charcoal Senator Suit", Description: "Modern charcoal Senator wear with mandarin collar. Tailored from premium wool blend with hand-finished details.", Price: 88000, ImageURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800", Category: "Senator", Stock: 18, CreatedAt: time.Now()},
	{ID: 7, Name: "Cream Kaftan Elegance", Description: "Classic cream Kaftan in soft damask fabric with delicate silver embroidery. Perfect for Friday prayers and casual celebrations.", Price: 65000, ImageURL: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&q=80&w=800", Category: "Kaftan", Stock: 22, CreatedAt: time.Now()},
	{ID: 8, Name: "Embroidered Fila Cap", Description: "Hand-crafted traditional fila cap in white with intricate gold embroidery. The perfect finishing touch for any Agbada or Kaftan outfit.", Price: 15000, ImageURL: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800", Category: "Accessories", Stock: 30, CreatedAt: time.Now()},
	{ID: 9, Name: "Coral Bead Necklace", Description: "Authentic Nigerian coral bead necklace for men. Multi-strand design traditionally worn with Agbada for ceremonial occasions.", Price: 45000, ImageURL: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=800", Category: "Accessories", Stock: 10, CreatedAt: time.Now()},
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

func SearchProducts(queryStr string) ([]Product, error) {
	if DB == nil {
		// Search sample products
		var filtered []Product

		// Simple mock search in memory
		for _, p := range sampleProducts {
			if strings.Contains(strings.ToLower(p.Name), strings.ToLower(queryStr)) ||
				strings.Contains(strings.ToLower(p.Description), strings.ToLower(queryStr)) {
				filtered = append(filtered, p)
			}
		}
		return filtered, nil
	}

	searchPattern := "%" + queryStr + "%"
	sqlQuery := `SELECT id, name, description, price, image_url, category, stock, created_at FROM products 
	             WHERE name ILIKE $1 OR description ILIKE $1 
	             ORDER BY created_at DESC`

	rows, err := DB.Query(context.Background(), sqlQuery, searchPattern)
	if err != nil {
		return nil, err
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

	return products, nil
}

func CreateProduct(p *Product) error {
	if DB == nil {
		p.ID = len(sampleProducts) + 1
		p.CreatedAt = time.Now()
		sampleProducts = append([]Product{*p}, sampleProducts...)
		return nil
	}

	query := `INSERT INTO products (name, description, category, price, image_url, stock) 
	          VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, created_at`

	err := DB.QueryRow(context.Background(), query, p.Name, p.Description, p.Category, p.Price, p.ImageURL, p.Stock).Scan(&p.ID, &p.CreatedAt)
	if err != nil {
		return err
	}

	return nil
}

func DeleteProduct(id int) error {
	if DB == nil {
		for i, p := range sampleProducts {
			if p.ID == id {
				sampleProducts = append(sampleProducts[:i], sampleProducts[i+1:]...)
				return nil
			}
		}
		return fmt.Errorf("product not found in memory")
	}

	query := `DELETE FROM products WHERE id = $1`
	result, err := DB.Exec(context.Background(), query, id)
	if err != nil {
		return err
	}

	if result.RowsAffected() == 0 {
		return fmt.Errorf("no product found with ID %d", id)
	}

	return nil
}
