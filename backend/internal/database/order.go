package database

import (
	"context"
	"fmt"
	"time"
)

type Order struct {
	ID          int         `json:"id"`
	UserID      int         `json:"user_id"`
	TotalAmount float64     `json:"total_amount"`
	Status      string      `json:"status"`
	CreatedAt   time.Time   `json:"created_at"`
	Items       []OrderItem `json:"items,omitempty"`
}

type OrderItem struct {
	ID              int     `json:"id"`
	OrderID         int     `json:"order_id"`
	ProductID       int     `json:"product_id"`
	Quantity        int     `json:"quantity"`
	PriceAtPurchase float64 `json:"price_at_purchase"`
}

func CreateOrder(userID int, totalAmount float64, items []OrderItem) (*Order, error) {
	if DB == nil {
		return nil, fmt.Errorf("database not connected")
	}

	ctx := context.Background()
	tx, err := DB.Begin(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to start transaction: %w", err)
	}
	defer tx.Rollback(ctx)

	// Create order
	var order Order
	query := `INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING id, status, created_at`
	err = tx.QueryRow(ctx, query, userID, totalAmount, "pending").Scan(&order.ID, &order.Status, &order.CreatedAt)
	if err != nil {
		return nil, fmt.Errorf("failed to insert order: %w", err)
	}
	order.UserID = userID
	order.TotalAmount = totalAmount

	// Create order items
	for i := range items {
		itemQuery := `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4) RETURNING id`
		err = tx.QueryRow(ctx, itemQuery, order.ID, items[i].ProductID, items[i].Quantity, items[i].PriceAtPurchase).Scan(&items[i].ID)
		if err != nil {
			return nil, fmt.Errorf("failed to insert order item: %w", err)
		}
		items[i].OrderID = order.ID
	}

	if err := tx.Commit(ctx); err != nil {
		return nil, fmt.Errorf("failed to commit transaction: %w", err)
	}

	order.Items = items
	return &order, nil
}
