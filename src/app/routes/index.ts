import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.routes';

const router = Router();

interface IRoute {
	path: string;
	route: Router;
}

const moduleRoutes: IRoute[] = [
	{
		path: '/user',
		route: UserRoutes,
	},
];

moduleRoutes.forEach((route: IRoute) => router.use(route.path, route.route));

export default router;
