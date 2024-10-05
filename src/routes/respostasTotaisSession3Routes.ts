import { FastifyInstance } from "fastify";
import { resp_total_moderado_casa, resp_total_vigoroso_casa} from "../controllers/respostasTotaisSession3Controller";

const respostasTotaisSession3Routes = async (server: FastifyInstance) => {
  server.get("/respostaTotalModeradoCasa", resp_total_moderado_casa);
  server.get("/respostaTotalVigorosoCasa", resp_total_vigoroso_casa);
};

export default respostasTotaisSession3Routes;
