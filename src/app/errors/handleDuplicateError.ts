import { StatusCodes } from 'http-status-codes';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (error: any): TGenericErrorResponse => {
	const match = error.message.match(/"([^"]*)"/);

	const extractedMatch = match && match[1];

	const errorSources: TErrorSources = [
		{
			path: '',
			message: `${extractedMatch} already exists`,
		},
	];

	const statusCode: number = StatusCodes.CONFLICT;

	return {
		statusCode,
		message: 'Duplicate Unique Field',
		errorSources,
	};
};

export default handleDuplicateError;
