import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server;

const main = async () => {
	try {
		await mongoose.connect(config.database_url as string);

		server = app.listen(config.port || 3000, () => {
			console.log(
				`Example Server is running on http://localhost:${
					config.port || 3000
				}`
			);
		});
	} catch (error) {
		console.log(error);
	}
};

main();

// Handling Unhandled Rejection
process.on('unhandledRejection', (error) => {
	console.log(
		'💀 Unhandled Rejection Happened in Server. Closing the Server...'
	);
	if (server) {
		server.close(() => {
			process.exit(1);
		});
	}
	process.exit(1);
});

// Handling Uncaught Exception
process.on('uncaughtException', (error) => {
	console.log(
		'💀 Uncaught Exception Happened in Server. Closing the Server...'
	);
	process.exit(1);
});
