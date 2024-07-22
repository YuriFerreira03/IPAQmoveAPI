import { FastifyReply, FastifyRequest } from "fastify";
import db from "../db/connection";

export const getSecao = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id_secao } = request.params as { id_secao: string };
  try {
    const secao = await db('Secao').where({ id_secao }).select('*').first();
    if (secao) {
      reply.send(secao);
    } else {
      reply.status(404).send("Seção não encontrada!");
    }
  } catch (error) {
    console.error("Erro ao buscar dados da seção:", error);
    reply.status(500).send("Erro ao buscar dados da seção!");
  }
};
