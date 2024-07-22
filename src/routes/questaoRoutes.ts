import { FastifyInstance } from "fastify";
import { getQuestao} from "../controllers/questaoController";

export async function questaoRoutes(fastify: FastifyInstance) {
  fastify.get("/questao/:id_questao", getQuestao);
}
