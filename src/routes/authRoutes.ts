import express from 'express';
import { generateToken } from '../utils/auth';
import { User } from '../interfaces/IUser.interface';

const router = express.Router();

export const users: User[] = [
	{
		id: 1,
		name: 'holafly',
		email: 'holafly@gmail.com',
		password: 'holafly123',
	},
	{
		id: 2,
		name: 'holafly2',
		email: 'holafly2@gmail.com',
		password: 'holafly12',
	},
];

router.post('/login', (req: express.Request, res: express.Response) => {
	const { email, password } = req.body;

	const user = users.find((u) => u.email === email);

	if (!user) {
		return res.status(401).json({ error: 'User not found' });
	}

	if (user.password !== password) {
		return res.status(401).json({ error: 'Incorrect password' });
	}

	const token = generateToken(user);
	res.json({
		message: 'Login successful',
		name: user.name,
		userId: user.id,
		token,
	});
});

export default router;
