import { Router } from 'express';

import { AuthRoutes } from '../modules/Auth/auth.route';
import { ProductRoutes } from '../modules/Product/product.route';
import { CategoryRoutes } from '../modules/Category/category.route';

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
    path: '/category',
    route: CategoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
