import { Request, Response } from 'express';
import Note from '../models/Note';

export default class NoteController {

	public async get(request: Request, response: Response) {
		try {

			const { id_user } = request.params;
			const { id_note } = request.query;
			
			if (!id_user) {
				return response.status(401).json({ message: 'O ID do usuário não foi informado!' });
			}

			const noteObj: Note = new Note();
			const notes = await noteObj.get(id_user, id_note.toString());

			return response.status(200).json({ notes });

		} catch (err) {
			return response.status(500).json({ message: 'Não foi possível buscar as notas!', err });
		}
	}

	public async insert(request: Request, response: Response) {
		try {

			const { id_user, id_status, description } = request.body;

			if (!description) {
				return response.status(401).json({ message: 'Informe a descrição da sua nota!' });
			}

			const noteObj: Note = new Note();
			await noteObj.insert(id_user, id_status, description);

			return response.status(200).json({ message: 'Sua nota foi criada com sucesso!' });

		} catch (err) {
			return response.status(500).json({ message: 'Não foi possível criar a sua nota!', err });
		}
	}
	
	public async update(request: Request, response: Response) {
		try {

			const { id_note } = request.params;
			const { id_status, description } = request.body;

			if (!id_status || !description) {
				return response.status(401).json({ message: 'Informe o status e a descrição da sua nota!' });
			}

			const noteObj: Note = new Note();
			await noteObj.update(id_note, id_status, description);

			return response.status(200).json({ message: 'Sua nota foi atualizada com sucesso!' });

		} catch (err) {
			return response.status(500).json({ message: 'Não foi possível atualizar a sua nota!', err });
		}
	}

	public async delete(request: Request, response: Response) {
		try {

			const { id_note } = request.params;
			
			if (!id_note) {
				return response.status(401).json({ message: 'O ID da nota não foi informado!' });
			}

			const noteObj: Note = new Note();
			await noteObj.delete(id_note);

			return response.status(200).json({ message: 'Sua nota foi deletada!' });

		} catch (err) {
			return response.status(500).json({ message: 'Não foi possível deletar a sua nota!', err });
		}
	}

}
