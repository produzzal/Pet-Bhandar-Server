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

export const ProductServices = {
  createProductIntoDB,
};
