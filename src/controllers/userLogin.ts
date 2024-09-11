import { FastifyRequest, FastifyReply } from "fastify";
import db from "../db/connection";

// Define os tipos para o corpo da requisição
interface LoginBody {
  email: string;
  password: string;
}

export const loginUser = async (
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply
) => {
  try {
    const { email, password } = request.body;

    console.log("TESTANDO A CONEXAO");

    // Verifica se o e-mail e senha foram fornecidos
    if (!email || !password) {
      return reply.status(400).send({ message: "E-mail e senha são obrigatórios" });
    }

    // Busca o usuário pelo e-mail
    const user = await db("Usuario").where({ email }).first();

    if (!user) {
      return reply.status(401).send({ message: "Usuário não encontrado" });
    }

    // Compara a senha sem usar criptografia (texto plano)
    if (password !== user.senha) {
      return reply.status(401).send({ message: "Senha incorreta" });
    }

    // Aqui pode gerar um token de autenticação (JWT)
    // const token = generateJwtToken(user.id_usuario);

    return reply.send({ message: "Login bem-sucedido", userId: user.id_usuario });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    return reply.status(500).send({ message: "Erro ao realizar login" });
  }
};

