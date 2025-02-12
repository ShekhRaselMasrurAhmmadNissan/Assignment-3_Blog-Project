/**
 * name: string – The full name of the user.
 * email: string – The email address of the user, used for authentication and communication.
 * password: string – The password for the user, securely stored.
 * role: "admin" | "user" – The role of the user, determining their access level. Default is "user".
 * isBlocked: boolean – A flag indicating whether the user is blocked or not. Default is false.
 * createdAt: Date – The timestamp when the user was created.
 * updatedAt: Date – The timestamp of the last update to the user.
 */

import { Model } from 'mongoose';
import { ROLE } from './user.constants';

export interface IUser {
	name: string;
	email: string;
	password: string;
	role?: ROLE;
	isBlocked?: boolean;
}

export interface IUserModel extends Model<IUser> {
	isUserExistsCheckWithEmail(email: string): Promise<IUser | null>;
	isUserBlockedCheckWithEmail(email: string): Promise<boolean>;
	isUserExistsCheckWithId(userId: string): Promise<IUser | null>;
	isUserBlockedCheckWithId(userId: string): Promise<boolean>;
	isPasswordMatched(
		plainTextPassword: string,
		hashedPassword: string
	): Promise<boolean | undefined>;
}
