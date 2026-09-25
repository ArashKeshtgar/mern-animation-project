import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  imageUrl: string;
  stock: number;
  seller: Types.ObjectId;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  imageUrl: { type: String, required: true },
  stock: { type: Number, default: 100 },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProduct>('Product', ProductSchema);
