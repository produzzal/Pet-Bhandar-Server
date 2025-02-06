import { Router } from 'express';

import { AuthRoutes } from '../modules/Auth/auth.route';
import { ProductRoutes } from '../modules/Product/product.route';
import { CategoryRoutes } from '../modules/Category/category.route';
import { OrderRoutes } from '../modules/Order/order.route';
import { UserRoutes } from '../modules/User/user.route';
import { CartRoutes } from '../modules/Cart/cart.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
