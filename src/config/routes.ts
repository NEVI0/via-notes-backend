import express from 'express';

import NoteController from '../controllers/NoteController';

const routes = (server: express.Application) => {
	try {

		const api = express.Router();
		server.use('/api', api);

		api.get('/', (request, response) => response.status(200).json({ message: 'Via Notes API is running!' }));

		api.get('/note/:id_user', NoteController.prototype.get);
		api.post('/note', NoteController.prototype.insert);
		api.put('/note/:id_note', NoteController.prototype.update);
		api.delete('/note/:id_note', NoteController.prototype.delete);
		
	} catch (err) {
		console.log('Routes error: ', err);
	}
}

export default routes;
