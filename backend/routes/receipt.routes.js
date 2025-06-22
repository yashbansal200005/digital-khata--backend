import express from "express";
import authUser from "../middlewares/auth.middlewares.js";
import {
  createReceipt,
  getReceiptsByCustomer,
  getReceiptsByShopOwner
} from "../controllers/receipt.controllers.js";

const receiptRoutes = express.Router();

receiptRoutes.post("/add", authUser,createReceipt);
receiptRoutes.get("/customer/:customerId",authUser, getReceiptsByCustomer);
receiptRoutes.get("/shop/:shopOwnerId",authUser, getReceiptsByShopOwner);

export default receiptRoutes;