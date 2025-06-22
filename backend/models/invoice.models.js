import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  date: { type: Date, required: true }, // Store as Date
  day: { type: String, required: true },
  invoiceNumber: { type: String, required: true },
  grossAmount: { type: Number, required: true },
  cgst: { type: Number },
  sgst: { type: Number },
  igst: { type: Number },
  otherCharges: { type: Number },
  totalAmount: { type: Number, required: true },
  shopOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopOwner',
    required: true
  }
}, {
  timestamps: true
});

// ✅ Custom validator: either CGST+SGST or IGST (but not both/neither)
invoiceSchema.pre('validate', function (next) {
  const hasCGST_SGST = this.cgst !== undefined && this.sgst !== undefined;
  const hasIGST = this.igst !== undefined;

  if ((hasCGST_SGST && hasIGST) || (!hasCGST_SGST && !hasIGST)) {
    return next(new Error("Either CGST and SGST (both) or IGST must be provided, but not both or neither."));
  }

  next();
});

// ✅ Compound unique index
invoiceSchema.index({ invoiceNumber: 1, shopOwnerId: 1 }, { unique: true });

export default mongoose.model('Invoice', invoiceSchema);
