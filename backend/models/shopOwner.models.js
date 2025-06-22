// models/ShopOwner.js
import mongoose from 'mongoose';

const shopOwnerSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  proprietorName: { type: String, required: true },
  gstNumber: { type: String },
  mobileNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // ✅ Add this line
}, {
  timestamps: true
});

export default mongoose.model('ShopOwner', shopOwnerSchema);
