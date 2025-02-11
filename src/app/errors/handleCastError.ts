import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
	error: mongoose.Error.CastError
): TGenericErrorResponse => {
	const errorSources: TErrorSources = [
		{
			path: error.path,
			message: error.message,
		},
	];

	const statusCode: number = StatusCodes.BAD_REQUEST;

	return {
		statusCode,
		message: 'Cast Error',
		errorSources,
	};
};

export default handleCastError;
