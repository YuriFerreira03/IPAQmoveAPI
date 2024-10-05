import { FastifyInstance } from "fastify";
import { resp_perguntas_gerais } from "../controllers/resp_perguntas_geraisController";

const respostaPerguntasGeraisRoutes = async (server: FastifyInstance) => {
  server.get("/respostaIMC", resp_perguntas_gerais);
};

export default respostaPerguntasGeraisRoutes;
