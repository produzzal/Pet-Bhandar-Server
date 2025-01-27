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

//get all Proudcts
const getAllProductsFromDB = async () => {
  const result = await Product.find({ isDeleted: false });
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Product Found');
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

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
};
