import { Request, Response } from 'express';
import Status from '../models/Status';

export default class StatusController {

	public async get(request: Request, response: Response) {
		try {

			const statusObj: Status = new Status();
			const status = await statusObj.get();

			return response.status(200).json({ status });

		} catch (err) {
			return response.status(500).json({ message: 'Não foi possível buscar os status padrão!', err });
		}
	}

}
