import { Connection } from 'mysql';

import Database from '../config/database';
import { UserType } from '../utils/types';

export default class User {

	public conn: Connection;

	public constructor() {
		this.conn = new Database().connection;
		this.conn.beginTransaction();
	}

	public getByEmail(email: string): Promise<UserType> {
		return new Promise((resolve, reject) => {
			try {

				const query = `
					SELECT
					  id_user,
					  name,
					  email,
					  password,
					  created_at
					FROM
					  tb_user
					WHERE email = "${email}"
					LIMIT 1
				`;

				this.conn.query(query, (err, results) => {
					if (err) {
						this.endConnection(false);
						return reject({ type: 'Erro de execução de query', err });
					}
					
					return resolve(results[0]);
				});

			} catch (err) {
				this.endConnection(false);
				return reject({ type: 'Error conexão com o banco de dados!', err });
			}			
		});
	}

	public insert(name: string, email: string, password: string): Promise<void> {
		return new Promise((resolve, reject) => {
			try {

				const query = `
					INSERT INTO tb_user (
						name, email, password
					) VALUES (
						"${name}", "${email}", "${password}"
					)
				`;

				this.conn.query(query, err => {
					if (err) {
						this.endConnection(false);
						return reject({ type: 'Erro de execução de query', err });
					}
					
					return resolve();
				});

			} catch (err) {
				this.endConnection(false);
				return reject({ type: 'Error conexão com o banco de dados!', err });
			}			
		});
	}

	public delete(id_user: number | string): Promise<void> {
		return new Promise((resolve, reject) => {
			try {

				const query = `DELETE FROM tb_user WHERE id_user = ${id_user} LIMIT 1`;

				this.conn.query(query, err => {
					if (err) {
						this.endConnection(false);
						return reject({ type: 'Erro de execução de query', err });
					}
					
					return resolve();
				});

			} catch (err) {
				this.endConnection(false);
				return reject({ type: 'Error conexão com o banco de dados!', err });
			}			
		});
	}

	public endConnection(hadSuccess: boolean): void {
		if (hadSuccess) {
			this.conn.commit();
		} else {
			this.conn.rollback();
		}

		this.conn.end();
	}

}
