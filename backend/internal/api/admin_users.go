package api

import (
	"adefes-backend/internal/database"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func GetUsersHandler(w http.ResponseWriter, r *http.Request) {
	users, err := database.GetAllUsers()
	if err != nil {
		http.Error(w, "Failed to fetch users", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

type UpdateRoleRequest struct {
	Role string `json:"role"`
}

func UpdateUserRoleHandler(w http.ResponseWriter, r *http.Request) {
	email := chi.URLParam(r, "email")
	if email == "" {
		http.Error(w, "Email is required", http.StatusBadRequest)
		return
	}

	var req UpdateRoleRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Role != "admin" && req.Role != "user" {
		http.Error(w, "Invalid role", http.StatusBadRequest)
		return
	}

	err := database.UpdateUserRole(email, req.Role)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User role updated successfully"))
}
