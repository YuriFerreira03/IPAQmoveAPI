import { FastifyRequest, FastifyReply } from "fastify";
import db from "../db/connection";

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.send({ message: "Rota GET /Usuario funcionando" });
};

export const createUser = async (
  request: FastifyRequest<{
    Body: { name: string; type: string; locality: string };
  }>,
  reply: FastifyReply
) => {
  try {
    console.log("Recebendo dados do frontend:", request.body);

    const { name, type, locality } = request.body;

    console.log(`Nome: ${name}, Tipo: ${type}, Localidade: ${locality}`);
    console.log("Tentando inserir usuário no banco de dados...");

    const [userId] = await db("Usuario")
      .insert({ nome: name, tipo: type, localidade: locality })
      .returning("id_usuario");

    console.log("Usuário inserido com sucesso");
    return reply.send({ message: "Usuário inserido com sucesso" });
  } catch (error) {
    console.error("Erro ao inserir usuário:", error);
    return reply.status(500).send("Erro ao inserir usuário");
  }
};

export const getLocalizacao = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const localizacao = await db('Usuario').select('localidade').where({ id_usuario: 1 }).first(); // Substitua '1' pelo ID correto do usuário
    reply.send({ localizacao: localizacao.localidade });
  } catch (error) {
    console.error("Erro ao buscar dados da localização:", error);
    reply.status(500).send("Erro ao buscar dados da localização!");
  }
};
