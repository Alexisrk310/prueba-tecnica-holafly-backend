export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
}

export interface UserData {
	id: number;
	status: string;
	dateStart: string;
	dateEnd: string | null;
	consumption: { totalConsumption: number } | null;
	flag: string;
	country: string;
	plan: string;
}
