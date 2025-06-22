Digital Khata — Backend
This is the backend of Digital Khata, an all-in-one customer and financial management system for shop owners. It is built using Node.js, Express.js, and MongoDB, and provides a secure API for managing customers, invoices, receipts, and shop owner accounts.

🔧 Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- RESTful API architecture

🚀 Features

🔐 Shop Owner APIs

- `POST /register` – Register a new shop owner  
- `POST /login` – Login and receive JWT token  
- `POST /logout` – Logout the current session  
- `PUT /update/:id` – Update shop owner details  
- `GET /getdetails/:id` – Fetch shop owner profile  

👥 Customer APIs

- `POST /add` – Add a new customer  
- `GET /shop` – Get all customers for the logged-in shop owner  
- `GET /get/:id` – Get a single customer by ID  
- `PUT /update/:id` – Update customer details  
- `DELETE /delete/:id` – Delete a customer  

🧾 Invoice APIs

- `POST /add` – Create a new invoice  
- `GET /customer/:customerId` – Get invoices for a customer  
- `GET /shop` – Get all invoices for a shop owner  

💵 Receipt APIs

- `POST /add` – Create a new receipt  
- `GET /customer/:customerId` – Get receipts for a customer  
- `GET /shop/:shopOwnerId` – Get all receipts for a shop owner  

🔐 Authentication

- All APIs (except login and register) require authentication via JWT.
- Middleware `authUser` is used to protect private routes.

🛠 Setup Instructions
git clone https://github.com/yashbansal200005/digital-khata--backend.git
cd digital-khata--backend
npm install

Create a .env file and add:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
