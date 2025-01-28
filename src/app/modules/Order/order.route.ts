import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import { auth } from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { OrderValidations } from './order.validation';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(OrderValidations.orderValidationSchema),
  OrderControllers.createOrder,
);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(OrderValidations.updateStatusValidationSchema),
  OrderControllers.updateOrderStatus,
);

export const OrderRoutes = router;
