// category.model.ts
import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true },
    image: { type: String, reqired: true },
    description: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Category = model<TCategory>('Category', categorySchema);
