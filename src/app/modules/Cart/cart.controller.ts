import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { cartServices } from './cart.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const addToCart = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const cartProduct = await cartServices.addToCart(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'product added successfully',
    data: cartProduct,
  });
});

export const cartControllers = {
  addToCart,
};
