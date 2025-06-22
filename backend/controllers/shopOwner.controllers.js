// controllers/shopOwner.controller.js
import ShopOwner from "../models/shopOwner.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Register Shop Owner
export const registerShopOwner = async (req, res) => {
  try {
    const { shopName, proprietorName, gstNumber, mobileNumber, password } = req.body;

    // 🔍 Log the incoming request body
    console.log("Received registration data:", req.body);

    // ✅ Basic validation check
    if (!shopName || !proprietorName || !mobileNumber || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // 🔄 Check for existing mobile number
    const existingOwner = await ShopOwner.findOne({ mobileNumber });
    if (existingOwner) {
      return res.status(400).json({ message: "Mobile number already registered" });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🆕 Create new shop owner
    const newOwner = new ShopOwner({
      shopName,
      proprietorName,
      gstNumber,
      mobileNumber,
      password: hashedPassword,
    });

    await newOwner.save();

    // ✅ Respond success
    res.status(201).json({ message: "Shop owner registered successfully" });

  } catch (err) {
    console.error("Error in registerShopOwner:", err);
    res.status(500).json({ message: err.message });
  }
};

// Login Shop Owner
// export const loginShopOwner = async (req, res) => {
//   try {
//     const { mobileNumber, password } = req.body;
//     const owner = await ShopOwner.findOne({ mobileNumber });
//     if (!owner) return res.status(404).json({ message: "Shop owner not found" });

//     const isMatch = await bcrypt.compare(password, owner.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
   
//     const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//     res.cookie("token", token, { httpOnly: true });
//     const ownerObj = owner.toObject();
//     delete ownerObj.password;
//     res.status(200).json({ shopOwner: ownerObj });
    
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// controllers/shopOwner.controller.js
export const loginShopOwner = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;
    const owner = await ShopOwner.findOne({ mobileNumber });
    
    if (!owner) return res.status(404).json({ message: "Shop owner not found" });

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
   
    const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    // Return proper response structure
    res.status(200).json({
      shopOwner: {
        _id: owner._id,
        shopName: owner.shopName,
        proprietorName: owner.proprietorName,
        mobileNumber: owner.mobileNumber
      },
      token
    });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Logout Shop Owner
export const logoutShopOwner = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

// Update Shop Owner

export const updateShopOwner = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // 🔐 Hash password if being updated
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedOwner = await ShopOwner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    // 🛡️ Exclude password from response
    const { password, ...ownerWithoutPassword } = updatedOwner.toObject();

    res.status(200).json(ownerWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getShopOwnerById = async (req, res) => {
  try {
    const { id } = req.params;

    const owner = await ShopOwner.findById(id).select("-password"); // Exclude password
    if (!owner) {
      return res.status(404).json({ message: "Shop owner not found" });
    }

    res.status(200).json(owner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



