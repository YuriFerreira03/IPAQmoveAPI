import { FastifyRequest, FastifyReply } from "fastify";
import db from "../db/connection";
import bcrypt from "bcryptjs"; // Importa o bcryptjs

// Define os tipos para o corpo da requisição
interface LoginBody {
  email: string;
  password: string;
  type: string;
}

export const loginUser = async (
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply
) => {
  try {
    const { email, password, type } = request.body;

    console.log("Testando a conexão do LOGIN");

    // Verifica se o e-mail e senha foram fornecidos
    if (!email || !password) {
      return reply
        .status(400)
        .send({ message: "E-mail e senha são obrigatórios" });
    }

    // Busca o usuário pelo e-mail
    const user = await db("Usuario").where({ email }).first();

    if (!user) {
      return reply.status(401).send({ message: "Email não encontrado" });
    }

    // Compara a senha criptografada
    const isPasswordValid = await bcrypt.compare(password, user.senha);
    if (!isPasswordValid) {
      return reply.status(401).send({ message: "Senha incorreta" });
    }

    // Retorna o nome e a localidade junto com o userId
    return reply.send({
      message: "Login bem-sucedido",
      type: user.tipo,
      userId: user.id_usuario,
      name: user.nome, // Retornando o nome do usuário
      locality: user.localidade, // Retornando a localidade do usuário
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    return reply.status(500).send({ message: "Erro ao realizar login" });
  }
};
