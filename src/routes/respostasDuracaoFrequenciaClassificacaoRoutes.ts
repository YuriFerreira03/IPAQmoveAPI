import { FastifyInstance } from "fastify";
import {
  resp_caminhada_duracao_total,
  resp_caminhada_frequencia_total,
  resp_moderada_duracao_total,
  resp_frequencia_moderada_total,
  resp_vigorosa_duracao_total,
  resp_frequencia_vigorosa_total,
  resp_caminhada_duracao_media,
  resp_duracao_media_moderada,
  resp_duracao_media_vigorosa,
  resp_freq_mod_cam,
  resp_dur_mod_cam,
  classificacao,
} from "../controllers/respostasDuracaoFrequenciaClassificacaoController";

const respostasDuracaoFrequenciaClassificacaoRoutes = async (
  server: FastifyInstance
) => {
  server.get("/respostaCaminhadaDuracaoTotal", resp_caminhada_duracao_total);
  server.get(
    "/respostaCaminhadaFrequenciaTotal",
    resp_caminhada_frequencia_total
  );
  server.get("/respostaModeradaDuracaoTotal", resp_moderada_duracao_total);
  server.get(
    "/respostaModeradaFrequenciaTotal",
    resp_frequencia_moderada_total
  );
  server.get("/respostaVigorosaDuracaoTotal", resp_vigorosa_duracao_total);
  server.get(
    "/respostaVigorosaFrequenciaTotal",
    resp_frequencia_vigorosa_total
  );
  server.get("/respostaDuracaoMedia", resp_caminhada_duracao_media);
  server.get("/respostaDuracaoModerada", resp_duracao_media_moderada);
  server.get("/respostaDuracaoVigorosa", resp_duracao_media_vigorosa);
  server.get("/respostaFreqModCam", resp_freq_mod_cam);
  server.get("/respostaDurModCam", resp_dur_mod_cam);
  server.get("/classificacao", classificacao);
};

export default respostasDuracaoFrequenciaClassificacaoRoutes;
