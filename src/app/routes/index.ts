import { Router } from 'express';

const router = Router();

interface IRoute {
	path: string;
	route: Router;
}

const moduleRoutes: IRoute[] = [];

moduleRoutes.forEach((route: IRoute) => router.use(route.path, route.route));

export default router;
