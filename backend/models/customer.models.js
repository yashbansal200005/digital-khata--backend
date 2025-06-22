import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  firmName: { type: String, required: true },
  name: { type: String, required: true }, 
  mobileNumber: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  gstNumber: { type: String },
  shopOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopOwner',
    required: true
  }
}, { timestamps: true });

// ✅ Unique constraint on (mobileNumber + shopOwnerId)
customerSchema.index({ mobileNumber: 1, shopOwnerId: 1 }, { unique: true });

export default mongoose.model('Customer', customerSchema);
