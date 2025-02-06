import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import { auth } from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { CategoryValidation } from './category.validation';
import { CategoryControllers } from './category.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(CategoryValidation.categoryValidationSchema),
  CategoryControllers.createCategory,
);
router.get('/', CategoryControllers.getAllCategories);

router.get('/:id', CategoryControllers.getSingleCategory);

router.put(
  '/:id',
  validateRequest(CategoryValidation.updateCategoryValidationSchema),
  CategoryControllers.updateCategory,
);

router.delete('/:id', CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
