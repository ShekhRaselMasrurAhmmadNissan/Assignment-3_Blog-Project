import { Response } from 'express';

interface IResponse<T> {
	statusCode: number;
	success: boolean;
	message: string;
	data: T | T[] | null;
}

const sendResponse = <T>(res: Response, data: IResponse<T>) => {
	res.status(data?.statusCode || 200).json({
		success: data?.success || false,
		message: data?.message || '',
		data: data?.data || null,
	});
};

export default sendResponse;
