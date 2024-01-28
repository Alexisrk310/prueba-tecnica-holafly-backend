import express from 'express';
import { verifyToken } from '../utils/auth';
import { users } from './authRoutes';
import { User, UserData } from '../interfaces/IUser.interface';

const router = express.Router();

const userData: UserData[] = [
	{
		id: 1,
		status: 'Expired',
		dateStart: '01/01/2023',
		dateEnd: '04/01/2023',
		consumption: null,
		flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/800px-Flag_of_Colombia.svg.png',
		country: 'Colombia',
		plan: '4 days, 3GB',
	},
	{
		id: 1,
		status: 'Expired',
		dateStart: '01/01/2023',
		dateEnd: '04/01/2023',
		consumption: null,
		flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/800px-Flag_of_Colombia.svg.png',
		country: 'Colombia',
		plan: '4 days, 3GB',
	},
	{
		id: 1,
		status: 'Pending',
		dateStart: '01/01/2024',
		dateEnd: null,
		consumption: {
			totalConsumption: 1468006.4,
		},
		flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Flag_of_Peru_%28state%29.svg/1280px-Flag_of_Peru_%28state%29.svg.png',
		country: 'Peru',
		plan: '1 day, 1.4GB',
	},
	{
		id: 1,
		status: 'Active',
		dateStart: '06/10/2023',
		dateEnd: '16/10/2023',
		consumption: {
			totalConsumption: 12582912,
		},
		flag: 'https://stuffedeyes.files.wordpress.com/2018/06/spain-2906824_960_720.png?w=960',
		country: 'Spain',
		plan: '10 days, 12GB',
	},
];

router.get(
	'/:id/data',
	verifyToken,
	(req: express.Request, res: express.Response) => {
		const userId = req.params.id;
		const user = users.find((u) => u.id === parseInt(userId, 10));

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const userSpecificData = userData.filter((data) => data.id === user.id);

		if (userSpecificData.length > 0) {
			res.json(userSpecificData);
		} else {
			res.status(404).json({ error: 'User data not found' });
		}
	}
);

router.get(
	'/:id/profile',
	verifyToken,
	(req: express.Request, res: express.Response) => {
		const userId = req.params.id;
		const user = users.find((u) => u.id === parseInt(userId, 10));

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const userProfile = {
			id: user.id,
			name: user.name,
		};
		res.json(userProfile);
	}
);

export default router;
