import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import { auth } from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { cartValidationsSchema } from './cart.validation';
import { cartControllers } from './cart.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(cartValidationsSchema.addToCartValidationSchema),
  cartControllers.addToCart,
);

router.get('/', cartControllers.getUserCartItems);

router.patch('/', cartControllers.updateCartItem);

router.delete('/', cartControllers.deleteCartItem);
export const CartRoutes = router;
