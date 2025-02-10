import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFoundErrorHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(StatusCodes.NOT_FOUND).send({
		success: false,
		message: 'API Not Found',
		error: '',
	});
};

export default notFoundErrorHandler;
