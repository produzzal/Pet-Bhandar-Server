import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';
import { CategoryServices } from './category.service';

//create Category
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { body } = req;
  const category = await CategoryServices.createCategoryToDB(body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category created successfully',
    data: category,
  });
});

//get all Categories
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getAllCategoriesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
};
