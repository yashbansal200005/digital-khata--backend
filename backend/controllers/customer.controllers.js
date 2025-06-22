import Customer from "../models/customer.models.js";
// ➕ Add Customer
export const addCustomer = async (req, res) => {
  try {
    const { name, firmName, city, state, mobileNumber, gstNumber } = req.body;
    console.log(req.body);

    // ✅ Input validation (basic)
    if (!name || !firmName || !city || !state || !mobileNumber) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // ✅ Check for duplicate based on compound key
    const existingCustomer = await Customer.findOne({
      mobileNumber,
      shopOwnerId: req.body.userId
    });

    if (existingCustomer) {
      return res.status(409).json({
        message: "Customer with this mobile number already exists for this shop owner."
      });
    }

    const newCustomer = new Customer({
      name, // Map `name` to `proprietorName` as per model
      firmName,
      city,
      state,
      mobileNumber,
      gstNumber,
      shopOwnerId: req.body.userId,
    });

    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    console.error("Add Customer Error:", err);

    if (err.code === 11000) {
      // Duplicate key error from MongoDB
      return res.status(409).json({ message: "Duplicate customer detected." });
    }

    res.status(500).json({ message: "Internal server error." });
  }
};
// 📋 Get All Customers by Shop Owner
export const getCustomersByShopOwner = async (req, res) => {
  try {
    const customers = await Customer.find({ shopOwnerId: req.body.userId });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// 🔍 Get One Customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update Customer
export const updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ Delete Customer
export const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
