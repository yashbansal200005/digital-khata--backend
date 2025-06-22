import Receipt from "../models/receipt.models.js";

// Utility function to convert DD/MM/YYYY → Date object
const parseDDMMYYYY = (str) => {
  const [day, month, year] = str.split('/');
  return new Date(`${year}-${month}-${day}`);
};

// POST /api/receipts
export const createReceipt = async (req, res) => {
  try {
    const { customerId, date,paymentType, receiptNumber, amount } = req.body;

    if (!customerId || !date || !receiptNumber || !amount||!paymentType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const parsedDate = parseDDMMYYYY(date);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ message: "Invalid date format" });
    }
     const day = parsedDate.toLocaleDateString('en-IN', { weekday: 'long' });

    const receipt = new Receipt({
      customerId,
      date: parsedDate,
      day,
      paymentType,
      receiptNumber,
      amount,
      shopOwnerId: req.body.userId 
    });

    await receipt.save();
    res.status(201).json(receipt);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Receipt number already exists for this shop owner"
      });
    }
    res.status(400).json({ message: error.message });
  }
};

// GET /api/receipts/customer/:customerId
export const getReceiptsByCustomer = async (req, res) => {
  try {
    const receipts = await Receipt.find({
      customerId: req.params.customerId,
      shopOwnerId: req.user._id
    });
    res.status(200).json(receipts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/receipts/shop/:shopOwnerId
export const getReceiptsByShopOwner = async (req, res) => {
  try {
    // Optional: use req.user._id instead of req.params.shopOwnerId to ensure authenticated context
    const receipts = await Receipt.find({
      shopOwnerId: req.params.shopOwnerId
    });
    res.status(200).json(receipts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
