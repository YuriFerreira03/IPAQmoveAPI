import { FastifyInstance } from 'fastify';
import { createPesquisa, searchPesquisa } from '../controllers/pesquisaController';

const pesquisaRoutes = async (server: FastifyInstance) => {
  server.post('/Pesquisa', createPesquisa);
  server.get('/search-pesquisa', searchPesquisa);
};

export default pesquisaRoutes;
