import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
     name: { type: String, required: true, trim: true },
     description: String,
     price: { type: mongoose.Schema.Types.Decimal128, required: true },
     stock_quantity: { type: Number, required: true, min: 0 },
     image_url: { type: String, default: '' },
     is_new: { type: Boolean, default: true },
     category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
     created_at: { type: Date, default: Date.now },
     updated_at: { type: Date, default: Date.now }
 }, { timestamps: true });
 const product = mongoose.model('Product', ProductSchema);
 