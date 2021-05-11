import { Connection } from 'mysql';

import Database from '../config/database';
import { StatusType } from '../utils/interfaces';

export default class Note {

	public conn: Connection;

	public constructor() {
		this.conn = new Database().connection;
		this.conn.beginTransaction();
	}

	public get(): Promise<Array<StatusType>> {
		return new Promise((resolve, reject) => {
			try {

				const query = `SELECT * from tb_status ORDER BY name`;

				this.conn.query(query, (err, results) => {
					if (err) {
						this.endConnection(false);
						return reject({ type: 'Erro de execução de query', err });
					}

					this.endConnection(true);
					return resolve(results);
				});

			} catch (err) {
				this.endConnection(false);
				return reject({ type: 'Error conexão com o banco de dados!', err });
			}			
		});
	}

	private endConnection(hadSuccess: boolean): void {
		if (hadSuccess) {
			this.conn.commit();
		} else {
			this.conn.rollback();
		}

		this.conn.end();
	}

}
