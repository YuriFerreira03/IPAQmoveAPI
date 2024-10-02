import { FastifyRequest, FastifyReply } from "fastify";
import db from "../db/connection";

export const respondeController = async (
  request: FastifyRequest<{
    Body: {
      fk_Usuario_id_usuario: number;
      fk_Questao_id_questao: number;
      respostas_abertas: string;
      respostas_fechadas: number; // Ajustado para refletir o tipo tinyint
      resposta: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    console.log("Recebendo dados do frontend:", request.body);

    const {
      fk_Usuario_id_usuario,
      fk_Questao_id_questao,
      respostas_abertas,
      respostas_fechadas,
      resposta,
    } = request.body;

    console.log(`fk_Usuario_id_usuario: ${fk_Usuario_id_usuario}`);
    console.log(`fk_Questao_id_questao: ${fk_Questao_id_questao}`);
    console.log(`Respostas Abertas: ${respostas_abertas}`);
    console.log(`Respostas Fechadas: ${respostas_fechadas}`);
    console.log(`Resposta: ${resposta}`);
    console.log("Tentando inserir dados na tabela Responde...");

    await db("Responde").insert({
      fk_Usuario_id_usuario,
      fk_Questao_id_questao,
      respostas_abertas,
      respostas_fechadas,
      resposta,
    });

    console.log("Dados inseridos com sucesso na tabela Responde");
    return reply.send({ message: "Resposta inserida com sucesso" });
  } catch (error) {
    console.error("Erro ao inserir resposta:", error.message || error);
    return reply.status(500).send({
      error: "Erro ao inserir resposta",
      details: error.message || error,
    });
  }
};
