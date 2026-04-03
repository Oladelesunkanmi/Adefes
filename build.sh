#!/bin/bash
set -e

echo "==> Building React frontend..."
cd frontend
npm install
npm run build
cd ..

echo "==> Copying dist into backend folder..."
rm -rf backend/frontend
mkdir -p backend/frontend
cp -r frontend/dist backend/frontend/dist

echo "==> Building Go binary..."
cd backend
go build -tags netgo -ldflags '-s -w' -o ../app .
cd ..

echo "==> Build complete!"