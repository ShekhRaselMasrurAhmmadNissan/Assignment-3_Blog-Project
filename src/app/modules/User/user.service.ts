import QueryBuilder from '../../builder/QueryBuilder';
import { SEARCHABLE_FIELDS } from './user.constants';
import { IUser } from './user.interfaces';
import { User } from './user.model';

// Create User to the DB
const createUserIntoDB = async (payload: IUser) => {
	const result = await User.create(payload);
	return result;
};

// Get All Users from the DB
const getAllUsersFromDB = async (query: Record<string, unknown>) => {
	const facultyQuery = new QueryBuilder(User.find(), query)
		.search(SEARCHABLE_FIELDS)
		.filter()
		.sort()
		.paginate()
		.selectFields();
	const result = await facultyQuery.modelQuery;
	return result;
};

// Get Single User From DB
const getSingleUser = async (id: string) => {
	const result = await User.findById(id);
	return result;
};

// Update User to the DB
const updateUserIntoDB = async (id: string, payload: Partial<IUser>) => {
	const result = await User.findByIdAndUpdate(id, payload, { new: true });
	return result;
};

// Delete User From the DB
const deleteUserFromDB = async (id: string) => {
	const result = await User.findByIdAndDelete(id);
	return result;
};

// Block User From the DB
const blockUserFromTheDB = async (id: string) => {
	const result = await User.findByIdAndUpdate(
		id,
		{ isBlocked: true },
		{ new: true }
	);
	return result;
};

// Export all the Services
export const UserServices = {
	createUserIntoDB,
	getAllUsersFromDB,
	getSingleUser,
	updateUserIntoDB,
	deleteUserFromDB,
	blockUserFromTheDB,
};
