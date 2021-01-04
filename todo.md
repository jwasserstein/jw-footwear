- Create routes
- Create models

# Routes
- sign in - POST /auth/signin
- sign up - POST /auth/signup
- list products - GET /products

# Models
- Products
    - name
    - price
    - rating
    - short description
    - long description
    - sizes in stock
    - reviews
- Reviews
    - author
    - rating
    - text
- Users
    - username
    - password
    - reviews
    - joinDate
    - orders
- Orders
    - purchaser
    - items

# Code to Share
- Auth routes
- Auth middelware
- User model
- Helper functions