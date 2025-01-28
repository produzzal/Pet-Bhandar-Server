import { Types } from 'mongoose';

export type TOrder = {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  products: {
    product: Types.ObjectId;
    quantity: number;
  };
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
};
