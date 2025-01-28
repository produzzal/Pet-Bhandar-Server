import { z } from 'zod';

const orderValidationSchema = z.object({
  body: z.object({
    customerName: z.string(),
    customerPhone: z.string(),
    customerAddress: z.string(),
    products: z.array(
      z.object({
        product: z.string(),
        quantity: z
          .number()

          .min(1, 'Quantity must be at least 1')
          .int('Quantity must be an integer'),
      }),
    ),
    totalAmount: z
      .number()

      .min(0, 'Total amount must be a non-negative number'),
  }),
});

const updateStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([
      'Pending',
      'Processing',
      'Shipped',
      'Delivered',
      'Cancelled',
    ]),
  }),
});

export const OrderValidations = {
  orderValidationSchema,
  updateStatusValidationSchema,
};
