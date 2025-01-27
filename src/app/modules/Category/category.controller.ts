import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { body } = req;
  const category = await CategoryServices.createCategoryToDB(body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Category created successfully',
    data: category,
  });
});

export const CategoryControllers = {
  createCategory,
};
