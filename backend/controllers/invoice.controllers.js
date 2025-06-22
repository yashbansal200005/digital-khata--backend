import Invoice from '../models/invoice.models.js';

// POST /api/invoices/
export const createInvoice = async (req, res) => {
  try {
    const {
      customerId,
      date,
      invoiceNumber,
      grossAmount,
      cgst,
      sgst,
      igst,
      otherCharges,
      totalAmount
    } = req.body;

    if (!customerId || !date || !invoiceNumber || !grossAmount || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const parseDDMMYYYY = (str) => {
  const [day, month, year] = str.split('/');
  return new Date(`${year}-${month}-${day}`);
};

const parsedDate = parseDDMMYYYY(date);
if (isNaN(parsedDate)) {
  return res.status(400).json({ message: "Invalid date format" });
}
    const day = parsedDate.toLocaleDateString('en-IN', { weekday: 'long' });
    const invoice = new Invoice({
      customerId,
      date:parsedDate,
      day,
      invoiceNumber,
      grossAmount,
      cgst,
      sgst,
      igst,
      otherCharges,
      totalAmount,
      shopOwnerId: req.body.userId // auth middleware sets this
    });
    

    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Invoice number already exists for this shop owner."
      });
    }
    res.status(400).json({ message: error.message });
  }
};


// GET /api/invoices/customer/:customerId
export const getInvoicesByCustomer = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      customerId: req.params.customerId,
      shopOwnerId: req.body.userId
    });
    
    // Always return an array, even if empty
    res.status(200).json(invoices);
  } catch (error) {
    // Return an empty array on error instead of an error object
    console.error("Error fetching invoices:", error);
    res.status(500).json([]);
  }
};

export const getInvoicesByShopOwner = async (req, res) => {
  try {
    const invoices = await Invoice.find({ shopOwnerId: req.body.userId });
    res.status(200).json(invoices || []);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json([]);
  }
};
