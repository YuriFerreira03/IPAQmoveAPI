import { FastifyInstance } from 'fastify';
import { getUser, createUser } from '../controllers/userController';

const userRoutes = async (server: FastifyInstance) => {
  server.get('/Usuario', getUser);
  server.post('/Usuario', createUser);
};

export default userRoutes;
