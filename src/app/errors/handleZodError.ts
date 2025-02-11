import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleZodError = (error: ZodError): TGenericErrorResponse => {
	const errorSources: TErrorSources = error.issues.map((issue: ZodIssue) => {
		return {
			path: issue.path[issue.path.length - 1],
			message: issue.message,
		};
	});

	const statusCode = StatusCodes.BAD_REQUEST;

	return {
		statusCode,
		message: 'Zod Validation Error',
		errorSources,
	};
};

export default handleZodError;
