/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import config from '../config';
import handleCastError from '../errors/handleCastError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { TErrorSources } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (
	error: any,
	req,
	res,
	next
) => {
	// Setting default values
	let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
	let message = 'Something went wrong!';
	let errorSources: TErrorSources = [
		{
			path: '',
			message: 'Something went wrong',
		},
	];

	// Zod Error
	if (error instanceof ZodError) {
		const simplifiedError = handleZodError(error);
		statusCode = simplifiedError?.statusCode || statusCode;
		message = simplifiedError?.message || message;
		errorSources = simplifiedError?.errorSources || errorSources;
	}
	// Mongoose Validation Error
	else if (error instanceof mongoose.Error.ValidationError) {
		const simplifiedError = handleValidationError(error);
		statusCode = simplifiedError?.statusCode || statusCode;
		message = simplifiedError?.message || message;
		errorSources = simplifiedError?.errorSources || errorSources;
	}
	// Mongoose Cast Error
	else if (error instanceof mongoose.Error.CastError) {
		const simplifiedError = handleCastError(error);
		statusCode = simplifiedError?.statusCode || statusCode;
		message = simplifiedError?.message || message;
		errorSources = simplifiedError?.errorSources || errorSources;
	}
	// Generic Error
	else if (error instanceof Error) {
		message = error.message;
		errorSources = [
			{
				path: '',
				message: error.message,
			},
		];
	}

	// Return error response
	res.status(statusCode).json({
		success: false,
		message,
		errorSources,
		error,
		stack: config.node_env === 'development' ? error.stack || null : null,
	});
};

export default globalErrorHandler;
