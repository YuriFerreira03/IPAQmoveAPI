import { FastifyInstance } from "fastify";
import { respondeController } from "../controllers/respondeController";

const RespondeRoutes = async (server: FastifyInstance) => {
  server.post("/Resposta", respondeController);
};

export default RespondeRoutes;
