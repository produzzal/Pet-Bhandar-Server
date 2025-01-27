// category.validation.ts
import { z } from 'zod';

const categoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Category name is required').trim(),
    description: z.string().min(1, 'Category description is required').trim(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Category name is required').optional(),
    description: z
      .string()
      .min(1, 'Category description is required')
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const CategoryValidation = {
  categoryValidationSchema,
  updateCategoryValidationSchema,
};
