import { FastifyInstance } from "fastify";
import { VincularProjeto} from "../controllers/Projeto_VinculadoController";

const RespondeRoutes = async (server: FastifyInstance) => {
  server.post("/Vincular_projeto", VincularProjeto);
};

export default RespondeRoutes;
