import express from "express";
import authUser from "../middlewares/auth.middlewares.js";
import {
  createInvoice,
  getInvoicesByCustomer,
  getInvoicesByShopOwner
} from "../controllers/invoice.controllers.js";

const invoiceRoutes = express.Router();

invoiceRoutes.post("/add", authUser, createInvoice);
invoiceRoutes.get("/customer/:customerId", authUser, getInvoicesByCustomer);
invoiceRoutes.get("/shop", authUser, getInvoicesByShopOwner);

export default invoiceRoutes;
