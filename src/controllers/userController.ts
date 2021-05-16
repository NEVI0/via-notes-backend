import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import Note from '../models/Note';

import 'dotenv/config';

const emailRegex: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/;
const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default class UserController {

	public async signin(request: Request, response: Response) {
		try {

			const { email, password } = request.body;

			if (!email || !password) {
				return response.status(401).json({ message: 'Preencha os campos de e-mail e senha!' });
			}

			const userObj: User = new User();
			const user = await userObj.getByEmail(email);

			if (!user) {
				return response.status(401).json({ message: 'Usuário não encontrado!' });
			}
			if (!bcrypt.compareSync(password, user.password)) {
				return response.status(401).json({ message: 'E-mail ou senha inválidos!' });
			}

			const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.AUTH_SECRET, { expiresIn: 86400 });
			const { id_user, name, created_at } = user;

			userObj.endConnection(true);
			return response.status(200).json({ id_user, name, email, token, created_at });

		} catch (err) {
			return response.status(500).json({ message: 'Não foi possível fazer o login no app!', err });
		}
	}

	public async signup(request: Request, response: Response) {
		try {

			const { name, email, password, conf_password } = request.body;

			if (!name || !email || !password || !conf_password) {
				return response.status(401).json({ message: 'Preencha todos os campos!' });
			}
			if (!emailRegex.test(email)) {
				return response.status(401).json({ message: 'O e-mail está invalido! Ex.: exemplo@gmail.com' });
			}
			if (!passwordRegex.test(password)) {
				return response.status(401).json({ message: 'A senha deve conter no minímo 8 caracteres, com pelo menos 1 número!' });
			}
			if (password != conf_password) {
				return response.status(401).json({ message: 'As senhas não são iguais!' });
			}
			
			const userObj: User = new User();
			let user = await userObj.getByEmail(email);

			if (user) {
				return response.status(401).json({ message: 'Um usuário já possui esse e-mail!' });
			}
			
			const salt = bcrypt.genSaltSync();
			const hashedPassword = bcrypt.hashSync(password, salt);
			
			await userObj.insert(name, email, hashedPassword);
			user = await userObj.getByEmail(email);
		
			const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.AUTH_SECRET, { expiresIn: 86400 });
			const { id_user, created_at } = user;

			userObj.endConnection(true);
			return response.status(200).json({ id_user, name, email, token, created_at });

		} catch (err) {
			console.log(err)
			return response.status(500).json({ message: 'Não foi possível fazer o seu cadastro no app!', err });
		}
	}

	public async validateToken(request: Request, response: Response) {
		try {

			const { token } = request.body;

			if (!token) {
				return response.status(200).json({ valid: false });
			}

			await jwt.verify(token, process.env.AUTH_SECRET, err => {
				if (err) {
					return response.status(200).json({ valid: false });
				} else {
					return response.status(200).json({ valid: true });
				}
			});

		} catch (err) {
			return response.status(500).json({ message: 'Não foi possível valdar a sua sessão!', err });
		}
	}

	public async delete(request: Request, response: Response) {
		try {

			const { id_user } = request.params;

			const userObj: User = new User();
			await userObj.delete(id_user);
			
			const noteObj: Note = new Note();
			await noteObj.deleteUserNotes(id_user);

			userObj.endConnection(true);
			return response.status(200).json({ message: 'Sua conta foi deletada!' });

		} catch (err) {
			return response.status(500).json({ message: 'Não foi possível deletar a sua conta!', err });
		}
	}

}
