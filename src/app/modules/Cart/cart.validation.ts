import { z } from 'zod';

// Zod schema for the cart
const addToCartValidationSchema = z.object({
  body: z.object({
    user: z.string().min(1, 'User Id is required'),
    product: z.string().min(1, 'Product Id is required'),
    quantity: z.number().min(1, 'Quantity is required'),
  }),
});
export const cartValidationsSchema = {
  addToCartValidationSchema,
};
