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

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body;
  const { id } = req.params;

  // Call the service to update the order status
  const updatedOrder = await OrderServices.updateOrderStatusFromDB(id, status);

  // Send response with the updated order
  return res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
    data: updatedOrder,
  });
});

export const OrderControllers = {
  createOrder,
  updateOrderStatus,
};
