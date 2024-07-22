import { FastifyReply, FastifyRequest } from "fastify";
import db from "../db/connection";

interface RespostaBody {
  fk_Usuario_id_usuario: number;
  fk_Questao_id_questao: number;
  resposta: string;
}

export const saveResposta = async (
  request: FastifyRequest<{ Body: RespostaBody }>,
  reply: FastifyReply
) => {
  try {
    const { fk_Usuario_id_usuario, fk_Questao_id_questao, resposta } = request.body;
    await db('Responde').insert({
      fk_Usuario_id_usuario,
      fk_Questao_id_questao,
      resposta,
      datahora: new Date(),
    });
    reply.send({ success: true });
  } catch (error) {
    console.error("Erro ao salvar resposta:", error);
    reply.status(500).send("Erro ao salvar resposta!");
  }
};
