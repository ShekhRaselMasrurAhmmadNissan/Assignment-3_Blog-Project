import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
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

// Static Methods
userSchema.statics.isUserExistsCheckWithEmail = async function (email: string) {
	const isUserExists = await this.findOne({ email }, { _id: 1, email: 1 });
	return isUserExists;
};

userSchema.statics.isUserBlockedCheckWithEmail = async function (
	email: string
) {
	const isUserBlocked = await this.findOne({ email }, { isBlocked: 1 });
	return isUserBlocked?.isBlocked;
};

userSchema.statics.isUserExistsCheckWithId = async function (userId: string) {
	const isUserExists = await this.findOne(
		{ _id: userId },
		{ _id: 1, email: 1 }
	);
	return isUserExists;
};

userSchema.statics.isUserBlockedCheckWithId = async function (userId: string) {
	const isUserBlocked = await this.findOne({ _id: userId }, { isBlocked: 1 });
	return isUserBlocked?.isBlocked;
};

userSchema.statics.isPasswordMatched = async function (
	plainTextPassword: string,
	hashedPassword: string
) {
	return await bcrypt.compare(plainTextPassword, hashedPassword);
};

const User = model<IUser, IUserModel>('User', userSchema);
