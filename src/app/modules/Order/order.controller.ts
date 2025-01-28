import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { OrderServices } from './order.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

// Create Order Controller
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.createOrderIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order created successfully',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
};
