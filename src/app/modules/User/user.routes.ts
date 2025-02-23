import express from 'express';
import validateRequests from '../../middleware/validateRequests';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router
	.route('/')
	.post(
		validateRequests(UserValidation.createUserValidationSchema),
		UserControllers.createUser
	)
	.get(UserControllers.getAllUser);

router
	.route('/:id')
	.get(UserControllers.getSingleUser)
	.patch(UserControllers.updateUser)
	.delete(UserControllers.deleteUser);

router.route('/block/:id').patch(UserControllers.blockUser);

export const UserRoutes = router;
