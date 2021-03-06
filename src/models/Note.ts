import { Connection } from 'mysql';

import Database from '../config/database';
import { NoteType } from '../utils/types';

export default class Note {

	public conn: Connection;

	public constructor() {
		this.conn = new Database().connection;
		this.conn.beginTransaction();
	}

	public get(id_user: number | string, id_status?: number | string): Promise<Array<NoteType>> {
		return new Promise((resolve, reject) => {
			try {

				let query = `
					SELECT
					  tb_n.id_note,
					  tb_n.description,
					  tb_s.id_status,
					  tb_s.name AS status,
					  tb_s.color,
					  tb_n.created_at
					FROM
					  tb_note AS tb_n
						LEFT JOIN tb_status AS tb_s
						  ON tb_n.fk_id_status = tb_s.id_status 
					WHERE tb_n.fk_id_user = ${id_user} 
				`;

				if (id_status) {
					query += `AND tb_n.fk_id_status = ${id_status} `;
				}

				query += `ORDER BY tb_n.created_at DESC`;

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

	public insert(id_user: number | string, id_status: number | string, description: string): Promise<void> {
		return new Promise((resolve, reject) => {
			try {

				description = description.replace('"', ' ');

				const query = `
					INSERT INTO tb_note (
						description, fk_id_user, fk_id_status
					) VALUES (
						"${description}", ${id_user}, ${id_status}
					)
				`;

				this.conn.query(query, err => {
					if (err) {
						this.endConnection(false);
						return reject({ type: 'Erro de execução de query', err });
					}

					this.endConnection(true);
					return resolve();
				});

			} catch (err) {
				this.endConnection(false);
				return reject({ type: 'Error conexão com o banco de dados!', err });
			}			
		});
	}

	public update(id_note: number | string, id_status: number | string, description: string): Promise<void> {
		return new Promise((resolve, reject) => {
			try {

				const query = `
					UPDATE
					  tb_note
					SET
					  description = "${description}",
					  fk_id_status = ${id_status}
					WHERE
					  id_note = ${id_note}
					LIMIT 1
				`;

				this.conn.query(query, err => {
					if (err) {
						this.endConnection(false);
						return reject({ type: 'Erro de execução de query', err });
					}

					this.endConnection(true);
					return resolve();
				});

			} catch (err) {
				this.endConnection(false);
				return reject({ type: 'Error conexão com o banco de dados!', err });
			}			
		});
	}

	public delete(id_note: number | string): Promise<void> {
		return new Promise((resolve, reject) => {
			try {

				const query = `DELETE FROM tb_note WHERE id_note = ${id_note} LIMIT 1`;

				this.conn.query(query, err => {
					if (err) {
						this.endConnection(false);
						return reject({ type: 'Erro de execução de query', err });
					}

					this.endConnection(true);
					return resolve();
				});

			} catch (err) {
				this.endConnection(false);
				return reject({ type: 'Error conexão com o banco de dados!', err });
			}			
		});
	}

	public deleteUserNotes(id_user: number | string): Promise<void> {
		return new Promise((resolve, reject) => {
			try {

				const query = `DELETE FROM tb_note WHERE fk_id_user = ${id_user}`;

				this.conn.query(query, err => {
					if (err) {
						this.endConnection(false);
						return reject({ type: 'Erro de execução de query', err });
					}

					this.endConnection(true);
					return resolve();
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
