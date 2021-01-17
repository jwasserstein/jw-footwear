- Add input validation to create order route
    - Is the requested size actually in stock?
    - Is the credit card number the correct length?
    - Is the state a 2 letter abbreviation?
    - Are the expiration date and security code formatted correctly?

# Routes
- sign in - POST /auth/signin
- sign up - POST /auth/signup
- list products - GET /products
- add product - POST /products
- place order - POST /orders
- list order history - GET /orders

# Models
- Products
    - name
    - price
    - rating
    - short description
    - long description
    - sizes in stock
    - image url
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
    - user
    - items
    - subTotal
    - shipping
    - taxes
    - name
    - address
    - city
    - state
    - card (last 4 only)
    - expDate
    - decCode

# Code to Share
- Auth routes
- Auth middelware
- User model
- Helper functions