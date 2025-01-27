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

//get all Products
const getAllCategoriesFromDB = async () => {
  const result = await Category.find({ isDeleted: false });
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Category Found');
  }
  return result;
};

export const CategoryServices = {
  createCategoryToDB,
  getAllCategoriesFromDB,
};
