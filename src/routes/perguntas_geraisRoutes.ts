import { FastifyInstance } from "fastify";
import { createPerguntaGeral} from "../controllers/perguntas_geraisController";

const RespondeRoutes = async (server: FastifyInstance) => {
  server.post("/perguntas_gerais", createPerguntaGeral);
};

export default RespondeRoutes;
