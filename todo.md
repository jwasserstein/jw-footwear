- Add input validation to create order route
    - Is the requested size actually in stock?
- Add billing fields for city, state, and country

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
    - shippingName
    - shippingAddress
    - shippingCity
    - shippingState
    - shippingCountry
    - billingName
    - billingAddress
    - billingCard
    - billingExpDate
    - billingSecCode

# Code to Share
- Auth routes
- Auth middelware
- User model
- Helper functions