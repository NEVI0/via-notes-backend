import mysql from 'mysql';
import 'dotenv/config';

export default class Database {

	public connection: mysql.Connection;

	public constructor() {
		try {

			const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

			this.connection = mysql.createConnection({
				host: DB_HOST || 'localhost',
				user: DB_USER || 'root',
				password: DB_PASSWORD || '',
				database: DB_NAME || 'db_via_notes',
				port: parseInt(DB_PORT) || 3306
			});

			this.connection.connect(err => {
				if (err) {
					console.log('Database connection error: ', err);
				}
			})

		} catch (err) {
			console.log('MySQL error: ', err);
		}
	}

}
