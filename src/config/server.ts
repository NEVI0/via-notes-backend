import express from 'express';
import cors from 'cors';
import { urlencoded, json } from 'body-parser';
import 'dotenv/config';

const server: express.Application = express();

server.use(urlencoded({ extended: true }));
server.use(json());
server.use(cors());
server.use((request, response, next) => {
	console.log(`${new Date().toISOString()} -- ${request.method}: ${request.url}`); next();
});

const port: number = parseInt(process.env.PORT) || 4500;

server.listen(port, () => console.log(`Server is running! http://localhost:${port}/api`));

export default server;
