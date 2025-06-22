import express from "express";
import authUser from "../middlewares/auth.middlewares.js";
import {
  registerShopOwner,
  loginShopOwner,
  logoutShopOwner,
  updateShopOwner,
  getShopOwnerById,
} from "../controllers/shopOwner.controllers.js";

const shopOwnerRoutes = express.Router();

shopOwnerRoutes.post("/register", registerShopOwner);
shopOwnerRoutes.post("/login", loginShopOwner);
shopOwnerRoutes.post("/logout", logoutShopOwner);
shopOwnerRoutes.put("/update/:id", authUser, updateShopOwner);
shopOwnerRoutes.get("/getdetails/:id",authUser,getShopOwnerById);


export default shopOwnerRoutes;