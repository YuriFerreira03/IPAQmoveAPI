import { FastifyInstance } from "fastify";
import { getSecao } from "../controllers/secaoController";

export async function secaoRoutes(fastify: FastifyInstance) {
  fastify.get("/secao/:id_secao", getSecao);
}
