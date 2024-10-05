import { FastifyInstance } from "fastify";
import { resp_total_caminhada_leve_transporte, resp_total_caminhada_moderada_transporte} from "../controllers/respostasTotaisSession2Controller";

const respostasTotaisSession2Routes = async (server: FastifyInstance) => {
  server.get("/respostaTotalLeveTransporte", resp_total_caminhada_leve_transporte);
  server.get("/respostaTotalModeradoTransporte", resp_total_caminhada_moderada_transporte);
};

export default respostasTotaisSession2Routes;
