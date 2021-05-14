import express from 'express';

import UserController from '../controllers/userController';
import NoteController from '../controllers/noteController';
import StatusController from '../controllers/statusController';

import auth from './auth';

const routes = (server: express.Application) => {
	try {

		const openApi = express.Router();
		server.use('/open-api', openApi);
		
		openApi.get('/', (request, response) => {
			return response.status(200).json({ message: 'Via Notes API is running!' })
		});
		
		openApi.post('/signin', UserController.prototype.signin);
		openApi.post('/signup', UserController.prototype.signup);
		openApi.post('/validate', UserController.prototype.validateToken);

		const api = express.Router();
		server.use('/api', api);
		api.use(auth);

		api.get('/note/:id_user', NoteController.prototype.get);
		api.post('/note', NoteController.prototype.insert);
		api.put('/note/:id_note', NoteController.prototype.update);
		api.delete('/note/:id_note', NoteController.prototype.delete);

		api.get('/status', StatusController.prototype.get);
		api.delete('/user/:id_user', UserController.prototype.delete);
		
	} catch (err) {
		console.log('Routes error: ', err);
	}
}

export default routes;
