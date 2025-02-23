import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

// Create User
const createUser = catchAsync(async (req, res) => {
	const result = await UserServices.createUserIntoDB(req.body);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: 'User Created Successfully.',
		data: result,
	});
});

// Get All Users
const getAllUser = catchAsync(async (req, res) => {
	const result = await UserServices.getAllUsersFromDB(req.query);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: 'All Users Fetched Successfully.',
		data: result,
	});
});

// Get Single User
const getSingleUser = catchAsync(async (req, res) => {
	const result = await UserServices.getSingleUser(req.params.id);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: 'User Fetched Successfully.',
		data: result,
	});
});

// Update User
const updateUser = catchAsync(async (req, res) => {
	const result = await UserServices.updateUserIntoDB(req.params.id, req.body);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: 'User Updated Successfully.',
		data: result,
	});
});

// Delete User
const deleteUser = catchAsync(async (req, res) => {
	const result = await UserServices.deleteUserFromDB(req.params.id);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: 'User Deleted Successfully.',
		data: result,
	});
});

// Block User
const blockUser = catchAsync(async (req, res) => {
	const result = await UserServices.blockUserFromTheDB(req.params.id);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: 'User Blocked Successfully.',
		data: result,
	});
});

// Export all the Controllers
export const UserControllers = {
	createUser,
	getAllUser,
	getSingleUser,
	updateUser,
	deleteUser,
	blockUser,
};
