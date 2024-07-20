import { FastifyInstance } from 'fastify';
import { createPesquisa } from '../controllers/pesquisaController';

const pesquisaRoutes = async (server: FastifyInstance) => {
  server.post('/Pesquisa', createPesquisa);
};

export default pesquisaRoutes;
