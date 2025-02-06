import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../Product/product.model';
import { TCart } from './cart.interface';
import { User } from '../User/user.model';
import Cart from './cart.model';

const addToCart = async (cartData: TCart) => {
  const userId = cartData.user;
  const productId = cartData.product;
  const quantity = cartData.quantity;
  const userInDB = await User.findById(userId);
  const productInDB = await Product.findById(productId);

  if (!userInDB) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }

  if (!productInDB) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product not found');
  }

  if (quantity > productInDB.stockQuantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Not enough stock for this Product ',
    );
  }

  const cartItem = await Cart.create(cartData);
  return cartItem;
};

export const cartServices = {
  addToCart,
};
