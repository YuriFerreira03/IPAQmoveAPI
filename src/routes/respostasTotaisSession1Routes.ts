import { FastifyInstance } from "fastify";
import { resp_total_caminhada_leve_trabalho, resp_total_caminhada_moderada_trabalho, resp_total_caminhada_vigorosa_trabalho} from "../controllers/respostasTotaisSession1Controller";

const respostasTotaisSession1Routes = async (server: FastifyInstance) => {
  server.get("/respostaTotalLeveTrabalho", resp_total_caminhada_leve_trabalho);
  server.get("/respostaTotalModeradoTrabalho", resp_total_caminhada_moderada_trabalho);
  server.get("/respostaTotalVigorosoTrabalho", resp_total_caminhada_vigorosa_trabalho);
};

export default respostasTotaisSession1Routes;
