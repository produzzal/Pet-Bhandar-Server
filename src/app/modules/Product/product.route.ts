import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import { auth } from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidations } from './product.validation';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(ProductValidations.productValidationSchema),
  ProductControllers.createProduct,
);

router.get('/', ProductControllers.getAllProducts);

router.get('/:id', ProductControllers.getSingleProduct);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct,
);

router.delete('/:id', auth(USER_ROLE.admin), ProductControllers.deleteProduct);

export const ProductRoutes = router;
