import { Order } from './order.model';
import { TOrder } from './order.interface';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../Product/product.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  const insufficientStockErrors: string[] = []; // Array to collect errors

  // Iterate through each product in the order
  for (let i = 0; i < orderData.products.length; i++) {
    const product = orderData.products[i];

    // Fetch the product details from the database using productId
    const productInDB = await Product.findById(product.product);

    // Check if the product exists
    if (!productInDB) {
      insufficientStockErrors.push(
        `Product not found for id: ${product.product}`,
      );
      continue; // Skip to the next product if one is not found
    }

    // Check if the requested quantity exceeds the available stock
    if (product.quantity > productInDB.stockQuantity) {
      insufficientStockErrors.push(
        `Not enough stock for product: ${productInDB.name}. Available stock: ${productInDB.stockQuantity}`,
      );
    }
  }

  // If there are any stock errors, throw an aggregated error
  if (insufficientStockErrors.length > 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Insufficient stock for the following products: \n${insufficientStockErrors.join('\n')}`,
    );
  }

  // If all checks pass, create the order
  const order = await Order.create(orderData);
  return order;
};

export const OrderServices = {
  createOrderIntoDB,
};
