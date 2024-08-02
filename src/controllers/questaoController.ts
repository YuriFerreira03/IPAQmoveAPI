import { FastifyReply, FastifyRequest } from "fastify";
import db from "../db/connection";

interface QuestaoParams {
  id_questao: string;
}

export const getQuestao = async (request: FastifyRequest<{ Params: QuestaoParams }>, reply: FastifyReply) => {
  const { id_questao } = request.params;
  try {
    const questao = await db('Questao').where({ id_questao }).select('*').first();
    if (questao) {
      reply.send(questao);
    } else {
      reply.status(404).send("Questão não encontrada!");
    }
  } catch (error) {
    console.error("Erro ao buscar dados da questão:", error);
    reply.status(500).send("Erro ao buscar dados da questão!");
  }
};
