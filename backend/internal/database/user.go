package database

import (
	"context"
	"fmt"
	"time"
)

type User struct {
	ID           int       `json:"id"`
	Name         string    `json:"name"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	CreatedAt    time.Time `json:"created_at"`
}

func CreateUser(name, email, passwordHash string) (*User, error) {
	if DB == nil {
		return nil, fmt.Errorf("database not connected")
	}

	query := `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, created_at`

	user := &User{
		Name:         name,
		Email:        email,
		PasswordHash: passwordHash,
	}

	err := DB.QueryRow(context.Background(), query, name, email, passwordHash).Scan(&user.ID, &user.CreatedAt)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func GetUserByEmail(email string) (*User, error) {
	if DB == nil {
		return nil, fmt.Errorf("database not connected")
	}

	query := `SELECT id, name, email, password_hash, created_at FROM users WHERE email = $1`

	user := &User{}
	err := DB.QueryRow(context.Background(), query, email).Scan(
		&user.ID, &user.Name, &user.Email, &user.PasswordHash, &user.CreatedAt,
	)
	if err != nil {
		return nil, err
	}

	return user, nil
}
