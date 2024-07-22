import { FastifyInstance } from "fastify";
import { saveResposta } from "../controllers/respondeController";

export async function respondeRoutes(fastify: FastifyInstance) {
  fastify.post("/responde", saveResposta);
}
