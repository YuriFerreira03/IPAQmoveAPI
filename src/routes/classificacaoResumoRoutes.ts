import { FastifyInstance } from "fastify";
import { classificacaoResumo } from "../controllers/classficacaoResumo";

const ClassificacaoRoutes = async (server: FastifyInstance) => {
  server.get("/classificacaoResumo", classificacaoResumo);
};

export default ClassificacaoRoutes;
