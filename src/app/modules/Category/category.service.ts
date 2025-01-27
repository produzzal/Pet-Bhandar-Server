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

//get single Category
const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findOne({ _id: id, isDeleted: false });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Category Found');
  }
  return result;
};

//update Product
const updateCategoryIntoDB = async (payload: TCategory, id: string) => {
  const category = await Category.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Category Found');
  }
  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Category Found');
  }
  return result;
};

//delete Category
const deleteCategoryFromDB = async (id: string) => {
  const category = await Category.findOne({ _id: id, isDeleted: false });
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Category Found');
  }
  const result = await Category.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Category Found');
  }
  return result;
};

export const CategoryServices = {
  createCategoryToDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
