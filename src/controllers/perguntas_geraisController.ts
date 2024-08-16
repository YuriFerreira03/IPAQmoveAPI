import { FastifyRequest, FastifyReply } from "fastify";
import db from "../db/connection";

export const createPerguntaGeral = async (
  request: FastifyRequest<{
    Body: {
      fk_Usuario_id_usuario: number;
      nome: string;
      idade: number;
      sexo: string;
      estatura: number;
      peso: number;
      trabalha_remunerado: number; // 0 ou 1 para o checkbox
      horas_trabalha_dia: number;
      horas_sono_dia: number;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    console.log("Recebendo dados do frontend:", request.body);

    const {
      fk_Usuario_id_usuario,
      nome,
      idade,
      sexo,
      estatura,
      peso,
      trabalha_remunerado,
      horas_trabalha_dia,
      horas_sono_dia,
    } = request.body;

    console.log(`fk_Usuario_id_usuario: ${fk_Usuario_id_usuario}`);
    console.log(`Nome: ${nome}`);
    console.log(`Idade: ${idade}`);
    console.log(`Sexo: ${sexo}`);
    console.log(`Estatura: ${estatura}`);
    console.log(`Peso: ${peso}`);
    console.log(`Trabalha Remunerado: ${trabalha_remunerado}`);
    console.log(`Horas de Trabalho por Dia: ${horas_trabalha_dia}`);
    console.log(`Horas de Sono por Dia: ${horas_sono_dia}`);
    console.log("Tentando inserir dados na tabela Perguntas_gerais...");

    await db("Perguntas_gerais").insert({
      fk_Usuario_id_usuario,
      nome,
      idade,
      sexo,
      estatura,
      peso,
      trabalha_remunerado_voluntario: trabalha_remunerado,
      horas_trabalha_dia,
      horas_sono_dia,
    });

    console.log("Dados inseridos com sucesso na tabela Perguntas_gerais");
    return reply.send({ message: "Resposta inserida com sucesso" });
  } catch (error) {
    console.error("Erro ao inserir resposta:", error.message || error);
    return reply
      .status(500)
      .send({
        error: "Erro ao inserir resposta",
        details: error.message || error,
      });
  }
};