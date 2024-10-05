import { FastifyInstance } from "fastify";
import { resp_total_caminhada_leve_Lazer, resp_total_caminhada_moderada_Lazer, resp_total_caminhada_vigorosa_Lazer} from "../controllers/respostasTotaisSession4Controller";

const respostasTotaisSession4Routes = async (server: FastifyInstance) => {
  server.get("/respostaTotalLeveLazer", resp_total_caminhada_leve_Lazer);
  server.get("/respostaTotalModeradoLazer", resp_total_caminhada_moderada_Lazer);
  server.get("/respostaTotalVigorosoLazer", resp_total_caminhada_vigorosa_Lazer);
};

export default respostasTotaisSession4Routes;
