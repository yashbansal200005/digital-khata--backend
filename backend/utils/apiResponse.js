// utils/apiResponse.js
exports.successResponse = (res, data) => {
  res.status(200).json(data || []);
};

exports.errorResponse = (res, error) => {
  console.error(error);
  res.status(500).json([]);
};

// In controller
const { successResponse, errorResponse } = require('../utils/apiResponse');

exports.getInvoicesByCustomer = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      customerId: req.params.customerId,
      shopOwnerId: req.body.userId
    });
    successResponse(res, invoices);
  } catch (error) {
    errorResponse(res, error);
  }
};