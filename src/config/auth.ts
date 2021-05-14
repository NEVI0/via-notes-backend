import { Handler } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const auth: Handler = async (request, response, next) => {
	try {

		if (request.method == 'OPTIONS') {
			next();
		}

		const token = request.body.token || request.query.token || request.headers['authorization'];

		if (!token) {
            return response.status(403).json({ message: "No token provided" });
        }

		await jwt.verify(token, process.env.AUTH_SECRET, err => {
			if (err) {
				return response.status(403).json({ message: 'Failed to authenticate token' });
			} else {
				next();
			}
		});
		
	} catch (err) {
		return response.status(500).json({ message: 'Authentication error!', err });
	}
}

export default auth;
