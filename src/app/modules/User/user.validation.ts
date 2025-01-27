import { z } from 'zod';
import { USER_ROLE } from './user.constant';

const UserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }).trim(),
    email: z.string().email({ message: 'Invalid email address' }).trim(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .trim(),
    phone: z.string().min(1, { message: 'Phone number is required' }).trim(),
    address: z.string().min(1, { message: 'Address is required' }).trim(),
    role: z.nativeEnum(USER_ROLE, {
      message: "Role must be either 'admin' or 'user'",
    }),
    profilePicture: z
      .string()
      .url({ message: 'Invalid URL for profile picture' })
      .optional(),
    isActive: z.boolean().optional(),
  }),
});

export const UserValidation = {
  UserValidationSchema,
};
