import { FastifyInstance } from "fastify";
import { respostasController } from "../controllers/respostasController";

const respostasRoutes = async (server: FastifyInstance) => {
  server.get("/Respostas/:fk_Usuario_id_usuario", respostasController);
};

export default respostasRoutes;
