import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';
import config from '../../config';
import { ROLE } from './user.constants';
import { IUser, IUserModel } from './user.interfaces';

const userSchema = new Schema<IUser, IUserModel>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: 0,
		},
		isBlocked: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			enum: Object.values(ROLE),
			default: ROLE.USER,
		},
	},
	{
		timestamps: true,
	}
);

// Pre save method to hash the password
userSchema.pre('save', async function (next) {
	const data = this;
	data.password = await bcrypt.hash(
		data.password,
		Number(config.bcrypt_salt_rounds)
	);

	next();
});

// Post save method to remove the password from the response
userSchema.post('save', function (doc, next) {
	doc.password = '';
	next();
});
