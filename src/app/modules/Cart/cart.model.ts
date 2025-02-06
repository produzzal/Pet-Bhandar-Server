import mongoose, { Schema } from 'mongoose';
import { TCart } from './cart.interface';

const CartSchema = new Schema<TCart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1, // Set default quantity to 1
    },
  },
  {
    timestamps: true,
  },
);

const Cart = mongoose.model<TCart>('Cart', CartSchema);

export default Cart;
