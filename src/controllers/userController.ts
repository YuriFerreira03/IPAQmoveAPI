import { FastifyRequest, FastifyReply } from "fastify";
import db from "../db/connection";

// Define the types for request parameters and body
interface UpdateLocalizacaoParams {
  id_usuario: number;
}

interface UpdateLocalizacaoBody {
  locality: string;
}

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.send({ message: "Rota GET /Usuario funcionando" });
};

export const createUser = async (
  request: FastifyRequest<{
    Body: { name: string; type: string; locality: string; email: string; password: string };
  }>,
  reply: FastifyReply
) => {
  try {
    console.log("Recebendo dados do frontend:", request.body);

    const { name, type, locality, email, password } = request.body;

    console.log(`Nome: ${name}, Tipo: ${type}, Localidade: ${locality}, Email: ${email}, Localidade: ${password}`);
    console.log("Tentando inserir usuário no banco de dados...");

    const [userId] = await db("Usuario")
      .insert({ nome: name, tipo: type, localidade: locality, email: email, senha: password })
      .returning("id_usuario");

    console.log("Usuário inserido com sucesso");
    return reply.send({ message: "Usuário inserido com sucesso", userId });
  } catch (error) {
    console.error("Erro ao inserir usuário:", error);
    return reply.status(500).send("Erro ao inserir usuário");
  }
};
