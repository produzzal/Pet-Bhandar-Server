import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { cartServices } from './cart.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const cartProduct = await cartServices.addToCart(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'product added successfully',
    data: cartProduct,
  });
});

const getUserCartItems = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body;

  const cartItems = await cartServices.getUserCartFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cart items retrieved successfully',
    data: cartItems,
  });
});

const updateCartItem = catchAsync(async (req: Request, res: Response) => {
  const { user, product, quantity } = req.body;

  const updatedCartItem = await cartServices.updateCartItem(
    user,
    product,
    quantity,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cart item updated successfully',
    data: updatedCartItem,
  });
});

const deleteCartItem = catchAsync(async (req: Request, res: Response) => {
  const { user, product } = req.body;
  const cart = await cartServices.deleteCartItemFromDB(user, product);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cart item deleted successfully',
    data: cart,
  });
});

export const cartControllers = {
  addToCart,
  getUserCartItems,
  updateCartItem,
  deleteCartItem,
};
