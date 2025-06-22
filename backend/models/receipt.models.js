import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  date: { type: Date, required: true }, // Store as Date object
  day: { type: String, required: true }, // Computed from date
  receiptNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentType: { type: String, required: true }, // ✅ New required string field
  shopOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopOwner',
    required: true
  }
}, { timestamps: true });

// ✅ Compound index to ensure unique receiptNumber per shopOwner
receiptSchema.index({ receiptNumber: 1, shopOwnerId: 1 }, { unique: true });

export default mongoose.model('Receipt', receiptSchema);
