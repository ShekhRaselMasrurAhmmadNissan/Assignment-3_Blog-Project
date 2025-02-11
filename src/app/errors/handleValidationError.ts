import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
	error: mongoose.Error.ValidationError
): TGenericErrorResponse => {
	const errorSources: TErrorSources = Object.values(error.errors).map(
		(err: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
			return {
				path: err.path,
				message: err.message,
			};
		}
	);

	const statusCode: number = StatusCodes.BAD_REQUEST;

	return {
		statusCode,
		message: 'Validation Error',
		errorSources,
	};
};

export default handleValidationError;
