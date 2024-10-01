import { FastifyRequest, FastifyReply } from "fastify";
import db from "../db/connection";
import bcrypt from "bcryptjs"; // Importa o bcryptjs

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
    Body: {
      name: string;
      type: string;
      locality: string;
      email: string;
      password: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    console.log("Recebendo dados do frontend:", request.body);

    const { name, type, locality, email, password } = request.body;

    // Verifica se o email já está cadastrado
    const existingUser = await db("Usuario").where({ email }).first();

    if (existingUser) {
      return reply
        .status(400)
        .send({ message: "Este e-mail já está cadastrado" });
    }

    // Encripta a senha com bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(
      `Nome: ${name}, Tipo: ${type}, Localidade: ${locality}, Email: ${email}, Senha: ${hashedPassword}`
    );
    console.log("Tentando inserir usuário no banco de dados...");

    // Insere o usuário no banco e obtém o id_usuario
    const [insertedId] = await db("Usuario").insert({
      nome: name,
      tipo: type,
      localidade: locality,
      email: email,
      senha: hashedPassword,
    });

    console.log("Usuário inserido com sucesso! ID:", insertedId);

    // Recupera o usuário inserido com base no id_usuario
    const user = await db("Usuario")
      .select("id_usuario", "nome", "localidade", "email", "tipo")
      .where({ id_usuario: insertedId })
      .first();

    return reply.send({ message: "Usuário inserido com sucesso", user });
  } catch (error) {
    console.error("Erro ao inserir usuário:", error);
    return reply.status(500).send("Erro ao inserir usuário");
  }
};
