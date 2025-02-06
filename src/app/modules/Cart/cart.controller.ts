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
  const userId = req.params.userId;

  const cartItems = await cartServices.getUserCartFromDB(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cart items retrieved successfully',
    data: cartItems,
  });
});

export const cartControllers = {
  addToCart,
  getUserCartItems,
};
