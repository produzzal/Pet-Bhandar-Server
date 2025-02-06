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

  // Check if the product is already in the user's cart
  const existingCartItem = await Cart.findOne({
    user: userId,
    product: productId,
  });

  if (existingCartItem) {
    // Update the quantity
    existingCartItem.quantity += quantity;

    if (existingCartItem.quantity > productInDB.stockQuantity) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Not enough stock for this Product ',
      );
    }

    await existingCartItem.save();
    return existingCartItem;
  }

  // If product is not in the cart, create a new cart item
  const cartItem = await Cart.create(cartData);
  return cartItem;
};

const getUserCartFromDB = async (userId: string) => {
  const cartItems = await Cart.find({ user: userId }).populate('product');

  if (!cartItems || cartItems.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No products found in cart');
  }

  return cartItems;
};

const updateCartItem = async (
  userId: string,
  productId: string,
  quantityChange: number, // This can be positive (increase) or negative (decrease)
) => {
  const cartItem = await Cart.findOne({ user: userId, product: productId });

  if (!cartItem) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart item not found');
  }

  const productInDB = await Product.findById(productId);
  if (!productInDB) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const newQuantity = cartItem.quantity + quantityChange;

  if (newQuantity < 1) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Quantity must be at least 1');
  }

  if (newQuantity > productInDB.stockQuantity) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Not enough stock available');
  }

  // Make sure to update the quantity only for the correct user and product
  cartItem.quantity = newQuantity;
  await cartItem.save();

  return cartItem;
};

const deleteCartItemFromDB = async (user: string, product: string) => {
  const cartItem = await Cart.findOneAndDelete({
    user,
    product,
  });

  if (!cartItem) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart item not found');
  }

  return cartItem;
};

export const cartServices = {
  addToCart,
  getUserCartFromDB,
  updateCartItem,
  deleteCartItemFromDB,
};
