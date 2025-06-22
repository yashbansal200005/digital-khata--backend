import express from "express";
import authUser from "../middlewares/auth.middlewares.js";
import {
  addCustomer,
  getCustomersByShopOwner,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from "../controllers/customer.controllers.js";

const customerRoutes = express.Router();

customerRoutes.post("/add", authUser, addCustomer);
customerRoutes.get("/shop", authUser, getCustomersByShopOwner);
customerRoutes.get("/get/:id", authUser, getCustomerById);
customerRoutes.put("/update/:id", authUser, updateCustomer);
customerRoutes.delete("/delete/:id", authUser, deleteCustomer);

export default customerRoutes;
