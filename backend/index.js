// server.js
import express from "express";
import shopOwnerRoutes from './routes/shopOwner.routes.js';
import customerRoutes from './routes/customer.routes.js';
import invoiceRoutes from './routes/invoice.routes.js';
import receiptRoutes from './routes/receipt.routes.js';
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.config.js";
import dotenv from 'dotenv';


const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
// Middleware (optional)
app.use(express.json()); // to parse JSON request bodies
app.use(cookieParser());
dotenv.config();
// Basic route
app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/shopowners', shopOwnerRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/receipts', receiptRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
