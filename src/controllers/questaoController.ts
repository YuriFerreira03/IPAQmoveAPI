import { FastifyReply, FastifyRequest } from "fastify";
import db from "../db/connection";

export const getQuestao = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const questao = await db('Questao').select('*').first();
    reply.send(questao);
  } catch (error) {
    console.error("Erro ao buscar dados da seção:", error);
    reply.status(500).send("Erro ao buscar dados da seção!");
  }
};