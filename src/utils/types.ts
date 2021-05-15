export interface StatusType {
	id_status: number;
	name: string;
}

export interface NoteType {
	id_note: number;
	description: string;
	id_status: number;
	status: string;
	color: string;
	created_at: Date;
}

export interface UserType {
	id_user: number;
	name: string;
	email: string;
	password: string;
	created_at: Date;
}
