import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';

//create Product
const createProductIntoDB = async (payload: TProduct) => {
  const duplicateProduct = await Product.find({ name: payload.name });
  if (duplicateProduct.length > 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Same product already exist');
  }
  const result = await Product.create(payload);
  return result;
};

// Get all products with optional search and category filters
const getAllProductsFromDB = async (search: string, category: string) => {
  let filter: any = { isDeleted: false };

  // Apply search filter (case-insensitive)
  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  // Apply category filter (only if category is provided)
  if (category && category !== 'all') {
    filter.category = category;
  }

  const result = await Product.find(filter);

  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Products Found');
  }

  return result;
};

//get single Product
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id, isDeleted: false });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Product Found');
  }
  return result;
};

//update Product
const updateProductIntoDB = async (payload: TProduct, id: string) => {
  const product = await Product.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'No product Found');
  }
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Product Found');
  }
  return result;
};

//delete Product
const deleteProductFromDB = async (id: string) => {
  const product = await Product.findOne({ _id: id, isDeleted: false });
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Product Found');
  }
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
