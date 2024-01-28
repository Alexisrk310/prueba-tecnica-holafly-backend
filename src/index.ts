import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const PORT: number = Number(process.env.PORT) || 3001;

const server = express();
server.use(bodyParser.json());
server.use(
	cors({
		origin: '*',
	})
);

server.use('/api', authRoutes);
server.use('/api/users', userRoutes);

server.listen(PORT, () => {
	console.log(`> Ready on http://localhost:${PORT}`);
});
