import { z } from 'zod';

// Validation schema for creating a product
const productValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().min(0, 'Price must be a non-negative number'),
    stockQuantity: z
      .number()
      .min(0, 'Stock quantity must be a non-negative integer'),
    category: z.string().min(1, 'Category is required'),
    productImages: z
      .array(z.string())
      .min(1, 'At least one product image is required'),
    isDeleted: z.boolean().optional(),
  }),
});

// Validation schema for updating a product
const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().min(0, 'Price must be a non-negative number').optional(),
    stockQuantity: z
      .number()
      .min(0, 'Stock quantity must be a non-negative integer')
      .optional(),
    category: z.string().optional(),
    productImages: z.array(z.string()).optional(),
  }),
});

export const ProductValidations = {
  productValidationSchema,
  updateProductValidationSchema,
};
