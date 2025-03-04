E-Commerce API Documentation

Overview
This API provides authentication, product management, order handling, cart operations, and additional features for an e-commerce platform.

# Base URL

Production: https://personal-marilin-noornazar-783f0577.koyeb.app

# CORS Policy

Only requests from http://localhost:3000 are allowed.

# Authentication Routes

POST /auth/signup - Register a new user

GET /auth/verify-email - Verify email address

POST /auth/login - Authenticate user and return JWT tokens

POST /auth/forget-password - Send password reset email

POST /auth/reset-password - Reset user password

GET /auth/protected - Access protected route (JWT required)

POST /auth/refresh - Refresh JWT access token

GET /auth/google/login - Google OAuth login

GET /auth/google/callback - Google OAuth callback

POST /auth/signout - Logout user

# Mail Service

POST /mail/send-verification - Send email verification link

# Product Management

POST /products - Create a new product

GET /products - Retrieve all products

GET /products/{id} - Retrieve a product by ID

PATCH /products/{id} - Update a product

DELETE /products/{id} - Delete a product

# Category Management

POST /categories - Create a new category

GET /categories - Retrieve all categories

GET /categories/{id} - Retrieve a category by ID

PATCH /categories/{id} - Update a category

DELETE /categories/{id} - Delete a category

# Cart Operations

GET /cart - Get cart details

POST /cart - Add item to cart

PATCH /cart/{itemId} - Update cart item

DELETE /cart/{itemId} - Remove item from cart

# Wishlist Operations

GET /wishlist - Retrieve wishlist items

POST /wishlist - Add item to wishlist

DELETE /wishlist/{itemId} - Remove item from wishlist

# Order Management

POST /orders - Create an order

GET /orders - Retrieve all orders

GET /orders/{id} - Retrieve order by ID

PATCH /orders/{id}/status - Update order status

PATCH /orders/{id}/payment - Update order payment status

# Address Management

POST /address - Add a new address

GET /address - Retrieve all addresses

PATCH /address/{id} - Update address details

DELETE /address/{id} - Remove an address

# Reviews & Ratings

POST /review - Submit a new review

GET /review - Retrieve all reviews

GET /review/{productId} - Retrieve reviews for a product

PATCH /review/{id} - Update a review

DELETE /review/{id} - Delete a review

## Product Extras

# Variants

POST /products/extras/variants - Add product variant

GET /products/extras/variants/{productId} - Get product variants

PATCH /products/extras/variants/{id} - Update product variant

DELETE /products/extras/variants/{id} - Delete product variant

# Discounts

POST /products/extras/discounts - Add product discount

GET /products/extras/discounts/{productId} - Get product discounts

PATCH /products/extras/discounts/{id} - Update product discount

DELETE /products/extras/discounts/{id} - Delete product discount

# Available DTOs (Data Transfer Objects)

CreateUserDto

CreateProductDto

UpdateProductDto

CreateCategoryDto

UpdateCategoryDto

AddToCartDto

UpdateCartItemDto

CreateWishlistDto

CreateOrderDto

UpdateOrderStatusDto

CreateAddressDto

UpdateAddressDto

CreateReviewDto

UpdateReviewDto

CreateVariantDto

UpdateVariantDto

CreateDiscountDto

UpdateDiscountDto

Setup & Installation

# Prerequisites

Node.js (>=14.x)

NestJS CLI

PostgreSQL / MySQL Database

Installation Steps

# Clone the repository

git clone https://github.com/your-repo-url.git
cd e-commerce-api

# Install dependencies

npm install

# Set up environment variables

cp .env.example .env

# Run database migrations

npm run migrate

# Start the server

npm run start:dev

Authentication & Security

This API uses JWT Authentication. To access protected routes, include the Bearer Token in your request headers:

# Authorization: Bearer YOUR_ACCESS_TOKEN

License

MIT License
