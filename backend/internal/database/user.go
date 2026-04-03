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
	Role         string    `json:"role"`
	CreatedAt    time.Time `json:"created_at"`
}

func CreateUser(name, email, passwordHash string) (*User, error) {
	if DB == nil {
		return nil, fmt.Errorf("database not connected")
	}

	query := `INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, 'user') RETURNING id, role, created_at`

	user := &User{
		Name:         name,
		Email:        email,
		PasswordHash: passwordHash,
	}

	err := DB.QueryRow(context.Background(), query, name, email, passwordHash).Scan(&user.ID, &user.Role, &user.CreatedAt)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func GetUserByEmail(email string) (*User, error) {
	if DB == nil {
		return nil, fmt.Errorf("database not connected")
	}

	query := `SELECT id, name, email, password_hash, role, created_at FROM users WHERE email = $1`

	user := &User{}
	err := DB.QueryRow(context.Background(), query, email).Scan(
		&user.ID, &user.Name, &user.Email, &user.PasswordHash, &user.Role, &user.CreatedAt,
	)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func GetAllUsers() ([]User, error) {
	if DB == nil {
		return nil, fmt.Errorf("database not connected")
	}

	query := `SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC`

	rows, err := DB.Query(context.Background(), query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var user User
		err := rows.Scan(&user.ID, &user.Name, &user.Email, &user.Role, &user.CreatedAt)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}

func UpdateUserRole(email string, role string) error {
	if DB == nil {
		return fmt.Errorf("database not connected")
	}

	query := `UPDATE users SET role = $1 WHERE email = $2`
	tag, err := DB.Exec(context.Background(), query, role, email)
	if err != nil {
		return err
	}

	if tag.RowsAffected() == 0 {
		return fmt.Errorf("no user found with email: %s", email)
	}

	return nil
}
