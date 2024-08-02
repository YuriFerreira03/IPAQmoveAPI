import { FastifyInstance } from 'fastify';
import { getUser, createUser, getLocalizacao } from '../controllers/userController';

const userRoutes = async (server: FastifyInstance) => {
  server.get('/Usuario', getUser);
  server.post('/Usuario', createUser);
  server.get('/getLocalizacao', getLocalizacao);
};

export default userRoutes;
