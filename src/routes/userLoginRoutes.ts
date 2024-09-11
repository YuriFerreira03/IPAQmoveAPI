// routes/userRoutes.ts
import { FastifyInstance } from 'fastify';
import { loginUser } from '../controllers/userLogin';

const userRoutes = async (server: FastifyInstance) => {
  
  server.post('/login', loginUser); // Adiciona a rota de login
};

export default userRoutes;
