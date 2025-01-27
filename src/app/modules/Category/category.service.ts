import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryToDB = async (payload: TCategory) => {
  const existingCategory = await Category.findOne({ name: payload.name });
  if (existingCategory) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Category already exists');
  }
  const category = new Category(payload);
  await category.save();
  return category;
};

export const CategoryServices = {
  createCategoryToDB,
};
