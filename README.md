# 📘 Digital Khata — Backend

This is the backend of **Digital Khata**, an all-in-one customer and financial management system designed for shop owners. It is built using **Node.js**, **Express.js**, and **MongoDB**, and provides a secure RESTful API to manage customers, invoices, receipts, and shop owner accounts.

🔗 **Frontend Repo (Optional):** _You can link it here if available._

---

## 🔧 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT Authentication**
- **RESTful API Architecture**

---

## 🚀 Features

### 🔐 Shop Owner APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/register` | Register a new shop owner |
| POST   | `/login`    | Login and receive JWT token |
| POST   | `/logout`   | Logout the current session |
| PUT    | `/update/:id` | Update shop owner details |
| GET    | `/getdetails/:id` | Fetch shop owner profile |

---

### 👥 Customer APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/add` | Add a new customer |
| GET    | `/shop` | Get all customers for the logged-in shop owner |
| GET    | `/get/:id` | Get a single customer by ID |
| PUT    | `/update/:id` | Update customer details |
| DELETE | `/delete/:id` | Delete a customer |

---

### 🧾 Invoice APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/add` | Create a new invoice |
| GET    | `/customer/:customerId` | Get invoices for a specific customer |
| GET    | `/shop` | Get all invoices for a shop owner |

---

### 💵 Receipt APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/add` | Create a new receipt |
| GET    | `/customer/:customerId` | Get receipts for a customer |
| GET    | `/shop/:shopOwnerId` | Get all receipts for a shop owner |

---

## 🔐 Authentication

- All routes (except `/register` and `/login`) are protected using **JWT-based authentication**.
- Middleware `authUser` is used to verify tokens and secure private routes.

---


