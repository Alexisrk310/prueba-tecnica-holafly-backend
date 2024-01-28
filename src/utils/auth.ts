import jwt from 'jsonwebtoken';
import { User } from '../interfaces/IUser.interface';

const SECRET_KEY = 'HOLAFLY';

export function generateToken(user: User): string {
	return jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyToken(req: any, res: any, next: any) {
	const token = req.headers.authorization || req.headers['x-token'];

	if (!token) {
		return res.status(403).json({ error: 'Token is missing' });
	}

	jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
		if (err) {
			return res.status(401).json({ error: 'Invalid token' });
		}

		const userId = decoded.userId;

		
		if (req.params.id && parseInt(req.params.id, 10) !== userId) {
			return res
				.status(401)
				.json({ error: 'Token does not match the provided user ID' });
		}

		req.userId = userId;
		next();
	});
}
